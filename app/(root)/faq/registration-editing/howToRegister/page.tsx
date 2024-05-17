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
          <h1 className="text-3xl font-bold ">How to register my account?</h1>

          <p className="text-xl">
            To complete registration with Mymarket, follow these steps: On the
            main page, click the "Login" button. On the opened page, you must
            fill all the fields(email, password, username, first_name,
            last_name). After activating your profile, you can proceed with
            authorization and enjoy all the functionalities of Mymarket.
          </p>
        </article>
      </div>
    </section>
  );
};

export default page;
