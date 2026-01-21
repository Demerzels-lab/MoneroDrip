import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, Coins, ChevronDown, Repeat, ArrowRightLeft, 
  Trash2, AlertCircle, CheckCircle, Info 
} from 'lucide-react';
import { supabase, SupportedAsset } from '../lib/supabase';

// --- Mock Data for Simulation ---
const mockWallets = [
  { id: 'metamask', name: 'MetaMask', icon: '🦊', address: '0x71C...9A21' },
  { id: 'phantom', name: 'Phantom', icon: '👻', address: '0x33A...B1B2' },
];

const intervals = [
  { value: 'day', label: 'Day(s)' },
  { value: 'week', label: 'Week(s)' },
  { value: 'month', label: 'Month(s)' },
];

export function CreatePage() {
  const navigate = useNavigate();
  const [assets, setAssets] = useState<SupportedAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // --- Simulation State ---
  const [virtualBalance] = useState(1000); 
  const [isApproved, setIsApproved] = useState(false);
  
  // --- UI State (The Fix) ---
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  // --- Form Data ---
  const [formData, setFormData] = useState({
    walletAddress: '',
    walletType: '',
    sourceAsset: 'USDC',
    amount: '',
    xmrAddress: '',
    intervalValue: 1,
    intervalUnit: 'week',
    totalOrders: 52,
  });

  useEffect(() => {
    async function loadAssets() {
      const { data } = await supabase
        .from('supported_assets')
        .select('*')
        .eq('is_active', true);
      
      if (data && data.length > 0) {
        setAssets(data);
        if (!formData.sourceAsset) {
            setFormData(prev => ({ ...prev, sourceAsset: data[0].symbol }));
        }
      }
    }
    loadAssets();
  }, [formData.sourceAsset]);

  // --- Validation Logic ---
  function validateXmrAddress(address: string): boolean {
    const cleanAddr = address.trim();
    return /^[48]/.test(cleanAddr) && (cleanAddr.length === 95 || cleanAddr.length === 106);
  }

  const isFormValid = 
    Boolean(formData.amount) && 
    parseFloat(formData.amount) > 0 && 
    validateXmrAddress(formData.xmrAddress);

  // --- Handlers ---
  async function connectWallet(wallet: typeof mockWallets[0]) {
    setError('');
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 600));
    setFormData(prev => ({
      ...prev,
      walletAddress: wallet.address,
      walletType: wallet.id,
    }));
    setIsWalletOpen(false); // Close dropdown after selection
  }

  async function handleApprove() {
    if (!isFormValid) return;
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    setIsApproved(true);
    setLoading(false);
  }

  async function handleSubmit() {
    setLoading(true);
    setError('');

    try {
      if (!formData.walletAddress) throw new Error('Please connect your wallet first.');
      if (!validateXmrAddress(formData.xmrAddress)) throw new Error('Invalid Monero address.');
      
      const totalCost = parseFloat(formData.amount) * formData.totalOrders;
      if (totalCost > virtualBalance) {
        throw new Error(`Insufficient Balance. Need $${totalCost.toFixed(2)}, have $${virtualBalance}.`);
      }

      const { error: insertError } = await supabase.from('dca_strategies').insert({
        wallet_address: formData.walletAddress,
        source_asset: formData.sourceAsset,
        amount_per_order: parseFloat(formData.amount),
        interval_value: formData.intervalValue,
        interval_unit: formData.intervalUnit,
        total_orders: formData.totalOrders,
        xmr_address: formData.xmrAddress.trim(),
        status: 'active',
        next_execution_at: new Date(Date.now() + 60 * 1000).toISOString(),
        virtual_allowance: 99999999, 
        virtual_balance_usdc: virtualBalance 
      });

      if (insertError) throw insertError;
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create strategy.');
    } finally {
      setLoading(false);
    }
  }

  const totalInvestment = formData.amount ? (parseFloat(formData.amount) * formData.totalOrders).toFixed(2) : '0.00';
  const selectedAsset = assets.find(a => a.symbol === formData.sourceAsset);

  // Determine Button State
  const getButtonState = () => {
    // If wallet not connected, button should scroll top and open dropdown
    if (!formData.walletAddress) return { 
        text: "Connect Wallet to Start", 
        disabled: false, 
        action: () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsWalletOpen(true);
        } 
    };
    if (!formData.amount || parseFloat(formData.amount) <= 0) return { text: "Enter Amount", disabled: true, action: () => {} };
    if (!validateXmrAddress(formData.xmrAddress)) return { text: "Invalid XMR Address", disabled: true, action: () => {} };
    if (!isApproved) return { text: `Approve ${formData.sourceAsset}`, disabled: loading, action: handleApprove };
    return { text: "Create Strategy", disabled: loading, action: handleSubmit };
  };

  const btnState = getButtonState();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-background-surface border border-white/5 mb-4">
                <Repeat className="text-primary" size={24} />
            </div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Create DCA Strategy</h1>
            <p className="text-text-secondary">Set up your automatic recurring Monero purchases.</p>
        </div>

        {/* Main Form Card */}
        <div className="card p-6 md:p-8 space-y-8 bg-[#0B0E14] border-white/5 shadow-2xl relative overflow-visible">
            
            {/* 1. Wallet Connection Header */}
            <div className="flex justify-center gap-4 relative z-30">
                <div className="bg-background-surface border border-white/10 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-medium text-white">
                    <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026" className="w-5 h-5" alt="ETH" />
                    Ethereum
                    <ChevronDown size={14} className="text-text-tertiary" />
                </div>

                {!formData.walletAddress ? (
                    <div className="relative">
                         <button 
                            onClick={() => setIsWalletOpen(!isWalletOpen)}
                            className="bg-primary text-background-page hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-bold transition-all shadow-glow-cyan flex items-center gap-2"
                         >
                            Connect Wallet
                            <ChevronDown size={14} className={`transition-transform duration-200 ${isWalletOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {/* Dropdown Menu - State Controlled */}
                        {isWalletOpen && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-background-surface border border-white/10 rounded-xl overflow-hidden shadow-xl animate-in fade-in slide-in-from-top-2 z-50">
                                {mockWallets.map(w => (
                                    <button 
                                        key={w.id} 
                                        onClick={() => connectWallet(w)} 
                                        className="w-full text-left px-4 py-3 hover:bg-white/5 flex items-center gap-3 transition-colors border-b border-white/5 last:border-0"
                                    >
                                        <span className="text-lg">{w.icon}</span>
                                        <span className="text-sm font-bold text-white">{w.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-background-surface border border-white/10 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-medium text-white">
                        <span className="w-2 h-2 rounded-full bg-status-success shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                        {formData.walletAddress}
                    </div>
                )}
            </div>

            <div className="w-full h-px bg-white/5" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* 2. Asset Selection */}
                <div className="space-y-3">
                    <label className="text-sm font-bold text-text-secondary">Asset to Allocate</label>
                    <div className="relative">
                        <select 
                            value={formData.sourceAsset}
                            onChange={(e) => setFormData(prev => ({ ...prev, sourceAsset: e.target.value }))}
                            className="w-full bg-background-page border border-white/10 rounded-xl px-4 py-4 text-white appearance-none focus:border-primary focus:outline-none transition-colors cursor-pointer font-medium"
                        >
                            {assets.map(a => (
                                <option key={a.symbol} value={a.symbol}>{a.name} ({a.symbol})</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Coins size={18} className="text-text-tertiary" />
                        </div>
                    </div>
                    <div className="text-xs text-text-tertiary">Balance: ${virtualBalance.toLocaleString()} USDC (Simulated)</div>
                </div>

                {/* 3. Allocation Amount */}
                <div className="space-y-3">
                    <label className="text-sm font-bold text-text-secondary">Allocation Amount</label>
                    <div className={`flex rounded-xl bg-background-page border overflow-hidden transition-colors ${
                        formData.amount && parseFloat(formData.amount) <= 0 ? 'border-status-error/50' : 'border-white/10 focus-within:border-primary'
                    }`}>
                         <div className="bg-white/5 px-4 flex items-center justify-center border-r border-white/5 text-sm font-bold text-text-secondary">
                             {formData.sourceAsset}
                         </div>
                         <input 
                            type="number"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                            className="flex-1 bg-transparent px-4 py-4 text-white font-mono outline-none"
                         />
                         <div className="px-4 flex items-center text-text-tertiary text-sm">
                            ${formData.amount || '0.00'}
                         </div>
                    </div>
                    {selectedAsset && (
                        <div className="flex justify-between text-xs text-text-tertiary">
                           <span>Min: {selectedAsset.min_amount} {formData.sourceAsset}</span>
                        </div>
                    )}
                </div>

            </div>

            {/* 4. Monero Address */}
            <div className="space-y-3">
                <label className="text-sm font-bold text-text-secondary flex items-center justify-between">
                    <span>Your Monero Wallet Address</span>
                    {formData.xmrAddress && validateXmrAddress(formData.xmrAddress) && (
                        <span className="text-status-success text-xs flex items-center gap-1"><CheckCircle size={12}/> Valid</span>
                    )}
                </label>
                <div className="relative">
                    <input 
                        type="text"
                        placeholder="4... or 8... (95+ characters)"
                        value={formData.xmrAddress}
                        onChange={(e) => setFormData(prev => ({ ...prev, xmrAddress: e.target.value }))}
                        className={`w-full bg-background-page border rounded-xl pl-12 pr-4 py-4 text-sm font-mono text-white focus:outline-none transition-colors ${
                            formData.xmrAddress && !validateXmrAddress(formData.xmrAddress) 
                            ? 'border-status-error focus:border-status-error text-status-error' 
                            : 'border-white/10 focus:border-primary'
                        }`}
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <Wallet size={18} className={formData.xmrAddress && !validateXmrAddress(formData.xmrAddress) ? "text-status-error" : "text-text-tertiary"} />
                    </div>
                </div>
                {formData.xmrAddress && !validateXmrAddress(formData.xmrAddress) && (
                     <p className="text-xs text-status-error">Address must start with 4 or 8 and be standard length (95/106 chars).</p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* 5. Interval */}
                 <div className="space-y-3">
                    <label className="text-sm font-bold text-text-secondary">Investment Interval</label>
                    <div className="flex gap-2">
                         <input 
                            type="number"
                            min="1"
                            value={formData.intervalValue}
                            onChange={(e) => setFormData(prev => ({ ...prev, intervalValue: parseInt(e.target.value) || 1 }))}
                            className="w-1/3 bg-background-page border border-white/10 rounded-xl px-4 py-4 text-center text-white font-bold outline-none focus:border-primary"
                        />
                         <select 
                            value={formData.intervalUnit}
                            onChange={(e) => setFormData(prev => ({ ...prev, intervalUnit: e.target.value }))}
                            className="flex-1 bg-background-page border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-primary appearance-none cursor-pointer"
                        >
                            {intervals.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
                        </select>
                    </div>
                 </div>

                 {/* 6. Number of Orders */}
                 <div className="space-y-3">
                    <label className="text-sm font-bold text-text-secondary">Number of Orders</label>
                    <input 
                        type="number"
                        value={formData.totalOrders}
                        onChange={(e) => setFormData(prev => ({ ...prev, totalOrders: parseInt(e.target.value) || 1 }))}
                        className="w-full bg-background-page border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-primary"
                    />
                 </div>
            </div>

            {/* 7. Quick Select */}
            <div className="space-y-3">
                <label className="text-sm font-bold text-text-secondary">Quick Select (Total Orders)</label>
                <div className="flex flex-wrap gap-2">
                    {[5, 10, 20, 52, 100].map(num => (
                        <button
                            key={num}
                            onClick={() => setFormData(prev => ({ ...prev, totalOrders: num }))}
                            className={`px-4 py-2 rounded-lg text-sm font-mono transition-all border ${
                                formData.totalOrders === num 
                                ? 'bg-primary text-background-page border-primary font-bold' 
                                : 'bg-background-page text-text-secondary border-white/5 hover:border-white/20'
                            }`}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>

            {/* 8. Summary & Action */}
            <div className="pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 mb-6 bg-background-surface/50 p-3 rounded-lg">
                    <Info size={16} className="text-primary" />
                    <span className="text-sm text-text-secondary">
                        Strategy will start automatically in <strong>1 minute</strong>.
                    </span>
                </div>

                {error && (
                    <div className="bg-status-error/10 text-status-error p-3 rounded-lg text-sm mb-4 flex items-center gap-2">
                        <AlertCircle size={16} /> {error}
                    </div>
                )}
                
                {/* SMART ACTION BUTTON */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
                     <button
                        onClick={btnState.action}
                        disabled={btnState.disabled}
                        className={`h-14 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
                            btnState.disabled
                                ? 'bg-white/5 text-text-tertiary cursor-not-allowed border border-white/5'
                                : !isApproved && formData.walletAddress
                                    ? 'bg-status-warning text-background-page hover:bg-status-warning/90 shadow-glow-yellow'
                                    : 'btn-primary shadow-glow-cyan'
                        }`}
                     >
                        {loading && <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />}
                        {btnState.text}
                        {!loading && formData.walletAddress && isApproved && <ArrowRightLeft size={18} />}
                     </button>

                     <button 
                        onClick={() => navigate('/dashboard')}
                        className="h-14 px-6 rounded-xl border border-white/10 text-text-secondary hover:text-white hover:bg-white/5 font-medium flex items-center gap-2"
                     >
                        <Trash2 size={18} />
                        <span className="hidden md:inline">Cancel</span>
                     </button>
                </div>
                
                {/* Total Investment Display */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-text-secondary">
                        Total Investment: <span className="text-white font-bold">${totalInvestment}</span> over {formData.totalOrders * (typeof formData.intervalValue === 'string' ? parseInt(formData.intervalValue) : formData.intervalValue)} {formData.intervalUnit}s
                    </p>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}