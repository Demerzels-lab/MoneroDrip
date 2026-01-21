export function TermsPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-text-secondary mb-8">Last updated: January 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="font-display text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-text-secondary">
              By using MoneroDrip, you agree to these terms and conditions. 
              If you do not agree with any of these terms, do not use this service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">2. Description of Service</h2>
            <p className="text-text-secondary">
              MoneroDrip is a non-custodial platform that facilitates automated Dollar Cost Averaging 
              from various ERC-20 tokens to Monero (XMR). We provide an interface 
              to interact with smart contracts on the Ethereum blockchain.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">3. Eligibility</h2>
            <p className="text-text-secondary">
              You must be at least 18 years old and have legal capacity to use 
              this service. You are responsible for ensuring that use of this service 
              is legal in your jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">4. Risks</h2>
            <div className="p-4 bg-status-warning/10 border border-status-warning/30 rounded-lg mb-4">
              <p className="text-status-warning font-medium">Important Warning</p>
            </div>
            <p className="text-text-secondary mb-4">
              Cryptocurrency and DeFi involve significant risks including:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li>- Extreme price volatility</li>
              <li>- Smart contract risks (bugs, exploits)</li>
              <li>- Regulatory risks</li>
              <li>- Loss of wallet access</li>
              <li>- Unexpected slippage and gas fees</li>
            </ul>
            <p className="text-text-secondary mt-4">
              You acknowledge that you understand these risks and are fully responsible for 
              your investment decisions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">5. Non-Custodial Nature</h2>
            <p className="text-text-secondary">
              MoneroDrip is a non-custodial service. We never have custody or 
              control over your assets. Your tokens remain in your wallet until swap execution. 
              We cannot recover lost or stolen tokens.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">6. Fees</h2>
            <p className="text-text-secondary">
              A platform fee of 0.3% is charged per successful swap. Ethereum gas fees 
              are paid by the user. Fees may change with 30 days advance notice.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">7. Limitation of Liability</h2>
            <p className="text-text-secondary">
              MONERODRIP IS PROVIDED "AS IS" WITHOUT ANY WARRANTIES. WE ARE NOT LIABLE 
              FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES 
              ARISING FROM USE OF THIS SERVICE.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">8. Modifications</h2>
            <p className="text-text-secondary">
              We may modify these terms at any time. Changes will be effective immediately 
              upon posting. Continued use of the service constitutes acceptance 
              of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">9. Governing Law</h2>
            <p className="text-text-secondary">
              These terms are governed by the applicable laws in your jurisdiction, 
              to the extent not inconsistent with the decentralized nature of this service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
