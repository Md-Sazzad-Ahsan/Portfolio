// components/MySkills.tsx
import {
    FaSearch,
    FaDraftingCompass,
    FaPaintBrush,
    FaMobileAlt,
    FaCode,
    FaReact,
    FaDatabase,
  } from "react-icons/fa";
  
  type SkillCard = {
    title: string;
    description: string;
    icon: JSX.Element;
  };
  
  const skills: SkillCard[] = [
    {
      title: "SEO Content",
      description: "Effective keyword-based content structure for higher visibility in search engines.",
      icon: <FaSearch className="text-cyan-600 text-3xl mb-4" />,
    },
    {
      title: "Wireframe & Prototype",
      description: "Low to high-fidelity wireframes and interactive prototypes for clear product design.",
      icon: <FaDraftingCompass className="text-cyan-600 text-3xl mb-4" />,
    },
    {
      title: "Design and Sketch",
      description: "Creative UI/UX designs using tools like Figma and Sketch to build seamless experiences.",
      icon: <FaPaintBrush className="text-cyan-600 text-3xl mb-4" />,
    },
    {
      title: "Responsive Layout",
      description: "Mobile-first design principles using HTML, CSS, and Tailwind CSS.",
      icon: <FaMobileAlt className="text-cyan-600 text-3xl mb-4" />,
    },
    {
      title: "Application Prototype - HTML, CSS & Tailwind",
      description: "Convert mockups into functional front-end prototypes using modern CSS frameworks.",
      icon: <FaCode className="text-cyan-600 text-3xl mb-4" />,
    },
    {
      title: "JavaScript & DOM Interaction",
      description: "Dynamic UI with real-time DOM updates using vanilla JavaScript.",
      icon: <FaCode className="text-cyan-600 text-3xl mb-4" />,
    },
    {
      title: "React Js ,Next Js and React Native",
      description: "Component-based architecture and SSR apps using React, Next.js, and React Native.",
      icon: <FaReact className="text-cyan-600 text-3xl mb-4" />,
    },
    {
      title: "NodeJs, MySQL, Firebase, MongoDB",
      description: "Backend development and database management using modern full-stack tools.",
      icon: <FaDatabase className="text-cyan-600 text-3xl mb-4" />,
    },
  ];
  
  const MySkills = () => {
    return (
      <section className="dark:bg-darkBg text-gray-800 dark:text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-2">Explore My Skillset</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            These are the key areas I focus on in web, UI/UX, backend, and full-stack development.
          </p>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl shadow hover:shadow-lg transition text-left flex flex-col h-full border border-gray-200 dark:border-gray-700 hover:scale-95 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {skill.icon}
                <h4 className="text-xl font-semibold mb-2 dark:text-white">{skill.title}</h4>
                <p className="text-gray-600 dark:text-gray-200 text-sm font-normal flex-grow">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default MySkills;
  