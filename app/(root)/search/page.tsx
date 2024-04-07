import { fetchProducts } from "@/lib/actions/product-actions";
import React from "react";

const SearchedProducts = async () => {
  const searchedProducts = await fetchProducts();

  return <div>SearchedProducts</div>;
};

export default SearchedProducts;
