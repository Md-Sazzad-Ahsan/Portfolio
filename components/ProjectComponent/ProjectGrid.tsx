"use client";
import React, { useState, useEffect } from "react";
import ProjectCardTemplate from "@/components/ProjectComponent/ProjectCardTemplate"; // Adjust the path as necessary
import CategoryButtons from "@/components/GlobalComponents/CategoriesButton"; // Adjust the path as necessary
import { ProjectData } from "@/components/ProjectComponent/ProjectData"; // Adjust the path to where BlogData.tsx is located
import Link from 'next/link'; // Import Link from Next.js

interface BlogGridProps {
  initialCardCount?: number; // Optional prop to define how many cards to show initially
  buttonType: 'viewMore' | 'loadMore'; // Prop to decide which button to show
}

const BlogGrid: React.FC<BlogGridProps> = ({ initialCardCount = 6, buttonType }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCardCount, setVisibleCardCount] = useState<number>(initialCardCount); // State to manage visible cards

  // Filtered data based on selected category
  const filteredProjects = selectedCategory === "All"
    ? ProjectData // Show all cards when "All" is selected
    : ProjectData.filter((project) => project.displayInto.includes(selectedCategory)); // Filter based on exact category match

  // Handler for category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCardCount(initialCardCount); // Reset visible cards when category changes
  };

  // Reset visibleCardCount if the category changes
  useEffect(() => {
    setVisibleCardCount(initialCardCount);
  }, [initialCardCount, selectedCategory]);

  // Load more cards function
  const loadMoreCards = () => {
    setVisibleCardCount((prevCount) => prevCount + initialCardCount); // Increase the number of visible cards
  };

  return (
    <div className="px-5 sm:px-16 md:px-28 lg:px-56">
      {/* Category Selection Buttons */}
      <CategoryButtons
        categories={["All", "App", "UI/UX", "Software", "Website", "E-commerce", "AI", "Games", "Personal"]}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Grid of Cards - show only visibleCardCount cards */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
        {filteredProjects.slice(0, visibleCardCount).map((project) => (
          <ProjectCardTemplate
            key={project.headline}
            imageSrc={project.imageSrc}
            category={project.category}
            headline={project.headline}
            description={project.description}
            link={project.link}
          />
        ))}
      </ul>

      {/* Conditional Button Rendering */}
      <div className="flex justify-center mt-4">
        {buttonType === 'viewMore' ? (
          filteredProjects.length > visibleCardCount && ( // Show "View More" if there are more cards to show
            <Link href="/portfolio">
              <div className="bg-cyan-600 text-white text-sm md:text-md px-5 sm:px-8 py-1 sm:py-2 rounded hover:bg-cyan-700 transition">View more</div>
            </Link>
          )
        ) : (
          filteredProjects.length > visibleCardCount && ( // Show "Load More" if there are more cards to load
            <button
              onClick={loadMoreCards}
              className="bg-cyan-600 text-white text-sm md:text-md px-5 sm:px-8 py-1 sm:py-2 rounded hover:bg-cyan-700 transition"
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
