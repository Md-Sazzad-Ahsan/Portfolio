"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import ProjectCardTemplate from "@/components/ProjectComponent/ProjectCardTemplate"; // Adjust the path as necessary
import { ProjectData } from "@/components/ProjectComponent/ProjectData"; // Adjust the path to where BlogData.tsx is located
import Link from 'next/link'; // Import Link from Next.js

interface BlogGridProps {
  initialCardCount?: number; // Optional prop to define how many cards to show initially
  buttonType: 'viewMore' | 'loadMore'; // Prop to decide which button to show
}

const BlogGrid: React.FC<BlogGridProps> = ({ initialCardCount = 6, buttonType }) => {
  const router = useRouter();
  const [visibleCardCount, setVisibleCardCount] = useState<number>(initialCardCount); // State to manage visible cards

  // All projects (categories removed)
  const filteredProjects = ProjectData;

  // Reset visibleCardCount if the initial count prop changes
  useEffect(() => {
    setVisibleCardCount(initialCardCount);
  }, [initialCardCount]);

  // Load more cards function
  const loadMoreCards = () => {
    setVisibleCardCount((prevCount) => prevCount + initialCardCount); // Increase the number of visible cards
  };

  return (
    <div className="">
      {/* Grid of Cards - show only visibleCardCount cards */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {filteredProjects.slice(0, visibleCardCount).map((project) => (
          <ProjectCardTemplate
            key={project.headline}
            imageSrc={project.imageSrc}
            headline={project.headline}
            description={project.description}
            link={project.link}
          />
        ))}
      </ul>

      {/* Conditional Button Rendering */}
      <div className="flex justify-center mt-4">
        {buttonType === 'viewMore' ? (
          filteredProjects.length > visibleCardCount && (
            <Link
              href="/portfolio"
              aria-label="View more projects"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-700 dark:to-blue-700 text-white px-6 sm:px-10 py-3 mt-5 rounded-lg hover:from-cyan-700 hover:to-blue-700 dark:hover:from-cyan-800 dark:hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium mb-4 pointer-events-auto relative z-20"
              onClick={(e) => { e.preventDefault(); router.push('/portfolio'); }}
            >
              <span>View All Projects</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )
        ) : (
          filteredProjects.length > visibleCardCount && (
            <button
              onClick={loadMoreCards}
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-700 dark:to-blue-700 text-white px-6 sm:px-10 py-3 mt-5 rounded-lg hover:from-cyan-700 hover:to-blue-700 dark:hover:from-cyan-800 dark:hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium mb-4"
            >
              <span>Load More Project</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default BlogGrid;
