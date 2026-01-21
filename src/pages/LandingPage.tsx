import { Link } from 'react-router-dom';
import { Shield, Timer, Trash2, Lock, Eye, EyeOff, Zap, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useState } from 'react';
// IMPORT THE COMPONENT
import { NetworkBackground } from '../components/NetworkBackground';

// ... (Keep your existing techFeatures, problems, roadmap, faqs arrays exactly as they are) ...
const techFeatures = [
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Ring Signatures',
    description: 'Each transaction mixes outputs with 15+ decoys from the blockchain, hiding the actual sender.',
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Stealth Addresses',
    description: 'One-time destination address for each transaction. No one can trace your payment history.',
  },
  {
    icon: <EyeOff className="w-6 h-6" />,
    title: 'RingCT',
    description: 'Ring Confidential Transactions hide transaction amounts using Pedersen Commitments.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Bulletproofs',
    description: 'Zero-knowledge proofs that reduce transaction size by 80%+ without trusted setup.',
  },
];

const problems = [
  { problem: 'Surveillance', solution: 'Transactions cannot be traced by any third party.' },
  { problem: 'Frozen Funds', solution: 'No one can freeze or seize your Monero.' },
  { problem: 'Traceability', solution: 'Your financial history remains private forever.' },
];

const roadmap = [
  { quarter: 'Q1 2026', title: 'Multi-chain Support', desc: 'Support for Arbitrum, Optimism, Base' },
  { quarter: 'Q2 2026', title: 'Hardware Wallet', desc: 'Ledger and Trezor integration' },
  { quarter: 'Q3 2026', title: 'Fiat On-ramp', desc: 'Buy directly with card, no KYC' },
  { quarter: 'Q4 2026', title: 'DAO Governance', desc: 'Community manages the protocol' },
];

const faqs = [
  {
    q: 'How secure are the smart contracts?',
    a: 'Our smart contracts are audited by leading security firms and are immutable. You only grant approval for specific tokens with limited amounts.',
  },
  {
    q: 'What are the fees?',
    a: 'Platform fee is 0.3% per swap. Gas fees vary depending on Ethereum network conditions.',
  },
  {
    q: 'Is there an audit log?',
    a: 'All DCA executions are recorded on-chain and can be verified. However, once swapped to XMR, transactions become untraceable.',
  },
  {
    q: 'What if I want to cancel?',
    a: 'You can revoke token approval anytime from your wallet, or use the Cancel feature in the Dashboard.',
  },
];

export function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="animate-stagger">
      
      {/* HERO SECTION 
          1. Added 'relative' so the background can position itself 'absolute' inside this section.
          2. Added 'overflow-hidden' to prevent particles from creating scrollbars.
      */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background-page">
        
        {/* NETWORK BACKGROUND
            - inset-0: Stretches to fill the section
            - z-0: Sits behind content
            - color: White lines
        */}
        <NetworkBackground 
            color="255, 255, 255" 
            particleCount={120} 
            className="absolute inset-0 z-0 opacity-40" 
        />

        {/* CONTENT CONTAINER
            - z-10: Sits ON TOP of background
            - relative: Required for z-index to work
        */}
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight text-white">
              Privacy-First
              <br />
              Monero DCA
            </h1>
            <p className="text-text-secondary text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Automate your dollar-cost averaging into Monero. No accounts, no cookies, no analytics. 
              Just pure financial privacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
              <Link to="/create" className="btn-cta text-center min-w-[160px]">
                Start your DCA
              </Link>
              <Link to="/docs" className="btn-secondary text-center min-w-[160px]">
                Read the Docs
              </Link>
              <a 
                href="https://trocador.app/en/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary text-center min-w-[200px] flex items-center justify-center gap-2"
              >
                Swap executed via Trocador.app
                <ExternalLink size={16} />
              </a>
            </div>

            {/* Tech Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {techFeatures.map((feature) => (
                <div key={feature.title} className="card group hover:bg-background-surface/60">
                  <div className="text-white mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                    {feature.icon}
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2 text-white">{feature.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background-page">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-white">How It Works</h2>
          <p className="text-text-secondary text-center mb-16 max-w-xl mx-auto">
            Simple, automated, and privacy-focused DCA to Monero.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Shield className="w-8 h-8" />, step: '1', title: 'Approve Allowance', desc: 'Grant smart contract permission to use your tokens (USDC, WETH, etc).' },
              { icon: <Timer className="w-8 h-8" />, step: '2', title: 'Cron Executes', desc: 'System automatically executes swaps at your specified interval.' },
              { icon: <Trash2 className="w-8 h-8" />, step: '3', title: 'Auto-delete', desc: 'After completion, all strategy data is automatically deleted from the database.' },
            ].map((item) => (
              <div key={item.step} className="card relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-9xl font-display font-bold select-none">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-6 text-white group-hover:bg-white/10 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Monero */}
      <section className="py-24 bg-background-page">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16 text-white">Why Monero?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map((item) => (
              <div key={item.problem} className="card border-l-2 border-l-white/10 hover:border-l-white/30">
                <div className="text-text-tertiary font-mono text-xs uppercase tracking-wider mb-2">Problem</div>
                <h3 className="font-display text-xl font-bold mb-6 text-white">{item.problem}</h3>
                <div className="text-monero font-mono text-xs uppercase tracking-wider mb-2">Solution</div>
                <p className="text-text-secondary">{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24 border-t border-white/5 bg-background-surface/20">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16 text-white">Roadmap 2026</h2>
          <div className="max-w-2xl mx-auto space-y-8">
            {roadmap.map((item, i) => (
              <div key={item.quarter} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
                  {i < roadmap.length - 1 && <div className="w-px h-full bg-white/10 mt-3 group-hover:bg-white/20 transition-colors" />}
                </div>
                <div className="pb-8">
                  <div className="text-monero font-mono text-sm mb-1">{item.quarter}</div>
                  <h3 className="font-display font-bold text-lg text-white mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background-page">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16 text-white">FAQ</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="card p-0 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-white">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={20} className="text-text-secondary" /> : <ChevronDown size={20} className="text-text-secondary" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-text-secondary text-sm leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-24 border-t border-white/5 bg-background-page">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold mb-4 text-white">Support the Project</h2>
          <p className="text-text-secondary mb-8">
            MoneroDrip is an open-source project. Donations help us stay independent.
          </p>
          <div className="card max-w-xl mx-auto bg-background-page border-dashed border-white/20">
            <p className="text-text-tertiary text-sm mb-3">XMR Donation Address</p>
            <code className="font-mono text-text-secondary text-xs sm:text-sm break-all select-all hover:text-white transition-colors cursor-pointer">
              888tNkZrS7p2WHJJBBR4Wz8CkBCpVVPM8VLMq8VKmQzJLQ5kMJTj1wMuPe9p5KBLqJ1NqVvPWqHVJqT2pL
            </code>
          </div>
        </div>
      </section>
    </div>
  );
}