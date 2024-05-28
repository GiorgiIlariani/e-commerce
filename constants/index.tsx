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
import GeorgiaFlag from "@/public/assets/images/footer/geo-flag.svg";
import EnglishFlag from "@/public/assets/images/footer/english-flag.svg";
import RussianFlag from "@/public/assets/images/footer/russian-flag.svg";

import GooglePlay from "@/public/assets/images/footer/google-play.svg";
import AppStore from "@/public/assets/images/footer/app-store.svg";

import Facebook from "@/public/assets/images/footer/facebook.svg";
import Instagram from "@/public/assets/images/footer/instagram.svg";
import LinkedIn from "@/public/assets/images/footer/linkedIn.svg";

// contact page
import ContactImg1 from "@/public/assets/images/contact/contact-img1.svg";
import ContactImg2 from "@/public/assets/images/contact/contact-img2.svg";
import ContactImg3 from "@/public/assets/images/contact/contact-img3.svg";
import ContactImg4 from "@/public/assets/images/contact/contact-img4.svg";
import ContactImg5 from "@/public//assets/images/contact/contact-img5.svg";

// how to buy section images
import MyMarketLogo from "@/public/assets/images/howToBuy/mymarket.svg";
import CartLogo from "@/public/assets/images/howToBuy/cart.svg";
import BoxLogo from "@/public/assets/images/howToBuy/box.svg";
import HouseLogo from "@/public/assets/images/howToBuy/house.svg";

// circled categories images
import TechnicLogo from "@/public/assets/images/circledCategories/computer.png";
import RemontLogo from "@/public/assets/images/circledCategories/remont.png";
import ChairLogo from "@/public/assets/images/circledCategories/chair.png";
import FridgeLogo from "@/public/assets/images/circledCategories/fridge.png";
import ClothesLogo from "@/public/assets/images/circledCategories/clothes.png";
import BasketBall from "@/public/assets/images/circledCategories/basketball.png";

import { IoIosAddCircle } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { IoListOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";

// react icons
import { RiCustomerService2Line } from "react-icons/ri";
import { FaShapes } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { MdPower } from "react-icons/md";
import { SlTarget } from "react-icons/sl";
import { IoMdMusicalNote } from "react-icons/io";
import { FaBabyCarriage } from "react-icons/fa";
import { FaBasketballBall } from "react-icons/fa";
import { MdConstruction } from "react-icons/md";
import { BiBookOpen } from "react-icons/bi";
import { IoIosBusiness } from "react-icons/io";

// mui icons
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import AgricultureOutlinedIcon from "@mui/icons-material/AgricultureOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import CoffeeMakerOutlinedIcon from "@mui/icons-material/CoffeeMakerOutlined";

//  layout constants
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
    label: "Help Center",
    href: "/faq",
  },
  {
    label: "Cart",
    href: "/mycart",
  },
  {
    label: "Favorites",
    href: "/favorites",
  },
];

export const bottombarLinks = [
  {
    icon: <GoHome />,
    route: "/",
    label: "Home",
  },
  {
    icon: <MdAddShoppingCart />,
    route: "/mycart",
    label: "Cart",
  },
  {
    icon: <IoIosAddCircleOutline />,
    route: "/product-form",
    label: "Add",
  },
  {
    icon: <CiHeart />,
    route: "/favorites",
    label: "Favorites",
  },
  {
    icon: <IoMdPerson />,
    // route: "/sign-in",
    label: "LogIn",
  },
];

// footer
export const topCategories = {
  title: "Top Categories",
  links: [
    "Services",
    "Sales",
    "Home and Garden",
    "Household Appliances",
    "Electronics",
    "Clothing and Accessories",
    "Music",
    "Kids",
    "Beauty and Fashion",
    "Construction and Renovation",
    "Village Life",
    "Pets",
    "Sports and Recreation",
    "Business and Investment",
    "Books and Magazines",
    "Handicrafts and Collectibles",
  ],
};

export const menuAndMyPageCategories = [
  {
    id: 1,
    title: "Menu",
    links: [
      "Home",
      "Stores",
      "Shop Online",
      "Help",
      "Return Policy",
      "Contact",
      "Terms and Conditions",
      "Privacy Policy",
    ],
  },
  {
    id: 2,
    title: "My Page",
    links: [
      "My Announcements",
      "Add Announcement",
      "Notifications",
      "Balance Top-up",
      "Account Editing",
    ],
  },
];

export const additionalCategories = [
  {
    id: 1,
    title: "Social Networks",
    links: [Facebook, Instagram, LinkedIn],
  },
  {
    id: 2,
    title: "Languages",
    links: [GeorgiaFlag, EnglishFlag, RussianFlag],
  },
  {
    id: 3,
    title: "Download the App",
    links: [AppStore, GooglePlay],
  },
];

// contact page constants
export const ContactPageConstants = [
  {
    id: 1,
    text: "Tineti LLC",
    img: ContactImg1,
  },
  {
    id: 2,
    text: "info@mymarket.ge",
    img: ContactImg2,
  },
  {
    id: 3,
    text: "Identification Code 405581096",
    img: ContactImg3,
  },
  {
    id: 4,
    text: "(032) 280 00 35",
    img: ContactImg4,
  },
  {
    id: 5,
    text: "Tbilisi, Vake District",
    img: ContactImg5,
  },
];

// user activity constants
export const userActivityConstants = [
  {
    id: 1,
    image: "/assets/images/userActivity/product-form.svg",
    text: "Account Editing",
    route: "/product-form",
  },
  {
    id: 2,
    image: "/assets/images/userActivity/logout.svg",
    text: "Logout",
  },
];

// home page constants
export const HowToBuy = [
  {
    id: 1,
    title: "Click the button 'Buy Online'",
    img: MyMarketLogo,
  },
  {
    id: 2,
    title: "Browse desired products in the respective category",
    img: CartLogo,
  },
  {
    id: 3,
    title: "Press the 'Purchase' button and follow the instructions.",
    img: BoxLogo,
  },
  {
    id: 4,
    title: "We deliver the product to your desired address",
    img: HouseLogo,
  },
];

export const CircledCategoriesConstants = [
  {
    id: 1,
    img: TechnicLogo,
    title: "technik",
    href: "/technic",
  },
  {
    id: 2,
    img: RemontLogo,
    title: "Repair materials",
    href: "/construction and repair",
  },
  {
    id: 3,
    img: ChairLogo,
    title: "Home and Garden",
    href: "home and garden",
  },
  {
    id: 4,
    img: FridgeLogo,
    title: "Household Appliances",
    href: "home and garden",
  },
  {
    id: 5,
    img: ClothesLogo,
    title: "clothes",
    href: "beauty and fashion",
  },
  {
    id: 6,
    img: BasketBall,
    title: "Sports",
    href: "sport and holiday",
  },
];

export const SignedInNavbarPopupConstants = [
  {
    id: 1,
    text: "My Products",
    route: "/myproducts",
  },
  {
    id: 3,
    text: "Finances",
    route: "/finances/balance",
  },
  {
    id: 4,
    text: "Contact",
    route: "/contact",
  },
  {
    id: 5,
    text: "Edit account",
    route: "/profile/info",
  },
];

export const profileLinks = [
  { href: "/product-form", Icon: IoIosAddCircle, text: "Add Announcement" },
  { href: "/myproducts", Icon: IoListOutline, text: "My Announcements" },
  { href: "/finances/balance", Icon: IoWalletOutline, text: "My Finances" },
];

export const extraLinks = [
  { href: "/favorites", Icon: AiOutlineHeart, text: "My Favorites" },
  { href: "/mycart", Icon: MdAddShoppingCart, text: "My Cart" },
];

export const accountLinks = [
  {
    href: "/finances/transactions-history",
    Icon: FaHistory,
    text: "Purchase History",
  },
  { href: "/profile/info", Icon: AiOutlineUser, text: "Account Editing" },
];

export const FaqPageConstants = [
  {
    id: 1,
    title: "Registration/Editing account",
    image: "/assets/images/1_4.png",
    href: "/faq/registration-editing",
  },
  {
    id: 2,
    title: "How to sell",
    image: "/assets/images/2_4.png",
    href: "/faq/how-to-sell",
  },
  {
    id: 3,
    title: "How to buy",
    image: "/assets/images/3_4.png",
    href: "/faq/how-to-buy",
  },
];

export const profileTabs = [
  {
    route: "/profile/info",
    text: "Edit Information",
  },
  {
    route: "/profile/password",
    text: "Change Password",
  },
  {
    route: "/profile/deactivate",
    text: "Delete Account",
  },
];

export const financesTabs = [
  {
    route: "/finances/balance",
    text: "Add Balance",
  },
  {
    route: "/finances/transactions",
    text: "Transfer Money",
  },
  {
    route: "/finances/transactions-history",
    text: "Transaction History",
  },
];

export const Sidebar = [
  {
    id: 1,
    icon: <RiCustomerService2Line />,
    title: "service",
    href: "service",
  },
  {
    id: 2,
    icon: <FaShapes />,
    title: "rent",
    href: "rent",
  },
  {
    id: 3,
    icon: <AiFillHome />,
    title: "home and garden",
    href: "home and garden",
  },
  {
    id: 4,
    icon: <CoffeeMakerOutlinedIcon />,
    title: "family technik",
    href: "family technik",
  },
  {
    id: 5,
    icon: <MdPower />,
    title: "technic",
    href: "technic",
  },
  {
    id: 6,
    icon: <SlTarget />,
    title: "hunting and fishing",
    href: "hunting and fishing",
  },

  {
    id: 7,
    icon: <IoMdMusicalNote />,
    title: "music",
    href: "music",
  },
  {
    id: 8,
    icon: <FaBabyCarriage />,
    title: "for children's",
    href: "children",
  },
  {
    id: 9,
    icon: <DiamondOutlinedIcon />,
    title: "beauty and fashion",
    href: "beauty and fashion",
  },

  {
    id: 10,
    icon: <MdConstruction />,
    title: "construction and repair",
    href: "construction and repair",
  },
  {
    id: 11,
    icon: <AgricultureOutlinedIcon />,
    title: "Agriculture",
    href: "Agriculture",
  },
  {
    id: 12,
    icon: <PetsOutlinedIcon />,
    title: "animals",
    href: "animals",
  },
  {
    id: 13,
    icon: <FaBasketballBall />,
    title: "sport and holiday",
    href: "sport and holiday",
  },
  {
    id: 14,
    icon: <IoIosBusiness />,
    title: "business and machines",
    href: "business and machines",
  },
  {
    id: 15,
    icon: <BiBookOpen />,
    title: "books",
    href: "books",
  },
  {
    id: 16,
    icon: <PaletteOutlinedIcon />,
    title: "art and collectable",
    href: "art and collectable",
  },
];
