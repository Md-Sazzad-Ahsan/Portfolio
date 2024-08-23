interface SeparatePagesProps {
  dividerText: string;
  dividerTextColor?: string;
  subText?: string;
  className?: string;
}

const SeparatePages: React.FC<SeparatePagesProps> = ({
  dividerText,
  dividerTextColor = "text-gray-50", // Default color
  subText,
  className,
}) => {
  return (
    <div className={` ${className}`}>
      <h1 className={`text-6xl sm:text-6xl md:text-8xl lg:text-9xl ${dividerTextColor}`}>
        {dividerText}
      </h1>
      <span className="pt-1 sm:pt-2 md:pt-0 text-darkBg dark:text-gray-50 text-sm sm:text-md font-semibold sm:font-bold uppercase">
        {subText}
      </span>
    </div>
  );
};

export default SeparatePages;
