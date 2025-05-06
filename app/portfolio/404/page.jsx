import Link from 'next/link';
import Image from 'next/image';
export default function Custom404() {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/projectImages/PageNotLive.jpg"
          alt="Vintage bus in a desert landscape"
          layout="fill"
          objectFit="cover"
          className="opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-60"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <span className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">
          sorry
        </span>
        <h1 className="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
          Page not Available
        </h1>
        <p className="mt-3 text-lg text-gray-200">
          Domain name expired or maybe the page not published yet!
        </p>
        <Link href="/" className="mt-6">
          <span className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18m-4-4l-4-4m0 0l4 4m-4-4h18" /></svg>
            Back to home
          </span>
        </Link>
      </div>
    </div>
  );
}