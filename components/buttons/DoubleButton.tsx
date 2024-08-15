import React from "react";
import Buttons from "@/components/buttons/Button"; // Assuming this is the correct path

interface ButtonProps {
  href1: string; // URL or link for the first button
  href2: string; // URL or link for the second button
  buttonOneText: string; // Text to display on the first button
  buttonTwoText: string; // Text to display on the second button
  className?: string; // Optional className for additional styles
}

const Button: React.FC<ButtonProps> = ({ href1, href2, buttonOneText, buttonTwoText, className }) => {
  return (
    <div className={`flex flex-row text-sm sm:text-md ${className}`}>
      <Buttons buttonText={buttonOneText} href={href1} className="ring-1 mr-5 hover:bg-cyan-500 bg-cyan-600 text-gray-50 cursor-pointer px-8 md:px-10 py-2 sm:py-3" />
      <Buttons buttonText={buttonTwoText} href={href2} className="ring-1 cursor-pointer hover:bg-cyan-500 hover:text-gray-50 px-8 md:px-10 py-2 sm:py-3" />
    </div>
  );
};

export default Button;
