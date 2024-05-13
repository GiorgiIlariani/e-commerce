import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import UploadImg from "@/public/assets/images/upload-img.svg";
import YellowUploadImage from "@/public/assets/images/upload-img-yellow.svg";

const UploadImageContainer = ({
  handleImagesChange,
  field,
  isAtListOneImage,
}: {
  handleImagesChange: any;
  field: any;
  isAtListOneImage: boolean;
}) => {
  return (
    <>
      {isAtListOneImage ? (
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
              onChange={(e) => handleImagesChange(e, field)}
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
              onChange={(e) => handleImagesChange(e, field)}
            />
            <Image alt="upload image" src={UploadImg} width={35} height={35} />
            <h2 className="font-bold text-base mt-3">Upload Image</h2>
            <p className="text-gray-500 text-sm mt-2">maximum 12 photo</p>
          </div>
        </label>
      )}
    </>
  );
};

export default UploadImageContainer;
