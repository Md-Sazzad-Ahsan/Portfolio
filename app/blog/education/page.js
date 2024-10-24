"use client";
import { useEffect, useState } from 'react';
import BlogCardTemplate from '@/components/BlogComponent/BlogCardTemplate';
import { useSearchParams } from 'next/navigation';

const BlogCategory = () => {
  const [blogs, setBlogs] = useState([]);
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'All';

  useEffect(() => {
    // Fetch blogs based on the category
    fetch(`/api/blog/${category}`)
      .then((res) => res.json())
      .then((data) => setBlogs(data));
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
