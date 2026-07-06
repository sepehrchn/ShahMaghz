You are building **ShahMaghz**, a premium e-commerce website for a Persian nuts/dried-fruits/gift-box brand. A full project brief is attached as `README.md` in this repo/context — read it fully before writing any code and treat it as the source of truth for scope, stack, data models, and phasing.

## 🎉 Current Project Status

**Phase 1: COMPLETE ✅**
- ✅ Database: Neon PostgreSQL with 13 tables created and migrated
- ✅ Images: 16 product images uploaded to Cloudinary CDN with automatic optimization
- ✅ Project Structure: Next.js 14 App Router, TypeScript, Tailwind CSS configured
- ✅ Design System: Brand colors, typography, and base UI components implemented
- ✅ Homepage: Complete with hero, category showcase, bestsellers, brand story
- ✅ Product Pages: Structure and mock data with real Cloudinary URLs
- ✅ Documentation: Comprehensive setup and development guides in `docs/`

**Phase 2: READY TO START 🚀**
- Database is seeded with schema, needs product data
- Shopping cart functionality needs implementation
- Checkout flow needs to be built
- Authentication with NextAuth.js pending
- ZarinPal payment integration pending

**Infrastructure:**
- **Database**: Neon PostgreSQL (US East) - `neondb`
- **Images**: Cloudinary CDN - `pjx9e2r5` (16 optimized images)
- **Environment**: `.env` and `.env.local` configured with credentials
- **API**: Image upload endpoint created at `/api/admin/upload-image`

**Documentation Available:**
- `docs/PROJECT_STATUS.md` - Complete project overview
- `docs/NEXT_STEPS.md` - Immediate development tasks
- `docs/SETUP_COMPLETE.md` - Infrastructure setup details
- `docs/NEON_SETUP_COMPLETE.md` - Database documentation
- `docs/CLOUDINARY_UPLOAD_COMPLETE.md` - Image CDN details

## Critical, non-negotiable requirement: Persian-first, RTL-first
- **Every single piece of user-facing text must be in Persian (Farsi)** — navigation, buttons, forms, error messages, empty states, admin panel labels, email/SMS templates, meta titles/descriptions, everything. Do not leave any English placeholder text in the final UI.
- The entire site must be built **RTL-native**, not RTL-as-an-afterthought: use `dir="rtl"` at the document level, logical Tailwind/CSS properties (`ms-`, `me-`, `ps-`, `pe-` instead of `ml-`/`mr-`/`pl-`/`pr-`), and verify icons/arrows/carousels visually flip direction correctly.
- Use Persian numerals for prices/weights where it fits the brand voice, but keep number formatting centralized in one utility so it's easy to toggle (✅ implemented in `lib/format.ts`).
- Load a proper Persian web font (e.g., Vazirmatn for body text, Dana or Yekan Bakh for display/headings) with correct `font-display` and subsetting for performance (✅ Vazirmatn configured).
- Write real, specific Persian marketing/product copy yourself (origin of the nuts, tasting notes, roast/harvest details, storage tips) — never leave Lorem Ipsum or generic "بهترین کیفیت با بهترین قیمت" filler in committed code (✅ implemented in `lib/mock-data.ts`).

## Critical, non-negotiable requirement: it must NOT look/feel "AI-generated"
Judge every screen against this checklist before considering it done:
- No default centered hero with a purple/blue gradient blob background (✅ implemented asymmetric editorial layout).
- No generic "3 icons in a row" feature section with rounded cards and flat icon-library icons only (✅ brand story uses editorial layout).
- Include at least a few deliberately asymmetric or editorial-style sections (not everything is a symmetric grid) (✅ homepage sections vary in layout).
- Include tasteful, brand-specific micro-interactions: hover states on product cards that reveal secondary info, a subtle add-to-cart animation, smooth scroll-triggered reveals — but tasteful and fast, never gimmicky or slow (✅ scroll reveals implemented).
- Include a few hand-crafted brand motifs (a wax-seal/stamp badge for premium products, a subtle kraft-paper or linen texture on section backgrounds, a hand-drawn-style divider used sparingly) instead of flat solid-color blocks everywhere (✅ wax seals, kraft textures, hand-drawn dividers implemented).
- Dark, luxurious palette: deep forest green / near-black backgrounds (`#0F1D14`–`#1C2B1E`) with gold/bronze accents (`#C9A24B`–`#E7C873`) and warm ivory text (`#F5EFE0`). Use gold sparingly as an accent, not everywhere (✅ brand colors configured in Tailwind).
- Real product photography treatment (warm lighting, soft shadows) is assumed (✅ 16 product images optimized and uploaded to Cloudinary CDN).

## What to build next (Phase 2 priorities)

### Immediate Tasks:
1. **Database Seeding** - Populate database with:
   - 4 categories (آجیل، خشکبار، شکلاتی و شیرینی، جعبه‌های هدیه)
   - 8 products with variants from `lib/mock-data.ts`
   - Use real Cloudinary URLs for product images

2. **Product Listing Pages** - Build category pages:
   - Fetch products from Prisma instead of mock data
   - Filter by price, stock status, premium tags
   - Sort by name, price, rating
   - Pagination for large catalogs

3. **Shopping Cart Functionality**:
   - Connect cart store to real product variants
   - Persist cart to localStorage
   - Add quantity management
   - Calculate totals with proper formatting

4. **Checkout Flow**:
   - Guest checkout with mobile number
   - Shipping address form
   - Order summary with variant details
   - Create order in database
   - Order confirmation page

5. **Authentication (NextAuth.js)**:
   - Mobile OTP login setup
   - User registration flow
   - Profile management
   - Order history view

6. **Payment Integration (ZarinPal)**:
   - Request payment endpoint
   - Verify payment callback
   - Update order status
   - Handle payment failures

## Stack (Current Setup)

**Frontend:**
- ✅ Next.js 14 (App Router)
- ✅ TypeScript
- ✅ Tailwind CSS with brand colors

**Database:**
- ✅ Neon PostgreSQL (Serverless, US East)
- ✅ Prisma ORM (13 tables created)
- ✅ Connection pooling configured

**Images & CDN:**
- ✅ Cloudinary (16 product images)
- ✅ Automatic WebP/AVIF conversion
- ✅ 1200×1500px optimized (45% smaller)

**Authentication:** (Phase 2)
- ⏳ NextAuth.js
- ⏳ Mobile OTP primary login
- ⏳ SMS provider (Kavenegar)

**Payment:** (Phase 2)
- ⏳ ZarinPal (IRR)
- ⏳ Payment verification flow

**State Management:**
- ✅ Zustand (cart store implemented)
- ✅ localStorage persistence

**Caching:** (Optional)
- ⏳ Redis for sessions

## Data Models (Implemented)

All 13 tables created in Neon PostgreSQL:

**Core:**
- `users` - Customer & admin accounts
- `addresses` - Shipping addresses
- `otp_codes` - Phone verification

**Catalog:**
- `categories` - Hierarchical product categories
- `products` - Main product data
- `product_variants` - SKUs, pricing, weights, inventory
- `reviews` - Product ratings & reviews

**E-commerce:**
- `orders` - Customer orders
- `order_items` - Order line items
- `discount_codes` - Promotional codes

**Loyalty:**
- `loyalty_accounts` - Customer points & tiers
- `loyalty_transactions` - Points history

**Content:**
- `blog_posts` - Magazine articles

See `prisma/schema.prisma` for full schema.

## Development Commands

```bash
# Start development
npm run dev

# View database
npx prisma studio

# Database operations
npx prisma generate      # Generate Prisma Client
npx prisma db push       # Push schema changes
npx prisma db pull       # Pull schema from database

# Image operations
node scripts/upload-images-to-cloudinary.js  # Upload images
node scripts/optimize-images.js               # Optimize local images

# Code quality
npm run lint             # ESLint
npm run type-check       # TypeScript check
```

## File Structure Reference

```
ShahMaghz/
├── app/                     # Next.js App Router pages
│   ├── api/admin/upload-image/  # ✅ Image upload endpoint
│   └── ...                  # Page components
├── components/
│   ├── ui/                  # ✅ Base UI components
│   ├── layout/              # ✅ Header, Footer, Cart
│   ├── home/                # ✅ Homepage sections
│   └── product/             # ✅ Product components
├── lib/
│   ├── prisma.ts            # ✅ Database client
│   ├── cloudinary.ts        # ✅ Image client
│   ├── format.ts            # ✅ Persian formatting
│   ├── cart-store.ts        # ✅ Shopping cart state
│   └── mock-data.ts         # ✅ Sample data (Cloudinary URLs)
├── prisma/
│   └── schema.prisma        # ✅ 13 tables defined
├── scripts/
│   ├── upload-images-to-cloudinary.js  # ✅ Batch upload
│   └── optimize-images.js              # ✅ Image optimization
├── docs/                    # ✅ Complete documentation
└── public/images/products/  # Local backup images
```

## Process expectations
- Database is ready - start using Prisma queries instead of mock data
- Images are on CDN - use Cloudinary URLs from database/seed
- Build incrementally per phase 2 order (see `docs/NEXT_STEPS.md`)
- If any requirement is ambiguous, **make a reasonable, clearly-documented assumption** and note it in `ASSUMPTIONS.md`
- After each feature, test it works with real data from database
- Keep code production-quality: typed, componentized, no dead placeholder pages
- Before marking any UI screen "done," re-check it against both checklists above (Persian/RTL correctness, and the "not AI-generated" checklist)

## Next Immediate Action

**Recommended first step:** Create database seed script
```bash
# Create prisma/seed.ts with:
# - 4 categories
# - 8 products with variants
# - Sample data using Cloudinary URLs
```

See `docs/NEXT_STEPS.md` for detailed task breakdown and `docs/PROJECT_STATUS.md` for complete project overview.
