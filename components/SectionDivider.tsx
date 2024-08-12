import { playfair } from "@/public/fonts/fonts";
export default function SectionDivider()
{
    return(
<section className="bg-darkBg dark:bg-gray-100 shadow-md">
              <h1 className={`${playfair.className} dark:text-darkBg text-gray-50 font-bold text-5xl md:text-8xl px-8 sm:px-56 py-16 sm:py-20 md:py-24`}>About me</h1>
      </section>
    );
}