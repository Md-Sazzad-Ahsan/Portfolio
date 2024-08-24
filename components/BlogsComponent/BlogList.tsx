"use client";

import React, { useState } from "react";
import Link from "next/link";
import { allBlogsData } from "@/components/BlogsComponent/BlogData";
import CategoryButtons from "@/components/CategoryButtons";
import Carousel from "@/components/Carousel";
import BlogGrid from "@/components/BlogsComponent/BlogGrid";
interface BlogListProps {
  maxBlogs?: number;
  buttonShow?: boolean;
}

const BlogList: React.FC<BlogListProps> = ({ maxBlogs = 3, buttonShow = true }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects = allBlogsData.filter(blog =>
    (blog.displayInto || []).includes(selectedCategory) || selectedCategory === "All"
  );

  const BlogsToDisplay = filteredProjects.slice(0, maxBlogs);

  const handleCategoryChange = (category: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setSelectedCategory(category);
  };
  const categories = ["All", "LifeStyle", "Tech","Education","Social"];

  return (
    <div className="relative px-5 sm:px-16 md:px-28 lg:px-56">
      <CategoryButtons selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} categories={categories} />

      <div className="sm:hidden">
        <Carousel cardsToDisplay={BlogsToDisplay} />
      </div>

      <BlogGrid blogsToDisplay={BlogsToDisplay} />

      {buttonShow && selectedCategory === "All" && filteredProjects.length > maxBlogs && (
        <div className="flex justify-center mt-4">
          <Link href="/blog" className="bg-cyan-700 hover:bg-cyan-900 text-gray-50 px-5 sm:px-8 md:px-10 py-2 rounded-md">
            View More
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogList;
