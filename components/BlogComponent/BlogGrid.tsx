"use client";
import React, { useState, useEffect } from "react";
import BlogCardTemplate from "@/components/BlogComponent/BlogCardTemplate";
import CategoryButtons from "@/components/GlobalComponents/CategoriesButton";
import Link from "next/link";

interface BlogItem {
  title: string;
  imageSrc: string;
  category: string;
  description: string;
  link: string;
  displayInto: string[];
}

interface BlogGridProps {
  initialCardCount?: number;
  buttonType: "viewMore" | "loadMore";
}

const BlogGrid: React.FC<BlogGridProps> = ({ initialCardCount = 6, buttonType }) => {
  const [blogsData, setBlogsData] = useState<BlogItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCardCount, setVisibleCardCount] = useState<number>(initialCardCount);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: BlogItem[] = await res.json();
        setBlogsData(data);
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
  : blogsData.filter((b) => {
      console.log("Checking blog:", b.title, "with displayInto:", b.displayInto);
      if (Array.isArray(b.displayInto)) {
        const normalizedTabs = b.displayInto.map((tab) => {
          if (typeof tab === 'string') {
            return (tab as string).trim().toLowerCase();
          }
          console.warn(`- Unexpected non-string value in displayInto array for blog: ${b.title}`, tab);
          return ''; // Or some other appropriate default
        });
        const normalizedCategory = (selectedCategory as string).trim().toLowerCase();
        const includesCategory = normalizedTabs.includes(normalizedCategory);
        console.log(` - Normalized Tabs: ${normalizedTabs}, Normalized Category: ${normalizedCategory}, Includes: ${includesCategory}`);
        return includesCategory;
      } else if (typeof b.displayInto === 'string') {
        const normalizedTab = (b.displayInto as string).trim().toLowerCase();
        const normalizedCategory = (selectedCategory as string).trim().toLowerCase();
        const includesCategory = normalizedTab === normalizedCategory;
        console.log(` - Normalized Tab (string): ${normalizedTab}, Normalized Category: ${normalizedCategory}, Includes: ${includesCategory}`);
        return includesCategory;
      }
      console.warn(`- displayInto is not an array or string for blog: ${b.title}`, b.displayInto);
      return false;
    });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCardCount(initialCardCount);
  };

  const loadMoreCards = () => {
    setVisibleCardCount((prev) => prev + initialCardCount);
  };

  if (loading) {
    return <div className="px-5 sm:px-16 md:px-28 lg:px-56">Loading blog posts...</div>;
  }

  if (error) {
    return <div className="px-5 sm:px-16 md:px-28 lg:px-56 text-red-500">{error}</div>;
  }

  return (
    <div className="px-5 sm:px-16 md:px-28 lg:px-56">
      <CategoryButtons
        categories={["All", "Tech", "Education", "Programming", "LifeStyle", "Design", "News", "Social", "Others"]}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {filteredBlogs.slice(0, visibleCardCount).map((b, i) => (
          <BlogCardTemplate
            key={i}
            imageSrc={b.imageSrc}
            category={b.category}
            headline={b.title}
            description={b.description}
            link={b.link}
          />
        ))}
      </ul>

      <div className="flex justify-center mt-4">
        {filteredBlogs.length > visibleCardCount && (
          buttonType === "viewMore" ? (
            <Link href="/blog">
              <div className="bg-cyan-600 text-white px-5 py-2 rounded hover:bg-cyan-700">
                View more
              </div>
            </Link>
          ) : (
            <button
              onClick={loadMoreCards}
              className="bg-cyan-600 text-white px-5 py-2 rounded hover:bg-cyan-700"
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