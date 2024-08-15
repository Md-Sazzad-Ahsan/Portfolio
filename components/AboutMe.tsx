import Image from "next/image";
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import MyPhoto from "@/public/images/profilePhoto.jpg";
import Link from "next/link";
import AboutSkillsCard from "./AboutSkillsCard";
import Button from "./buttons/Button";
import DoubleButton from "./buttons/DoubleButton";

export default function AboutMe() {
  return (
    <main className="dark:bg-darkBg px-5 sm:px-16 md:px-48 lg:px-56 py-20 sm:py-28 items-left sm:items-center">
      <section className="rounded-xl grid grid-cols-1 sm:grid-cols-3 text-darkBg dark:text-gray-50 p-5 md:p-8 lg:p-10 shadow-lg dark:shadow-xl">
        <figure className="col-span-1 relative w-full h-0 pb-[140%]"> {/* Adjust height ratio as needed */}
          <Image
            src={MyPhoto}
            alt="Author's photo"
            fill // This replaces layout="responsive"
            // sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="shadow-xl p-1 bg-gray-50 object-cover"
          />
        </figure>

        <figure className="col-span-2 flex flex-col pt-10 sm:pt-0 md:pt-8 lg:pt-10 sm:px-10 sm:items-start">
          
          <div className="pt-10 sm:pt-8 md:pt-12 font-semibold sm:pl-8 md:pl-12 text-left">
          <span className="text-3xl text-left">
            Hello I am, <br />
            Md. Sazzad Ahsan
          </span>
            <p className="font-normal pt-5 sm:pt-8">
              A recent graduate with a B.Sc. in Software Engineering from Daffodil Institute of IT (DIIT), Dhaka. Passionate about programming, web, app, software development, and cybersecurity. Eager to evolve as a skilled Software Engineer. Lets connect and explore the tech world together!
            </p>
            <div className="justify-start pt-4 gap-2 pr-5 hidden sm:flex">
              <a href="#">
                <FaSquareGithub className="text-xl" />
              </a>
              <a href="#">
                <FaFacebookSquare className="text-xl" />
              </a>
              <a href="#">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#">
                <FaTwitterSquare className="text-xl" />
              </a>
            </div>
          </div>
         <Button href="/about" buttonText="Read more" className="self-start px-0 py-2 font-bold sm:hidden text-left cursor-pointer" />
         <DoubleButton href1="/about" href2="#" buttonOneText="Read more" buttonTwoText="Download CV" className=" pt-5 md:pt-10 md:pl-12" />
        </figure>
      </section>
      <AboutSkillsCard />
    </main>
  );
}
