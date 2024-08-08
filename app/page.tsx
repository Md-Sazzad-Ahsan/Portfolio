import SectionDivider from "@/components/SectionDivider";
import { playfair } from "@/public/fonts/fonts";
import Image from "next/image";
import dp from "@/public/images/programmingImage.svg"
import AboutMe from "@/components/AboutMe";
export default function Home() {


  return (
    <main className=" flex flex-col">
      <section className="flex flex-col sm:flex-row justify-center sm:justify-between gap-20 sm:gap-0 px-5 sm:px-24 md:px-52 py-28 sm:py-32 md:py-36 items-center text-center sm:text-left">
        <span className="">
          <div className="text-darkBg dark:text-gray-50">
          <p className={`${playfair.className} text-2xl sm:text-3xl md:text-5xl font-bold`}>Turning your vision into <br/>a Virtual Wonderland.</p>
          <h1 className="text-sm pt-2">A skilled web developer and designer, crafting user-friendly websites and apps <br/> that deliver engaging digital experiences.</h1>
          <p className={`${playfair.className} text-xl pt-16 font-bold cursor-pointer`}>Read more_</p>
          </div>
        </span>
        <span className="">
          <h1 className={"text-purple-800 dark:text-white text-6xl sm:text-9xl"}>
            {/* <p className={`${playfair.className} relative z-1 md:pr-16 `}>Sazzad</p>
            <p className={`${playfair.className}  text-gray-400 dark:text-purple-700 `}>Ahsan</p> */}
            <Image src={dp} alt="vector image related to my profile" height={400} width={400} className="p-5" />
          </h1>
        </span>
      </section>
      <SectionDivider/>
      <AboutMe/>
    </main>
  );
}
