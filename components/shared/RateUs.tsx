"use client";

import { useState } from "react";
import { Rating } from "@mui/material";
import { RiCloseCircleFill } from "react-icons/ri";
import hoveredStar from "@/public/assets/images/hoveredStar.png";
import star from "@/public/assets/images/star.png";
import Image from "next/image";
import { Button } from "../ui/button";

const RateUs = () => {
  const [showAside, setShowAside] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [value, setValue] = useState<number | null>(0);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowAside((prev) => !prev);
    setShowBtn((prev) => !prev);
    setShowPopup(false);
  };

  const handleCloseClick = () => {
    setTextAreaValue("");
    setShowAside(false);
    setTimeout(() => {
      setShowBtn((prev) => !prev);
      setValue(0);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCloseClick();
    setTimeout(() => {
      setShowPopup(true);
    }, 600);
  };

  const styles = {
    fontSize: "40px",
    color: "#fec900",
    "& > :nth-of-type(1)": {
      transform: showAside ? "translateY(0)" : "translateY(200px)",
      transition: "0.3s 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.35)",
    },
    "& > :nth-of-type(2)": {
      transform: showAside ? "translateY(0)" : "translateY(200px)",
      transition: "0.3s 0.275s cubic-bezier(0.175, 0.885, 0.32, 1.35)",
    },
    "& > :nth-of-type(3)": {
      transform: showAside ? "translateY(0)" : "translateY(200px)",
      transition: "0.3s 0.350s cubic-bezier(0.175, 0.885, 0.32, 1.35)",
    },
    "& > :nth-of-type(4)": {
      transform: showAside ? "translateY(0)" : "translateY(200px)",
      transition: "0.3s 0.425s cubic-bezier(0.175, 0.885, 0.32, 1.35)",
    },
    "& > :nth-of-type(5)": {
      transform: showAside ? "translateY(0)" : "translateY(200px)",
      transition: "0.3s 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.35)",
    },
  };

  return (
    <>
      {showBtn && (
        <Button
          onClick={handleClick}
          className="bg-[#fec900] text-white p-[13px] rounded rotate-[-90deg] cursor-pointer hover:shadow-[0px_0px_30px_rgba(0,0,0,0.3)] ease-out duration-100 fixed right-[-25px] top-[calc(50%-43px)] text-[12px] w-[86px] tracking-tighter z-[9999]">
          შეგვაფასე
        </Button>
      )}
      {/* After submit popup */}
      {showPopup && (
        <div className="text-sm py-3 w-[320px] text-center rounded-[4px] fixed top-[calc(50%-25px)] right-[52px] z-[9999] shadow-[0px_0px_10px_rgba(0,0,0,0.3)] hover:shadow-[0px_0px_20px_rgba(0,0,0,0.3)]] bg-white">
          <div className="w-[10px] h-[10px] absolute bg-white rotate-[45deg] right-[-4px] top-[calc(50%-6px)] shadow-[0px_0px_10px_rgba(0,0,0,0.3) z-10]"></div>
          <span>მადლობა შეფასებისთვის!</span>
          <Button
            className="cursor-pointer absolute right-[-12px] top-[-13px] text-2xl"
            onClick={() => setShowPopup(false)}>
            <RiCloseCircleFill />
          </Button>
        </div>
      )}
      <div
        className={`w-[320px] bg-white shadow-[0px_0px_80px_rgba(0,0,0,0.4)] py-6 fixed right-[-400px] z-[9999] ${
          value ? "top-[calc(50%-200px)]" : "top-[calc(50%-100px)]"
        }  ease-out duration-500 rounded-sm ${
          showAside && `${value ? "top-[calc(50%-200px)]" : ""} right-[20px] `
        }`}>
        <button
          onClick={handleCloseClick}
          className="cursor-pointer absolute right-6 top-[-17px] text-4xl">
          <RiCloseCircleFill />
        </button>
        {!value && (
          <p className="text-center font-[18px] mx-4 text-[rgb(53,53,53)]">
            რამდენად კმაყოფილი ხარ Mymarket.ge-ით?
          </p>
        )}

        <div className="overflow-hidden pt-9 pb-6">
          <Rating
            sx={styles}
            precision={1}
            defaultValue={0}
            size="large"
            name="size-large"
            value={value}
            icon={
              <div className="mx-[12px] w-9 h-9">
                <Image src={hoveredStar} alt="hovered star" priority />
              </div>
            }
            emptyIcon={
              <div className="mx-[12px] w-9 h-9">
                <Image src={star} alt="star" priority />
              </div>
            }
            onChange={(e, newValue) => {
              setValue(newValue);
            }}
          />
        </div>

        {value ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <textarea
              onChange={(e) => setTextAreaValue(e.target.value)}
              value={textAreaValue}
              className="w-full h-[150px] bg-[#e8e9ecfd] resize-none outline-none px-4 py-2 text-sm"
              name="experience"
              placeholder="მოგვიყევით თქვენი გამოცდილების შესახებ..."></textarea>
            <div className="px-2">
              <h3 className="mb-3 font-semibold	 text-sm">
                გაგვიზიარე, რას შეცვლიდი.
              </h3>
              <p className="text-xs color-[rgb(53,_53,_53)]">
                ხარვეზის შემთხვევაში, დაგვიტოვე საკონტაქტოც, რომ დახმარება
                შევძლოთ.
              </p>
            </div>
            <Button
              type="submit"
              className="curson-pointer rounded-[3px] bg-[#fec900] disabled:bg-[#F1F2F6] py-2 px-3 m-[5px_15px_0_0] self-end text-white text-xs disabled:text-[rgba(0,0,0,0.43)]"
              disabled={!textAreaValue}>
              გაგზავნა
            </Button>
          </form>
        ) : null}
      </div>
    </>
  );
};

export default RateUs;
