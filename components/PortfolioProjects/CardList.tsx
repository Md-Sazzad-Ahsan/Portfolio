"use client";
import React, { useState } from "react";
import Link from "next/link";
import Cards from "@/components/PortfolioProjects/ProjectCardTemplate";
import { topCardsData, latestCardsData, featuredCardsData } from "@/components/PortfolioProjects/ProjectData";
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

  const shouldShowViewMore = buttonShow && selectedCategory === "All" && 
    (topCardsData.length + latestCardsData.length + featuredCardsData.length > maxCards * 3);

  return (
    <div className="px-5 sm:px-24 md:px-48 lg:px-56">
      <CategoryButtons
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}  // Pass the handler to the CategoryButtons component
      />

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
