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
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showButtons, setShowButtons] = useState<boolean>(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const hideButtonsTimeout = useRef<NodeJS.Timeout | null>(null);

  const filteredProjects = allProjectsData.filter(project =>
    (project.displayInto || []).includes(selectedCategory) || selectedCategory === "All"
  );

  const cardsToDisplay = filteredProjects.slice(0, maxCards);
  const totalCards = cardsToDisplay.length;

  const handleCategoryChange = (category: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setSelectedCategory(category);
    resetCarousel();
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      const newIndex = direction === "right"
        ? Math.min(activeIndex + 1, totalCards - 1)
        : Math.max(activeIndex - 1, 0);

      setActiveIndex(newIndex);
      carouselRef.current.scrollTo({
        left: scrollAmount * newIndex,
        behavior: "smooth"
      });

      resetHideButtonsTimer();
    }
  };

  const updateActiveIndex = () => {
    if (carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft;
      const cardWidth = carouselRef.current.clientWidth * 0.8;
      const newIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(newIndex);
    }
  };

  useEffect(() => {
    const currentCarouselRef = carouselRef.current;

    if (currentCarouselRef) {
      currentCarouselRef.addEventListener('scroll', updateActiveIndex);
    }

    return () => {
      currentCarouselRef?.removeEventListener('scroll', updateActiveIndex);
    };
  }, [cardsToDisplay]);

  const resetCarousel = () => {
    setActiveIndex(0);
    carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const resetHideButtonsTimer = () => {
    setShowButtons(true);
    if (hideButtonsTimeout.current) clearTimeout(hideButtonsTimeout.current);
    hideButtonsTimeout.current = setTimeout(() => setShowButtons(false), 3000);
  };

  return (
    <div className="relative px-5 sm:px-24 md:px-48 lg:px-56">
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
              style={{ width: '90vw', maxWidth: '600px' }}
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
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-30 text-white hover:bg-opacity-50 p-1 ${activeIndex === 0 ? 'opacity-0 pointer-events-none' : ''}`}>
              <RiArrowLeftWideFill size={28} />
            </button>
            <button 
              onClick={() => scrollCarousel("right")} 
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-30 text-white hover:bg-opacity-50 p-1 ${activeIndex >= totalCards - 1 ? 'opacity-0 pointer-events-none' : ''}`}>
              <RiArrowRightWideFill size={28} />
            </button>
          </>
        )}

        {/* Carousel Navigation Dots */}
        <div className="flex justify-center mt-4">
          {cardsToDisplay.map((_, index) => (
            <motion.div 
              key={index}
              className={`h-2 w-2 mx-1 rounded-full ${index === activeIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
              initial={{ scale: 1 }}
              animate={{ scale: index === activeIndex ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          ))}
        </div>
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
