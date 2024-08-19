"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ProjectCardTemplate from "@/components/PortfolioProjects/ProjectCardTemplate";
import { allProjectsData } from "@/components/PortfolioProjects/ProjectData";
import CategoryButtons from "@/components/PortfolioProjects/CategoryButtons";
import { RiArrowRightWideFill, RiArrowLeftWideFill } from "react-icons/ri";

interface CardListProps {
  maxCards?: number;
  buttonShow?: boolean;
}

const CardList: React.FC<CardListProps> = ({ maxCards = 3, buttonShow = true }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showButtons, setShowButtons] = useState<boolean>(true);
  const [cardScales, setCardScales] = useState<number[]>(Array(maxCards).fill(1));
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const hideButtonsTimeout = useRef<NodeJS.Timeout | null>(null);

  const filteredProjects = allProjectsData.filter(project =>
    (project.displayInto || []).includes(selectedCategory) || selectedCategory === "All"
  );

  const cardsToDisplay = filteredProjects.slice(0, maxCards);

  const handleCategoryChange = (category: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setSelectedCategory(category);
    resetCarousel();
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      const newScrollLeft = direction === "right"
        ? Math.min(carouselRef.current.scrollLeft + scrollAmount, carouselRef.current.scrollWidth - carouselRef.current.clientWidth)
        : Math.max(carouselRef.current.scrollLeft - scrollAmount, 0);

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });

      resetHideButtonsTimer();
    }
  };

  useEffect(() => {
    const updateCardScales = () => {
      if (carouselRef.current) {
        const cards = Array.from(carouselRef.current.children) as HTMLElement[];
        const scrollLeft = carouselRef.current.scrollLeft;
        const viewportCenter = scrollLeft + carouselRef.current.clientWidth / 2;
        const maxDistance = carouselRef.current.clientWidth / 2;

        const newScales = cards.map(card => {
          const cardCenter = card.offsetLeft + card.clientWidth / 2;
          const distance = Math.abs(cardCenter - viewportCenter);
          const scale = 1 - (distance / maxDistance) * 0.2;
          return Math.max(scale, 0.8);
        });

        setCardScales(newScales);
      }
    };

    updateCardScales();
    const currentCarouselRef = carouselRef.current;
    currentCarouselRef?.addEventListener("scroll", updateCardScales);
    return () => {
      currentCarouselRef?.removeEventListener("scroll", updateCardScales);
    };
  }, [cardsToDisplay.length]); // Use length as dependency to avoid infinite loops

  const resetCarousel = () => {
    carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const resetHideButtonsTimer = () => {
    setShowButtons(true);
    if (hideButtonsTimeout.current) clearTimeout(hideButtonsTimeout.current);
    hideButtonsTimeout.current = setTimeout(() => setShowButtons(false), 3000);
  };

  return (
    <div className="relative px-5 sm:px-16 md:px-48 lg:px-56">
      <CategoryButtons
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Mobile Scroll Carousel */}
      <div className="sm:hidden relative">
        <motion.div
          ref={carouselRef}
          className="flex space-x-4 overflow-x-auto no-scrollbar snap-x snap-mandatory"
          whileTap={{ cursor: "grabbing" }}
          onMouseEnter={() => setShowButtons(true)}
          onMouseLeave={resetHideButtonsTimer}
        >
          {cardsToDisplay.map((card, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 snap-start"
              style={{ width: '87vw', maxWidth: '600px', transform: `scale(${cardScales[index]})` }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCardTemplate
                imageSrc={card.imageSrc}
                category={card.category}
                headline={card.headline}
                description={card.description}
                link={card.link}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Buttons */}
        {showButtons && (
          <>
            <button 
              onClick={() => scrollCarousel("left")} 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-30 text-white hover:bg-opacity-50 p-1">
              <RiArrowLeftWideFill size={28} />
            </button>
            <button 
              onClick={() => scrollCarousel("right")} 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-30 text-white hover:bg-opacity-50 p-1">
              <RiArrowRightWideFill size={28} />
            </button>
          </>
        )}
      </div>

      {/* Grid layout for larger screens */}
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
