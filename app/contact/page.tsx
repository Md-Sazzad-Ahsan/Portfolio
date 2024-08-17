import SeparatePages from "@/components/SeparatePages";
import UnderConstruction from "@/components/LoadingPage/UnderConstructionPage";
import { playfair } from "@/public/fonts/fonts";
import ContactForm from "@/components/ContactForm/ContactForm";
export default function Contact()
{
    return (

        <main className="pt-20">
        <SeparatePages dividerText="Contact_" dividerTextColor="text-cyan-600" subText="Programming | ICT | GK | Story" className={`py-10 sm:py-20 md:py-28 px-5 sm:px-16 md:px-48 lg:px-56 text-center sm:text-start ${playfair.className}`} />
        <ContactForm />
        <UnderConstruction />
        </main>

    );
}