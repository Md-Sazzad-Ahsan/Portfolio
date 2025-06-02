import { NextResponse } from 'next/server';
import connectToDB from '@/lib/dbConnect';
import Blog from '@/models/Blog';

// GET /api/blogs/[slug]
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Get slug from destructured params
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Missing slug parameter' },
        { status: 400 }
      );
    }
    
    await connectToDB();
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
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Get originalSlug from destructured params
    const { slug: originalSlug } = params;
    
    if (!originalSlug) {
      return NextResponse.json(
        { success: false, error: 'Missing slug parameter' },
        { status: 400 }
      );
    }
    
    await connectToDB();
    const body = await request.json();
    
    // Don't allow updating the slug directly
    if (body.slug && body.slug !== originalSlug) {
      // Check if new slug is already taken
      const existingBlog = await Blog.findOne({ slug: body.slug });
      if (existingBlog) {
        return NextResponse.json(
          { success: false, error: 'A blog with this slug already exists' },
          { status: 400 }
        );
      }
    }
    
    const updatedBlog = await Blog.findOneAndUpdate(
      { slug: String(originalSlug) },
      { 
        ...body,
        updatedAt: new Date() 
      },
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
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Get slug from destructured params
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Missing slug parameter' },
        { status: 400 }
      );
    }
    
    await connectToDB();
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
