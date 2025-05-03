"use client";
import React from "react";
import { FaDownload } from "react-icons/fa";
import Buttons from "@/components/Button/Buttons"; // Assuming this is the correct path

interface DoubleButtonProps { // Renamed to DoubleButtonProps
  href1: string; // URL or link for the first button
  href2: string; // URL or link for the second button
  buttonOneText: string; // Text to display on the first button
  buttonTwoText: string; // Text to display on the second button
  className?: string; // Optional className for additional styles
  download?: string;
}

const DoubleButton: React.FC<DoubleButtonProps> = ({ href1, href2, buttonOneText, buttonTwoText, className,download }) => {
  return (
    <div className={`flex flex-row text-sm sm:text-md my-5 md:my-0 ${className}`}>
      <Buttons buttonText={buttonOneText} href={href1} className="ring-1 mr-5 hover:bg-cyan-800 bg-cyan-600 text-white cursor-pointer px-8 md:px-10 py-2 rounded-full" />
      <div className="px-5 sm:px-8 md:px-10 py-2 rounded-full flex gap-2 items-center ring-1 cursor-pointer  hover:bg-cyan-800 hover:text-gray-50">
      <FaDownload />
      <Buttons buttonText={buttonTwoText} href={href2} download={download} />
      </div>
    </div>
  );
};

export default DoubleButton;
