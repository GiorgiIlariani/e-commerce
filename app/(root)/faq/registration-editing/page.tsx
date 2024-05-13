import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="w-full min-h-screen bg-white">
      <div className="wrapper my-6">
        <h1 className="text-3xl font-bold text-[#212529]">
          Registration / Editting user account
        </h1>

        <div className="flex flex-col gap-4 text-xl text-blue-600 mt-10">
          <Link href="/faq/registration-editing/howToRegister">
            How to register my account?
          </Link>
          <Link href="/faq/registration-editing/howToEdit">
            How to edit my account?
          </Link>
        </div>
      </div>
    </section>
  );
};

export default page;
