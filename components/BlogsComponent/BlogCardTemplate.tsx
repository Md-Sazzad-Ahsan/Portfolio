import Image from "next/image";

interface ProjectCardTemplateProps {
  imageSrc: string;
  category: string;
  headline: string;
  description: string;
  link: string;
}

const BlogCardTemplate: React.FC<ProjectCardTemplateProps> = ({ imageSrc, category, headline, description, link }) => {
  return (
    <li className="bg-gray-50 dark:bg-darkBg flex flex-col p-2 sm:p-4 m-2 sm:m-0 ring-white shadow-xl sm:shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md sm:rounded-none sm:h-[28rem] sm:w-full">
      <div className="relative w-full h-52">
        <Image src={imageSrc} alt={headline} priority fill sizes="cover" />
      </div>
      <div className="flex flex-col justify-between flex-grow mt-2">
       <div>
         <p className="text-sm text-gray-500">{category}</p>
        <h2 className="text-2xl py-1 font-bold text-cyan-600">{headline}</h2>
        <p className=" text-gray-700 dark:text-gray-50 pb-3">{description}</p>
       </div>
         <div className="mt-auto">
          <a href={link} className="text-cyan-600 hover:underline">
           Read Article
          </a>
        </div>
      </div>
    </li>
  );
};

export default BlogCardTemplate;
