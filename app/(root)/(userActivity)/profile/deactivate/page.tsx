"use client";

import DeactivateForm from "@/components/forms/profile-forms/Deactivate";
import isAuth from "@/lib/actions/isAuth";

const DeactivatePage = () => {
  return (
    <section className="w-full flex flex-col">
      <h3 className="text-base font-medium mb-6">
        Enter the current username to delete the account
      </h3>
      <DeactivateForm />
    </section>
  );
};

export default isAuth(DeactivatePage);
