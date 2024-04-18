import UserActivityHeader from "@/components/shared/UserActivityHeader";
import React from "react";

const MyProductsPage = () => {
  return (
    <section className="w-full min-h-screen bg-[#f1f3f6]">
      <div className="wrapper flex flex-col">
        <UserActivityHeader route="My Cart" />
        MyProductsPage
      </div>
    </section>
  );
};

export default MyProductsPage;
