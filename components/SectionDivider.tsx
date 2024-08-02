import { playfair } from "@/public/fonts/fonts";
export default function SectionDivider()
{
    return(
<section className="bg-darkBg dark:bg-gray-50 shadow-md">
              <h1 className={`${playfair.className} text-purple-700 font-bold text-6xl sm:text-7xl md:text-9xl px-5 sm:px-56 md:px-60 py-16 sm:py-20`}>About</h1>
      </section>
    );
}