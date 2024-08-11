'use client';

import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  label: string;
  href: string;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, href, disabled = false, className = '' }) => {
  return (
    <Link href={href} passHref>
      <a
        className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
        aria-disabled={disabled}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
          }
        }}
      >
        {label}
      </a>
    </Link>
  );
};

export default Button;
