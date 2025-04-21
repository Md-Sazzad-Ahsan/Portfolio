import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
interface CategoryButtonsProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (
    category: string,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showArrows, setShowArrows] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to handle scrolling
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }

    // Reset the hide timeout if arrows are shown
    setShowArrows(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => setShowArrows(false), 3000);
  };

  // Scroll the container when arrows are clicked
  const scrollContainer = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  // Effect to initialize hide timeout
  useEffect(() => {
    hideTimeoutRef.current = setTimeout(() => setShowArrows(false), 3000);
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative mt-12 mb-4 sm:mb-8">
      {/* Left Arrow Button */}
      {showLeftArrow && showArrows && (
        <button
        type="button"
        title="Scroll Left"
        aria-label="Scroll Left"
        className="md:hidden absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-700 bg-opacity-40 dark:bg-opacity-40 hover:bg-gray-400 dark:hover:bg-gray-600 p-2 z-10"
        onClick={() => scrollContainer("left")}
      >
        <IoIosArrowBack className="text-lg" aria-hidden="true" />
      </button>
      
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex justify-start space-x-0 overflow-x-auto scrollbar-hide bg-gray-50 dark:bg-darkBg shadow-lg"
      >
        {categories.map((category) => (
          <a
            key={category}
            href="#"
            className={`flex-1 text-center transition-all duration-300 ease-in-out ring-0 text-xs sm:text-sm font-semibold whitespace-nowrap px-5 py-2 sm:py-3 ${
              selectedCategory === category
                ? "bg-cyan-700 text-gray-50 shadow-xl hover:bg-cyan-600"
                : "bg-gray-50 dark:bg-darkBg text-darkBg dark:text-gray-50 hover:bg-cyan-600 dark:hover:bg-cyan-600 hover:text-white"
            }`}
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor click behavior
              onCategoryChange(category, e); // Call the change handler
            }}
          >
            <span className="relative z-10">{category}</span>
          </a>
        ))}
      </div>

      {/* Right Arrow Button */}
      {showRightArrow && showArrows && (
        <button
        type="button"
        title="Scroll Right"
        aria-label="Scroll Right"
        className="md:hidden absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-700 bg-opacity-40 dark:bg-opacity-40 hover:bg-gray-400 dark:hover:bg-gray-600 p-2 z-10"
        onClick={() => scrollContainer("right")}
      >
        <IoIosArrowForward className="text-lg" aria-hidden="true" />
      </button>
      
      )}
    </div>
  );
};

export default CategoryButtons;
