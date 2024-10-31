"use client";
import { useState } from "react";
import anime from "animejs";
import { FaBars, FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { MdOutlineShoppingBasket } from "react-icons/md";

export const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDrawer = () => {
    setIsOpen(false);
    anime({
      targets: ".drawer",
      translateX: [0, "100%"],
      easing: "easeInOutQuad",
      duration: 300,
    });
  };

  const openDrawer = () => {
    setIsOpen(true);
    anime({
      targets: ".drawer",
      translateX: ["100%", 0],
      easing: "easeInOutQuad",
      duration: 300,
    });

    anime({
      targets: ".drawer .menu-item", // li элементүүдэд чиглүүлнэ
      opacity: [0, 1],
      translateX: [-10, 0],
      delay: anime.stagger(50, { start: 200 }), // Ээлжлэн хоцролттой тоглоно
      easing: "easeInOutQuad",
      duration: 500,
    });
  };

  return (
    <>
      <div
        onClick={openDrawer}
        className="lg:invisible sm:visible fixed right-6 flex items-center justify-center"
      >
        <FaBars className="text-white" />
      </div>
      <div
        className={`drawer top-0 fixed right-0 h-screen w-[300px] p-8 shadow-md bg- z-50 bg-gray-50 ${
          isOpen ? "translate-x-0" : "translate-x-[100%]"
        }`}
      >
        <div>
          <button
            onClick={closeDrawer}
            className="mb-20 w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-100 shadow-lg right-0"
          >
            X
          </button>

          <div className="space-y-3">
            <div className="menu-item opacity-0 p-2 bg-gray-100 rounded shadow-lg hover:bg-green-500 hover:text-white">
              Нүүр
            </div>
            <div className="menu-item opacity-0 p-2 bg-gray-100 rounded shadow-lg hover:bg-green-500 hover:text-white">
              Хоолны цэс
            </div>
            <div className="menu-item opacity-0 p-2 bg-gray-100 rounded shadow-lg hover:bg-green-500 hover:text-white">
              Хүргэлтийн бүс
            </div>
            <div className="menu-item opacity-0 p-2 bg-gray-100 rounded shadow-lg hover:bg-green-500 hover:text-white">
              <MdOutlineShoppingBasket className="mr-2" />
              Сагс
            </div>
            <div className="menu-item opacity-0 p-2 bg-gray-100 rounded shadow-lg hover:bg-green-500 hover:text-white">
              <FaRegUser className="mr-2" />
              Нэвтрэх
            </div>
            <div className="menu-item opacity-0  bg-gray-100 rounded shadow-lg hover:bg-green-500 hover:text-white">
              <Input
                type="search"
                placeholder="Бүтээгдэхүүн хайх"
                className="relative bg-transparent w-full px-10 border-gray-100 rounded outline-none "
              ></Input>
              <CiSearch
                size={18}
                className="absolute w-6 h-6 top-[6px] left-2 border-gray-500 "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
