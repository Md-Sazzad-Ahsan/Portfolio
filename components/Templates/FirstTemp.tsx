"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface FirstTempProps {
  imageSrc: string;
  title: string;
  author: string;
  date: string;
  headline: string;
  contents: string[];
  photo: string;
  subHeadline: string;
}

const FirstTemp: React.FC<FirstTempProps> = ({
  imageSrc,
  title,
  author,
  date,
  headline,
  contents,
  photo,
  subHeadline,
}) => {
  return (
    <main className="mx-auto md:max-w-6xl px-5 md:px-0 grid grid-cols-1 md:grid-cols-12 gap-6 min-h-screen py-10">
      {/* Blog Content Area */}
      <div className="col-span-full md:col-span-9 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
      <motion.div
  className="min-h-screen overflow-y-auto scrollbar-hide p-6"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  <div className="relative w-full h-80 mb-8">
    <Image
      src={imageSrc}
      alt="Blog Thumbnail"
      fill
      className="object-cover rounded-lg"
    />
  </div>

  <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
    <span>{author}</span>
    <span>{date}</span>
  </div>

  <h1 className="text-4xl font-bold uppercase mb-6">{title}</h1>

  <p className="text-lg text-gray-600 mb-8">{headline}</p>

  {/* Main Content Styled */}
  {contents.map((content, index) => (
    <div
      key={index}
      className="prose prose-lg dark:prose-invert max-w-none mb-8"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  ))}

  <div className="w-full h-60 relative my-10">
    <Image
      src={photo}
      alt="Blog Inner Image"
      fill
      className="object-cover rounded-lg"
      loading="lazy"
    />
  </div>

  <h2 className="text-2xl md:text-3xl font-semibold mt-6">{subHeadline}</h2>
</motion.div>

      </div>

      {/* Comments Section */}
      <div className="col-span-full md:col-span-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-5">
        <motion.div
          className="min-h-screen overflow-y-auto scrollbar-hide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-center text-xl font-semibold mb-4">Comments</h1>
          <hr className="mb-6" />
          <div className="space-y-4 text-gray-500 text-sm">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default FirstTemp;
