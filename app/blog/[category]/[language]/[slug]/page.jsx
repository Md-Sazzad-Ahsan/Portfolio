import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export default async function BlogPage({ params }) {
  const { category, language, slug } = params;

  const filePath = path.join(
    process.cwd(),
    'content',
    'blogs',
    category,
    language,
    `${slug}.md`
  );

  const file = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(file);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <article className="prose max-w-3xl mx-auto">
      <h1>{data.title}</h1>
      <p className="text-sm text-gray-500">{data.date}</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
