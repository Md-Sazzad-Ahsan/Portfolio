import { FaFigma ,FaCode} from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineAndroid } from "react-icons/ai";
import Cards from "@/components/Cards"
import Link from "next/link";

function PortfolioCards() {
  return (
<main>
<section className="px-5 sm:px-16 md:px-56">
  <ul className="bg-gray-50 dark:bg-darkBg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2 md:gap-3 pt-20 md:pt-24 pb-10">
    <li className="text-3xl text-cyan-600 dark:text-gray-50 font-bold text-center p-5 sm:p-0 col-span-full uppercase py-5 md:pt-10 md:pb-5">Portfolio</li>
    <span className="col-span-full flex flex-row text-gray-50 dark:text-gray-300 pb-5 items-center justify-center space-x-1 ">
      <Link href="#" className="bg-cyan-700 dark:bg-cyan-700 hover:bg-cyan-900 dark:hover:bg-cyan-900 dark:hover:text-gray-50 px-5 sm:px-8 md:px-10 py-1 sm:py-2 rounded-sm" >All</Link>
      <Link href="#" className="bg-cyan-700 dark:bg-cyan-700 hover:bg-cyan-900 dark:hover:bg-cyan-900 dark:hover:text-gray-50 px-5 sm:px-8 md:px-10 py-1 sm:py-2 rounded-sm" >Top</Link>
      <Link href="#" className="bg-cyan-700 dark:bg-cyan-700 hover:bg-cyan-900 dark:hover:bg-cyan-900 dark:hover:text-gray-50 px-5 sm:px-8 md:px-10 py-1 sm:py-2 rounded-sm" >Latest</Link>
      <Link href="#" className="bg-cyan-700 dark:bg-cyan-700 hover:bg-cyan-900 dark:hover:bg-cyan-900 dark:hover:text-gray-50 px-5 sm:px-8 md:px-10 py-1 sm:py-2 rounded-sm" >Featured</Link>
    </span>
    
      <Cards
        icon={BsPencilSquare}
        title="Content Writing"
        subtitle="Keyword Research"
        description={["SEO Friendly Content", "Storytelling and Narrative"]}
      />

      <Cards
        icon={FaFigma}
        title="UI/UX Design"
        subtitle="Wireframe & Prototype"
        description={[
          "Design in Figma,Canva",
          "Responsive Layout",
          "Application Prototype"
        ]}
      />

      <Cards
        icon={FaCode}
        title="Web Development"
        subtitle="HTML CSS & Tailwind"
        description={[
          "JavaScript & DOM Interaction",
        ]}
      />
    
      <Cards
        icon={AiOutlineAndroid}
        title="App Development"
        subtitle="React Native"
        description={[
          "NodeJs and NextJs","MySQL Database"
        ]}
      />
    <li className="col-span-full text-center pt-5 sm:pt-8 md:pt-10"><a href="#" className="bg-cyan-700 px-8 py-1 text-base sm:text-md md:text-lg text-gray-50 font-semibold rounded-md shadow-md hover:shadow-lg hover:bg-cyan-900">View all</a></li>
  </ul>
</section>
</main>
  )
}

export default PortfolioCards;