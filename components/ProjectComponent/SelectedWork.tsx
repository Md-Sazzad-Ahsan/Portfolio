"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const SelectedWork = () => {
  return (
    <section className="w-full py-20 bg-white dark:bg-darkBg">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start gap-10 mx-auto max-w-6xl"
        >
          {/* Text Content */}
          <div className="w-full md:w-1/2 space-y-4 order-2 md:order-1">
            <p className="uppercase hidden md:inline text-sm text-gray-500 dark:text-gray-400 font-semibold text-center sm:text-start">
              Most Recent
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              Collab - AI Powered Meeting Room
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300">
              <strong>An innovative virtual conference platform</strong> enhancing online
              collaboration with smart features. It includes interactive
              whiteboards, drag-and-drop file sharing, and real-time translation
              in 133 languages. An integrated AI assistant offers live support
              and resources, while voice recognition enables hands-free control.
              Features like screen sharing, video sharing, and live polls boost
              engagement. Collab customizable UI ensures a seamless and
              productive meeting experience for global users.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="bg-transparent text-black dark:text-gray-50 text-xs md:text-md font-bold px-3 py-1 rounded-full">
                AI assistant
              </span>
              <span className="bg-transparent text-black dark:text-gray-50 text-xs md:text-md font-bold px-3 py-1 rounded-full">
                Live translation
              </span>
              <span className="bg-transparent text-black dark:text-gray-50 text-xs md:text-md font-bold px-3 py-1 rounded-full">
                Whiteboard
              </span>
              <span className="bg-transparent text-black dark:text-gray-50 text-xs md:text-md font-bold px-3 py-1 rounded-full">
                Collab tool
              </span>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 w-full">
              <a
                href="/portfolio/404"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 md:px-8 py-2 bg-cyan-700 text-white rounded-lg text-center hover:bg-cyan-500 transition w-full sm:w-auto"
              >
                Live Preview
              </a>
              <a
                href="https://github.com/Md-Sazzad-Ahsan/MeetVerse"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 md:px-8 py-2 bg-gray-800 text-white rounded-lg text-center hover:bg-gray-600 transition w-full sm:w-auto"
              >
                GitHub Code
              </a>
            </div>
          </div>

          {/* Image Stack */}
          <div className="w-full md:w-1/3 space-y-2 order-1 md:order-2">
          <p className="uppercase md:hidden text-sm text-gray-500 dark:text-gray-400 font-semibold text-center sm:text-start">
              Most Recent
            </p>
            <Image
              src="/projectImages/CollabEnterancePage.png"
              alt="Whiteboard Screenshot"
              width={600}
              height={300}
              className="rounded-xl shadow-md w-full object-cover hover:scale-95 hover:shadow-lg"
            />
            <div className="flex">
              <Image
                src="/projectImages/CollabFeature1Page.png"
                alt="Project Image 2"
                width={200}
                height={200}
                className="rounded-xl shadow-md w-1/2 object-cover pr-1 hover:scale-95 hover:shadow-lg"
              />
              <Image
                src="/projectImages/CollabFeature2Page.png"
                alt="Tablet with Whiteboard"
                width={200}
                height={200}
                className="rounded-xl shadow-md w-1/2 object-cover pl-1 hover:scale-95 hover:shadow-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SelectedWork;
