import { playfair } from "@/public/fonts/fonts";
export default function SectionDivider()
{
    return(
<section className="bg-darkBg dark:bg-gray-50 shadow-md">
              <h1 className={`${playfair.className} dark:text-darkBg text-gray-50 font-bold text-7xl md:text-10xl text-center sm:text-start px-5 sm:px-56 md:px-60 py-16 sm:py-20`}>About me</h1>
      </section>
    );
}