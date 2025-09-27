import ProjectGrid from "@/components/ProjectComponent/ProjectGrid";
import SeparatePages from "@/components/GlobalComponents/SeparatePages";
import { playfair } from "@/public/fonts/fonts";
import SelectedWork from "@/components/ProjectComponent/SelectedWork";
export default function portfolio() {
    return (
      <main className="pt-20">
        <SeparatePages dividerText="Portfolio_" dividerTextColor="text-cyan-600" subText="CONTENT | WIREFRAME | DESIGN | DEVELOP " className={`py-10  sm:py-20 md:py-28 px-5 sm:px-16 md:px-48 lg:px-56 text-center sm:text-left ${playfair.className}`} />
<div className="px-4 md:px-0">
      <SelectedWork/>
</div>

        {/* <CardList maxCards={6} buttonShow={false} /> */}
         {/* maxCards is the limit of how many cards will be in section ALL*/}
         <div className="px-4 sm:px-0 mx-auto max-w-6xl">
         <ProjectGrid buttonType="loadMore" initialCardCount={3} />

         </div>
      </main>
    );
  }