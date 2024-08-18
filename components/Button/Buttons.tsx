"use client";
import Link from "next/link";

interface ButtonProps {
  href: string; // URL or link for the button
  buttonText: string; // Text to display on the button
  className?: string; // Optional className for additional styles
}

const Buttons: React.FC<ButtonProps> = ({ href, buttonText, className }) => {
  return (
    <Link href={href} className={className ? className : ""}>
      {buttonText}
    </Link>
  );
};

export default Buttons;
