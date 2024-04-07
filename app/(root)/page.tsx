import CircledCategories from "@/components/shared/home/CircledCategories";
import HowToBuyOnline from "@/components/shared/home/HowToBuy";
import Promoting from "@/components/shared/home/Promoting";
import SavedCategories from "@/components/shared/home/SavedCategories";
import SearchComponent from "@/components/shared/home/Search";
import { fetchProducts } from "@/lib/actions/product-actions";

const HomePage = async () => {
  const products = await fetchProducts();
  console.log({ products });

  return (
    <div className="bg-[#f1f3f6]">
      <div className="wrapper">
        <SearchComponent />
        <SavedCategories />
        <Promoting />
        <CircledCategories />
      </div>

      <HowToBuyOnline />
    </div>
  );
};

export default HomePage;
