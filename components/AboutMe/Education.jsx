import React from 'react'
import { FaGraduationCap, FaBookOpen,  FaSchool  } from "react-icons/fa";

const educationData = [
  {
    title: 'B.Sc. (Hons) Professional',
    icon: <FaGraduationCap className="w-8 h-8 text-cyan-600" />,
    description: 'Pursuing a B.Sc. (Honours) in Computer Science and Engineering (CSE) at Daffodil Institute of IT (DIIT), focusing on programming, algorithms, web and software development. This degree builds a strong foundation for a future career in tech and modern computing fields.',
  },
  {
    title: 'Higher Secondary Certificate (HSC)',
    icon: <FaBookOpen className="w-8 h-8 text-cyan-600" />,
    description: 'Completed HSC from Dania University College (Science) with core subjects in Physics, Chemistry, Biology, and Mathematics. This academic phase developed strong analytical skills and shaped my passion for pursuing advanced education in tech and engineering.',
  },
  {
    title: 'Secondary School Certificate (SSC)',
    icon: <FaSchool className="w-8 h-8 text-cyan-600" />,
    description: 'Completed SSC from Barnamala High School (Science), with a focus on foundational subjects like Physics, Chemistry, Biology, and Math. This stage laid the groundwork for academic discipline and sparked my early interest in the world of science and technology.',
  },
]

export default function Education() {
  return (
    <div className="mx-auto max-w-6xl px-5 md:px-0 pt-20 pb-10">
      <section>
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-700 dark:text-white">
          Educational Background
          </h1>
          <div className="flex justify-center mt-2">
            <span className="inline-block w-52 h-1 bg-gray-700 dark:bg-white rounded-full" />
            <span className="inline-block w-8 h-1 mx-1 bg-gray-700 dark:bg-white rounded-full" />
            <span className="inline-block w-3 h-1 bg-gray-700 dark:bg-white rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition hover:shadow-lg"
            >
              <div className="flex flex-col items-center">
                {edu.icon}
                <h2 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                  {edu.title}
                </h2>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 text-justify">
                  {edu.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
