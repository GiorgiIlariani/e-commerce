import Image from "next/image";
import React from "react";
import UploadImg from "@/public/assets/images/upload-img.svg";
import YellowUploadImage from "@/public/assets/images/upload-img-yellow.svg";

const UploadImageContainer = () => {
  let alreadyUploadedImage = false;

  return (
    <>
      {alreadyUploadedImage ? (
        <label
          htmlFor="images"
          className="flex flex-col items-center w-[130px] min-h-[130px]">
          <div className="w-full min-h-[130px] rounded-3xl border-dashed border-2 border-[#fec900] flex flex-col justify-center items-center py-8 cursor-pointer">
            <input
              type="file"
              id="images"
              name="images"
              className="hidden"
              accept="image/*"
              multiple
              //   onChange={(e) => handleImageChange(e, setFieldValue)}
            />
            <Image
              alt="upload image"
              src={YellowUploadImage}
              width={30}
              height={30}
            />
          </div>
        </label>
      ) : (
        <label htmlFor="images" className="w-full flex flex-col items-center">
          <div className="w-full rounded-3xl border-dashed border-2 border-[#fec900] flex flex-col justify-center items-center py-8 my-5 cursor-pointer">
            <input
              type="file"
              id="images"
              name="images"
              className="hidden"
              accept="image/*"
              multiple
              //   onChange={(e) => handleImageChange(e, setFieldValue)}
            />
            <Image alt="upload image" src={UploadImg} width={35} height={35} />
            <h2 className="font-bold text-base mt-3">სურათის ატვირთვა</h2>
            <p className="text-gray-500 text-sm mt-2">მაქსიმუმ 12 ფოტო</p>
          </div>
        </label>
      )}
    </>
  );
};

export default UploadImageContainer;
