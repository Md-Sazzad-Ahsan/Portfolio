"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ToggleSwitch from './ToggleSwitch';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(userPrefersDark);
    document.documentElement.classList.toggle('dark', userPrefersDark);
  }, []);

  const handleToggle = (isDarkMode:boolean) => {
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden lg:flex bg-[var(--bg-color)] text-[var(--text-color)] fixed w-full top-0 z-10 md:px-48 lg:px-56 py-5">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">Ahsan</Link>
          <nav className="space-x-8 flex items-center">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/portfolio" className="hover:underline">Portfolio</Link>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <ToggleSwitch checked={darkMode} onChange={handleToggle} />
            <button className="bg-cyan-700 text-white py-1 px-8 rounded-lg  hover:bg-cyan-900 dark:hover:bg-cyan-900">Contact</button>
          </nav>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden bg-[var(--bg-color)] text-[var(--text-color)] shadow-md fixed w-full top-0 z-10 flex justify-between items-center py-2 px-5">
        <Link href="/" className="text-xl font-bold">Ahsan</Link>
        <button 
          onClick={toggleSidebar}
          className="text-xl p-2"
          aria-label="Menu"
        >
          ☰
        </button>
      </header>

      {/* Mobile Sidebar */}
      <aside 
        className={`fixed top-0 right-0 w-64 h-full bg-[var(--bg-color)] text-[var(--text-color)] transition-transform transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} shadow-lg z-20 lg:hidden`}
      >
        <div className="flex justify-start items-center p-4">
          <button
            onClick={toggleSidebar}
            className="text-xl"
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>
        <nav className="mt-4 px-4 flex flex-col">
          <Link href="/" className="block py-2 hover:underline">Home</Link>
          <Link href="/about" className="block py-2 hover:underline">About</Link>
          <Link href="/portfolio" className="block py-2 hover:underline">Portfolio</Link>
          <Link href="/blog" className="block py-2 hover:underline">Blog</Link>
          <Link href="/contact" className="mt-4 w-full bg-yellow-500 text-white py-2 px-5 rounded">Contact</Link>
          <div className="mt-4 px-4">
            <ToggleSwitch checked={darkMode} onChange={handleToggle} />
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Header;
