import { useState, useEffect } from 'react';
import { Activity, TrendingUp, Coins, Pause, Trash2, Play, ExternalLink } from 'lucide-react';
import { supabase, DCAStrategy, DCAExecution } from '../lib/supabase';

export function DashboardPage() {
  const [strategies, setStrategies] = useState<DCAStrategy[]>([]);
  const [executions, setExecutions] = useState<DCAExecution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const [strategiesRes, executionsRes] = await Promise.all([
      supabase.from('dca_strategies').select('*').order('created_at', { ascending: false }),
      supabase.from('dca_executions').select('*').order('executed_at', { ascending: false }).limit(20),
    ]);
    
    if (strategiesRes.data) setStrategies(strategiesRes.data);
    if (executionsRes.data) setExecutions(executionsRes.data);
    setLoading(false);
  }

  async function toggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    await supabase.from('dca_strategies').update({ status: newStatus }).eq('id', id);
    loadData();
  }

  async function cancelStrategy(id: string) {
    if (!confirm('Are you sure you want to cancel this strategy?')) return;
    await supabase.from('dca_strategies').update({ status: 'cancelled' }).eq('id', id);
    loadData();
  }

  const stats = {
    totalVolume: strategies.reduce((sum, s) => sum + (s.amount_per_order * (s.completed_orders || 0)), 0),
    totalXmr: executions.reduce((sum, e) => sum + (e.amount_out || 0), 0),
    avgPrice: executions.length > 0
      ? executions.reduce((sum, e) => sum + ((e.amount_in || 0) / (e.amount_out || 1)), 0) / executions.length
      : 0,
  };

  function getStatusColor(status: string | null) {
    switch (status) {
      case 'active': return 'text-status-success';
      case 'paused': return 'text-status-warning';
      case 'cancelled': return 'text-text-tertiary';
      default: return 'text-text-secondary';
    }
  }

  function getStatusDot(status: string | null) {
    switch (status) {
      case 'active': return 'bg-status-success animate-pulse-slow';
      case 'paused': return 'bg-status-warning';
      default: return 'bg-text-tertiary';
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-text-secondary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="font-display text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="text-primary" size={20} />
            <span className="text-text-secondary text-sm">Total Volume</span>
          </div>
          <p className="font-display text-2xl font-bold">${stats.totalVolume.toLocaleString()}</p>
        </div>
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <Coins className="text-monero" size={20} />
            <span className="text-text-secondary text-sm">Total XMR Acquired</span>
          </div>
          <p className="font-display text-2xl font-bold">{stats.totalXmr.toFixed(4)} XMR</p>
        </div>
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-secondary" size={20} />
            <span className="text-text-secondary text-sm">Avg Price</span>
          </div>
          <p className="font-display text-2xl font-bold">${stats.avgPrice.toFixed(2)}</p>
        </div>
      </div>

      {/* Active Strategies */}
      <h2 className="font-display text-xl font-bold mb-4">Active Strategies</h2>
      {strategies.length === 0 ? (
        <div className="card text-center py-12 text-text-secondary">
          No strategies yet. Create your first DCA strategy to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {strategies.map((strategy) => (
            <div key={strategy.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusDot(strategy.status)}`} />
                  <span className={`text-sm font-medium ${getStatusColor(strategy.status)}`}>
                    {strategy.status?.toUpperCase()}
                  </span>
                </div>
                <span className="font-mono text-xs text-text-tertiary">
                  {strategy.source_asset}
                </span>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Amount</span>
                  <span>{strategy.amount_per_order} {strategy.source_asset}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Interval</span>
                  <span>Every {strategy.interval_value} {strategy.interval_unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Progress</span>
                  <span>{strategy.completed_orders || 0} / {strategy.total_orders}</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full"
                    style={{ width: `${((strategy.completed_orders || 0) / strategy.total_orders) * 100}%` }}
                  />
                </div>
              </div>

              {strategy.next_execution_at && strategy.status === 'active' && (
                <p className="text-text-tertiary text-xs mb-4">
                  Next: {new Date(strategy.next_execution_at).toLocaleDateString()}
                </p>
              )}

              <div className="flex gap-2">
                {strategy.status !== 'cancelled' && (
                  <>
                    <button
                      onClick={() => toggleStatus(strategy.id, strategy.status || '')}
                      className="btn-secondary text-xs py-2 px-3 flex items-center gap-1"
                    >
                      {strategy.status === 'active' ? (
                        <><Pause size={14} /> Pause</>
                      ) : (
                        <><Play size={14} /> Resume</>
                      )}
                    </button>
                    <button
                      onClick={() => cancelStrategy(strategy.id)}
                      className="text-status-error hover:text-status-error/80 text-xs py-2 px-3 flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Execution History */}
      <h2 className="font-display text-xl font-bold mb-4">Execution History</h2>
      {executions.length === 0 ? (
        <div className="card text-center py-8 text-text-secondary">
          No executions yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-text-secondary font-medium">Date</th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">Amount In</th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">Amount Out</th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">Status</th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">Tx</th>
              </tr>
            </thead>
            <tbody>
              {executions.map((exec) => (
                <tr key={exec.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 px-4">
                    {exec.executed_at ? new Date(exec.executed_at).toLocaleDateString() : '-'}
                  </td>
                  <td className="py-3 px-4">${exec.amount_in?.toFixed(2) || '-'}</td>
                  <td className="py-3 px-4 text-monero">{exec.amount_out?.toFixed(4) || '-'} XMR</td>
                  <td className="py-3 px-4">
                    <span className={`${
                      exec.status === 'completed' ? 'text-status-success' :
                      exec.status === 'failed' ? 'text-status-error' : 'text-status-warning'
                    }`}>
                      {exec.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {exec.tx_hash ? (
                      <a
                        href={`https://etherscan.io/tx/${exec.tx_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        {exec.tx_hash.slice(0, 8)}...
                        <ExternalLink size={12} />
                      </a>
                    ) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
