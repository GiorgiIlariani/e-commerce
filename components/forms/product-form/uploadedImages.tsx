import Image from "next/image";
import trashIcon from "@/public/assets/images/trash.svg";
import { Button } from "@/components/ui/button";

interface Props {
  imageUrl: string;
  handleImageRemove: (index: number, imageId: number) => void;
  index: number;
  imageId: number;
}

const UploadedImages = ({
  imageUrl,
  index,
  handleImageRemove,
  imageId,
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
      <div className="absolute inset-0 bg-black flex items-center justify-center transition-opacity duration-300 rounded-2xl opacity-0 group-hover:opacity-80">
        <div className="flex items-center gap-x-2">
          <Button
            type="button"
            onClick={() => handleImageRemove(index, imageId)}
            className="w-[48px] h-[48px] cursor-pointer opacity-100 transition-opacity duration-300 ease-out flex justify-center items-center rounded-xl bg-[rgba(137,150,174,.4)] group-hover:opacity-100">
            <Image
              src={trashIcon}
              alt="trash icon"
              width={24}
              height={24}
              className="object-contain z-10"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadedImages;
