"use client";
import React from "react";
import { motion } from "framer-motion";

interface ExperienceCardProps {
  title: string;
  company: string;
  date: string;
  description: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  date,
  description,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="w-full max-w-7xl pt-5 md:pt-8 px-5 md:px-10 lg:px-16 bg-gray-50 dark:bg-darkBg text-gray-700 dark:text-white mx-auto"
    >
      <div className="flex flex-col md:flex-row gap-8 md:gap-20">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 pt-2">
            <span className="underline text-blue-400">{company}</span> — {date}
          </p>
        </div>
        <div className="w-full md:w-1/2 text-gray-600 dark:text-gray-200 text-sm sm:text-base leading-relaxed mb-20">
          {description}
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
