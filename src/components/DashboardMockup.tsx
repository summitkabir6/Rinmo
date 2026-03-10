'use client'

import { useState, useEffect } from 'react'

type BadgeTier = 'top' | 'strong' | 'review'

type Candidate = {
  id: string
  name: string
  score: number
  badge: string
  tier: BadgeTier
  breakdown: { label: string; score: number }[]
  isLoading?: boolean
}

type Pipeline = {
  id: string
  title: string
  subtitle: string
  candidates: Omit<Candidate, 'id'>[]
}

const PIPELINES: Pipeline[] = [
  {
    id: 'senior-engineer',
    title: 'Senior Engineer',
    subtitle: 'Q1 2025',
    candidates: [
      { name: 'Jordan Lee', score: 94, badge: 'Top match', tier: 'top', breakdown: [{ label: 'Technical depth', score: 96 }, { label: 'Communication', score: 91 }, { label: 'Culture signals', score: 88 }, { label: 'Role alignment', score: 94 }] },
      { name: 'Priya Sharma', score: 87, badge: 'Strong', tier: 'strong', breakdown: [{ label: 'Technical depth', score: 88 }, { label: 'Communication', score: 86 }, { label: 'Culture signals', score: 88 }, { label: 'Role alignment', score: 86 }] },
      { name: 'Marcus Webb', score: 71, badge: 'Review', tier: 'review', breakdown: [{ label: 'Technical depth', score: 72 }, { label: 'Communication', score: 70 }, { label: 'Culture signals', score: 71 }, { label: 'Role alignment', score: 72 }] },
    ],
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    subtitle: 'Q1 2025',
    candidates: [
      { name: 'Alex Chen', score: 91, badge: 'Top match', tier: 'top', breakdown: [{ label: 'Design sense', score: 94 }, { label: 'Collaboration', score: 88 }, { label: 'Portfolio', score: 92 }, { label: 'UX thinking', score: 90 }] },
      { name: 'Sam Rivera', score: 82, badge: 'Strong', tier: 'strong', breakdown: [{ label: 'Design sense', score: 84 }, { label: 'Collaboration', score: 80 }, { label: 'Portfolio', score: 82 }, { label: 'UX thinking', score: 82 }] },
      { name: 'Jordan Kim', score: 68, badge: 'Review', tier: 'review', breakdown: [{ label: 'Design sense', score: 70 }, { label: 'Collaboration', score: 66 }, { label: 'Portfolio', score: 68 }, { label: 'UX thinking', score: 69 }] },
    ],
  },
  {
    id: 'sales-lead',
    title: 'Sales Lead',
    subtitle: 'Q1 2025',
    candidates: [
      { name: 'Morgan Taylor', score: 96, badge: 'Top match', tier: 'top', breakdown: [{ label: 'Closing ability', score: 98 }, { label: 'Pipeline', score: 94 }, { label: 'Communication', score: 96 }, { label: 'Leadership', score: 96 }] },
      { name: 'Casey Brooks', score: 79, badge: 'Strong', tier: 'strong', breakdown: [{ label: 'Closing ability', score: 80 }, { label: 'Pipeline', score: 78 }, { label: 'Communication', score: 79 }, { label: 'Leadership', score: 79 }] },
      { name: 'Riley Davis', score: 65, badge: 'Review', tier: 'review', breakdown: [{ label: 'Closing ability', score: 66 }, { label: 'Pipeline', score: 64 }, { label: 'Communication', score: 65 }, { label: 'Leadership', score: 65 }] },
    ],
  },
]

function getBadgeAndTier(score: number): { badge: string; tier: BadgeTier } {
  if (score >= 85) return { badge: 'Top match', tier: 'top' }
  if (score >= 70) return { badge: 'Strong', tier: 'strong' }
  return { badge: 'Review', tier: 'review' }
}

const DEFAULT_BREAKDOWN_LABELS = ['Technical depth', 'Communication', 'Culture signals', 'Role alignment']

function generateBreakdown(score: number, labels: string[] = DEFAULT_BREAKDOWN_LABELS): { label: string; score: number }[] {
  const base = Math.floor(score / labels.length)
  const remainder = score - base * labels.length
  return labels.map((label, i) => ({
    label,
    score: Math.min(99, Math.max(1, base + (i < remainder ? 1 : 0) + (Math.random() > 0.5 ? 1 : 0))),
  }))
}

function LoadingDots() {
  const [dot, setDot] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setDot((d) => (d + 1) % 3), 400)
    return () => clearInterval(id)
  }, [])
  return (
    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-dim)' }}>
      {'.'.repeat(dot + 1)}
    </span>
  )
}

export default function DashboardMockup() {
  const [pipelineIndex, setPipelineIndex] = useState(0)
  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    const p = PIPELINES[0]
    return p.candidates.map((c, i) => ({ ...c, id: `${p.id}-${i}-${c.name}` }))
  })
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    const p = PIPELINES[0]
    const first = p.candidates[0]
    return first ? `${p.id}-0-${first.name}` : null
  })
  const [inputValue, setInputValue] = useState('')
  const [inputDisabled, setInputDisabled] = useState(false)
  const [breakdownKey, setBreakdownKey] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  const pipeline = PIPELINES[pipelineIndex]
  const screenedCount = candidates.length

  useEffect(() => {
    const base = pipeline.candidates.map((c, i) => ({
      ...c,
      id: `${pipeline.id}-${i}-${c.name}`,
    }))
    setCandidates(base)
    setSelectedId(base[0]?.id ?? null)
  }, [pipelineIndex])

  function switchPipeline(index: number) {
    if (index === pipelineIndex) return
    setFadeOut(true)
    setTimeout(() => {
      setPipelineIndex(index)
      setFadeOut(false)
    }, 150)
  }

  const selectedCandidate = candidates.find((c) => c.id === selectedId) ?? candidates[0]

  function handleAddCandidate() {
    const name = inputValue.trim()
    if (!name || inputDisabled) return

    setInputDisabled(true)
    setInputValue('')

    const id = `new-${Date.now()}`
    const newCandidate: Candidate = {
      id,
      name,
      score: 0,
      badge: 'Review',
      tier: 'review',
      breakdown: [],
      isLoading: true,
    }

    setCandidates((prev) => [newCandidate, ...prev])
    setSelectedId(id)
    setBreakdownKey((k) => k + 1)

    setTimeout(() => {
      const score = 62 + Math.floor(Math.random() * 35)
      const { badge, tier } = getBadgeAndTier(score)
      const labels = pipeline.candidates[0]?.breakdown.map((b) => b.label) ?? DEFAULT_BREAKDOWN_LABELS
      const breakdown = generateBreakdown(score, labels)

      setCandidates((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, score, badge, tier, breakdown, isLoading: false }
            : c
        )
      )
      setBreakdownKey((k) => k + 1)
      setInputDisabled(false)
    }, 1500)
  }

  return (
    <div style={{ background: 'var(--mockup-bg)', border: '1px solid var(--mockup-border)', borderRadius: 24, overflow: 'hidden', boxShadow: '0 0 60px rgba(0,0,0,0.3), 0 24px 48px rgba(0,0,0,0.4)' }}>
      {/* Title bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: '1px solid var(--border)', background: 'var(--surface-1)' }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#ef4444', '#eab308', '#22c55e'].map((c) => (
            <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.7, display: 'block' }} />
          ))}
        </div>
        <span style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'monospace', marginLeft: 8 }}>rinmo · shortlist dashboard</span>
      </div>

      <div style={{ padding: 18 }}>
        {/* Pipeline header with switcher */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <p style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>PIPELINE</p>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {PIPELINES.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => switchPipeline(i)}
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '4px 8px',
                    borderRadius: 12,
                    border: '1px solid var(--border)',
                    background: i === pipelineIndex ? 'var(--accent-glow)' : 'var(--surface-2)',
                    color: i === pipelineIndex ? 'var(--accent)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                  }}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 999, background: 'var(--accent-glow)', border: '1px solid var(--border-accent)', fontSize: 11, color: 'var(--accent)', fontWeight: 500 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'block' }} />
            {screenedCount} screened
          </div>
        </div>

        {/* Candidates */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 7,
            marginBottom: 14,
            opacity: fadeOut ? 0 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          {candidates.map((c, i) => {
            const isSelected = c.id === selectedId
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedId(c.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 11px',
                  borderRadius: 14,
                  background: isSelected ? 'var(--accent-glow)' : 'var(--surface-2)',
                  border: `1px solid ${isSelected ? 'var(--border-accent)' : 'var(--border)'}`,
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
              >
                <div style={{ width: 26, height: 26, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, background: `var(--badge-${c.tier}-bg)`, color: `var(--badge-${c.tier})`, flexShrink: 0 }}>{c.name[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</p>
                  <p style={{ fontSize: 10, color: 'var(--text-dim)' }}>{pipeline.title}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
                  <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, fontWeight: 500, background: `var(--badge-${c.tier}-bg)`, color: `var(--badge-${c.tier})` }}>{c.badge}</span>
                  {c.isLoading ? <LoadingDots /> : <span style={{ fontSize: 15, fontWeight: 700, color: `var(--badge-${c.tier})` }}>{c.score}</span>}
                </div>
              </button>
            )
          })}
        </div>

        {/* Score breakdown */}
        {selectedCandidate && (
          <div
            key={breakdownKey}
            style={{
              borderRadius: 14,
              padding: '11px 12px',
              border: '1px solid var(--border)',
              background: 'var(--surface-2)',
              transition: 'opacity 0.2s ease',
            }}
          >
            <p style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 9 }}>
              Score breakdown · {selectedCandidate.name}
            </p>
            {selectedCandidate.breakdown.length > 0 ? (
              selectedCandidate.breakdown.map((dim) => (
                <div key={dim.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', width: 100, flexShrink: 0 }}>{dim.label}</span>
                  <div style={{ flex: 1, height: 4, borderRadius: 4, background: 'var(--border)' }}>
                    <div
                      style={{
                        width: `${dim.score}%`,
                        height: 4,
                        borderRadius: 4,
                        background: 'linear-gradient(90deg, var(--accent-dim), var(--accent))',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--accent)', width: 22, textAlign: 'right' }}>{dim.score}</span>
                </div>
              ))
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Evaluating...</span>
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        <div style={{ display: 'flex', gap: 7, marginTop: 11 }}>
          {['SSO + SCIM', 'Audit Logs', 'ATS Sync'].map((tag) => (
            <span key={tag} style={{ fontSize: 10, padding: '3px 9px', borderRadius: 999, border: '1px solid var(--border)', color: 'var(--text-dim)' }}>{tag}</span>
          ))}
        </div>

        {/* Add candidate input */}
        <div style={{ marginTop: 14 }}>
          <input
            type="text"
            placeholder="@rinmo screen new candidate..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCandidate()}
            disabled={inputDisabled}
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: 11,
              color: 'var(--text)',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              outline: 'none',
              fontFamily: 'inherit',
              opacity: inputDisabled ? 0.6 : 1,
            }}
          />
        </div>
      </div>
    </div>
  )
}
