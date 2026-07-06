# 🔧 Get Correct Supabase Connection Strings

## The Problem

You're getting errors because:
1. The connection string format might be wrong
2. The database might be paused
3. The password might have changed

## ✅ Step-by-Step Solution

### Step 1: Go to Supabase Dashboard

1. Open: https://app.supabase.com
2. Sign in to your account
3. Click on your project: `rnhuavjjfgvvkzcraddm`

### Step 2: Check if Database is Active

1. Look at the top of the dashboard
2. If you see "**Database paused**" or "**Project paused**":
   - Click "**Resume project**" or "**Restore project**"
   - Wait 1-2 minutes for it to wake up

### Step 3: Get Connection Strings

1. Click on **Settings** (gear icon) in the left sidebar
2. Click on **Database** in the settings menu
3. Scroll down to **Connection string** section

You'll see dropdown menus:

#### For DIRECT_URL (Migrations):
1. **Mode**: Select "**Session**"
2. **Pooler**: Toggle **OFF** (or select "Direct connection")
3. **Format**: Select "**URI**"
4. Click **Copy** button
5. This is your `DIRECT_URL`

#### For DATABASE_URL (App):
1. **Mode**: Select "**Transaction**"  
2. **Pooler**: Toggle **ON**
3. **Format**: Select "**URI**"
4. Click **Copy** button
5. This is your `DATABASE_URL`

### Step 4: Update Your .env File

Paste the EXACT strings you copied:

```env
# Direct connection for Prisma migrations
DIRECT_URL="[PASTE THE SESSION MODE URI HERE]"

# Pooled connection for app queries  
DATABASE_URL="[PASTE THE TRANSACTION MODE URI HERE]"
```

### Step 5: Verify Connection

Run these commands:

```bash
# 1. Validate schema
npx prisma validate

# 2. Push schema to database
npx prisma db push

# 3. Generate Prisma Client
npx prisma generate
```

## 🎯 What the Correct Format Looks Like

Your connection strings should look like ONE of these:

### Option A: Using Pooler (Supavisor)
```
DIRECT_URL="postgresql://postgres.rnhuavjjfgvvkzcraddm:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
DATABASE_URL="postgresql://postgres.rnhuavjjfgvvkzcraddm:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

### Option B: Direct Database Connection
```
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.rnhuavjjfgvvkzcraddm.supabase.co:5432/postgres"
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.rnhuavjjfgvvkzcraddm.supabase.co:5432/postgres"
```

## 🔍 Common Issues & Fixes

### Issue 1: "tenant/user not found"
**Cause**: Wrong username format in pooler connection

**Fix**: 
- For pooler: username should be `postgres.YOUR_PROJECT_REF`
- For direct: username should be `postgres`

### Issue 2: "Can't reach database server"
**Possible causes**:
1. Database is paused → Resume it in dashboard
2. Wrong host/port → Copy fresh strings from dashboard
3. Network/firewall issue → Try different network
4. VPN interfering → Disable VPN temporarily

**Fix**: 
- Check database status in Supabase dashboard
- Make sure "Database" is **active/green**

### Issue 3: "password authentication failed"
**Cause**: Password is wrong or has special characters

**Fix**:
1. In Supabase: Settings → Database
2. Click "**Reset database password**"
3. Copy the NEW password
4. Update connection strings with new password

### Issue 4: Special Characters in Password
If your password has special characters, they need URL encoding:

| Character | URL Encoded |
|-----------|-------------|
| `@` | `%40` |
| `#` | `%23` |
| `&` | `%26` |
| `/` | `%2F` |
| `:` | `%3A` |
| `?` | `%3F` |

**Example**:
```
Password: myP@ss#word
Encoded: myP%40ss%23word
```

## 📸 Screenshot Guide

Here's what to look for in Supabase Dashboard:

```
Settings → Database → Connection string

┌─────────────────────────────────────┐
│ Connection string                   │
├─────────────────────────────────────┤
│ Mode: [Session ▼]                   │
│ Pooler: [Toggle OFF/ON]             │
│ Format: [URI ▼]                     │
│                                     │
│ postgresql://postgres.xxxxx:***     │
│                                     │
│ [Copy] [Show password]              │
└─────────────────────────────────────┘
```

## ✅ Success Check

After updating `.env`, you should see:

```bash
$ npx prisma db push

Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "postgres"...

🚀  Your database is now in sync with your Prisma schema.
```

## 🆘 Still Not Working?

1. **Check Supabase status**: https://status.supabase.com
2. **Check your project status**: Dashboard → Project → Should be green/active
3. **Try password reset**: Settings → Database → Reset password
4. **Try different network**: Disable VPN, try mobile hotspot
5. **Contact support**: If all else fails, Supabase has excellent support

## 📝 Final .env Template

After you get your credentials, your `.env` should look like this:

```env
# ============================================
# Supabase Database Connection
# ============================================

# Direct connection for Prisma migrations
# Copy from: Settings → Database → Session mode + URI
DIRECT_URL="postgresql://[COPY FROM SUPABASE]"

# Pooled connection for application
# Copy from: Settings → Database → Transaction mode + URI  
DATABASE_URL="postgresql://[COPY FROM SUPABASE]"

# ============================================
# Other Environment Variables
# ============================================

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-in-production"

# ... rest of your .env
```

---

**After you get the correct connection strings from Supabase dashboard, paste them into `.env` and run `npx prisma db push`**
