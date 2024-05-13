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
          <h1 className="text-3xl font-bold ">Why can me item be banned?</h1>

          <p className="text-xl">
            For the content posted on the site to comply with the main rules and
            regulations, content moderation is carried out gradually by the
            Content Team. The reasons for blocking content may vary and include:
            Posting in the incorrect category. Violation of censorship. Posting
            types of advertisements that are relevant to other websites, such as
            myauto.ge, myparts.ge, myhome.ge, or myjobs.ge. Registration of
            multiple users. Providing incorrect information. Uploading photos
            that do not comply with the site's rules. Sale of prohibited
            animals. Incorrect pricing. Use of tags in posts. Posting prohibited
            types of advertisements. Repeated posting of the same advertisement.
            Indicating prices or phone numbers in titles or descriptions.
            Providing incomplete information. Sale of products with copyright
            restrictions. Posting advertisements of general types or multiple
            products in one advertisement. Advertising other websites.
            Indicating prices, phone numbers, or text on uploaded photos.
            Posting content not related to Mymarket.ge's theme.
          </p>
        </article>
      </div>
    </section>
  );
};

export default page;
