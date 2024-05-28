import LogInForm from "@/components/forms/LogInForm";
import Link from "next/link";
import React from "react";

const SignInPage = () => {
  return (
    <div className="w-full sm:max-w-xl flex flex-col my-10">
      <h2 className="text-[28px] font-medium">Create an account</h2>
      <div className="sm:max-w-xl py-6 w-full">
        <LogInForm type="Sign Up" />
      </div>
      <div className="max-w-xl mt-6 text-center">
        <p className="text-lg text-gray-400">
          with an existing account -{" "}
          <Link href="/sign-in" className="text-primary">
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
