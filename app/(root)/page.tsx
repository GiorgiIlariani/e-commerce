import CircledCategories from "@/components/shared/home/CircledCategories";
import HowToBuyOnline from "@/components/shared/home/HowToBuy";
import Promoting from "@/components/shared/home/Promoting";
import SavedCategories from "@/components/shared/home/SavedCategories";
import SearchComponent from "@/components/shared/home/Search";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <div className="bg-[#f1f3f6]">
      <div className="wrapper">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchComponent />
          <SavedCategories />
          <Promoting />
          <CircledCategories />
        </Suspense>
      </div>

      <HowToBuyOnline />
    </div>
  );
};

export default HomePage;
