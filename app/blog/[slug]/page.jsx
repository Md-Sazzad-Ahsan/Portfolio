'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaTag } from 'react-icons/fa';

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="container mx-auto px-4 py-8 animate-pulse max-w-6xl">
    <div className="bg-gray-200 dark:bg-gray-700 h-10 w-3/4 mb-4 rounded"></div>
    <div className="flex space-x-4 mb-6">
      <div className="bg-gray-200 dark:bg-gray-700 h-4 w-20 rounded"></div>
      <div className="bg-gray-200 dark:bg-gray-700 h-4 w-20 rounded"></div>
      <div className="bg-gray-200 dark:bg-gray-700 h-4 w-20 rounded"></div>
    </div>
    <div className="bg-gray-200 dark:bg-gray-700 h-64 w-full mb-8 rounded"></div>
    <div className="space-y-4">
      <div className="bg-gray-200 dark:bg-gray-700 h-4 w-full rounded"></div>
      <div className="bg-gray-200 dark:bg-gray-700 h-4 w-full rounded"></div>
      <div className="bg-gray-200 dark:bg-gray-700 h-4 w-3/4 rounded"></div>
    </div>
  </div>
);

// Error component
const ErrorDisplay = ({ message }) => (
  <div className="container mx-auto px-4 py-16 text-center">
    <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error</h2>
    <p className="mb-6 text-gray-800 dark:text-gray-200">{message}</p>
    <Link href="/blog" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
      Return to Blog List
    </Link>
  </div>
);

const BlogDetail = () => {
  const params = useParams();
  const slug = params.slug; // Get the slug from the URL
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setIsLoading(true);
        // Add a cache-busting query parameter to avoid browser caching
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/blogs/${encodeURIComponent(slug)}?t=${timestamp}`);
        
        if (!response.ok) {
          throw new Error(
            response.status === 404 
              ? 'Blog post not found' 
              : 'Failed to fetch blog post'
          );
        }
        
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch blog post');
        }
        
        console.log('Blog data fetched successfully:', data.data);
        setBlog(data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchBlogData();
    }
  }, [slug]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'bn' : 'en');
  };

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay message={error} />;
  
  // Check if the selected language content exists, otherwise fallback to the other language
  const hasSelectedLanguageContent = blog?.content?.[language]?.title && blog?.content?.[language]?.body;
  const activeLanguage = hasSelectedLanguageContent ? language : (language === 'en' ? 'bn' : 'en');
  
  const title = blog?.content?.[activeLanguage]?.title;
  const body = blog?.content?.[activeLanguage]?.body;
  const description = blog?.content?.[activeLanguage]?.description;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl text-gray-900 dark:text-gray-100">
      {/* Language toggle */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={toggleLanguage}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {language === 'en' ? 'বাংলা' : 'English'}
        </button>
      </div>
      
      {/* Blog header */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{title}</h1>

      {/* Blog description */}
      {description && (
        <div className="mb-8 text-lg italic text-gray-700 dark:text-gray-300">
          {description}
        </div>
      )}
      
      {/* Blog meta information */}
      <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 mb-6">
        <div className="flex items-center">
          <FaCalendarAlt className="mr-2" />
          <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>
        <div className="flex items-center">
          <FaUser className="mr-2" />
          <span>{blog.author}</span>
        </div>
        <div className="flex items-center">
          <FaTag className="mr-2" />
          <span className="capitalize">{blog.category}</span>
        </div>
      </div>
      
      {/* Blog thumbnail if available */}
      {blog.thumbnail && (
        <div className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-lg overflow-hidden">
          {/* Use an unoptimized image as a workaround for domain issues */}
          <Image 
            src={blog.thumbnail} 
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
            unoptimized={true}
            onError={(e) => {
              console.error('Image failed to load:', blog.thumbnail);
              // Fallback to default image if thumbnail fails to load
              e.target.src = "/images/TempImage.jpg";
            }}
          />
        </div>
      )}
      
      
      {/* Blog content */}
      <div 
        className="prose prose-lg dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 mx-auto max-w-6xl"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      
      {/* Back to blog list link */}
      <div className="mt-12">
        <Link href="/blog" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-2 rounded transition">
          Back to Blog List
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
