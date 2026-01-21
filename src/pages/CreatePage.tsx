import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Coins, DollarSign, MapPin, Timer, CheckCircle, AlertCircle, ArrowLeft, ArrowRight, Lock, Shield } from 'lucide-react';
import { supabase, SupportedAsset } from '../lib/supabase';

// Step definitions with updated icons
const steps = [
  { id: 1, title: 'Connect Wallet', icon: Wallet },
  { id: 2, title: 'Select Asset', icon: Coins },
  { id: 3, title: 'Set Amount', icon: DollarSign },
  { id: 4, title: 'Destination', icon: MapPin },
  { id: 5, title: 'Schedule', icon: Timer },
  { id: 6, title: 'Approve', icon: Shield },
];

const intervals = [
  { value: 1, unit: 'day', label: 'Daily' },
  { value: 1, unit: 'week', label: 'Weekly' },
  { value: 2, unit: 'week', label: 'Bi-weekly' },
  { value: 1, unit: 'month', label: 'Monthly' },
];

// Mock Wallets for Simulation
const mockWallets = [
  { id: 'metamask', name: 'MetaMask', icon: '🦊', address: '0x71C...9A21' },
  { id: 'phantom', name: 'Phantom', icon: '👻', address: '0x33A...B1B2' },
];

export function CreatePage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [assets, setAssets] = useState<SupportedAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [error, setError] = useState('');
  
  // Simulation State
  const [virtualBalance, setVirtualBalance] = useState(1000); // Everyone starts with $1000 sim money
  const [isApproved, setIsApproved] = useState(false);

  const [formData, setFormData] = useState({
    walletAddress: '',
    walletType: '',
    sourceAsset: '',
    amount: '',
    xmrAddress: '',
    intervalValue: 1,
    intervalUnit: 'week',
    totalOrders: 12,
  });

  useEffect(() => {
    loadAssets();
  }, []);

  async function loadAssets() {
    const { data } = await supabase
      .from('supported_assets')
      .select('*')
      .eq('is_active', true);
    if (data) setAssets(data || []);
  }

  function validateXmrAddress(address: string): boolean {
    return /^[48][0-9AB][1-9A-HJ-NP-Za-km-z]{93}$/.test(address) ||
           /^[48][0-9AB][1-9A-HJ-NP-Za-km-z]{104}$/.test(address);
  }

  async function connectWallet(wallet: typeof mockWallets[0]) {
    setConnectingWallet(wallet.id);
    setError('');

    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 800));

    setFormData(prev => ({
      ...prev,
      walletAddress: wallet.address,
      walletType: wallet.id,
    }));
    setConnectingWallet(null);
    setCurrentStep(2);
  }

  // Mimics the "Approve" transaction on Ethereum
  async function handleApprove() {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Fake transaction time
    setIsApproved(true);
    setLoading(false);
  }

  async function handleSubmit() {
    setLoading(true);
    setError('');

    try {
      // 1. Check if user has enough "Virtual Balance" (Simulation Logic)
      const totalCost = parseFloat(formData.amount) * formData.totalOrders;
      if (totalCost > virtualBalance) {
        throw new Error(`Insufficient Virtual Balance. You have $${virtualBalance} but need $${totalCost}.`);
      }

      // 2. Insert Strategy with "Virtual Allowance" set to infinite/authorized
      const { error: insertError } = await supabase.from('dca_strategies').insert({
        wallet_address: formData.walletAddress,
        source_asset: formData.sourceAsset,
        amount_per_order: parseFloat(formData.amount),
        interval_value: formData.intervalValue,
        interval_unit: formData.intervalUnit,
        total_orders: formData.totalOrders,
        xmr_address: formData.xmrAddress,
        status: 'active',
        next_execution_at: new Date(Date.now() + 60 * 1000).toISOString(), // Starts in 1 min for demo
        // This connects to the SQL column we added earlier:
        virtual_allowance: 99999999, 
        virtual_balance_usdc: virtualBalance // Pass the balance to the strategy scope
      });

      if (insertError) throw insertError;
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create strategy.');
    } finally {
      setLoading(false);
    }
  }

  const selectedAsset = assets.find(a => a.symbol === formData.sourceAsset);
  const selectedInterval = intervals.find(i => i.value === formData.intervalValue && i.unit === formData.intervalUnit);

  function canProceed(): boolean {
    switch (currentStep) {
      case 1: return !!formData.walletAddress;
      case 2: return !!formData.sourceAsset;
      case 3: return !!formData.amount && parseFloat(formData.amount) >= (selectedAsset?.min_amount || 0);
      case 4: return validateXmrAddress(formData.xmrAddress);
      case 5: return true;
      case 6: return isApproved; // Block finish if not approved
      default: return true;
    }
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto">
        
        {/* Progress Bar (GhostDrip Style) */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -z-10" />
          {steps.map((step, i) => {
            const isActive = currentStep >= step.id;
            const isCurrent = currentStep === step.id;
            return (
              <div key={step.id} className="relative group">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                  isActive 
                    ? 'bg-background-page border-primary text-primary shadow-glow-cyan' 
                    : 'bg-background-surface border-white/10 text-text-tertiary'
                }`}>
                  <step.icon size={16} />
                </div>
                {isCurrent && (
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-primary whitespace-nowrap">
                    {step.title}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="card min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-white">{steps[currentStep - 1].title}</h2>
            {currentStep > 1 && (
               <div className="text-xs font-mono text-status-success bg-status-success/10 px-3 py-1 rounded-full border border-status-success/20">
                 Virtual Balance: ${virtualBalance} USDC
               </div>
            )}
          </div>

          {/* STEP 1: Connect Wallet */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <p className="text-text-secondary text-sm">Select a wallet to simulate the connection:</p>
              {mockWallets.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => connectWallet(wallet)}
                  disabled={connectingWallet !== null}
                  className={`w-full p-4 rounded-xl border transition-all flex items-center gap-4 group ${
                    connectingWallet === wallet.id
                      ? 'bg-primary/10 border-primary'
                      : 'bg-background-surface border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="text-2xl">{wallet.icon}</div>
                  <div className="text-left flex-1">
                    <p className="font-bold text-white">{wallet.name}</p>
                    <p className="text-xs text-text-tertiary font-mono">{wallet.address}</p>
                  </div>
                  {connectingWallet === wallet.id && <span className="text-primary text-sm animate-pulse">Connecting...</span>}
                </button>
              ))}
            </div>
          )}

          {/* STEP 2: Select Asset */}
          {currentStep === 2 && (
            <div className="space-y-3">
              {assets.map((asset) => (
                <button
                  key={asset.symbol}
                  onClick={() => setFormData(prev => ({ ...prev, sourceAsset: asset.symbol }))}
                  className={`w-full p-4 rounded-xl border transition-all flex items-center gap-4 ${
                    formData.sourceAsset === asset.symbol
                      ? 'bg-primary/10 border-primary'
                      : 'bg-background-surface border-white/5 hover:border-white/20'
                  }`}
                >
                  {/* Fallback icon if no logo */}
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white">
                    {asset.symbol[0]}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white">{asset.name}</p>
                    <p className="text-xs text-text-tertiary font-mono">ERC-20</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-sm text-text-secondary">Balance: 1,000.00</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* STEP 3: Amount */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="text-text-secondary text-sm mb-2 block">Amount per order</label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="0.00"
                    className="input text-3xl font-display py-6 pl-12"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-text-tertiary">$</span>
                </div>
                {selectedAsset && (
                  <p className="text-xs text-text-tertiary mt-2 ml-1">
                    Min: ${selectedAsset.min_amount} • Max: ${virtualBalance}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: XMR Address */}
          {currentStep === 4 && (
            <div className="space-y-4">
               <div className="p-4 bg-background-surface/50 rounded-lg border border-white/5 text-sm text-text-secondary">
                 <p className="flex items-center gap-2 mb-2 text-primary"><Lock size={14}/> Privacy Note</p>
                 We do not link this address to your identity. It is only stored until the strategy completes.
               </div>
              <div>
                <label className="text-text-secondary text-sm mb-2 block">Monero Address</label>
                <textarea
                  value={formData.xmrAddress}
                  onChange={(e) => setFormData(prev => ({ ...prev, xmrAddress: e.target.value }))}
                  placeholder="4..."
                  className={`input-mono h-24 resize-none ${
                    formData.xmrAddress && validateXmrAddress(formData.xmrAddress) 
                      ? 'border-status-success/50 focus:border-status-success' 
                      : ''
                  }`}
                />
              </div>
            </div>
          )}

          {/* STEP 5: Interval */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {intervals.map((interval) => (
                  <button
                    key={interval.label}
                    onClick={() => setFormData(prev => ({ ...prev, intervalValue: interval.value, intervalUnit: interval.unit }))}
                    className={`p-4 rounded-xl border transition-all text-sm font-medium ${
                      formData.intervalValue === interval.value && formData.intervalUnit === interval.unit
                        ? 'bg-primary/10 border-primary text-white'
                        : 'bg-background-surface border-white/5 text-text-secondary hover:border-white/20'
                    }`}
                  >
                    {interval.label}
                  </button>
                ))}
              </div>
              <div>
                <label className="text-text-secondary text-sm mb-2 block flex justify-between">
                  <span>Number of Executions</span>
                  <span className="text-primary">{formData.totalOrders}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="52"
                  value={formData.totalOrders}
                  onChange={(e) => setFormData(prev => ({ ...prev, totalOrders: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-background-surface rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
          )}

          {/* STEP 6: Review & Approve (The GhostDrip Logic) */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="bg-background-surface/50 rounded-xl p-4 border border-white/5 space-y-3 text-sm">
                 <div className="flex justify-between">
                    <span className="text-text-secondary">Total Investment</span>
                    <span className="text-white font-bold">${(parseFloat(formData.amount) * formData.totalOrders).toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-text-secondary">Frequency</span>
                    <span className="text-white">{selectedInterval?.label}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-text-secondary">Destination</span>
                    <span className="font-mono text-xs text-text-tertiary">{formData.xmrAddress.slice(0, 10)}...</span>
                 </div>
              </div>

              {/* SIMULATION: The Approval Button */}
              {!isApproved ? (
                <div className="border border-status-warning/30 bg-status-warning/5 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-status-warning shrink-0 mt-0.5" size={18} />
                    <div>
                      <h4 className="font-bold text-status-warning mb-1">Approval Required</h4>
                      <p className="text-xs text-text-secondary mb-3">
                        You must approve the smart contract to spend <b>${(parseFloat(formData.amount) * formData.totalOrders).toFixed(2)} USDC</b>.
                      </p>
                      <button 
                        onClick={handleApprove}
                        disabled={loading}
                        className="w-full bg-status-warning/20 hover:bg-status-warning/30 text-status-warning font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                         {loading ? 'Approving...' : 'Approve Allowance'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-status-success/30 bg-status-success/5 rounded-xl p-4 flex items-center gap-3">
                   <CheckCircle className="text-status-success" size={20} />
                   <span className="text-status-success font-medium">Allowance Approved</span>
                </div>
              )}
              
              {error && <p className="text-status-error text-sm text-center">{error}</p>}
            </div>
          )}

          {/* Navigation Footer */}
          <div className="mt-auto pt-8 flex gap-4">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-6 py-3 rounded-full border border-white/10 text-text-secondary hover:text-white hover:border-white/30 transition-all"
              >
                Back
              </button>
            )}
            
            {currentStep < 6 ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!canProceed()}
                className="ml-auto btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isApproved || loading}
                className="ml-auto btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Start DCA Strategy'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}