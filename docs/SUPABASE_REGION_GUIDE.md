# Supabase Region Guide

## Current Situation

- **Your Database Region**: `ap-northeast-1` (Tokyo, Japan)
- **Your Location**: USA
- **Problem**: High latency (~150-250ms per query)

## ⚠️ Important: Region Cannot Be Changed

Once a Supabase project is created, **you cannot change its region**. The only option is to:
1. Create a new project in a different region
2. Migrate your data (if you have any)

## 🌍 Recommended Regions

Since you're in the USA and your target market is Iran:

### Option 1: Keep Tokyo (Current)
**Pros:**
- Closer to Iran (your target market)
- ~100-150ms latency from Iran
- Good for Iranian customers

**Cons:**
- High latency from USA during development (~150-250ms)
- Slower development experience

**When to choose**: If you're deploying soon and Iranian customers are priority

### Option 2: Move to US East
**Pros:**
- Fast development from USA (~20-50ms)
- Good for testing and building
- Can migrate to closer region before launch

**Cons:**
- ~250-350ms latency from Iran
- Not ideal for production with Iranian users

**When to choose**: If you're still in development phase (Phase 1-2)

### Option 3: Move to EU Central
**Pros:**
- Balanced latency for both USA and Iran
- ~100-150ms from USA
- ~100-150ms from Iran
- Best compromise for development + target market

**Cons:**
- Not the fastest for either location

**When to choose**: Best overall compromise ✅ **RECOMMENDED**

## 📊 Latency Comparison

| Region | From USA | From Iran | Supabase Location |
|--------|----------|-----------|-------------------|
| `ap-northeast-1` (Tokyo) | ~180ms | ~120ms | Asia Pacific (Tokyo) |
| `us-east-1` (Virginia) | ~30ms | ~280ms | US East (N. Virginia) |
| `eu-central-1` (Frankfurt) | ~110ms | ~100ms | EU (Frankfurt) ✅ |
| `ap-south-1` (Mumbai) | ~220ms | ~80ms | Asia Pacific (Mumbai) |

## 🎯 Recommendation for ShahMaghz

Since you're in **Phase 1** (development) and your target market is **Iran**:

### Best Choice: **EU Central (Frankfurt)** 🇩🇪

**Why:**
1. Good latency from USA for development (~100-120ms)
2. Good latency from Iran for production (~90-110ms)
3. Geographically central between your dev location and target market
4. European data center = good infrastructure

### Alternative: Keep Tokyo if...
- You're about to launch (in production soon)
- Iranian customers are your only concern
- You can tolerate slower development queries

## 🔄 How to Migrate to New Region

If you want to switch regions, here's the process:

### Step 1: Create New Project
1. Go to Supabase Dashboard: https://app.supabase.com
2. Click **"New Project"**
3. Choose region: **Europe (Frankfurt) - eu-central-1**
4. Set strong password
5. Wait for project to be created

### Step 2: Update Connection Strings
1. Get new connection strings from new project
2. Update `.env` and `.env.local` with new credentials
3. Update `DIRECT_URL` and `DATABASE_URL`

### Step 3: Run Prisma Migration
Since you have no data yet, just run:
```bash
npx prisma db push
npx prisma generate
```

### Step 4: Delete Old Project (Optional)
1. Go to old project settings
2. Click "Delete Project"
3. Confirm deletion

## 💡 Current Recommendation

**For ShahMaghz project, I recommend:**

1. **If you're just starting** (no important data yet):
   - ✅ Create new project in **EU Central (Frankfurt)**
   - ✅ Better balance for dev + production
   - ✅ Takes 5 minutes

2. **If you want to continue with Tokyo**:
   - ⚠️ Expect slower queries during development from USA
   - ✅ Better for Iranian customers
   - ✅ Keep current setup, just run `npx prisma db push`

## 🚀 My Suggestion

Since you're still in **Phase 1** and have **no data** in the database yet:

**Create a new project in EU Central (Frankfurt)** - It's the sweet spot! 🎯

Want me to help you:
1. Create new project in EU Central?
2. Or continue with Tokyo?

Let me know your choice and I'll help you proceed! 👇
