"use client";

import React from "react";

interface CategoryButtonsProps {
  categories: string[]; // Categories passed as props
  selectedCategory: string;
  onCategoryChange: (category: string, event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex justify-between mt-12 mb-4 sm:mb-8 bg-gray-50 dark:bg-darkBg shadow-md">
      {categories.map((category) => (
        <a
          key={category}
          href="#"
          className={`relative px-1 sm:px-3 md:px-5 py-2 sm:py-2 md:py-3 text-center w-full transition-all duration-300 ease-in-out ring-0 text-xs sm:text-sm ${
            selectedCategory === category
              ? "bg-cyan-700 text-white scale-100 shadow-xl hover:bg-cyan-600"
              : "bg-gray-50 dark:bg-darkBg text-darkBg dark:text-gray-50 hover:bg-cyan-600 dark:hover:bg-cyan-600 hover:text-white"
          }`}
          onClick={(e) => onCategoryChange(category, e)}
        >
          <span className="relative z-10">{category}</span>
        </a>
      ))}
    </div>
  );
};

export default CategoryButtons;
