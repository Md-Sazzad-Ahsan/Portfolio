import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="px-8 sm:px-24 md:px-48 lg:px-56 pt-5 sm:pt-8 md:pt-10 lg:pt-12 mt-10 md:mt-20 bg-darkBg border-gray-500 border-t-2">
      <div>
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
           
            <span className="text-2xl font-semibold text-gray-50 whitespace-nowrap">Ahsan</span>
            <p className='pt-5'>Thanks for visiting my website.<br/>For more info,please look into About or Contact.<br/>Also Call me through Whatsapp or Send me an Email.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-10 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-bold text-gray-100 uppercase">Home</h2>
              <ul className="text-gray-400 font-semibold">
                <li className='pb-1'>
                  <a href="#" className="hover:underline hover:text-gray-200">Hero</a>
                </li>
                <li className='pb-1'>
                  <a href="#" className="hover:underline hover:text-gray-200">About</a>
                </li>
                <li className='pb-1'>
                  <a href="#" className="hover:underline hover:text-gray-200">Skills</a>
                </li>
                <li className='pb-1'>
                  <a href="#" className="hover:underline hover:text-gray-200">Portfolio</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-bold text-gray-100 uppercase">Social</h2>
              <ul className="text-gray-400 font-semibold">
                <li className="pb-1">
                  <a href="#" className="hover:underline hover:text-gray-200">Facebook</a>
                </li>
                <li className='pb-1'>
                  <a href="#" className="hover:underline hover:text-gray-200">Twitter</a>
                </li>
                <li className='pb-1'>
                  <a href="#" className="hover:underline hover:text-gray-200">Instagram</a>
                </li>
                <li className='pb-1'>
                  <a href="#" className="hover:underline hover:text-gray-200">GitHub</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-bold text-gray-100 uppercase">Contact</h2>
              <ul className="text-gray-400 font-semibold">
                <li className="pb-1">
                  <a href="https://www.linkedin.com/in/md-sazzad-ahsan/" className="hover:underline hover:text-gray-200">Phone</a>
                </li>
                <li className="pb-1">
                  <a href="https://www.linkedin.com/in/md-sazzad-ahsan/" className="hover:underline hover:text-gray-200">Whatsapp</a>
                </li>
                <li className='pb-1'>
                  <a href="#" className="hover:underline hover:text-gray-200">Linkedin</a>
                </li>
                <li className='pb-1'>
                  <a href="#" className="hover:underline hover:text-gray-200">Email</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-5 md:mt-5 pb-2">
          <span className="text-sm text-gray-400 sm:text-center font-semibold">
            © 2024 <a href="https://md-sazzad-ahsan.github.io/Portfolio/" className="hover:underline">Ahsan.</a> All Rights Reserved.
          </span>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
