// components/PortfolioProjects/CardList.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Cards from "@/components/PortfolioProjects/ProjectCardTemplate";
import { topCardsData, latestCardsData, featuredCardsData } from "@/components/PortfolioProjects/ProjectData";

interface CardListProps {
  maxCards?: number;
  buttonShow?: boolean;
}

const CardList: React.FC<CardListProps> = ({ maxCards = 3, buttonShow = true }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const renderCards = () => {
    let cardsData;
    switch (selectedCategory) {
      case "Top":
        cardsData = topCardsData;
        break;
      case "Latest":
        cardsData = latestCardsData;
        break;
      case "Featured":
        cardsData = featuredCardsData;
        break;
      default:
        // Show up to `maxCards` from each category
        const topCards = topCardsData.slice(0, maxCards);
        const latestCards = latestCardsData.slice(0, maxCards);
        const featuredCards = featuredCardsData.slice(0, maxCards);
        cardsData = [...topCards, ...latestCards, ...featuredCards];
    }

    return cardsData.map((card, index) => (
      <Cards
        key={index}
        icon={card.icon}
        title={card.title}
        subtitle={card.subtitle}
        description={card.description}
      />
    ));
  };

  // Determine if the "View More" button should be displayed
  const shouldShowViewMore = buttonShow && selectedCategory === "All" && 
    (topCardsData.length + latestCardsData.length + featuredCardsData.length > maxCards * 3);

  const handleCategoryChange = (category: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setSelectedCategory(category);
  };

  return (
    <div className="px-5 sm:px-24 md:px-48 lg:px-56">
      <div className="mt-20 col-span-full flex flex-row text-gray-50 dark:text-gray-300 pb-5 items-center justify-center space-x-1">
        <Link href="#" onClick={(e) => handleCategoryChange("All", e)} className="bg-cyan-700 dark:bg-cyan-700 hover:bg-cyan-900 dark:hover:bg-cyan-900 dark:hover:text-gray-50 px-5 sm:px-8 md:px-10 py-1 sm:py-2 rounded-sm">
          All
        </Link>
        <Link href="#" onClick={(e) => handleCategoryChange("Top", e)} className="bg-cyan-700 dark:bg-cyan-700 hover:bg-cyan-900 dark:hover:bg-cyan-900 dark:hover:text-gray-50 px-5 sm:px-8 md:px-10 py-1 sm:py-2 rounded-sm">
          Top
        </Link>
        <Link href="#" onClick={(e) => handleCategoryChange("Latest", e)} className="bg-cyan-700 dark:bg-cyan-700 hover:bg-cyan-900 dark:hover:bg-cyan-900 dark:hover:text-gray-50 px-5 sm:px-8 md:px-10 py-1 sm:py-2 rounded-sm">
          Latest
        </Link>
        <Link href="#" onClick={(e) => handleCategoryChange("Featured", e)} className="bg-cyan-700 dark:bg-cyan-700 hover:bg-cyan-900 dark:hover:bg-cyan-900 dark:hover:text-gray-50 px-5 sm:px-8 md:px-10 py-1 sm:py-2 rounded-sm">
          Featured
        </Link>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {renderCards()}
      </ul>

      {shouldShowViewMore && (
        <div className="flex justify-center mt-4">
          <Link href="/portfolio" className="bg-cyan-700 dark:bg-cyan-700 hover:bg-cyan-900 dark:hover:bg-cyan-900 dark:hover:text-gray-50 px-5 sm:px-8 md:px-10 py-2 rounded-sm">
            View More
          </Link>
        </div>
      )}
    </div>
  );
};

export default CardList;
