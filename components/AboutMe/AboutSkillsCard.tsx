import { motion } from 'framer-motion';
import { FaFigma ,FaCode} from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineAndroid } from "react-icons/ai";
import Cards from "@/components/GlobalComponents/Cards"

function AboutSkillsCard() {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeIn' } },
  };
  return (
    <main>
      <motion.article
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
        className="dark:bg-darkBg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-2 mt-20 md:mt-24 pb-10"
      >
        <motion.div
          variants={item}
          className="text-3xl text-cyan-600 dark:text-gray-50 font-bold text-center col-span-full uppercase py-5 md:pt-10 md:pb-5"
        >
          Expertise
        </motion.div>

        <motion.div variants={item} className="transition-transform duration-300 will-change-transform hover:scale-95">
          <Cards
            icon={BsPencilSquare}
            title="Content Writing"
            subtitle="Keyword Research"
            description={["SEO Friendly Content", "Storytelling and Narrative"]}
          />
        </motion.div>

        <motion.div variants={item} className="transition-transform duration-300 will-change-transform hover:scale-95">
          <Cards
            icon={FaFigma}
            title="UI/UX Design"
            subtitle="Wireframe & Prototype"
            description={[
              "Design and Sketch",
              "Responsive Layout",
              "Application Prototype",
            ]}
          />
        </motion.div>

        <motion.div variants={item} className="transition-transform duration-300  will-change-transform hover:scale-95">
          <Cards
            icon={FaCode}
            title="Web Development"
            subtitle="HTML CSS & Tailwind"
            description={["JavaScript & DOM Interaction", "React Js and Next Js"]}
          />
        </motion.div>

        <motion.div variants={item} className="transition-transform duration-300 will-change-transform hover:scale-95">
          <Cards
            icon={AiOutlineAndroid}
            title="App Development"
            subtitle="React Native (In Progress)"
            description={["NodeJs and NextJs", "MySQL Database"]}
          />
        </motion.div>

        <motion.div variants={item} className="col-span-full text-center pt-5 sm:pt-8 md:pt-10">
          <a
            href="/about/skills"
            className="bg-cyan-700 px-8 py-2 text-lg sm:text-md md:text-lg text-gray-50 font-semibold rounded-lg shadow-lg hover:shadow-lg hover:bg-cyan-900 transition-colors duration-300"
          >
            View Details
          </a>
        </motion.div>
      </motion.article>
    </main>
  )
}

export default AboutSkillsCard;