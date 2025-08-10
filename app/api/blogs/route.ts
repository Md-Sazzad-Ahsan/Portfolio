import { NextResponse } from 'next/server';
import connectToDB from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// GET /api/blogs?page=1&limit=10&category=technology&source=db|files
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get('source') || 'db';

    if (source === 'files') {
      return await getFileBasedBlogs();
    }
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
    const category = searchParams.get('category');
    const skip = (page - 1) * limit;

    const query: Record<string, any> = {};
    if (category) query.category = category;

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .sort({ createdAt: -1 })
        .select('-content.en.body -content.bn.body')
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments(query)
    ]);

    return NextResponse.json({
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
  } catch (error) {
    console.error('Error fetching blogs from database:', error);
    throw error;
  }
}

// ------------------ File-Based Blogs ------------------
async function getFileBasedBlogs() {
  try {
    const blogsDir = path.join(process.cwd(), 'content', 'blogs');

    if (!fs.existsSync(blogsDir)) {
      return NextResponse.json({
        success: true,
        source: 'files',
        data: [],
        message: 'No blog content directory found'
      });
    }

    const categories = fs.readdirSync(blogsDir);
    const allBlogs: any[] = [];

    for (const category of categories) {
      const bnDir = path.join(blogsDir, category, 'bn');
      if (!fs.existsSync(bnDir)) continue;

      const files = fs.readdirSync(bnDir).filter(file => file.endsWith('.md'));

      for (const file of files) {
        const filePath = path.join(bnDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        allBlogs.push({
          title: data.title,
          imageSrc: data.imageSrc,
          category: data.category,
          description: data.description,
          content,
          link: `/blog/${category}/bn/${file.replace(/\.md$/, '')}`,
          displayInto: data.displayInto,
        });
      }
    }

    return NextResponse.json({
      success: true,
      source: 'files',
      data: allBlogs
    });
  } catch (error) {
    console.error('Error loading blogs from files:', error);
    throw error;
  }
}

// ------------------ Create Blog ------------------
export async function POST(request: Request) {
  try {
    await connectToDB();

    const body = await request.json();

    // Required field validation
    const requiredFields = [
      { field: 'slug', message: 'URL slug is required' },
      { field: 'category', message: 'Category is required' },
      { field: 'author', message: 'Author name is required' }
    ];

    for (const { field, message } of requiredFields) {
      const value = field.split('.').reduce((obj, key) => obj?.[key], body);
      if (!value || (typeof value === 'string' && !value.trim())) {
        return NextResponse.json({ success: false, error: message }, { status: 400 });
      }
    }

    // At least one language content check
    const hasEnglishContent = body.content?.en?.title && body.content?.en?.body;
    const hasBanglaContent = body.content?.bn?.title && body.content?.bn?.body;

    if (!hasEnglishContent && !hasBanglaContent) {
      return NextResponse.json(
        { success: false, error: 'Please provide content in at least one language (English or Bangla)' },
        { status: 400 }
      );
    }

    // Slug format validation
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(body.slug)) {
      return NextResponse.json(
        { success: false, error: 'Slug must contain only lowercase letters, numbers, and hyphens' },
        { status: 400 }
      );
    }

    // Slug uniqueness check
    const existingBlog = await Blog.findOne({ slug: body.slug });
    if (existingBlog) {
      return NextResponse.json(
        { success: false, error: 'Blog with this slug already exists' },
        { status: 400 }
      );
    }

    // Create and save new blog
    const now = new Date();
    const blog = new Blog({ ...body, createdAt: now, updatedAt: now });
    const savedBlog = await blog.save();

    return NextResponse.json(
      { success: true, message: 'Blog created successfully', data: savedBlog },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating blog:', error);

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
