-- Check Migration Status
-- Run this in your Neon database to see what's actually applied

-- Check what migrations are marked as applied
SELECT migration_name, finished_at, rolled_back_at 
FROM "_prisma_migrations" 
ORDER BY started_at DESC;

-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check if analytics table exists and its structure
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name IN ('analytics', 'Analytics', 'message', 'Message', 'Lead', 'session', 'account', 'user', 'verification')
ORDER BY table_name, ordinal_position;

-- Check constraints on analytics table
SELECT conname, contype
FROM pg_constraint
WHERE conrelid = 'public.analytics'::regclass
OR conrelid = 'public.Analytics'::regclass;

-- Check if session_token_key index exists
SELECT indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public'
AND indexname = 'session_token_key';

