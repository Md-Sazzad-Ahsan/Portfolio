import React from "react";

interface SeparatePagesProps {
  dividerText: string;
  subText?: string;
  className?: string;
}

const SeparatePages: React.FC<SeparatePagesProps> = ({ dividerText, subText, className }) => {
  return (
    <div className={` ${className}`}>
      <h1 className="text-6xl sm:text-7xl md:text-9xl  text-cyan-700">
        {dividerText}
      </h1>
      <span className="pt-1 sm:pt-2 md:pt-0 text-darkBg dark:text-gray-50 text-sm sm:text-md font-semibold uppercase">
        {subText}
      </span>
    </div>
  );
};

export default SeparatePages;
