import Link from "next/link";

const page = () => {
  return (
    <section className="w-full min-h-screen bg-white">
      <div className="wrapper my-6 flex flex-col lg:flex-row gap-6 lg:gap-14 justify-center">
        <div>
          <Link
            href="/faq/how-to-sell"
            className="text-3xl text-gray-400 font-medium">
            Back
          </Link>
        </div>

        <article className="flex flex-col gap-8 text-[#212529] lg:max-w-[800px]">
          <h1 className="text-3xl font-bold ">How to edit my item?</h1>

          <p className="text-xl">
            To edit the item you must go to “My products” and by clickling edit
            icon you will be on editting page.
          </p>
        </article>
      </div>
    </section>
  );
};

export default page;
