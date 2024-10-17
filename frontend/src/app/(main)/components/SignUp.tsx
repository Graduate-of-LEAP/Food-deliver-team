"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { FC, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

interface Formvalues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUp: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div>
      <div className="lg:w-[448px]  m-auto mt-[74px] space-y-12 p-8">
        <h1 className="font-bold text-2xl text-center">Бүртгүүлэх</h1>

        <form>
          <div className="space-y-4">
            <div className="flex flex-col text-sm ">
              <label>Нэр</label>
              <input
                name="username"
                className="border bg-gray-50 p-2 rounded shadow-lg"
                placeholder="Нэрээ оруулна уу"
              />
            </div>
            <div className="flex flex-col text-sm">
              <label>И-мэйл</label>
              <input
                name="email"
                className="border bg-gray-50 p-2 rounded shadow-lg"
                placeholder="И-мэйл хаягаа оруулна уу"
              />
            </div>
            <div className="flex flex-col text-sm">
              <label>Хаяг</label>
              <input
                name="address"
                className="border bg-gray-50 p-2 rounded shadow-lg"
                placeholder="Хаягаа оруулна уу"
              />
            </div>
            <div className="flex flex-col text-sm relative">
              <label>Нууц үг</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="border bg-gray-50 p-2 rounded shadow-lg"
                placeholder="Нууц үгээ оруулна уу"
              />
              <div
                className="absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </div>
            </div>
            <div className="flex flex-col text-sm relative">
              <label>Нууц үг давтах</label>
              <input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                className="border bg-gray-50 p-2 rounded shadow-lg"
                placeholder="Нууц үгээ оруулна уу"
              />

              <div
                className="absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </div>
            </div>

            <div>
              <div className="flex gap-2 items-center text-sm py-12">
                <Checkbox />
                <p>Үйлчилгээний нөхцөл зөвшөөрөх</p>
              </div>
            </div>
            <button
              type="submit"
              className="bg-gray-50 p-2 rounded w-full text-center text-sm cursor-pointer shadow-lg hover:bg-green-400 hover:text-white "
            >
              Бүртгүүлэх
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
