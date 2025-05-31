import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="px-8 sm:px-24 md:px-48 lg:px-56 pt-5 sm:pt-8 md:pt-10 lg:pt-12 bg-gray-100 dark:bg-darkBg border-gray-200 dark:border-gray-600 border-t-2">
      <div>
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
           
    <span className="text-2xl font-bold text-cyan-600 dark:text-gray-50 whitespace-nowrap">Ahsan</span>
         <p className='pt-5 text-gray-900 dark:text-gray-100'>Thanks for visiting my website.<br/>For more info,please look into About or Contact me.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-10 sm:grid-cols-3 justify-center">
            <div>
              <h2 className="mb-2 sm:mb-3 text-sm font-bold text-gray-800 dark:text-gray-100 uppercase">Home</h2>
              <ul className="text-gray-600 dark:text-gray-300">
                <li>
                  <a href="#" className="hover:underline hover:text-gray-500 dark:hover:text-gray-200">Hero</a>
                </li>
                <li>
                  <a href="#" className="hover:underline hover:text-gray-500 dark:hover:text-gray-200">About</a>
                </li>
                <li>
                  <a href="#" className="hover:underline hover:text-gray-500 dark:hover:text-gray-200">Skills</a>
                </li>
                <li>
                  <a href="#" className="hover:underline hover:text-gray-500 dark:hover:text-gray-200">Portfolio</a>
                </li>
              </ul>
            </div>
            <div className='hidden sm:block'>
              <h2 className="mb-2 sm:mb-3 text-sm font-bold text-gray-800 dark:text-gray-100 uppercase">Social</h2>
              <ul className="text-gray-600 dark:text-gray-300">
                <li>
                  <a href="https://facebook.com/Ahsan.Himu.Star/" className="hover:underline hover:text-gray-500 dark:hover:text-gray-200">Facebook</a>
                </li>
                <li>
                  <a href="https://x.com/Md_Sazzad_Ahsan/" className="hover:underline hover:text-gray-500 dark:hover:text-gray-200">X.com</a>
                </li>
                <li>
                  <a href="https://instagram.com/Ahsan.Himu_Star/" className="hover:underline hover:text-gray-500 dark:hover:text-gray-200">Instagram</a>
                </li>
                <li>
                  <a href="https://github.com/Md-Sazzad-Ahsan/" className="hover:underline hover:text-gray-500 dark:hover:text-gray-200">GitHub</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-2 sm:mb-3 text-sm font-bold text-gray-800 dark:text-gray-100 uppercase">Contact</h2>
              <ul className="text-gray-600 dark:text-gray-300">
                <li>
                  <a href="#" className="hover:underline hover:text-gray-500 dark:hover:text-gray-200">Phone</a>
                </li>
                <li >
                  <a href="#" className="hover:underline hover:text-gray-500 dark:hover:text-gray-200">Whatsapp</a>
                </li>
                <li >
                  <a href="https://linkedin.com/in/md-sazzad-ahsan/" className="hover:underline hover:text-gray-500 dark:hover:text-gray-200">Linkedin</a>
                </li>
                <li >
                  <a href="#" className="hover:underline hover:text-gray-500 dark:hover:text-gray-200">Email</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-5 md:mt-5 pb-2">
          <span className="text-sm text-gray-400 sm:text-center">
            © {new Date().getFullYear()} <a href="https://ahsans-portfolio.vercel.app" className="hover:underline">Md. Sazzad Ahsan.</a> All Rights Reserved.
          </span>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
