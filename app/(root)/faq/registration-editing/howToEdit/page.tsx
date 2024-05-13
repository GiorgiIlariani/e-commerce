import Link from "next/link";

const page = () => {
  return (
    <section className="w-full min-h-screen bg-white">
      <div className="wrapper my-6 flex flex-col lg:flex-row gap-6 lg:gap-14 justify-center">
        <div>
          <Link
            href="/faq/registration-editing"
            className="text-3xl text-gray-400 font-medium">
            Back
          </Link>
        </div>

        <article className="flex flex-col gap-8 text-[#212529] lg:max-w-[800px]">
          <h1 className="text-3xl font-bold ">How to edit my account?</h1>

          <p className="text-xl">
            After clickling profile picture choose Edit Account”, after that you
            can change any information like editing user credensials, changing
            password or deleting account. If you use mobile device use the menu
            button on the top right corner of the screen.
          </p>
        </article>
      </div>
    </section>
  );
};

export default page;
