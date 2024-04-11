"use client";

import { fetchSingleProduct } from "@/lib/actions/product-actions";
import { useEffect, useState } from "react";

const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
  const [productDetails, setProductDetails] = useState<Product>();

  const user =
    typeof window !== "undefined" && localStorage.getItem("access-token");

  useEffect(() => {
    const fetchSingleProductDetails = async () => {
      const details = await fetchSingleProduct(params.id, user);
      setProductDetails(details);
    };
    fetchSingleProductDetails();
  }, []);

  console.log({ productDetails });

  return <div>ProductDetailsPage</div>;
};

export default ProductDetailsPage;
