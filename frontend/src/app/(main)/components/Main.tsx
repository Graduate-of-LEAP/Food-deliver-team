"use client";
import Image from "next/image";
import { Sparkle } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { FoodDiscount } from "./FoodDiscount";
import { FoodMain } from "./FoodMain";
import { FoodSalad } from "./FoodSalat";
import { FoodSweet } from "./FoodSweet";
import { CardComponent } from "./CardComponent";
import { BookOpen } from "lucide-react";
import { Clock4 } from "lucide-react";
import { Salad } from "lucide-react";
import { Soup } from "lucide-react";
import { DiscountCalculator } from "./DiscountCalculator";
import { Search } from "./Search";

export type CardType = {
  icon: JSX.Element;
  title: string;
  desc: string;
};
const Card = [
  {
    icon: <BookOpen />,
    title: "Хүргэлтийн төлөв хянах",
    desc: "Захиалга бэлтгэлийн явцыг хянах",
  },
  {
    icon: <Clock4 />,
    title: "Шуурхай хүргэлт",
    desc: "Захиалга бэлтгэлийн явцыг хянах",
  },
  {
    icon: <Salad />,
    title: "Эрүүл, баталгаат орц",
    desc: "Захиалга бэлтгэлийн явцыг хянах",
  },
  {
    icon: <Soup />,
    title: "Хоолны өргөн сонголт",
    desc: "Захиалга бэлтгэлийн явцыг хянах",
  },
];

const Main = () => {
  return (
    <>
      <div className="w-full h-fit ">
        <div className="flex flex-col w-full ">
          <div className="flex bg-[#18BA51] justify-around  w-full ">
          <div className=" w-full h-full flex relative">

                <Image
                  src="/images/MainGroup.png"
                  alt="Description"
                  fill
                  className="object-cover"
                />
            <div className="container flex justify-between m-auto  border border-black ">
            

                <div className=" flex  justify-center items-center  ">
                  <div className="flex flex-col ">
                    <h1 className="font-bold text-white text-[55px] leading-none">
                      Pinebator's <br />
                      Food delivery
                    </h1>
                    <p className="border-b my-5"></p>
                    <p className="text-white font-normal text-[22px] leading-6">
                      Horem ipsum dolor sit amet,
                      <br /> consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
                <div className="flex  border border-black ">
                  <div className="relative py-44 ">
                    <Image
                      src="/images/main1.png"
                      alt="Description"
                      width={588}
                      height={438}
                      className=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container m-auto">
            <div className="flex gap-7 mt-5 justify-center">
              {Card.map((item, index) => {
                return (
                  <CardComponent
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    desc={item.desc}
                  />
                );
              })}
            </div>

            <div className="flex justify-center">
              <FoodDiscount />
            </div>
            <div className="flex justify-center">
              <FoodMain />
            </div>
            <div className="flex justify-center">
              <FoodSalad />
            </div>
            <div className="flex justify-center">
              <FoodSweet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
