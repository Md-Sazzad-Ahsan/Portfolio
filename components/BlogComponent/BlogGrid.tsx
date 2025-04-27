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
  // CHANGED: state to hold API data instead of static import
  const [blogsData, setBlogsData] = useState<BlogItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCardCount, setVisibleCardCount] = useState<number>(initialCardCount);

  // CHANGED: fetch from /api/blogs on mount
  useEffect(() => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then((data: BlogItem[]) => setBlogsData(data))
      .catch(err => console.error("Failed to load blogs:", err));
  }, []);

  // CHANGED: filter the fetched data
  const filteredBlogs = selectedCategory === "All"
   ? blogsData
   : blogsData.filter(b =>
       b.displayInto.some(tab => 
         tab.toLowerCase() === selectedCategory.toLowerCase()
       )
     );
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCardCount(initialCardCount);
  };

  const loadMoreCards = () => {
    setVisibleCardCount(prev => prev + initialCardCount);
  };

  return (
    <div className="px-5 sm:px-16 md:px-28 lg:px-56">
      <CategoryButtons
        categories={["All","Tech","News","Programming","LifeStyle","Design","Social","Education","Others"]}
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
