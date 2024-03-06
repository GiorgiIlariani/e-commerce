import LogInForm from "@/components/forms/LogInForm";
import Link from "next/link";
import React from "react";

const SignInPage = () => {
  return (
    <div className="flex flex-col">
      <h2 className="text-[28px] font-medium">Create an account</h2>
      <div className="max-w-xl py-6 w-full">
        <LogInForm type="SignUp" />
      </div>
      <div className="max-w-xl mt-6 text-center">
        <p className="text-lg text-gray-400">
          with an existing account -{" "}
          <Link href="/sign-in" className="text-[#fec900]">
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
