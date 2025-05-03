"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import MyPhoto from "@/public/images/profilePhoto.jpg";
import AboutSkillsCard from "@/components/GlobalComponents/AboutSkillsCard";
import Button from "@/components/Button/Buttons";
import DoubleButton from "@/components/Button/DoubleButton";
import SocialLinks from "../ContactForm/SocialLinks";

export default function AboutMe() {
  const pathname = usePathname();

  return (
    <main className="dark:bg-darkBg px-5 sm:px-16 md:px-28 lg:px-56 py-20 sm:py-28 items-left sm:items-center">
      <section className="rounded-xl grid grid-cols-1 sm:grid-cols-3 text-darkBg dark:text-gray-50 p-5 md:p-8 lg:p-10 shadow-lg dark:shadow-xl">
        <figure className="col-span-1 relative w-full h-0 pb-[140%]">
          {" "}
          {/* Adjust height ratio as needed */}
          <Image
            src={MyPhoto}
            alt="Author's photo"
            fill
            priority
            sizes="cover"
            className="shadow-xl p-1 bg-gray-50 object-cover"
          />
          {/* Position SocialLinks in front of the image, centered at the bottom */}
          <div className=" absolute inset-x-0 bottom-0 pb-2 bg-white dark:bg-gray-950 bg-opacity-20 dark:bg-opacity-20 shadow">
            {" "}
            {/* Center horizontally and position at the bottom */}
            <SocialLinks className="flex justify-center" />
          </div>
        </figure>

        <figure className="col-span-2 flex flex-col pt-10 sm:pt-0 md:pt-8 lg:pt-10 sm:px-10 sm:items-start">
          <div className="pt-10 sm:pt-8 md:pt-12 font-semibold sm:pl-8 md:pl-12 text-left">
            <span className="text-3xl text-left text-cyan-600">
              Hello. I am <br />
              Md. Sazzad Ahsan
            </span>
            <p className="font-normal pt-5 sm:pt-8">
            A Software Engineer with a B.Sc. in Computer Science and Engineering from Daffodil Institute of IT (DIIT), Dhaka. Specialized in programming, web development, app development, content writing, software engineering, and cybersecurity. Passionate about building innovative software and websites while continuously evolving with emerging technologies. Let’s connect and explore the ever-changing tech landscape together!

            </p>
          </div>

          {pathname === "/about" ? (
            <Button
              href="/ResumeMDSazzadAhsan.pdf" // Update with the correct path to your CV file
              download="Resume_MDSazzadAhsan.pdf"
              buttonText="Save Resume"
              className="self-start w-full md:w-1/3 mx-0 sm:mx-5 md:mx-12 my-8 py-2 hover:underline ring-1 px-6 md:px-8 ring-gray-50 dark:ring-gray-700 hover:ring-cyan-700 text-white bg-cyan-700 hover:bg-cyan-900 text-lg rounded-full text-center cursor-pointer"
            />
          ) : (
            <DoubleButton
              href1="/about"
              href2="/ResumeMDSazzadAhsan.pdf" // Update with the correct path to your CV file
              buttonOneText="Read more"
              buttonTwoText="Resume"
              download="Resume_MDSazzadAhsan.pdf"
              className="pt-5 md:pt-10 md:pl-12 space-x-5 flex justify-between"
            />
          )}
        </figure>
      </section>
      {pathname !== "/about" && <AboutSkillsCard />}
    </main>
  );
}
