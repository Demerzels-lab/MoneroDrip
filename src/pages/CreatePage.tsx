import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Coins, DollarSign, MapPin, Timer, CheckCircle, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { supabase, SupportedAsset } from '../lib/supabase';

const steps = [
  { id: 1, title: 'Connect Wallet', icon: Wallet },
  { id: 2, title: 'Select Asset', icon: Coins },
  { id: 3, title: 'Set Amount', icon: DollarSign },
  { id: 4, title: 'XMR Address', icon: MapPin },
  { id: 5, title: 'Interval', icon: Timer },
  { id: 6, title: 'Review', icon: CheckCircle },
];

const intervals = [
  { value: 1, unit: 'day', label: 'Daily' },
  { value: 1, unit: 'week', label: 'Weekly' },
  { value: 2, unit: 'week', label: 'Bi-weekly' },
  { value: 1, unit: 'month', label: 'Monthly' },
];

// Wallet provider detection
function detectWallets() {
  const wallets = [];
  if (typeof window !== 'undefined') {
    if ((window as any).ethereum?.isMetaMask) {
      wallets.push({ id: 'metamask', name: 'MetaMask', icon: 'MM' });
    }
    if ((window as any).phantom?.ethereum || (window as any).phantom?.solana) {
      wallets.push({ id: 'phantom', name: 'Phantom', icon: 'PH' });
    }
  }
  // Always show both options for demo
  if (!wallets.find(w => w.id === 'metamask')) {
    wallets.push({ id: 'metamask', name: 'MetaMask', icon: 'MM' });
  }
  if (!wallets.find(w => w.id === 'phantom')) {
    wallets.push({ id: 'phantom', name: 'Phantom', icon: 'PH' });
  }
  return wallets;
}

export function CreatePage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [assets, setAssets] = useState<SupportedAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [availableWallets] = useState(detectWallets);

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
    if (data) setAssets(data);
  }

  function validateXmrAddress(address: string): boolean {
    return /^[48][0-9AB][1-9A-HJ-NP-Za-km-z]{93}$/.test(address) ||
           /^[48][0-9AB][1-9A-HJ-NP-Za-km-z]{104}$/.test(address);
  }

  async function connectWallet(walletId: string) {
    setConnectingWallet(walletId);
    setError('');

    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockAddresses: Record<string, string> = {
        metamask: '0x742d...F3a2',
        phantom: '0x8B3c...A1d9',
      };

      setFormData(prev => ({
        ...prev,
        walletAddress: mockAddresses[walletId] || '0x0000...0000',
        walletType: walletId,
      }));
      setCurrentStep(2);
    } catch (err) {
      setError('Failed to connect wallet. Please try again.');
    } finally {
      setConnectingWallet(null);
    }
  }

  async function handleSubmit() {
    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase.from('dca_strategies').insert({
        wallet_address: formData.walletAddress,
        source_asset: formData.sourceAsset,
        amount_per_order: parseFloat(formData.amount),
        interval_value: formData.intervalValue,
        interval_unit: formData.intervalUnit,
        total_orders: formData.totalOrders,
        xmr_address: formData.xmrAddress,
        status: 'active',
        next_execution_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      });

      if (insertError) throw insertError;
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create strategy. Please try again.');
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
      default: return true;
    }
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="flex items-center justify-between mb-12">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                currentStep >= step.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-background-page'
                  : 'bg-zinc-800 text-text-tertiary'
              }`}>
                <step.icon size={18} />
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 md:w-16 h-0.5 ${
                  currentStep > step.id ? 'bg-primary' : 'bg-zinc-800'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="card">
          <h2 className="font-display text-2xl font-bold mb-2">{steps[currentStep - 1].title}</h2>

          {/* Step 1: Connect Wallet */}
          {currentStep === 1 && (
            <div className="py-8">
              {formData.walletAddress ? (
                <div className="flex items-center gap-3 p-4 bg-status-success/10 border border-status-success/30 rounded-lg">
                  <CheckCircle className="text-status-success" size={24} />
                  <div>
                    <p className="font-medium">Wallet Connected</p>
                    <p className="font-mono text-sm text-text-secondary">
                      {formData.walletType === 'phantom' ? 'Phantom' : 'MetaMask'}: {formData.walletAddress}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-text-secondary text-sm mb-4">
                    Choose your wallet provider to connect:
                  </p>
                  {availableWallets.map((wallet) => (
                    <button
                      key={wallet.id}
                      onClick={() => connectWallet(wallet.id)}
                      disabled={connectingWallet !== null}
                      className={`w-full p-4 rounded-lg border transition-all flex items-center gap-4 ${
                        connectingWallet === wallet.id
                          ? 'border-primary bg-primary/10'
                          : 'border-zinc-800 hover:border-zinc-700'
                      } disabled:opacity-50`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        wallet.id === 'metamask' 
                          ? 'bg-orange-500/20 text-orange-400' 
                          : 'bg-purple-500/20 text-purple-400'
                      }`}>
                        {wallet.icon}
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-medium">{wallet.name}</p>
                        <p className="text-text-tertiary text-sm">
                          {wallet.id === 'metamask' ? 'Ethereum & EVM chains' : 'Multi-chain wallet'}
                        </p>
                      </div>
                      {connectingWallet === wallet.id && (
                        <span className="text-primary text-sm">Connecting...</span>
                      )}
                    </button>
                  ))}
                  {error && (
                    <p className="text-status-error text-sm mt-2">{error}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Select Asset */}
          {currentStep === 2 && (
            <div className="py-6 space-y-3">
              <p className="text-text-secondary text-sm mb-4">
                Select the token you want to DCA from:
              </p>
              {assets.map((asset) => (
                <button
                  key={asset.symbol}
                  onClick={() => setFormData(prev => ({ ...prev, sourceAsset: asset.symbol }))}
                  className={`w-full p-4 rounded-lg border transition-all flex items-center gap-4 ${
                    formData.sourceAsset === asset.symbol
                      ? 'border-primary bg-primary/10'
                      : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-mono text-sm">
                    {asset.symbol.slice(0, 2)}
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{asset.symbol}</p>
                    <p className="text-text-tertiary text-sm">{asset.name}</p>
                  </div>
                  <div className="ml-auto text-text-tertiary text-sm">
                    Min: {asset.min_amount} {asset.symbol}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Amount */}
          {currentStep === 3 && (
            <div className="py-6">
              <label className="block text-text-secondary text-sm mb-2">
                Amount per order ({formData.sourceAsset})
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="100"
                className="input text-xl"
                min={selectedAsset?.min_amount || 0}
              />
              {selectedAsset && (
                <p className="text-text-tertiary text-sm mt-2">
                  Minimum: {selectedAsset.min_amount} {selectedAsset.symbol}
                </p>
              )}
            </div>
          )}

          {/* Step 4: XMR Address */}
          {currentStep === 4 && (
            <div className="py-6">
              <label className="block text-text-secondary text-sm mb-2">
                Monero Destination Address
              </label>
              <input
                type="text"
                value={formData.xmrAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, xmrAddress: e.target.value }))}
                placeholder="4..."
                className={`input-mono ${
                  formData.xmrAddress && !validateXmrAddress(formData.xmrAddress)
                    ? 'border-status-error focus:border-status-error'
                    : formData.xmrAddress && validateXmrAddress(formData.xmrAddress)
                    ? 'border-status-success focus:border-status-success'
                    : ''
                }`}
              />
              {formData.xmrAddress && !validateXmrAddress(formData.xmrAddress) && (
                <p className="text-status-error text-sm mt-2 flex items-center gap-1">
                  <AlertCircle size={14} /> Invalid Monero address format
                </p>
              )}
              <p className="text-text-tertiary text-xs mt-2">
                Your XMR will be sent to this address. Double-check it carefully.
              </p>
            </div>
          )}

          {/* Step 5: Interval */}
          {currentStep === 5 && (
            <div className="py-6 space-y-4">
              <p className="text-text-secondary text-sm mb-2">
                How often should we execute your DCA?
              </p>
              <div className="grid grid-cols-2 gap-3">
                {intervals.map((interval) => (
                  <button
                    key={interval.label}
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      intervalValue: interval.value,
                      intervalUnit: interval.unit,
                    }))}
                    className={`p-4 rounded-lg border transition-all ${
                      formData.intervalValue === interval.value && formData.intervalUnit === interval.unit
                        ? 'border-primary bg-primary/10'
                        : 'border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {interval.label}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-2">
                  Number of orders
                </label>
                <input
                  type="number"
                  value={formData.totalOrders}
                  onChange={(e) => setFormData(prev => ({ ...prev, totalOrders: parseInt(e.target.value) || 1 }))}
                  className="input"
                  min={1}
                  max={52}
                />
              </div>
            </div>
          )}

          {/* Step 6: Review */}
          {currentStep === 6 && (
            <div className="py-6 space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-text-secondary">Wallet</span>
                  <span className="font-mono">{formData.walletAddress}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-text-secondary">Source Asset</span>
                  <span>{formData.sourceAsset}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-text-secondary">Amount per Order</span>
                  <span>{formData.amount} {formData.sourceAsset}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-text-secondary">Frequency</span>
                  <span>{selectedInterval?.label}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-text-secondary">Total Orders</span>
                  <span>{formData.totalOrders}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-text-secondary">Total Investment</span>
                  <span className="text-primary font-medium">
                    {(parseFloat(formData.amount) * formData.totalOrders).toFixed(2)} {formData.sourceAsset}
                  </span>
                </div>
                <div className="pt-2">
                  <span className="text-text-secondary block mb-1">XMR Address</span>
                  <code className="font-mono text-xs text-primary break-all">{formData.xmrAddress}</code>
                </div>
              </div>

              <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-sm">
                <p className="font-medium mb-1">Estimated Fee</p>
                <p className="text-text-secondary">
                  Platform fee: 0.3% per swap ({(parseFloat(formData.amount) * 0.003).toFixed(4)} {formData.sourceAsset})
                </p>
              </div>

              {error && (
                <div className="p-4 bg-status-error/10 border border-status-error/30 rounded-lg text-status-error text-sm">
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-4 mt-6 pt-6 border-t border-zinc-800">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="btn-secondary flex items-center gap-2"
              >
                <ArrowLeft size={18} /> Back
              </button>
            )}
            
            {currentStep < 6 ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!canProceed()}
                className="btn-primary flex items-center gap-2 ml-auto disabled:opacity-50"
              >
                Next <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary flex items-center gap-2 ml-auto"
              >
                {loading ? 'Creating...' : 'Create Strategy'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
