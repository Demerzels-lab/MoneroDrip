import { Link } from 'react-router-dom';
import { Shield, Timer, Trash2, Lock, Eye, EyeOff, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const techFeatures = [
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Ring Signatures',
    description: 'Setiap transaksi mencampur output dengan 15+ decoys dari blockchain, menyembunyikan pengirim sebenarnya.',
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Stealth Addresses',
    description: 'One-time destination address untuk setiap transaksi. Tidak ada yang bisa melacak riwayat pembayaran Anda.',
  },
  {
    icon: <EyeOff className="w-6 h-6" />,
    title: 'RingCT',
    description: 'Ring Confidential Transactions menyembunyikan jumlah transaksi menggunakan Pedersen Commitments.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Bulletproofs',
    description: 'Zero-knowledge proofs yang mengurangi 80%+ ukuran transaksi tanpa trusted setup.',
  },
];

const problems = [
  { problem: 'Surveillance', solution: 'Transaksi tidak dapat dilacak oleh pihak ketiga mana pun.' },
  { problem: 'Frozen Funds', solution: 'Tidak ada yang bisa membekukan atau menyita Monero Anda.' },
  { problem: 'Traceability', solution: 'Riwayat finansial Anda tetap pribadi selamanya.' },
];

const roadmap = [
  { quarter: 'Q1 2026', title: 'Multi-chain Support', desc: 'Dukungan untuk Arbitrum, Optimism, Base' },
  { quarter: 'Q2 2026', title: 'Hardware Wallet', desc: 'Integrasi Ledger dan Trezor' },
  { quarter: 'Q3 2026', title: 'Fiat On-ramp', desc: 'Beli langsung dengan kartu tanpa KYC' },
  { quarter: 'Q4 2026', title: 'DAO Governance', desc: 'Komunitas mengelola protokol' },
];

const faqs = [
  {
    q: 'Bagaimana keamanan smart contract?',
    a: 'Smart contract kami di-audit oleh firma keamanan terkemuka dan bersifat immutable. Anda hanya memberikan approval untuk token spesifik dengan jumlah terbatas.',
  },
  {
    q: 'Berapa fee yang dikenakan?',
    a: 'Platform fee adalah 0.3% per swap. Gas fee bervariasi tergantung kondisi jaringan Ethereum.',
  },
  {
    q: 'Apakah ada audit log?',
    a: 'Semua eksekusi DCA dicatat on-chain dan dapat diverifikasi. Namun, setelah swap ke XMR, transaksi menjadi tidak dapat dilacak.',
  },
  {
    q: 'Bagaimana jika saya ingin membatalkan?',
    a: 'Anda dapat meng-revoke token approval kapan saja dari wallet Anda, atau menggunakan fitur Cancel di Dashboard.',
  },
];

export function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="animate-stagger">
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gradient">Privacy-First</span>
              <br />
              Monero DCA
            </h1>
            <p className="text-text-secondary text-lg md:text-xl mb-8 max-w-2xl">
              Automate your dollar-cost averaging into Monero. No accounts, no cookies, no analytics. 
              Just pure financial privacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/create" className="btn-primary text-center">
                Start your DCA
              </Link>
              <Link to="/docs" className="btn-secondary text-center">
                Read the Docs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Shield className="w-8 h-8 text-primary" />, step: '1', title: 'Approve Allowance', desc: 'Berikan izin smart contract untuk menggunakan token Anda (USDC, WETH, dll).' },
              { icon: <Timer className="w-8 h-8 text-primary" />, step: '2', title: 'Cron Executes', desc: 'Sistem otomatis menjalankan swap pada interval yang Anda tentukan.' },
              { icon: <Trash2 className="w-8 h-8 text-primary" />, step: '3', title: 'Auto-delete', desc: 'Setelah selesai, semua data strategi dihapus otomatis dari database.' },
            ].map((item) => (
              <div key={item.step} className="card text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="text-primary font-mono text-sm mb-2">Step {item.step}</div>
                <h3 className="font-display text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monero Tech */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-center mb-4">Monero Technology</h2>
          <p className="text-text-secondary text-center mb-16 max-w-2xl mx-auto">
            Teknologi kriptografi mutakhir yang menjadikan Monero mata uang digital paling privat.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techFeatures.map((feature) => (
              <div key={feature.title} className="card flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0 text-primary">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold mb-2">{feature.title}</h3>
                  <p className="text-text-secondary text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Monero */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-center mb-16">Why Monero?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map((item) => (
              <div key={item.problem} className="card">
                <div className="text-status-error font-mono text-sm mb-2">Problem:</div>
                <h3 className="font-display text-xl font-bold mb-4">{item.problem}</h3>
                <div className="text-status-success font-mono text-sm mb-2">Solution:</div>
                <p className="text-text-secondary">{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-center mb-16">Roadmap 2026</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {roadmap.map((item, i) => (
              <div key={item.quarter} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary" />
                  {i < roadmap.length - 1 && <div className="w-0.5 h-full bg-white/10 mt-2" />}
                </div>
                <div className="pb-8">
                  <div className="text-primary font-mono text-sm">{item.quarter}</div>
                  <h3 className="font-display font-bold text-lg">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-center mb-16">FAQ</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-text-secondary text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Support the Project</h2>
          <p className="text-text-secondary mb-8">
            MoneroDrip adalah proyek open-source. Donasi membantu kami tetap independen.
          </p>
          <div className="card max-w-xl mx-auto">
            <p className="text-text-tertiary text-sm mb-2">XMR Donation Address:</p>
            <code className="font-mono text-primary text-sm break-all">
              888tNkZrS7p2WHJJBBR4Wz8CkBCpVVPM8VLMq8VKmQzJLQ5kMJTj1wMuPe9p5KBLqJ1NqVvPWqHVJqT2pL
            </code>
          </div>
        </div>
      </section>
    </div>
  );
}
