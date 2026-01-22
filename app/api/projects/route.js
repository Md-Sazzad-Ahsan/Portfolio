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

    // Normalize slug: prefer incoming slug if provided, otherwise derive from title
    const base = (incomingSlug && incomingSlug.length) ? incomingSlug : title;
    const slug = slugify(base);

    const doc = await Project.create({ thumbnail, title, subTitle, description, gitHub, web, slug, features });

    return NextResponse.json({ success: true, data: doc }, { status: 201 });
  } catch (error) {
    // Handle mongoose validation and general errors
    if (error?.code === 11000 && error?.keyPattern?.slug) {
      return NextResponse.json({ success: false, message: 'Slug already exists. Please choose a different title or slug.' }, { status: 409 });
    }
    const status = error?.name === 'ValidationError' ? 400 : 500;
    const message = error?.message || 'Internal Server Error';
    return NextResponse.json({ success: false, message }, { status });
  }
}

export async function GET(request) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const q = searchParams.get('q');

    if (slug) {
      const item = await Project.findOne({ slug });
      if (!item) {
        return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: item }, { status: 200 });
    }

    let query = {};
    if (q && q.trim()) {
      // basic case-insensitive partial match on title or slug
      const regex = new RegExp(q.trim(), 'i');
      query = { $or: [{ title: regex }, { slug: regex }] };
    }

    const items = await Project.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}
