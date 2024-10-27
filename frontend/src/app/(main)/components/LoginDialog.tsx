"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/components/utils/authProvider";
import Link from "next/link";
import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";

type AddUserResponse = {
  email: string;
  password: string;
};
const LoginDialog: React.FC = () => {
  const router = useRouter();
  const { setUserMe } = useAuthContext();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const logIn = async (addUser: AddUserResponse) => {
    try {
      const response = await api.post("/user/login", addUser);
      localStorage.setItem("token", response.data.token);
      setUserMe(response.data.user);

      if (response.data.user.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    setIsClicked(true);
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border-none shadow-none font-semibold text-base px-2"
          >
            Нэвтрэх
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] h-[510px] p-6">
          <DialogTitle className="text-center text-xl">Нэвтрэх</DialogTitle>
          <div className="flex flex-col gap-4 ">
            <div className="space-y-1 items-center">
              <Label htmlFor="name" className="text-right">
                Имэйл
              </Label>
              <Input
                id="email"
                placeholder="Имэйл хаягаа оруулна уу"
                className="col-span-3 shadow-lg border-none bg-gray-100"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1 items-center relative">
              <Label htmlFor="username" className="text-right">
                Нууц үг
              </Label>
              <Input
                id="password"
                placeholder="Нууц үгээ оруулна уу"
                type={showPassword ? "text" : "password"}
                className="col-span-3 shadow-lg border-none bg-gray-100"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-end text-sm cursor-pointer hover:underline hover:underline-offset-4 ">
                Нууц үг сэргээх
              </div>
              <div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-100"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </div>
            </div>
          </div>
          <div className="space-y-8 ">
            <Button
              type="submit"
              className={`text-center w-full shadow-lg ${
                isClicked
                  ? "bg-[bg-[#f7432b] text-white"
                  : "bg-gray-50 text-black"
              } hover:bg-transparent hover:border hover:border-[#f7432b]`}
              onClick={() => logIn({ email, password })}
            >
              Нэвтрэх
            </Button>
            <p className="text-center ">Эсвэл</p>
            <div className="space-y-8 text-center text-sm">
              <Link href={"/signup"}>
                <Button
                  type="submit"
                  className="text-center bg-gray-50 text-black w-full shadow-lg hover:bg-transparent hover:border hover:border-[#f7432b]"
                >
                  Бүртгүүлэх
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default LoginDialog;
