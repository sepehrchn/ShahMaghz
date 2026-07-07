/**
 * Update category images in the database with Cloudinary URLs.
 *
 * Usage:
 *   node --env-file=.env scripts/update-category-images.js
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CATEGORY_IMAGES = [
  {
    slug: "nuts",
    image: "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783426638/shahmaghz-assets/category-nuts.jpg",
  },
  {
    slug: "dried-fruits",
    image: "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783426640/shahmaghz-assets/category-dried-fruits.jpg",
  },
  {
    slug: "chocolate-dipped",
    image: "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783426642/shahmaghz-assets/category-chocolate-dipped.jpg",
  },
  {
    slug: "gift-boxes",
    image: "https://res.cloudinary.com/pjx9e2r5/image/upload/v1783426643/shahmaghz-assets/category-gift-boxes.jpg",
  },
];

async function main() {
  console.log("🗃️  Updating category images in database...\n");

  for (const cat of CATEGORY_IMAGES) {
    try {
      const result = await prisma.categories.update({
        where: { slug: cat.slug },
        data: { image: cat.image },
      });
      console.log(`  ✅ ${result.name} (${cat.slug}) → image updated`);
    } catch (err) {
      console.error(`  ❌ ${cat.slug}: ${err.message}`);
    }
  }

  console.log("\n✨ Done! Category images are now live.\n");
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});
