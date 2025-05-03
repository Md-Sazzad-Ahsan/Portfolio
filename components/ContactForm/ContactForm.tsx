// components/ContactMe.tsx
"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import SocialLinks from './SocialLinks';
import { FaEnvelope, FaGlobe, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent!');
  };

  return (
    <section className="px-5 sm:px-16 md:px-48 lg:px-56 dark:bg-darkBg">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 shadow-lg bg-gray-50 dark:bg-darkBg p-2 sm:p-8 rounded-lg">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 dark:bg-darkBg p-5 rounded-lg"
        >
          <h2 className="text-2xl text-cyan-600 font-semibold mb-4">Leave a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-50">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 dark:bg-darkBg rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-50">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 dark:bg-darkBg rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700 dark:text-gray-50">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 dark:bg-darkBg rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-50">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 dark:bg-darkBg rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-900 focus:ring-opacity-50"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 dark:bg-darkBg p-5 rounded-lg flex flex-col justify-center items-start"
        >
          <h2 className="text-2xl text-cyan-600 font-semibold mb-2">Let’s Work Together</h2>
          <p className="text-gray-700 dark:text-gray-100 mb-4">
          Great ideas deserve a great partnership. Contact me today to transform your ideas into remarkable outcome.
          </p>

   <div className="grid grid-cols-1 sm:grid-cols-2 pt-2">
      <div className="flex items-center p-4">
        <FaPhone className="m-4" />
        <div className='flex flex-col'>
        <span className="text-gray-700 dark:text-gray-100 flex items-center">
          Call
        </span>
        <span className="text-gray-500 dark:text-gray-300">+880 1407890001</span>
        </div>
      </div>
      <div className="flex items-center p-4">
       <div className='m-4'><FaEnvelope /></div> 
        <div className='flex flex-col'>
        <span className="text-gray-700 dark:text-gray-100 flex items-center">
          Email
        </span>
        <span className="text-gray-500 dark:text-gray-300 ">himu200037@diit.edu.bd</span>
        </div>
      </div>
      <div className="flex items-center p-4">
      <div className='m-4'><FaGlobe /></div> 
        <div className='flex flex-col'>
        <span className="text-gray-700 dark:text-gray-100 flex items-center">
          Website
        </span>
        <span className="text-gray-500 dark:text-gray-300"><a href="https://ahsans-portfolio.vercel.app">ahsan.lunitech.co</a></span>
        </div>
      </div>
      <div className="flex items-center p-4 ">
         <div className='m-4'><FaMapMarkerAlt /></div> 
        <div className='flex flex-col'>
        <span className="text-gray-700 dark:text-gray-100 flex items-center">
          Address
        </span>
        <span className="text-gray-500 dark:text-gray-300">Shonir-Akhra, Dhaka</span>
        </div>
      </div>

    </div>
          <div className="mt-4">
            <h3 className=" mb-2">Follow Me On</h3>
           <SocialLinks className='flex space-x-2' />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMe;
