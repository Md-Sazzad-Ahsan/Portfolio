// components/ContactMe.tsx
"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
    // Here you should add your form submission logic, such as sending data to an API endpoint.
    // For demonstration, we'll just log the data to the console.
    console.log('Form submitted:', formData);
    alert('Message sent!'); 
  };

  return (
    <section className="px-5 sm:px-16 md:px-48 lg:px-56 py-8 md:py-16 bg-gray-50 dark:bg-darkBg">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 shadow-md">
        {/* Map Image */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-64 md:col-span-3 md:h-48 lg:h-auto sm:order-2"
        >
          <Image
            src="/images/TempMap.jpg"
            alt="Map"
            fill
            priority
            style={{objectFit:"cover"}}
            className="rounded-t-lg sm:rounded-lg p-5"
          />
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 dark:bg-darkBg p-5 rounded-b-lg sm:rounded-l-lg lg:col-span-2 md:col-span-2"
        >
          <h2 className="text-2xl text-gray-700 dark:text-gray-100 font-semibold mb-4 sm:pt-5">Lets work together</h2>
          <p className="text-gray-700 dark:text-gray-100 mb-8">Feel free to reach out with any questions or feedback!</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-50">Name</label>
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
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-50">Email</label>
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
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-50">Message</label>
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
      </div>
    </section>
  );
};

export default ContactMe;
