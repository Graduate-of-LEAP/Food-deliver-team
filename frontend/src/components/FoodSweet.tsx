"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkle } from "lucide-react";
import { ChevronRight } from "lucide-react";

const slidesFood = [
  {
    title: "Торт",
    src: "/images/main14.png",
    price: 54800,
  },
  {
    title: "Oreo shake",
    src: "/images/main15.png",
    price: 14800,
  },
  {
    title: "Chocolate",
    src: "/images/main16.png",
    price: 14800,
  },
  {
    title: "Yoghurt",
    src: "/images/main17.png",
    price: 14800,
  },
];

export const FoodSweet = () => {
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
             Амттан
          </div>
          <div className="flex text-[#18BA51] font-normal">
            Бүгдийг харах <ChevronRight />
          </div>
        </div>{" "}
        <div className=" grid grid-cols-4 grid-flow-row gap-5 my-10">
          {slidesFood?.map((item, index) => {
            return (
              <div key={index}>
                <FoodSweetCard
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

export const FoodSweetCard = ({ src, title, price }: foodCardType) => {
  return (
    <div className="">
      <div className={`relative`}>
        <Image
          src={src}
          alt="Picture"
          width={282}
          height={186}
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
