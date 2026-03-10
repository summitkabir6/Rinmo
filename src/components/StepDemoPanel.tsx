'use client'

import { useEffect, useState } from 'react'

const MOCKUP_BASE = {
  background: 'var(--mockup-bg)',
  border: '1px solid var(--mockup-border)',
  borderRadius: 24,
  overflow: 'hidden' as const,
  boxShadow: '0 0 60px rgba(0,0,0,0.3), 0 24px 48px rgba(0,0,0,0.4)',
}

function MockupChrome({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: '1px solid var(--border)', background: 'var(--surface-1)' }}>
      <div style={{ display: 'flex', gap: 5 }}>
        {['#ef4444', '#eab308', '#22c55e'].map((c) => (
          <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.7, display: 'block' }} />
        ))}
      </div>
      <span style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'monospace', marginLeft: 8 }}>{title}</span>
    </div>
  )
}

function Step1DefineRole() {
  return (
    <div style={MOCKUP_BASE}>
      <MockupChrome title="rinmo · role setup" />
      <div style={{ padding: 18 }}>
        <p style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>NEW ROLE</p>
        <div style={{ marginBottom: 14 }}>
          <input
            readOnly
            value="Senior Product Engineer"
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--text)',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              fontFamily: 'inherit',
              outline: 'none',
            }}
          />
        </div>
        <p style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>SCORING DIMENSIONS</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {['Technical depth', 'Communication', 'Culture fit', 'Role alignment'].map((d) => (
            <span key={d} style={{ fontSize: 10, padding: '5px 10px', borderRadius: 999, background: 'var(--accent-glow)', border: '1px solid var(--border-accent)', color: 'var(--accent)', fontWeight: 500 }}>
              {d}
            </span>
          ))}
        </div>
        <p style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>MUST-HAVE SIGNALS</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {['5+ years React', 'Led 0→1 product', 'Cross-functional collaboration'].map((s) => (
            <span key={s} style={{ fontSize: 10, padding: '4px 9px', borderRadius: 8, border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              {s}
            </span>
          ))}
        </div>
        <p style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>KNOCKOUT FILTERS</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { label: 'Right to work', active: true },
            { label: 'Availability within 2 weeks', active: false },
          ].map((f) => (
            <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 14, borderRadius: 7, background: f.active ? 'var(--accent)' : 'var(--border)', position: 'relative', transition: 'background 0.2s' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: f.active ? 16 : 2, transition: 'left 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }} />
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Step2CandidateApplies() {
  return (
    <div style={MOCKUP_BASE}>
      <MockupChrome title="rinmo · pipeline" />
      <div style={{ padding: 18 }}>
        <p style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>NEW APPLICATION</p>
        <div style={{ padding: '14px 16px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface-2)', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>JL</div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Jordan Lee</p>
              <p style={{ fontSize: 10, color: 'var(--text-dim)' }}>Applied 2h ago · Senior Product Engineer</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px', borderRadius: 10, background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', animation: 'pulse 1.2s ease-in-out infinite' }} />
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Parsing profile...</span>
          </div>
        </div>
        <p style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>EXTRACTED SIGNALS</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['TypeScript', 'React', 'Product ownership', 'Stripe API', '0→1 launch'].map((s) => (
            <span key={s} style={{ fontSize: 10, padding: '4px 9px', borderRadius: 8, background: 'var(--badge-top-bg)', color: 'var(--badge-top)', fontWeight: 500 }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Step3StructuredEvaluation() {
  return (
    <div style={MOCKUP_BASE}>
      <MockupChrome title="rinmo · evaluation" />
      <div style={{ padding: 18 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
          {['Written', 'Voice', 'Video'].map((t, i) => (
            <span key={t} style={{ fontSize: 10, padding: '4px 9px', borderRadius: 8, border: '1px solid var(--border)', color: i === 1 ? 'var(--accent)' : 'var(--text-dim)', background: i === 1 ? 'var(--accent-glow)' : 'transparent', fontWeight: 500 }}>
              {t}
            </span>
          ))}
        </div>
        <p style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>PROMPT</p>
        <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.5, marginBottom: 14, padding: '12px 14px', borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          Walk us through a hard technical tradeoff you made. What were the constraints, and how did you decide?
        </p>
        <p style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>RESPONSE / TRANSCRIPT</p>
        <div style={{ padding: '14px 16px', borderRadius: 12, border: '1px dashed var(--border)', background: 'var(--surface-1)', minHeight: 80 }}>
          <p style={{ fontSize: 11, color: 'var(--text-dim)', fontStyle: 'italic' }}>Response captured...</p>
        </div>
        <p style={{ fontSize: 10, color: 'var(--accent)', marginTop: 10, fontWeight: 500 }}>Same questions for every candidate</p>
      </div>
    </div>
  )
}

function Step4AIScoring() {
  const dimensions = [
    { label: 'Technical depth', score: 96, reasoning: 'Strong evidence from system design example; clear tradeoff reasoning.' },
    { label: 'Communication', score: 91, reasoning: 'Clear structure. Articulated constraints and impact.' },
    { label: 'Culture signals', score: 88, reasoning: 'Collaborative framing. Asked clarifying questions.' },
    { label: 'Role alignment', score: 94, reasoning: 'Directly relevant experience. Product–eng partnership focus.' },
  ]
  return (
    <div style={MOCKUP_BASE}>
      <MockupChrome title="rinmo · score breakdown" />
      <div style={{ padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <p style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>JORDAN LEE</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 999, background: 'var(--badge-top-bg)', color: 'var(--badge-top)', fontWeight: 600 }}>Top match</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent)' }}>92</span>
          </div>
        </div>
        <div style={{ border: '1px solid var(--border-accent)', borderRadius: 14, padding: 14, background: 'var(--accent-glow)', marginBottom: 12 }}>
          <p style={{ fontSize: 9, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: 6 }}>Explainable</p>
          <p style={{ fontSize: 11, color: 'var(--text)', lineHeight: 1.5 }}>Scores come with reasoning. No black box, no gut feel.</p>
        </div>
        {dimensions.map((dim, i) => (
          <div key={dim.label} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', width: 110, flexShrink: 0 }}>{dim.label}</span>
              <div style={{ flex: 1, height: 6, borderRadius: 4, background: 'var(--border)' }}>
                <div
                  style={{
                    width: `${dim.score}%`,
                    height: 6,
                    borderRadius: 4,
                    background: 'linear-gradient(90deg, var(--accent-dim), var(--accent))',
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', width: 24, textAlign: 'right' }}>{dim.score}</span>
            </div>
            {i === 0 && (
              <p style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.4, marginLeft: 118 }}>{dim.reasoning}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function Step5RankedShortlist() {
  const candidates = [
    { rank: 1, name: 'Jordan Lee', badge: 'Top match', tier: 'top' as const, score: 92 },
    { rank: 2, name: 'Priya Sharma', badge: 'Strong', tier: 'strong' as const, score: 87 },
    { rank: 3, name: 'Marcus Webb', badge: 'Review', tier: 'review' as const, score: 71 },
  ]
  return (
    <div style={MOCKUP_BASE}>
      <MockupChrome title="rinmo · shortlist" />
      <div style={{ padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <p style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>RANKED SHORTLIST</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: 'var(--accent-glow)', border: '1px solid var(--border-accent)', fontSize: 10, color: 'var(--accent)', fontWeight: 500 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
            Ready for interviews
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
          {candidates.map((c) => (
            <div
              key={c.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'var(--surface-2)',
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--border)', width: 20 }}>{c.rank}</span>
              <div style={{ width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, background: `var(--badge-${c.tier}-bg)`, color: `var(--badge-${c.tier})` }}>
                {c.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{c.name}</p>
              </div>
              <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 999, fontWeight: 500, background: `var(--badge-${c.tier}-bg)`, color: `var(--badge-${c.tier})` }}>
                {c.badge}
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: `var(--badge-${c.tier})` }}>{c.score}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface-1)' }}>
          <p style={{ fontSize: 10, color: 'var(--text-dim)' }}>Decision logged 12 Mar 2025 · <span style={{ color: 'var(--accent)', fontWeight: 500 }}>Export audit</span></p>
        </div>
      </div>
    </div>
  )
}

export default function StepDemoPanel({ activeStep }: { activeStep: number }) {
  const [displayStep, setDisplayStep] = useState(activeStep)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    if (activeStep !== displayStep) {
      setFade(true)
      const t = setTimeout(() => {
        setDisplayStep(activeStep)
        setFade(false)
      }, 120)
      return () => clearTimeout(t)
    }
  }, [activeStep, displayStep])

  const panels = [
    <Step1DefineRole key="1" />,
    <Step2CandidateApplies key="2" />,
    <Step3StructuredEvaluation key="3" />,
    <Step4AIScoring key="4" />,
    <Step5RankedShortlist key="5" />,
  ]

  return (
    <div
      className="step-demo-panel"
      style={{
        opacity: fade ? 0 : 1,
        transition: 'opacity 0.2s ease',
      }}
    >
      {panels[displayStep]}
    </div>
  )
}
