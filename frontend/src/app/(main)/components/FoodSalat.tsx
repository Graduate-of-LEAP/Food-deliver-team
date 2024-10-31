"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Sparkle } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useCart } from "./context/Cartcontext";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { FoodDiscountCard } from "./FoodDiscountCart";

type CategoryType = {
  _id: string;
  categoryName: string;
};

type foodCardType = {
  category: CategoryType[];
  images: string[];
  foodName: string;
  price: number;
};

export const FoodSalad = () => {
  const [foods, setFoods] = useState<foodCardType[]>([]);

  const getFoods = async () => {
    try {
      const response = await api.get("/food");
      setFoods(response.data.foods);
      console.log(response.data.foods);
    } catch (error) {
      console.log("Failed to fetch foods:", error);
    }
  };
  const filteredSaladFoods = foods.filter(
    (item) => item.category[0]?.categoryName == "Салад ба зууш"
  );
  const filteredVndsenHoolfoods = foods.filter(
    (item) => item.category[0]?.categoryName == "Үндсэн хоол"
  );
  const filteredSweetFoods = foods.filter(
    (item) => item.category[0]?.categoryName == "Уух зүйл"
  );

  useEffect(() => {
    getFoods();
  }, []);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  return (
    <>
      <div className="flex flex-col container pt-6">
  
          <div className="flex text-gray-800 font-bold text-2xl  pl-6">
            Салад ба зууш  
        </div>{" "}
        {/*filteredVndsenHoolfoods  */}
        <div className="">
        <div className=" grid grid-cols-5 grid-flow-row gap-5 my-10">
          {filteredVndsenHoolfoods?.slice(0, 5).map((item, index) => {
            return (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div className="cursor-pointer" onClick={() => { }}>
                    <FoodDiscountCard
                      key={index}
                      src={item.images[0]}
                      title={item.foodName}
                      price={item.price}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] flex gap-8">
                  <div className="w-[48%]">
                    <Image
                      src={item.images[0]}
                      width={800}
                      height={800}
                      alt="Picture of the pizza"
                      className="h-full w-full object-cover rounded-2xl"
                    />
                  </div>

                  <div className="w-[48%] flex flex-col py-8">
                    <div>
                      <b className="text-2xl">{item.foodName}</b>
                      <p className="text-green-500 text-lg font-bold py-4">
                        {item.price} ₮
                      </p>
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
                          title: item.foodName,
                          price: item.price,
                          src: item.images[0],
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
        {/* filteredSaladFoods */}
        <div className="flex text-gray-800 font-bold text-2xl  pl-6">
        Үндсэн хоол  
        </div>{" "}
        <div className=" grid grid-cols-5 grid-flow-row gap-5 my-10">
          {filteredSaladFoods?.slice(0, 5).map((item, index) => {
            return (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div className="cursor-pointer" onClick={() => { }}>
                    <FoodDiscountCard
                      key={index}
                      src={item.images[0]}
                      title={item.foodName}
                      price={item.price}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] flex gap-8">
                  <div className="w-[48%]">
                    <Image
                      src={item.images[0]}
                      width={800}
                      height={800}
                      alt="Picture of the pizza"
                      className="h-full w-full object-cover rounded-2xl"
                    />
                  </div>

                  <div className="w-[48%] flex flex-col py-8">
                    <div>
                      <b className="text-2xl">{item.foodName}</b>
                      <p className="text-green-500 text-lg font-bold py-4">
                        {item.price} ₮
                      </p>
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
                          title: item.foodName,
                          price: item.price,
                          src: item.images[0],
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
        {/*filteredSweetFoods */}
        <div className="flex text-gray-800 font-bold text-2xl  pl-6">
        Уух зүйл 
        </div>{" "}
        <div className="grid grid-cols-5 grid-flow-row gap-5 my-10">
          {filteredSweetFoods?.slice(0, 5).map((item, index) => {
            return (
              <Dialog
                key={index}
                open={openIndex === index}
                onOpenChange={(open) => setOpenIndex(open ? index : null)}
              >
                <DialogTrigger asChild>
                  <div className="cursor-pointer" onClick={() => { }}>
                    <FoodDiscountCard
                      key={index}
                      src={item.images[0]}
                      title={item.foodName}
                      price={item.price}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] flex gap-8">
                  <div className="w-[48%]">
                    <Image
                      src={item.images[0]}
                      width={800}
                      height={800}
                      alt="Picture of the pizza"
                      className="h-full w-full object-cover rounded-2xl"
                    />
                  </div>

                  <div className="w-[48%] flex flex-col py-8">
                    <div>
                      <b className="text-2xl">{item.foodName}</b>
                      <p className="text-green-500 text-lg font-bold py-4">
                        {item.price} ₮
                      </p>
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
                          title: item.foodName,
                          price: item.price,
                          src: item.images[0],
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
type FoodDiscountCardProps = {
  src: string;
  title: string;
  price: number;
};

export const FoodSaladCard = ({ src, title, price }: FoodDiscountCardProps) => {
  return (
    <div className="">
      <div className={`relative  w-[250px] h-[200px]`}>
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
