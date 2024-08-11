import SectionDivider from "@/components/SectionDivider";
import Image from "next/image";
import VectorImage from "@/public/images/programmingImage.svg"
import AboutMe from "@/components/AboutMe";
import PortfolioSectionDivider from "@/components/PortfolioSectionDivider";
import PortfolioCards from "./portfolio/page";
export default function Home() {


  return (
    <main className=" flex flex-col">
      <section className="flex flex-col sm:flex-row justify-between gap-20 sm:gap-5 px-5 sm:px-16 md:px-56 py-28 sm:py-36 md:py-40 items-left text-left sm:text-left">
        <span className="sm:pr-10 md:pr-16">
          <div className="text-darkBg dark:text-gray-50">
          <p className={"text-3xl sm:text-4xl md:text-5xl font-bold"}>Turning your vision into <br/>a Virtual Wonderland.</p>
          <h1 className="text-sm pt-2">A skilled web developer and designer, crafting user-friendly websites and apps <br className="hidden sm:static"/> that deliver engaging digital experiences.</h1>
          <p className={` text-xl pt-16 font-semibold cursor-pointer`}>Read more_</p>
          </div>
        </span>
        <span>
          <h1 className={"text-purple-800 dark:text-white text-6xl sm:text-9xl"}>
            {/* <p className={`${playfair.className} relative z-1 md:pr-16 `}>Sazzad</p>
            <p className={`${playfair.className}  text-gray-400 dark:text-purple-700 `}>Ahsan</p> */}
            <Image src={VectorImage} alt="vector image related to my profile" height={400} width={400} className="p-5" />
          </h1>
        </span>
      </section>
      <SectionDivider/>
      <AboutMe/>
      <PortfolioSectionDivider />
      <PortfolioCards />
    </main>
  );
}
