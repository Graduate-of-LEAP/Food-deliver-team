"use client";

import { useFormik } from "formik";
import Link from "next/link";

interface FormValues {
  email: string;
  password: string;
}

const Page = () => {
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
            ></input>
          </div>
          <div className="flex flex-col text-sm">
            <label>Нууц үг</label>
            <input
              name="password"
              placeholder="Нууц үгээ оруулна уу"
              className="bg-gray-50 p-2 rounded border shadow-sm"
            ></input>
            <p className="text-end">Нууц үг сэргээх</p>
          </div>
        </div>
        <div className="space-y-8 text-center text-sm">
          <button className="p-2 bg-gray-50 border shadow-md w-full rounded hover:bg-green-400 hover:text-white">
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
