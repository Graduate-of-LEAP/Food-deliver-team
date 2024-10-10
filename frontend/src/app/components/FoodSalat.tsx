"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkle } from "lucide-react";
import { ChevronRight } from "lucide-react";

const slidesFood = [
  {
    title: "Чихэрлэг тахиа",
    src: "/images/main10.png",
    price: 24800,
  },
  {
    title: "Lunch",
    src: "/images/main11.png",
    price: 24800,
  },
  {
    title: "Сэндвич",
    src: "/images/main12.png",
    price: 14800,
  },
  {
    title: "Apple pie",
    src: "/images/main13.png",
    price: 34800,
  },
];

export const FoodSalad = () => {
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
             Салад ба зууш
          </div>
          <div className="flex text-[#18BA51] font-normal">
            Бүгдийг харах <ChevronRight />
          </div>
        </div>{" "}
        <div className=" grid grid-cols-4 grid-flow-row gap-5 my-10">
          {slidesFood?.map((item, index) => {
            return (
              <div key={index}>
                <FoodSaladCard
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

export const FoodSaladCard = ({ src, title, price }: foodCardType) => {
  return (
    <div className="">
      <div className={`relative`}>
        <Image
          src={src}
          alt="Picture"
          width={282}
          height={186}
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
