import Link from "next/link";

const page = () => {
  return (
    <section className="w-full min-h-screen bg-white">
      <div className="wrapper my-6 flex flex-col lg:flex-row gap-6 lg:gap-14 justify-center">
        <div>
          <Link
            href="/faq/how-to-buy"
            className="text-3xl text-gray-400 font-medium">
            Back
          </Link>
        </div>

        <article className="flex flex-col gap-8 text-[#212529] lg:max-w-[800px]">
          <h1 className="text-3xl font-bold ">
            How to the item im looking for?
          </h1>

          <p className="text-xl">
            You can search for desired products or services on the website by
            typing keywords into the search field or using the category.
            Clicking the "Search" button will display all listings, which you
            can further filter on the left side using additional menu options
            like category, price, condition, and other parameters.
            {/* To view the
            products you've purchased, you can check them on the "My Orders"
            page. */}
          </p>
        </article>
      </div>
    </section>
  );
};

export default page;
