import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/create', label: 'Create DCA' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/docs', label: 'Docs' },
  ];

  return (
    <header className="glass sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="MoneroDrip" className="w-8 h-8 rounded-full object-cover" />
            <span className="font-display font-bold text-xl">MoneroDrip</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm transition-colors ${
                  location.pathname === link.href
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link to="/create" className="btn-primary text-sm">
              Start DCA
            </Link>
          </div>

          <button
            className="md:hidden text-text-secondary"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden py-4 border-t border-white/10 mt-4">
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-text-secondary hover:text-white py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/create"
                className="btn-primary text-center text-sm mt-2"
                onClick={() => setMobileOpen(false)}
              >
                Start DCA
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
