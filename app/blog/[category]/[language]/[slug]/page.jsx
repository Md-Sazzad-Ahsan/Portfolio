// app/blog/[category]/[language]/[slug]/page.jsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import Image from "next/image";
import Link from "next/link";
import ShareButtons from "@/components/Button/ShareButton";

export async function generateMetadata({ params }) {
  const { category, language, slug } = params;

  const filePath = path.join(
    process.cwd(),
    "content",
    "blogs",
    category,
    language,
    `${slug}.md`
  );
  const file = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(file);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${siteUrl}/blog/${category}/${language}/${slug}`;

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      url,
      siteName: "ahsan.lunitech.co",
      images: [
        {
          url: data.imageSrc,
          width: 800,
          height: 600,
          alt: data.title,
        },
      ],
      locale: language === "en" ? "en_US" : "bn_BD",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [data.imageSrc],
    },
    alternates: {
      canonical: url,
    },
    other: {
      "image": data.imageSrc,
    },    
  };
}

async function fetchRelatedBlogs(category, currentSlug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/blogs`
  );
  const blogs = await res.json();
  return blogs
    .filter((blog) => blog.link.startsWith(`/blog/${category}/`))
    .filter((blog) => !blog.link.endsWith(`/${currentSlug}`))
    .slice(0, 2); // only 2 related blogs
}

export default async function BlogPage({ params }) {
  const { category, language, slug } = params;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const currentUrl = `${siteUrl}/blog/${category}/${language}/${slug}`;
  const translatedLanguage = language === "en" ? "bn" : "en";
  const translatedText = language === "en" ? "Bangla" : "English";
  const translatedUrl = `/blog/${category}/${translatedLanguage}/${slug}`;

  // Get current blog file
  const filePath = path.join(
    process.cwd(),
    "content",
    "blogs",
    category,
    language,
    `${slug}.md`
  );
  const file = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(file);

  const processedContent = await remark().use(remarkHtml).process(content);
  const contentHtml = processedContent.toString();

  const relatedBlogs = await fetchRelatedBlogs(category, slug);

  return (
    <main className="px-2 sm:px-16 md:px-28 lg:px-56 mt-16 md:mt-20">
      <section className="flex flex-col md:flex-row gap-2">
        {/* Main Blog */}
        <div className="relative flex-1 shadow-md rounded-md bg-gray-50 dark:bg-darkBg p-4 ring ring-gray-100 dark:ring-gray-700">
          {/* Translate Button (fixed at top-right) */}
          <div className="absolute top-4 right-2 md:right-4 z-10">
            <Link href={translatedUrl}>
              <button className="text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-300 text-xs md:text-sm font-semibold px-4 py-1 rounded-sm ring-1">
                {translatedText}
              </button>
            </Link>
          </div>

          {/* Category and Date */}
          <div className="flex justify-between text-xs md:text-sm text-darkBg dark:text-gray-50 mb-2">
            <div className="flex gap-1">
              {Array.isArray(data.category) ? (
                data.category.map((cat, index) => (
                  <p
                    key={index}
                    className="bg-gray-300 dark:bg-gray-600 text-darkBg dark:text-gray-50 px-1 rounded"
                  >
                    {cat}
                  </p>
                ))
              ) : (
                <p className="bg-gray-300 dark:bg-gray-600 text-darkBg dark:text-gray-50 px-4 py-1 rounded">
                  {data.category}
                </p>
              )}
            </div>
          </div>

          {/* Title, Description, Image, etc. */}

          {/* Title */}
          <h1 className="text-cyan-500 text-3xl md:text-4xl lg:text-5xl font-bold py-2">
            {data.title}
          </h1>

          {/* Description + Image */}
          <p className="text-md text-gray-600 dark:text-gray-100 mb-4">
            {data.description}
          </p>
          <div className="relative h-52 md:h-64 lg:h-96 w-full mb-4">
            <Image
              src={data.imageSrc}
              alt={data.title || `${data.title} blog image`}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md mt-2"
              priority
            />
          </div>
          <div className="flex justify-between mb-2 md:mb-4">
            <p className="text-xs">By {data.author}</p>
            <p className="text-xs">{data.date}</p>
          </div>

          {/* Main Content */}
          <article
            className="prose max-w-none text-gray-800 dark:text-gray-200 pt-5"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <ShareButtons />
          {/* Comment Section */}
          <section className="bg-gray-100 dark:bg-darkBg py-5 border-t border-gray-200 dark:border-gray-600 mt-8 rounded-md">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
              Comments
            </h4>
            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded text-sm text-gray-600 dark:text-gray-400">
              [ Add your comment here ]
            </div>
          </section>
        </div>

        {/* Related Blogs */}
        <div className="w-full md:w-1/4 flex flex-col gap-4">
          <div className="pt-10 md:pt-0">
            <p className="text-center font-bold">Related Blogs</p>
            <hr />
          </div>

          {relatedBlogs.slice(0, 3).map((blog, index) => (
            <section
              key={index}
              className="shadow-md rounded-md bg-gray-50 dark:bg-darkBg ring ring-gray-100 dark:ring-gray-700 overflow-hidden"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={blog.imageSrc}
                  alt={`Related Blog ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-t-md"
                  priority
                />
              </div>

              <div className="p-3 text-darkBg dark:text-gray-50">
                <div className="flex justify-between text-xs mb-2">
                  <p className="bg-gray-300 dark:bg-gray-600 px-1 rounded">
                    {Array.isArray(blog.category)
                      ? blog.category.join(", ")
                      : blog.category}
                  </p>
                  <p>{blog.date}</p>
                </div>

                <h3 className="text-lg md:text-xl font-semibold text-cyan-500 mb-1">
                  {blog.title}
                </h3>
                <p className="text-sm mb-2">{blog.description}</p>

                <Link
                  href={blog.link}
                  className="text-cyan-500 hover:underline text-sm hover:text-cyan-700"
                >
                  Read Article
                </Link>
              </div>
            </section>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: data.title,
            image: [data.imageSrc],
            author: {
              "@type": "Person",
              name: data.author,
            },
            publisher: {
              "@type": "Organization",
              name: "ahsan.lunitech.co",
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/your-logo.png`,
              },
            },
            datePublished: data.date,
            url: currentUrl,
            description: data.description,
            inLanguage: language === "en" ? "en" : "bn",
          }),
        }}
      />
    </main>
  );
}
