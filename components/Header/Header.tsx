"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import ToggleSwitch from '../ToggleSwitch';
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const { data: session, status } = useSession();
  const isSignedIn = status === "authenticated";
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
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

  if (!isMounted) return null;

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
        className="hidden lg:flex bg-[var(--bg-color)] text-[var(--text-color)] fixed w-full top-0 z-50 shadow-sm backdrop-blur-sm bg-opacity-90 py-4 px-8"
      >
        <div className="container mx-auto flex justify-between items-center max-w-6xl">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-cyan-600 dark:text-gray-50 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Ahsan</Link>
          <nav className="flex items-center space-x-10">
            {!isAdminPage && (
              <div className="flex items-center space-x-8 font-medium text-sm tracking-wide">
                <Link href="/" className={`hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors py-2 border-b-2 ${getActiveClass('/') ? 'border-cyan-500 dark:border-cyan-400' : 'border-transparent'}`}>HOME</Link>
                <Link href="/about" className={`hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors py-2 border-b-2 ${getActiveClass('/about') ? 'border-cyan-500 dark:border-cyan-400' : 'border-transparent'}`}>ABOUT</Link>
                <Link href="/portfolio" className={`hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors py-2 border-b-2 ${getActiveClass('/portfolio') ? 'border-cyan-500 dark:border-cyan-400' : 'border-transparent'}`}>PORTFOLIO</Link>
                <Link href="/blog" className={`hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors py-2 border-b-2 ${getActiveClass('/blog') ? 'border-cyan-500 dark:border-cyan-400' : 'border-transparent'}`}>BLOG</Link>
                {isSignedIn && (
                  <Link href="/admin" className={`hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors py-2 border-b-2 ${pathname.startsWith('/admin') ? 'border-cyan-500 dark:border-cyan-400' : 'border-transparent'}`}>ADMIN</Link>
                )}
              </div>
            )}
            <div className="flex items-center space-x-6">
              <ToggleSwitch checked={darkMode} onChange={handleToggle} />
              {isSignedIn ? (
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white py-2 px-6 rounded-md hover:from-cyan-500 hover:to-cyan-400 font-medium text-sm tracking-wide shadow-sm transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  SIGN OUT
                </button>
              ) : isAdminPage || pathname.startsWith('/admin') ? (
                <Link href="/login">
                  <button className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white py-2 px-6 rounded-md hover:from-cyan-500 hover:to-cyan-400 font-medium text-sm tracking-wide shadow-sm transition-all duration-300 ease-in-out transform hover:scale-105">
                    SIGN IN
                  </button>
                </Link>
              ) : (
                <Link href="/contact">
                  <button className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white py-2 px-6 rounded-md hover:from-cyan-500 hover:to-cyan-400 font-medium text-sm tracking-wide shadow-sm transition-all duration-300 ease-in-out transform hover:scale-105">
                    CONTACT
                  </button>
                </Link>
              )}
            </div>
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
        className="lg:hidden bg-[var(--bg-color)] text-[var(--text-color)] shadow-sm backdrop-blur-sm bg-opacity-90 fixed w-full top-0 z-50 flex justify-between items-center py-3 px-5"
      >
        <Link href="/" className="text-xl font-extrabold tracking-tight text-cyan-600 dark:text-gray-50 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Ahsan</Link>
        <section className='flex items-center space-x-4'>
          <ToggleSwitch checked={darkMode} onChange={handleToggle} />
          <button
            onClick={toggleSidebar}
            className="text-2xl py-2 text-gray-700 dark:text-gray-50 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
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
        className={`fixed top-0 right-0 w-72 h-full bg-[var(--bg-color)] text-[var(--text-color)] shadow-lg z-40 lg:hidden`}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <span className="text-lg font-bold text-cyan-600 dark:text-cyan-400">Menu</span>
          <button
            onClick={toggleSidebar}
            className="text-2xl hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>
        <nav className="mt-6 px-5 flex flex-col space-y-4">
          <Link 
            href="/" 
            onClick={closeSidebar} 
            className={`py-3 px-4 rounded-md font-medium text-sm tracking-wide ${getActiveClass('/') ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'}`}
          >
            HOME
          </Link>
          <Link 
            href="/about" 
            onClick={closeSidebar} 
            className={`py-3 px-4 rounded-md font-medium text-sm tracking-wide ${getActiveClass('/about') ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'}`}
          >
            ABOUT
          </Link>
          <Link 
            href="/portfolio" 
            onClick={closeSidebar} 
            className={`py-3 px-4 rounded-md font-medium text-sm tracking-wide ${getActiveClass('/portfolio') ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'}`}
          >
            PORTFOLIO
          </Link>
          <Link 
            href="/blog" 
            onClick={closeSidebar} 
            className={`py-3 px-4 rounded-md font-medium text-sm tracking-wide ${getActiveClass('/blog') ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'}`}
          >
            BLOG
          </Link>
          {isSignedIn && (
            <Link 
              href="/admin" 
              onClick={closeSidebar} 
              className={`py-3 px-4 rounded-md font-medium text-sm tracking-wide ${pathname.startsWith('/admin') ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'}`}
            >
              ADMIN
            </Link>
          )}
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
            <Link 
              href="/contact" 
              onClick={closeSidebar} 
              className="block w-full bg-gradient-to-r from-cyan-600 to-cyan-500 text-white py-3 px-4 rounded-md text-center font-medium text-sm tracking-wide hover:from-cyan-500 hover:to-cyan-400 shadow-sm transition-all duration-300 ease-in-out"
            >
              CONTACT
            </Link>
            
            {isSignedIn ? (
              <button 
                onClick={() => {
                  closeSidebar();
                  signOut({ callbackUrl: '/' });
                }}
                className="block w-full bg-gradient-to-r from-gray-600 to-gray-500 text-white py-3 px-4 rounded-md text-center font-medium text-sm tracking-wide hover:from-gray-700 hover:to-gray-600 shadow-sm transition-all duration-300 ease-in-out"
              >
                SIGN OUT
              </button>
            ) : isAdminPage || pathname.startsWith('/admin') ? (
              <Link 
                href="/login"
                onClick={closeSidebar}
                className="block w-full bg-gradient-to-r from-cyan-600 to-cyan-500 text-white py-3 px-4 rounded-md text-center font-medium text-sm tracking-wide hover:from-cyan-500 hover:to-cyan-400 shadow-sm transition-all duration-300 ease-in-out"
              >
                SIGN IN
              </Link>
            ) : null}  
          </div>
        </nav>
      </motion.aside>
    </>
  );
};

export default Header;
