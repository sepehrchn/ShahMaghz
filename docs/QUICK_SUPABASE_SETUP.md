# 🚀 Quick Supabase Connection Setup

Your project is **Healthy** ✅ — Now let's connect it!

## Step 1: Get Your Connection Strings

1. In your Supabase dashboard (https://rnhuavjjfgvvkzcraddm.supabase.co)
2. Click **"Project Settings"** (gear icon ⚙️) in the bottom left sidebar
3. Click **"Database"** in the settings menu
4. Scroll down to **"Connection string"** section

## Step 2: Copy Connection Strings

You'll see a form that looks like this:

```
Connection string
┌─────────────────────────────────────────┐
│ Connection pooling                       │
│ Use connection pooling for scalable     │
│ apps with lots of connections           │
│                                          │
│ Mode: [Session ▼]  Port: 5432          │
│ ☑️ Use connection pooling               │
│                                          │
│ postgresql://postgres.rnhuavjjf...      │
│                                          │
│ [📋 Copy]  [👁️ Show password]          │
└─────────────────────────────────────────┘
```

### Copy DIRECT_URL (for migrations):
1. Make sure **"Use connection pooling"** checkbox is **CHECKED** ✅
2. Select **Mode: "Session"**
3. Port should show: **5432** or **6543**
4. Click **"Copy"** button
5. Save this as your **DIRECT_URL**

### Copy DATABASE_URL (for app):
1. Keep **"Use connection pooling"** checkbox **CHECKED** ✅
2. Select **Mode: "Transaction"**
3. Port should show: **6543**
4. Click **"Copy"** button
5. Save this as your **DATABASE_URL**

## Step 3: Update Your .env File

Replace the DATABASE_URL and DIRECT_URL in your `.env` file with the strings you just copied:

```env
# Paste the Session mode connection string here
DIRECT_URL="postgresql://postgres.rnhuavjjfgvvkzcraddm:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"

# Paste the Transaction mode connection string here
DATABASE_URL="postgresql://postgres.rnhuavjjfgvvkzcraddm:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

**IMPORTANT**: Use the EXACT strings from Supabase. Don't modify them!

## Step 4: Test Connection

Run these commands:

```bash
# 1. Validate Prisma schema
npx prisma validate

# 2. Create database tables
npx prisma db push

# 3. Generate Prisma Client
npx prisma generate
```

You should see:
```
✅ Your database is now in sync with your Prisma schema.
```

## Alternative: Using Direct Connection (Simpler, but slower)

If pooling doesn't work, try direct connection:

1. In Supabase, **UNCHECK** "Use connection pooling" ☐
2. Make sure port is **5432**
3. Click **"Copy"**
4. Use this same string for BOTH variables:

```env
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.rnhuavjjfgvvkzcraddm.supabase.co:5432/postgres"
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.rnhuavjjfgvvkzcraddm.supabase.co:5432/postgres"
```

## Troubleshooting

### "password authentication failed"
1. Go to: **Project Settings → Database**
2. Scroll to **"Database password"**
3. Click **"Reset database password"**
4. Copy the new password
5. Update your connection strings with new password

### "Can't reach database server"
1. Check if Supabase is down: https://status.supabase.com
2. Try disabling VPN if you're using one
3. Try a different network (mobile hotspot)

### "tenant/user not found"
- Make sure you're using connection strings directly from Supabase
- Username format should be: `postgres.rnhuavjjfgvvkzcraddm` (with the dot)

---

**Next: After connection works, run `npx prisma db push` to create your database tables!** 🎉
