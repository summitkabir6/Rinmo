'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { submitApplication } from '@/lib/actions'
import { track } from '@/lib/analytics'
import type { Role, CompanySize, HiresPerYear, PrimaryPain } from '@/types'

const ROLES: Role[] = [
  'Founder/CEO',
  'Hiring Manager',
  'Head of People/Talent',
  'Recruiter/Agency',
  'Other',
]

const COMPANY_SIZES: CompanySize[] = ['1-10', '11-50', '51-200', '201-1000', '1000+']

const HIRES_PER_YEAR: HiresPerYear[] = ['0-5', '6-20', '21-50', '51-100', '100+']

const PAIN_OPTIONS: { value: PrimaryPain; label: string }[] = [
  { value: 'resume screening', label: 'Too much time on resume screening' },
  { value: 'scheduling', label: 'Scheduling chaos with candidates' },
  { value: 'consistency', label: 'Inconsistent evaluation across interviewers' },
  { value: 'quality', label: 'Hiring quality is unpredictable' },
  { value: 'compliance/audit', label: 'Compliance or audit requirements' },
  { value: 'bandwidth', label: 'Team bandwidth / hiring team is overwhelmed' },
]

interface FormState {
  full_name: string
  work_email: string
  company_name: string
  role: Role | ''
  company_size: CompanySize | ''
  hires_per_year: HiresPerYear | ''
  primary_pain: PrimaryPain[]
  current_tools: string
  notes: string
  wants_onboarding_call: boolean
}

const INITIAL_FORM: FormState = {
  full_name: '',
  work_email: '',
  company_name: '',
  role: '',
  company_size: '',
  hires_per_year: '',
  primary_pain: [],
  current_tools: '',
  notes: '',
  wants_onboarding_call: true,
}

function getUtmParams() {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const sessionUtm = sessionStorage.getItem('rinmo_utm')
  const base = sessionUtm ? JSON.parse(sessionUtm) : {}
  return {
    utm_source: params.get('utm_source') || base.utm_source || undefined,
    utm_medium: params.get('utm_medium') || base.utm_medium || undefined,
    utm_campaign: params.get('utm_campaign') || base.utm_campaign || undefined,
    utm_content: params.get('utm_content') || base.utm_content || undefined,
    utm_term: params.get('utm_term') || base.utm_term || undefined,
  }
}

export default function ApplyForm() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isDuplicate, setIsDuplicate] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    track('apply_view')
    // Persist UTM params to session
    const params = new URLSearchParams(window.location.search)
    const utm = {
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      utm_content: params.get('utm_content'),
      utm_term: params.get('utm_term'),
    }
    if (Object.values(utm).some(Boolean)) {
      sessionStorage.setItem('rinmo_utm', JSON.stringify(utm))
    }
  }, [])

  function validateForm(): boolean {
    const newErrors: Partial<Record<keyof FormState, string>> = {}

    if (!form.full_name.trim()) newErrors.full_name = 'Full name is required.'
    if (!form.work_email.trim()) {
      newErrors.work_email = 'Work email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.work_email)) {
      newErrors.work_email = 'Please enter a valid email address.'
    }
    if (!form.company_name.trim()) newErrors.company_name = 'Company name is required.'
    if (!form.role) newErrors.role = 'Please select your role.'
    if (!form.company_size) newErrors.company_size = 'Please select your company size.'
    if (!form.hires_per_year) newErrors.hires_per_year = 'Please select hires per year.'
    if (form.primary_pain.length === 0) newErrors.primary_pain = 'Select at least one pain point.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateForm()) return

    setSubmitting(true)
    setServerError(null)
    setIsDuplicate(false)

    try {
      const utmParams = getUtmParams()
      const result = await submitApplication({
        full_name: form.full_name,
        work_email: form.work_email,
        company_name: form.company_name,
        role: form.role as Role,
        company_size: form.company_size as CompanySize,
        hires_per_year: form.hires_per_year as HiresPerYear,
        primary_pain: form.primary_pain,
        current_tools: form.current_tools || undefined,
        notes: form.notes || undefined,
        wants_onboarding_call: form.wants_onboarding_call,
        ...utmParams,
      })

      if (result.success) {
        track('apply_submit_success', { role: form.role, company_size: form.company_size })
        const firstName = form.full_name.split(' ')[0]
        router.push(`/thanks?name=${encodeURIComponent(firstName)}`)
      } else {
        track('apply_submit_error', { error: result.error, duplicate: result.duplicate })
        setServerError(result.error ?? 'Something went wrong.')
        if (result.duplicate) setIsDuplicate(true)
        setSubmitting(false)
      }
    } catch {
      track('apply_submit_error', { error: 'unexpected' })
      setServerError('An unexpected error occurred. Please try again.')
      setSubmitting(false)
    }
  }

  function handlePainToggle(value: PrimaryPain) {
    setForm((prev) => ({
      ...prev,
      primary_pain: prev.primary_pain.includes(value)
        ? prev.primary_pain.filter((p) => p !== value)
        : [...prev.primary_pain, value],
    }))
    if (errors.primary_pain) {
      setErrors((prev) => ({ ...prev, primary_pain: undefined }))
    }
  }

  const inputClass = (hasError: boolean) =>
    [
      'w-full px-4 py-2.5 rounded-lg text-sm bg-transparent border transition-colors outline-none',
      'placeholder-[var(--text-dim)] text-white',
      hasError
        ? 'border-red-500 focus:border-red-400'
        : 'border-[var(--border)] focus:border-[var(--accent)]',
    ].join(' ')

  const labelClass = 'block text-sm font-medium mb-1.5'

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
      aria-label="Early access application form"
    >
      {/* Full name */}
      <div>
        <label htmlFor="full_name" className={labelClass}>
          Full name <span className="text-red-400">*</span>
        </label>
        <input
          id="full_name"
          type="text"
          autoComplete="name"
          placeholder="Alex Johnson"
          value={form.full_name}
          onChange={(e) => {
            setForm((p) => ({ ...p, full_name: e.target.value }))
            if (errors.full_name) setErrors((p) => ({ ...p, full_name: undefined }))
          }}
          className={inputClass(!!errors.full_name)}
          aria-describedby={errors.full_name ? 'full_name_error' : undefined}
          aria-invalid={!!errors.full_name}
          style={{ background: 'var(--surface-1)' }}
        />
        {errors.full_name && (
          <p id="full_name_error" className="mt-1 text-xs text-red-400" role="alert">
            {errors.full_name}
          </p>
        )}
      </div>

      {/* Work email */}
      <div>
        <label htmlFor="work_email" className={labelClass}>
          Work email <span className="text-red-400">*</span>
        </label>
        <input
          id="work_email"
          type="email"
          autoComplete="email"
          placeholder="alex@company.com"
          value={form.work_email}
          onChange={(e) => {
            setForm((p) => ({ ...p, work_email: e.target.value }))
            if (errors.work_email) setErrors((p) => ({ ...p, work_email: undefined }))
          }}
          className={inputClass(!!errors.work_email)}
          aria-describedby={errors.work_email ? 'work_email_error' : undefined}
          aria-invalid={!!errors.work_email}
          style={{ background: 'var(--surface-1)' }}
        />
        {errors.work_email && (
          <p id="work_email_error" className="mt-1 text-xs text-red-400" role="alert">
            {errors.work_email}
          </p>
        )}
      </div>

      {/* Company name */}
      <div>
        <label htmlFor="company_name" className={labelClass}>
          Company name <span className="text-red-400">*</span>
        </label>
        <input
          id="company_name"
          type="text"
          autoComplete="organization"
          placeholder="Acme Inc."
          value={form.company_name}
          onChange={(e) => {
            setForm((p) => ({ ...p, company_name: e.target.value }))
            if (errors.company_name) setErrors((p) => ({ ...p, company_name: undefined }))
          }}
          className={inputClass(!!errors.company_name)}
          aria-describedby={errors.company_name ? 'company_name_error' : undefined}
          aria-invalid={!!errors.company_name}
          style={{ background: 'var(--surface-1)' }}
        />
        {errors.company_name && (
          <p id="company_name_error" className="mt-1 text-xs text-red-400" role="alert">
            {errors.company_name}
          </p>
        )}
      </div>

      {/* Role */}
      <div>
        <label htmlFor="role" className={labelClass}>
          Your role <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <select
            id="role"
            value={form.role}
            onChange={(e) => {
              setForm((p) => ({ ...p, role: e.target.value as Role }))
              if (errors.role) setErrors((p) => ({ ...p, role: undefined }))
            }}
            className={inputClass(!!errors.role) + ' appearance-none pr-10 cursor-pointer'}
            aria-invalid={!!errors.role}
            style={{ background: 'var(--surface-1)' }}
          >
            <option value="" disabled>Select your role</option>
            {ROLES.map((r) => (
              <option key={r} value={r} style={{ background: 'var(--surface-2)' }}>
                {r}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-[var(--text-dim)]"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M8 10.5L3 5.5h10L8 10.5z" />
          </svg>
        </div>
        {errors.role && (
          <p className="mt-1 text-xs text-red-400" role="alert">{errors.role}</p>
        )}
      </div>

      {/* Company size + hires per year */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company_size" className={labelClass}>
            Company size <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              id="company_size"
              value={form.company_size}
              onChange={(e) => {
                setForm((p) => ({ ...p, company_size: e.target.value as CompanySize }))
                if (errors.company_size) setErrors((p) => ({ ...p, company_size: undefined }))
              }}
              className={inputClass(!!errors.company_size) + ' appearance-none pr-10 cursor-pointer'}
              aria-invalid={!!errors.company_size}
              style={{ background: 'var(--surface-1)' }}
            >
              <option value="" disabled>Employees</option>
              {COMPANY_SIZES.map((s) => (
                <option key={s} value={s} style={{ background: 'var(--surface-2)' }}>
                  {s} employees
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-[var(--text-dim)]"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 10.5L3 5.5h10L8 10.5z" />
            </svg>
          </div>
          {errors.company_size && (
            <p className="mt-1 text-xs text-red-400" role="alert">{errors.company_size}</p>
          )}
        </div>

        <div>
          <label htmlFor="hires_per_year" className={labelClass}>
            Hires per year <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              id="hires_per_year"
              value={form.hires_per_year}
              onChange={(e) => {
                setForm((p) => ({ ...p, hires_per_year: e.target.value as HiresPerYear }))
                if (errors.hires_per_year) setErrors((p) => ({ ...p, hires_per_year: undefined }))
              }}
              className={inputClass(!!errors.hires_per_year) + ' appearance-none pr-10 cursor-pointer'}
              aria-invalid={!!errors.hires_per_year}
              style={{ background: 'var(--surface-1)' }}
            >
              <option value="" disabled>Hires / year</option>
              {HIRES_PER_YEAR.map((h) => (
                <option key={h} value={h} style={{ background: 'var(--surface-2)' }}>
                  {h} hires/year
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-[var(--text-dim)]"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 10.5L3 5.5h10L8 10.5z" />
            </svg>
          </div>
          {errors.hires_per_year && (
            <p className="mt-1 text-xs text-red-400" role="alert">{errors.hires_per_year}</p>
          )}
        </div>
      </div>

      {/* Primary pain */}
      <fieldset>
        <legend className={labelClass}>
          Primary pain points <span className="text-red-400">*</span>
          <span className="text-[var(--text-dim)] font-normal ml-1">(select all that apply)</span>
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {PAIN_OPTIONS.map((option) => {
            const checked = form.primary_pain.includes(option.value)
            return (
              <label
                key={option.value}
                className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all"
                style={{
                  borderColor: checked ? 'var(--border-accent)' : 'var(--border)',
                  background: checked ? 'var(--accent-glow)' : 'var(--surface-1)',
                }}
              >
                <input
                  type="checkbox"
                  value={option.value}
                  checked={checked}
                  onChange={() => handlePainToggle(option.value)}
                  className="sr-only"
                />
                <span
                  className="w-4 h-4 mt-0.5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all"
                  style={{
                    borderColor: checked ? 'var(--accent)' : 'var(--text-dim)',
                    background: checked ? 'var(--accent)' : 'transparent',
                  }}
                  aria-hidden="true"
                >
                  {checked && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M1.5 5L4 7.5L8.5 2.5"
                        stroke="#000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-sm leading-snug">{option.label}</span>
              </label>
            )
          })}
        </div>
        {errors.primary_pain && (
          <p className="mt-2 text-xs text-red-400" role="alert">{errors.primary_pain}</p>
        )}
      </fieldset>

      {/* Current tools */}
      <div>
        <label htmlFor="current_tools" className={labelClass}>
          Current tools
          <span className="text-[var(--text-dim)] font-normal ml-1">(optional)</span>
        </label>
        <input
          id="current_tools"
          type="text"
          placeholder="Greenhouse, Lever, spreadsheets, none..."
          value={form.current_tools}
          onChange={(e) => setForm((p) => ({ ...p, current_tools: e.target.value }))}
          className={inputClass(false)}
          style={{ background: 'var(--surface-1)' }}
        />
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className={labelClass}>
          Anything else we should know
          <span className="text-[var(--text-dim)] font-normal ml-1">(optional)</span>
        </label>
        <textarea
          id="notes"
          rows={3}
          placeholder="Specific use case, timeline, questions..."
          value={form.notes}
          onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
          className={inputClass(false) + ' resize-y min-h-[80px]'}
          style={{ background: 'var(--surface-1)' }}
        />
      </div>

      {/* Onboarding call */}
      <label
        className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all"
        style={{
          borderColor: form.wants_onboarding_call ? 'var(--border-accent)' : 'var(--border)',
          background: form.wants_onboarding_call ? 'var(--accent-glow)' : 'var(--surface-1)',
        }}
      >
        <input
          type="checkbox"
          checked={form.wants_onboarding_call}
          onChange={(e) => setForm((p) => ({ ...p, wants_onboarding_call: e.target.checked }))}
          className="sr-only"
        />
        <span
          className="w-4 h-4 mt-0.5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all"
          style={{
            borderColor: form.wants_onboarding_call ? 'var(--accent)' : 'var(--text-dim)',
            background: form.wants_onboarding_call ? 'var(--accent)' : 'transparent',
          }}
          aria-hidden="true"
        >
          {form.wants_onboarding_call && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M1.5 5L4 7.5L8.5 2.5"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        <div>
          <p className="text-sm font-medium">I want to book an onboarding call this month</p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            We&apos;ll send a Calendly link to get on our calendar. 15 minutes, no pressure.
          </p>
        </div>
      </label>

      {/* Server error */}
      {serverError && (
        <div
          className="p-4 rounded-lg border text-sm"
          role="alert"
          style={{
            borderColor: isDuplicate ? 'var(--border-accent)' : 'rgba(239,68,68,0.3)',
            background: isDuplicate ? 'var(--accent-glow)' : 'rgba(239,68,68,0.1)',
            color: isDuplicate ? 'var(--accent)' : '#f87171',
          }}
        >
          {serverError}
          {isDuplicate && (
            <a
              href="https://calendly.com/YOUR_LINK_HERE"
              className="underline ml-2 font-medium"
            >
              Book a call →
            </a>
          )}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        style={{
          background: 'var(--accent)',
          color: '#000',
          boxShadow: submitting ? 'none' : '0 0 20px var(--accent-glow)',
        }}
      >
        {submitting ? (
          <>
            <svg
              className="animate-spin w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Submitting…
          </>
        ) : (
          <>
            Submit application
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M7 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        )}
      </button>

      <p className="text-xs text-center text-[var(--text-dim)]">
        By submitting, you agree to our{' '}
        <a href="/privacy" className="underline hover:text-white transition-colors">
          privacy policy
        </a>
        . We don&apos;t spam. We don&apos;t sell data.
      </p>
    </form>
  )
}
