import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    const public_id = body?.public_id;

    if (!public_id || typeof public_id !== 'string') {
      return NextResponse.json(
        { success: false, error: 'public_id is required' },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result !== 'ok' && result.result !== 'not found') {
      // not found is acceptable (already deleted)
      return NextResponse.json(
        { success: false, error: 'Failed to delete image', details: result },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to delete image' },
      { status: 500 }
    );
  }
}
