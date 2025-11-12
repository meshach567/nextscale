# Fix Migration Without Losing Data

## Step 1: Check Migration Status
Run: `pnpm prisma migrate status`

## Step 2: If Migration Failed
Mark it as rolled back (if it failed):
```bash
pnpm prisma migrate resolve --rolled-back 20251112135710_fix_table_data
```

## Step 3: Try to Apply Again
```bash
pnpm prisma migrate dev
```

## Step 4: If Still Failing - Check Database State

The error about "public" schema usually means:
1. The migration partially applied
2. Tables/constraints exist but migration state is inconsistent

## Alternative: Manual Fix

If migrations are stuck, you can:
1. Connect to your Neon database
2. Check what's actually in the database
3. Manually mark migrations as applied if the changes are already there

## Safe Approach (No Data Loss)

1. **Check current state**: Connect to database and see what tables exist
2. **Compare with migrations**: See if the changes from migrations are already applied
3. **Mark as applied**: If changes exist, mark migration as applied without running it
4. **Fix remaining issues**: Apply only what's missing

## Commands:

```bash
# Check migration status
pnpm prisma migrate status

# Mark migration as applied (if changes already exist)
pnpm prisma migrate resolve --applied 20251112135710_fix_table_data

# Mark migration as rolled back (if it failed)
pnpm prisma migrate resolve --rolled-back 20251112135710_fix_table_data

# Generate Prisma client to match current schema
pnpm prisma generate

# Check database state
pnpm prisma db pull
```

