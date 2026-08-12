-- Durable "Mark Reviewed" state (Issue 4), replacing localStorage. No
-- separate reviews table — this app has no auth and exactly one reviewer,
-- so a nullable timestamp directly on signals is sufficient.
ALTER TABLE signals ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;
