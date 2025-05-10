import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import VectorImage from "@/public/images/programmingImage.svg"
import AboutMe from "@/components/AboutMe/AboutMe";
import SeparatePages from "@/components/GlobalComponents/SeparatePages";
import { playfair } from "@/public/fonts/fonts";
import BlogGrid from "@/components/BlogComponent/BlogGrid";
import ProjectGrid from "@/components/ProjectComponent/ProjectGrid";
import SelectedWork from "@/components/ProjectComponent/SelectedWork";
import Testimonial from "@/components/AboutMe/Testimonial"

export default function Home() {
  return (
    <main className=" flex flex-col pt-20">
      <section className="flex flex-col sm:flex-row justify-between gap-20 sm:gap-5 sm:px-16 md:px-28 lg:px-56 py-10 sm:py-20 md:py-28 items-left text-left">
        <span className="px-8 sm:px-0 sm:pr-10 md:pr-16 lg:pr-20">
          <div className="text-darkBg dark:text-gray-50">
          <div className={"text-3xl sm:text-4xl md:text-5xl font-bold"}>Turning <span className="text-cyan-600">ideas </span>into a<br/>remarkable <a className="text-cyan-600">Website</a> </div>
          <h1 className="text-sm pt-2">A skilled web developer and designer, crafting user-friendly websites and apps <br className="hidden sm:static"/> that deliver engaging digital experiences.</h1>
          <p className=" text-xl mt-10 text-cyan-500 hover:text-cyan-600 cursor-pointer font-semibold flex items-center"> <Link href="/about" className="">Read more</Link><GoArrowUpRight className="pt-1 h-6 w-6" /></p>
          </div>
        </span>
        <span>
            <Image src={VectorImage} alt="vector image related to my profile" priority height={400} width={400} className="p-5" />
        </span>
      </section>
      <SeparatePages dividerText="About me_" dividerTextColor="dark:text-darkBg text-gray-50" className={`bg-darkBg dark:bg-gray-100 py-20 md:py-28 px-5 sm:px-16 md:px-28 lg:px-56 sm:text-left ${playfair.className}`} />
      <AboutMe/>
      <SeparatePages dividerText="Projects_" dividerTextColor="dark:text-darkBg text-gray-50" className={`bg-darkBg dark:bg-gray-100 py-20 md:py-28 px-5 sm:px-16 md:px-28 lg:px-56 sm:text-left ${playfair.className}`} />
      {/* <CardList maxCards={6} buttonShow={true} />  */}
      <SelectedWork/>
      <ProjectGrid buttonType="viewMore" initialCardCount={3} />
      <SeparatePages dividerText="My Blog_" dividerTextColor="dark:text-darkBg text-gray-50" className={`mt-20 md:mt-28 bg-darkBg dark:bg-gray-100 py-20 md:py-28 px-5 sm:px-16 md:px-28 lg:px-56 sm:text-left ${playfair.className}`} />
      {/* <BlogList maxBlogs={6} buttonShow={true} />  */}
      <BlogGrid buttonType={"viewMore"} initialCardCount={6} />
      <Testimonial/>

    </main>
  );
}
