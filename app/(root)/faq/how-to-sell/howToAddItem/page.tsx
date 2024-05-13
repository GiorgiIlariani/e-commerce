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
          <h1 className="text-3xl font-bold ">How to add my item?</h1>

          <p className="text-xl">
            To add a listing, after authorization, click the "Add" button, fill
            in all the required and desired fields in the opened window. First,
            select the type of listing - either product or service. Then select
            the desired category. In the case of a product, specify whether it
            is for sale or purchase and its condition. Add a description where
            you can provide any additional information. To add images, click the
            "Upload Image" button and select the desired photos (up to 12 photos
            maximum). You can choose the main image from the uploaded images by
            hovering over the desired image and clicking the "Main Image"
            button. You can also add a secondary online selling option on
            Mymarket.ge. This means the process will be fully conducted online.
            For you, the courier service will be free, and in addition, the user
            can pay via bank transfer, while you will receive the full amount
            with the purchase itself. For this, during the addition of the
            listing, select the "Online Selling" button, after which additional
            information fields will appear: bank account number where the
            purchased product value will be credited and the address, weight,
            and exact address where our courier will check for transportation of
            the product. After filling in all the desired fields, click the
            "Add" button. To complete the listing addition process, it is
            necessary to activate the contact number (number confirmation is
            required only once, at the time of first addition). Upon clicking
            the button, an activation code will be sent to the number you
            specified. Click the "Activate" button, enter the received
            activation code in the opened field, and activate the listing. The
            process is free and requires confirmation of the accuracy of the
            specified phone number during the addition of the listing.
          </p>
        </article>
      </div>
    </section>
  );
};

export default page;
