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

const Main1 = () => {
  useEffect(() => {
    const radius = 150; // тойргийн радиус
    const elements = document.querySelectorAll(".circle-image");
    const angleIncrement = (2 * Math.PI) / elements.length;

    elements.forEach((el, index) => {
      const angle = angleIncrement * index;
      anime({
        targets: el,
        translateX: radius * Math.cos(angle),
        translateY: radius * Math.sin(angle),
        easing: "easeInOutQuad",
        duration: 2000,
        loop: true,
        direction: "alternate",
      });
    });
  }, []);
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
              <div className="container flex justify-between m-auto   ">
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
                <div className="circle-image-wrapper ">
                  <div className="relative py-44 ">
                    <Image
                      src="/imageA.png"
                      alt="Description"
                      width={588}
                      height={438}
                      className="circle-image absolute"
                    />
                  </div>
                  <div className="relative py-44 ">
                    <Image
                      src="/imageAA.png"
                      alt="Description"
                      width={588}
                      height={438}
                      className="circle-image absolute"
                    />
                  </div>
                  <div className="relative py-44 ">
                    <Image
                      src="/imageAAA.png"
                      alt="Description"
                      width={588}
                      height={438}
                      className="circle-image absolute"
                    />
                  </div>
                  <div className="relative py-44 ">
                    <Image
                      src="/imageAAAA.png"
                      alt="Description"
                      width={588}
                      height={438}
                      className="circle-image absolute"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container m-auto">
            <CardComponent />

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
