"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";

 const Page = () => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <FaShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex border-t-2 border-b-2 py-2">
          <div className="w-1/2 p-2 flex">
            <Image
              src="/pizza.png"
              width={270}
              height={270}
              alt="Picture of the pizza"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-between p-3">
            <div>
              <b className="text-2xl">Main Pizza</b>
              <p className="text-green-500 text-lg font-bold">34,800 ₮</p>
            </div>
            <div>
              <b className="text-lg">Орц</b>
              <p className="p-2 bg-gray-50 rounded-lg my-2">
                Хулуу, төмс, лууван , сонгино, цөцгийн тос, самрын үр
              </p>
            </div>
            <div className="flex flex-col gap-2">
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
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default Page;