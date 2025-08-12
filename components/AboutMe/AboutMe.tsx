"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import AboutSkillsCard from "@/components/AboutMe/AboutSkillsCard";
import Button from "@/components/Button/Buttons";
import SocialLinks from "@/components/ContactForm/SocialLinks";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function AboutMe() {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";

  return (
    <main className="min-h-screen bg-white dark:bg-darkBg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.section 
          className="bg-white dark:bg-darkBg rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 p-6 sm:p-8 md:p-12">
            {/* Profile Image Section */}
            <motion.figure 
              className="relative group"
              variants={itemVariants}
            >
              <div className="relative w-full h-0 pb-[125%] rounded-xl overflow-hidden shadow-lg border-4 border-white dark:border-gray-700 transform transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src="/images/profilePhoto.jpg"
                  alt="Md. Sazzad Ahsan"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                
                {/* Social Links */}
                <motion.div 
                  className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex justify-center gap-5">
                    <SocialLinks className="flex flex-wrap justify-center gap-3 w-full text-white hover:text-cyan-400 transition-colors" />
                  </div>
                </motion.div>
              </div>
            </motion.figure>

            {/* About Content Section */}
            <motion.div 
              className="lg:col-span-2 flex flex-col justify-center"
              variants={itemVariants}
            >
              <motion.div 
                className="space-y-6"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <span className="inline-block text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-2">
                    Hello, I&apos;m
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                    Md. Sazzad Ahsan
                  </h1>
                  <div className="w-20 h-1 bg-cyan-600 my-4 rounded-full" />
                </motion.div>

                <motion.p 
                  className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                  variants={itemVariants}
                >
                  A passionate full stack <span className="font-semibold text-cyan-600 dark:text-cyan-400">Software Developer</span> with a B.Sc. in CSE from Daffodil Institute of IT (DIIT), Dhaka. I specialize in software development, application development, web & cross-platform application development, mobile app development, content writing. With a strong focus on building innovative, user-friendly, and high-performance software solutions, I&apos;m dedicated to delivering impactful software,websites, applications, and digital products. Always eager to learn and adapt to emerging technologies, I thrive on transforming ideas into reality through creative problem-solving and technical expertise.
                </motion.p>

                <motion.div 
                  className="pt-4 flex flex-wrap gap-4"
                  variants={itemVariants}
                >
                  {isAboutPage ? (
                    <Button
                      href="/ResumeMDSazzadAhsan.pdf"
                      download="MDSazzadAhsan.pdf"
                      buttonText="Download Resume"
                      className="inline-flex items-center px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    />
                  ) : (
                    <>
                      <Button
                        href="/about"
                        buttonText="More About Me"
                        className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                      />
                      <Button
                        href="/ResumeMDSazzadAhsan.pdf"
                        download="MDSazzadAhsan.pdf"
                        buttonText="View Resume"
                        className="px-6 py-2.5 border border-cyan-600 bg-transparent text-cyan-600 hover:bg-cyan-50 dark:hover:bg-gray-700 font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                      />
                    </>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Skills Section - Only show on non-about pages */}
        {!isAboutPage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16"
          >
            <AboutSkillsCard />
          </motion.div>
        )}
      </div>
    </main>
  );
}
