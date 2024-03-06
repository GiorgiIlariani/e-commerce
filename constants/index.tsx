// react icons
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { MdAddShoppingCart } from "react-icons/md";

export const headerIcons = [
  {
    id: 1,
    icon: <AiOutlineMessage />,
    href: "/contact",
  },
  {
    id: 2,
    icon: <AiOutlineHeart />,
    href: "/favorites",
  },
  {
    id: 3,
    icon: <MdAddShoppingCart />,
    href: "/mycart",
  },
];

export const NavLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Favorites",
    href: "/favorites",
  },
  {
    label: "Cart",
    href: "/mycart",
  },
  {
    label: "Rate us",
    href: "/rate-us",
  },
];
