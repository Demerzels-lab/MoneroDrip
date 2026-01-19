import { useState, useEffect } from 'react';
import { Search, Book, Shield, Code, Lock, HelpCircle, ChevronRight } from 'lucide-react';

const sections = [
  { id: 'getting-started', title: 'Getting Started', icon: Book },
  { id: 'api-reference', title: 'API Reference', icon: Code },
  { id: 'smart-contracts', title: 'Smart Contracts', icon: Lock },
  { id: 'security', title: 'Security', icon: Shield },
  { id: 'faq', title: 'FAQ', icon: HelpCircle },
];

const content: Record<string, { title: string; content: JSX.Element }[]> = {
  'getting-started': [
    {
      title: 'Introduction',
      content: (
        <div className="space-y-4">
          <p>
            MoneroDrip is an automated DCA (Dollar Cost Averaging) platform that allows you 
            to accumulate Monero (XMR) periodically without manual intervention.
          </p>
          <p>
            This platform is designed with absolute privacy principles - no accounts, no cookies, 
            and no analytics tracking your activity.
          </p>
          <div className="p-4 bg-status-warning/10 border border-status-warning/30 rounded-lg">
            <p className="text-status-warning font-medium">Warning</p>
            <p className="text-sm text-text-secondary mt-1">
              Make sure you understand the risks involved in cryptocurrency trading before using this platform.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Quick Start',
      content: (
        <div className="space-y-4">
          <ol className="list-decimal list-inside space-y-3">
            <li>Connect your Ethereum wallet (MetaMask, Phantom, etc)</li>
            <li>Select source token (USDC, WETH, WBTC, or DAI)</li>
            <li>Set DCA amount and interval</li>
            <li>Enter your destination XMR address</li>
            <li>Approve token allowance for smart contract</li>
            <li>System will automatically execute swaps on schedule</li>
          </ol>
          <pre className="bg-zinc-900 p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`// Example: Creating a DCA strategy
const strategy = {
  sourceAsset: "USDC",
  amount: 100,
  interval: "weekly",
  totalOrders: 12,
  xmrAddress: "4..."
};`}
          </pre>
        </div>
      ),
    },
    {
      title: 'Supported Assets',
      content: (
        <div className="space-y-4">
          <p>MoneroDrip currently supports the following tokens as DCA sources:</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2">Token</th>
                <th className="text-left py-2">Network</th>
                <th className="text-left py-2">Min Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5"><td className="py-2">USDC</td><td>Ethereum</td><td>50 USDC</td></tr>
              <tr className="border-b border-white/5"><td className="py-2">WETH</td><td>Ethereum</td><td>0.01 WETH</td></tr>
              <tr className="border-b border-white/5"><td className="py-2">WBTC</td><td>Ethereum</td><td>0.001 WBTC</td></tr>
              <tr className="border-b border-white/5"><td className="py-2">USDE</td><td>Ethereum</td><td>50 USDE</td></tr>
              <tr className="border-b border-white/5"><td className="py-2">DAI</td><td>Ethereum</td><td>50 DAI</td></tr>
            </tbody>
          </table>
        </div>
      ),
    },
  ],
  'api-reference': [
    {
      title: 'Overview',
      content: (
        <div className="space-y-4">
          <p>
            MoneroDrip provides a REST API for programmatic integration. 
            All endpoints use wallet signature-based authentication.
          </p>
          <pre className="bg-zinc-900 p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`Base URL: https://api.monerodrip.xyz/v1

Headers:
  X-Wallet-Address: 0x...
  X-Signature: 0x...
  X-Timestamp: 1704067200`}
          </pre>
        </div>
      ),
    },
    {
      title: 'Endpoints',
      content: (
        <div className="space-y-6">
          <div className="p-4 bg-zinc-900 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-status-success/20 text-status-success text-xs rounded">GET</span>
              <code className="text-sm">/strategies</code>
            </div>
            <p className="text-text-secondary text-sm">Get all DCA strategies for connected wallet.</p>
          </div>
          <div className="p-4 bg-zinc-900 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">POST</span>
              <code className="text-sm">/strategies</code>
            </div>
            <p className="text-text-secondary text-sm">Create a new DCA strategy.</p>
            <pre className="mt-2 text-xs font-mono text-text-tertiary">
{`{
  "source_asset": "USDC",
  "amount": 100,
  "interval_unit": "week",
  "interval_value": 1,
  "total_orders": 12,
  "xmr_address": "4..."
}`}
            </pre>
          </div>
          <div className="p-4 bg-zinc-900 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-status-warning/20 text-status-warning text-xs rounded">PATCH</span>
              <code className="text-sm">/strategies/:id</code>
            </div>
            <p className="text-text-secondary text-sm">Update strategy status (pause/resume).</p>
          </div>
          <div className="p-4 bg-zinc-900 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-status-error/20 text-status-error text-xs rounded">DELETE</span>
              <code className="text-sm">/strategies/:id</code>
            </div>
            <p className="text-text-secondary text-sm">Cancel a DCA strategy.</p>
          </div>
        </div>
      ),
    },
  ],
  'smart-contracts': [
    {
      title: 'Contract Architecture',
      content: (
        <div className="space-y-4">
          <p>
            MoneroDrip uses a minimal, auditable smart contract architecture. 
            The main contract only handles approval and execution routing.
          </p>
          <pre className="bg-zinc-900 p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IMoneroDrip {
    function executeSwap(
        address tokenIn,
        uint256 amountIn,
        bytes32 xmrAddressHash
    ) external returns (bytes32 executionId);
    
    function getStrategyStatus(
        address wallet
    ) external view returns (StrategyStatus);
}`}
          </pre>
        </div>
      ),
    },
    {
      title: 'Contract Addresses',
      content: (
        <div className="space-y-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2">Contract</th>
                <th className="text-left py-2">Network</th>
                <th className="text-left py-2">Address</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="py-2">DCARouter</td>
                <td>Ethereum</td>
                <td className="font-mono text-xs text-primary">0x1234...5678</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2">SwapExecutor</td>
                <td>Ethereum</td>
                <td className="font-mono text-xs text-primary">0xabcd...efgh</td>
              </tr>
            </tbody>
          </table>
          <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
            <p className="text-sm">
              All contracts have been audited by CertiK and OpenZeppelin. Audit reports are available on GitHub.
            </p>
          </div>
        </div>
      ),
    },
  ],
  'security': [
    {
      title: 'Security Model',
      content: (
        <div className="space-y-4">
          <p>
            MoneroDrip is designed with "minimal trust" principles. You don't need to trust 
            the platform with custody of your tokens.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <ChevronRight className="text-primary mt-1 shrink-0" size={16} />
              <span><strong>Non-custodial:</strong> Tokens remain in your wallet until execution time.</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="text-primary mt-1 shrink-0" size={16} />
              <span><strong>Limited Approval:</strong> You can set exact approval limits.</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="text-primary mt-1 shrink-0" size={16} />
              <span><strong>Immutable Contracts:</strong> No admin key or upgrade capability.</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="text-primary mt-1 shrink-0" size={16} />
              <span><strong>Open Source:</strong> All code is available on GitHub for review.</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Audits',
      content: (
        <div className="space-y-4">
          <p>MoneroDrip smart contracts have been audited by:</p>
          <ul className="space-y-2">
            <li className="p-3 bg-zinc-900 rounded-lg flex items-center justify-between">
              <span>CertiK</span>
              <span className="text-status-success text-sm">Passed - Dec 2025</span>
            </li>
            <li className="p-3 bg-zinc-900 rounded-lg flex items-center justify-between">
              <span>OpenZeppelin</span>
              <span className="text-status-success text-sm">Passed - Nov 2025</span>
            </li>
          </ul>
        </div>
      ),
    },
  ],
  'faq': [
    {
      title: 'General Questions',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">What is DCA?</h4>
            <p className="text-text-secondary text-sm">
              Dollar Cost Averaging (DCA) is an investment strategy where you invest a fixed 
              amount periodically, regardless of asset price. This reduces the impact of volatility.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Why Monero?</h4>
            <p className="text-text-secondary text-sm">
              Monero is the most private cryptocurrency. Unlike Bitcoin, Monero transactions 
              are completely untraceable thanks to Ring Signatures, Stealth Addresses, and RingCT.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Is there a minimum?</h4>
            <p className="text-text-secondary text-sm">
              Yes, each asset has a different minimum amount to ensure economical swaps 
              after gas fees.
            </p>
          </div>
        </div>
      ),
    },
  ],
};

export function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const sectionContent = content[activeSection] || [];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 shrink-0">
          <div className="lg:sticky lg:top-24">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-text-secondary text-sm mb-6 hover:border-zinc-700"
            >
              <Search size={16} />
              <span>Search docs...</span>
              <kbd className="ml-auto text-xs bg-zinc-800 px-1.5 py-0.5 rounded">Cmd+K</kbd>
            </button>

            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  <section.icon size={18} />
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <h1 className="font-display text-3xl font-bold mb-8">
            {sections.find(s => s.id === activeSection)?.title}
          </h1>

          <div className="space-y-12">
            {sectionContent.map((item, i) => (
              <article key={i} className="prose prose-invert max-w-none">
                <h2 className="font-display text-xl font-bold mb-4 text-white">{item.title}</h2>
                <div className="text-text-secondary">{item.content}</div>
              </article>
            ))}
          </div>
        </main>
      </div>

      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-background-page/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-background-surface border border-white/10 rounded-xl shadow-2xl">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <Search size={20} className="text-text-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documentation..."
                className="flex-1 bg-transparent outline-none text-white"
                autoFocus
              />
              <kbd className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-text-tertiary">ESC</kbd>
            </div>
            <div className="p-4 text-text-secondary text-sm">
              {searchQuery ? (
                <p>No results found for "{searchQuery}"</p>
              ) : (
                <p>Type to search...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
