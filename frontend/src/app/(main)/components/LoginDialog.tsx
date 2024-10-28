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
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useAuthContext } from "@/components/utils/authProvider";
import { api } from "@/lib/axios";

type AddUserResponse = {
  email: string;
  password: string;
};

const LoginDialog: React.FC = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUserMe } = useAuthContext();

  const handleClick = () => {
    setIsClicked(true);
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const logIn = async (addUser: AddUserResponse) => {
    try {
      const response = await api.post("/user/login", addUser);
      localStorage.setItem("token", response.data.token);
      setUserMe(response.data.user);

      if (response.data.user.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setError("Login failed. Please check your credentials.");
      } else {
        console.error("An unexpected error occurred");
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border-none font-semibold text-base px-2 "
          >
            <FaRegUser className="mr-2" />
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
              <Link
                href={"/forgetpassword"}
                className=" cursor-pointer hover:underline hover:underline-offset-4 "
              >
                <p className="text-end text-sm"> Нууц үг сэргээх</p>
              </Link>
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
