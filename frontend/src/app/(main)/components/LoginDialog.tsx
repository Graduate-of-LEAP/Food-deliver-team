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
import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

const LoginDialog: React.FC = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

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
                isClicked ? "bg-green-500 text-white" : "bg-gray-50 text-black"
              } hover:bg-transparent hover:border hover:border-green-500`}
            >
              Нэвтрэх
            </Button>
            <p className="text-center ">Эсвэл</p>
            <div className="space-y-8 text-center text-sm">
              <Button
                type="submit"
                className="text-center bg-gray-50 text-black w-full shadow-lg hover:bg-transparent hover:border hover:border-green-500"
              >
                Бүртгүүлэх
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default LoginDialog;
