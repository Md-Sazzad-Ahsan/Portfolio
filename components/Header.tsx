"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter,usePathname } from 'next/navigation'; // Use next/navigation for client components

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import ToggleSwitch from './ToggleSwitch';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // useRouter now uses next/navigation for client components
  const router = useRouter();

  useEffect(() => {
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(userPrefersDark);
    document.documentElement.classList.toggle('dark', userPrefersDark);
  }, []);

  const handleToggle = (isDarkMode: boolean) => {
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const pathname = usePathname();

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Function to determine the active link class
  const getActiveClass = (path: string) => {
    return pathname === path ? 'text-cyan-400 dark:text-cyan-400 underline' : '';
  };

  return (
    <>
      {/* Desktop Header */}
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="hidden lg:flex bg-[var(--bg-color)] text-[var(--text-color)] fixed w-full top-0 z-10 sm:px-16 md:px-48 lg:px-56 py-4"
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-cyan-600 dark:text-gray-50">Ahsan</Link>
          <nav className="space-x-8 flex items-center">
            <Link href="/" className={`hover:underline ${getActiveClass('/')}`}>Home</Link>
            <Link href="/about" className={`hover:underline ${getActiveClass('/about')}`}>About</Link>
            <Link href="/portfolio" className={`hover:underline ${getActiveClass('/portfolio')}`}>Portfolio</Link>
            <Link href="/blog" className={`hover:underline ${getActiveClass('/blog')}`}>Blog</Link>
            <ToggleSwitch checked={darkMode} onChange={handleToggle} />
            <Link href="/contact">
              <button className={`bg-cyan-600 text-gray-50 py-1 px-8 rounded-lg hover:bg-cyan-500 font-semibold${getActiveClass('/contact')}`}>Contact</button>
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Header */}
      <motion.header 
       variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      
      className="lg:hidden bg-[var(--bg-color)] text-[var(--text-color)] shadow-md fixed w-full top-0 z-10 flex justify-between items-center py-1 px-5">
        <Link href="/" className="text-xl font-bold">Ahsan</Link>
        <section className='flex'>
          <div className="mt-4 px-4">
            <ToggleSwitch checked={darkMode} onChange={handleToggle} />
          </div>
          <button
            onClick={toggleSidebar}
            className="text-3xl py-2 text-gray-700 dark:text-gray-50"
            aria-label="Menu"
          >
            ☰
          </button>
        </section>
      </motion.header>

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: sidebarOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`fixed top-0 right-0 w-64 h-full bg-[var(--bg-color)] text-[var(--text-color)] shadow-lg z-20 lg:hidden`}
      >
        <div className="flex justify-start items-center p-4">
          <button
            onClick={toggleSidebar}
            className="text-2xl"
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>
        <nav className="mt-4 px-4 flex flex-col text-center">
          <Link href="/" onClick={closeSidebar} className={`block py-2 hover:underline ${getActiveClass('/')}`}>Home</Link>
          <Link href="/about" onClick={closeSidebar} className={`block py-2 hover:underline ${getActiveClass('/about')}`}>About</Link>
          <Link href="/portfolio" onClick={closeSidebar} className={`block py-2 hover:underline ${getActiveClass('/portfolio')}`}>Portfolio</Link>
          <Link href="/blog" onClick={closeSidebar} className={`block py-2 hover:underline ${getActiveClass('/blog')}`}>Blog</Link>
          <Link href="/contact" onClick={closeSidebar} className={`mt-4 w-full bg-cyan-600 text-gray-50 py-2 px-5 rounded ${getActiveClass('/contact')}`}>Contact</Link>
        </nav>
      </motion.aside>
    </>
  );
};

export default Header;
