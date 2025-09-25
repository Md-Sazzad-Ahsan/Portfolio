'use client'
import Image from 'next/image'

const galleryItems = [
  { id: 1, src: '/achievements/RCDCCertifyGroupPhoto.jpg', title: 'Best Contributor in Web Development' },
  { id: 2, src: '/achievements/RCDCProject.jpg', title: 'Contributed to RCDC Web-Application' },
  { id: 3, src: '/achievements/AchievementCertificate.jpg', title: 'Award - Bangladesh Competetion Commission' },
//   { id: 4, src: '/projectImages/APIImage.jpg', title: 'Architecture' },
//   { id: 5, src: '/projectImages/APIImage.jpg', title: 'Ocean Breeze' },
//   { id: 6, src: '/projectImages/APIImage.jpg', title: 'Urban Design' },
]

export default function BentoGallery() {
  return (
    <div className="max-w-6xl mx-auto p-5 md:p-0 mt-20 mb-8">
        <span>
        <h1 className='text-3xl text-center md:text-start font-bold text-darkBg dark:text-gray-50'>Achievements</h1>
        <h2 className='text-sm md:text-md text-center md:text-start text-gray-500 dark:text-gray-50 py-1'>Highlights of My Professional and Academic Achievements</h2>
        </span>
        <hr className='mb-5' />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="relative h-60 w-full overflow-hidden rounded-xl"
          >
            <Image
              src={item.src}
              alt={item.title}
              layout="fill"
              objectFit="cover"
              loading='lazy'
              className="hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 w-full bg-gray-500 text-gray-100 dark:bg-gray-600 text-sm px-3 py-1 font-medium bg-opacity-50 backdrop-blur-sm">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
