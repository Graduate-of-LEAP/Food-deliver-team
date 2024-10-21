"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import { Sparkle } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useCart } from "./context/Cartcontext";

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
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  return (
    <>
      <div className="flex flex-col container border">
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
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div
                    className="cursor-pointer"
                    onClick={() => { }}
                  >

                    <FoodSaladCard
                      key={index}
                      src={item.src}
                      title={item.title}
                      price={item.price}
                    />

                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] flex gap-8">
                  <div className="w-[48%]">
                    <Image
                      src={item.src}
                      width={800}
                      height={800}
                      alt="Picture of the pizza"
                      className="h-full w-full object-cover rounded-2xl"
                    />
                  </div>

                  <div className="w-[48%] flex flex-col py-8">
                    <div>
                      <b className="text-2xl">{item.title}</b>
                      <p className="text-green-500 text-lg font-bold py-4">{item.price} ₮</p>
                    </div>
                    <div>
                      <b className="text-lg">Орц</b>
                      <p className="p-2 bg-gray-50 rounded-lg my-2">
                        Хулуу, төмс, лууван, сонгино, цөцгийн тос, самрын үр
                      </p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <b className="text-lg">Тоо</b>
                      <div>
                        <div className="flex justify-between">
                          <button
                            className="h-10 px-4 text-xl rounded-lg bg-green-500 text-white"
                            onClick={handleDecrease}
                          >
                            -
                          </button>
                          <div className="flex items-center">{quantity}</div>
                          <button
                            className="h-10 px-4 text-xl rounded-lg bg-green-500 text-white"
                            onClick={handleIncrease}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      className="mt-8 h-12 rounded-sm px-20 bg-green-500 flex justify-center text-white items-center"
                      onClick={() => {
                        addItem({
                          id: index,
                          title: item.title,
                          price: item.price,
                          src: item.src,
                          quantity,
                        });
                      }}
                    >
                      Сагслах
                    </button>
                  </div>
                </DialogContent>
              </Dialog>

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
      <div className={`relative  w-[350px] h-[250px]`}>
        <Image
          src={src}
          alt="Picture"
         fill
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
