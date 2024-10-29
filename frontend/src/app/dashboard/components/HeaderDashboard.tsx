"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingBasket } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import { useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { FaAngleLeft } from "react-icons/fa";
import LoginDialog from "@/app/(main)/components/LoginDialog";
import { CartContent } from "@/app/(main)/components/Cartcontent";

export const HeaderDashboard = () => {
  const pathname: string = usePathname();
  interface Path {
    name: string;
    path: string;
  }
  const paths: Path[] = [
    { name: "Нүүр", path: "/" },
    { name: "Хоолны цэс", path: "/menu" },
    { name: "Хүргэлтийн бүс", path: "/map" },
  ];
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  return (
    <>
      <div className="container flex justify-between items-center px-[120px] py-[20px] w-[1440px] m-auto">
        <div className="flex lg:gap-6 lg:text-base text-xs gap-2 items-center">
          <Image
            src={"/images/Logo.png"}
            alt="Pinecone logo"
            width={32}
            height={32}
            className="w-6 h-6 lg:w-8 lg:h-8"
          />
          {paths.slice(0, 3).map((path, index) => (
            <Link key={index} href={path.path}>
              <div
                style={{ color: pathname === path.path ? "#c0f288" : "black" }}
                className="font-semibold"
              >
                {path.name}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4 lg:visible invisible">
          <FaBars
            onClick={handleDrawer}
            size={24}
            className="lg:invisible visible fixed right-6"
          />
          <div className="relative">
            <CiSearch
              size={18}
              className="absolute w-6 h-6 top-[6px] left-2 border-gray-500 "
            />
            <Input
              type="search"
              placeholder="Бүтээгдэхүүн хайх"
              className="bg-transparent  w-[260px] px-10 border-gray-100 rounded-xl outline-none bg-[#c0f288]"
            ></Input>
          </div>
          {/* <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex gap-2 items-center px-4 font-semibold  border-none">
        <MdOutlineShoppingBasket />
        <p>Сагс</p>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-fit  ">
       

        <div className="w-full flex items-center mb-3 ">
        <FaAngleLeft  className="flex"/>
        <div className="flex w-full items-center font-bold justify-center"> Таны сагс</div>
        </div>
        <div className="flex  flex-col justify-between h-[95%]">
        <div className="flex border-t-2 border-b-2 py-2 items-center">
          <div className="w-full h-[250px] p-2 relative flex-1 ">
            <Image
              src="/pizza.png"
              fill
              alt="Picture of the pizza"
              className="object-cover"
            />
          </div>
          <div className=" flex-1 flex-col justify-between px-10">
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
        <div className="w-full  flex h-fit">
                    <div className="w-full flex ">
                      <div className="">
                      <p className="text-lg text-[#5E6166]">Нийт төлөх дүн</p>
                      <p className="text-lg font-bold">34,800₮</p>
                      </div>
                    </div>
                    <div className="w-full flex ">
                    <div className="w-full flex ">
                    
                    <Button className="w-full  py-6  rounded-xl bg-[#18BA51] hover:bg-[#18BA51]">Захиалах</Button>
                    
                      </div>
                    </div>
                  </div>
                  </div>
      </SheetContent>
    </Sheet> */}

          <MdOutlineShoppingBasket />
          <CartContent />

          <div className="flex items-center px-4 font-semibold ">
            <FaRegUser />
            <LoginDialog />
          </div>
        </div>
      </div>
    </>
  );
};
