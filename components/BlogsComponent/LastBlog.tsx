import React from "react";
import Image from "next/image";
import { allBlogsData } from "./LastBlogData";
import Link from "next/link";

const LastBlog: React.FC = () => {
  const mainBlog = allBlogsData[0];
  const secondaryBlogs = allBlogsData.slice(1);

  return (
    <main className="px-5 sm:px-16 md:px-28 lg:px-56 mt-2 md:mt-5">
      <section className="shadow-lg rounded-md bg-gray-50 dark:bg-darkBg">
        <figure className="grid grid-cols-1 md:grid-cols-7 gap-4 sm:gap-2">
          <div className="relative col-span-full sm:col-span-5 p-2 ring ring-gray-100 dark:ring-gray-600">
            <div className="text-darkBg dark:text-gray-50 flex justify-between text-xs sm:text-sm md:text-md pb-2">
            <div className="flex gap-1 sm:gap-2">
                {Array.isArray(mainBlog.category) ? (
                  mainBlog.category.map((cat, index) => (
                    <p
                      key={index}
                      className="bg-gray-300 dark:bg-gray-600 text-darkBg dark:text-gray-50 px-1"
                    >
                      {cat}
                    </p>
                  ))
                ) : (
                  <p className="bg-gray-300 dark:bg-gray-600 text-darkBg dark:text-gray-50 px-1">
                    {mainBlog.category}
                  </p>
                )}
              </div>
              <p>{mainBlog.date}</p>
            </div>
            <div className="text-darkBg dark:text-gray-50 text-xl md:text-2xl lg:text-4xl font-semibold sm:font-bold py-2 sm:py-4  md:pt-8 md:pb-5">
              {mainBlog.headline}
            </div>
            <div className="pb-4">
              <p className="text-sm sm:text-md pb-2 text-gray-600 dark:text-gray-100">
                {mainBlog.subHeadline}
              </p>
              <div className="relative h-52 md:h-64 lg:h-96 w-full">
                <Image
                  src={mainBlog.imageSrc}
                  alt="Main Image of Last Blog"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <p className="text-xs">by {mainBlog.author}</p>
            </div>
            <div className="text-darkBg dark:text-gray-50">
              {mainBlog.description}
            </div>
            <Link href={mainBlog.link} className="mt-auto">
              <button className="font-bold text-cyan-500 hover:underline hover:cursor-pointer pt-4">
                Read Article
              </button>
            </Link>
          </div>

          <figure className="col-span-full md:col-span-2 bg-gray-50 dark:bg-darkBg dark:bg-opacity-5 grid grid-cols-1 grid-rows-2 gap-4 sm:gap-2">
            {secondaryBlogs.map((blog, index) => (
              <section
                key={index}
                className="col-span-1 row-span-1 ring ring-gray-100 dark:ring-gray-600"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src={blog.imageSrc}
                    alt={`Blog Image ${index + 2}`}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
                <div className="text-darkBg dark:text-gray-50 p-2">
                  <span className="text-xs flex justify-between">
                    <p className="bg-gray-300 dark:bg-gray-600 text-darkBg dark:text-gray-50 px-1">{blog.category}</p>
                    <p>{blog.date}</p>
                  </span>
                  <p className="text-xl md:text-2xl font-semibold py-2 text-cyan-500">
                    {blog.headline}
                  </p>
                  <p className="text-sm">{blog.description}</p>
                  <Link
                    href={blog.link}
                    className="text-cyan-500 hover:underline cursor-pointer pt-5 sm:pt-4"
                  >
                    Read Article
                  </Link>
                </div>
              </section>
            ))}
          </figure>
        </figure>
      </section>
    </main>
  );
};

export default LastBlog;
