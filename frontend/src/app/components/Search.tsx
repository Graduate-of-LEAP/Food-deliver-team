"use client";

import Image from "next/image";

const searchFood = [
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

export const Search = () => {
  return (
    <>
      <div className="flex flex-col">
        <div>
          <button className="bg-[#18BA51] rounded-lg p-2 text-white font-semibold text-[12px]">
            {" "}
            Амттан / Хайлт
          </button>
        </div>
        <div className=" grid grid-cols-4 grid-flow-row gap-5 my-10">
          {searchFood?.map((item, index) => {
            return (
              <div key={index}>
                <SearchFoodCard
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

type searchFoodType = {
  src: string;
  title: string;
  price: number;
};

export const SearchFoodCard = ({ src, title, price }: searchFoodType) => {
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
