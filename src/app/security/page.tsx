import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Security',
  description: 'Rinmo security posture — how we protect your data.',
}

const PRACTICES = [
  {
    icon: '🔑',
    title: 'Secrets management',
    desc: 'Service role keys and API credentials are never exposed to the client. All sensitive operations run server-side only.',
  },
  {
    icon: '🔒',
    title: 'Data encryption',
    desc: 'All data is encrypted in transit (TLS 1.2+) and at rest. We use Supabase on AWS infrastructure with row-level security.',
  },
  {
    icon: '📋',
    title: 'Access logging',
    desc: 'All access to candidate data and admin functions is logged with timestamps, IP addresses, and actor identifiers.',
  },
  {
    icon: '🎯',
    title: 'Data minimization',
    desc: 'We only collect what we need. We do not build candidate profiles across companies, and we do not enrich data with third-party sources.',
  },
  {
    icon: '🧱',
    title: 'Row-level security',
    desc: 'Customer data is isolated at the database level using Supabase RLS policies. Customers cannot access each other\'s data.',
  },
  {
    icon: '🔄',
    title: 'Dependency management',
    desc: 'We keep dependencies up to date and use automated vulnerability scanning on our codebase and dependencies.',
  },
]

export default function SecurityPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      <main className="pt-28 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: 'var(--accent)' }}
          >
            Security
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our security posture</h1>
          <p className="text-[var(--text-muted)] mb-12 leading-relaxed">
            We handle candidate data and company hiring information. That means security isn&apos;t
            an afterthought — it&apos;s a first-class design requirement from day one.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {PRACTICES.map((p) => (
              <div
                key={p.title}
                className="p-5 rounded-xl border"
                style={{
                  background: 'var(--surface-1)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="text-2xl mb-3">{p.icon}</div>
                <h2 className="font-semibold mb-1.5 text-sm">{p.title}</h2>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div
            className="p-5 rounded-xl border text-sm text-[var(--text-muted)]"
            style={{
              background: 'var(--surface-1)',
              borderColor: 'var(--border)',
            }}
          >
            <h2 className="text-white font-semibold mb-2">Report a vulnerability</h2>
            <p>
              Found something? We take security reports seriously. Email{' '}
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
