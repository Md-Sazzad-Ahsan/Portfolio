import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import Image from 'next/image';

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

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-6 sm:px-8 lg:px-16 mt-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="relative">
          {/* Blog Thumbnail using Image */}
          <Image
            src={data.imageSrc}  // Ensure the path is correct
            alt={data.title}
            width={1200}  // Set the width for the image
            height={400}  // Set the height for the image
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded-md text-sm">
            {data.category}
          </div>
        </div>

        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">{data.title}</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">{data.description}</p>

          <div className="flex justify-between items-center text-black dark:text-white text-sm pt-2">
            <span>By {data.author}</span>
            <span>{data.date}</span>
          </div>
          <hr className="border-gray-300 dark:border-gray-700 pb-5" />
          
          {/* Main Content with markdown converted to HTML */}
          <div
            className="prose max-w-none text-gray-800 dark:text-gray-200 pt-5"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-6 border-t border-gray-200 dark:border-gray-600">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">Comments</h4>
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-4 rounded text-sm text-gray-600 dark:text-gray-400">
            {/* Placeholder for comments section */}
            [ Add your comment section here ]
          </div>
        </div>
      </div>
    </div>
  );
}
