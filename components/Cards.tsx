import { IconType } from "react-icons";

interface CardProps {
  icon: IconType;
  title: string;
  subtitle: string;
  description: string[];
}

const Cards: React.FC<CardProps> = ({ icon: Icon, title, subtitle, description }) => {
  return (
    <li className="h-80 flex flex-col p-5 sm:p-6 ring-white shadow-xl hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
      <div className="font-bold text-4xl px-4 pt-8 pb-5 pl-8 sm:pl-4 md:py-4">
        <Icon className="text-darkBg dark:text-gray-50 h-7 w-7" />
      </div>
      <div className="text-2xl text-yellow-500 dark:text-cyan-700 font-bold pb-2 md:pb-3 pl-14 sm:pl-4">
        {title}
      </div>
      <div className="text-sm sm:text-md text-gray-700 dark:text-gray-50 pl-14 sm:pl-4">
        {subtitle}
        <br />
        {description.map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </div>
    </li>
  );
};

export default Cards;
