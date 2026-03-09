import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ApplyForm from '@/components/ApplyForm'

export const metadata: Metadata = {
  title: 'Apply for Early Access',
  description:
    'Apply to join the Rinmo early access pilot. We review all applications within 24 hours and respond to qualified teams within 48 hours.',
  robots: { index: false },
}

export default function ApplyPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      <main className="pt-28 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: 'var(--accent)' }}
            >
              Early access application
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Apply for early access</h1>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Rinmo&apos;s pilot is for hiring teams who want to screen faster and decide with
              confidence. We review every application personally and respond to qualified teams
              within 48 hours. This is not a waitlist — accepted teams get a live onboarding
              session within the week.
            </p>
          </div>

          <ApplyForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
