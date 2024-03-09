import Image from "next/image";
import FooterLogo from "@/public/assets/images/count.png";
import Scroll from "./Scroll";
import {
  additionalCategories,
  menuAndMyPageCategories,
  topCategories,
} from "@/constants";

const Footer = () => {
  return (
    <footer className="w-full bg-white">
      <Scroll />
      <div className="mx-auto mt-10 flex max-w-7xl justify-between gap-8 pb-10 px-5 flex-col md:flex-row">
        {/* top categories */}
        <div className="hidden xl:block">
          <h4 className="pb-8 text-[14px] font-bold">{topCategories.title}</h4>
          <ul className="grid grid-cols-3 gap-x-4 gap-y-[6px]">
            {topCategories.links?.map((link) => (
              <li className="block text-[13px] text-[#8996ae]" key={link}>
                <a
                  href="#"
                  className="cursor-pointer hover:text-blue-700 hover:underline hover:decoration-blue-900">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* menuCategories */}
        <div className="grid grid-cols-2 gap-x-4">
          {menuAndMyPageCategories.map(({ title, links, id }) => (
            <div key={id}>
              <h4 className="pb-8 text-[14px] font-bold">{title}</h4>
              <ul className="flex flex-col gap-y-[6px]">
                {links?.map((link: string) => (
                  <li className="block text-[13px] text-[#8996ae]" key={link}>
                    <a
                      href="#"
                      className="cursor-pointer hover:text-blue-700 hover:underline hover:decoration-blue-900">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* additionalCategories */}
        <div className="md:flex md:flex-col gap-4 grid grid-cols-2">
          {additionalCategories.map(({ id, title, links }) => (
            <div key={id}>
              <h4 className="pb-4 text-[14px] font-bold">{title}</h4>
              <div className="flex items-center justify-start gap-4 text-2xl">
                {links.map((item, index) => {
                  return (
                    <Image
                      src={item}
                      key={index}
                      alt="link"
                      className="cursor-pointer"
                      priority
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-4 w-full" />
      <div className="h-[90px] w-full">
        <div className="mx-auto flex h-full max-w-[1272px] px-[20px] items-center justify-between text-[12px] text-[#8996ae] gap-x-4">
          <strong>
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply
          </strong>
          <Image src={FooterLogo} alt="footer logo" priority />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
