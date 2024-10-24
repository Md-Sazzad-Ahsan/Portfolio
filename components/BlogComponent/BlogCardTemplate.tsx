import Image from "next/image";
import Link from "next/link";

interface ProjectCardTemplateProps {
  imageSrc: string;
  category: string;
  headline: string;
  description: string;
  link: string;
}

const BlogCardTemplate: React.FC<ProjectCardTemplateProps> = ({
  imageSrc,
  category,
  headline,
  description,
  link,
}) => {
  return (
    <Link href={link} className="block"> {/* Added <a> tag to wrap the entire card */}
      <div className="bg-gray-50 dark:bg-darkBg flex flex-col ring-white shadow-xl sm:shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 rounded-sm sm:h-[22rem] w-full">
        <div className="relative w-full h-52">
          <Image src={imageSrc} alt={headline} priority fill sizes="cover" />
          <div className="absolute inset-0">
            <button className="text-sm font-semibold text-gray-50 bg-darkBg bg-opacity-50 px-4 py-1">
              {category}
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-between flex-grow p-2">
          <div>
            <p className="text-xs text-gray-500">27 AUG 2024</p>
            <h2 className="text-xl py-1 font-bold text-cyan-600">{headline}</h2>
            <p className="text-sm text-gray-700 dark:text-gray-50 pb-1">
              {description}
            </p>
          </div>
          <div className="mt-auto">
            <span className="text-cyan-600 hover:underline"> 
              Read Article
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCardTemplate;
