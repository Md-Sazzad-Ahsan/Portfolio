"use client";

import React from "react";

interface CategoryButtonsProps {
  selectedCategory: string;
  onCategoryChange: (category: string, event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="px-5 sm:px-24 md:px-48 lg:px-56 mt-20 col-span-full flex flex-row text-gray-50 dark:text-gray-300 pb-5 items-center justify-center space-x-1">
      <a
        href="#"
        onClick={(e) => onCategoryChange("All", e)}
        className={`bg-cyan-700 dark:bg-cyan-700 hover:bg-cyan-900 dark:hover:bg-cyan-900 dark:hover:text-gray-50 px-5 sm:px-8 md:px-10 py-1 sm:py-2 rounded-sm ${
          selectedCategory === "All" ? "bg-cyan-900" : ""
        }`}
      >
        All
      </a>
      <a
        href="#"
        onClick={(e) => onCategoryChange("Top", e)}
        className={`bg-cyan-700 dark:bg-cyan-700 hover:bg-cyan-900 dark:hover:bg-cyan-900 dark:hover:text-gray-50 px-5 sm:px-8 md:px-10 py-1 sm:py-2 rounded-sm ${
          selectedCategory === "Top" ? "bg-cyan-900" : ""
        }`}
      >
        Top
      </a>
      <a
        href="#"
        onClick={(e) => onCategoryChange("Latest", e)}
        className={`bg-cyan-700 dark:bg-cyan-700 hover:bg-cyan-900 dark:hover:bg-cyan-900 dark:hover:text-gray-50 px-5 sm:px-8 md:px-10 py-1 sm:py-2 rounded-sm ${
          selectedCategory === "Latest" ? "bg-cyan-900" : ""
        }`}
      >
        Latest
      </a>
      <a
        href="#"
        onClick={(e) => onCategoryChange("Featured", e)}
        className={`bg-cyan-700 dark:bg-cyan-700 hover:bg-cyan-900 dark:hover:bg-cyan-900 dark:hover:text-gray-50 px-5 sm:px-8 md:px-10 py-1 sm:py-2 rounded-sm ${
          selectedCategory === "Featured" ? "bg-cyan-900" : ""
        }`}
      >
        Featured
      </a>
    </div>
  );
};

export default CategoryButtons;
