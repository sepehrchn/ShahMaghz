/**
 * Upload Product Images to Cloudinary
 * Uploads all images from public/images/products/ to Cloudinary
 */

const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const IMAGES_DIR = path.join(__dirname, '../public/images/products');
const CLOUDINARY_FOLDER = 'product-images';

// Image mapping to track uploaded URLs
const imageMapping = {};

async function uploadImage(filePath, filename) {
  try {
    console.log(`Uploading: ${filename}`);
    
    const result = await cloudinary.uploader.upload(filePath, {
      folder: CLOUDINARY_FOLDER,
      public_id: filename.replace(/\.[^/.]+$/, ''), // Remove extension
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 1500, crop: 'fill', gravity: 'center' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
      ],
    });

    console.log(`  ✅ Uploaded: ${result.secure_url}`);
    return result.secure_url;

  } catch (error) {
    console.error(`  ❌ Failed to upload ${filename}:`, error.message);
    return null;
  }
}

async function uploadAllImages() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║     Upload Product Images to Cloudinary                   ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Check if images directory exists
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error('❌ Images directory not found:', IMAGES_DIR);
    return;
  }

  // Get all image files
  const files = fs.readdirSync(IMAGES_DIR)
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort();

  console.log(`Found ${files.length} images to upload\n`);

  // Upload each image
  for (const file of files) {
    const filePath = path.join(IMAGES_DIR, file);
    const url = await uploadImage(filePath, file);
    
    if (url) {
      imageMapping[file] = url;
    }
  }

  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                       UPLOAD COMPLETE                      ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log(`✅ Successfully uploaded ${Object.keys(imageMapping).length} images\n`);

  // Save mapping to JSON file
  const mappingPath = path.join(__dirname, '../cloudinary-image-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(imageMapping, null, 2));
  console.log(`📝 Image URL mapping saved to: cloudinary-image-mapping.json\n`);

  // Display URLs
  console.log('Image URLs:\n');
  Object.entries(imageMapping).forEach(([filename, url]) => {
    console.log(`${filename}`);
    console.log(`  → ${url}\n`);
  });

  console.log('\n✨ Next steps:');
  console.log('1. Update lib/mock-data.ts with these Cloudinary URLs');
  console.log('2. Or use the mapping file to automate the update\n');
}

// Check if Cloudinary is configured
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
  console.error('❌ Cloudinary credentials not found in .env.local');
  console.error('Please make sure CLOUDINARY_* variables are set.\n');
  process.exit(1);
}

// Run upload
uploadAllImages().catch(console.error);
