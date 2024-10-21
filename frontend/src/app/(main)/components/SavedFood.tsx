"use client";
import { useState } from "react";
import { Cart } from "./Cart";
import { FaRegHeart, FaHeart } from "react-icons/fa";

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

export const SaveFood = () => {
  return (
    <div>
      <div className="w-[420px] m-auto py-40">
        <div>
          <h1 className="text-center text-xl font-semibold mb-16">
            Хадгалсан хоол ({slidesFood.length})
          </h1>
        </div>
        <div className="flex flex-col gap-6">
          {slidesFood.length > 0 ? (
            slidesFood.map((item, index) => (
              <div key={index} className="flex w-full gap-6">
                <img
                  src={item.src}
                  //   style={{
                  //     backgroundImage: `url(${item.src[0]})`,
                  //     backgroundSize: "cover",
                  //     backgroundPosition: "center",
                  //   }}
                  className="w-[120px] h-[120px] rounded-2xl"
                ></img>
                <div className="w-80 space-y-2">
                  <div className="space-y-1">
                    <h1>{item.title}</h1>
                    <p>{item.price.toLocaleString("mn-MN")}₮</p>
                  </div>
                  <button className="bg-blue-500 px-3 py-1 text-white rounded-full text-sm">
                    Сагслах
                  </button>
                </div>
                <button>
                  <FaHeart
                    // onClick={() => handleRemoveSave(product._id)}
                    size={18}
                  />
                </button>
              </div>
            ))
          ) : (
            <p>Та одоогоор ямар ч бараа хадгалаагүй байна.</p>
          )}
        </div>

        <div></div>
      </div>
    </div>
  );
};
