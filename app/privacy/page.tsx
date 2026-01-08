export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 space-y-6 text-white/90">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              LegacyPi respects the privacy of all users and is committed to protecting your personal data. This privacy
              policy explains how we collect, use, and protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Data We Collect</h2>
            <p className="leading-relaxed mb-2">We collect the following types of data:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Pi Network username (via Pi SDK authentication)</li>
              <li>Transaction data (donation amounts, transaction times)</li>
              <li>Public Pi Network wallet addresses</li>
              <li>Voting data for humanitarian projects</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Data</h2>
            <p className="leading-relaxed mb-2">We use your data to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Process donations and transactions</li>
              <li>Track fund transparency</li>
              <li>Enable democratic community voting</li>
              <li>Report on humanitarian projects</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Decentralization and Security</h2>
            <p className="leading-relaxed">
              All transactions are recorded on the Pi Network blockchain, which means they are:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>Publicly visible and verifiable</li>
              <li>Immutable and transparent</li>
              <li>Managed by smart contracts, not individuals</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Sharing</h2>
            <p className="leading-relaxed">
              We do not sell or share your personal data with third parties. Public blockchain data is accessible to
              everyone for transparency, but does not contain sensitive personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
            <p className="leading-relaxed">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>Access your data</li>
              <li>Request correction of inaccurate data</li>
              <li>Withdraw consent for processing</li>
              <li>Download your transaction data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Contact</h2>
            <p className="leading-relaxed">
              For privacy questions, contact us through the Pi Network community or our official email address:
              privacy@legacypi.network
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
