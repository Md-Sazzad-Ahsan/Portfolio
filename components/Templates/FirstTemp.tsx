"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface FirstTempProps {
  thumbnail: string;
  title: string;
  author: string;
  date: string;
  headline: string;
  contents: string[];
  photo: string;
  subHeadline: string;
}

const FirstTemp: React.FC<FirstTempProps> = ({ thumbnail, title, author, date, headline, contents, photo,subHeadline }) => {
  return (
    <main className="mx-auto md:max-w-6xl px-5 md:px-0 grid grid-cols-1 md:grid-cols-12 gap-5 min-h-screen">
      {/* Blog Content Area */}
      <div className="col-span-full md:col-span-9 border border-gray-100 dark:border-gray-700">
        {/* Make this section scrollable */}
        <motion.div
          className="min-h-screen overflow-y-scroll scrollbar-hide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image src={thumbnail} alt="Thumbnail Image" height={500} width={1000} className="object-cover w-full h-80" />
          <div className="flex justify-between items-center px-2">
            <span className="text-sm">{author}</span>
            <span className="text-xs">{date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl pt-10 md:pt-20 mb-2 font-bold uppercase px-2">{title}</h1>
          <h1 className="mt-5 md:mt-10 mb-2 px-2">{headline}</h1>
          {contents.map((content, index) => (
            <h3 key={index} className="px-2 pt-5">
              {content}
            </h3>
          ))}
        </motion.div>
        <Image src={photo} alt="Photo Image" height={400} width={800} loading="lazy" className="object-cover h-60 w-full px-5 my-5 md:my-10" />
        <h1 className="px-5 py-5 text-2xl md:text-3xl font-semibold">{subHeadline}</h1>
      </div>

      {/* Comments Section */}
      <div className="col-span-3 border border-gray-100 dark:border-gray-700">
        <motion.div
          className="min-h-screen overflow-y-scroll p-4 scrollbar-hide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="px-2 pt-2 text-center">Comments</h1>
          <hr />
          {/* Placeholder for comments */}
          <div className="p-4">
            {/* Add any content for comments here */}
            <p className="py-2">Comment 1...</p>
            <p className="py-2">Comment 2...</p>
            {/* Add more comments as needed */}
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default FirstTemp;
