// react icons
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { MdAddShoppingCart } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import { BiCategory } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { IoMdPerson } from "react-icons/io";

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

export const sidebarLinks = [
  {
    icon: <TiHome />,
    route: "/",
    label: "Home",
  },
  {
    icon: <BiCategory />,
    route: "/categories",
    label: "Categories",
  },
  {
    icon: <IoIosAddCircleOutline />,
    route: "/add-item",
    label: "Add",
  },
  {
    icon: <CiHeart />,
    route: "/favorites",
    label: "Favorites",
  },
  {
    icon: <IoMdPerson />,
    route: "/sign-in",
    label: "LogIn",
  },
];
