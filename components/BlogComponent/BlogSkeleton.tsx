import React from 'react';

const BlogCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton (responsive aspect ratio) */}
      <div className="w-full aspect-[16/9] bg-gray-300 dark:bg-gray-700"></div>
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Category and date skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-14 sm:w-16"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16 sm:w-20"></div>
        </div>
        
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-11/12"></div>
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
        
        {/* Button skeleton */}
        <div className="flex items-center space-x-2 pt-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 sm:w-32"></div>
        </div>
      </div>
    </div>
  );
};

const BlogGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="text-gray-900 dark:text-gray-100 my-5">
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
