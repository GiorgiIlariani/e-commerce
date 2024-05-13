import Image from "next/image";
import trashIcon from "@/public/assets/images/trash.svg";
import AddAsMainImg from "@/public/assets/images/addAsMain.svg";
import { Button } from "@/components/ui/button";

interface Props {
  imageUrl: string;
  isFirstImage: boolean;
  handleImageRemove: (index: number) => void;
  handleAddAsFirstImage: (index: number) => void;
  index: number;
}

const UploadedImages = ({
  imageUrl,
  isFirstImage,
  index,
  handleImageRemove,
  handleAddAsFirstImage,
}: Props) => {
  return (
    <div className="relative rounded-2xl group">
      <Image
        src={imageUrl}
        alt="image"
        className="object-cover rounded-2xl w-[130px] h-[130px]"
        width={130}
        height={130}
      />
      <div className="absolute inset-0 bg-black flex items-center justify-center transition-opacity duration-300 rounded-2xl opacity-0 group hover:opacity-80">
        <div className="flex items-center gap-x-2">
          {!isFirstImage ? (
            <Button
              type="button"
              onClick={() => handleAddAsFirstImage(index)}
              className="w-[48px] h-[48px] cursor-pointer hover:opacity-100 opacity-0 transition duration-300 ease-out flex justify-center items-center rounded-xl bg-[rgba(137,150,174,.4)]">
              <Image
                src={AddAsMainImg}
                alt="upload as main image"
                width={36}
                height={36}
                className="object-contain z-10 group-hover:opacity-100"
              />
            </Button>
          ) : null}
          <Button
            type="button"
            onClick={() => handleImageRemove(index)}
            className="w-[48px] h-[48px] cursor-pointer hover:opacity-100 opacity-0 transition duration-300 ease-out flex justify-center items-center rounded-xl bg-[rgba(137,150,174,.4)]">
            <Image
              src={trashIcon}
              alt="trash icon"
              width={24}
              height={24}
              className="object-contain z-10 group-hover:opacity-100"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadedImages;
