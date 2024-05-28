import { CircledCategoriesConstants, Sidebar } from "@/constants";
import Link from "next/link";
import Image from "next/image";

const Categories = () => {
  return (
    <section className="w-full mt-10 flex justify-center items-center h-[600px] gap-2 xs:gap-4">
      <div className="h-full w-auto md:w-[310px] bg-white p-3 rounded-r-2xl">
        <div
          className="flex flex-col items-start
          gap-[19px] md:gap-3">
          {Sidebar.map(({ id, title, icon, href }) => {
            return (
              <Link
                className="flex items-center gap-2 group h-auto"
                key={id}
                href={`/search?category=${href}`}>
                <div className="w-[30px] group-hover:text-black flex justify-center items-center text-gray-400 cursor-pointer">
                  {icon}
                </div>
                <div className="cursor-pointer group-hover:text-[#4a6cfa] md:block hidden">
                  <p className="group-hover:underline group-hover:decoration-[#4a6cfa]">
                    {title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex-1 bg-white h-full rounded-l-2xl p-3">
        <div className="h-full w-full grid grid-cols-2 lg:grid-cols-3 gap-3 justify-between items-center">
          {CircledCategoriesConstants.map(({ img, title, id, href }) => (
            <Link
              key={id}
              className="flex flex-col items-center py-1"
              href={`/search?category=${href}`}>
              <div className="rounded-md flex items-center justify-center">
                <Image src={img} alt={title} width={100} height={100} />
              </div>
              <div className="text-[13px] font-bold mt-4 text-center">
                {title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
