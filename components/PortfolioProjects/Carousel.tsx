"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RiArrowRightWideFill, RiArrowLeftWideFill } from "react-icons/ri";
import ProjectCardTemplate from "@/components/PortfolioProjects/ProjectCardTemplate";

interface CarouselProps {
  cardsToDisplay: any[];
}

const Carousel: React.FC<CarouselProps> = ({ cardsToDisplay }) => {
  const [showButtons, setShowButtons] = useState<boolean>(true);
  const [cardScales, setCardScales] = useState<number[]>(Array(cardsToDisplay.length).fill(1));
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const hideButtonsTimeout = useRef<NodeJS.Timeout | null>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      const newScrollLeft = direction === "right"
        ? Math.min(carouselRef.current.scrollLeft + scrollAmount, carouselRef.current.scrollWidth - carouselRef.current.clientWidth)
        : Math.max(carouselRef.current.scrollLeft - scrollAmount, 0);

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
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
  }, [cardsToDisplay.length]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  }, [cardsToDisplay]);

  const resetHideButtonsTimer = () => {
    setShowButtons(true);
    if (hideButtonsTimeout.current) clearTimeout(hideButtonsTimeout.current);
    hideButtonsTimeout.current = setTimeout(() => setShowButtons(false), 3000);
  };

  return (
    <div className="relative">
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
            style={{ width: '92vw', maxWidth: '600px', transform: `scale(${cardScales[index]})` }}
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
  );
};

export default Carousel;
