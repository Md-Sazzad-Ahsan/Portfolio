"use client";

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
      <header className="hidden lg:flex bg-[var(--bg-color)] text-[var(--text-color)] fixed w-full top-0 z-10 px-48 py-5">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Ahsan</div>
          <nav className="space-x-8 flex items-center">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Portfolio</a>
            <a href="#" className="hover:underline">Blog</a>
            <ToggleSwitch checked={darkMode} onChange={handleToggle} />
            <button className="bg-purple-700 text-white py-1 px-8 rounded-lg">Contact</button>
          </nav>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden bg-[var(--bg-color)] text-[var(--text-color)] shadow-md fixed w-full top-0 z-10 flex justify-between items-center py-2       px-5">
        <div className="text-xl font-bold">Ahsan</div>
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
        <div className="flex justify-end items-center p-4">
          <button
            onClick={toggleSidebar}
            className="text-xl"
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>
        <nav className="mt-4 px-4">
          <a href="#" className="block py-2 hover:underline">Home</a>
          <a href="#" className="block py-2 hover:underline">About</a>
          <a href="#" className="block py-2 hover:underline">Portfolio</a>
          <a href="#" className="block py-2 hover:underline">Blog</a>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded">Contact</button>
          <div className="mt-4 px-4">
            <ToggleSwitch checked={darkMode} onChange={handleToggle} />
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Header;
