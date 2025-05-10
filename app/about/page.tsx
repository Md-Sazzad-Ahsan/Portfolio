import AboutMe from "@/components/AboutMe/AboutMe";
import SeparatePages from "@/components/GlobalComponents/SeparatePages";
import { playfair } from "@/public/fonts/fonts";
import Education from "@/components/AboutMe/Education"
import ProfessionalSkills from "@/components/AboutMe/ProfessionalSkills";
import Achievements from "@/components/Achievement/Achievements" 

export default function About() {
  return (
    <main className="pt-20">
      <SeparatePages
        dividerText="About me_"
        subText="Writer | Designer | Developer | Engineer"
        dividerTextColor="text-cyan-600"
        className={`py-10 sm:py-20 md:py-28 px-5 sm:px-16 md:px-28 lg:px-56 text-center sm:text-left ${playfair.className}`}
      />
      <AboutMe />
      <ProfessionalSkills/>
      <Education/>

       <section className="bg-white dark:bg-darkBg py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
          My Goal
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-200 leading-relaxed">
          I aim to build accessible, scalable, and thoughtful software that blends elegant design with solid engineering. Every line of code I write is guided by clarity, performance, and the end-user’s experience.
        </p>
      </div>
    </section>
    <Achievements/>
    </main>
  );
}
