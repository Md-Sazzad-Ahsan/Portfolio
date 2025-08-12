'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaTag, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="container mx-auto mt-20 px-4 py-8 animate-pulse max-w-6xl">
    <div className="bg-gray-200 dark:bg-gray-700 h-10 w-3/4 mb-4 rounded"></div>
    <div className="flex space-x-4 mb-6">
      <div className="bg-gray-200 dark:bg-gray-700 h-4 w-20 rounded"></div>
      <div className="bg-gray-200 dark:bg-gray-700 h-4 w-20 rounded"></div>
      <div className="bg-gray-200 dark:bg-gray-700 h-4 w-20 rounded"></div>
    </div>
    <div className="bg-gray-200 dark:bg-gray-700 h-64 w-full mb-8 rounded"></div>
    <div className="space-y-4">
      <div className="bg-gray-200 dark:bg-gray-700 h-4 w-full rounded"></div>
      <div className="bg-gray-200 dark:bg-gray-700 h-4 w-full rounded"></div>
      <div className="bg-gray-200 dark:bg-gray-700 h-4 w-3/4 rounded"></div>
    </div>
  </div>
);

// Error component
const ErrorDisplay = ({ message }) => (
  <div className="container mx-auto px-4 py-16 text-center">
    <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error</h2>
    <p className="mb-6 text-gray-800 dark:text-gray-200">{message}</p>
    <Link href="/blog" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
      Return to Blog List
    </Link>
  </div>
);

const BlogDetail = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const slug = params.slug; // Get the slug from the URL
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState(() => {
    // Initialize language from URL query parameter, default to 'en'
    return searchParams.get('lang') || 'en';
  });
  const [showLangToggle, setShowLangToggle] = useState(true);
  const [toggleIn, setToggleIn] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const contentRef = useRef(null);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setIsLoading(true);
        // Add a cache-busting query parameter to avoid browser caching
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/blogs/${encodeURIComponent(slug)}?t=${timestamp}`);
        
        if (!response.ok) {
          throw new Error(
            response.status === 404 
              ? 'Blog post not found' 
              : 'Failed to fetch blog post'
          );
        }
        
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch blog post');
        }
        
        console.log('Blog data fetched successfully:', data.data);
        setBlog(data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchBlogData();
    }
  }, [slug]);

  useEffect(() => {
    // Keep local state in sync with URL changes
    const qp = searchParams.get('lang');
    if ((qp || 'en') !== language) {
      setLanguage(qp || 'en');
    }
  }, [searchParams, language]);

  // Simple Tailwind-based enter animation: start hidden, then flip to visible
  useEffect(() => {
    if (showLangToggle) {
      setToggleIn(false);
      // allow initial hidden render, then enable
      const t = setTimeout(() => setToggleIn(true), 0);
      return () => clearTimeout(t);
    } else {
      setToggleIn(false);
    }
  }, [showLangToggle]);

  // Init share URL (client-side)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  // Reading progress based on article content
  useEffect(() => {
    const onScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 0;
      const total = rect.height - viewportH;
      let progress = 0;
      if (total > 0) {
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        progress = (scrolled / total) * 100;
      }
      setReadProgress(Math.max(0, Math.min(100, progress)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [contentRef]);

  // Auto-hide toggle after 5 seconds (reset on show or language change)
  useEffect(() => {
    if (!showLangToggle) return;
    const timer = setTimeout(() => {
      setToggleIn(false);
      setTimeout(() => setShowLangToggle(false), 250);
    }, 5000);
    return () => clearTimeout(timer);
  }, [showLangToggle, language]);
  const updateLangInUrl = (nextLang) => {
    // Preserve other query params while updating lang
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (nextLang === 'en') params.delete('lang'); else params.set('lang', nextLang);
    router.replace(`${pathname}?${params.toString()}`);
    setLanguage(nextLang);
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'bn' : 'en';
    updateLangInUrl(next);
  };

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay message={error} />;
  
  // Only show the selected language; do not fallback to the other language
  const title = blog?.content?.[language]?.title;
  const body = blog?.content?.[language]?.body;
  const description = blog?.content?.[language]?.description;

  return (
    <div className="container mx-auto px-4 py-8 mt-16 md:mt-20 max-w-6xl text-gray-900 dark:text-gray-100">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent">
        <div
          className="h-full bg-blue-600 dark:bg-blue-500 transition-[width] duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>
      {/* Floating Language Toggle */}
      {showLangToggle && (
        <div className={`fixed bottom-4 right-4 z-50 will-change-transform will-change-opacity transition-all duration-300 ease-out transform ${toggleIn ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
          <div className="backdrop-blur bg-transparent border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg p-1 flex items-center gap-1">
            {language === 'en' ? (
              <button
                onClick={() => updateLangInUrl('bn')}
                className="px-2 py-1 rounded-md text-xs transition text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                বাংলা
              </button>
            ) : (
              <button
                onClick={() => updateLangInUrl('en')}
                className="px-2 py-1 rounded-md text-xs transition text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                English
              </button>
            )}
            <button
              aria-label="Hide language toggle"
              onClick={() => {
                setToggleIn(false);
                setTimeout(() => setShowLangToggle(false), 250);
              }}
              className="ml-1 inline-flex items-center justify-center w-6 h-6 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              title="Hide"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 dark:text-gray-400 mb-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li>/</li>
          <li><Link href="/blog" className="hover:underline">Blog</Link></li>
          <li>/</li>
          <li className="truncate max-w-[60vw] line-clamp-1" title={title}>{title}</li>
        </ol>
      </nav>

      {/* Blog header */}
      <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3 text-gray-900 dark:text-gray-100">{title}</h1>

      {/* Blog description */}
      {description && (
        <div className="mb-8 text-lg text-gray-700 dark:text-gray-300 max-w-4xl pr-3 md:pr-0">
          {description}
        </div>
      )}
      
      {/* Blog thumbnail (Hero) */}
      {blog.thumbnail && (
        <div className="relative w-full h-[320px] md:h-[460px] mb-8 rounded-2xl overflow-hidden">
          {/* Use an unoptimized image as a workaround for domain issues */}
          <Image 
            src={blog.thumbnail} 
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
            unoptimized={true}
            onError={(e) => {
              console.error('Image failed to load:', blog.thumbnail);
              // Fallback to default image if thumbnail fails to load
              e.target.src = "/images/TempImage.jpg";
            }}
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          {/* overlay info */}
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur text-white capitalize border border-white/30">
                {blog.category}
              </span>
              <span className="inline-flex items-center text-xs text-white/90">
                <FaCalendarAlt className="mr-2" />
                {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="inline-flex items-center text-xs text-white/90">
                <FaUser className="mr-2" /> {blog.author}
              </span>
            </div>
            {/* share moved below content */}
          </div>
        </div>
      )}
      
      
      {/* Blog content (Markdown) */}
      <div ref={contentRef} className="prose prose-lg dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-gray-700 dark:prose-a:text-gray-100 mx-auto max-w-3xl md:max-w-4xl lg:max-w-5xl prose-pre:bg-transparent prose-pre:p-0 prose-code:before:content-none prose-code:after:content-none prose-pre:text-gray-800 dark:prose-pre:text-gray-100 prose-code:text-gray-800 dark:prose-code:text-gray-700">
        <ReactMarkdown
          // Support GitHub flavored markdown
          remarkPlugins={[remarkGfm]}
          // Enhance headings and allow raw HTML inside markdown if present
          rehypePlugins={[
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'append' }],
            rehypeRaw,
          ]}
          // Allow raw HTML in markdown (use with rehypeRaw)
          skipHtml={false}
          components={{
            img({ node, ...props }) {
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img {...props} alt={props.alt || ''} loading="lazy" />
              );
            },
            a({ node, ...props }) {
              return <a {...props} target="_blank" rel="noopener noreferrer" />;
            },
            code({ inline, className, children, ...props }) {
              // Inline code only; block-level handled by custom `pre` below
              if (!inline) {
                return <code className={className} {...props}>{children}</code>;
              }
              const txt = String(children).replace(/\n$/, '');
              return (
                <code
                  className={`px-1.5 py-0.5 rounded bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white font-mono text-sm ${className || ''}`}
                  {...props}
                >
                  {txt}
                </code>
              );
            },
            pre({ children }) {
              // children should be a single <code> element
              const child = Array.isArray(children) ? children[0] : children;
              const className = child?.props?.className || '';
              const langMatch = /language-(\w+)/.exec(className);
              const lang = langMatch?.[1] || 'code';
              const raw = child?.props?.children || '';
              const txt = Array.isArray(raw) ? raw.join('') : String(raw);

              return (
                <div className="my-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a]">
                  <div className="flex items-center justify-between px-3 py-2 text-xs bg-gray-100 dark:bg-[#111827] text-gray-600 dark:text-gray-200">
                    <span className="uppercase tracking-wide">{lang}</span>
                  </div>
                  <pre className="overflow-x-auto m-0 p-4 text-sm leading-6 bg-transparent text-gray-800 dark:text-gray-100 dark:[&_code]:text-gray-100 dark:[&_span]:text-gray-100 dark:[&_code]:!text-opacity-100 dark:[&_span]:!text-opacity-100">
                    {child}
                  </pre>
                </div>
              );
            },
          }}
        >
          {body || ''}
        </ReactMarkdown>
      </div>
      {/* Social share at end */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 max-w-3xl md:max-w-4xl lg:max-w-6xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">Share this article</span>
          <div className="flex items-center gap-2">
            <a aria-label="Share on Facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              <FaFacebookF size={14} />
            </a>
            <a aria-label="Share on Twitter" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title || '')}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              <FaTwitter size={14} />
            </a>
            <a aria-label="Share on LinkedIn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              <FaLinkedinIn size={14} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Back to blog list link */}
      <div className="mt-12">
        <Link href="/blog" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-2 rounded transition">
          All Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
