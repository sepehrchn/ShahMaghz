/**
 * Image Upload API Route
 * Handles server-side image uploads to Cloudinary
 * Usage: POST /api/admin/upload-image with FormData containing 'file'
 */

import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    // Get form data from request
    const formData = await req.formData();
    const file = formData.get('file') as File;

    // Validate file exists
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const folder = formData.get('folder') as string || 'product-images';
    const imageUrl = await uploadImage(buffer, folder);

    // Return success response with image URL
    return NextResponse.json({
      success: true,
      url: imageUrl,
      message: 'Image uploaded successfully',
    });

  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      {
        error: 'Failed to upload image',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Optional: GET method to test if route is accessible
export async function GET() {
  return NextResponse.json({
    message: 'Image upload API is ready',
    usage: 'POST multipart/form-data with "file" field',
  });
}
