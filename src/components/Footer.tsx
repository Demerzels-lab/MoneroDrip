import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-background-page font-bold text-sm">M</span>
              </div>
              <span className="font-display font-bold">MoneroDrip</span>
            </div>
            <p className="text-text-tertiary text-sm">
              Privacy-first automated DCA into Monero. No accounts, no tracking, no compromise.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/create" className="text-text-secondary hover:text-primary">Create Strategy</Link></li>
              <li><Link to="/dashboard" className="text-text-secondary hover:text-primary">Dashboard</Link></li>
              <li><Link to="/docs" className="text-text-secondary hover:text-primary">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-text-secondary hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-text-secondary hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <p className="text-text-tertiary text-sm mb-2">Donate XMR:</p>
            <code className="text-xs text-primary font-mono break-all">
              888tNkZ...JqT2pL
            </code>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-text-tertiary text-sm">
          <p>MoneroDrip 2026. No cookies. No analytics. Just privacy.</p>
        </div>
      </div>
    </footer>
  );
}
