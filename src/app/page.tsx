import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CTAButton from '@/components/CTAButton'
import AnimatedNodeNetwork from '@/components/AnimatedNodeNetwork'

export const metadata: Metadata = {
  title: 'Rinmo — AI Hiring Decision System',
  description:
    'Screen candidates, run structured evaluations, and get ranked shortlists with reasoning and audit logs. Built for hiring teams that care about quality and consistency.',
  openGraph: {
    title: 'Rinmo — AI Hiring Decision System',
    description: 'Screen candidates faster. Decide with confidence. Audit everything.',
  },
}

const PAIN_POINTS = [
  { icon: '⏱', title: '23 hours', sub: 'average time spent per hire on screening alone' },
  { icon: '🎲', title: 'No structure', sub: 'every interviewer evaluates differently with no shared rubric' },
  { icon: '⚖️', title: 'Bias risk', sub: 'gut-feel decisions that are impossible to justify or audit' },
  { icon: '📁', title: 'No audit trail', sub: 'if a candidate challenges a decision, you have nothing to show' },
]

const STEPS = [
  {
    num: '01', title: 'Intake',
    desc: "Define the role and set your rubric. Tell Rinmo what you're hiring for: the skills, signals, and dealbreakers. Takes 10 minutes.",
    detail: 'Role definition · Scoring dimensions · Knockout filters',
  },
  {
    num: '02', title: 'Screen',
    desc: 'Rinmo contacts candidates via structured questions (written, voice, or video). Every candidate gets the same experience — no scheduling chaos.',
    detail: 'Async voice/video · Structured prompts · Auto transcription',
  },
  {
    num: '03', title: 'Rank',
    desc: 'Get a scored shortlist with reasoning for each candidate. Every decision is logged. Move to interviews with confidence.',
    detail: 'Scored shortlist · Per-dimension reasoning · Full audit export',
  },
]

const FEATURES = [
  { icon: '🔍', title: 'AI screening that reads the signals', desc: 'Not keyword matching. Rinmo evaluates answers against your rubric and flags what matters: communication, relevance, red flags.' },
  { icon: '📋', title: 'Structured scorecards', desc: 'Every candidate scored on the same dimensions. Customize templates per role. No more "I just got a good feeling about them."' },
  { icon: '🏆', title: 'Ranked shortlist with reasoning', desc: 'See who scored highest and exactly why. Compare candidates side by side. Defend your shortlist in 30 seconds.' },
  { icon: '🔐', title: 'Audit logs built in', desc: 'Every screening event, score, and decision is logged with timestamps. Export for compliance reviews or legal challenges.' },
  { icon: '🔗', title: 'ATS & calendar integrations', desc: 'Works alongside your existing ATS. Connects to Google Calendar, Outlook, and Slack. (Integrations in progress — launching with early access.)' },
  { icon: '⚡', title: 'Fast setup, real results', desc: 'Go from role definition to first shortlist in under 48 hours. No 6-month enterprise implementation, no dedicated IT.' },
]

const EARLY_ACCESS_DELIVERABLES = [
  'Dedicated onboarding session (role setup + rubric calibration)',
  '3 custom scorecard templates built with you',
  'Your first live pipeline run with full support',
  'Shortlist dashboard access',
  'Audit log export in CSV and PDF',
  'Direct access to the founding team',
  'Locked-in pilot pricing before public launch',
]

const COMPARISON = [
  { dimension: 'Time to first shortlist', manual: '3–5 days', ats: '2–4 days', rinmo: '<24 hours' },
  { dimension: 'Structured evaluation', manual: 'None', ats: 'Minimal', rinmo: 'Built in' },
  { dimension: 'Consistent scoring', manual: '✗', ats: '✗', rinmo: '✓' },
  { dimension: 'Decision reasoning', manual: '✗', ats: '✗', rinmo: '✓' },
  { dimension: 'Audit trail', manual: '✗', ats: 'Partial', rinmo: 'Full' },
  { dimension: 'Bias mitigation', manual: '✗', ats: '✗', rinmo: 'Structured' },
  { dimension: 'Effort per hire', manual: 'High', ats: 'Medium', rinmo: 'Low' },
]

const FAQS = [
  { q: 'What does early access actually include?', a: "Early access is a hands-on pilot, not a waitlist. You get a dedicated onboarding session, custom scorecard templates, a live pipeline run with your real candidates, full shortlist dashboard access, and direct access to our founding team. We're treating each pilot team as a design partner." },
  { q: 'Does Rinmo replace our ATS?', a: "No. Rinmo sits on top of your existing ATS as a screening and decision layer. We're not trying to rebuild Greenhouse or Lever. We do the part they can't: structured, explainable, AI-powered candidate evaluation." },
  { q: 'Can we customize the rubric and scoring dimensions?', a: 'Yes, that\'s the whole point. Every role and company is different. You define what good looks like for each role, and Rinmo scores against your criteria — not generic "culture fit" nonsense.' },
  { q: 'How does Rinmo reduce bias in hiring?', a: "Bias comes from inconsistency. When every candidate answers different questions, evaluated by different people with no shared standard, you're flying blind. Rinmo enforces identical structured questions for every candidate and scores against explicit dimensions — making the process auditable and consistent by design." },
  { q: 'What candidate data does Rinmo store?', a: 'We store responses to structured questions (text/audio/video depending on configuration), AI-generated scores and reasoning, and event logs. We do not build candidate profiles across companies. You own your data, and candidates are informed before participating.' },
  { q: 'How long does onboarding take?', a: "Most teams are running their first live pipeline within 48 hours. Setup involves one 30-minute session to configure your role and rubric, and then you're live. There is no long implementation cycle." },
]

function DashboardMockup() {
  const candidates = [
    { name: 'Jordan Lee', score: 94, badge: 'Top match', color: '#00C2FF' },
    { name: 'Priya Sharma', score: 87, badge: 'Strong', color: '#4ADE80' },
    { name: 'Marcus Webb', score: 71, badge: 'Review', color: '#FACC15' },
  ]
  return (
    <div style={{ background: 'var(--mockup-bg)', border: '1px solid var(--mockup-border)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 0 60px rgba(0,0,0,0.3), 0 24px 48px rgba(0,0,0,0.4)' }}>
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
        {/* Pipeline header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <p style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>PIPELINE</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Senior Engineer · Q1 2025</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 999, background: 'var(--accent-glow)', border: '1px solid var(--border-accent)', fontSize: 11, color: 'var(--accent)', fontWeight: 500 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'block' }} />
            24 screened
          </div>
        </div>

        {/* Candidates */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
          {candidates.map((c, i) => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px', borderRadius: 10, background: i === 0 ? 'var(--accent-glow)' : 'var(--surface-2)', border: `1px solid ${i === 0 ? 'var(--border-accent)' : 'var(--border)'}` }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, background: `${c.color}22`, color: c.color, flexShrink: 0 }}>{c.name[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</p>
                <p style={{ fontSize: 10, color: 'var(--text-dim)' }}>Senior Engineer</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
                <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, fontWeight: 500, background: `${c.color}18`, color: c.color }}>{c.badge}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: c.color }}>{c.score}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Score breakdown */}
        <div style={{ borderRadius: 10, padding: '11px 12px', border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
          <p style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 9 }}>Score breakdown · Jordan Lee</p>
          {[
            { label: 'Technical depth', score: 96 },
            { label: 'Communication', score: 91 },
            { label: 'Culture signals', score: 88 },
            { label: 'Role alignment', score: 94 },
          ].map((dim) => (
            <div key={dim.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', width: 100, flexShrink: 0 }}>{dim.label}</span>
              <div style={{ flex: 1, height: 3, borderRadius: 2, background: 'var(--border)' }}>
                <div style={{ width: `${dim.score}%`, height: 3, borderRadius: 2, background: 'linear-gradient(90deg, var(--accent-dim), var(--accent))' }} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--accent)', width: 22, textAlign: 'right' }}>{dim.score}</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 7, marginTop: 11 }}>
          {['SSO + SCIM', 'Audit Logs', 'ATS Sync'].map((tag) => (
            <span key={tag} style={{ fontSize: 10, padding: '3px 9px', borderRadius: 999, border: '1px solid var(--border)', color: 'var(--text-dim)' }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--accent)' }}>
      <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Nav />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden grid-bg" style={{ minHeight: '92vh', display: 'flex', alignItems: 'center' }}>
        {/* Animated node canvas — full section */}
        <AnimatedNodeNetwork />

        {/* Gradient fade: left side stays legible */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(100deg, var(--bg) 38%, transparent 72%)' }} aria-hidden="true" />

        <div className="max-w-site mx-auto px-6 w-full relative pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left copy */}
            <div>
              <div className="mb-5">
                <div className="hero-wordmark">Rinmo</div>
                <p className="text-xs font-bold tracking-[0.16em] uppercase mt-2 ml-0.5" style={{ color: 'var(--accent)' }}>
                  AI Hiring Decision System
                </p>
              </div>

              <p className="text-lg leading-relaxed mb-6 max-w-md" style={{ color: 'var(--text-muted)' }}>
                Screen candidates, run{' '}
                <span style={{ color: 'var(--accent)' }}>structured evaluations</span>, and get{' '}
                <span style={{ color: 'var(--accent)' }}>ranked shortlists</span> with reasoning.
                Built for hiring teams who need fast, trusted decisions.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {['Audit logs', 'Consistent scoring', 'Explainable AI', 'No ATS replacement'].map((chip) => (
                  <span key={chip} className="chip">{chip}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <CTAButton href="/apply" source="hero_primary">Get early access</CTAButton>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-all"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                >
                  See how it works
                </a>
              </div>
            </div>

            {/* Right: mockup */}
            <div className="hidden lg:block">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="py-24 px-6" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-site mx-auto">
          <span className="section-eyebrow">The problem</span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
                Hiring is broken for teams that care about quality.
              </h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: 420, lineHeight: 1.75 }}>
                Not broken like &ldquo;it&rsquo;s inconvenient.&rdquo; Broken like &ldquo;you&rsquo;re making six-figure decisions on vibes and hoping it works out.&rdquo;
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PAIN_POINTS.map((p) => (
                <div key={p.title} className="card-hover p-5">
                  <div className="text-2xl mb-3">{p.icon}</div>
                  <div className="text-base font-bold mb-1" style={{ color: 'var(--text)' }}>{p.title}</div>
                  <p className="text-sm" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 px-6" style={{ background: 'var(--surface-1)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-site mx-auto">
          <span className="section-eyebrow">How Rinmo works</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Three steps. One shortlist.
          </h2>
          <p className="mb-14" style={{ color: 'var(--text-muted)', maxWidth: 440 }}>
            Designed for hiring teams who want rigor without the overhead.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative p-7 rounded-2xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                {/* Connector line between steps */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-6 h-px z-10" style={{ background: 'var(--accent)', opacity: 0.3 }} />
                )}
                <div className="text-5xl font-black mb-5 leading-none" style={{ color: 'var(--border)', WebkitTextStroke: '1px var(--border)' }}>
                  {step.num}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>{step.title}</h3>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{step.desc}</p>
                <div className="text-xs font-mono pt-4" style={{ color: 'var(--accent)', borderTop: '1px solid var(--border)' }}>
                  {step.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EARLY ACCESS ── */}
      <section className="py-24 px-6" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-site mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-eyebrow">Early access</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
                This is a real offer,<br />not a waitlist.
              </h2>
              <p className="leading-relaxed" style={{ color: 'var(--text-muted)', maxWidth: 420 }}>
                Early access teams work directly with our founding engineers. You get a live system,
                real results, and a seat at the table to shape how Rinmo evolves.
                We&rsquo;re accepting a limited number of pilot teams for Q1.
              </p>
            </div>

            <div className="p-7 rounded-2xl" style={{ border: '1px solid var(--border-accent)', background: 'var(--surface-1)' }}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: 'var(--text-dim)' }}>
                What you get
              </p>
              <ul className="space-y-3 mb-7">
                {EARLY_ACCESS_DELIVERABLES.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <CheckIcon />
                    {d}
                  </li>
                ))}
              </ul>
              <CTAButton href="/apply" source="early_access_section" fullWidth>
                Apply for early access
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6" style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-site mx-auto">
          <span className="section-eyebrow">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Everything you need to hire without guessing.
          </h2>
          <p className="mb-14" style={{ color: 'var(--text-muted)', maxWidth: 440 }}>
            No keyword matching. No gut-feel scorecards. No black-box decisions.
          </p>

          {/* Asymmetric feature layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Large feature — spans 7 cols */}
            <div className="md:col-span-7 p-7 rounded-2xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
              <div className="text-3xl mb-4">{FEATURES[0].icon}</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>{FEATURES[0].title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{FEATURES[0].desc}</p>
            </div>
            {/* Small feature — spans 5 cols */}
            <div className="md:col-span-5 p-6 rounded-2xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
              <div className="text-3xl mb-4">{FEATURES[1].icon}</div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>{FEATURES[1].title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{FEATURES[1].desc}</p>
            </div>
            {/* Three equal cards */}
            {FEATURES.slice(2).map((f) => (
              <div key={f.title} className="md:col-span-4 p-6 rounded-2xl card-hover">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="py-24 px-6" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-site mx-auto">
          <span className="section-eyebrow">Comparison</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-14" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
            How Rinmo stacks up.
          </h2>

          <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid var(--border)' }}>
            <table className="w-full text-sm" aria-label="Comparison table">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-1)' }}>
                  <th className="text-left px-6 py-4 font-medium w-1/4" style={{ color: 'var(--text-dim)' }}>Dimension</th>
                  <th className="text-center px-6 py-4 font-medium" style={{ color: 'var(--text-dim)' }}>Manual hiring</th>
                  <th className="text-center px-6 py-4 font-medium" style={{ color: 'var(--text-dim)' }}>ATS alone</th>
                  <th className="text-center px-6 py-4 font-semibold" style={{ color: 'var(--accent)', background: 'var(--accent-glow)' }}>Rinmo</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.dimension} style={{ borderBottom: i < COMPARISON.length - 1 ? '1px solid var(--border)' : undefined }}>
                    <td className="px-6 py-3.5" style={{ color: 'var(--text-muted)' }}>{row.dimension}</td>
                    <td className="px-6 py-3.5 text-center" style={{ color: 'var(--text-dim)' }}>{row.manual}</td>
                    <td className="px-6 py-3.5 text-center" style={{ color: 'var(--text-dim)' }}>{row.ats}</td>
                    <td className="px-6 py-3.5 text-center font-semibold" style={{ color: 'var(--accent)', background: 'var(--accent-glow)' }}>{row.rinmo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-24 px-6" style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-site mx-auto">
          <span className="section-eyebrow">Pilot teams</span>
          <h2 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Built with early-stage hiring teams.
          </h2>

          <div className="flex flex-wrap gap-3 mb-14">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-32 rounded-lg border flex items-center justify-center text-xs" style={{ borderColor: 'var(--border)', background: 'var(--surface-2)', color: 'var(--text-dim)' }}>
                Logo {i} (placeholder)
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { quote: 'We were spending 3 hours per candidate on screening calls. Rinmo got us to a scored shortlist before I finished my coffee on Monday morning.', name: 'Head of Talent — [Placeholder]' },
              { quote: 'For the first time, I can actually defend our shortlist to the CEO with data. Not a hunch. Not vibes. A structured score with reasoning.', name: 'Hiring Manager — [Placeholder]' },
            ].map((t) => (
              <div key={t.name} className="p-7 rounded-2xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                <div className="text-3xl mb-4" style={{ color: 'var(--accent)', opacity: 0.5, lineHeight: 1 }}>&ldquo;</div>
                <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>{t.quote}</p>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-dim)' }}>{t.name}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-dim)', opacity: 0.5 }}>— Placeholder, will be replaced with verified pilot customers</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 px-6" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-site mx-auto">
          <span className="section-eyebrow">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-14" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Honest answers.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border-t pt-6" style={{ borderColor: 'var(--border)' }}>
                <h3 className="font-semibold mb-3" style={{ color: 'var(--text)' }}>{faq.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 60%, var(--accent-glow) 0%, transparent 65%)' }} aria-hidden="true" />
        <div className="max-w-site mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-5" style={{ color: 'var(--text)', letterSpacing: '-0.03em' }}>
            Ready to hire with rigor?
          </h2>
          <p className="mb-8 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
            We&rsquo;re accepting a limited number of pilot teams. Applications are reviewed within 24 hours.
          </p>
          <CTAButton href="/apply" source="final_cta">Apply for early access</CTAButton>
          <p className="mt-5 text-xs" style={{ color: 'var(--text-dim)' }}>
            Limited pilot slots · No commitment required · Response within 24 hours
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
