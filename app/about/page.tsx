import AboutMe from "@/components/AboutMe";
import { playfair } from "@/public/fonts/fonts";

export default function About()
{
    return (

        <main>
            <div className="text-center sm:text-left">
             <h1 className={`pt-32 sm:pt-36 md:pt-48 text-5xl sm:text-7xl  md:text-9xl px-10 sm:px-24 md:px-48 lg:px-56 text-cyan-700 ${playfair.className}`}>About me_</h1>
            <span className="px-10 sm:px-24 md:px-48 lg:px-56 pt-1 sm:pt-2 md:pt-0 text-darkBg dark:text-gray-50 text-sm sm:text-md font-semibold uppercase">
                <a>Writer |</a> 
                <a> Designer |</a> 
                <a> Developer |</a> 
                <a> Engineer</a> 
            {/* <br className="sm:hidden"/> Software, App and Web application</p> */}
            </span>
            </div>

        <AboutMe />
        </main>

    );
}