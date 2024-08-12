import Image from "next/image";
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import MyPhoto from "@/public/images/profilePhoto.jpg";
import Link from "next/link";
import AboutSkillsCard from "./AboutSkillsCard";

export default function AboutMe() {
  return (
    <main className="bg-gray-100 dark:bg-darkBg px-5 sm:px-24 md:px-48 lg:px-56 py-28 sm:py-32 md:py-36 items-center">
      <section className="rounded-xl grid grid-cols-1 sm:grid-cols-3 text-darkBg dark:text-gray-50 p-5 md:p-8 lg:p-10 shadow-xl">
        <figure className="col-span-1 relative w-full h-0 pb-[140%]"> {/* Adjust height ratio as needed */}
          <Image
            src={MyPhoto}
            alt="Author's photo"
            fill // This replaces layout="responsive"
            className="shadow-xl p-1 bg-gray-50 object-cover"
          />
        </figure>

        <figure className="col-span-2 flex flex-col pt-10 sm:pt-0 md:pt-8 lg:pt-10 sm:px-10 items-center sm:items-start">
          
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

          <section className="space-x-5 flex sm:pl-12 pt-12 text-xs text-center items-center sm:items-start sm:justify-start">
            <Link
              href="/about"
              className="ring-1 px-8 py-2 bg-cyan-800 dark:bg-gray-50 text-gray-50 dark:hover:text-gray-50 dark:text-darkBg rounded-md font-semibold hover:bg-cyan-700 dark:hover:bg-cyan-900"
            >
              Read more
            </Link>
            <Link href="#" className="rounded-md ring-1 px-8 py-2">
              Download CV
            </Link>
          </section>
        </figure>
      </section>
      <AboutSkillsCard />
    </main>
  );
}
