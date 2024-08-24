import React from 'react'
import Image from 'next/image';
export default function LastBlog() {
  return (
    <main className='px-5 sm:px-16 md:px-28 lg:px-56 mt-2 md:mt-5'>
      <section className='shadow-lg rounded-md bg-gray-50 dark:bg-darkBg'>
      {/* <section className='col-span-full sm:col-span-2'>
            <aside className='px-2'>
                <div className='pb-5 sm:pb-8'>
                    <p className='pb-2 font-bold text-cyan-500' >All Categories</p>
                    <ul className='space-x-2 sm:space-x-0 sm:space-y-1 flex sm:block pb-5 pl-5 font-semibold'>
                        <li className='hover:text-cyan-500 hover:cursor-pointer hover:underline'>GitHub</li>
                        <li className='hover:text-cyan-500 hover:cursor-pointer hover:underline'>Current Affairs</li>
                        <li className='hover:text-cyan-500 hover:cursor-pointer hover:underline'>News</li>
                        <li className='hover:text-cyan-500 hover:cursor-pointer hover:underline'>Internet</li>
                    </ul>
                </div>
            </aside>
        </section> */}
           <figure className='grid grid-cols-1 md:grid-cols-7'>
            <div className='relative col-span-full sm:col-span-5 p-2 bg-gray-50 bg-opacity-10 ring ring-gray-100 dark:ring-gray-600'>
                <div className='text-darkBg dark:text-gray-50 flex justify-between text-xs sm:text-sm md:text-md pb-2'>
                    <p className='bg-gray-300 dark:bg-gray-600 text-darkBg dark:text-gray-50 px-1'>Technology</p>
                    <p>24 AUG</p>
                </div>
                <div className='text-darkBg dark:text-gray-50 text-xl md:text-2xl lg:text-4xl font-semibold sm:font-bold py-2'>Create MarkDown for Your GitHub Readme file.</div>
                <div className='pb-4'>
                <p className='text-sm pb-2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel debitis facere modi beatae odit nam unde porro eos a fuga.</p>
                <Image src="/projectImages/PortfolioImage.jpg" alt="Main Image of Last Blog" height={300} width={500} priority sizes='cover' />
                <p className='text-xs'> by Md. Sazzad Ahsan</p>
                </div>
                <div className='text-darkBg dark:text-gray-50'>Content Description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro eum, atque explicabo nostrum ipsam reprehenderit quam. Hic consectetur architecto eos, error eaque, omnis, obcaecati vitae quibusdam dolor in similique quas!</div>
                <button className='mt-5 font-bold text-cyan-500 hover:underline hover:cursor-pointer'>Read Article</button>
            </div>

            <figure className='col-span-full md:col-span-2 px-2 bg-gray-100 dark:bg-gray-600 bg-opacity-10 dark:bg-opacity-5 ring ring-gray-100 dark:ring-gray-600'>
                <div className='flex justify-between'>
                    <p className='text-darkBg dark:text-gray-50 bg-'>Comments</p>
                    <p className='text-cyan-500'>15</p>
                </div>
                <hr/>
                    <p className='text-center p-5'>No Comment!</p>
            </figure>
           </figure>
      </section>
    </main>
  );
};
