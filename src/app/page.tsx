import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CTAButton from '@/components/CTAButton'
import AnimatedNodeNetwork from '@/components/AnimatedNodeNetwork'
import DashboardMockupInteractive from '@/components/DashboardMockupInteractive'
import ErrorBoundary from '@/components/ErrorBoundary'
import HowRinmoWorks from '@/components/HowRinmoWorks'
import FAQDropdown from '@/components/FAQDropdown'

export const metadata: Metadata = {
  title: 'Rinmo — AI Hiring Decision System',
  description:
    'Screen candidates, run structured evaluations, and get ranked shortlists with reasoning and audit logs. Built for hiring teams that care about quality and consistency.',
  openGraph: {
    title: 'Rinmo — AI Hiring Decision System',
    description: 'Screen candidates faster. Decide with confidence. Audit everything.',
  },
}

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
  {
    q: 'How does Rinmo fit into an existing hiring stack?',
    a: "Rinmo sits on top of your ATS. It doesn't replace Greenhouse or Lever. It handles the part they don't: structured evaluation, scoring with reasoning, and decision logs. You keep your pipeline in your ATS; Rinmo runs the screening and evaluation layer.",
  },
  {
    q: 'What information about candidates does Rinmo keep?',
    a: 'Responses to structured questions (text, voice, or video depending on setup), the scores and reasoning we generate, and event logs. We do not build cross-company profiles. You own the data. Candidates are informed before they participate.',
  },
  {
    q: 'Can we define our own rubric and scoring dimensions?',
    a: "Yes. You set the dimensions and what good looks like. Rinmo scores against your criteria. We're not applying a generic template — you define the rubric per role.",
  },
  {
    q: 'How does Rinmo make hiring decisions more consistent?',
    a: 'Every candidate gets the same questions. Every response is scored against the same rubric. No ad-hoc interviews, no "I just got a good feeling." The output is a scored shortlist with reasoning per dimension. You can defend the decision because the logic is explicit and logged.',
  },
  {
    q: 'What does early access include?',
    a: 'A live pilot with your real candidates. Onboarding to configure your role and rubric. Access to the shortlist dashboard and audit logs. Direct contact with the team. It\'s a pilot, not a waitlist.',
  },
  {
    q: 'How long until we can run a live pipeline?',
    a: 'Most teams are live within 48 hours. One session to set up the role and rubric, then you run candidates through.',
  },
]

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

            {/* Right: mockup — hover for Interact + depth, wrapped in error boundary */}
            <div className="flex items-center justify-center lg:justify-end min-h-[320px]">
              <div className="w-full max-w-[420px] min-w-0">
                <ErrorBoundary
                  fallback={
                    <div
                      className="w-full min-h-[320px] rounded-2xl flex items-center justify-center text-center p-8"
                      style={{
                        background: 'var(--surface-2)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      <div>
                        <p className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
                          Dashboard preview
                        </p>
                        <p className="text-xs">Refresh the page to load the interactive mockup.</p>
                      </div>
                    </div>
                  }
                >
                  <DashboardMockupInteractive />
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <HowRinmoWorks />

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

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 px-6" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-site mx-auto">
          <span className="section-eyebrow">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-16" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Questions we get.
          </h2>

          <FAQDropdown items={FAQS} />
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 60%, var(--accent-glow) 0%, transparent 65%)' }} aria-hidden="true" />
        <div className="max-w-site mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-5" style={{ color: 'var(--text)', letterSpacing: '-0.03em' }}>
            Ready to hire with Rinmo?
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
