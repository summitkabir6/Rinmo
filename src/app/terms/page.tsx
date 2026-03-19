import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Rinmo terms of service.',
}

const LAST_UPDATED = 'January 2025'

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      <main className="pt-28 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-[var(--text-dim)] text-sm mb-10">Last updated: {LAST_UPDATED}</p>

          <div className="space-y-8 text-[var(--text-muted)] text-sm leading-relaxed">
            <section>
              <h2 className="text-[var(--text)] text-lg font-semibold mb-3">1. Acceptance</h2>
              <p>
                By accessing rinmo.ai or using any Rinmo service, you agree to these Terms of
                Service. If you do not agree, do not use the service. These terms apply to all
                visitors, applicants, and customers.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text)] text-lg font-semibold mb-3">2. Early access pilot</h2>
              <p>
                The early access program is offered on a limited basis to qualified teams. Rinmo
                reserves the right to accept or decline any application without obligation.
                Participation in the early access program does not constitute a commercial
                agreement unless a separate agreement is executed in writing.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text)] text-lg font-semibold mb-3">3. Use of the service</h2>
              <p className="mb-3">
                You agree to use Rinmo only for lawful purposes, specifically for evaluating job
                candidates in accordance with applicable employment law. You must not use Rinmo to
                discriminate on the basis of protected characteristics under applicable law.
              </p>
              <p>
                You are responsible for ensuring that your use of Rinmo complies with all
                applicable employment, privacy, and anti-discrimination laws in your jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text)] text-lg font-semibold mb-3">4. Data ownership</h2>
              <p>
                You own the data you input into Rinmo, including candidate evaluation data. Rinmo
                acts as a data processor on your behalf. You grant Rinmo a limited license to
                process your data solely for the purpose of providing the service.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text)] text-lg font-semibold mb-3">5. Intellectual property</h2>
              <p>
                Rinmo owns all rights to the Rinmo platform, including its AI models, software,
                and brand. You may not copy, modify, distribute, or create derivative works without
                written permission.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text)] text-lg font-semibold mb-3">6. Disclaimers</h2>
              <p className="mb-3">
                Rinmo is provided &quot;as is&quot; during the early access period. We make no
                guarantees about uptime, accuracy of AI-generated scores, or fitness for any
                particular purpose.
              </p>
              <p>
                AI-generated candidate evaluations are tools to assist human decision-making, not
                final decisions. Hiring decisions remain the responsibility of the hiring team.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text)] text-lg font-semibold mb-3">7. Limitation of liability</h2>
              <p>
                To the maximum extent permitted by law, Rinmo&apos;s liability for any claim
                arising from use of the service is limited to fees paid by you in the prior three
                months. We are not liable for indirect, incidental, or consequential damages.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text)] text-lg font-semibold mb-3">8. Changes to terms</h2>
              <p>
                We may update these terms. Continued use of the service after changes constitutes
                acceptance. Material changes will be communicated via email to active users.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text)] text-lg font-semibold mb-3">9. Contact</h2>
              <p>
                Questions about these terms?{' '}
                <a href="mailto:legal@rinmo.ai" className="text-[var(--accent)] hover:underline">
                  legal@rinmo.ai
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
