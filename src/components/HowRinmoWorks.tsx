'use client'

import { useState } from 'react'
import StepDemoPanel from './StepDemoPanel'

export type StepContent = {
  id: string
  num: string
  title: string
  desc: string
  bullets: string[]
}

const HOW_IT_WORKS_STEPS: StepContent[] = [
  {
    id: 'define-role',
    num: '01',
    title: 'Define the role',
    desc: 'Create the hiring blueprint so Rinmo knows exactly what to evaluate.',
    bullets: ['Role title', 'Scoring dimensions', 'Must-have signals', 'Knockout filters'],
  },
  {
    id: 'candidate-applies',
    num: '02',
    title: 'Candidate applies',
    desc: 'A candidate enters the funnel; Rinmo parses their profile and extracts signals.',
    bullets: ['Application enters system', 'Profile parsed', 'Skills and signals extracted'],
  },
  {
    id: 'structured-evaluation',
    num: '03',
    title: 'Structured evaluation',
    desc: 'Rinmo runs written, voice, or video evaluations with the same questions for everyone.',
    bullets: ['Written, voice, or video', 'Same questions for every candidate', 'Transcript and response capture'],
  },
  {
    id: 'ai-scoring',
    num: '04',
    title: 'AI scoring and reasoning',
    desc: 'Rinmo scores each dimension and explains why—no black box, no gut feel.',
    bullets: ['Dimension scores', 'Reasoning for each score'],
  },
  {
    id: 'ranked-shortlist',
    num: '05',
    title: 'Ranked shortlist',
    desc: 'You get a ranked list, recommendation labels, and a full decision trail to justify and audit.',
    bullets: ['Ranked candidates', 'Recommendation labels', 'Audit trail', 'Interview-ready'],
  },
]

export default function HowRinmoWorks() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="how-it-works" className="py-24 px-6" style={{ background: 'var(--surface-1)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-site mx-auto">
        <span className="section-eyebrow">How Rinmo works</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
          From role to shortlist. Five steps.
        </h2>
        <p className="mb-14" style={{ color: 'var(--text-muted)', maxWidth: 480 }}>
          Define what good looks like. Rinmo evaluates every candidate the same way and surfaces who fits, with reasoning.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Step list — desktop: left panel */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            {/* Mobile: horizontal scroll strip */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 lg:overflow-visible scrollbar-hide">
              {HOW_IT_WORKS_STEPS.map((step, i) => {
                const isActive = i === activeStep
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStep(i)}
                    className="how-it-works-step text-left flex-shrink-0 lg:flex-shrink w-max lg:w-full"
                    style={{
                      padding: '12px 16px',
                      borderRadius: 14,
                      border: `1px solid ${isActive ? 'var(--border-accent)' : 'var(--border)'}`,
                      background: isActive ? 'var(--accent-glow)' : 'var(--surface-2)',
                      cursor: 'pointer',
                      transition: 'background 0.2s, border-color 0.2s',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="text-lg font-black leading-none flex-shrink-0"
                        style={{
                          color: isActive ? 'var(--accent)' : 'var(--border)',
                          WebkitTextStroke: isActive ? 'none' : '1px var(--border)',
                        }}
                      >
                        {step.num}
                      </span>
                      <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                        {step.title}
                      </span>
                    </div>
                    <p className="text-xs mt-1.5 ml-7" style={{ color: 'var(--text-muted)', lineHeight: 1.4 }}>
                      {step.desc}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Demo panel — right side */}
          <div className="lg:col-span-8 min-h-[320px] md:min-h-[380px]">
            <StepDemoPanel activeStep={activeStep} />
          </div>
        </div>
      </div>
    </section>
  )
}
