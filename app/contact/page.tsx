import SeparatePages from "@/components/SeparatePages";
import UnderConstruction from "@/components/LoadingPage/UnderConstructionPage";
import { playfair } from "@/public/fonts/fonts";
import ContactForm from "@/components/ContactForm/ContactForm";
import MapImage from "@/components/ContactForm/MapImage";
export default function Contact()
{
    return (

        <main className="pt-20">
        <SeparatePages dividerText="Contact_" dividerTextColor="text-cyan-600" subText="Prototype | Website | Application | SEO" className={`px-5 sm:px-16 md:px-28 lg:px-56 py-10 sm:py-20 md:py-28 text-center sm:text-start ${playfair.className}`} />
        <ContactForm />
        <MapImage />
        <UnderConstruction />
        </main>

    );
}