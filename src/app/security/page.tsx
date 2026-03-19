import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Security',
  description: 'How Rinmo protects candidate data and company hiring information.',
}

export default function SecurityPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      <main className="pt-28 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Hero */}
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: 'var(--accent)' }}
          >
            Security and data handling
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
            We protect candidate and company hiring data.
          </h1>
          <p className="text-base leading-relaxed mb-20" style={{ color: 'var(--text-muted)', maxWidth: 540 }}>
            Rinmo processes resumes, screening outputs, structured evaluations, and hiring notes. That data is sensitive. We treat it that way. This page describes how we handle it.
          </p>

          {/* Section 1: How we protect data */}
          <section className="mb-20">
            <h2 className="text-lg font-semibold mb-8" style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}>
              How we protect data
            </h2>

            <div className="space-y-8">
              <div
                className="p-6 rounded-2xl border"
                style={{ background: 'var(--surface-1)', borderColor: 'var(--border)' }}
              >
                <h3 className="font-semibold mb-3 text-sm" style={{ color: 'var(--text)' }}>
                  Tenant isolation
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Company data is separated at the database level. Your candidates, evaluations, and hiring workflows are scoped to your tenant. Other customers cannot access them. We use Supabase row-level security to enforce this.
                </p>
              </div>

              <div
                className="p-6 rounded-2xl border"
                style={{ background: 'var(--surface-1)', borderColor: 'var(--border)' }}
              >
                <h3 className="font-semibold mb-3 text-sm" style={{ color: 'var(--text)' }}>
                  Encryption
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Data is encrypted in transit (TLS) and at rest. We run on Supabase, which uses AWS infrastructure. API keys and service credentials stay server-side. They are not exposed to the client.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className="p-5 rounded-xl border"
                  style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
                >
                  <h3 className="font-semibold mb-2 text-sm" style={{ color: 'var(--text)' }}>
                    Secrets and privileged ops
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    Sensitive operations run server-side only. AI model calls, database writes, and admin actions use service credentials that never reach the browser.
                  </p>
                </div>
                <div
                  className="p-5 rounded-xl border"
                  style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
                >
                  <h3 className="font-semibold mb-2 text-sm" style={{ color: 'var(--text)' }}>
                    Dependencies
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    We keep dependencies updated and run vulnerability scanning on the codebase. No third-party scripts on candidate-facing flows.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Access and accountability */}
          <section className="mb-20">
            <h2 className="text-lg font-semibold mb-8" style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}>
              Access and accountability
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 text-sm" style={{ color: 'var(--text)' }}>
                  Role-based access
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Team members see only what their role allows. Admin actions are restricted. We scope permissions to the minimum needed for each function.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-sm" style={{ color: 'var(--text)' }}>
                  Audit logs
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Access to candidate data, screening runs, and admin functions is logged with timestamps and actor identifiers. You can export these logs. They support compliance reviews and internal investigations.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-sm" style={{ color: 'var(--text)' }}>
                  Internal access
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Rinmo engineers access production data only when required for support or debugging. Access is logged and reviewed. We do not use customer data for training public AI models.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Data lifecycle */}
          <section className="mb-20">
            <h2 className="text-lg font-semibold mb-8" style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}>
              Data lifecycle
            </h2>

            <div className="space-y-6">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                We collect what we need to run the product. We do not build candidate profiles across companies. We do not enrich data with third-party sources. We do not sell or share your data for marketing.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Retention follows your agreement with us and applicable law. You can request deletion at any time. We delete data when it is no longer needed for the service or when you ask us to.
              </p>
            </div>
          </section>

          {/* Bottom note */}
          <p
            className="text-sm mb-16"
            style={{ color: 'var(--text-dim)', fontStyle: 'italic', maxWidth: 480 }}
          >
            We&apos;re continuing to mature our security program as Rinmo grows. If you have questions about how we handle your data, email us.
          </p>

          {/* Report vulnerability */}
          <div
            className="p-6 rounded-2xl border"
            style={{ background: 'var(--surface-1)', borderColor: 'var(--border-accent)' }}
          >
            <h2 className="font-semibold mb-2 text-sm" style={{ color: 'var(--text)' }}>
              Report a vulnerability
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Found something? Email{' '}
              <a
                href="mailto:security@rinmo.ai"
                className="text-[var(--accent)] hover:underline"
              >
                security@rinmo.ai
              </a>{' '}
              with a description and reproduction steps. We aim to respond within 24 hours.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
