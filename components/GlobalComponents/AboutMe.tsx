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
    <main className="dark:bg-darkBg px-5 sm:px-16 md:px-48 lg:px-56 py-20 sm:py-28 items-left sm:items-center">
      <section className="rounded-xl grid grid-cols-1 sm:grid-cols-3 text-darkBg dark:text-gray-50 p-5 md:p-8 lg:p-10 shadow-lg dark:shadow-xl">
       <figure className="col-span-1 relative w-full h-0 pb-[140%]"> {/* Adjust height ratio as needed */}
  <Image
    src={MyPhoto}
    alt="Author's photo"
    fill
    priority
    sizes="cover"
    className="shadow-xl p-1 bg-gray-50 object-cover"
  />
  {/* Position SocialLinks in front of the image, centered at the bottom */}
  <div className=" absolute inset-x-0 bottom-0 mb-2"> {/* Center horizontally and position at the bottom */}
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
              A recent graduate with a B.Sc. in Software Engineering from Daffodil Institute of IT (DIIT), Dhaka. Passionate about programming, web, app, software development, and cybersecurity. Eager to evolve as a skilled Software Engineer. Lets connect and explore the tech world together!
            </p>
           
          </div>

          {pathname === "/about" ? (
            <Button
              href="#"
              buttonText="Download CV"
              className="self-start mx-0 sm:mx-8 md:mx-12 mt-4 py-2 hover:underline hover:text-cyan-600 font-bold text-left cursor-pointer"
            />
          ) : (
            <DoubleButton
              href1="/about"
              href2="#"
              buttonOneText="Read more"
              buttonTwoText="Download CV"
              className="pt-5 md:pt-10 md:pl-12 space-x-5"
            />
          )}
        </figure>
      </section>
      <AboutSkillsCard />
    </main>
  );
}
