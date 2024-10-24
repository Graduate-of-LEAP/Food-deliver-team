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
import LoginDialog from "../components/LoginDialog";

import { Cart } from "./Cart";
import { useAuthContext } from "@/components/utils/authProvider";

export const Header = () => {
  const { userMe } = useAuthContext();

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
      <div className="container flex justify-between m-auto p-6 items-center ">
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
          <MdOutlineShoppingBasket />
          <Cart />

          <div className="flex gap-2 items-center px-4 font-semibold ">
            <FaRegUser />
            {userMe?.userName ? (
              <Link href="/userprofile">{userMe?.userName}</Link>
            ) : (
              <LoginDialog />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
