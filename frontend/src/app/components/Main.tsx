"use client";
import Image from "next/image";
import { Sparkle } from "lucide-react";
import { ChevronRight } from "lucide-react";

const Main = () => {
  return (
    <>
      {" "}
      <div className="flex bg-[#18BA51] justify-around ">
        <div
          className="flex flex-col
          items-center justify-center "
        >
          <h1 className="font-extrabold text-white border-b mb-3">
            Pinecone Food delivery
          </h1>
          <p className="text-white font-thin">
            Horem ipsum dolor sit amet,
            <br /> consectetur adipiscing elit.
          </p>
        </div>
        <div className="flex my-10">
          <div className="relative">
            <Image
              src="/images/main1.png"
              alt="Description"
              width={343}
              height={338}
              className=""
            />
          </div>
        </div>
      </div>
      {/*  */}
      <div className="flex justify-between mx-28">
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
      </div>
    </>
  );
};
export default Main;
