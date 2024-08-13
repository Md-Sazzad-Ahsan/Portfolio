import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import UnderConstructionImage from "@/public/images/UnderConstruction.svg"

const UnderConstruction: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-darkBg text-darkBg dark:text-gray-50 p-4">
      <div className="max-w-md w-full mx-auto mb-8">
        <Image
          src={UnderConstructionImage}
          alt="Under Construction"
          width={400}
          height={300}
          className="mx-auto"
        />
      </div>
      <h1 className="text-5xl font-bold mb-4">Building Something Awesome!</h1>
      <p className="text-lg text-center mb-6">
        Working hard to get it up and running. Please check back soon!
      </p>
      <Link href="/">
        <span className="flex items-center space-x-2 bg-darkBg dark:bg-white text-gray-50 dark:text-darkBg px-4 py-2 rounded-full shadow-lg hover:bg-gray-600 transition duration-300">
          <FaArrowLeft />
          <span>Back to Home</span>
        </span>
      </Link>
    </div>
  );
};

export default UnderConstruction;
