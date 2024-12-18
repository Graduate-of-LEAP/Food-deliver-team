"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import LoginDialog from "../components/LoginDialog";
import { SearchCard } from "./SearchCard";
import { api } from "@/lib/axios";
import { Drawer } from "./Drawer";
import { CartContent } from "./Cartcontent";
import { ChatDialog } from "./chatDialog";

type UserMeResponse = {
  id: string;
  owog: string;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
  avatarImg: string;
};
export const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = 0;
  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const scrollY = window.scrollY;

      if (scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = scrollY;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userMe, setUserMe] = useState<UserMeResponse>();
  const [userId, setUserId] = useState<string>();
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

  const getMe = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserMe(response.data);
      setUserId(response.data.id);
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 transition-transform duration-300 z-[100] ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full bg-gradient-to-b from-gray-700 to-transparent">
        <div className="container flex justify-between m-auto p-6 items-center">
          <div className="flex lg:gap-6 lg:text-base text-xs gap-2 items-center text-white">
            <Image
              src={"/images/Logo.png"}
              alt="Pinecone logo"
              width={32}
              height={32}
              className="w-6 h-6 lg:w-8 lg:h-8 "
            />
            {paths.slice(0, 4).map((path, index) => (
              <Link key={index} href={path.path}>
                <div
                  style={{
                    color: pathname === path.path ? "#86c41d" : "white",
                  }}
                  className="font-semibold lg:visible invisible "
                >
                  {path.name}
                </div>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4 lg:visible invisible">
            <div className="lg:invisible visible fixed right-6 top-9 z-50">
              <Drawer />
            </div>
            <div className="relative">
              <CiSearch
                size={18}
                className="absolute w-6 h-6 top-[6px] left-2 border-gray-500 text-white "
              />
              <Input
                type="search"
                placeholder="Бүтээгдэхүүн хайх"
                className="bg-transparent  w-[260px] px-10 border-gray-100 rounded-lg outline-none "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              ></Input>
            </div>

            <CartContent />
            <div className=" font-semibold shadow-md bg-white rounded-md">
              {userMe?.userName ? (
                <Link href="/userexit">
                  <div className="flex items-center hover:bg-gray-200 p-1.5 px-2 rounded-md">
                    <FaRegUser className="mr-2" />
                    {userMe?.userName}
                  </div>
                </Link>
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
      </div>
      <div className="fixed right-20 top-[75vh] z-50">
        <ChatDialog params={{ chatId: userId as string }} />
      </div>
    </div>
  );
};
