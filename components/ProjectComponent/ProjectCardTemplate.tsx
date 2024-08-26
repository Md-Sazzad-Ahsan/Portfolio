import React from "react";
import Image from "next/image";
import {HiMiniArrowLongRight } from "react-icons/hi2";

interface ProjectCardTemplateProps {
  imageSrc: string;
  category: string;
  headline: string;
  description: string;
  link: string;
}

const ProjectCardTemplate: React.FC<ProjectCardTemplateProps> = ({ imageSrc, category, headline, description, link }) => {
  return (
    <li className="bg-gray-50 dark:bg-darkBg flex flex-col p-4 ring-white shadow-lg sm:shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md h-[28rem] w-full"> {/* Set a fixed height */}
      <div className="relative w-full h-52 flex-shrink-0">
        <Image src={imageSrc} alt={headline} priority fill sizes="cover" />
      </div>
      <div className="flex flex-col justify-between flex-grow mt-2"> {/* Adjust the flex layout */}
        <div>
          <p className="text-sm text-gray-500">{category}</p>
          <h2 className="text-xl py-1 font-bold text-cyan-600">{headline}</h2>
          <p className="text-gray-700 dark:text-gray-50 pb-3">{description}</p>
        </div>
        <div className="mt-auto flex items-center group">
          <a href={link} className="text-cyan-600 hover:underline">
            View Project 
          </a>
          <HiMiniArrowLongRight className="pt-1 ml-1 text-cyan-500" />
        </div>
      </div>
    </li>
  );
};

export default ProjectCardTemplate;
