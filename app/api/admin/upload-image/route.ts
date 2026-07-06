/**
 * Image Upload API Route
 * Handles server-side image uploads to Cloudinary
 * Usage: POST /api/admin/upload-image with FormData containing 'file'
 * 
 * Note: Cloudinary integration is optional. This endpoint returns a helpful message
 * when cloudinary is not configured. Install 'cloudinary' package and set up
 * CLOUDINARY_* environment variables to enable real image uploads.
 */

import { NextRequest, NextResponse } from 'next/server';

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

    // Return helpful message since cloudinary is not configured
    // To enable: npm install cloudinary, then configure environment variables
    return NextResponse.json(
      {
        error: 'Image upload not configured',
        message: 'Cloudinary integration is not set up. To enable image uploads:',
        steps: [
          '1. Install cloudinary: npm install cloudinary',
          '2. Set environment variables: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET',
          '3. Uncomment the cloudinary import in this file',
        ],
        fileInfo: {
          name: file.name,
          size: file.size,
          type: file.type,
        },
      },
      { status: 501 } // Not Implemented
    );

  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process upload',
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
