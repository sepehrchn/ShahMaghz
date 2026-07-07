/**
 * Optimize and upload placeholder images to Cloudinary.
 *
 * Usage:
 *   node --env-file=.env scripts/upload-placeholders.js
 *
 * Prerequisites:
 *   - Images saved in images/raw/ with correct filenames
 *   - .env has CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 */

const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");

// ── Cloudinary config ──────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CLOUDINARY_FOLDER = "shahmaghz-assets";
const RAW_DIR = path.join(__dirname, "..", "images", "optimized");

// ── Image definitions ──────────────────────────────────────
// Each entry: local filename → Cloudinary public_id + optimization
const IMAGES = [
  {
    file: "nuts.jpg",
    publicId: "category-nuts",
    purpose: "Category: آجیل (Nuts)",
    // Category cards are 16:9 (large) or square (small)
    width: 1200,
    height: 800,
    crop: "fill",
    gravity: "auto",
  },
  {
    file: "dried-fruits.jpg",
    publicId: "category-dried-fruits",
    purpose: "Category: خشکبار (Dried Fruits)",
    width: 1200,
    height: 800,
    crop: "fill",
    gravity: "auto",
  },
  {
    file: "chocolate-dipped.jpg",
    publicId: "category-chocolate-dipped",
    purpose: "Category: شکلاتی و شیرینی (Chocolate & Sweets)",
    width: 1200,
    height: 800,
    crop: "fill",
    gravity: "auto",
  },
  {
    file: "gift-boxes.jpg",
    publicId: "category-gift-boxes",
    purpose: "Category: جعبه‌های هدیه (Gift Boxes)",
    width: 1200,
    height: 800,
    crop: "fill",
    gravity: "auto",
  },
  {
    file: "old-shop.jpg",
    publicId: "about-old-shop",
    purpose: "About Page: Old Tehran Shop",
    width: 800,
    height: 1000,
    crop: "fill",
    gravity: "auto",
  },
];

// ── Upload with optimization ───────────────────────────────
async function uploadImage(img) {
  const filePath = path.join(RAW_DIR, img.file);

  if (!fs.existsSync(filePath)) {
    console.error(`  ❌ File not found: ${filePath}`);
    return null;
  }

  const fileSize = fs.statSync(filePath).size;
  console.log(`  📦 Original size: ${(fileSize / 1024).toFixed(0)} KB`);

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: img.publicId,
      folder: CLOUDINARY_FOLDER,
      overwrite: true,
      resource_type: "image",
      // ── Optimization: resize, compress, and format ──
      transformation: [
        {
          width: img.width,
          height: img.height,
          crop: img.crop,
          gravity: img.gravity,
          quality: "auto:good",  // Cloudinary's intelligent quality compression
          fetch_format: "auto",  // Serve WebP/AVIF to supported browsers
        },
      ],
      // Generate eager transformations for common sizes
      eager: [
        // Thumbnail (for small cards)
        { width: 400, height: 300, crop: "fill", gravity: "auto", quality: "auto:good", fetch_format: "auto" },
        // Medium (for category grid)
        { width: 800, height: 600, crop: "fill", gravity: "auto", quality: "auto:good", fetch_format: "auto" },
      ],
      eager_async: true,
    });

    const optimizedSize = result.bytes;
    const savings = ((1 - optimizedSize / fileSize) * 100).toFixed(0);

    console.log(`  ✅ Uploaded: ${result.secure_url}`);
    console.log(`  📉 Optimized size: ${(optimizedSize / 1024).toFixed(0)} KB (${savings}% savings)`);
    console.log(`  📐 Dimensions: ${result.width}x${result.height}`);

    return {
      publicId: img.publicId,
      purpose: img.purpose,
      url: result.secure_url,
      originalSize: fileSize,
      optimizedSize: optimizedSize,
    };
  } catch (err) {
    console.error(`  ❌ Upload failed: ${err.message}`);
    return null;
  }
}

// ── Main ───────────────────────────────────────────────────
async function main() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  🖼️  ShahMaghz — Image Optimization & Upload");
  console.log("═══════════════════════════════════════════════════════\n");

  // Validate environment
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
    console.error("❌ Missing CLOUDINARY environment variables.");
    console.error("   Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env\n");
    process.exit(1);
  }

  // Validate raw images directory
  if (!fs.existsSync(RAW_DIR)) {
    console.error(`❌ Raw images directory not found: ${RAW_DIR}`);
    console.error("   Create it and add your images.\n");
    process.exit(1);
  }

  const results = [];

  for (const img of IMAGES) {
    console.log(`\n🔄 Processing: ${img.purpose}`);
    console.log(`   File: ${img.file}`);
    const result = await uploadImage(img);
    if (result) results.push(result);
  }

  // ── Summary ────────────────────────────────────────────
  console.log("\n\n═══════════════════════════════════════════════════════");
  console.log("  📊  Upload Summary");
  console.log("═══════════════════════════════════════════════════════\n");

  if (results.length === 0) {
    console.log("❌ No images were uploaded. Check the errors above.\n");
    return;
  }

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const r of results) {
    totalOriginal += r.originalSize;
    totalOptimized += r.optimizedSize;
    console.log(`  ✅ ${r.purpose}`);
    console.log(`     ${r.url}\n`);
  }

  const totalSavings = ((1 - totalOptimized / totalOriginal) * 100).toFixed(0);
  console.log(`  📦 Total original:  ${(totalOriginal / 1024).toFixed(0)} KB`);
  console.log(`  📉 Total optimized: ${(totalOptimized / 1024).toFixed(0)} KB`);
  console.log(`  💚 Total savings:   ${totalSavings}%\n`);

  // ── SQL update statements for convenience ──────────────
  console.log("═══════════════════════════════════════════════════════");
  console.log("  🗃️  Database Update Commands (copy & paste)");
  console.log("═══════════════════════════════════════════════════════\n");

  const categoryImages = results.filter((r) => r.publicId.startsWith("category-"));
  for (const r of categoryImages) {
    const slug = r.publicId.replace("category-", "");
    console.log(`-- ${r.purpose}`);
    console.log(`UPDATE categories SET image = '${r.url}' WHERE slug = '${slug}';\n`);
  }

  console.log("\n✨ Done! Copy the URLs above to update your database.\n");
}

main().catch(console.error);
