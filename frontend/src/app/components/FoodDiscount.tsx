"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkle } from "lucide-react";
import { ChevronRight } from "lucide-react";

export type DiscountCalculatorType = {
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  discountPrice: number;
};

const slidesFood = [
  {
    title: "Өглөөний хоол",
    src: "/images/main2.png",
    price: 14800,
  },
  {
    title: "Зайрмаг",
    src: "/images/main3.png",
    price: 4800,
  },
  {
    title: "Өглөөний хоол",
    src: "/images/main4.png",
    price: 24800,
  },
  {
    title: "Breakfast ",
    src: "/images/main5.png",
    price: 24800,
  },
];

export const FoodDiscount = () => {
  const discountPercentage = 20; // Хямдралын хувь
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between mt-6">
          <div className="flex font-bold ">
            <Sparkle className="text-green-400" />
            <Image
              src="/images/Star.png"
              alt="Description"
              width={20}
              height={20}
              className=""
            />
             Хямдралтай
          </div>
          <div className="flex text-[#18BA51] font-normal">
            Бүгдийг харах <ChevronRight />
          </div>
        </div>{" "}
        <div className=" grid grid-cols-4 grid-flow-row gap-5 my-10">
          {slidesFood?.map((item, index) => {
            // Хямдралын дүнг тооцоолох
            const discountAmount = item.price * (discountPercentage / 100);
            const discountedPrice = item.price - discountAmount;
            return (
              <div key={index}>
                <FoodDiscountCard
                  key={index}
                  src={item.src}
                  title={item.title}
                  price={item.price}
                  discountPercentage={discountPercentage}
                  discountAmount={discountAmount}
                  discountedPrice={discountedPrice} // Хямдарсан үнийг дамжуулж байна
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

type foodCardType = {
  src: string;
  title: string;
  price: number;
  discountPercentage: number;
  discountAmount: number;
  discountedPrice: number; // Хямдарсан үнийн хувьсагч
};

export const FoodDiscountCard = ({
  src,
  title,
  price,
  discountPercentage,
  discountAmount,
  discountedPrice,
}: foodCardType) => {
  return (
    <div className="">
      <div className="relative border">
        <div className={`relative`}>
          <Image
            src={src}
            alt="Picture"
            width={242}
            height={146}
            className={`object-cover rounded-2xl`}
          ></Image>
          {/* <p>Хямдарсан үнэ: {discountAmount}₮</p> */}
        </div>
        <div className="absolute top-5 right-6">
          <button className="bg-[#18BA51] rounded-lg px-2 text-white font-semibold text-[12px]">
            {discountPercentage}%
          </button>
        </div>
      </div>
      <p className="text-base font-bold  text-black ">{title}</p>
      <div className="flex gap-5">
        <p className="text-base font-serif text-[#18BA51]">
          {discountedPrice}₮
        </p>
        <p className="text-base font-serif text-[#e13bc8] line-through">
          {price}₮
        </p>
      </div>
    </div>
  );
};
