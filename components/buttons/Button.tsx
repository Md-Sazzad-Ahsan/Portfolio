// components/Button.tsx
import Link from "next/link";

interface ButtonProps {
  href: string; // URL or link for the button
  buttonText: string; // Text to display on the button
  className?: string; // Optional className for additional styles
}

const Button: React.FC<ButtonProps> = ({ href, buttonText, className}) => {
  return (
    <Link href={href} className={`${className}`}>
      {buttonText}
    </Link>
  );
};

export default Button;
