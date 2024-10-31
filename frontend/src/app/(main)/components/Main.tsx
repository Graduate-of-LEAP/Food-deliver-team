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
import { CarouselContainer } from "./CarouselComponent";

const Main = () => {
  return (
    <>
      <div className="w-full h-fitv  ">
        <div className="flex flex-col w-full">
          <CarouselContainer />
          <div className="container m-auto">
            <CardComponent />

            {/* <div className="flex justify-center">
              <FoodDiscount />
            </div> */}
            {/* <div className="flex justify-center">
              <FoodMain />
            </div>*/}
            <div className="flex justify-center">
              <FoodSalad />
            </div>
            {/* <div className="flex justify-center">
              <FoodSweet />
            </div>  */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
