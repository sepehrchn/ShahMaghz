# ShahMaghz — Project Brief

> **Language notice:** This document is written in English so any AI coding tool can parse it reliably. **The actual website product (all UI text, content, product data, emails, admin labels visible to store owners, etc.) must be entirely in Persian (Farsi), with full RTL layout.** English is used here only for engineering instructions.

## 1. Overview
**ShahMaghz** is a premium online store selling nuts, dried fruits, dried candied/chocolate treats, and luxury gift boxes, targeting Persian-speaking customers (primarily Iran).

Goal: build a **custom full-stack website** (not on the Shopify platform — a bespoke Next.js app) that:
- Has a premium, dark, luxurious brand feel — not a generic template look.
- Delivers UX/UI quality comparable to or better than the inspiration stores below.
- Is 100% Persian-language, RTL-first (not a translated afterthought).
- Does not "feel AI-generated" — see Section 3 for what that means concretely.

## 2. Inspiration References
| Site | What to borrow (structure/logic, NOT visuals) |
|---|---|
| go4nuts.com | Category structure, variable weight/packaging product options |
| morishnuts.com.au | Warm, personal brand storytelling, product presentation |
| itsdelish.com | Broad catalog (spices, nuts, chocolate), bulk/bundle selling logic |

**Important:** Do not copy the visual design of these sites. Only reuse their information architecture and commerce logic (weight-based pricing, bundles, gift packs). The visual identity of ShahMaghz must be original (see brand identity below).

## 3. Brand & Visual Identity
- **Mood:** Luxurious and dark — think premium saffron or caviar packaging: dark green/black backgrounds with gold accents.
- **Suggested palette:**
  - Deep forest/olive green: `#0F1D14` to `#1C2B1E`
  - Gold/bronze accent: `#C9A24B` to `#E7C873`
  - Warm ivory/cream text on dark backgrounds: `#F5EFE0`
  - Optional deep burgundy accent: `#6E1423`
- **Persian typography:** Body text in a modern Persian typeface such as **Vazirmatn**; display/headline typeface such as **Dana** or **Yekan Bakh** for a more luxury feel. Use Persian (Eastern Arabic) numerals for prices and weights where appropriate for the brand voice, but keep this configurable.
- **"Not AI-generated" checklist** — the build must actively avoid the generic AI/template look. Concretely this means:
  - Real, warm-lit product photography treatment (not flat stock icons); custom illustrated textures (kraft paper, linen, subtle grain) instead of flat gradients.
  - Hand-crafted details: wax-seal-style badges, a signature/stamp motif, a slightly imperfect or hand-drawn underline/divider element used sparingly.
  - Deliberate asymmetry in select sections instead of a perfectly uniform 3-column/centered grid everywhere.
  - Purposeful micro-interactions (hover reveals on product cards, a subtle "unwrapping" animation on add-to-cart, smooth page transitions) — not default browser states.
  - Real, specific Persian copywriting per product (origin, harvest notes, tasting notes) instead of generic filler text like "بهترین کیفیت با قیمت مناسب."
  - Avoid: purple/blue gradient hero sections, generic rounded-card SaaS look, stock "3 feature icons in a row" sections, Lorem-ipsum-like generic Persian text.

## 4. Tech Stack
- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes / Server Actions (co-located; can be split into a separate service later if scale requires)
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js — primary login via mobile number + OTP (more common than email in Iran), optional email/password as fallback
- **Payments:** **ZarinPal** gateway (IRR) as the primary integration; architecture should keep payment provider swappable (e.g., to add IDPay later)
- **Media storage:** S3-compatible object storage (e.g., Liara Object Storage, ArvanCloud)
- **Hosting:** Liara or ArvanCloud recommended for in-Iran latency/accessibility
- **Cache/cart/session:** Redis for guest cart and caching
- **Transactional SMS:** Iranian SMS provider (e.g., Kavenegar, MeliPayamak) for OTP and order notifications

## 5. Sitemap
1. Homepage (hero, categories, bestsellers, brand story, testimonials)
2. Category / product listing pages (filters: type, weight, price, freshness)
3. Product detail page (weight/package variant selector, nutrition facts, ingredients, reviews)
4. Cart + multi-step checkout
5. Customer account (OTP login/signup, order history, addresses, my discount codes)
6. Loyalty club (points, tiers, exclusive discount codes)
7. Blog/magazine (nutrition articles, recipes, dried-fruit storage guides)
8. About us / brand story
9. Contact / FAQ
10. Admin panel (products, inventory, orders, customers, discount codes, blog posts)

## 6. Core Data Models (summary)
- `Product` (name, description, category, images, tags, stock status)
- `ProductVariant` (weight/package size, price, stock per variant)
- `Category`
- `Order` / `OrderItem`
- `User` (customer), `Address`
- `DiscountCode`
- `LoyaltyAccount` / `LoyaltyTransaction`
- `BlogPost`
- `Review`

## 7. Non-Functional Requirements
- **SEO:** Server-side rendering, Persian metadata, Schema.org product markup
- **Performance:** Green Core Web Vitals, optimized images (`next/image`), lazy loading
- **Accessibility:** Sufficient contrast on dark backgrounds, keyboard navigation, proper RTL semantics (`dir="rtl"`, logical CSS properties)
- **Security:** Input validation, OTP rate limiting, HTTPS, admin role separation
- **Mobile-first:** Majority of Iranian shoppers are on mobile

## 8. Suggested Phasing
1. **Phase 1 — Foundation:** Project scaffold, database schema, design system, homepage, product detail page
2. **Phase 2 — Commerce:** Cart, checkout, ZarinPal integration, OTP-based customer accounts
3. **Phase 3 — Content & Loyalty:** Blog, loyalty club, discount codes
4. **Phase 4 — Admin Panel:** Full product/order/customer management
5. **Phase 5 — Payment hardening & optimization:** End-to-end payment flow testing, SEO, performance tuning

---
This README should be provided alongside `PROMPT.md` to the coding tool (Claude Code / Cursor).
