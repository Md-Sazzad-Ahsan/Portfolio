// import UnderConstruction from "@/components/LoadingPage/UnderConstructionPage"
import CardList from "@/components/PortfolioProjects/CardList";
export default function portfolio() {
    return (
      <main>
        <CardList maxCards={6} buttonShow={false} />
         {/* maxCards is the limit of how many cards will be in section ALL*/}
      </main>
    );
  }