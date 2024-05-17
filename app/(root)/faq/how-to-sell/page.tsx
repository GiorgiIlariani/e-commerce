import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="w-full min-h-screen bg-white">
      <div className="wrapper my-6">
        <Link href="/faq" className="text-3xl text-gray-400 font-medium">
          Back
        </Link>
        <h1 className="text-3xl font-bold text-[#212529] mt-6">
          How to sell my item
        </h1>

        <div className="flex flex-col gap-4 text-xl text-blue-600 mt-10">
          <Link href="/faq/how-to-sell/howToAddItem">How to add my item?</Link>
          <Link href="/faq/how-to-sell/howToEditItem">
            How to edit my item?
          </Link>
          <Link href="/faq/how-to-sell/whyItemsCanBeBanned">
            Why can my item be banned?
          </Link>
        </div>
      </div>
    </section>
  );
};

export default page;
