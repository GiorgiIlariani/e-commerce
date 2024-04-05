import additionalImg from "@/public/assets/images/additionalInformation.svg";
import Image from "next/image";

const AdditionalInformation = ({ text }: { text: string }) => {
  return (
    <div className="w-full rounded-2xl px-4 py-2 flex items-center gap-4 bg-[#edf3fc] my-5">
      <div className="w-10 h-10 rounded-full flex justify-center items-center">
        <Image src={additionalImg} alt="info header img" />
      </div>
      <div className="text-[12px] font-semibold">{text}</div>
    </div>
  );
};

export default AdditionalInformation;
