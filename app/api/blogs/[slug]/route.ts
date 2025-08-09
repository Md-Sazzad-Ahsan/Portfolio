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

    const blog = await Blog.findOne({ slug: String(slug) });

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

    if (body.slug && body.slug !== originalSlug) {
      const existingBlog = await Blog.findOne({ slug: body.slug });
      if (existingBlog) {
        return NextResponse.json(
          { success: false, error: 'A blog with this slug already exists' },
          { status: 400 }
        );
      }
    }

    const updatedBlogData = {
      ...body,
      updatedAt: new Date()
    };

    const hasEnglishContent = updatedBlogData.content?.en?.title && updatedBlogData.content?.en?.body;
    const hasBanglaContent = updatedBlogData.content?.bn?.title && updatedBlogData.content?.bn?.body;

    if (!hasEnglishContent && !hasBanglaContent) {
      return NextResponse.json(
        { error: 'Please provide content in at least one language (English or Bangla)' },
        { status: 400 }
      );
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { slug: String(originalSlug) },
      updatedBlogData,
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedBlog
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update blog post' },
      { status: 500 }
    );
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
