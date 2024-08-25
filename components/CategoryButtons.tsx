"use client";

import React from "react";

interface CategoryButtonsProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string, event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="mt-12 mb-4 sm:mb-8">
      <div className="flex justify-start space-x-0 overflow-x-auto scrollbar-hide bg-gray-50 dark:bg-darkBg shadow-lg">
        {categories.map((category) => (
          <a
            key={category}
            href="#"
            className={`flex-1 text-center transition-all duration-300 ease-in-out ring-0 text-xs sm:text-sm font-semibold whitespace-nowrap px-5 py-3 ${
              selectedCategory === category
                ? "bg-cyan-700 text-gray-50 scale-100 shadow-xl hover:bg-cyan-600"
                : "bg-gray-50 dark:bg-darkBg text-darkBg dark:text-gray-50 hover:bg-cyan-600 dark:hover:bg-cyan-600 hover:text-white"
            }`}
            onClick={(e) => onCategoryChange(category, e)}
          >
            <span className="relative z-10">{category}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CategoryButtons;
