import AboutMe from "@/components/AboutMe/AboutMe";
import SeparatePages from "@/components/GlobalComponents/SeparatePages";
import { playfair } from "@/public/fonts/fonts";
import ExperienceCard from "@/components/GlobalComponents/Skills";
import ProfessionalSkills from "@/components/AboutMe/ProfessionalSkills";
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

      <h1 className="mx-auto max-w-5xl text-2xl md:text-5xl lg:text-6xl font-bold text-center pt-10 md:pt-20 pb-5 text-cyan-600">
        Education
      </h1>
      <hr className="sm:mx-auto max-w-6xl mx-6" />
      <ExperienceCard
        title="Daffodil Institute of IT (DIIT)"
        company="Computer Science and Engineering"
        date="Ongoing"
        description="Gained practical and theoretical knowledge in programming, software development, cybersecurity, web/app development, databases, and AI. Also learned how to solve real-world problems using technology and sharpened my vision to become a skilled computer engineer."
      />

      <ExperienceCard
        title="Dania University College"
        company="Higher Secondary School Certificate"
        date="2016"
        description="Deepened my understanding of physics, chemistry, higher mathematics, and ICT. This phase helped me develop logical thinking and analytical skills, which motivated me to pursue Computer Science as a career."
      />

      <ExperienceCard
        title="Barnamala High School & College"
        company="Secondary School Certificate"
        date=""
        description="Learned the fundamentals of education, including general science, mathematics, English, and Bangla. School built my foundation in discipline, teamwork, and a love for learning that sparked my curiosity about technology and computers."
      />
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
    </main>
  );
}
