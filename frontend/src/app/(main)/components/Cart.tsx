"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "./context/Cartcontext";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineCancel, MdOutlineShoppingBasket } from "react-icons/md";

export const Cart = () => {
  const { items, removeItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="border-none  font-semibold text-base px-2 "
        >
          <MdOutlineShoppingBasket className="mr-2" />
          Сагс
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col justify-between">
        <div className="flex font-bold items-center text-3xl gap-48 pb-4">
          <p>
            <IoIosArrowBack />
          </p>
          <p> Таны сагс</p>
        </div>
        <div className="h-[90%]">
          {items.length === 0 ? (
            <p>Сагс хоосон байна</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex border-t-2 border-b-2 py-2 justify-start items-start"
              >
                <div className="w-1/2 p-2 flex">
                  <Image
                    src={item.src}
                    width={270}
                    height={270}
                    alt="Picture of the pizza"
                  />
                </div>
                <div className="w-1/2 flex flex-col justify-between p-3">
                  <div>
                    <div className="flex justify-between">
                      <b className="text-2xl">{item.title}</b>
                      <button onClick={() => removeItem(item.id)}>
                        <MdOutlineCancel size={24} color="gray" />
                      </button>
                    </div>
                    <p className="text-green-500 text-lg font-bold">
                      {item.price * item.quantity} ₮
                    </p>
                  </div>
                  <div>
                    <b className="text-lg">Орц</b>
                    <p className="my-2">
                      Хулуу, төмс, лууван, сонгино, цөцгийн тос, самрын үр
                    </p>
                  </div>
                  <div className="flex gap-2 items-center font-bold">
                    <p className="text-lg">Тоо</p> <p>:</p>
                    <p>{item.quantity}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-between border-t-2 py-8">
          <div className="flex flex-col ">
            <p>Нийт төлөх дүн</p>
            <b>{totalPrice} ₮</b>
          </div>
          <button className="w-1/2 rounded-sm text-white bg-green-500">
            Захиалах
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
