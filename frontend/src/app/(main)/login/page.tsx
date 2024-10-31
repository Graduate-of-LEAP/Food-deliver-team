"use client";

import { useAuthContext } from "@/components/utils/authProvider";
import { api } from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AddUserResponse = {
  email: string;
  password: string;
};

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { setUserMe } = useAuthContext();
  const router = useRouter();

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
        setError("Нэвтрэхэд алдаа гарлаа. Та өөрийн мэдээллээ шалгана уу.");
      } else {
        console.error("An unexpected error occurred");
        setError("Тодорхойгүй алдаа гарлаа.");
      }
    }
  };

  return (
    <div>
      <div className="sm:w-[448px] m-auto mt-[74px] space-y-12">
        <h1 className="font-bold text-2xl text-center">Нэвтрэх</h1>
        <div className="space-y-4">
          <div className="flex flex-col text-sm">
            <label>Имэйл</label>
            <input
              name="email"
              placeholder="Имэйл хаягаа оруулна уу"
              className="bg-gray-50 p-2 rounded border shadow-sm"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex flex-col text-sm">
            <label>Нууц үг</label>
            <input
              name="password"
              type="password"
              placeholder="Нууц үгээ оруулна уу"
              className="bg-gray-50 p-2 rounded border shadow-sm"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <p className="text-end">Нууц үг сэргээх</p>
          </div>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="space-y-8 text-center text-sm">
          <button
            className="p-2 bg-gray-50 border shadow-md w-full rounded hover:bg-green-400 hover:text-white"
            onClick={() => logIn({ email, password })}
          >
            Нэвтрэх
          </button>
          <p>Эсвэл</p>
          <Link href={"/signup"}>
            <button className="p-2 bg-gray-50 border shadow-md w-full rounded  hover:bg-green-400 hover:text-white">
              Бүртгүүлэх
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
