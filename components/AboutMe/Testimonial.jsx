'use client';

import { useState } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Md. Musfique Ahsan Nishad',
    title: 'CEO, Lunitech Web',
    img: '/images/MusfiqueAhsanProfile.jpg',
    feedback:
      'Md. Sazzad Ahsan consistently delivers clean, efficient code with a sharp focus on user experience and technical excellence.',
  },
  {
    name: 'Md. Imran Hossain',
    title: 'Dept. Head, CSE Daffodil IT',
    img: '/images/TempProfile.jpg',
    feedback:
      'Reliable and thoughtful, Ahsan approaches every project with clarity, speed, and strong attention to detail.',
  },
  {
    name: 'Omar Bin Fahad',
    title: 'Co Founder, GoTapEasy',
    img: '/images/OmarBinFahadProfile.jpg',
    feedback:
      'Mr. Ahsan writes maintainable, scalable code and communicates clearly throughout the entire development process.',
  },
  {
    name: 'Dr. Raihan Saimon',
    title: 'Medical Officer, Bangladesh Police Hospital',
    img: '/images/MrSaimonProfile.jpg',
    feedback:
      'Creative yet disciplined, Ahsan turns ideas into polished, high-performance features every time.',
  },
  {
    name: 'Jahan Alam',
    title: 'Program Head, Prime Bank Foundation',
    img: '/images/TempProfile.jpg',
    feedback:
      'Ahsan is a dependable developer who combines smart problem-solving with best practice coding.',
  },
];

export default function TestimonialsBlock() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const handleNext = () => {
    if (startIndex + itemsPerPage < testimonials.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  return (
    <section className="bg-white dark:bg-darkBg">
      <div className="container px-5 md:px-0 py-10 mx-auto max-w-6xl">
        <div className="mt-6 md:mt-20 md:flex md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-500 capitalize lg:text-3xl dark:text-white">
              What People say about me
            </h1>
            <div className="flex mx-auto mt-6">
              <span className="inline-block w-40 h-1 bg-darkBg dark:bg-white rounded-full" />
              <span className="inline-block w-3 h-1 mx-1 bg-darkBg dark:bg-white rounded-full" />
              <span className="inline-block w-1 h-1 bg-darkBg dark:bg-white rounded-full" />
            </div>
          </div>

          <div className="flex justify-between mt-8 md:mt-0">
            <button
              title="Previous"
              onClick={handlePrev}
              disabled={startIndex === 0}
              className="p-2 mx-3 text-gray-500 transition-colors duration-300 border border-gray-200 rounded-full dark:text-white dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              title="Next"
              onClick={handleNext}
              disabled={startIndex + itemsPerPage >= testimonials.length}
              className="p-2 text-gray-500 transition-colors duration-300 border border-gray-500 rounded-full dark:text-white dark:border-white hover:bg-gray-100 dark:hover:bg-gray-600 shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-8 xl:mt-12 lg:grid-cols-2 xl:grid-cols-3">
          {testimonials.slice(startIndex, startIndex + itemsPerPage).map(({ name, title, img, feedback }, index) => (
            <div
              key={index}
              className="p-5 md:p-8 border border-gray-200 dark:border-gray-700 rounded-lg hover:scale-95 transition-transform duration-200 bg-white dark:bg-darkBg"
            >
              <p className="leading-loose text-gray-500 dark:text-white">{feedback}</p>
              <div className="flex items-center mt-8 -mx-2">
                <Image
                  src={img}
                  alt={name}
                  width={56}
                  height={56}
                  className="object-cover mx-2 rounded-full w-10 h-10 shrink-0 ring-1 ring-gray-300 dark:ring-gray-400"
                />
                <div className="mx-2">
                  <h1 className="font-semibold text-gray-500 dark:text-white">{name}</h1>
                  <span className="text-sm text-gray-500 dark:text-white">{title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
