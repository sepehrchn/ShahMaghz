/**
 * Mock data for Phase 1 development.
 * In production these will be replaced by Prisma queries.
 */

import { formatWeight } from "./format";

export interface MockVariant {
  id: string;
  weightGrams: number;
  packageLabel: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
}

export interface MockProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  images: string[];
  tags: string[];
  stockStatus: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  isFeatured: boolean;
  isPremium: boolean;
  sku: string;
  origin: string;
  ingredients: string[];
  storageTips: string;
  nutritionInfo: {
    calories: string;
    fat: string;
    protein: string;
    carbs: string;
    fiber: string;
  };
  rating: number;
  reviewCount: number;
  variants: MockVariant[];
}

export interface MockCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  productCount: number;
}

export const categories: MockCategory[] = [
  {
    id: "cat-nuts",
    slug: "nuts",
    name: "آجیل",
    description: "منتخب‌ترین آجیل‌های ایرانی و وارداتی، برشته‌شده با هنر و تجربه",
    productCount: 12,
  },
  {
    id: "cat-dried-fruits",
    slug: "dried-fruits",
    name: "خشکبار",
    description: "میوه‌های خشک طبیعی بدون افزودنی، شیرینِ طبیعت",
    productCount: 9,
  },
  {
    id: "cat-chocolate",
    slug: "chocolate-dipped",
    name: "شکلاتی و شیرینی",
    description: "آجیل و خشکبار پوشیده در شکلات بلژیکی و ایرانی",
    productCount: 7,
  },
  {
    id: "cat-gift-boxes",
    slug: "gift-boxes",
    name: "جعبه‌های هدیه",
    description: "هدیه‌ای لوکس برای عزیزانتان، در بسته‌بندی نفیس",
    productCount: 6,
  },
];

export const products: MockProduct[] = [
  {
    id: "prod-pistachio-akbari",
    slug: "pistachio-akbari",
    name: "پسته اکبری ممتاز",
    description:
      "پسته اکبری درجه یک از باغ‌های دامنه شرقی رفسنجان، برشته‌شده با نمک دریا",
    longDescription:
      "پسته اکبری، ملکه پسته‌های ایرانی، از باغ‌های دیرینه دامنه‌های شرقی رفسنجان برداشت می‌شود. هر دانه با دست چیده می‌شود تا تنها درشت‌ترین و کامل‌ترین پسته‌ها انتخاب شوند. برشته‌سازی به روش سنتی با نمک دریا و حرارت ملایم، عطر و طعم بی‌نظیر این پسته را دوچندان می‌کند. رنگ سبز روشن مغز و پوسته کامل، نشانه اصالت و کیفیت است.",
    categoryId: "cat-nuts",
    categorySlug: "nuts",
    categoryName: "آجیل",
    images: [
      "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783346180/product-images/pistachio-akbari-1.jpg",
      "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783346182/product-images/pistachio-akbari-2.jpg",
    ],
    tags: ["برترین‌ها", "بنفش‌برشته", "رفسنجان"],
    stockStatus: "IN_STOCK",
    isFeatured: true,
    isPremium: true,
    sku: "PST-AKB-001",
    origin: "رفسنجان، کرمان",
    ingredients: ["پسته اکبری", "نمک دریا"],
    storageTips:
      "در ظرف دربسته خشک و خنک نگه‌داری کنید. برای حفظ تردی، تا یک ماه در یخچال قابل نگه‌داری است.",
    nutritionInfo: {
      calories: "۵۶۲ کیلوکالری در ۱۰۰ گرم",
      fat: "۴۵ گرم",
      protein: "۲۰ گرم",
      carbs: "۲۸ گرم",
      fiber: "۱۰ گرم",
    },
    rating: 4.8,
    reviewCount: 127,
    variants: [
      { id: "v1", weightGrams: 250, packageLabel: "۲۵۰ گرمی", price: 185000, stock: 50 },
      { id: "v2", weightGrams: 500, packageLabel: "۵۰۰ گرمی", price: 350000, compareAtPrice: 370000, stock: 30 },
      { id: "v3", weightGrams: 1000, packageLabel: "۱ کیلوگرمی", price: 680000, compareAtPrice: 720000, stock: 15 },
    ],
  },
  {
    id: "prod-almond-mamra",
    slug: "almond-mamra",
    name: "بادام درختی مامرا",
    description:
      "بادام مامریِ طبیعی از باغ‌های آذربایجان، ترد و خوش‌طعم با پوست قهوه‌ای",
    longDescription:
      "بادام مامرا از باغ‌های سرسبز آذربایجان، جایی که زمستان‌های سرد و تابستان‌های آفتابی، طعمی غنی و مغزیِ بی‌نظیر به بادام می‌بخشند. این بادام به صورت طبیعی و بدون افزودنی عرضه می‌شود. پوست نازک قهوه‌ای، مغز سفید و ترد، و عطر ملایمِ کره‌ای، آن را به انتخابی ایده‌آل برای میان‌وعده و پخت‌وپز تبدیل می‌کند.",
    categoryId: "cat-nuts",
    categorySlug: "nuts",
    categoryName: "آجیل",
    images: [
      "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783346163/product-images/almond-mamra-1.jpg",
      "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783346164/product-images/almond-mamra-2.jpg",
    ],
    tags: ["طبیعی", "آذربایجان", "بدون افزودنی"],
    stockStatus: "IN_STOCK",
    isFeatured: true,
    isPremium: false,
    sku: "ALM-MAM-001",
    origin: "آذربایجان",
    ingredients: ["بادام درختی مامرا"],
    storageTips:
      "در جای خشک و خنک نگه‌داری کنید. دور از نور مستقیم خورشید.",
    nutritionInfo: {
      calories: "۵۷۹ کیلوکالری در ۱۰۰ گرم",
      fat: "۴۹ گرم",
      protein: "۲۱ گرم",
      carbs: "۲۲ گرم",
      fiber: "۱۲ گرم",
    },
    rating: 4.6,
    reviewCount: 89,
    variants: [
      { id: "v1", weightGrams: 250, packageLabel: "۲۵۰ گرمی", price: 145000, stock: 60 },
      { id: "v2", weightGrams: 500, packageLabel: "۵۰۰ گرمی", price: 270000, stock: 40 },
      { id: "v3", weightGrams: 1000, packageLabel: "۱ کیلوگرمی", price: 520000, stock: 20 },
    ],
  },
  {
    id: "prod-walnut-kashan",
    slug: "walnut-kashan",
    name: "گردو ممتاز کاشان",
    description:
      "گردوی پوست‌کنکاوه‌نشین کاشان، مغز سفید و چرب، عطر گرم و اصیل",
    longDescription:
      "گردوی کاشان در باغ‌های دامنه‌ای کوه‌های مرکزی ایران رشد می‌کند. خاک آهکی و آب زلال این منطقه، گردویی با مغز سفید، چربی سالم و عطر گرم تولید می‌کند. هر گردو پس از برداشت شکسته، با دست جدا و بر اساس اندازه دست‌چینی می‌شود. این گردو برای مصرف مستقیم، شیرینی‌پزی و طبخ ایده‌آل است.",
    categoryId: "cat-nuts",
    categorySlug: "nuts",
    categoryName: "آجیل",
    images: [
      "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783346187/product-images/walnut-kashan-1.jpg",
      "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783346189/product-images/walnut-kashan-2.jpg",
    ],
    tags: ["کاشان", "مغز سفید"],
    stockStatus: "LOW_STOCK",
    isFeatured: true,
    isPremium: false,
    sku: "WAL-KSH-001",
    origin: "کاشان، اصفهان",
    ingredients: ["گردو"],
    storageTips:
      "در ظرف دربسته خشک نگه‌داری کنید. به دلیل چربی طبیعی، توصیه می‌شود در یخچال نگه‌داری شود.",
    nutritionInfo: {
      calories: "۶۵۴ کیلوکالری در ۱۰۰ گرم",
      fat: "۶۵ گرم",
      protein: "۱۵ گرم",
      carbs: "۱۴ گرم",
      fiber: "۷ گرم",
    },
    rating: 4.7,
    reviewCount: 64,
    variants: [
      { id: "v1", weightGrams: 250, packageLabel: "۲۵۰ گرمی", price: 195000, stock: 12 },
      { id: "v2", weightGrams: 500, packageLabel: "۵۰۰ گرمی", price: 370000, stock: 8 },
    ],
  },
  {
    id: "prod-saffron-threads",
    slug: "saffron-threads",
    name: "زعفران نگین ممتاز",
    description:
      "زعفران نگین از مزارع قائنات، رنگ‌دهی فوق‌العاده و عطر مسحورکننده",
    longDescription:
      "زعفران نگین، با ارزش‌ترین ادویه جهان، از مزارع دیرینه قائنات خراسان برداشت می‌شود. کلاله‌های تمام‌قرمز و بلند، بدون ریشه سفید، با دست چیده و در بسته‌بندی کریستالی عرضه می‌شود. رنگ‌دهی فوق‌العاده و عطر گرم و عسلی، آن را به انتخابی بی‌نظیر برای طبخ، دمنوش و هدیه تبدیل می‌کند. هر گرم زعفران از حدود ۱۷۰ گل دست‌چیده می‌شود.",
    categoryId: "cat-nuts",
    categorySlug: "nuts",
    categoryName: "آجیل",
    images: [
      "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783346183/product-images/saffron-1.jpg",
      "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783346186/product-images/saffron-2.jpg",
    ],
    tags: ["لوکس", "قائنات", "نگین"],
    stockStatus: "IN_STOCK",
    isFeatured: true,
    isPremium: true,
    sku: "SAF-NGN-001",
    origin: "قائنات، خراسان جنوبی",
    ingredients: ["زعفران نگین"],
    storageTips:
      "در ظرف شیشه‌ای دربسته، دور از نور و رطوبت نگه‌داری کنید. در جای خشک تا دو سال ماندگاری دارد.",
    nutritionInfo: {
      calories: "۳۱۰ کیلوکالری در ۱۰۰ گرم",
      fat: "۶ گرم",
      protein: "۱۱ گرم",
      carbs: "۶۵ گرم",
      fiber: "۴ گرم",
    },
    rating: 5.0,
    reviewCount: 42,
    variants: [
      { id: "v1", weightGrams: 1, packageLabel: "۱ گرمی", price: 95000, stock: 100 },
      { id: "v2", weightGrams: 2, packageLabel: "۲ گرمی", price: 180000, stock: 80 },
      { id: "v3", weightGrams: 5, packageLabel: "۵ گرمی", price: 430000, compareAtPrice: 460000, stock: 50 },
    ],
  },
  {
    id: "prod-dried-figs",
    slug: "dried-figs-estahban",
    name: "انجیر خشک استهبان",
    description:
      "انجیر خشک طبیعی استهبان، شیرینِ طبیعت، بدون قند افزوده",
    longDescription:
      "انجیر خشک استهبان از باغ‌های استان فارس، خاستگاه انجیر ایران، برداشت می‌شود. آفتاب‌خشک شده به روش سنتی، بدون افزودنی یا قند افزوده. هر انجیر نرم، شیرین و پرآب، با دانه‌های ریز و طعم کاراملی ملایم. منبع عالی فیبر، پتاسیم و آهن است. برای میان‌وعده، صبحانه و دمنوش ایده‌آل می‌باشد.",
    categoryId: "cat-dried-fruits",
    categorySlug: "dried-fruits",
    categoryName: "خشکبار",
    images: [
      "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783346173/product-images/dried-figs-1.jpg",
      "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783346175/product-images/dried-figs-2.jpg",
    ],
    tags: ["طبیعی", "استهبان", "بدون قند"],
    stockStatus: "IN_STOCK",
    isFeatured: true,
    isPremium: false,
    sku: "FIG-EST-001",
    origin: "استهبان، فارس",
    ingredients: ["انجیر خشک"],
    storageTips:
      "در جای خشک و خنک نگه‌داری کنید. در ظرف دربسته تا ۶ ماه ماندگاری دارد.",
    nutritionInfo: {
      calories: "۲۴۹ کیلوکالری در ۱۰۰ گرم",
      fat: "۱ گرم",
      protein: "۴ گرم",
      carbs: "۶۴ گرم",
      fiber: "۱۰ گرم",
    },
    rating: 4.5,
    reviewCount: 73,
    variants: [
      { id: "v1", weightGrams: 250, packageLabel: "۲۵۰ گرمی", price: 95000, stock: 70 },
      { id: "v2", weightGrams: 500, packageLabel: "۵۰۰ گرمی", price: 180000, stock: 45 },
      { id: "v3", weightGrams: 1000, packageLabel: "۱ کیلوگرمی", price: 340000, stock: 25 },
    ],
  },
  {
    id: "prod-dried-apricot",
    slug: "dried-apricot-tabriz",
    name: "زردآلو خشک تبریز",
    description:
      "زردآلو خشک تبریز، نرم و خوش‌عطر، رنگ طلایی طبیعی",
    longDescription:
      "زردآلو خشک از باغ‌های تبریز، منطقه‌ای با تابستان‌های آفتابی و شب‌های خنک. خشک‌شدن به روش سنتی در سایه، رنگ طلایی طبیعی و عطر میوه‌ای را حفظ می‌کند. هر زردآلو نرم، خوش‌طعم و سرشار از ویتامین A و پتاسیم. بدون گوگرد و افزودنی. برای میان‌وعده، دمنوش و پخت‌وپز مناسب است.",
    categoryId: "cat-dried-fruits",
    categorySlug: "dried-fruits",
    categoryName: "خشکبار",
    images: [
      "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783346170/product-images/dried-apricot-1.jpg",
      "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783346171/product-images/dried-apricot-2.jpg",
    ],
    tags: ["تبریز", "بدون گوگرد"],
    stockStatus: "IN_STOCK",
    isFeatured: false,
    isPremium: false,
    sku: "APR-TBZ-001",
    origin: "تبریز، آذربایجان شرقی",
    ingredients: ["زردآلو خشک"],
    storageTips:
      "در ظرف دربسته خشک نگه‌داری کنید. دور از رطوبت.",
    nutritionInfo: {
      calories: "۲۴۱ کیلوکالری در ۱۰۰ گرم",
      fat: "۱ گرم",
      protein: "۴ گرم",
      carbs: "۶۳ گرم",
      fiber: "۸ گرم",
    },
    rating: 4.4,
    reviewCount: 51,
    variants: [
      { id: "v1", weightGrams: 250, packageLabel: "۲۵۰ گرمی", price: 85000, stock: 55 },
      { id: "v2", weightGrams: 500, packageLabel: "۵۰۰ گرمی", price: 160000, stock: 35 },
    ],
  },
  {
    id: "prod-chocolate-almond",
    slug: "chocolate-dipped-almond",
    name: "بادام شکلاتی بلژیکی",
    description:
      "بادام مامرا پوشیده در شکلات تلخ بلژیکی ۷۰٪، تضادِ شیرین و تلخ",
    longDescription:
      "بادام مامرای طبیعی، پوشیده در لایه‌ای از شکلات تلخ بلژیکی ۷۰ درصد. تضادِ تردیِ بادام و نرمیِ شکلات، شیرینیِ متعادل و تلخیِ عمیق، تجربه‌ای منحصربه‌فرد می‌سازد. هر دانه با دست غوطه‌ور شده و روی سنگ مرمر خنک می‌شود. بدون مواد نگه‌دارنده و رنگ مصنوعی.",
    categoryId: "cat-chocolate",
    categorySlug: "chocolate-dipped",
    categoryName: "شکلاتی و شیرینی",
    images: [
      "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783346166/product-images/choc-almond-1.jpg",
      "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783346168/product-images/choc-almond-2.jpg",
    ],
    tags: ["شکلات تلخ", "بلژیکی", "هنری"],
    stockStatus: "IN_STOCK",
    isFeatured: true,
    isPremium: true,
    sku: "CHC-ALM-001",
    origin: "تهیه‌شده در ایران با شکلات بلژیکی",
    ingredients: ["بادام مامرا", "شکلات تلخ ۷۰٪", "کاکائو"],
    storageTips:
      "در جای خنک و خشک نگه‌داری کنید. دور از نور مستقیم و حرارت بالا.",
    nutritionInfo: {
      calories: "۵۹۸ کیلوکالری در ۱۰۰ گرم",
      fat: "۴۸ گرم",
      protein: "۱۲ گرم",
      carbs: "۳۵ گرم",
      fiber: "۹ گرم",
    },
    rating: 4.9,
    reviewCount: 96,
    variants: [
      { id: "v1", weightGrams: 200, packageLabel: "۲۰۰ گرمی", price: 165000, stock: 40 },
      { id: "v2", weightGrams: 400, packageLabel: "۴۰۰ گرمی", price: 310000, compareAtPrice: 330000, stock: 22 },
    ],
  },
  {
    id: "prod-gift-box-royal",
    slug: "gift-box-royal",
    name: "جعبه هدیه سلطنتی",
    description:
      "منتخب آجیل و خشکبار لوکس در جعبه چوبی نفیس با مهر مومی",
    longDescription:
      "جعبه هدیه سلطنتی، تجمیعی از بهترین‌های شاه‌مغز: پسته اکبری ممتاز، بادام مامرا، گردو کاشان، انجیر خشک استهبان و زردآلو تبریز، در جعبه چوبی نفیس با رویه مخمل و مهر مومی طلایی. هر جعبه با دست آماده و پلمپ می‌شود. هدیه‌ای بی‌نقص برای مناسبت‌های ویژه، شب یلدا و عید نوروز.",
    categoryId: "cat-gift-boxes",
    categorySlug: "gift-boxes",
    categoryName: "جعبه‌های هدیه",
    images: [
      "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783346177/product-images/gift-box-royal-1.jpg",
      "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783346178/product-images/gift-box-royal-2.jpg",
    ],
    tags: ["هدیه لوکس", "یلدا", "نوروز", "جعبه چوبی"],
    stockStatus: "IN_STOCK",
    isFeatured: true,
    isPremium: true,
    sku: "GFT-ROY-001",
    origin: "تجمیع‌شده در تهران",
    ingredients: [
      "پسته اکبری",
      "بادام مامرا",
      "گردو کاشان",
      "انجیر خشک",
      "زردآلو خشک",
    ],
    storageTips:
      "محتویات در ظرف دربسته خشک نگه‌داری شود. جعبه چوبی در جای خشک نگه‌داری شود.",
    nutritionInfo: {
      calories: "متغیر",
      fat: "متغیر",
      protein: "متغیر",
      carbs: "متغیر",
      fiber: "متغیر",
    },
    rating: 5.0,
    reviewCount: 38,
    variants: [
      { id: "v1", weightGrams: 800, packageLabel: "جعبه کوچک (۸۰۰ گرم)", price: 850000, compareAtPrice: 950000, stock: 18 },
      { id: "v2", weightGrams: 1500, packageLabel: "جعبه بزرگ (۱.۵ کیلوگرم)", price: 1550000, compareAtPrice: 1750000, stock: 10 },
    ],
  },
];

// ────────────────────────────────────────────────────────────
// Blog posts (full content, single source of truth)
// ────────────────────────────────────────────────────────────

export interface MockBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  isPublished: boolean;
  publishedAt: string;
}

export const blogPosts: MockBlogPost[] = [
  {
    id: "blog-pistachio-benefits",
    slug: "pistachio-benefits",
    title: "خواص بی‌نظیر پسته: از قلب تا پوست",
    excerpt:
      "پسته، ملکه آجیل‌های ایرانی، سرشار از آنتی‌اکسیدان و چربی‌های سالم است. در این مقاله به ۷ فایده علمی پسته می‌پردازیم.",
    content: `<p>پسته، یکی از مغذی‌ترین و خوش‌طعم‌ترین انواع آجیل، نه تنها یک خوراکی لذیذ است بلکه خواص بی‌نظیری برای سلامتی دارد. این دانه سبز کوچک که ریشه در خاورمیانه دارد، سرشار از ویتامین‌ها، مواد معدنی، آنتی‌اکسیدان‌ها و چربی‌های سالم است. در این مقاله به بررسی جامع خواص پسته، از تأثیر آن بر سلامت قلب و عروق تا نقش آن در زیبایی پوست و مو می‌پردازیم.</p>

<h2 class="text-2xl font-bold font-display mt-8 mb-4">۱. سلامت قلب و عروق</h2>
<p>پسته مملو از چربی‌های تک‌غیراشباع و چند‌غیراشباع است که برای سلامت قلب بسیار مفیدند. مطالعات نشان داده‌اند مصرف منظم پسته می‌تواند سطح کلسترول بد (LDL) را کاهش داده و کلسترول خوب (HDL) را افزایش دهد. همچنین، پسته منبع خوبی از پتاسیم است که به تنظیم فشار خون کمک می‌کند و خطر بیماری‌های قلبی را کاهش می‌دهد.</p>

<h2 class="text-2xl font-bold font-display mt-8 mb-4">۲. سرشار از آنتی‌اکسیدان</h2>
<p>این آجیل خوش‌رنگ حاوی مقادیر بالایی از آنتی‌اکسیدان‌هایی مانند لوئین، زآگزانتین و ویتامین E است. این ترکیبات به محافظت از سلول‌های بدن در برابر آسیب‌های ناشی از رادیکال‌های آزاد کمک می‌کنند و می‌توانند خطر ابتلا به بیماری‌های مزمن از جمله برخی سرطان‌ها را کاهش دهند.</p>

<h2 class="text-2xl font-bold font-display mt-8 mb-4">۳. کنترل قند خون</h2>
<p>پسته دارای شاخص گلیسمی پایینی است و مصرف آن می‌تواند به کنترل سطح قند خون کمک کند. فیبر و پروتئین موجود در پسته باعث کند شدن جذب قند در جریان خون می‌شوند که این امر برای افراد دیابتی یا در معرض خطر دیابت بسیار مفید است.</p>

<h2 class="text-2xl font-bold font-display mt-8 mb-4">۴. سلامت چشم</h2>
<p>لوئین و زآگزانتین موجود در پسته، دو آنتی‌اکسیدان قوی هستند که به سلامت چشم‌ها کمک می‌کنند. این ترکیبات در شبکیه چشم تجمع می‌یابند و از چشم در برابر آسیب‌های ناشی از نور آبی و اشعه فرابنفش محافظت می‌کنند، همچنین خطر ابتلا به دژنراسیون ماکولا و آب مروارید را کاهش می‌دهند.</p>

<h2 class="text-2xl font-bold font-display mt-8 mb-4">۵. کمک به مدیریت وزن</h2>
<p>پسته با داشتن فیبر و پروتئین بالا، حس سیری طولانی‌مدت ایجاد می‌کند و می‌تواند به کاهش اشتهای کاذب کمک کند. این خاصیت، پسته را به یک میان‌وعده عالی برای افرادی که قصد کاهش یا مدیریت وزن خود را دارند، تبدیل می‌کند.</p>

<h2 class="text-2xl font-bold font-display mt-8 mb-4">۶. بهبود عملکرد دستگاه گوارش</h2>
<p>فیبر موجود در پسته به بهبود عملکرد دستگاه گوارش کمک کرده و از یبوست جلوگیری می‌کند. همچنین، این فیبر به عنوان پری‌بیوتیک عمل کرده و باکتری‌های مفید روده را تغذیه می‌کند که برای سلامت کلی دستگاه گوارش ضروری است.</p>

<h2 class="text-2xl font-bold font-display mt-8 mb-4">۷. سلامت پوست و مو</h2>
<p>ویتامین E و آنتی‌اکسیدان‌های موجود در پسته به سلامت و شادابی پوست و مو کمک می‌کنند. ویتامین E یک آنتی‌اکسیدان قوی است که از پوست در برابر آسیب‌های اکسیداتیو محافظت کرده و به حفظ رطوبت و الاستیسیته آن کمک می‌کند. همچنین، بیوتین موجود در پسته برای رشد و تقویت موها مفید است.</p>

<p><strong>نتیجه‌گیری:</strong></p>
<p>پسته یک سوپر‌فود واقعی است که با طعم بی‌نظیر و خواص فراوانش، می‌تواند بخش مهمی از رژیم غذایی سالم شما باشد. با اضافه کردن پسته به رژیم روزانه خود، از فواید بی‌شمار آن برای سلامتی بهره‌مند شوید.</p>`,
    coverImage: "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783346180/product-images/pistachio-akbari-1.jpg",
    tags: ["تغذیه", "پسته"],
    isPublished: true,
    publishedAt: "2024-12-15T10:00:00Z",
  },
  {
    id: "blog-dried-fruit-storage",
    slug: "dried-fruit-storage",
    title: "راهنمای کامل نگه‌داری خشکبار در خانه",
    excerpt:
      "چگونه انجیر خشک، زردآلو و کشمش را تازه و خوش‌طعم نگه‌داریم؟ نکات عملی برای ماندگاری بیشتر و حفظ طعم.",
    content: `<p>خشکبار، از جمله انجیر خشک، زردآلو، کشمش و انواع مغزها، بخش جدایی‌ناپذیری از رژیم غذایی سالم و فرهنگ غذایی ایرانی است. برای حفظ طعم، کیفیت و افزایش ماندگاری این خوراکی‌های ارزشمند، نگه‌داری صحیح آن‌ها اهمیت زیادی دارد. در این مقاله، یک راهنمای جامع برای نگه‌داری انواع خشکبار در خانه ارائه می‌دهیم تا شما بتوانید از تازگی و خواص آن‌ها برای مدت طولانی‌تری لذت ببرید.</p>

<h2 class="text-2xl font-bold font-display mt-8 mb-4">اصول کلی نگه‌داری خشکبار</h2>
<p>صرف نظر از نوع خشکبار، رعایت چند اصل کلی به شما کمک می‌کند تا محصولات خود را در بهترین وضعیت حفظ کنید:</p>
<ol>
  <li><strong>محیط خشک و خنک:</strong> رطوبت و گرما دو عامل اصلی فاسد شدن خشکبار هستند. آن‌ها را در محیطی خشک و خنک نگه‌داری کنید. دمای ایده‌آل معمولاً بین ۱۰ تا ۱۵ درجه سانتی‌گراد است.</li>
  <li><strong>دور از نور مستقیم خورشید:</strong> نور خورشید می‌تواند باعث اکسیداسیون چربی‌ها و تغییر رنگ و طعم خشکبار شود.</li>
  <li><strong>ظروف دربسته و محکم:</strong> استفاده از ظروف دربسته شیشه‌ای، پلاستیکی یا فلزی که هوا به داخل آن‌ها نفوذ نکند، از تماس خشکبار با هوا، رطوبت و آفات جلوگیری می‌کند.</li>
</ol>

<h2 class="text-2xl font-bold font-display mt-8 mb-4">نگه‌داری انواع خاص خشکبار</h2>

<h3 class="text-xl font-bold font-display mt-6 mb-3">۱. میوه‌های خشک (انجیر، زردآلو، کشمش، آلو)</h3>
<ul>
  <li><strong>دمای اتاق:</strong> در ظروف دربسته و در مکانی خنک و تاریک تا ۶ ماه قابل نگه‌داری هستند.</li>
  <li><strong>یخچال:</strong> برای نگه‌داری طولانی‌تر (تا ۱ سال)، آن‌ها را در ظروف دربسته در یخچال قرار دهید.</li>
  <li><strong>فریزر:</strong> برای ماندگاری بسیار طولانی (بیش از ۱ سال)، می‌توانید آن‌ها را در بسته‌بندی‌های وکیوم یا کیسه‌های فریزر مخصوص، فریز کنید. قبل از مصرف، اجازه دهید به آرامی در یخچال یا دمای اتاق یخ‌زدایی شوند.</li>
</ul>

<h3 class="text-xl font-bold font-display mt-6 mb-3">۲. مغزها (پسته، بادام، گردو، فندق)</h3>
<p>مغزها به دلیل داشتن چربی بالا، مستعد اکسیداسیون و ترشیدگی هستند:</p>
<ul>
  <li><strong>دمای اتاق:</strong> در ظروف دربسته، در مکانی خنک و تاریک، تا ۱-۲ ماه قابل نگه‌داری هستند.</li>
  <li><strong>یخچال:</strong> برای افزایش ماندگاری (تا ۶ ماه)، آن‌ها را در ظروف دربسته در یخچال قرار دهید.</li>
  <li><strong>فریزر:</strong> بهترین روش برای نگه‌داری طولانی‌مدت (تا ۱ سال و بیشتر) مغزها، فریز کردن است. قبل از فریز کردن، آن‌ها را در بسته‌بندی‌های مناسب وکیوم کنید تا از جذب بوی مواد دیگر و سوختگی فریزر جلوگیری شود.</li>
</ul>

<h3 class="text-xl font-bold font-display mt-6 mb-3">۳. حبوبات خشک (نخود، لوبیا، عدس)</h3>
<p>اگرچه کمتر به عنوان خشکبار طبقه‌بندی می‌شوند، اما نگه‌داری صحیح حبوبات خشک نیز در حفظ کیفیت آن‌ها اهمیت دارد:</p>
<ul>
  <li><strong>محیط خشک:</strong> حبوبات را در ظروف دربسته، در مکانی خشک و تاریک نگه‌داری کنید. رطوبت باعث جوانه زدن یا کپک زدن آن‌ها می‌شود.</li>
  <li><strong>دور از حشرات:</strong> برای جلوگیری از آفت‌زدگی، می‌توانید یک برگ بو یا چند حبه سیر را در ظرف حبوبات قرار دهید.</li>
</ul>

<h2 class="text-2xl font-bold font-display mt-8 mb-4">نکات تکمیلی</h2>
<ul>
  <li><strong>بررسی دوره‌ای:</strong> خشکبار نگه‌داری شده را به صورت دوره‌ای (هر چند هفته یکبار) بررسی کنید تا از عدم وجود رطوبت، کپک یا حشرات مطمئن شوید.</li>
  <li><strong>برچسب‌گذاری:</strong> روی ظروف نگه‌داری، تاریخ خرید یا بسته‌بندی را یادداشت کنید تا محصولات قدیمی‌تر زودتر مصرف شوند.</li>
  <li><strong>طعم‌دار کردن:</strong> در صورت تمایل، می‌توانید برخی خشکبار مانند بادام یا پسته را قبل از نگه‌داری با کمی نمک یا ادویه‌های دیگر طعم‌دار کنید تا ماندگاری و طعم آن‌ها بهبود یابد.</li>
</ul>

<p><strong>نتیجه‌گیری:</strong></p>
<p>با رعایت نکات ساده نگه‌داری، می‌توانید عمر مفید خشکبار خود را به میزان قابل توجهی افزایش دهید و همیشه از طعم و خواص بی‌نظیر آن‌ها بهره‌مند شوید. نگه‌داری صحیح نه تنها از هدر رفت غذا جلوگیری می‌کند، بلکه تضمین می‌کند که شما همیشه بهترین کیفیت را در دسترس دارید.</p>`,
    coverImage: "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783346173/product-images/dried-figs-1.jpg",
    tags: ["نگه‌داری", "خشکبار"],
    isPublished: true,
    publishedAt: "2024-12-10T10:00:00Z",
  },
  {
    id: "blog-saffron-cooking",
    slug: "saffron-cooking",
    title: "زعفران در آشپزی ایرانی: از زرشک‌پلو به شله‌زرد",
    excerpt:
      "زعفران نگین چگونه رنگ و عطر می‌دهد؟ مقدار درست، روش دم‌کردن و کاربردهای آن در غذاهای ایرانی.",
    content: `<p>زعفران، ادویه طلایی و گران‌بهای ایرانی، نه تنها به غذاها رنگ و عطر بی‌نظیری می‌بخشد، بلکه خواص سلامتی فراوانی نیز دارد. استفاده صحیح از زعفران در آشپزی، رمز دستیابی به طعم و بوی اصیل غذاهای ایرانی است. در این مقاله به بررسی جامع روش‌های دم‌کردن زعفران، مقدار مناسب و کاربردهای آن در انواع غذاها و دسرهای ایرانی می‌پردازیم.</p>

<h2 class="text-2xl font-bold font-display mt-8 mb-4">چرا زعفران شاه‌مغز؟</h2>
<p>زعفران نگین شاه‌مغز از بهترین مزارع قائنات، خاستگاه زعفران ایران، برداشت می‌شود. کلاله‌های تمام‌قرمز و بدون ریشه سفید، با دست چیده و با دقت فرآوری می‌شوند تا بیشترین رنگ‌دهی و عطر را داشته باشند. هر گرم زعفران شاه‌مغز، عصاره‌ای از طبیعت بکر خراسان جنوبی است.</p>

<h2 class="text-2xl font-bold font-display mt-8 mb-4">روش صحیح دم‌کردن زعفران</h2>
<p>برای آزاد شدن کامل رنگ و عطر زعفران، دم‌کردن آن با یخ یا آب داغ ضروری است:</p>

<h3 class="text-xl font-bold font-display mt-6 mb-3">روش ۱: دم‌کردن با یخ (پیشنهادی)</h3>
<ol>
  <li><strong>خرد کردن:</strong> ابتدا کلاله‌های زعفران را در هاونگ (ترجیحاً سنگی یا برنجی) به آرامی پودر کنید. از آسیاب برقی استفاده نکنید، زیرا حرارت آن می‌تواند عطر زعفران را از بین ببرد.</li>
  <li><strong>اضافه کردن یخ:</strong> پودر زعفران را در یک ظرف کوچک (مثل فنجان) بریزید و روی آن چند تکه کوچک یخ قرار دهید.</li>
  <li><strong>انتظار:</strong> اجازه دهید یخ به آرامی در دمای محیط ذوب شود. این فرآیند حدود ۱۰-۱۵ دقیقه طول می‌کشد. ذوب شدن آهسته یخ باعث می‌شود رنگ و عطر زعفران به تدریج و به طور کامل آزاد شود.</li>
  <li><strong>استفاده:</strong> پس از ذوب کامل یخ، زعفران دم‌کرده آماده استفاده است. می‌توانید آن را در یخچال نگه‌داری کنید.</li>
</ol>

<h3 class="text-xl font-bold font-display mt-6 mb-3">روش ۲: دم‌کردن با آب جوش</h3>
<ol>
  <li><strong>خرد کردن:</strong> مانند روش قبل، زعفران را پودر کنید.</li>
  <li><strong>اضافه کردن آب جوش:</strong> پودر زعفران را در فنجان بریزید و روی آن نصف فنجان آب جوش بریزید.</li>
  <li><strong>دم کشیدن:</strong> فنجان را با نعلبکی یا درپوش بپوشانید و اجازه دهید ۱۰-۱۵ دقیقه روی بخار کتری یا در محیط گرم بماند. حرارت غیرمستقیم به آزاد شدن عطر و رنگ کمک می‌کند.</li>
</ol>

<h2 class="text-2xl font-bold font-display mt-8 mb-4">مقدار مصرف و کاربردها</h2>
<p>مقدار مصرف زعفران بستگی به نوع غذا و ذائقه شما دارد، اما معمولاً یک قاشق چای‌خوری زعفران دم‌کرده برای بیشتر غذاها کافی است.</p>
<ul>
  <li><strong>زرشک‌پلو با مرغ:</strong> برای تزیین برنج و دادن رنگ و عطر فوق‌العاده.</li>
  <li><strong>شله‌زرد:</strong> یکی از مهم‌ترین مواد تشکیل‌دهنده شله‌زرد که رنگ طلایی و عطر بی‌نظیری به آن می‌بخشد.</li>
  <li><strong>ته‌چین:</strong> برای رنگ دادن به قسمت ته‌دیگ و عطر و طعم بخشیدن به برنج.</li>
  <li><strong>انواع خورش‌ها:</strong> در خورش‌هایی مانند قیمه، قرمه‌سبزی و فسنجان برای بهبود طعم و رنگ.</li>
  <li><strong>دسرها و شیرینی‌جات:</strong> در بستنی زعفرانی، کیک و انواع شیرینی‌های سنتی.</li>
  <li><strong>دمنوش زعفران:</strong> برای خواص آرام‌بخش و نشاط‌آور آن.</li>
</ul>

<p><strong>نکته:</strong> همیشه سعی کنید زعفران را در مقدار کمی آب یا یخ دم کنید تا غلظت رنگ و عطر آن بیشتر باشد.</p>

<p><strong>نتیجه‌گیری:</strong></p>
<p>زعفران قلب آشپزی ایرانی است. با آموختن روش‌های صحیح دم‌کردن و به کارگیری آن در غذاهایتان، می‌توانید تجربه‌ای بی‌نظیر از طعم و عطر اصیل ایرانی را خلق کنید. شاه‌مغز بهترین زعفران نگین را برای لحظات خاص شما فراهم می‌کند.</p>`,
    coverImage: "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783346183/product-images/saffron-1.jpg",
    tags: ["آشپزی", "زعفران"],
    isPublished: true,
    publishedAt: "2024-12-05T10:00:00Z",
  },
  {
    id: "blog-yalda-gift-guide",
    slug: "yalda-gift-guide",
    title: "هدیه شب یلدا: انتخاب هدیه‌ای فراموش‌نشدنی",
    excerpt:
      "یلدا، شب بلند سال. چگونه با هدیه‌ای لوکس از آجیل و خشکبار، این شب را برای عزیزانتان خاص کنیم؟",
    content: `<p>شب یلدا، بلندترین شب سال، بهانه‌ای زیبا برای دورهمی‌های خانوادگی، حافظ‌خوانی و شادمانی است. در این شب باستانی، رسم است که با هدایایی کوچک، محبت خود را به عزیزانمان ابراز کنیم. انتخاب یک هدیه مناسب که هم زیبا باشد و هم نمادی از فرهنگ غنی ایرانی، می‌تواند این شب را به یادماندنی‌تر کند. در این مقاله، راهنمای انتخاب هدیه لوکس آجیل و خشکبار برای شب یلدا را ارائه می‌دهیم.</p>

<h2 class="text-2xl font-bold font-display mt-8 mb-4">چرا آجیل و خشکبار برای یلدا؟</h2>
<p>آجیل و خشکبار از دیرباز جزء جدایی‌ناپذیر سفره شب یلدا بوده‌اند. این خوراکی‌ها نه تنها خوش‌طعم و مغذی هستند، بلکه هر یک نمادی از خیر و برکت، سلامتی و طول عمر در فرهنگ ایرانی محسوب می‌شوند. انتخاب یک جعبه هدیه لوکس از آجیل و خشکبار، نشان‌دهنده حسن سلیقه و توجه شما به سنت‌های اصیل است.</p>

<h2 class="text-2xl font-bold font-display mt-8 mb-4">انتخاب از میان محصولات شاه‌مغز</h2>
<p>شاه‌مغز با مجموعه‌ای بی‌نظیر از آجیل و خشکبار ممتاز ایرانی، بهترین گزینه برای انتخاب هدیه یلدایی است. در اینجا چند پیشنهاد برای شما داریم:</p>

<h3 class="text-xl font-bold font-display mt-6 mb-3">۱. جعبه هدیه سلطنتی شاه‌مغز</h3>
<p>این جعبه، اوج هنر و کیفیت است. شامل منتخب‌ترین آجیل‌ها (پسته اکبری، بادام مامرا، گردو کاشان) و خشکبارهای لوکس (انجیر خشک استهبان، زردآلو تبریز) در یک جعبه چوبی نفیس با رویه مخمل و مهر مومی طلایی. هر جعبه با دست آماده و پلمپ می‌شود. هدیه‌ای بی‌نقص برای مناسبت‌های ویژه، شب یلدا و عید نوروز.</p>

<h3 class="text-xl font-bold font-display mt-6 mb-3">۲. آجیل مخلوط ویژه یلدا</h3>
<p>ترکیبی اختصاصی از آجیل‌های تازه و درجه یک که به صورت ویژه برای شب یلدا تهیه شده است. این مخلوط با طعم‌های متنوع، کام هر ذائقه‌ای را راضی می‌کند و زیبایی‌بخش سفره یلدای شما خواهد بود.</p>

<h3 class="text-xl font-bold font-display mt-6 mb-3">۳. بسته‌های تک‌محصولی لوکس</h3>
<p>اگر مخاطب هدیه شما به محصول خاصی علاقه دارد، می‌توانید از بسته‌بندی‌های لوکس تک‌محصولی شاه‌مغز استفاده کنید. مثلاً، زعفران نگین ممتاز قائنات یا پسته اکبری اعلا، هدایایی فاخر و ارزشمند هستند.</p>

<h2 class="text-2xl font-bold font-display mt-8 mb-4">نکات بسته‌بندی و ارائه</h2>
<ul>
  <li><strong>بسته‌بندی نفیس:</strong> زیبایی بسته‌بندی به اندازه محتویات آن مهم است. جعبه‌های چوبی، سینی‌های قلم‌کاری شده یا باکس‌های مخملی می‌توانند جلوه ویژه‌ای به هدیه شما ببخشند.</li>
  <li><strong>تزیینات یلدایی:</strong> با اضافه کردن روبان‌های قرمز و سبز، برگ‌های پاییزی یا نمادهای کوچک یلدا (مثل انار یا هندوانه) به بسته‌بندی، آن را متناسب با حال و هوای شب یلدا کنید.</li>
  <li><strong>کارت تبریک دست‌نویس:</strong> یک کارت تبریک با دست‌خط شما، حس صمیمیت و ارزشمندی هدیه را دوچندان می‌کند.</li>
</ul>

<p><strong>نتیجه‌گیری:</strong></p>
<p>انتخاب هدیه یلدا فرصتی است برای ابراز عشق و احترام. با هدایای لوکس و باکیفیت شاه‌مغز، شب یلدایی فراموش‌نشدنی را برای عزیزان خود رقم بزنید و شیرینی این شب را با طعم اصیل ایرانی دوچندان کنید.</p>`,
    coverImage: "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783346177/product-images/gift-box-royal-1.jpg",
    tags: ["هدیه", "یلدا"],
    isPublished: true,
    publishedAt: "2024-12-01T10:00:00Z",
  },
];

// ────────────────────────────────────────────────────────────
// Helper functions
// ────────────────────────────────────────────────────────────

export function getProductBySlug(slug: string): MockProduct | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): MockProduct[] {
  return products.filter((p) => p.isFeatured);
}

export function getProductsByCategory(categorySlug: string): MockProduct[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getCategoryBySlug(slug: string): MockCategory | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getBlogPostBySlug(slug: string): MockBlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/**
 * Convert a MockProduct to the shape returned by the Prisma products API
 * (includes `product_variants` and `categories` relations).
 */
export function mockProductToApiShape(p: MockProduct) {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description,
    longDescription: p.longDescription,
    categoryId: p.categoryId,
    images: p.images,
    tags: p.tags,
    stockStatus: p.stockStatus,
    isFeatured: p.isFeatured,
    isPremium: p.isPremium,
    sku: p.sku,
    origin: p.origin,
    ingredients: p.ingredients,
    storageTips: p.storageTips,
    nutritionInfo: p.nutritionInfo,
    rating: p.rating,
    reviewCount: p.reviewCount,
    sortOrder: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    product_variants: p.variants.map((v) => ({
      id: `${p.id}-${v.id}`,
      productId: p.id,
      sku: `${p.sku}-${v.weightGrams}G`,
      weightGrams: v.weightGrams,
      packageLabel: v.packageLabel,
      price: v.price,
      compareAtPrice: v.compareAtPrice ?? null,
      stock: v.stock,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
    categories: {
      id: p.categoryId,
      slug: p.categorySlug,
      name: p.categoryName,
    },
  };
}
