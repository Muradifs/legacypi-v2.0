export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 space-y-6 text-white/90">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By using the LegacyPi platform, you accept these terms of service in full. If you do not agree with any
              part of these terms, please do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. About LegacyPi</h2>
            <p className="leading-relaxed">
              LegacyPi is a decentralized humanitarian fund managed through Smart Contracts on the Pi Network
              blockchain. All decisions are made by the community through democratic voting.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Donations</h2>
            <p className="leading-relaxed mb-2">All donations are:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Voluntary</strong> - No one is forcing you to donate
              </li>
              <li>
                <strong>Non-refundable</strong> - After transaction confirmation, donations cannot be reversed
              </li>
              <li>
                <strong>Transparent</strong> - All transactions are publicly visible on the blockchain
              </li>
              <li>
                <strong>Community-driven</strong> - Only the community decides how funds are used
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Community Voting</h2>
            <p className="leading-relaxed">
              Users who have donated have the right to vote for humanitarian projects. Vote weight is proportional to
              total donation amount. Vote manipulation or system abuse will result in permanent exclusion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Smart Contracts</h2>
            <p className="leading-relaxed">LegacyPi uses smart contracts to manage funds. These contracts are:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>Open source</li>
              <li>Audited by the Pi Network community</li>
              <li>Immutable after deployment</li>
              <li>Automatically execute fund rules</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Liability</h2>
            <p className="leading-relaxed">The LegacyPi platform is provided "as is". We do not guarantee:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>Continuous platform availability</li>
              <li>Absence of errors or security vulnerabilities</li>
              <li>Specific results of humanitarian projects</li>
              <li>Pi cryptocurrency value</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Prohibited Activity</h2>
            <p className="leading-relaxed mb-2">It is prohibited to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Attempt to hack or compromise platform security</li>
              <li>Create fake accounts to manipulate votes</li>
              <li>Share false information about projects</li>
              <li>Use the platform for illegal purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these terms. Significant changes will be announced via the platform and
              will require re-acceptance before continued use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Law and Jurisdiction</h2>
            <p className="leading-relaxed">
              LegacyPi is a decentralized platform without central management structure. In case of disputes,
              international law regarding blockchain technologies and smart contracts applies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Contact</h2>
            <p className="leading-relaxed">
              For questions about terms of service, contact us through the Pi Network community or email:
              legal@legacypi.network
            </p>
          </section>

          <section className="text-sm text-white/70 pt-4 border-t border-white/10">
            <p>Last updated: January 2026</p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
