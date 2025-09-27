import React from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

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
  thumbnail?: string;
}

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
  let blogs: BlogItem[] = [];
  
  try {
    // Get the base URL more reliably
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL ;
    
    const res = await fetch(`${baseUrl}/api/blogs`, {
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const apiResponse: ApiResponse = await res.json();
    blogs = apiResponse.data || [];
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    // Return empty array to prevent component crash
    blogs = [];
  }

  const sortedBlogs = blogs.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (sortedBlogs.length === 0) {
    return (
      <div className="px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300">
          No blogs available
        </h2>
      </div>
    );
  }

  const mainBlog = sortedBlogs[0];
  const secondaryBlogs = sortedBlogs.slice(1, 3);

  return (
    <main className="max-w-6xl mx-auto py-8 px-4 md:px-0">
      <section className="grid gap-8 md:grid-cols-3">
        {/* Main Blog */}
        <article className="md:col-span-2 bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col">
          <div className="relative h-64 md:h-[300px] w-full">
            <Image
              src={mainBlog.thumbnail || "/images/TempImage.jpg"}
              alt={mainBlog.content?.en?.title || "Blog Image"}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-3">
              <div className="flex flex-wrap gap-2">
                {Array.isArray(mainBlog.category)
                  ? mainBlog.category.map((cat, i) => (
                      <span
                        key={i}
                        className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100 text-xs font-semibold px-2 py-1 rounded"
                      >
                        {cat}
                      </span>
                    ))
                  : (
                    <span className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100 text-xs font-semibold px-2 py-1 rounded">
                      {mainBlog.category}
                    </span>
                  )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(mainBlog.createdAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <h2 className="text-gray-900 dark:text-gray-50 text-3xl font-extrabold leading-tight line-clamp-2 mb-4 mt-2">
              {mainBlog.content?.en?.title || mainBlog.content?.bn?.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2 md:line-clamp-3">
              {mainBlog.content?.en?.description || mainBlog.content?.bn?.description}
            </p>

            <div className="prose max-w-none dark:prose-invert line-clamp-5 mb-6 flex-grow">
              <ReactMarkdown>
                {mainBlog.content?.en?.body || mainBlog.content?.bn?.body || ""}
              </ReactMarkdown>
            </div>

            <div className="mt-auto">
              <Link href={`/blog/${mainBlog.slug}`} className="text-gray-500 dark:text-gray-100 font-bold pt-2 hover:underline">Read Article →</Link>
            </div>
          </div>
        </article>

        {/* Secondary Blogs */}
        <aside className="space-y-6">
          {secondaryBlogs.map((blog, i) => (
            <article
              key={i}
              className="flex flex-col bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative h-48 md:h-44 w-full">
                <Image
                  src={blog.thumbnail || "/images/TempImage.jpg"}
                  alt={blog.content?.en?.title || "Blog Image"}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
                <div className="absolute flex justify-between bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1">
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(blog.category)
                      ? blog.category.map((cat, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100 text-xs px-2 rounded-sm"
                          >
                            {cat}
                          </span>
                        ))
                      : (
                        <span className="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100 text-xs px-2 rounded-sm">
                          {blog.category}
                        </span>
                      )}
                  </div>
                  <p className="text-xs font-semibold text-gray-50 text-end items-end">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow">

                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-1 line-clamp-2">
                  {blog.content?.en?.title || blog.content?.bn?.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm flex-grow line-clamp-1 mb-4">
                  {blog.content?.en?.description || blog.content?.bn?.description}
                </p>
                <div className="mt-auto">
                  <Link href={`/blog/${blog.slug}`} className="text-gray-500 dark:text-gray-100 font-bold hover:underline text-sm">Read Article →</Link>
                </div>
              </div>
            </article>
          ))}
        </aside>
      </section>
    </main>
  );
};

export default LatestBlogGrid;
