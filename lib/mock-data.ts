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

// Helper functions
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
