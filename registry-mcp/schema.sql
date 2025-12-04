DROP TABLE IF EXISTS agents;
CREATE TABLE agents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  capabilities TEXT NOT NULL, -- JSON string
  pricing TEXT NOT NULL, -- JSON string
  reputation INTEGER DEFAULT 0,
  owner_id TEXT NOT NULL,
  wallet_id TEXT, -- Hedera Account ID for payments
  created_at INTEGER DEFAULT (unixepoch())
);
