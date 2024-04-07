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

export const bottombarLinks = [
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

// contact page constants
export const ContactPageConstants = [
  {
    id: 1,
    text: "შპს თინეთი",
    img: ContactImg1,
  },
  {
    id: 2,
    text: "info@mymarket.ge",
    img: ContactImg2,
  },
  {
    id: 3,
    text: "საიდენთიფიკაციო კოდი 405581096",
    img: ContactImg3,
  },
  {
    id: 4,
    text: "(032) 280 00 35",
    img: ContactImg4,
  },
  {
    id: 5,
    text: "ქ. თბილისი, ვაკის რაიონი", // , შალვა ნუცუბიძის ქუჩა N129ა, სართული 3
    img: ContactImg5,
  },
];

// user activity contsants
export const userActivityConstants = [
  {
    id: 1,
    image: "/assets/images/userActivity/product-form.svg",
    text: "ანგარიშის რედაქტირება",
    route: "/product-form",
  },
  {
    id: 2,
    image: "/assets/images/userActivity/logout.svg",
    text: "ანგარიშის რედაქტირება",
  },
];

// home page constants
export const HowToBuy = [
  {
    id: 1,
    title: "დააკლიკე ღილაკს „ონლაინ ყიდვა",
    img: MyMarketLogo,
  },
  {
    id: 2,
    title: "ნახე სასურველ კატეგორიაში საშენო პროდუქტი",
    img: CartLogo,
  },
  {
    id: 3,
    title: "დააჭირე ღილაკს „შეძენა“ და მიყევი ინსტრუქციას.",
    img: BoxLogo,
  },
  {
    id: 4,
    title: "ნივთს ჩვენ მოგიტანთ სასურველ მისამართზე",
    img: HouseLogo,
  },
];

export const CircledCategoriesConstants = [
  {
    id: 1,
    img: TechnicLogo,
    title: "ტექნიკა",
  },
  {
    id: 2,
    img: RemontLogo,
    title: "მშენებლობა და რემონტი",
  },
  {
    id: 3,
    img: ChairLogo,
    title: "სახლი და ბაღი",
  },
  {
    id: 4,
    img: FridgeLogo,
    title: "საოჯახო ტექნიკა",
  },
  {
    id: 5,
    img: ClothesLogo,
    title: "სილამაზე და მოდა",
  },
  {
    id: 6,
    img: BasketBall,
    title: "სპორტი და დასვენება",
  },
];
