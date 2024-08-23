import Image from "next/image";

function LatestBlogGrid() {
  return (
    <main className="px-5 sm:px-16 md:px-28 lg:px-56 py-5 sm:py-10">
      <section className="grid grid-cols-1 sm:grid-cols-3 lg:h-[600px] p-2 gap-2">
        <div className="relative col-span-full sm:col-span-2 bg-gray-700 h-[300px] sm:h-[405px] md:h-[505px] lg:h-full group">
          <Image src="/images/TempImage.jpg" alt="Latest Blog Image" fill priority sizes="cover" />
          <div className="absolute inset-0 flex flex-col justify-start p-4 bg-gray-700 bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex justify-between pb-2">
              <p className="text-xs md:text-sm text-gray-300">Category</p>
              <p className="text-xs md:text-sm text-gray-300">24 AUG</p>
            </div>
            <h2 className="text-sm sm:text-md md:text-xl mt-1 font-bold text-white">Main Blog Post Headline</h2>
            <p className="text-gray-200 mt-2">This is a short description of the main blog post.</p>
            <a href="#" className="mt-5 text-cyan-500 hover:underline">Read Article</a>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-1 flex flex-col gap-2">
          <aside className="relative bg-gray-500 h-[300px] sm:h-[200px] md:h-[250px] lg:h-[290px] group">
            <Image src="/images/TempImage.jpg" alt="Blog Post 1 Image" fill priority sizes="cover" />
            <div className="absolute inset-0 flex flex-col justify-start p-4 bg-gray-500 bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex justify-between pb-2">
              <p className="text-xs sm:text-sm text-gray-300">Category</p>
              <p className="text-xs sm:text-sm text-gray-300">24 AUG</p>
            </div>
              <h2 className="text-sm sm:text-md md:text-lg lg:text-xl mt-1 font-bold text-white">Blog Post 1 Headline</h2>
              <p className="text-gray-200 mt-2">This is a short description of the first blog post.</p>
              <a href="#" className="mt-5 text-cyan-500 hover:underline">Read Article</a>
            </div>
          </aside>
          <aside className="relative bg-gray-600 h-[300px] sm:h-[200px] md:h-[250px] lg:h-[290px] group">
            <Image src="/images/TempImage.jpg" alt="Blog Post 2 Image" fill priority sizes="cover" />
            <div className="absolute inset-0 flex flex-col justify-start p-4 bg-gray-600 bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex justify-between pb-2">
              <p className="text-xs sm:text-sm text-gray-300">Category</p>
              <p className="text-xs sm:text-sm text-gray-300">24 AUG</p>
            </div>
              <h2 className="text-sm sm:text-md md:text-lg lg:text-xl mt-1 font-bold text-white">Blog Post 2 Headline</h2>
              <p className="text-gray-200 mt-2">This is a short description of the second blog post.</p>
              <a href="#" className="mt-5 text-cyan-500 hover:underline">Read Article</a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default LatestBlogGrid;
