import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import connectToDB from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import mongoose from 'mongoose';

// Helper function to ensure DB connection
async function ensureDbConnection() {
  if (mongoose.connection.readyState === 0) {
    await connectToDB();
  }
}

// GET /api/blogs/[slug]
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await ensureDbConnection();
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Missing slug parameter' },
        { status: 400 }
      );
    }

    const blog = await Blog.findOne({ slug: String(slug) })
      .select('-__v')
      .lean();

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[slug]
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await ensureDbConnection();
    const { slug: originalSlug } = await context.params;

    if (!originalSlug) {
      return NextResponse.json(
        { success: false, error: 'Missing slug parameter' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Load document to leverage pre-save hook validations
    const blog = await Blog.findOne({ slug: String(originalSlug) });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Apply incoming fields
    if (typeof body.slug === 'string') blog.slug = body.slug;
    if (typeof body.author === 'string') blog.author = body.author;
    if (typeof body.thumbnail === 'string') blog.thumbnail = body.thumbnail;
    if (typeof body.category === 'string') blog.category = body.category.toLowerCase();
    if (body.content && typeof body.content === 'object') {
      blog.content = {
        en: {
          title: body.content.en?.title ?? blog.content?.en?.title,
          description: body.content.en?.description ?? blog.content?.en?.description,
          body: body.content.en?.body ?? blog.content?.en?.body,
        },
        bn: {
          title: body.content.bn?.title ?? blog.content?.bn?.title,
          description: body.content.bn?.description ?? blog.content?.bn?.description,
          body: body.content.bn?.body ?? blog.content?.bn?.body,
        }
      } as any;
    }

    const saved = await blog.save();

    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    console.error('Error updating blog post:', error);
    // Duplicate key (e.g., slug changed to an existing one)
    if ((error as any)?.code === 11000) {
      const field = Object.keys((error as any).keyPattern || {})[0] || 'field';
      return NextResponse.json(
        { success: false, error: `A blog with this ${field} already exists` },
        { status: 400 }
      );
    }
    if ((error as any).name === 'ValidationError') {
      const validationErrors = Object.values((error as any).errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: false, error: 'Failed to update blog post' }, { status: 500 });
  }
}

// DELETE /api/blogs/[slug]
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await ensureDbConnection();
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Missing slug parameter' },
        { status: 400 }
      );
    }

    const deletedBlog = await Blog.findOneAndDelete({ slug: String(slug) });

    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
