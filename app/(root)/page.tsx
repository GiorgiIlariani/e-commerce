import SearchComponent from "@/components/shared/Search";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <div className="min-h-[200vh] flex flex-col mt-8">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchComponent />
      </Suspense>
    </div>
  );
};

export default HomePage;
