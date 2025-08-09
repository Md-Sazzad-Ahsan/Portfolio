import React from 'react';

const BlogCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Category and date skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
        </div>
        
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
        
        {/* Author skeleton */}
        <div className="flex items-center space-x-2 pt-2">
          <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

const BlogGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  // Predefined widths to avoid hydration mismatch
  const categoryWidths = [80, 95, 110, 75, 120, 85, 100, 90, 105];
  
  return (
    <div className="text-gray-900 dark:text-gray-100">
      {/* Category buttons skeleton */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="h-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"
            style={{ width: `${categoryWidths[i]}px` }}
          ></div>
        ))}
      </div>

      {/* Blog cards skeleton */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {Array.from({ length: count }).map((_, i) => (
          <li key={i}>
            <BlogCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { BlogCardSkeleton, BlogGridSkeleton };
