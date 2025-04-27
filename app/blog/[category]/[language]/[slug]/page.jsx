import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';
import Link from 'next/link';

export default async function BlogPage({ params }) {
  const { category, language, slug } = params;

  // Get the markdown file
  const filePath = path.join(
    process.cwd(),
    'content',
    'blogs',
    category,
    language,
    `${slug}.md`
  );

  // Read the file and parse the frontmatter
  const file = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(file);

  // Convert the markdown content to HTML
  const processedContent = await remark().use(remarkHtml).process(content);
  const contentHtml = processedContent.toString();

  // Generate correct blog URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const currentUrl = `${siteUrl}/blog/${category}/${language}/${slug}`;

  // Prepare translated link
  const translatedLanguage = language === 'en' ? 'bn' : 'en';
  const translatedText = language === 'en' ? 'Bangla' : 'English';
  const translatedUrl = `/blog/${category}/${translatedLanguage}/${slug}`;

  return (
    <div className="bg-gray-50 dark:bg-gray-800 min-h-screen pt-10 px-2 sm:px-8 lg:px-16 mt-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative border border-gray-200 dark:border-gray-700">

        {/* Translate Button */}
        <div className="absolute top-2 md:top-4 right-2 md:right-4">
          <Link href={translatedUrl}>
            <button className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-300 text-xs px-2 py-1 rounded-sm ring-1">
              {translatedText}
            </button>
          </Link>
        </div>

        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">{data.title}</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">{data.description}</p>

          <div className="relative my-6">
            <Image
              src={data.imageSrc}
              alt={data.title}
              width={1200}
              height={500}
              className="w-full h-72 object-cover rounded-t-lg"
            />
            <div className="absolute top-2 left-2 bg-black/50 text-white px-4 md:px-6 py-1 rounded-md text-sm">
              {data.category}
            </div>
          </div>

          <div className="flex justify-between items-center text-black dark:text-white text-sm pt-2">
            <span>By {data.author}</span>
            <span>{data.date}</span>
          </div>

          <hr className="border-gray-300 dark:border-gray-700 pb-5" />

          {/* Main Content */}
          <div
            className="prose max-w-none text-gray-800 dark:text-gray-200 pt-5"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Share Icons */}
          <div className="mt-10 md:mt-16 flex justify-between">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">Share this article</h4>
            <div className="flex gap-6 text-2xl">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <FaFacebookF />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(data.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-500 hover:text-sky-700"
              >
                <FaTwitter />
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(data.title + ' ' + currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-700"
              >
                <FaWhatsapp />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(data.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

        </div>

        {/* Comment Section */}
        <div className="bg-gray-100 dark:bg-gray-800 p-5 border-t border-gray-200 dark:border-gray-600 min-h-60">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">Comments</h4>
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded text-sm text-gray-600 dark:text-gray-400">
            [ Add your comment here ]
          </div>
        </div>

      </div>
    </div>
  );
}
