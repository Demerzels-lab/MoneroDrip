import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bpbtgkunrdzcoyfdhskh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwYnRna3VucmR6Y295ZmRoc2toIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MjAzNzUsImV4cCI6MjA3ODQ5NjM3NX0.ZAtjUoDnIWUOs6Os1NUGKIRUQVOuXDlaCJ4HwQqZu50';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DCAStrategy {
  id: string;
  wallet_address: string;
  source_asset: string;
  amount_per_order: number;
  interval_value: number;
  interval_unit: string;
  total_orders: number;
  completed_orders: number | null;
  xmr_address: string;
  status: string | null;
  next_execution_at: string | null;
  created_at: string | null;
}

export interface DCAExecution {
  id: string;
  strategy_id: string;
  execution_id: string;
  status: string;
  amount_in: number | null;
  amount_out: number | null;
  tx_hash: string | null;
  executed_at: string | null;
}

export interface SupportedAsset {
  id: number;
  symbol: string;
  name: string;
  network: string;
  min_amount: number;
  contract_address: string | null;
  icon_url: string | null;
  is_active: boolean | null;
}
