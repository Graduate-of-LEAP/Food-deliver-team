"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkle } from "lucide-react";
import { ChevronRight } from "lucide-react";

const slidesFood = [
  {
    title: "Main Pizza",
    src: "/images/main6.png",
    price: 34800,
  },
  {
    title: "Food tart",
    src: "/images/main7.png",
    price: 22800,
  },
  {
    title: "Өглөөний хоол",
    src: "/images/main8.png",
    price: 14800,
  },
  {
    title: "Зутан шөл",
    src: "/images/main9.png",
    price: 17800,
  },
];

export const FoodMain = () => {
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
             Үндсэн хоол
          </div>
          <div className="flex text-[#18BA51] font-normal">
            Бүгдийг харах <ChevronRight />
          </div>
        </div>{" "}
        <div className=" grid grid-cols-4 grid-flow-row gap-5 my-10">
          {slidesFood?.map((item, index) => {
            return (
              <div key={index}>
                <FoodMainCard
                  key={index}
                  src={item.src}
                  title={item.title}
                  price={item.price}
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
};

export const FoodMainCard = ({ src, title, price }: foodCardType) => {
  return (
    <div className="">
      <div className={`relative`}>
        <Image
          src={src}
          alt="Picture"
          width={242}
          height={146}
          //   fill
          className={`object-cover rounded-2xl`}
        ></Image>
      </div>
      <div className="">
        <p className="text-base font-bold  text-black ">{title}</p>
        <p className="text-base font-serif text-[#18BA51]">{price}₮</p>
      </div>
    </div>
  );
};
