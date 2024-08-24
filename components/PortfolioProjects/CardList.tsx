"use client";

import React, { useState } from "react";
import Link from "next/link";
import { allProjectsData } from "@/components/PortfolioProjects/ProjectData";
import CategoryButtons from "../CategoryButtons";
import Carousel from "../Carousel";
import CardGrid from "./CardGrid";
interface CardListProps {
  maxCards?: number;
  buttonShow?: boolean;
}

const CardList: React.FC<CardListProps> = ({ maxCards = 3, buttonShow = true }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects = allProjectsData.filter(project =>
    (project.displayInto || []).includes(selectedCategory) || selectedCategory === "All"
  );

  const cardsToDisplay = filteredProjects.slice(0, maxCards);

  const handleCategoryChange = (category: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setSelectedCategory(category);
  };
  const categories = ["All", "Top", "Latest", "Featured"];

  return (
    <div className="relative px-5 sm:px-16 md:px-28 lg:px-56">
      <CategoryButtons selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} categories={categories} />

      <div className="sm:hidden">
        <Carousel cardsToDisplay={cardsToDisplay} />
      </div>

      <CardGrid cardsToDisplay={cardsToDisplay} />

      {buttonShow && selectedCategory === "All" && filteredProjects.length > maxCards && (
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
