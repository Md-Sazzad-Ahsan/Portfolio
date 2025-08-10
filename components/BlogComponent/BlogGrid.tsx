"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  const [language] = useState<'en' | 'bn'>('en');
  const [showCards, setShowCards] = useState<boolean>(true);

  const fetchBlogs = useCallback(async (isInitialLoad: boolean, currentPage: number) => {
    if (isInitialLoad) setLoading(true);
    else setLoadingMore(true);

    setError(null);

    try {
      const categoryParam = selectedCategory !== 'All' ? `&category=${encodeURIComponent(selectedCategory)}` : '';

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000); // Faster timeout

      const res = await fetch(
        `/api/blogs?page=${currentPage}&limit=${initialCardCount}${categoryParam}`,
        {
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store'
        }
      );

      clearTimeout(timeoutId);

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const result = await res.json();

      if (result.success && Array.isArray(result.data)) {
        setBlogsData(prev => isInitialLoad ? result.data : [...prev, ...result.data]);
        setHasMore(result.pagination.page < result.pagination.totalPages);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err: any) {
      setError(err.name === 'AbortError'
        ? "Request timed out. Please try again."
        : "Failed to load blog posts. Please try again later."
      );
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [selectedCategory, initialCardCount]);

  useEffect(() => {
    fetchBlogs(true, 1);
  }, [fetchBlogs, initialCardCount, selectedCategory]);

  useEffect(() => {
    setPage(1);
    fetchBlogs(true, 1);
  }, [selectedCategory, initialCardCount]);

  const filteredBlogs = useMemo(() => blogsData, [blogsData]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const loadMoreCards = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBlogs(false, nextPage);
  };

  if (loading && !loadingMore && blogsData.length === 0) {
    return <BlogGridSkeleton count={initialCardCount} />;
  }

  if (error && blogsData.length === 0) {
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
          <li
            key={`${blog._id}-${i}`}
            className={`transform transition-all duration-500 ease-out ${showCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <BlogCard blog={blog} language={language} />
          </li>
        ))}

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
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-700 dark:to-blue-700 text-white px-6 sm:px-10 py-3 rounded-lg hover:from-cyan-700 hover:to-blue-700 dark:hover:from-cyan-800 dark:hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium mb-4"
            >
              <span>View All Articles</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          ) : (
            <button
              onClick={loadMoreCards}
              disabled={loadingMore}
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-700 dark:to-blue-700 text-white px-6 sm:px-10 py-3 rounded-lg hover:from-cyan-700 hover:to-blue-700 dark:hover:from-cyan-800 dark:hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              <span>Load More Articles</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default BlogGrid;
