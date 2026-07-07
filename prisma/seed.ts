import { PrismaClient } from "@prisma/client";
import { categories, products } from "../lib/mock-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  console.log("🧹 Cleaning existing data...");
  await prisma.order_items.deleteMany();
  await prisma.orders.deleteMany();
  await prisma.product_variants.deleteMany();
  await prisma.products.deleteMany();
  await prisma.categories.deleteMany();

  // Seed categories
  console.log("📁 Seeding categories...");
  for (const category of categories) {
    await prisma.categories.create({
      data: {
        id: category.id,
        slug: category.slug,
        name: category.name,
        description: category.description,
        updatedAt: new Date(),
      },
    });
  }
  console.log(`✅ Created ${categories.length} categories`);

  // Seed products and variants
  console.log("📦 Seeding products...");
  for (const product of products) {
    await prisma.products.create({
      data: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        description: product.description,
        longDescription: product.longDescription,
        categoryId: product.categoryId,
        images: product.images,
        tags: product.tags,
        stockStatus: product.stockStatus,
        isFeatured: product.isFeatured,
        isPremium: product.isPremium,
        sku: product.sku,
        origin: product.origin || null,
        ingredients: product.ingredients,
        storageTips: product.storageTips || null,
        nutritionInfo: product.nutritionInfo,
        rating: product.rating,
        reviewCount: product.reviewCount,
        updatedAt: new Date(),
        product_variants: {
          create: product.variants.map((variant) => ({
            id: `${product.id}-${variant.id}`,
            sku: `${product.sku}-${variant.weightGrams}G`,
            weightGrams: variant.weightGrams,
            packageLabel: variant.packageLabel,
            price: variant.price,
            compareAtPrice: variant.compareAtPrice || null,
            stock: variant.stock,
            updatedAt: new Date(),
          })),
        },
      },
    });
  }
  console.log(`✅ Created ${products.length} products with variants`);

  console.log("✨ Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
