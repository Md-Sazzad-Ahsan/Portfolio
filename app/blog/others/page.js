"use client";
import { useEffect, useState } from 'react';
import BlogCardTemplate from '@/components/BlogComponent/BlogCardTemplate';

const BlogCategory = ({ params }) => {
  const { category } = params; // Extract category from params
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs based on the category
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/api/blog/${category}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [category]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl mb-6">{category} Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCardTemplate
            key={blog._id}
            imageSrc={blog.thumbnail || '/default-thumbnail.jpg'}
            category={blog.category}
            headline={blog.headline}
            description={blog.content.slice(0, 150) + '...'}
            link={`/blog/${blog.slug}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogCategory;
