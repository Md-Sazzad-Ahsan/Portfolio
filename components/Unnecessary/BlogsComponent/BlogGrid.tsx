"use client";

import React from "react";
import BlogCardTemplate from "@/components/Unnecessary/BlogsComponent/BlogCardTemplate";

interface BlogGridProps {
  blogsToDisplay: any[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ blogsToDisplay }) => {
  return (
    <ul className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
      {blogsToDisplay.map((blog, index) => (
        <BlogCardTemplate
          key={index}
          imageSrc={blog.imageSrc}
          category={blog.category}
          headline={blog.headline}
          description={blog.description}
          link={blog.link}
        />
      ))}
    </ul>
  );
};

export default BlogGrid;
