import { playfair } from "@/public/fonts/fonts";
export default function PortfolioSectionDivider()
{
    return(
<section className="bg-darkBg dark:bg-gray-50 shadow-md">
              <h1 className={`${playfair.className} dark:text-darkBg text-gray-50 font-bold text-5xl md:text-8xl px-5 sm:px-56 py-16 sm:py-20`}>Portfolio</h1>
      </section>
    );
}