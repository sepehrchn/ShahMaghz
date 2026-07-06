You are building **ShahMaghz**, a premium e-commerce website for a Persian nuts/dried-fruits/gift-box brand. A full project brief is attached as `README.md` in this repo/context — read it fully before writing any code and treat it as the source of truth for scope, stack, data models, and phasing.

## Critical, non-negotiable requirement: Persian-first, RTL-first
- **Every single piece of user-facing text must be in Persian (Farsi)** — navigation, buttons, forms, error messages, empty states, admin panel labels, email/SMS templates, meta titles/descriptions, everything. Do not leave any English placeholder text in the final UI.
- The entire site must be built **RTL-native**, not RTL-as-an-afterthought: use `dir="rtl"` at the document level, logical Tailwind/CSS properties (`ms-`, `me-`, `ps-`, `pe-` instead of `ml-`/`mr-`/`pl-`/`pr-`), and verify icons/arrows/carousels visually flip direction correctly.
- Use Persian numerals for prices/weights where it fits the brand voice, but keep number formatting centralized in one utility so it's easy to toggle.
- Load a proper Persian web font (e.g., Vazirmatn for body text, Dana or Yekan Bakh for display/headings) with correct `font-display` and subsetting for performance.
- Write real, specific Persian marketing/product copy yourself (origin of the nuts, tasting notes, roast/harvest details, storage tips) — never leave Lorem Ipsum or generic "بهترین کیفیت با بهترین قیمت" filler in committed code.

## Critical, non-negotiable requirement: it must NOT look/feel "AI-generated"
Judge every screen against this checklist before considering it done:
- No default centered hero with a purple/blue gradient blob background.
- No generic "3 icons in a row" feature section with rounded cards and flat icon-library icons only.
- Include at least a few deliberately asymmetric or editorial-style sections (not everything is a symmetric grid).
- Include tasteful, brand-specific micro-interactions: hover states on product cards that reveal secondary info, a subtle add-to-cart animation, smooth scroll-triggered reveals — but tasteful and fast, never gimmicky or slow.
- Include a few hand-crafted brand motifs (a wax-seal/stamp badge for premium products, a subtle kraft-paper or linen texture on section backgrounds, a hand-drawn-style divider used sparingly) instead of flat solid-color blocks everywhere.
- Dark, luxurious palette: deep forest green / near-black backgrounds (`#0F1D14`–`#1C2B1E`) with gold/bronze accents (`#C9A24B`–`#E7C873`) and warm ivory text (`#F5EFE0`). Use gold sparingly as an accent, not everywhere.
- Real product photography treatment (warm lighting, soft shadows) is assumed — if you must use placeholders during development, mark them clearly as `TODO: replace placeholder image` rather than shipping generic stock-icon look.

## What to build
Follow the phasing in `README.md` (Foundation → Commerce → Content & Loyalty → Admin Panel → Payment hardening). Within that:

1. **Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS, PostgreSQL + Prisma, NextAuth.js (mobile + OTP as primary login method), Redis for cart/session, ZarinPal for payments (IRR), S3-compatible storage for media.
2. **Design system first:** Before building pages, set up a `design-system` reference (Tailwind config with the brand color tokens, typography scale, spacing scale, and a small set of reusable primitives: Button, Card, Badge, Input, Modal) so the rest of the app stays visually consistent.
3. **Pages/flows:** homepage, category/listing pages with filters, product detail page with weight/package variant selection, cart, multi-step checkout integrated with ZarinPal, customer account area (OTP login, order history, addresses), loyalty club (points/tiers/discount codes), blog/magazine, about/contact/FAQ, and a full admin panel (products, variants, inventory, orders, customers, discount codes, blog posts).
4. **Data models:** implement the Prisma schema based on Section 6 of `README.md` (Product, ProductVariant, Category, Order/OrderItem, User, Address, DiscountCode, LoyaltyAccount/LoyaltyTransaction, BlogPost, Review), refining fields as needed for a real e-commerce flow (SKUs, stock thresholds, order status enum, payment status/transaction id from ZarinPal, etc.).
5. **Non-functional bar:** server-rendered pages for SEO with Persian metadata and Product schema.org markup, optimized images via `next/image`, mobile-first responsive layouts (most traffic will be mobile), input validation and OTP rate-limiting, and clear separation of admin-only routes/permissions.

## Process expectations
- If any requirement in `README.md` or this prompt is ambiguous or you need a product/business decision (e.g., exact shipping rules, tax handling, specific loyalty tier thresholds), **make a reasonable, clearly-documented assumption and note it** rather than blocking — but flag assumptions in a running `ASSUMPTIONS.md` file so they can be reviewed later.
- Build incrementally per the phase order; after each phase, summarize what was built and what's left.
- Keep code production-quality: typed, componentized, no dead placeholder pages, no leftover console.logs, sensible folder structure (`app/`, `components/`, `lib/`, `prisma/`, etc.).
- Before marking any UI screen "done," re-check it against both checklists above (Persian/RTL correctness, and the "not AI-generated" checklist).
