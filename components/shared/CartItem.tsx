import { sliceTitle } from "@/utils";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type CartItemProps = {
  cartItem: CartProducts;
  handleRemoveCartItem: (productId: number) => Promise<void>;
  selectedCartProductsId: number[];
  setSelectedCartProductsId: Dispatch<SetStateAction<number[]>>;
};

const baseUrl = "http://16.16.253.75";

const CartItem = ({
  cartItem,
  handleRemoveCartItem,
  selectedCartProductsId,
  setSelectedCartProductsId,
}: CartItemProps) => {
  const [quantity, setQuantity] = useState<number>(cartItem.quantity);

  // Function to handle checkbox toggle
  const handleCheckboxToggle = () => {
    const productId = cartItem.product.id;
    if (selectedCartProductsId.includes(productId)) {
      // If the product is already selected, remove it from the selected list
      setSelectedCartProductsId((prevIds) =>
        prevIds.filter((id) => id !== productId)
      );
    } else {
      // If the product is not selected, add it to the selected list
      setSelectedCartProductsId((prevIds) => [...prevIds, productId]);
    }
  };

  const handleSubtraction = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddition = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="relative flex items-center justify-between w-full px-3 border-b pt-2 pb-5">
      <div className="basis-1/2 gap-4 self-start flex items-center">
        <Input
          type="checkbox"
          id={String(cartItem?.product.id)}
          className="w-4 h-4 rounded-sm bg-white checked:bg-[#fec900]"
          checked={selectedCartProductsId.includes(cartItem.product.id)}
          onChange={handleCheckboxToggle}
        />

        <Image
          src={baseUrl + cartItem.product.images[0].image}
          alt="item image"
          width={64}
          height={64}
          className="object-cover rounded-lg w-16 h-16"
        />

        <div className="flex flex-col">
          <h3 className="text-nowrap">
            {sliceTitle(cartItem.product.name, 18, true)}
          </h3>
          <p className="text-gray-400">ID:{cartItem.product.id}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex justify-between items-center gap-4">
          <Button
            className="flex justify-center items-center w-6 h-6 bg-[#f1f3f6] text-[#8996ae] hover:bg-[#FEC900] hover:text-white text-bold rounded-full"
            onClick={handleSubtraction}>
            -
          </Button>
          <span className="text-sm sm:text-lg sm:font-medium">{quantity}</span>
          <Button
            className="flex justify-center items-center w-6 h-6 bg-[#f1f3f6] text-[#8996ae] hover:bg-[#FEC900] hover:text-white text-bold  rounded-full"
            onClick={handleAddition}>
            +
          </Button>
        </div>

        <p className="w-max text-md sm:text-lg font-medium sm:font-bold">
          ₾ {cartItem.product.price * quantity}
        </p>

        <Button
          className="absolute -bottom-2 left-16 md:static text-xl bg-[#f1f3f6] text-[#8996ae] rounded-full p-[6px] hover:bg-[#FEC900] hover:text-white"
          onClick={() => handleRemoveCartItem(cartItem?.product.id)}>
          <MdDeleteOutline />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
