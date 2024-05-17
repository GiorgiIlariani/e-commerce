import Link from "next/link";

const page = () => {
  return (
    <section className="w-full min-h-screen bg-white">
      <div className="wrapper my-6 flex flex-col lg:flex-row gap-6 lg:gap-14 justify-center">
        <Link
          href="/faq/how-to-buy"
          className="text-3xl text-gray-400 font-medium">
          Back
        </Link>

        <article className="flex flex-col gap-8 text-[#212529] lg:max-w-[800px]">
          <h1 className="text-3xl font-bold ">
            What should I do if im buying first time?
          </h1>

          <p className="text-xl">
            In the event of a first-time purchase, it is necessary to add
            personal information and address for delivery. To do this, click the
            "Add Address" button and provide the recipient's name, surname, ID
            number, phone number, and address. If the purchase is intended for a
            legal entity, the corresponding fields must include: organization
            name, identification code, phone number, city/village, and detailed
            address for delivery. For subsequent purchases, you can choose from
            the previously added addresses or add a new one if necessary. After
            selecting the address, click the "Continue" button. Review your
            order and choose one of the 8 payment methods.
          </p>
        </article>
      </div>
    </section>
  );
};

export default page;
