// react icons
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { MdAddShoppingCart } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { BiCategory } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { IoMdPerson } from "react-icons/io";

// footer images
import GeorgiaFlag from "@/public/assets/images/geo-flag.svg";
import EnglishFlag from "@/public/assets/images/english-flag.svg";
import RussianFlag from "@/public/assets/images/russian-flag.svg";

import GooglePlay from "@/public/assets/images/google-play.svg";
import AppStore from "@/public/assets/images/app-store.svg";

import Facebook from "@/public/assets/images/facebook.svg";
import Instagram from "@/public/assets/images/instagram.svg";
import LinkedIn from "@/public/assets/images/linkedIn.svg";

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
    icon: <GoHome />,
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

// footer
export const topCategories = {
  title: "ტოპ კატეგორიები",
  links: [
    "მომსახურება",
    "გაქირავება",
    "სახლი და ბაღი",
    "საოჯახო ტექნიკა",
    "ტექნიკა",
    "ნადირობა და თევზაობა",
    "მუსიკა",
    "საბავშვო",
    "სილამაზე და მოდა",
    "მშენებლობა და რემონტი",
    "სოფლის მეურნეობა",
    "ცხოველები",
    "სპორტი და დასვენება",
    "ბიზნესი და დანადგარები",
    "წიგნები და კანცელარია",
    "ხელოვნება და საკოლექციო",
  ],
};

export const menuAndMyPageCategories = [
  {
    id: 1,
    title: "მენიუ",
    links: [
      "მთავარი",
      "მაღაზიები",
      "იყიდე ონლაინ",
      "დახმარება",
      "დაბრუნების პოლიტიკა",
      "კონტაქტი",
      "წესები და პირობები",
      "კონფიდენციალობის პოლიტ",
    ],
  },
  {
    id: 2,
    title: "ჩემი გვერდი",
    links: [
      "ჩემი განცხადებები",
      "განცხადების დამატება",
      "შეტყობინებები",
      "ბალანსის შევსება",
      "ანგარიშის რედაქტირება",
    ],
  },
];

export const additionalCategories = [
  {
    id: 1,
    title: "სოც.ქსელები",
    links: [Facebook, Instagram, LinkedIn],
  },
  {
    id: 2,
    title: "ენები",
    links: [GeorgiaFlag, EnglishFlag, RussianFlag],
  },
  {
    id: 3,
    title: "გადმოწერე აპლიკაცია",
    links: [AppStore, GooglePlay],
  },
];
