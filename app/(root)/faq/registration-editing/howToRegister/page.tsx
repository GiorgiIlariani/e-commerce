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
            main page, click the "Login" button. On the opened page, choose
            registration and fill in all required fields: Select your gender.
            Enter your email address. An active email address must be provided
            as profile activation requires confirmation from the provided email.
            Password: Enter your desired combination of symbols. You can use
            Latin/Georgian alphabets, numbers, or safe symbols. Repeat Password:
            Re-enter the password combination provided above. Mobile Number:
            Enter the active phone number in this field. Code: Specify the
            symbols displayed in the image in the code field. Familiarize
            yourself and agree to the site's terms and privacy policy, then
            click the "Register" button. For activation of your personal
            profile, it is necessary to proceed to the activation link sent to
            the provided email address. After activating your profile, you can
            proceed with authorization and enjoy all the functionalities of
            Mymarket.
          </p>
        </article>
      </div>
    </section>
  );
};

export default page;
