import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// Update this URL when you create your Calendly link
const BOOKING_URL = 'https://calendly.com/YOUR_LINK_HERE'

export const metadata: Metadata = {
  title: 'Application Received',
  description: 'Your early access application has been received. We\'ll be in touch within 48 hours.',
  robots: { index: false },
}

interface PageProps {
  searchParams: { name?: string }
}

export default function ThanksPage({ searchParams }: PageProps) {
  const name = searchParams.name ? decodeURIComponent(searchParams.name) : null

  return (
    <div className="min-h-screen">
      <Nav />

      <main className="pt-32 pb-24 px-6 flex items-center justify-center min-h-[80vh]">
        <div className="max-w-lg w-full text-center">
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8"
            style={{
              background: 'var(--accent-glow)',
              border: '1px solid var(--border-accent)',
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              style={{ color: 'var(--accent)' }}
            >
              <path
                d="M5 14l6 6L23 8"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {name ? `Got it, ${name}.` : 'Application received.'}
          </h1>

          <p className="text-[var(--text-muted)] mb-2 leading-relaxed">
            We review every application personally. If your team is a good fit for the pilot,
            you&apos;ll hear back{' '}
            <strong className="text-white">within 48 hours</strong>.
          </p>

          <p className="text-[var(--text-muted)] mb-10 text-sm">
            While you wait — if you&apos;d like to move faster, book a 15-minute call and
            we&apos;ll walk you through the system and answer any questions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{
                background: 'var(--accent)',
                color: '#000',
                boxShadow: '0 0 20px var(--accent-glow)',
              }}
            >
              Book a 15-min call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7h10M7 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium border transition-all hover:border-white/20"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
            >
              Back to home
            </Link>
          </div>

          {/* What happens next */}
          <div
            className="mt-12 p-5 rounded-xl border text-left"
            style={{
              background: 'var(--surface-1)',
              borderColor: 'var(--border)',
            }}
          >
            <h2 className="text-sm font-semibold mb-3">What happens next</h2>
            <ol className="space-y-2">
              {[
                'We review your application and context (within 48 hours)',
                'If accepted, we send onboarding details and a setup call invite',
                'You\'re live with your first pipeline in under 48 hours',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{ background: 'var(--surface-3)', color: 'var(--accent)' }}
                  >
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
