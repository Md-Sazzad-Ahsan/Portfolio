import React from "react";
import Image from "next/image";

interface ProjectCardTemplateProps {
  imageSrc: string;
  category: string;
  headline: string;
  description: string;
  link: string;
}

const ProjectCardTemplate: React.FC<ProjectCardTemplateProps> = ({ imageSrc, category, headline, description, link }) => {
  return (
    <li className="bg-gray-50 dark:bg-darkBg flex flex-col p-4 m-2 sm:m-0 ring-white shadow-xl hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
      <div className="relative w-full h-52">
        <Image src={imageSrc} alt={headline} priority fill sizes="cover" />
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">{category}</p>
        <h2 className="text-xl mt-1 font-bold text-cyan-600">{headline}</h2>
        <p className=" text-gray-700 dark:text-gray-50 pb-3">{description}</p>
        <a href={link} className="mt-5 text-cyan-600 hover:underline">
          Read Article
        </a>
      </div>
    </li>
  );
};

export default ProjectCardTemplate;
