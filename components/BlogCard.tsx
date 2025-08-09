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
    <Link href={`/blog/${blog.slug}`} className="block max-w-md">
      <div className="rounded-lg overflow-hidden bg-white dark:bg-darkBg border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 hover:translate-y-[-4px]">
        {blog.thumbnail && (
          <div className="w-full h-52 relative overflow-hidden">
            <Image
              src={blog.thumbnail}
              alt={content.title || 'Untitled Blog'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform hover:scale-105 duration-300"
              unoptimized={true}
              onError={(e) => {
                // Fallback to default image if thumbnail fails to load
                e.currentTarget.src = "/images/TempImage.jpg";
              }}
            />
          </div>
        )}

        <div className="p-4">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 leading-snug mb-2">
            {content.title || 'Untitled Blog'}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
            {content.description || 'No description available'}
          </p>
          <p className="text-xs text-gray-700 dark:text-gray-400 font-medium">{createdTime}</p>
        </div>
      </div>
    </Link>
  );
};

// Utility function to show "X Hour Ago" 
function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - date.getTime());

  const sec = Math.floor(diffMs / 1000);
  const min = Math.floor(sec / 60);
  const hrs = Math.floor(min / 60);
  const days = Math.floor(hrs / 24);
  const months = Math.floor(days / 30); // approximate
  const years = Math.floor(days / 365); // approximate

  const plural = (n: number, unit: string) => `${n} ${unit}${n === 1 ? '' : 's'}`;

  if (sec < 60) return 'Just now';
  if (min < 60) return `${plural(min, 'minute')} ago`;
  if (hrs < 24) return `${plural(hrs, 'hour')} ago`;
  if (days < 30) return `${plural(days, 'day')} ago`;

  if (years >= 1) {
    const remMonths = Math.floor((days - years * 365) / 30);
    return remMonths > 0
      ? `${plural(years, 'year')} ${plural(remMonths, 'month')} ago`
      : `${plural(years, 'year')} ago`;
  }

  // months >= 1 and < 12
  const remDays = days - months * 30;
  return remDays > 0
    ? `${plural(months, 'month')} ${plural(remDays, 'day')} ago`
    : `${plural(months, 'month')} ago`;
}

export default BlogCard;
