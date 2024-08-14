import SectionDivider from "@/components/SectionDivider";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import VectorImage from "@/public/images/programmingImage.svg"
import AboutMe from "@/components/AboutMe";
import PortfolioSectionDivider from "@/components/PortfolioSectionDivider";
import CardList from "@/components/PortfolioProjects/CardList";

export default function Home() {
  return (
    <main className=" flex flex-col">
      <section className="flex flex-col sm:flex-row justify-between gap-20 sm:gap-5 sm:px-16 md:px-48 lg:px-56 py-28 sm:py-36 md:py-40 items-left text-left">
        <span className="px-8 sm:px-0 sm:pr-10 md:pr-16 lg:pr-20">
          <div className="text-darkBg dark:text-gray-50">
          <div className={"text-3xl sm:text-4xl md:text-5xl font-bold"}>Turning <span className="text-cyan-600">ideas </span>into a<br/>remarkable <a className="text-cyan-600">Website</a> </div>
          <h1 className="text-sm pt-2">A skilled web developer and designer, crafting user-friendly websites and apps <br className="hidden sm:static"/> that deliver engaging digital experiences.</h1>
          <p className=" text-xl mt-10 text-cyan-500 font-semibold flex items-center"> <Link href="/about" className="hover:text-cyan-600 cursor-pointer">Read more</Link><IoIosArrowRoundForward className="pt-1 h-7 w-7 hover:text-cyan-600 cursor-pointer" /></p>
          </div>
        </span>
        <span>
            <Image src={VectorImage} alt="vector image related to my profile" height={400} width={400} className="p-5" />
        </span>
      </section>
      <SectionDivider/>
      <AboutMe/>
      <PortfolioSectionDivider />
      <CardList maxCards={2} buttonShow={true} /> 
      {/* maxCards is the limit of how many cards will be in section ALL */}
    </main>
  );
}
