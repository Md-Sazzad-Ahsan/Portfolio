import { NextResponse } from 'next/server';
import connectToDB from '@/lib/dbConnect';
import Blog from '@/models/Blog';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    return await getDatabaseBlogs(searchParams);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// ------------------ Database Blogs ------------------
async function getDatabaseBlogs(searchParams: URLSearchParams) {
  try {
    await connectToDB();

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const categoryParam = searchParams.get('category');
    const skip = (page - 1) * limit;

    const query: Record<string, any> = {};
    if (categoryParam) query.category = categoryParam.toLowerCase();

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .sort({ createdAt: -1 })
        .select('-content.en.body -content.bn.body -__v')
        .skip(skip)
        .limit(limit)
        .lean(),
      Object.keys(query).length === 0
        ? Blog.estimatedDocumentCount()
        : Blog.countDocuments(query)
    ]);

    const res = NextResponse.json({
      success: true,
      source: 'database',
      data: blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
    res.headers.set('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
    return res;
  } catch (error) {
    console.error('Error fetching blogs from database:', error);
    throw error;
  }
}

// ------------------ Create Blog ------------------
export async function POST(request: Request) {
  try {
    await connectToDB();

    const body = await request.json();

    // Create and save new blog (schema handles validation, casing, enums, and timestamps)
    const blog = new Blog(body);
    const savedBlog = await blog.save();

    return NextResponse.json(
      { success: true, message: 'Blog created successfully', data: savedBlog },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating blog:', error);
    // Duplicate key (e.g., slug) error
    if (error?.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || 'field';
      return NextResponse.json(
        { success: false, error: `A blog with this ${field} already exists` },
        { status: 400 }
      );
    }
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create blog', message: error.message || 'Unknown error occurred' },
      { status: 500 }
    );
  }
}
