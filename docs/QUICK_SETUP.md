# 🚀 Quick Setup Checklist

## 1. Create Neon Account (2 minutes)
- [ ] Go to https://neon.tech
- [ ] Sign up (GitHub/Google/Email)
- [ ] Create project: `shahmaghz`
- [ ] Region: **Europe (Frankfurt)**
- [ ] Copy **Pooled connection** string
- [ ] Copy **Direct connection** string

## 2. Create Cloudinary Account (2 minutes)
- [ ] Go to https://cloudinary.com
- [ ] Sign up (Email/GitHub)
- [ ] Copy **Cloud name**
- [ ] Copy **API Key**
- [ ] Copy **API Secret**

## 3. Update .env.local (1 minute)
```bash
DATABASE_URL="postgresql://user:pass@ep-xxx-pooler.eu-central-1.aws.neon.tech/shahmaghz?sslmode=require"
DIRECT_URL="postgresql://user:pass@ep-xxx.eu-central-1.aws.neon.tech/shahmaghz?sslmode=require"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="123456789"
CLOUDINARY_API_SECRET="secret"
```

## 4. Install and Test (2 minutes)
```bash
npm install cloudinary
npx prisma db push
npx prisma generate
npm run dev
```

## 5. Verify
- [ ] Check tables in Neon dashboard
- [ ] Check http://localhost:3000 loads
- [ ] Ready to build! 🎉

---

**Total time: ~7 minutes**

Need help? Check `docs/NEON_CLOUDINARY_SETUP.md` for detailed guide.
