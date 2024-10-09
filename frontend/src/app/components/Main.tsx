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
      <div className="w-full h-fit "></div>
      <div className="flex flex-col">
        <div className="flex bg-[#18BA51] justify-around relative w-full h-[50vh]">
          <div className="absolute top-0 left-0 z-10 w-full h-full">
            <Image
              src="/images/MainGroup.png"
              alt="Description"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute top-1/2 left-1/4 z-20 flex flex-col">
            <h1 className="font-extrabold text-white border-b mb-3 text-[24px]">
              Pinebator's Food delivery
            </h1>
            <p className="text-white font-thin text-[20px]">
              Horem ipsum dolor sit amet,
              <br /> consectetur adipiscing elit.
            </p>
          </div>
          <div className="flex absolute top-1/3 left-1/2 z-20">
            <div className="">
              <Image
                src="/images/main1.png"
                alt="Description"
                width={443}
                height={438}
                className=""
              />
            </div>
          </div>
        </div>
        <div className="container bg-yellow-200 m-auto">
          <div className="flex gap-5 mt-5 justify-center">
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
            <DiscountCalculator />
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
        <div className="flex justify-center">
          <Search />
        </div>
      </div>
    </>
  );
};
export default Main;
