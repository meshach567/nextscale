-- DropIndex (only if it exists)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE schemaname = 'public' 
        AND indexname = 'session_token_key'
    ) THEN
        DROP INDEX "public"."session_token_key";
    END IF;
EXCEPTION
    WHEN others THEN
        -- Index might not exist or already dropped, ignore
        NULL;
END $$;

-- AlterTable: analytics
-- Check if table exists first
DO $$
BEGIN
    -- Only proceed if analytics table exists
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'analytics'
    ) THEN
        -- Rename constraint (if it exists with old name)
        IF EXISTS (
            SELECT 1 FROM pg_constraint c
            JOIN pg_class t ON c.conrelid = t.oid
            JOIN pg_namespace n ON t.relnamespace = n.oid
            WHERE n.nspname = 'public'
            AND t.relname = 'analytics'
            AND c.conname = 'Analytics_pkey'
        ) THEN
            ALTER TABLE "analytics" RENAME CONSTRAINT "Analytics_pkey" TO "analytics_pkey";
        END IF;
        
        -- Drop default from updatedAt column if column exists
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_schema = 'public'
            AND table_name = 'analytics' 
            AND column_name = 'updatedAt'
        ) THEN
            BEGIN
                ALTER TABLE "analytics" ALTER COLUMN "updatedAt" DROP DEFAULT;
            EXCEPTION
                WHEN others THEN
                    -- Default might not exist, ignore
                    NULL;
            END;
        END IF;
    END IF;
END $$;

-- AlterTable: message
-- Check if table exists first
DO $$
BEGIN
    -- Only proceed if message table exists
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'message'
    ) THEN
        -- Rename constraint (if it exists with old name)
        IF EXISTS (
            SELECT 1 FROM pg_constraint c
            JOIN pg_class t ON c.conrelid = t.oid
            JOIN pg_namespace n ON t.relnamespace = n.oid
            WHERE n.nspname = 'public'
            AND t.relname = 'message'
            AND c.conname = 'Message_pkey'
        ) THEN
            ALTER TABLE "message" RENAME CONSTRAINT "Message_pkey" TO "message_pkey";
        END IF;
        
        -- Drop default from updatedAt column if column exists
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_schema = 'public'
            AND table_name = 'message' 
            AND column_name = 'updatedAt'
        ) THEN
            BEGIN
                ALTER TABLE "message" ALTER COLUMN "updatedAt" DROP DEFAULT;
            EXCEPTION
                WHEN others THEN
                    -- Default might not exist, ignore
                    NULL;
            END;
        END IF;
    END IF;
END $$;
