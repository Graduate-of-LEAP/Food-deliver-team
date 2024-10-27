"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEdit, MdOutlinePhone, MdOutlineEmail } from "react-icons/md";
import { GrHistory } from "react-icons/gr";
import { RxExit } from "react-icons/rx";
import { UserExitDialog } from "./UserExitDialog";
import { api } from "@/lib/axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type UserMeResponse = {
  id: string;
  owog: string;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
  avatarImg: string;
};

export const UserProfile = () => {
  const [newUserName, setNewUserName] = useState<string>("");
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newAddress, setNewAddress] = useState<string>("");
  const [userMe, setUserMe] = useState<UserMeResponse>();

  const editUser = async (updateData: {
    _id: string;
    newUserName?: string;
    newPhoneNumber?: string;
    newEmail?: string;
    newAddress?: string;
  }) => {
    const token = localStorage.getItem("token");
    try {
      await api.put("/user", updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getMe();
    } catch (error) {
      console.log("Error updating user information:", error);
    }
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
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div>
      <div className="lg:w-[448px]  m-auto mt-[74px] space-y-12 p-8">
        <div className="flex flex-col gap-10 justify-center  w-[132px] m-auto">
          <div className="relative">
            <Avatar className="m-auto w-[120px] h-[120px]">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="h-[34px] w-[34px] rounded-full border flex justify-center items-center absolute right-0 bottom-0 bg-white">
              <MdOutlineEdit className="text-green-500" size={20} />
            </div>
          </div>
          <h1 className="font-bold text-2xl text-center">{userMe?.userName}</h1>
        </div>
        <div className=" space-y-4">
          <div className="bg-gray-50 h-[64px] w-[392px] flex justify-between items-center px-5 rounded ">
            <div className="flex gap-2">
              <div className="h-12 w-12 rounded-full bg-white flex justify-center items-center">
                <FaRegUser />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm text-gray-500">Таны нэр:</p>
                <input
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  type="text"
                  className="bg-transparent border-none w-[220px] outline-none"
                  placeholder={userMe?.userName || "Нэрээ оруулна уу"}
                />
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger>
                <MdOutlineEdit className="text-green-500" size={20} />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Хэрэглэгчийн нэрийг{" "}
                    <span className="text-green-400 font-bold">
                      {newUserName}
                    </span>{" "}
                    болгон өөрчлөх үү.
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Үгүй</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      editUser({ _id: userMe?.id || "", newUserName })
                    }
                  >
                    Тийм
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="bg-gray-50 h-[64px] w-[392px] flex justify-between items-center px-5 rounded ">
            <div className="flex gap-2">
              <div className="h-12 w-12 rounded-full bg-white flex justify-center items-center">
                <MdOutlinePhone />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm text-gray-500">Утасны дугаар:</p>
                <input
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                  type="text"
                  className="bg-transparent border-none w-[220px] outline-none"
                  placeholder={
                    userMe?.phoneNumber || "Утасны дугаараа оруулна уу"
                  }
                />
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger>
                <MdOutlineEdit className="text-green-500" size={20} />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Хэрэглэгчийн нэрийг{" "}
                    <span className="text-green-400 font-bold">
                      {newPhoneNumber}
                    </span>{" "}
                    болгон өөрчлөх үү.
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Үгүй</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      editUser({ _id: userMe?.id || "", newPhoneNumber })
                    }
                  >
                    Тийм
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="bg-gray-50 h-[64px] w-[392px] flex justify-between items-center px-5 rounded ">
            <div className="flex gap-2">
              <div className="h-12 w-12 rounded-full bg-white flex justify-center items-center">
                <MdOutlineEmail />
              </div>
              <div>
                <p className="text-sm text-gray-500">Имэйл хаяг:</p>
                <input
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  type="email"
                  className="bg-transparent border-none w-[220px] outline-none"
                  placeholder={userMe?.email || "Имэйл хаягаа оруулна уу"}
                />
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger>
                <MdOutlineEdit className="text-green-500" size={20} />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Хэрэглэгчийн нэрийг{" "}
                    <span className="text-green-400 font-bold">{newEmail}</span>{" "}
                    болгон өөрчлөх үү.
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Үгүй</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      editUser({ _id: userMe?.id || "", newEmail })
                    }
                  >
                    Тийм
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="bg-gray-50 h-[64px] w-[392px] flex justify-between items-center px-5 rounded ">
            <div className="flex gap-2">
              <div className="h-12 w-12 rounded-full bg-white flex justify-center items-center">
                <MdOutlineEmail />
              </div>
              <div>
                <p className="text-sm text-gray-500">Хаяг:</p>
                <input
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  type="text"
                  className="bg-transparent border-none w-[220px] outline-none"
                  placeholder={userMe?.address || "Хаягаа оруулна уу"}
                />
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger>
                <MdOutlineEdit className="text-green-500" size={20} />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Хэрэглэгчийн нэрийг{" "}
                    <span className="text-green-400 font-bold">
                      {newAddress}
                    </span>{" "}
                    болгон өөрчлөх үү.
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Үгүй</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      editUser({ _id: userMe?.id || "", newAddress })
                    }
                  >
                    Тийм
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className=" h-[64px] w-[392px] flex justify-between items-center px-5 rounded ">
            <div className="flex gap-2 items-center">
              <div className="h-12 w-12 border rounded-full bg-white flex justify-center items-center">
                <GrHistory />
              </div>
              <p>Захиалгын түүх</p>
            </div>
          </div>
          <div className=" h-[64px] w-[392px] flex justify-between items-center px-5 rounded ">
            <div className="flex gap-2 items-center">
              <div className="h-12 w-12 border rounded-full bg-white flex justify-center items-center">
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
