import CardList from "@/components/PortfolioProjects/CardList";
import PortfolioSectionDivider from "@/components/PortfolioSectionDivider";
export default function portfolio() {
    return (
      <main className="">
        <PortfolioSectionDivider/>
        <CardList maxCards={2} buttonShow={false} />
         {/* maxCards is the limit of how many cards will be in section ALL*/}
      </main>
    );
  }