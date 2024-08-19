"use client";

import React from "react";
import ProjectCardTemplate from "@/components/PortfolioProjects/ProjectCardTemplate";

interface CardGridProps {
  cardsToDisplay: any[];
}

const CardGrid: React.FC<CardGridProps> = ({ cardsToDisplay }) => {
  return (
    <ul className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
};

export default CardGrid;
