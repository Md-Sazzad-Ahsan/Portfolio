import AboutMe from "@/components/AboutMe";
import UnderConstruction from "@/components/LoadingPage/UnderConstructionPage";
import SeparatePages from "@/components/SeparatePages";
import { playfair } from "@/public/fonts/fonts";

export default function About()
{
    return (

        <main className="pt-20">
        <SeparatePages dividerText="About me_" subText="Writer | Designer | Developer | Engineer" dividerTextColor="text-cyan-600" className={`py-10 sm:py-20 md:py-28 px-5 sm:px-16 md:px-48 lg:px-56 text-center sm:text-left ${playfair.className}`} />
        <AboutMe />
        <UnderConstruction />
        </main>

    );
}