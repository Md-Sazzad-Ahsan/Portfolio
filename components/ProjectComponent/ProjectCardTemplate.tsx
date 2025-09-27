import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectCardTemplateProps {
  imageSrc: string;
  headline: string;
  description: string;
}

const ProjectCardTemplate: React.FC<ProjectCardTemplateProps> = ({
  imageSrc,
  headline,
  description,
}) => {
  // Build slug from headline and construct canonical portfolio path
  const slugify = (s: string) => s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumerics with dashes
    .replace(/^-+|-+$/g, "");    // trim leading/trailing dashes

  const href = `/portfolio/${slugify(headline)}`;

  return (
    <Link href={href} className="block h-full group" aria-label={`View project: ${headline}`}>
      <motion.div 
        className="h-full flex flex-col bg-white dark:bg-darkBg rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative w-full h-56 md:h-52 overflow-hidden">
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
          </div>
        </div>
        
        <div className="px-4 py-3 flex flex-col flex-grow">
          <div className="flex-grow">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {headline}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCardTemplate;
