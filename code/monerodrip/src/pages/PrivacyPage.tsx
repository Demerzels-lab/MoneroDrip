export function PrivacyPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-text-secondary mb-8">Last updated: January 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="font-display text-2xl font-bold mb-4">Our Commitment</h2>
            <p className="text-text-secondary">
              MoneroDrip is built with absolute privacy principles. We believe that financial privacy 
              is a fundamental right, not a privilege. This policy explains how we respect and protect your privacy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">Data We DO NOT Collect</h2>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-status-success">-</span>
                <span>No tracking cookies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-status-success">-</span>
                <span>No analytics (Google Analytics, Mixpanel, etc)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-status-success">-</span>
                <span>No tracking pixels</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-status-success">-</span>
                <span>No browser fingerprinting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-status-success">-</span>
                <span>No IP address storage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-status-success">-</span>
                <span>No user accounts or emails</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">Minimal Data Processed</h2>
            <p className="text-text-secondary mb-4">
              To run the DCA service, we process the following data temporarily:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-primary">1.</span>
                <span><strong>Ethereum Wallet Address:</strong> Required for transaction execution. Not linked to identity.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">2.</span>
                <span><strong>XMR Destination Address:</strong> Hashed and stored temporarily for payment routing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">3.</span>
                <span><strong>Strategy Parameters:</strong> Amount, interval, and desired order count.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">Automatic Deletion</h2>
            <p className="text-text-secondary">
              All DCA strategy data is automatically deleted within 30 days after the strategy completes 
              or is cancelled. You can also request immediate deletion through the Dashboard.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">On-Chain Data</h2>
            <p className="text-text-secondary">
              Transactions on the Ethereum blockchain are public and permanent. However, once swapped 
              to Monero, transactions become completely untraceable thanks to Monero's built-in 
              privacy technology.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">Third Parties</h2>
            <p className="text-text-secondary">
              We do not share any data with third parties. No advertising partners, 
              no data brokers, no data sales.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">Contact</h2>
            <p className="text-text-secondary">
              Questions about privacy? Contact us via encrypted channels listed 
              on the documentation page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
