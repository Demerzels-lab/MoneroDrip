CREATE TABLE supported_assets (
    id SERIAL PRIMARY KEY,
    symbol TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    network TEXT NOT NULL,
    contract_address TEXT,
    min_amount DECIMAL(18,8) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    icon_url TEXT
);