# Supabase Connection Fix Guide

## Problem
You're getting this error:
```
FATAL: (ENOTFOUND) tenant/user postgres.rnhuavjjfgvvkzcraddm not found
```

This happens because the connection string format is incorrect for Supabase.

## Solution

### Step 1: Get the Correct Connection Strings from Supabase

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Click on your project (`rnhuavjjfgvvkzcraddm`)
3. Go to **Settings** (gear icon in sidebar) → **Database**
4. Scroll down to **Connection string** section

You'll see two types of connections:

#### A. Connection Pooling (Transaction Mode)
This is for your **DATABASE_URL** (used by your app):
```
Format: postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

#### B. Direct Connection
This is for your **DIRECT_URL** (used by Prisma migrations):
```
Format: postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres
```

**OR** alternatively, the direct connection might use:
```
Format: postgresql://postgres:[PASSWORD]@db.rnhuavjjfgvvkzcraddm.supabase.co:5432/postgres
```

### Step 2: Copy the Connection Strings

In Supabase Dashboard:

1. **For DATABASE_URL (Transaction Mode with Pooler)**
   - Select "Transaction" mode
   - Select "URI" format
   - Click "Copy"
   - This uses port **6543**

2. **For DIRECT_URL (Session Mode or Direct)**
   - Select "Session" mode
   - Select "URI" format  
   - Click "Copy"
   - This uses port **5432** or **6543** depending on mode

### Step 3: Update Your `.env` File

Your `.env` should look like this (replace with YOUR actual values):

```env
# Use the EXACT strings from Supabase dashboard

# For Prisma migrations (Session mode, port 5432 or 6543)
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"

# For application (Transaction mode with pooler, port 6543)
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
```

### Step 4: Common Formats

Based on your project, here are the likely correct formats:

**Option 1: Using Supavisor Pooler (Recommended)**
```env
# Direct connection for migrations
DIRECT_URL="postgresql://postgres.rnhuavjjfgvvkzcraddm:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"

# Pooled connection for app
DATABASE_URL="postgresql://postgres.rnhuavjjfgvvkzcraddm:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Option 2: Using Direct Database Host**
```env
# Direct connection (no pooler)
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.rnhuavjjfgvvkzcraddm.supabase.co:5432/postgres"

# Same for app (will be slower, but works)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.rnhuavjjfgvvkzcraddm.supabase.co:5432/postgres"
```

### Step 5: Key Differences

| Connection Type | Port | Host Pattern | Use Case |
|----------------|------|--------------|----------|
| **Direct** | 5432 | `db.[ref].supabase.co` | Migrations, admin tasks |
| **Pooler (Session)** | 5432 | `aws-0-[region].pooler.supabase.com` | Migrations with pooler |
| **Pooler (Transaction)** | 6543 | `aws-0-[region].pooler.supabase.com` | App queries (fast) |

### Step 6: Test the Connection

After updating `.env`, run:

```bash
# 1. Validate schema
npx prisma validate

# 2. Test connection and create tables
npx prisma db push

# 3. Generate Prisma Client
npx prisma generate
```

## Troubleshooting

### Error: "tenant/user not found"
**Problem**: Using wrong username format in connection string

**Fix**: 
- For pooler: Use `postgres.[PROJECT-REF]` (e.g., `postgres.rnhuavjjfgvvkzcraddm`)
- For direct: Use just `postgres`

### Error: "Can't reach database server"
**Problem**: Wrong host or port

**Fix**:
- Check if you're using the correct host from Supabase dashboard
- Verify your network allows connections (firewall, VPN)
- Try both pooler and direct connection formats

### Error: "password authentication failed"
**Problem**: Wrong password or URL encoding issues

**Fix**:
- Get fresh password from Supabase (Settings → Database → Reset Password)
- If password has special characters, URL encode them:
  - `@` → `%40`
  - `#` → `%23`
  - `&` → `%26`
  - `/` → `%2F`

### Error: "prepared statement already exists"
**Problem**: Using Transaction mode (port 6543) for migrations

**Fix**:
- Use DIRECT_URL (port 5432) for `prisma db push` / `prisma migrate`
- Use DATABASE_URL (port 6543) only for app queries

## Quick Copy-Paste Template

Replace `[YOUR-PASSWORD]` with your actual Supabase database password:

```env
# Supabase Connection Strings
# Project: rnhuavjjfgvvkzcraddm
# Region: eu-central-1

# For Prisma migrations (Session mode, port 5432)
DIRECT_URL="postgresql://postgres.rnhuavjjfgvvkzcraddm:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"

# For app queries (Transaction mode with pooler, port 6543)
DATABASE_URL="postgresql://postgres.rnhuavjjfgvvkzcraddm:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
```

## Next Steps After Connection Works

1. Push schema: `npx prisma db push`
2. Generate client: `npx prisma generate`
3. (Optional) Create seed data: `npx prisma db seed`
4. Start dev server: `npm run dev`

---

**Need Help?**
- Supabase Docs: https://supabase.com/docs/guides/database/connecting-to-postgres
- Prisma Supabase Guide: https://www.prisma.io/docs/guides/database/supabase
