import AboutMe from "@/components/AboutMe";
import SeparatePages from "@/components/SeparatePages";
import { playfair } from "@/public/fonts/fonts";

export default function About()
{
    return (

        <main className="pt-20">
        <SeparatePages dividerText="About me_" subText="Writer | Designer | Developer | Engineer" className={`py-10  sm:py-20 md:py-28  text-center sm:text-left ${playfair.className}`} />
        <AboutMe />
        </main>

    );
}