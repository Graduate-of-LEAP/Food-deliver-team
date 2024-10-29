"use client";

import Image from "next/image";
import { Sparkle } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { FoodDiscount } from "./FoodDiscount";
import { FoodMain } from "./FoodMain";
import { FoodSalad } from "./FoodSalat";
import { FoodSweet } from "./FoodSweet";
import CardComponent from "./CardComponent";
import { DiscountCalculator } from "./DiscountCalculator";
import { Search } from "./Search";
import anime from "animejs/lib/anime.es.js";
import { useEffect } from "react";
import { CarouselContainer } from "./CarouselContainer";
import { FoodCart } from "./FoodCart";

const Main1 = () => {
  return (
    <>
      <div className="w-full h-fit">
        <div className="flex flex-col w-full ">
          <div className="flex  justify-around  w-full h-[800px]">
            <CarouselContainer />
          </div>

          <div className="container m-auto">
            <CardComponent />
            <div className="container flex justify-between m-auto p-6 items-center bg-gray-100">
              <div className="flex">
                <h1>Monday</h1>
                <h2>Lunch</h2>
              </div>
              <FoodCart />
            </div>

            <div className="flex justify-center">
              <FoodDiscount />
            </div>
            <div className="flex justify-center">
              <FoodSalad />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Main1;
