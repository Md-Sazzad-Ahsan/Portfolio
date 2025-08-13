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
  category?: string;
  author?: string;
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
  const fallbackContent = blog.content[language === 'en' ? 'bn' : 'en'];
  const createdTime = timeAgo(blog.createdAt);
  
  // Get title with fallback logic
  const getTitle = () => {
    return content.title || fallbackContent.title || 'Untitled Blog';
  };
  
  // Get description with fallback logic
  const getDescription = () => {
    return content.description || fallbackContent.description || 'No description available';
  };

  return (
    <Link href={`/blog/${blog.slug}?lang=${language}`} className="block max-w-md">
      <div className="rounded-lg overflow-hidden bg-white dark:bg-darkBg border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 hover:translate-y-[-4px]">
        <div className="w-full h-52 relative overflow-hidden group">
          <Image
            src={blog.thumbnail || "/images/TempImage.jpg"}
            alt={getTitle()}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform group-hover:scale-105 duration-300"
            unoptimized={true}
            onError={(e) => {
              // Fallback to default image if thumbnail fails to load
              e.currentTarget.src = "/images/TempImage.jpg";
            }}
          />
          {/* Category Badge - Top Left */}
          {blog.category && (
            <span className="absolute top-1 left-1 inline-flex items-center px-2 py-1 rounded-sm text-xs bg-gray-100 dark:bg-gray-600 text-gray-900 opacity-70 dark:text-white capitalize">
              {blog.category}
            </span>
          )}
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-4">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">
            {getTitle()}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1 mb-3">
            {getDescription()}
          </p>
          <div className="flex items-center justify-between">
            <button className="text-xs text-gray-600 dark:text-gray-100 hover:underline hover:cursor-pointer py-1 rounded-md transition-colors duration-200 font-bold">
              Read article →
            </button>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {createdTime}
            </span>
          </div>
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
  if (min < 60) return `${plural(min, 'minute')}`;
  if (hrs < 24) return `${plural(hrs, 'hour')}`;
  if (days < 30) return `${plural(days, 'day')}`;

  if (years >= 1) {
    const remMonths = Math.floor((days - years * 365) / 30);
    return remMonths > 0
      ? `${plural(years, 'year')} ${plural(remMonths, 'month')}`
      : `${plural(years, 'year')}`;
  }

  // months >= 1 and < 12
  const remDays = days - months * 30;
  return remDays > 0
    ? `${plural(months, 'month')} ${plural(remDays, 'day')}`
    : `${plural(months, 'month')}`;
}

export default BlogCard;
