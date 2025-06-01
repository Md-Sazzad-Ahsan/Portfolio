import Image from 'next/image';
import Link from 'next/link';

interface BlogContent {
  title?: string;
  description?: string;
}

interface Blog {
  _id: string;
  slug: string;
  thumbnail?: string;
  createdAt: string;
  content: {
    en: BlogContent;
    bn: BlogContent;
  };
}

interface BlogCardProps {
  blog: Blog;
  language: 'en' | 'bn';
}

const BlogCard = ({ blog, language }: BlogCardProps) => {
  const content = blog.content[language];
  const createdTime = timeAgo(blog.createdAt);

  return (
    <Link href={`/blogs/${blog.slug}`} className="block max-w-sm">
      <div className="rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
        {blog.thumbnail && (
          <div className="w-full h-48 relative">
            {blog.thumbnail.includes('drive.google.com') ? (
              <img
                // src={blog.thumbnail}
                src="/images/projects.jpg"
                alt={content.title || 'Untitled Blog'}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                // src={blog.thumbnail}
                src="/images/projects.jpg"
                alt={content.title || 'Untitled Blog'}
                width={500}
                height={500}
                className="object-cover"
              />
            )}
          </div>
        )}

        <div className="p-3">
          <h2 className="text-base font-semibold text-black leading-snug mb-1">
            {content.title || 'Untitled Blog'}
          </h2>
          <p className="text-sm text-gray-700 line-clamp-2">
            {content.description || 'No description available'}
          </p>
          <p className="text-xs text-gray-500 mt-1">{createdTime}</p>
        </div>
      </div>
    </Link>
  );
};

// Utility function to show "X Hour Ago" 
function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return 'Just Now'; 
  return `${diffHours} Hours Ago`; 
}

export default BlogCard;
