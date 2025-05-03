'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaFacebookF, FaWhatsapp, FaLinkedinIn, FaTwitter, FaEnvelope, FaCopy } from 'react-icons/fa';
import { FaRegCopy } from "react-icons/fa6";

export default function ShareButtons() {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const fullUrl = `${baseUrl}${pathname}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-20 md:mt-16 border-gray-200 dark:border-gray-600 flex justify-between">
  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Share this article</h4>
  <div className="flex gap-4 flex-wrap items-center">
    <button
      onClick={handleCopy}
      className="text-xl text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white"
      title={copied ? 'Copied!' : 'Copy Link'}
    >
      <FaRegCopy />
    </button>
    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`} target="_blank" rel="noopener noreferrer" title="Facebook">
      <FaFacebookF className="text-xl text-blue-600 hover:text-blue-800" />
    </a>
    <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(fullUrl)}`} target="_blank" rel="noopener noreferrer" title="WhatsApp">
      <FaWhatsapp className="text-xl text-green-500 hover:text-green-700" />
    </a>
    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`} target="_blank" rel="noopener noreferrer" title="LinkedIn">
      <FaLinkedinIn className="text-xl text-blue-700 hover:text-blue-900" />
    </a>
    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}`} target="_blank" rel="noopener noreferrer" title="Twitter/X">
      <FaTwitter className="text-xl text-cyan-500 hover:text-cyan-700" />
    </a>
    <a href={`mailto:?subject=Check this article&body=${encodeURIComponent(fullUrl)}`} title="Gmail">
      <FaEnvelope className="text-xl text-red-500 hover:text-red-700" />
    </a>
  </div>
</div>

  );
}
