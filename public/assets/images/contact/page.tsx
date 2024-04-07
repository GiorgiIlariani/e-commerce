import Image from "next/image";
import ContactImage from "@/public/assets/images/footer/contact-icon.svg";
import ContactMap from "@/public/assets/images/footer/contact-map.svg";
import LoactionMarker from "@/public/assets/images/footer/location-marker.svg";
import { ContactPageConstants } from "../../../../constants";
import ContactForm from "@/components/forms/ContactForm";

const ContactPage = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-20 py-[130px] max-w-7xl mx-auto md:px-[30px] px-5">
      {/* left side */}
      <div className="flex flex-1 justify-center items-center bg-white border border-[#dee2e6] rounded-[32px] xl:px-[130px] px-[30px] py-8">
        <div className="flex flex-col items-center w-full">
          <div className="flex gap-3 items-center">
            <Image src={ContactImage} alt="Contact Image" />
            <h1 className="text-2xl font-bold">მოგვწერე</h1>
          </div>
          <div className="flex flex-col mt-5 w-full">
            <ContactForm />
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="flex flex-col items-center">
        <div className="relative hidden lg:block">
          <Image src={ContactMap} alt="Contact Image" />
          <Image
            src={LoactionMarker}
            alt="location marker"
            className="absolute left-[55%] top-[15%] z-10"
            style={{ animation: "pulse 2s infinite" }}
          />
        </div>

        <div className="w-auto mt-8 flex flex-col gap-5">
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
  );
};

export default ContactPage;
