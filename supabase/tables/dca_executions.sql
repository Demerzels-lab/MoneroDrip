CREATE TABLE dca_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    strategy_id UUID NOT NULL,
    execution_id TEXT NOT NULL,
    status TEXT NOT NULL,
    amount_in DECIMAL(18,8),
    amount_out DECIMAL(18,8),
    tx_hash TEXT,
    error_message TEXT,
    executed_at TIMESTAMPTZ DEFAULT NOW()
);