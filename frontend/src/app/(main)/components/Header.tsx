"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingBasket } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import { useEffect, useState } from "react";
import LoginDialog from "../components/LoginDialog";
import { SearchCard } from "./SearchCard";
import { api } from "@/lib/axios";
import { CartContent } from "./Cartcontent";
export type UserMeResponse = {
  id: string;
  owog: string;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
  avatarImg: string;
};

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userMe, setUserMe] = useState<UserMeResponse>();

  const pathname: string = usePathname();
  interface Path {
    name: string;
    path: string;
  }
  const paths: Path[] = [
    { name: "Нүүр", path: "/" },
    { name: "Хоолны цэс", path: "/menu" },
    { name: "Хүргэлтийн бүс", path: "/map" },
    { name: "Dashboard", path: "/dashboard" },
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
  const getMe = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserMe(response.data);
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  };
  useEffect(() => {
    getMe();
  }, []);
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
          {paths.slice(0, 4).map((path, index) => (
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
          {/* Search Input */}
          <div className="relative">
            <CiSearch
              size={18}
              className="absolute w-6 h-6 top-[6px] left-2 border-gray-500 "
            />
            <Input
              type="search"
              placeholder="Бүтээгдэхүүн хайх"
              className="bg-transparent  w-[260px] px-10 border-gray-100 rounded-xl outline-none "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            ></Input>
          </div>
          <MdOutlineShoppingBasket />
          <CartContent />

          <div className="flex gap-2 items-center px-4 font-semibold ">
            <FaRegUser />
            {userMe?.userName ? (
              <Link href="/userexit">{userMe?.userName}</Link>
            ) : (
              <LoginDialog />
            )}
          </div>
        </div>

        {searchTerm && (
          <div className="bg-white flex absolute top-20 left-[30%] rounded-lg h-fit justify-center z-50 p-8 border">
            <SearchCard searchTerm={searchTerm} />
          </div>
        )}
      </div>
    </>
  );
};
