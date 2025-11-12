-- Step 1: Add updatedAt to Lead table with default value
ALTER TABLE "Lead" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Step 2: Alter Analytics table (don't drop, just alter)
-- Add updatedAt column with default value
ALTER TABLE "Analytics" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
-- Rename table from Analytics to analytics (lowercase)
ALTER TABLE "Analytics" RENAME TO "analytics";

-- Step 3: Alter Message table (don't drop, just alter)
-- Add updatedAt column with default value
ALTER TABLE "Message" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
-- Rename table from Message to message (lowercase)
ALTER TABLE "Message" RENAME TO "message";

-- Step 4: Create PageVisit table (new table, no data loss)
CREATE TABLE "PageVisit" (
    "id" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageVisit_pkey" PRIMARY KEY ("id")
);

-- Step 5: Alter account table
-- Add new columns as nullable first (only if they don't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'account' AND column_name = 'expiresAt') THEN
        ALTER TABLE "account" ADD COLUMN "expiresAt" INTEGER;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'account' AND column_name = 'provider') THEN
        ALTER TABLE "account" ADD COLUMN "provider" TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'account' AND column_name = 'providerAccountId') THEN
        ALTER TABLE "account" ADD COLUMN "providerAccountId" TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'account' AND column_name = 'sessionState') THEN
        ALTER TABLE "account" ADD COLUMN "sessionState" TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'account' AND column_name = 'tokenType') THEN
        ALTER TABLE "account" ADD COLUMN "tokenType" TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'account' AND column_name = 'type') THEN
        ALTER TABLE "account" ADD COLUMN "type" TEXT;
    END IF;
END $$;

-- Migrate data from old columns to new columns if the old columns exist
-- Check if columns exist and migrate data
DO $$
BEGIN
    -- Check if accountId column exists and migrate
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'account' AND column_name = 'accountId'
    ) THEN
        UPDATE "account" SET "providerAccountId" = "accountId" WHERE "accountId" IS NOT NULL;
    END IF;
    
    -- Check if providerId column exists and migrate
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'account' AND column_name = 'providerId'
    ) THEN
        UPDATE "account" SET "provider" = "providerId" WHERE "providerId" IS NOT NULL;
    END IF;
    
    -- Set default type for rows without type
    UPDATE "account" SET "type" = 'oauth' WHERE "type" IS NULL;
END $$;

-- Drop old columns after migration (only if they exist)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'account' AND column_name = 'accountId'
    ) THEN
        ALTER TABLE "account" DROP COLUMN "accountId";
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'account' AND column_name = 'providerId'
    ) THEN
        ALTER TABLE "account" DROP COLUMN "providerId";
    END IF;
END $$;

-- Step 6: Alter session table
-- Add sessionToken as nullable first
ALTER TABLE "session" ADD COLUMN "sessionToken" TEXT;

-- Populate sessionToken for existing sessions
-- Using a function to generate CUID-like values (using gen_random_uuid for uniqueness)
-- PostgreSQL doesn't have cuid() built-in, so we'll use uuid with a prefix
UPDATE "session" SET "sessionToken" = 'c' || replace(gen_random_uuid()::text, '-', '') WHERE "sessionToken" IS NULL;

-- Verify no duplicates before creating unique index
-- If duplicates exist, we'll handle them by making them unique
DO $$
DECLARE
    duplicate_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO duplicate_count
    FROM (
        SELECT "sessionToken", COUNT(*) as cnt
        FROM "session"
        WHERE "sessionToken" IS NOT NULL
        GROUP BY "sessionToken"
        HAVING COUNT(*) > 1
    ) duplicates;
    
    IF duplicate_count > 0 THEN
        -- Update duplicates to make them unique
        UPDATE "session" s1
        SET "sessionToken" = s1."sessionToken" || '_' || s1."id"
        WHERE EXISTS (
            SELECT 1 FROM "session" s2
            WHERE s2."sessionToken" = s1."sessionToken"
            AND s2."id" < s1."id"
        );
    END IF;
END $$;

-- Now create the unique index
CREATE UNIQUE INDEX IF NOT EXISTS "session_sessionToken_key" ON "session"("sessionToken");

-- Step 7: Alter user table
-- Add role column with default
ALTER TABLE "user" ADD COLUMN "role" TEXT NOT NULL DEFAULT 'user';
-- Make name nullable
ALTER TABLE "user" ALTER COLUMN "name" DROP NOT NULL;
-- Change emailVerified from BOOLEAN to TIMESTAMP
-- First, create new column
ALTER TABLE "user" ADD COLUMN "emailVerified_new" TIMESTAMP(3);
-- Migrate data: if emailVerified was true, set to createdAt, otherwise NULL
UPDATE "user" SET "emailVerified_new" = "createdAt" WHERE "emailVerified" = true;
-- Drop old column and rename new one
ALTER TABLE "user" DROP COLUMN "emailVerified";
ALTER TABLE "user" RENAME COLUMN "emailVerified_new" TO "emailVerified";
-- Update updatedAt to use @updatedAt behavior (remove default, add trigger behavior via Prisma)
ALTER TABLE "user" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- Step 8: Alter verification table
-- Add token column as nullable first
ALTER TABLE "verification" ADD COLUMN "token" TEXT;

-- Populate token for existing rows
-- Using a combination of identifier and value to ensure uniqueness, or generate unique tokens
UPDATE "verification" SET "token" = 'v' || replace(gen_random_uuid()::text, '-', '') WHERE "token" IS NULL;

-- Verify no duplicates before making it required
DO $$
DECLARE
    duplicate_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO duplicate_count
    FROM (
        SELECT "token", COUNT(*) as cnt
        FROM "verification"
        WHERE "token" IS NOT NULL
        GROUP BY "token"
        HAVING COUNT(*) > 1
    ) duplicates;
    
    IF duplicate_count > 0 THEN
        -- Update duplicates to make them unique
        UPDATE "verification" v1
        SET "token" = v1."token" || '_' || v1."id"
        WHERE EXISTS (
            SELECT 1 FROM "verification" v2
            WHERE v2."token" = v1."token"
            AND v2."id" < v1."id"
        );
    END IF;
END $$;

-- Make token required (now that all rows have unique values)
ALTER TABLE "verification" ALTER COLUMN "token" SET NOT NULL;

-- Update updatedAt to use @updatedAt behavior
ALTER TABLE "verification" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- Step 9: Update updatedAt columns to remove defaults (they'll be handled by @updatedAt)
ALTER TABLE "session" ALTER COLUMN "updatedAt" DROP DEFAULT;
ALTER TABLE "account" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- Step 10: Create indexes
CREATE INDEX IF NOT EXISTS "PageVisit_page_idx" ON "PageVisit"("page");
CREATE INDEX IF NOT EXISTS "PageVisit_createdAt_idx" ON "PageVisit"("createdAt");
CREATE INDEX IF NOT EXISTS "analytics_page_idx" ON "analytics"("page");
CREATE INDEX IF NOT EXISTS "analytics_createdAt_idx" ON "analytics"("createdAt");
CREATE INDEX IF NOT EXISTS "Lead_email_idx" ON "Lead"("email");
CREATE INDEX IF NOT EXISTS "Lead_industry_idx" ON "Lead"("industry");
CREATE INDEX IF NOT EXISTS "Lead_projectType_idx" ON "Lead"("projectType");
CREATE INDEX IF NOT EXISTS "Lead_createdAt_idx" ON "Lead"("createdAt");
CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "account"("userId");

-- Step 11: Create unique constraints
-- Note: For account, the unique constraint on nullable fields allows multiple NULLs
-- Check for duplicates in account before creating unique index
DO $$
DECLARE
    duplicate_count INTEGER;
BEGIN
    -- Check for duplicate provider/providerAccountId combinations (excluding NULLs)
    SELECT COUNT(*) INTO duplicate_count
    FROM (
        SELECT "provider", "providerAccountId", COUNT(*) as cnt
        FROM "account"
        WHERE "provider" IS NOT NULL AND "providerAccountId" IS NOT NULL
        GROUP BY "provider", "providerAccountId"
        HAVING COUNT(*) > 1
    ) duplicates;
    
    IF duplicate_count > 0 THEN
        RAISE WARNING 'Found duplicate provider/providerAccountId combinations. These will cause unique constraint to fail.';
        -- Make duplicates unique by appending id
        UPDATE "account" a1
        SET "providerAccountId" = a1."providerAccountId" || '_' || a1."id"
        WHERE EXISTS (
            SELECT 1 FROM "account" a2
            WHERE a2."provider" = a1."provider"
            AND a2."providerAccountId" = a1."providerAccountId"
            AND a2."id" < a1."id"
            AND a1."provider" IS NOT NULL
            AND a1."providerAccountId" IS NOT NULL
        );
    END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "account_provider_providerAccountId_key" ON "account"("provider", "providerAccountId");

-- Create unique index on userId for session (one session per user)
-- Check for duplicates first
DO $$
DECLARE
    duplicate_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO duplicate_count
    FROM (
        SELECT "userId", COUNT(*) as cnt
        FROM "session"
        GROUP BY "userId"
        HAVING COUNT(*) > 1
    ) duplicates;
    
    IF duplicate_count > 0 THEN
        RAISE WARNING 'Found duplicate userId in session table. Only keeping the most recent session per user.';
        -- Delete older sessions, keeping only the most recent one per user
        DELETE FROM "session" s1
        WHERE EXISTS (
            SELECT 1 FROM "session" s2
            WHERE s2."userId" = s1."userId"
            AND s2."createdAt" > s1."createdAt"
        );
    END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "session_userId_key" ON "session"("userId");

-- Create unique index on token for verification (already verified above, but ensure)
CREATE UNIQUE INDEX IF NOT EXISTS "verification_token_key" ON "verification"("token");
