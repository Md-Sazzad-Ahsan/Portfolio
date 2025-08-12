import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import VectorImage from "@/public/images/programmingImage.svg"
import AboutMe from "@/components/AboutMe/AboutMe";
// import SeparatePages from "@/components/GlobalComponents/SeparatePages";
import { playfair } from "@/public/fonts/fonts";
import BlogGrid from "@/components/BlogComponent/BlogGrid";
import ProjectGrid from "@/components/ProjectComponent/ProjectGrid";
import SelectedWork from "@/components/ProjectComponent/SelectedWork";
import Testimonial from "@/components/AboutMe/Testimonial"

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Hero Section - Simple and Clean */}
      <section id="hero" className="pt-28 pb-20 md:pt-36 md:pb-28 bg-white dark:bg-darkBg">
        <div className="container mx-auto max-w-6xl px-5 md:px-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
            <div className="w-full md:w-1/2 md:pr-8">
              <div className="mb-6 inline-flex items-center px-3 py-1 border-l-4 border-cyan-500 text-sm font-medium text-cyan-600 dark:text-cyan-400">
                Full Stack Web & Software Developer
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
                Turning <span className="text-cyan-600 dark:text-cyan-400">ideas</span> into remarkable <span className="text-cyan-600 dark:text-cyan-400">websites</span>
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                A skilled web developer and designer, crafting user-friendly websites and apps that deliver engaging digital experiences.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/about" 
                  className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors duration-300 flex items-center"
                >
                  Read more
                  <GoArrowUpRight className="ml-2 h-5 w-5" />
                </Link>
                
                <Link 
                  href="/contact" 
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 hover:border-cyan-500 dark:hover:border-cyan-500 text-gray-700 dark:text-gray-200 font-medium rounded-md transition-colors duration-300"
                >
                  Contact me
                </Link>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-cyan-600/20 rounded-lg blur-sm dark:bg-cyan-500/20"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md">
                  <Image 
                    src={VectorImage} 
                    alt="Developer illustration" 
                    priority 
                    height={450} 
                    width={450} 
                    className="p-2" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Section with modern divider */}
      <section id="about" className="relative bg-white dark:bg-darkBg py-24">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
        <div className="container mx-auto max-w-6xl px-5 md:px-0">
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center mb-4">
              <div className="h-px w-8 bg-cyan-500 mr-4"></div>
              <h2 className={`text-lg font-medium text-cyan-600 dark:text-cyan-400 ${playfair.className}`}>About me_</h2>
              <div className="h-px w-8 bg-cyan-500 ml-4"></div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-2">Who I Am</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl">Get to know more about my skills, experience, and passion for creating exceptional digital experiences.</p>
          </div>
          
        </div>
          <AboutMe/>
      </section>
      
      {/* Projects Section with visual enhancements */}
      <section className="relative bg-gray-50 dark:bg-darkBg py-24">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
        <div className="container mx-auto max-w-6xl px-5 md:px-0">
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center mb-4">
              <div className="h-px w-8 bg-cyan-500 mr-4"></div>
              <h2 className={`text-lg font-medium text-cyan-600 dark:text-cyan-400 ${playfair.className}`}>Projects_</h2>
              <div className="h-px w-8 bg-cyan-500 ml-4"></div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-2">Featured Work</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl">Explore a selection of my recent projects showcasing my skills and expertise.</p>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 rounded-xl blur-xl opacity-30 dark:opacity-40 -z-10"></div>
            <SelectedWork/>
          </div>
          
          <div className="mt-16">
            <ProjectGrid buttonType="viewMore" initialCardCount={3} />
          </div>
        </div>
      </section>
      
      {/* Blog Section with improved visual hierarchy */}
      <section className="relative bg-white dark:bg-darkBg py-24">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
        <div className="container mx-auto max-w-6xl px-5 md:px-0">
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center mb-4">
              <div className="h-px w-8 bg-cyan-500 mr-4"></div>
              <h2 className={`text-lg font-medium text-cyan-600 dark:text-cyan-400 ${playfair.className}`}>My Blog_</h2>
              <div className="h-px w-8 bg-cyan-500 ml-4"></div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-2">Latest Articles</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl">Insights, tutorials, and thoughts on web development and design.</p>
          </div>
          
          <BlogGrid buttonType={"viewMore"} initialCardCount={6} />
        </div>
      </section>
      
      {/* Testimonial Section with enhanced styling */}
      <section className="relative bg-gray-50 dark:bg-darkBg py-24">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
        <div className="container mx-auto max-w-6xl px-5 md:px-0">
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center mb-4">
              <div className="h-px w-8 bg-cyan-500 mr-4"></div>
              <h2 className={`text-lg font-medium text-cyan-600 dark:text-cyan-400 ${playfair.className}`}>Testimonials_</h2>
              <div className="h-px w-8 bg-cyan-500 ml-4"></div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-2">What Clients Say</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl">Feedback from clients I&apos;ve had the pleasure of working with.</p>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 rounded-xl blur-xl opacity-30 dark:opacity-40 -z-10"></div>
            <Testimonial/>
          </div>
        </div>
      </section>
      
      {/* Contact CTA Section */}
      <section className="relative bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 dark:bg-darkBg py-20">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10"></div>
        <div className="container mx-auto max-w-4xl px-5 md:px-0 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">Ready to Start Your Next Project?</h2>
          <p className="text-gray-700 dark:text-gray-100 mb-8 max-w-2xl mx-auto">Let&apos;s collaborate to bring your ideas to life with a beautiful, functional website that stands out.</p>
          <Link href="/contact" className="inline-flex items-center px-8 py-3 bg-gray-900 dark:bg-white text-gray-100 dark:text-gray-600 font-medium rounded-md hover:bg-gray-700 hover:dark:bg-gray-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Get in Touch
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
