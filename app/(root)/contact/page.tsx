import { ContactPageConstants } from "@/constants";
import Image from "next/image";
import ContactPageForm from "@/components/forms/ContactForm";

const ContactPage = () => {
  return (
    <main className="w-full min-h-screen wrapper bg-[#f1f3f6]">
      <div className="lg:flex-center flex-col lg:flex-row flex-start gap-10 lg:gap-20 py-20">
        <div className="flex flex-1 w-full justify-center items-center bg-white border border-[#dee2e6] rounded-[32px] px-6 lg:px-10 py-8">
          <div className="flex flex-col items-center w-full">
            <div className="flex gap-3 items-center">
              <Image
                src="/assets/images/contact/contact-icon.svg"
                alt="Contact Image"
                width={20}
                height={20}
              />
              <h1 className="text-2xl font-bold">მოგვწერე</h1>
            </div>
            <div className="flex flex-col mt-5 w-full">
              <ContactPageForm />
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center pl-10  lg:p-0">
          <div className="relative hidden lg:block">
            <Image
              src="/assets/images/contact/contact-map.svg"
              alt="Contact Image"
              width={480}
              height={360}
              className="w-full object-cover"
            />
            <Image
              src="/assets/images/contact/location-marker.svg"
              alt="location marker"
              className="absolute left-[55%] top-[15%] z-10"
              style={{ animation: "pulse 2s infinite" }}
              width={112}
              height={112}
            />
          </div>

          <div className="mt-8 flex flex-col gap-5">
            {ContactPageConstants.map((item) => (
              <div key={item.id} className="flex items-center gap-3 h-auto">
                <div className="flex justify-center items-center">
                  <Image
                    src={item.img}
                    alt="contact img"
                    width={25}
                    height={20}
                  />
                </div>
                <p className="text-[#8996ae] text-base font-semibold cursor-pointer hover:text-black duration-200 ease-out">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
