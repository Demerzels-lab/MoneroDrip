CREATE TABLE dca_strategies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_address TEXT NOT NULL,
    xmr_address TEXT NOT NULL,
    source_asset TEXT NOT NULL,
    amount_per_order DECIMAL(18,8) NOT NULL,
    interval_value INTEGER NOT NULL,
    interval_unit TEXT NOT NULL,
    total_orders INTEGER NOT NULL,
    completed_orders INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    last_execution_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    next_execution_at TIMESTAMPTZ,
    failure_count INTEGER DEFAULT 0
);