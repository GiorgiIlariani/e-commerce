import { sliceTitle } from "@/utils";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { url } from "@/lib/utils";
import { toast } from "react-toastify";

const CartItem = ({
  cartItem,
  handleRemoveCartItem,
  selectedCartProductsId,
  setSelectedCartProductsId,
  setTotalPrice,
  setCartProducts,
}: CartItemProps) => {
  const [quantity, setQuantity] = useState<number>(cartItem.product.quantity);

  const updateCartProductQuantity = (
    productId: number,
    newQuantity: number
  ) => {
    setCartProducts((prevCartProducts) =>
      prevCartProducts.map((product) =>
        product.product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

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
    if (quantity === 1) return;

    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    setTotalPrice((prevTotalPrice) => prevTotalPrice - cartItem.product.price);
    updateCartProductQuantity(cartItem.product.id, newQuantity);
  };

  const handleAddition = () => {
    if (cartItem.product.quantity === quantity) {
      toast.warning("there is no much product quantity to choose");
      return;
    }

    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + cartItem.product.price);
    updateCartProductQuantity(cartItem.product.id, newQuantity);
  };

  return (
    <div className="relative flex items-center justify-between w-full px-3 border-b pt-2 pb-5">
      <div className="md:basis-1/2 basis-1/3 gap-2 md:gap-4 self-start flex items-center">
        <Input
          type="checkbox"
          id={String(cartItem?.product.id)}
          className="w-4 h-4 rounded-sm bg-white checked:bg-[#fec900]"
          checked={selectedCartProductsId.includes(cartItem.product.id)}
          onChange={handleCheckboxToggle}
        />
        <Link href={`/search/${cartItem.product.id}`}>
          <Image
            src={url + cartItem.product.images[0].image}
            alt="item image"
            width={64}
            height={64}
            className="object-cover rounded-lg w-16 h-16"
          />
        </Link>
        <div className="flex-col hidden md:flex">
          <h3 className="text-nowrap">
            {sliceTitle(cartItem.product.name, 18, true)}
          </h3>
          <p className="text-gray-400">ID:{cartItem.product.id}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-row md:gap-20 items-center gap-6">
        {quantity > 0 ? (
          <div className="flex justify-between items-center gap-2 md:gap-4">
            <Button
              className="flex justify-center items-center w-6 h-6 bg-[#f1f3f6] text-[#8996ae] hover:bg-[#FEC900] hover:text-white text-bold rounded-full"
              onClick={handleSubtraction}>
              -
            </Button>
            <span className="text-sm sm:text-lg sm:font-medium">
              {quantity}
            </span>
            <Button
              className="flex justify-center items-center w-6 h-6 bg-[#f1f3f6] text-[#8996ae] hover:bg-[#FEC900] hover:text-white text-bold  rounded-full"
              onClick={handleAddition}>
              +
            </Button>
          </div>
        ) : (
          <span className="text-red-500 text-center text-lg">Sold Out</span>
        )}

        {quantity > 0 && (
          <>
            <p className="w-max text-md sm:text-lg font-medium sm:font-bold">
              ₾ {cartItem.product.price * quantity}
            </p>
          </>
        )}
        <Button
          className="absolute right-2 text-xl bg-[#f1f3f6] text-[#8996ae] rounded-full p-[6px] hover:bg-[#FEC900] hover:text-white"
          onClick={() => handleRemoveCartItem(cartItem?.product.id)}>
          <MdDeleteOutline />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
