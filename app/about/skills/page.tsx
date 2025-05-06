import AboutMe from "@/components/AboutMe/AboutMe";
import SeparatePages from "@/components/GlobalComponents/SeparatePages";
import { playfair } from "@/public/fonts/fonts";
import ExperienceCard from "@/components/Skills/Skills";
export default function About() {
  return (
    <main className="pt-20">
      <SeparatePages
        dividerText="Skills_"
        subText="Tailwind | Python | JS | React | Next | SQL | NoSQL"
        dividerTextColor="text-cyan-600"
        className={`py-10 sm:py-20 md:py-28 px-5 sm:px-16 md:px-28 lg:px-56 text-center sm:text-left ${playfair.className}`}
      />

      {/* <h1 className="mx-auto max-w-5xl text-4xl md:text-5xl lg:text-6xl font-bold text-center pt-20 pb-5 text-cyan-600">
        My Skills
      </h1> */}
      <hr className="sm:mx-auto max-w-6xl mx-5" />
      <ExperienceCard
        title="Content Strategy & SEO Writing"
        company="Personal Projects & Blogging"
        date="Ongoing"
        description="Specialized in content writing, keyword research, and SEO-optimized copywriting that drives traffic and improves search engine rankings. Skilled in storytelling and crafting compelling narratives that engage audiences across blogs, websites, and digital platforms."
      />

      <ExperienceCard
        title="UI/UX Design & Prototyping"
        company="Freelance & Practice Projects"
        date="Ongoing"
        description="Experienced in user interface and user experience design, creating wireframes, interactive prototypes, and responsive layouts. Proficient in design tools like Figma and Sketch, and skilled in delivering intuitive, mobile-friendly designs using Tailwind CSS."
      />

      <ExperienceCard
        title="Modern Web Development"
        company="Client & Academic Projects"
        date="Ongoing"
        description="Building fast, responsive, and accessible websites using HTML5, CSS3, Tailwind, and JavaScript. Capable of DOM manipulation and real-world problem-solving with clean, semantic code optimized for performance and SEO best practices."
      />

      <ExperienceCard
        title="Frontend Development with React & Next.js"
        company="Project-Based Experience"
        date="Ongoing"
        description="Developing modern, scalable web applications using React.js and Next.js with a focus on performance, server-side rendering (SSR), API integration, and component-based architecture. Ensuring SEO readiness and a seamless user experience across devices."
      />

      <ExperienceCard
        title="Full-Stack & Mobile App Development"
        company="In Progress & Experimental Builds"
        date="Ongoing"
        description="Exploring full-stack web development using Node.js, Next.js (API routes), and MySQL for robust backend functionality. Currently learning React Native to build cross-platform mobile apps with a focus on UI consistency, functionality, and real-time interaction."
      />
    </main>
  );
}
