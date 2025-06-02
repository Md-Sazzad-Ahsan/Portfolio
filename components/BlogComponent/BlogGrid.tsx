"use client";
import React, { useState, useEffect } from "react";
import CategoryButtons from "@/components/GlobalComponents/CategoriesButton";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";

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
  const [visibleCardCount, setVisibleCardCount] = useState<number>(initialCardCount);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'bn'>('en');

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          setBlogsData(result.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err: any) {
        console.error("Failed to load blogs:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Logging the data to make sure everything is correct (for debugging)
  console.log("Blogs Data:", blogsData);
  console.log("Selected Category:", selectedCategory);

  // Filter blogs based on selected category
  const filteredBlogs = selectedCategory === "All"
    ? blogsData
    : blogsData.filter((blog) => {
        // Convert blog category to lowercase for case-insensitive comparison
        const blogCategory = blog.category.toLowerCase();
        const targetCategory = selectedCategory.toLowerCase();
        
        // Match on category name
        return blogCategory === targetCategory || blogCategory.includes(targetCategory);
      });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCardCount(initialCardCount);
  };

  const loadMoreCards = () => {
    setVisibleCardCount((prev) => prev + initialCardCount);
  };

  if (loading) {
    return <div className="px-5 sm:px-16 md:px-28 lg:px-56 flex justify-center text-gray-800 dark:text-gray-200">Loading blog posts...</div>;
  }

  if (error) {
    return <div className="px-5 sm:px-16 md:px-28 lg:px-56 flex justify-center text-red-600 dark:text-red-400">{error}</div>;
  }

  return (
    <div className="text-gray-900 dark:text-gray-100">
      {/* Language toggle button
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition mb-4"
        >
          {language === 'en' ? 'বাংলা' : 'English'}
        </button>
      </div> */}

      <CategoryButtons
        categories={["All", "Tech", "Education", "Programming", "LifeStyle", "Design", "News", "Social", "Others"]}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {filteredBlogs.slice(0, visibleCardCount).map((blog, i) => (
          <li key={blog._id || i}>
            <BlogCard 
              blog={blog} 
              language={language}
            />
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-8">
        {filteredBlogs.length > visibleCardCount && (
          buttonType === "viewMore" ? (
            <Link href="/blog">
              <div className="bg-cyan-600 dark:bg-cyan-700 text-white px-5 sm:px-8 py-2 rounded-full hover:bg-cyan-700 dark:hover:bg-cyan-800 transition-colors shadow-sm">
                View more
              </div>
            </Link>
          ) : (
            <button
              onClick={loadMoreCards}
              className="bg-cyan-600 dark:bg-cyan-700 text-white px-5 sm:px-8 py-2 rounded-full hover:bg-cyan-700 dark:hover:bg-cyan-800 transition-colors shadow-sm"
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