import { PrismaClient } from "@prisma/client";
import { type MockProduct } from "./mock-data";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function getDbProductBySlug(slug: string): Promise<MockProduct | null> {
  const product = await prisma.products.findUnique({
    where: { slug },
    include: {
      categories: true,
      product_variants: {
        orderBy: { weightGrams: "asc" }
      }
    }
  });

  if (!product) return null;

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    longDescription: product.longDescription || "",
    categoryId: product.categoryId,
    categorySlug: product.categories.slug,
    categoryName: product.categories.name,
    images: product.images,
    tags: product.tags,
    stockStatus: product.stockStatus as any,
    isFeatured: product.isFeatured,
    isPremium: product.isPremium,
    sku: product.sku,
    origin: product.origin || "",
    ingredients: product.ingredients,
    storageTips: product.storageTips || "",
    nutritionInfo: product.nutritionInfo as any,
    rating: product.rating,
    reviewCount: product.reviewCount,
    variants: product.product_variants.map((v) => ({
      id: v.id,
      weightGrams: v.weightGrams,
      packageLabel: v.packageLabel,
      price: v.price,
      compareAtPrice: v.compareAtPrice ?? undefined,
      stock: v.stock,
    }))
  };
}

export async function getDbProductsByCategory(categorySlug: string): Promise<MockProduct[]> {
  const products = await prisma.products.findMany({
    where: {
      categories: {
        slug: categorySlug
      }
    },
    include: {
      categories: true,
      product_variants: {
        orderBy: { weightGrams: "asc" }
      }
    },
    orderBy: {
      sortOrder: "asc"
    }
  });

  return products.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    longDescription: product.longDescription || "",
    categoryId: product.categoryId,
    categorySlug: product.categories.slug,
    categoryName: product.categories.name,
    images: product.images,
    tags: product.tags,
    stockStatus: product.stockStatus as any,
    isFeatured: product.isFeatured,
    isPremium: product.isPremium,
    sku: product.sku,
    origin: product.origin || "",
    ingredients: product.ingredients,
    storageTips: product.storageTips || "",
    nutritionInfo: product.nutritionInfo as any,
    rating: product.rating,
    reviewCount: product.reviewCount,
    variants: product.product_variants.map((v) => ({
      id: v.id,
      weightGrams: v.weightGrams,
      packageLabel: v.packageLabel,
      price: v.price,
      compareAtPrice: v.compareAtPrice ?? undefined,
      stock: v.stock,
    }))
  }));
}

export async function getDbCategoryBySlug(slug: string) {
  return await prisma.categories.findUnique({
    where: { slug }
  });
}
