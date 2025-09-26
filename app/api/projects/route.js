import { NextResponse } from 'next/server';
import connect from '../../../lib/dbConnect';
import Project from '../../../models/Project';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    await connect();

    const body = await request.json();
    const { thumbnail, title, subTitle, description, gitHub, web, features, slug: incomingSlug } = body || {};

    // Helper to slugify title if slug not provided
    const slugify = (s) => String(s)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Basic required field checks aligned with the schema
    if (!thumbnail || !title || !subTitle || !description) {
      return NextResponse.json(
        { success: false, message: 'thumbnail, title, subTitle and description are required' },
        { status: 400 }
      );
    }

    const slug = incomingSlug && incomingSlug.length ? incomingSlug : slugify(title);

    const doc = await Project.create({ thumbnail, title, subTitle, description, gitHub, web, slug, features });

    return NextResponse.json({ success: true, data: doc }, { status: 201 });
  } catch (error) {
    // Handle mongoose validation and general errors
    const status = error?.name === 'ValidationError' ? 400 : 500;
    const message = error?.message || 'Internal Server Error';
    return NextResponse.json({ success: false, message }, { status });
  }
}

export async function GET() {
  try {
    await connect();
    const items = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}
