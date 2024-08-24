import React from 'react'
import Image from 'next/image';
export default function LastBlog() {
  return (
    <main className='px-5 sm:px-16 md:px-28 lg:px-56 mt-2 md:mt-5'>
      <section className='grid grid-cols-1 sm:grid-cols-12 shadow-lg rounded-md bg-gray-50 dark:bg-darkBg'>
      <section className='col-span-full sm:col-span-2'>
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
        </section>
           <figure className='col-span-full sm:col-span-10 grid grid-cols-1 md:grid-cols-7'>
            <div className='bg-gray-200 dark:bg-slate-500 relative col-span-full sm:col-span-5 p-2'>
                <div className='flex justify-between text-xs sm:text-sm md:text-md pb-2'>
                    <p>Category</p>
                    <p>24 AUG</p>
                </div>
                <div className='text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold sm:font-bold py-2'>Create MarkDown for Your GitHub Readme file.</div>
                <Image src="/projectImages/PortfolioImage.jpg" alt="Main Image of Last Blog" height={300} width={500} priority sizes='cover' />
                <div>Content Description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro eum, atque explicabo nostrum ipsam reprehenderit quam. Hic consectetur architecto eos, error eaque, omnis, obcaecati vitae quibusdam dolor in similique quas!</div>
                <button className='mt-5 font-bold text-cyan-500 hover:underline hover:cursor-pointer'>Read Article</button>
            </div>

            <figure className='col-span-full md:col-span-2 px-2 bg-gray-100 dark:bg-slate-600'>
                <div className='flex justify-between'>
                    <p>Comments</p>
                    <p className='text-cyan-500'>15</p>
                </div>
                <hr/>
                    <p className='text-center p-5'>Awesome!</p>
            </figure>
           </figure>
      </section>
    </main>
  );
};
