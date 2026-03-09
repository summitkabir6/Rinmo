import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Rinmo privacy policy — how we collect, use, and protect your data.',
}

const LAST_UPDATED = 'January 2025'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      <main className="pt-28 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-[var(--text-dim)] text-sm mb-10">Last updated: {LAST_UPDATED}</p>

          <div
            className="prose prose-invert max-w-none space-y-8 text-[var(--text-muted)] text-sm leading-relaxed"
          >
            <section>
              <h2 className="text-white text-lg font-semibold mb-3">1. Who we are</h2>
              <p>
                Rinmo (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;) operates rinmo.ai. We
                build AI-powered hiring decision tools for teams and companies. If you have
                questions about this policy, email us at{' '}
                <a href="mailto:privacy@rinmo.ai" className="text-[var(--accent)] hover:underline">
                  privacy@rinmo.ai
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-white text-lg font-semibold mb-3">2. What we collect</h2>
              <p className="mb-3">
                <strong className="text-white">Early access applicants:</strong> When you apply for
                early access, we collect your name, work email, company name, role, company size,
                hiring data, and any notes you provide. We also capture basic technical metadata
                (browser type, referrer, UTM parameters) to understand where applicants come from.
              </p>
              <p className="mb-3">
                <strong className="text-white">Pilot customers:</strong> When you use Rinmo in an
                active pilot, we process candidate evaluation data on your behalf. This includes
                responses to structured screening questions (text, audio, or video depending on
                configuration), AI-generated scores and reasoning, and event logs.
              </p>
              <p>
                <strong className="text-white">Site visitors:</strong> We may collect basic
                analytics data (page views, session duration, referrer) to improve the site. We
                use privacy-respecting analytics and do not use Google Analytics.
              </p>
            </section>

            <section>
              <h2 className="text-white text-lg font-semibold mb-3">3. How we use it</h2>
              <p>
                We use your data to: respond to your application, operate the Rinmo service,
                improve our product, and communicate with you about your account or the pilot
                program. We do not use your data to train public AI models without explicit
                consent. We do not sell your data. Ever.
              </p>
            </section>

            <section>
              <h2 className="text-white text-lg font-semibold mb-3">4. Candidate data</h2>
              <p>
                Candidates who participate in Rinmo-powered screenings are informed before the
                process begins. Candidate data is associated with the hiring team that initiated
                the screening, not with Rinmo as a shared profile. You own your candidate data.
                We act as a data processor on your behalf.
              </p>
            </section>

            <section>
              <h2 className="text-white text-lg font-semibold mb-3">5. Data retention</h2>
              <p>
                Early access application data is retained for up to 24 months or until you
                request deletion. Pilot customer data is retained per your agreement with us.
                You can request deletion at any time by emailing{' '}
                <a href="mailto:privacy@rinmo.ai" className="text-[var(--accent)] hover:underline">
                  privacy@rinmo.ai
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-white text-lg font-semibold mb-3">6. Third parties</h2>
              <p>
                We use Supabase to store application data (hosted on AWS). We may use a
                scheduling tool (e.g., Calendly) for booking calls. We do not share your data
                with advertisers, data brokers, or other third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-white text-lg font-semibold mb-3">7. Your rights</h2>
              <p>
                Depending on your jurisdiction, you may have the right to access, correct, or
                delete your personal data. You can also opt out of any non-essential
                communications at any time. Contact us at{' '}
                <a href="mailto:privacy@rinmo.ai" className="text-[var(--accent)] hover:underline">
                  privacy@rinmo.ai
                </a>{' '}
                to exercise any of these rights.
              </p>
            </section>

            <section>
              <h2 className="text-white text-lg font-semibold mb-3">8. Changes</h2>
              <p>
                We&apos;ll update this policy as our practices evolve. Material changes will be
                communicated via email to active users. The &quot;last updated&quot; date at the
                top of this page reflects the most recent version.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
