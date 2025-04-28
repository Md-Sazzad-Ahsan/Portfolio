import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const blogsDir = path.join(process.cwd(), 'content', 'blogs');
    const categories = fs.readdirSync(blogsDir);

    const allBlogs = [];

    // Loop through each category
    for (const category of categories) {
      const bnDir = path.join(blogsDir, category, 'bn');
      if (!fs.existsSync(bnDir)) continue;

      const files = fs.readdirSync(bnDir).filter(file => file.endsWith('.md'));

      // Loop through each file (blog) in the category
      for (const file of files) {
        const filePath = path.join(bnDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent); // Extract content

        allBlogs.push({
          title: data.title,
          imageSrc: data.imageSrc,
          category: data.category,
          description: data.description,
          content, // Include full content
          link: `/blog/${category}/bn/${file.replace(/\.md$/, '')}`,
          displayInto: data.displayInto,
        });
      }
    }

    // Return all blog data (including content)
    return NextResponse.json(allBlogs);
  } catch (error) {
    console.error('Error loading blogs:', error);
    return NextResponse.error();
  }
}
