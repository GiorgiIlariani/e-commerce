import React, { useState } from "react";

const MyProductsFilter = () => {
  const [myAddedProductsCategories, setMyAddedProductsCategories] = useState(
    []
  );

  return (
    <div className="w-full rounded-[16px] py-6 px-4 bg-white flex items-center gap-4">
      {/* search */}
      <div className="flex-1 max-w-[320px]">search input</div>

      {/* categories */}
      <div className="flex-1 max-w-[230px]">categories input</div>

      {/* date picker */}
      <div className="flex-1 max-w-[160px]">date picker</div>

      {/* price */}
      <div className="flex-1 max-w-[130px]">price</div>
    </div>
  );
};

export default MyProductsFilter;
