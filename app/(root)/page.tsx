import CircledCategories from "@/components/shared/home/CircledCategories";
import HowToBuyOnline from "@/components/shared/home/HowToBuy";
import Promoting from "@/components/shared/home/Promoting";
import SavedCategories from "@/components/shared/home/SavedCategories";
import SearchComponent from "@/components/shared/home/Search";
import { Suspense } from "react";
import BuySellLogo from "@/public/assets/images/buy-sell.png";

const HomePage = () => {
  return (
    <div className="bg-[#f1f3f6]">
      <div className="wrapper">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchComponent />
          <SavedCategories />
          <Promoting
            title="იყიდე-გაყიდე ნივთები მარტივად და სწრაფად"
            description=" იყიდე/გაყიდე მეორადი ან ახალი პროდუქცია განვადების შესაძლებლობით
            ონლაინ. ისარგებლე კურიერის მომსახურებით ან პირადად შეხვდით
            ერთმანეთს."
            buttonText="იყიდე ახლა"
            image={{
              src: BuySellLogo,
              alt: "buySell logo",
            }}
          />
          {/* <CircledCategories /> */}
        </Suspense>
      </div>

      <HowToBuyOnline />
    </div>
  );
};

export default HomePage;
