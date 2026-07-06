/**
 * Cloudinary Configuration
 * Server-side image upload and management
 */

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

/**
 * Upload image to Cloudinary
 * @param file - File buffer or base64 string
 * @param folder - Folder name in Cloudinary (default: 'product-images')
 * @returns Uploaded image URL
 */
export async function uploadImage(
  file: Buffer | string,
  folder: string = 'product-images'
): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { width: 1200, height: 1500, crop: 'fill', gravity: 'center' },
          { quality: 'auto:good' },
          { fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    ).end(file);
  });
}

/**
 * Delete image from Cloudinary
 * @param publicId - Cloudinary public ID (extracted from URL)
 * @returns Deletion result
 */
export async function deleteImage(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}

/**
 * Get optimized image URL with transformations
 * @param url - Original Cloudinary URL
 * @param width - Target width
 * @param height - Target height
 * @returns Transformed URL
 */
export function getOptimizedImageUrl(
  url: string,
  width?: number,
  height?: number
): string {
  if (!url.includes('cloudinary.com')) return url;

  const transformations = [];
  if (width && height) {
    transformations.push(`w_${width},h_${height},c_fill`);
  } else if (width) {
    transformations.push(`w_${width}`);
  }
  transformations.push('q_auto:good', 'f_auto');

  const parts = url.split('/upload/');
  if (parts.length === 2) {
    return `${parts[0]}/upload/${transformations.join(',')}/${parts[1]}`;
  }

  return url;
}
