"use client";
import React, { useState, useEffect } from "react";
import CategoryButtons from "@/components/GlobalComponents/CategoriesButton";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { BlogGridSkeleton, BlogCardSkeleton } from "@/components/BlogComponent/BlogSkeleton";

interface BlogContent {
  title?: string;
  description?: string;
  body?: string;
}

interface Blog {
  _id: string;
  slug: string;
  thumbnail?: string;
  createdAt: string;
  category: string;
  author: string;
  content: {
    en: BlogContent;
    bn: BlogContent;
  };
}

interface BlogGridProps {
  initialCardCount?: number;
  buttonType: "viewMore" | "loadMore";
}

const BlogGrid: React.FC<BlogGridProps> = ({ initialCardCount = 6, buttonType }) => {
  const [blogsData, setBlogsData] = useState<Blog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [language, setLanguage] = useState<'en' | 'bn'>('en');

  const fetchBlogs = async (isInitialLoad: boolean = false, currentPage: number = 1) => {
    if (isInitialLoad) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);
    
    try {
      const categoryParam = selectedCategory !== 'All' ? `&category=${encodeURIComponent(selectedCategory)}` : '';
      
      // Create AbortController for request timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const res = await fetch(`/api/blogs?page=${currentPage}&limit=${initialCardCount}${categoryParam}`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
        // Add cache control for better performance
        cache: 'force-cache',
        next: { revalidate: 60 } // Revalidate every 60 seconds
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const result = await res.json();
      
      if (result.success && Array.isArray(result.data)) {
        if (isInitialLoad) {
          setBlogsData(result.data);
        } else {
          setBlogsData(prev => [...prev, ...result.data]);
        }
        setHasMore(result.pagination.page < result.pagination.totalPages);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.error("Request timed out");
        setError("Request timed out. Please try again.");
      } else {
        console.error("Failed to load blogs:", err);
        setError("Failed to load blog posts. Please try again later.");
      }
    } finally {
      if (isInitialLoad) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  // Initial load with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchBlogs(true, 1);
    }, 100); // Small delay to batch rapid changes
    
    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle category change with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPage(1);
      fetchBlogs(true, 1);
    }, 300); // Debounce category changes
    
    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // Remove console logs in production for better performance
  // console.log("Blogs Data:", blogsData);
  // console.log("Selected Category:", selectedCategory);

  // Memoize filtered blogs for better performance
  const filteredBlogs = React.useMemo(() => {
    if (selectedCategory === "All") {
      return blogsData;
    }
    
    const targetCategory = selectedCategory.toLowerCase();
    return blogsData.filter((blog) => {
      const blogCategory = blog.category.toLowerCase();
      return blogCategory === targetCategory || blogCategory.includes(targetCategory);
    });
  }, [blogsData, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const loadMoreCards = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBlogs(false, nextPage);
  };

  if (loading) {
    return <BlogGridSkeleton count={initialCardCount} />;
  }

  if (error) {
    return <div className="px-5 sm:px-16 md:px-28 lg:px-56 flex justify-center text-red-600 dark:text-red-400">{error}</div>;
  }

  return (
    <div className="text-gray-900 dark:text-gray-100">
      <CategoryButtons
        categories={["All", "Tech", "Education", "Programming", "LifeStyle", "Design", "News", "Social", "Others"]}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {filteredBlogs.map((blog, i) => (
          <li key={`${blog._id}-${i}`}>
            <BlogCard 
              blog={blog} 
              language={language}
            />
          </li>
        ))}
        
        {/* Show skeleton cards while loading more */}
        {loadingMore && Array.from({ length: initialCardCount }).map((_, i) => (
          <li key={`skeleton-${i}`}>
            <BlogCardSkeleton />
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-8">
        {hasMore && !loading && !loadingMore && (
          buttonType === "viewMore" ? (
            <Link 
              href="/blog" 
              className="inline-block cursor-pointer bg-cyan-600 dark:bg-cyan-700 text-white px-5 sm:px-8 py-2 rounded-full hover:bg-cyan-700 dark:hover:bg-cyan-800 transition-colors shadow-sm"
            >
              View All
            </Link>
          ) : (
            <button
              onClick={loadMoreCards}
              disabled={loadingMore}
              className="cursor-pointer bg-cyan-600 dark:bg-cyan-700 text-white px-5 sm:px-8 py-2 rounded-full hover:bg-cyan-700 dark:hover:bg-cyan-800 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Show more
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default BlogGrid;