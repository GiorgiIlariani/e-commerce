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
            What do I need to buy an item?
          </h1>

          <p className="text-xl">
            To shop for products on Mymarket, first, go through the
            registration/login process. You can add desired products to your
            cart or simply click "Quick Buy." For some products, you may utilize
            the payment service or request a loan from a bank.
          </p>
        </article>
      </div>
    </section>
  );
};

export default page;
