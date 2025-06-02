import React from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

// Define a type for blog items
interface BlogItem {
  slug: string;
  category: string | string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  content: {
    en?: {
      title: string;
      description: string;
      body: string;
    };
    bn?: {
      title: string;
      description: string;
      body: string;
    };
  };
  imageSrc?: string;
}

// Define API response type
interface ApiResponse {
  success: boolean;
  source: string;
  data: BlogItem[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const LatestBlogGrid: React.FC = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/blogs`,
    {
      cache: "no-store",
    }
  );

  const apiResponse: ApiResponse = await res.json();
  const blogs = apiResponse.data || [];

  const sortedBlogs = blogs.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Handle empty response gracefully
  if (sortedBlogs.length === 0) {
    return (
      <div className="px-5 sm:px-16 md:px-28 lg:px-56 mt-2 md:mt-5 text-center py-10">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">No blogs available</h2>
      </div>
    );
  }

  const mainBlog = sortedBlogs[0];
  const secondaryBlogs = sortedBlogs.slice(1, 3);

  return (
    <main className="px-4 sm:px-16 md:px-28 lg:px-56 mt-2 md:mt-5">
      <section className="shadow-sm rounded-md bg-white dark:bg-darkBg">
        <figure className="grid grid-cols-1 md:grid-cols-7 gap-3 sm:gap-1">
          {/* Main Blog */}
          <div className="relative col-span-full rounded-md sm:col-span-5 border border-gray-50 dark:border-gray-700 shadow-lg p-2 md:shadow-sm">
            <div className="text-darkBg dark:text-gray-50 flex justify-between text-sm md:text-md py-2">
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
              <p>{new Date(mainBlog.createdAt).toLocaleDateString('en-US', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
})}</p>

            </div>

            <div className="text-darkBg dark:text-cyan-500 text-3xl md:text-4xl lg:text-5xl font-semibold sm:font-bold py-2 sm:py-4">
              {mainBlog.content?.en?.title || mainBlog.content?.bn?.title}
            </div>

            <div className="pb-4">
              <p className="text-md sm:text-lg pb-4 text-gray-600 dark:text-gray-100">
                {mainBlog.content?.en?.description || mainBlog.content?.bn?.description}
              </p>
              <div className="relative h-52 md:h-64 lg:h-96 w-full">
                <Image
                  src={mainBlog.imageSrc || '/images/TempImage.jpg'}
                  alt="Main Image of Last Blog"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <p className="text-sm mt-2 text-cyan-500">by {mainBlog.author}</p>
              {/* author correctly visible */}
            </div>

            {/* Markdown Content */}
            <div className="prose line-clamp-5 dark:prose-invert max-w-none pt-4">
              <ReactMarkdown>{mainBlog.content?.en?.body || mainBlog.content?.bn?.body || ''}</ReactMarkdown>
            </div>

            <Link href={`/blog/${mainBlog.slug}`} className="mt-auto">
              <button className="font-bold text-cyan-500 hover:underline hover:cursor-pointer pt-4">
                Read Article
              </button>
            </Link>
          </div>

          {/* Secondary Blogs */}
          <figure className="col-span-full md:col-span-2 bg-white dark:bg-darkBg dark:bg-opacity-5 grid grid-cols-1 grid-rows-2 gap-3 sm:gap-1">
            {secondaryBlogs.map((blog, index) => (
              <section
                key={index}
                className="col-span-1 row-span-1 rounded-md border border-gray-50 dark:border-gray-700 shadow-lg p-2 md:shadow-sm"
              >
                <div className="relative h-60 md:h-48 w-full">
                  <Image
                    src={blog.imageSrc || '/images/TempImage.jpg'}
                    alt={`Blog Image ${index + 2}`}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
                <div className="text-darkBg dark:text-gray-50 px-2 py-5">
                  <span className="text-xs flex justify-between">
                    <p className="bg-gray-300 dark:bg-gray-600 text-darkBg dark:text-gray-50 px-1">
                      {Array.isArray(blog.category)
                        ? blog.category.join(", ")
                        : blog.category}
                    </p>
                    <p>{new Date(blog.createdAt).toLocaleDateString('en-US', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
})}</p>

                  </span>
                  <p className="text-3xl md:text-2xl font-semibold py-2 text-cyan-500">
                    {blog.content?.en?.title || blog.content?.bn?.title}
                  </p>
                  <p className="text-sm pb-3 md:pb-4">{blog.content?.en?.description || blog.content?.bn?.description}</p>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-cyan-500 hover:underline cursor-pointer pt-5"
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

export default LatestBlogGrid;
