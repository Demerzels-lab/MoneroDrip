// File: supabase/functions/process-dca/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS (Optional if calling from browser, but good practice)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Initialize Supabase Client (Admin Mode)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log("🤖 Worker waking up... checking for due strategies.")

    // 2. Fetch Active Strategies that are due (or new)
    // We check if 'next_execution_at' is in the past
    const { data: strategies, error: fetchError } = await supabase
      .from('dca_strategies')
      .select('*')
      .eq('status', 'active')
      .lt('next_execution_at', new Date().toISOString())

    if (fetchError) throw fetchError;

    if (!strategies || strategies.length === 0) {
      console.log("💤 No strategies due.")
      return new Response(JSON.stringify({ message: 'Nothing to process' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const results = []

    // 3. Loop through strategies (The "Block Processing")
    for (const strategy of strategies) {
      console.log(`Processing Strategy ID: ${strategy.id}`)

      // --- LOGIC: Check Virtual Balance & Allowance ---
      if (strategy.virtual_balance_usdc < strategy.amount_per_order) {
        console.log(`❌ User broke. Pausing strategy.`)
        await supabase.from('dca_strategies').update({ status: 'paused' }).eq('id', strategy.id)
        results.push({ id: strategy.id, status: 'Failed: Insufficient Funds' })
        continue;
      }

      // --- EXECUTION: "Simulate" the Swap ---
      // Get real XMR price
      const priceRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=usd')
      const priceData = await priceRes.json()
      const xmrPrice = priceData.monero?.usd || 150.00 // Fallback if API fails
      const xmrAmount = strategy.amount_per_order / xmrPrice

      // --- DB UPDATES (Atomic-ish) ---
      
      // A. Calculate Next Run Date
      const nextRun = new Date();
      if (strategy.interval_unit === 'day') nextRun.setDate(nextRun.getDate() + strategy.interval_value);
      if (strategy.interval_unit === 'week') nextRun.setDate(nextRun.getDate() + (strategy.interval_value * 7));
      if (strategy.interval_unit === 'month') nextRun.setMonth(nextRun.getMonth() + strategy.interval_value);

      // B. Update Strategy State (Deduct money, increment progress)
      const { error: updateError } = await supabase
        .from('dca_strategies')
        .update({
          virtual_balance_usdc: strategy.virtual_balance_usdc - strategy.amount_per_order,
          completed_orders: (strategy.completed_orders || 0) + 1,
          last_execution: new Date().toISOString(),
          next_execution_at: nextRun.toISOString(),
          // Auto-complete if finished
          status: (strategy.completed_orders + 1) >= strategy.total_orders ? 'completed' : 'active'
        })
        .eq('id', strategy.id)

      if (!updateError) {
        // C. Log the Execution
        await supabase.from('dca_executions').insert({
          strategy_id: strategy.id,
          amount_in: strategy.amount_per_order,
          amount_out: xmrAmount,
          exchange_rate: xmrPrice,
          tx_hash: `0xSIMULATED_${Date.now().toString(16)}`, // Fake Hash
          status: 'completed',
          executed_at: new Date().toISOString()
        })
        results.push({ id: strategy.id, status: 'Executed Success' })
      }
    }

    return new Response(JSON.stringify({ processed: results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})