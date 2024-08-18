"use client";

import React, { useState } from "react";
import Link from "next/link";
import ProjectCardTemplate from "@/components/PortfolioProjects/ProjectCardTemplate";
import { allProjectsData } from "@/components/PortfolioProjects/ProjectData";
import CategoryButtons from "@/components/PortfolioProjects/CategoryButtons";

interface CardListProps {
  maxCards?: number;
  buttonShow?: boolean;
}

const CardList: React.FC<CardListProps> = ({ maxCards = 3, buttonShow = true }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const handleCategoryChange = (category: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setSelectedCategory(category);
  };

  // Filter and display the projects based on `displayInto` property
  const filteredProjects = allProjectsData.filter(project => 
    (project.displayInto || []).includes(selectedCategory) || selectedCategory === "All"
  );

  const cardsToDisplay = filteredProjects.slice(0, maxCards);

  const shouldShowViewMore = buttonShow && selectedCategory === "All" && filteredProjects.length > maxCards;

  return (
    <div className="px-5 sm:px-24 md:px-48 lg:px-56">
      <CategoryButtons
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardsToDisplay.map((card, index) => (
          <ProjectCardTemplate
            key={index}
            imageSrc={card.imageSrc}
            category={card.category}
            headline={card.headline}
            description={card.description}
            link={card.link}
          />
        ))}
      </ul>

      {shouldShowViewMore && (
        <div className="flex justify-center mt-4">
          <Link href="/portfolio" className="bg-cyan-700 hover:bg-cyan-900 text-gray-50 px-5 sm:px-8 md:px-10 py-2 rounded-md">
            View More
          </Link>
        </div>
      )}
    </div>
  );
};

export default CardList;
