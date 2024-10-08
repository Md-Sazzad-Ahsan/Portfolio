import UnderConstruction from "@/components/LoadingPage/UnderConstructionPage";
import CardList from "@/components/Unnecessary/PortfolioProjects/CardList";
import ProjectGrid from "@/components/ProjectComponent/ProjectGrid";
import SeparatePages from "@/components/GlobalComponents/SeparatePages";
import { playfair } from "@/public/fonts/fonts";
export default function portfolio() {
    return (
      <main className="pt-20">
        <SeparatePages dividerText="Portfolio_" dividerTextColor="text-cyan-600" subText="CONTENT | WIREFRAME | DESIGN | DEVELOP " className={`py-10  sm:py-20 md:py-28 px-5 sm:px-16 md:px-48 lg:px-56 text-center sm:text-left ${playfair.className}`} />
        <p className="text-sm px-8 sm:px-16 md:px-28 lg:px-56 hidden">I could teach you a thousand lines of code, all neat, following a structure ... but who are we going to fool? Here you have come to see websites, to discover what those projects are like that somehow “ I have given my life ”.</p>
        {/* <CardList maxCards={6} buttonShow={false} /> */}
         {/* maxCards is the limit of how many cards will be in section ALL*/}
         <ProjectGrid buttonType="loadMore" initialCardCount={6} />
         <UnderConstruction />
      </main>
    );
  }