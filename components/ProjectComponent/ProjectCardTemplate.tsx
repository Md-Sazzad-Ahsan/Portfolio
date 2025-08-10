import React, { useState } from "react";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectCardTemplateProps {
  imageSrc: string;
  category: string;
  headline: string;
  description: string;
  link: string;
}

const ProjectCardTemplate: React.FC<ProjectCardTemplateProps> = ({
  imageSrc,
  category,
  headline,
  description,
  link,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={link} className="block h-full group" aria-label={`View project: ${headline}`}>
      <motion.div 
        className="h-full flex flex-col bg-white dark:bg-darkBg rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="relative w-full h-52 overflow-hidden">
          <div className="relative w-full h-full">
            <Image 
              src={imageSrc} 
              alt={headline} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
              aria-hidden="true"
            />
            <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-600 text-white">
              {category}
            </span>
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex-grow">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {headline}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
              {description}
            </p>
          </div>
          
          <div className="mt-auto flex items-center text-cyan-600 dark:text-cyan-400 font-medium text-sm">
            <span className="group-hover:underline">View Project</span>
            <motion.span
              animate={{
                x: isHovered ? 4 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="ml-1.5"
            >
              <GoArrowUpRight className="w-4 h-4" />
            </motion.span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCardTemplate;
