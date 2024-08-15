// components/Button.tsx
import React from "react";
import Link from "next/link";

interface ButtonProps {
  href: string; // URL or link for the button
  buttonText: string; // Text to display on the button
  className?: string; // Optional className for additional styles
}

const Button: React.FC<ButtonProps> = ({ href, buttonText, className}) => {
  return (
    <Link href={href} className={`px-5 sm:px-8 lg:px-10 py-2 sm:py-3 ${className}`}>
      {buttonText}
    </Link>
  );
};

export default Button;
