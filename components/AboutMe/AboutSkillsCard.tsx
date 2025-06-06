import { FaFigma ,FaCode} from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineAndroid } from "react-icons/ai";
import Cards from "@/components/GlobalComponents/Cards"

function AboutSkillsCard() {
  return (
    <main>
  <article className="dark:bg-darkBg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-2 mt-20 md:mt-24 pb-10 px-5 sm:px-0">
    <div className="text-3xl text-cyan-600 dark:text-gray-50 font-bold text-center p-5 sm:p-0 col-span-full uppercase py-5 md:pt-10 md:pb-5">Expertise</div>
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
          "Design and Sketch",
          "Responsive Layout",
          "Application Prototype"
        ]}
      />

      <Cards
        icon={FaCode}
        title="Web Development"
        subtitle="HTML CSS & Tailwind"
        description={[
          "JavaScript & DOM Interaction","React Js and Next Js"
        ]}
      />
    
      <Cards
        icon={AiOutlineAndroid}
        title="App Development"
        subtitle="React Native (In Progress)"
        description={[
          "NodeJs and NextJs","MySQL Database"
        ]}
      />
    <div className="col-span-full text-center pt-5 sm:pt-8 md:pt-10"><a href="/about/skills" className="bg-cyan-700 px-8 py-2 text-lg sm:text-md md:text-lg text-gray-50 font-semibold rounded-full shadow-lg hover:shadow-lg hover:bg-cyan-900">View Details</a></div>
  </article>
</main>
  )
}

export default AboutSkillsCard;