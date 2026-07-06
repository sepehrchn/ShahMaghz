const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '../public/images/products');
const OUTPUT_DIR = path.join(__dirname, '../public/images/products');

// Image dimensions for different use cases
const SIZES = {
  // Product grid thumbnails - 4:5 aspect ratio (portrait)
  thumbnail: { width: 600, height: 750, quality: 85 },
  // Product detail main image - 4:5 aspect ratio
  detail: { width: 1200, height: 1500, quality: 90 },
};

async function optimizeImage(inputPath, filename) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`Processing: ${filename}`);
    console.log(`  Original: ${metadata.width}x${metadata.height} (${(fs.statSync(inputPath).size / 1024 / 1024).toFixed(2)}MB)`);
    
    // Determine target dimensions (4:5 aspect ratio for product images)
    const targetWidth = 1200;
    const targetHeight = 1500;
    
    // Process image: resize, optimize, and maintain quality
    await image
      .resize(targetWidth, targetHeight, {
        fit: 'cover',
        position: 'center',
      })
      .jpeg({
        quality: 88,
        progressive: true,
        mozjpeg: true,
      })
      .toFile(inputPath + '.tmp');
    
    // Replace original with optimized version
    fs.renameSync(inputPath + '.tmp', inputPath);
    
    const newSize = fs.statSync(inputPath).size;
    console.log(`  Optimized: ${targetWidth}x${targetHeight} (${(newSize / 1024 / 1024).toFixed(2)}MB)`);
    console.log(`  ✓ Saved ${((metadata.size - newSize) / 1024 / 1024).toFixed(2)}MB\n`);
    
  } catch (error) {
    console.error(`Error processing ${filename}:`, error.message);
  }
}

async function processAllImages() {
  console.log('Starting image optimization...\n');
  
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error('Images directory not found!');
    return;
  }
  
  const files = fs.readdirSync(IMAGES_DIR)
    .filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'));
  
  console.log(`Found ${files.length} images to optimize\n`);
  
  for (const file of files) {
    const inputPath = path.join(IMAGES_DIR, file);
    await optimizeImage(inputPath, file);
  }
  
  console.log('✓ All images optimized successfully!');
}

processAllImages();
