import LogInForm from "@/components/forms/LogInForm";
import Link from "next/link";
import React from "react";

const SignInPage = () => {
  return (
    <div className="flex flex-col">
      <h2 className="text-[28px] font-medium">Authorization</h2>
      <div className="max-w-xl py-6 w-full">
        <LogInForm type="Sign In" />
      </div>
      <div className="max-w-xl mt-6 text-center">
        <p className="text-lg text-gray-400">
          Don't have an account -{" "}
          <Link href="/sign-up" className="text-[#fec900]">
            create
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
