import CircledCategories from "@/components/shared/home/CircledCategories";
import HowToBuyOnline from "@/components/shared/home/HowToBuy";
import Promoting from "@/components/shared/home/Promoting";
import SavedCategories from "@/components/shared/home/SavedCategories";
import SearchComponent from "@/components/shared/home/Search";
import { Suspense } from "react";
import BuySellLogo from "@/public/assets/images/buy-sell.png";
import NewAddedCategories from "@/components/shared/home/NewAddedProducts";
import Spinner from "@/components/shared/loader/Spinner";
import Categories from "@/components/shared/home/Categories";

const HomePage = () => {
  return (
    <div className="bg-[#f1f3f6]">
      <div className="wrapper">
        <Suspense
          fallback={
            <div className="min-h-[70vh] flex-center">
              <Spinner lg />
            </div>
          }>
          <SearchComponent />
          <Categories />
          <SavedCategories />
          <Promoting
            title="Buy and Sell Items Easily and Quickly"
            description="Buy or sell second-hand or new products online. Utilize courier services or meet in person."
            buttonText="Buy Now"
            image={{
              src: BuySellLogo,
              alt: "buySell logo",
            }}
            route="/search"
          />
          {/* <CircledCategories /> */}
          <NewAddedCategories />
        </Suspense>
      </div>

      <HowToBuyOnline />
    </div>
  );
};

export default HomePage;
