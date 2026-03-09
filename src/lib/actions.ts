'use server'

import { headers } from 'next/headers'
import { createServerClient } from '@/lib/supabase'
import type { ApplicationFormData } from '@/types'

export interface SubmitResult {
  success: boolean
  error?: string
  duplicate?: boolean
}

export async function submitApplication(
  formData: ApplicationFormData & {
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
    utm_content?: string
    utm_term?: string
  }
): Promise<SubmitResult> {
  // Server-side validation
  if (!formData.full_name?.trim()) return { success: false, error: 'Full name is required.' }
  if (!formData.work_email?.trim()) return { success: false, error: 'Work email is required.' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.work_email)) {
    return { success: false, error: 'Please enter a valid work email.' }
  }
  if (!formData.company_name?.trim()) return { success: false, error: 'Company name is required.' }
  if (!formData.role) return { success: false, error: 'Please select your role.' }
  if (!formData.company_size) return { success: false, error: 'Please select company size.' }
  if (!formData.hires_per_year) return { success: false, error: 'Please select hires per year.' }
  if (!formData.primary_pain?.length) return { success: false, error: 'Select at least one primary pain point.' }

  const headersList = headers()
  const referrer = headersList.get('referer') ?? undefined
  const userAgent = headersList.get('user-agent') ?? undefined

  try {
    const supabase = createServerClient()

    const record = {
      full_name: formData.full_name.trim(),
      work_email: formData.work_email.trim().toLowerCase(),
      company_name: formData.company_name.trim(),
      role: formData.role,
      company_size: formData.company_size,
      hires_per_year: formData.hires_per_year,
      primary_pain: formData.primary_pain.join(','),
      current_tools: formData.current_tools?.trim() || null,
      notes: formData.notes?.trim() || null,
      wants_onboarding_call: formData.wants_onboarding_call,
      utm_source: formData.utm_source || null,
      utm_medium: formData.utm_medium || null,
      utm_campaign: formData.utm_campaign || null,
      utm_content: formData.utm_content || null,
      utm_term: formData.utm_term || null,
      referrer: referrer || null,
      user_agent: userAgent || null,
    }

    const { error } = await supabase.from('early_access_applications').insert(record)

    if (error) {
      if (error.code === '23505') {
        // Unique violation on work_email
        return {
          success: false,
          duplicate: true,
          error: "Looks like you already applied. Want to book a call?",
        }
      }
      console.error('Supabase insert error:', error)
      return { success: false, error: 'Something went wrong. Please try again or email us directly.' }
    }

    return { success: true }
  } catch (err) {
    console.error('Unexpected error:', err)
    return { success: false, error: 'An unexpected error occurred. Please try again.' }
  }
}
