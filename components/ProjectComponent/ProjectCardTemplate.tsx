import React from "react";
import Image from "next/image";
import {HiArrowLongRight } from "react-icons/hi2";
import Link from "next/link";

interface ProjectCardTemplateProps {
  imageSrc: string;
  category: string;
  headline: string;
  description: string;
  link: string;
}

const ProjectCardTemplate: React.FC<ProjectCardTemplateProps> = ({ imageSrc, category, headline, description, link }) => {
  return (
    <Link href={link} className="block">
    <div className="bg-gray-50 dark:bg-darkBg flex flex-col ring-white shadow-lg sm:shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 rounded-sm h-[22rem] w-full"> {/* Set a fixed height */}
      <div className="relative w-full h-52">
        <Image src={imageSrc} alt={headline} priority fill sizes="cover" />
        <div className="absolute inset-0">
         <button className="text-sm font-semibold text-gray-50 bg-darkBg bg-opacity-50 px-4 py-1">{category}</button>
        </div>
      </div>
      <div className="flex flex-col justify-between flex-grow px-2 "> {/* Adjust the flex layout */}
      <div>
        {/* <p className="text-xs text-gray-500">27 AUG 2024</p> */}
        <h2 className="text-xl py-1 font-bold text-cyan-600">{headline}</h2>
        <p className="text-sm text-gray-700 dark:text-gray-50 pb-1">{description}</p>
       </div>
        <div className="mt-auto flex items-center group py-1">
          <span className="text-cyan-600 hover:underline ">
            View Project 
          </span>
          <HiArrowLongRight className="pt-1 ml-1 text-cyan-500" />
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ProjectCardTemplate;
