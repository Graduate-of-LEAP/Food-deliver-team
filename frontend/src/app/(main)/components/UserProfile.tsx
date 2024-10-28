"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { GrHistory } from "react-icons/gr";
import { RxExit } from "react-icons/rx";
import { UserExitDialog } from "./UserExitDialog";
import { api } from "@/lib/axios";
import { Link } from "lucide-react";
import { useAuthContext } from "@/components/utils/authProvider";

export const UserProfile = () => {
  const { userMe, getMe } = useAuthContext();

  const [avatarImg, setAvatarImg] = useState(userMe?.avatarImg || "");
  const [userName, setUserName] = useState(userMe?.userName || "");
  const [phoneNumber, setPhoneNumber] = useState(userMe?.phoneNumber || "");
  const [email, setEmail] = useState(userMe?.email || "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe();
    console.log("ahashbdkasdk", userMe);
  }, []);

  const userEdit = async (userId, userName) => {
    try {
    } catch (error) {}
  };

  return (
    <div>
      <div className="lg:w-[448px]  m-auto mt-[74px] space-y-12 p-8">
        <div className="flex flex-col gap-10 justify-center  w-[132px] m-auto">
          <div className="relative">
            <Avatar className="m-auto w-[120px] h-[120px]">
              <AvatarImage src={userMe?.avatarImg} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="h-[34px] w-[34px] rounded-full border flex justify-center items-center absolute right-0 bottom-0 bg-white">
              <MdOutlineEdit className="text-green-500" size={20} />
            </div>
          </div>

          <h1 className="font-bold text-2xl text-center">
            {userMe?.userName}hhhh
          </h1>
        </div>
        <div className=" space-y-4">
          <div className="bg-gray-50 h-[64px] w-[392px] flex justify-between items-center px-5 rounded shadow-lg">
            <div className="flex gap-2">
              <div className="h-12 w-12 rounded-full bg-white flex justify-center items-center">
                <FaRegUser />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Таны нэр{userMe?.userName}
                </p>
                <input
                  type="name"
                  className="bg-transparent border-none w-[220px] outline-none"
                  placeholder="Нэрээ оруулна уу"
                >
                  {userMe?.userName}
                </input>
              </div>
            </div>
            <MdOutlineEdit className="text-green-500" size={20} />
          </div>
          <div className="bg-gray-50 h-[64px] w-[392px] flex justify-between items-center px-5 rounded shadow-lg">
            <div className="flex gap-2">
              <div className="h-12 w-12 rounded-full bg-white flex justify-center items-center">
                <MdOutlinePhone />
              </div>
              <div>
                <p className="text-sm text-gray-500">Утасны дугаар</p>
                <input
                  type="phoneNumber"
                  className="bg-transparent border-none w-[240px] outline-none"
                  placeholder="Утасны дугаараа оруулна уу"
                >
                  {userMe?.phoneNumber}
                </input>
              </div>
            </div>
            <MdOutlineEdit className="text-green-500" size={20} />
          </div>
          <div className="bg-gray-50 h-[64px] w-[392px] flex justify-between items-center px-5 rounded shadow-lg">
            <div className="flex gap-2">
              <div className="h-12 w-12 rounded-full bg-white flex justify-center items-center">
                <MdOutlineEmail />
              </div>
              <div>
                <p className="text-sm text-gray-500">Имэйл хаяг</p>
                <input
                  type="email"
                  className="bg-transparent border-none w-[220px] outline-none"
                  placeholder="Имэйл хаягаа оруулна уу"
                >
                  {userMe?.email}
                </input>
              </div>
            </div>
            <MdOutlineEdit className="text-green-500" size={20} />
          </div>
          <div className=" h-[64px] w-[392px] flex justify-between items-center px-5 rounded ">
            <div className="flex gap-2 items-center">
              <div className="h-12 w-12 border rounded-full bg-white flex justify-center items-center shadow-md">
                <GrHistory />
              </div>
              <Link href="/">
                <p>Захиалгын түүх</p>
              </Link>
            </div>
          </div>
          <div className=" h-[64px] w-[392px] flex justify-between items-center px-5 rounded ">
            <div className="flex gap-2 items-center">
              <div className="h-12 w-12 border rounded-full bg-white flex justify-center items-center shadow-md">
                <RxExit />
              </div>
              <UserExitDialog />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
