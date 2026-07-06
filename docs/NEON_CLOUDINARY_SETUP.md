# Neon + Cloudinary Setup Guide

Complete setup guide for switching ShahMaghz to Neon (database) and Cloudinary (images).

## Why This Stack?

✅ **No credit card required** for free tiers  
✅ **No geo-blocking** (works from Iran with/without VPN)  
✅ **Generous free tiers** - perfect for development and small stores  
✅ **Serverless-friendly** - optimized for Vercel/Next.js deployment  

---

## Part 1: Neon Database Setup

### Step 1: Create Neon Account

1. Go to **https://neon.tech**
2. Click **"Sign up"**
3. Use GitHub, Google, or Email (no credit card needed!)

### Step 2: Create Your Database Project

1. After login, click **"Create a project"**
2. Fill in details:
   - **Name**: `shahmaghz`
   - **Region**: **Europe (Frankfurt)** - `aws-eu-central-1`
   - **Postgres version**: Latest (default)
3. Click **"Create project"**
4. Wait ~30 seconds for provisioning

### Step 3: Get Connection Strings

After creation, you'll see your dashboard. Look for **"Connection Details"** or **"Connection string"** section.

You'll see a dropdown with options:
- **Pooled connection** (default) - has `-pooler` in hostname
- **Direct connection** - no `-pooler` suffix

#### Copy BOTH strings:

**Pooled Connection** (for DATABASE_URL):
```
postgresql://username:password@ep-xxxxx-pooler.eu-central-1.aws.neon.tech/shahmaghz?sslmode=require
```

**Direct Connection** (for DIRECT_URL):
```
postgresql://username:password@ep-xxxxx.eu-central-1.aws.neon.tech/shahmaghz?sslmode=require
```

### Step 4: Update Environment Files

Open `.env.local` and replace:

```env
# Pooled connection (for app queries)
DATABASE_URL="postgresql://[YOUR-USERNAME]:[YOUR-PASSWORD]@ep-xxxxx-pooler.eu-central-1.aws.neon.tech/shahmaghz?sslmode=require"

# Direct connection (for Prisma migrations)
DIRECT_URL="postgresql://[YOUR-USERNAME]:[YOUR-PASSWORD]@ep-xxxxx.eu-central-1.aws.neon.tech/shahmaghz?sslmode=require"
```

### Step 5: Test Connection

```bash
# Validate Prisma schema
npx prisma validate

# Push schema to Neon (creates tables)
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

You should see:
```
✅ Your database is now in sync with your Prisma schema.
```

### Step 6: Verify in Neon Dashboard

1. Go back to Neon dashboard
2. Click **"Tables"** in sidebar
3. You should see all your tables: `users`, `products`, `orders`, etc.

---

## Part 2: Cloudinary Image Storage

### Step 1: Create Cloudinary Account

1. Go to **https://cloudinary.com**
2. Click **"Sign up for free"**
3. Use Email or GitHub (no credit card needed!)
4. Verify your email

### Step 2: Get Your Credentials

After login, you'll see your **Dashboard** with:

```
Account Details
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Cloud name:    your-cloud-name
API Key:       123456789012345
API Secret:    xxxxxxxxxxxxxxxxx
```

### Step 3: Create Upload Preset (Optional but Recommended)

1. Go to **Settings** (⚙️ icon top right)
2. Click **"Upload"** tab
3. Scroll to **"Upload presets"** section
4. Click **"Add upload preset"**
5. Configure:
   - **Upload preset name**: `shahmaghz_products`
   - **Signing Mode**: Select **"Unsigned"**
   - **Folder**: `product-images` (optional, keeps things organized)
   - **Access Mode**: `public`
6. Click **"Save"**

### Step 4: Update Environment Files

Open `.env.local` and add:

```env
# Cloudinary credentials
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="123456789012345"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Step 5: Install Cloudinary SDK

```bash
npm install cloudinary
```

---

## Part 3: Code Integration

### Create Cloudinary Client

```bash
# This file will be created in the next step
# lib/cloudinary.ts
```

I'll create this file for you once you confirm your Cloudinary credentials are set.

### Update Next.js Config

Your `next.config.mjs` needs to allow Cloudinary images:

```js
// next.config.mjs
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      pathname: `/${process.env.CLOUDINARY_CLOUD_NAME}/**`,
    },
  ],
}
```

### Create Image Upload API Route

```bash
# app/api/admin/upload-image/route.ts
# Will be created after credentials are configured
```

---

## Part 4: Testing

### Test Database Connection

```bash
# Open Prisma Studio to view/edit data
npx prisma studio
```

Opens at `http://localhost:5555` - you can browse all your tables!

### Test Image Upload (after integration)

```bash
# Start dev server
npm run dev
```

---

## Free Tier Limits

### Neon Free Tier
- ✅ **3 GB storage**
- ✅ **Unlimited compute hours** (with auto-suspend after 5 min idle)
- ✅ **1 project** (multiple databases per project)
- ✅ **Automatic backups** (7 days)
- ⚠️ **Auto-suspend**: Database sleeps after 5 min idle, ~1s cold start

### Cloudinary Free Tier
- ✅ **25 GB storage**
- ✅ **25 GB bandwidth/month**
- ✅ **Unlimited transformations**
- ✅ **Image optimization** (WebP, AVIF)
- ✅ **CDN delivery**

Both are **more than enough** for Phase 1-3 of your project!

---

## Troubleshooting

### Neon Connection Issues

**Error: "Can't reach database server"**
- Check connection string is correct (copy fresh from dashboard)
- Verify `?sslmode=require` is at the end
- Check if you need VPN (rare, but possible)

**Error: "password authentication failed"**
- Reset password in Neon dashboard: Project Settings → Reset Password
- Update `.env.local` with new connection string

### Cloudinary Upload Issues

**Error: "Invalid cloud_name"**
- Double-check `CLOUDINARY_CLOUD_NAME` in `.env.local`
- Should NOT include `https://` or any URL parts, just the name

**Error: "Signature verification failed"**
- Check `CLOUDINARY_API_SECRET` is correct
- Make sure there are no spaces or quotes in the value

---

## Next Steps

✅ **Task #1**: Create Neon account → Copy connection strings → Paste here  
✅ **Task #2**: Create Cloudinary account → Copy credentials → Paste here  
✅ **Task #3**: I'll update your files and create the integration code  
✅ **Task #4**: Run `npx prisma db push` to create tables  
✅ **Task #5**: Test with `npm run dev`  

---

## Ready to Proceed?

**Paste your credentials here when ready:**

```
# Neon (from dashboard → Connection Details)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Cloudinary (from dashboard → Account Details)
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

I'll update all files and create the integration code for you! 🚀
