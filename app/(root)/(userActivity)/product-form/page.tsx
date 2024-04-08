import ProductForm from "@/components/forms/productForm";
import { fetchCategoriesList } from "@/lib/actions/categories-actions";
import React from "react";

const ProductFormPage = async () => {
  // const categories = await fetchCategoriesList();
  // console.log({ categories });

  return <ProductForm />;
};

export default ProductFormPage;
