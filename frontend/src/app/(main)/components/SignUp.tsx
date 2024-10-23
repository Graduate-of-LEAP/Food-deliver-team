"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormik } from "formik";
import Link from "next/link";
import { FC, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import api from "axios";

interface Formvalues {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export const SignUp: FC = () => {
  const router = useRouter();
  const [, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  const formik = useFormik<Formvalues>({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    onSubmit: async (values) => {
      console.log("FormValues", values);
      try {
        await api.post("http://localhost:3001/user/register", {
          userName: values.userName,
          email: values.email,
          password: values.password,
        });
        console.log("server");
        setSuccessMessage("Амжилттай бүртгүүллээ!");
        console.log("Амжилттай бүртгүүллээ!");
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      } catch (error) {
        console.error("Бүртгэл амжилтгүй боллоо:", error);
      }
    },
  });

  return (
    <div>
      <div className="lg:w-[448px]  m-auto mt-[74px] space-y-12 p-8">
        <h1 className="font-bold text-2xl text-center">Бүртгүүлэх</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <div className="flex flex-col text-sm ">
              <label>Нэр</label>
              <input
                name="userName"
                className="border bg-gray-50 p-2 rounded shadow-lg"
                placeholder="Нэрээ оруулна уу"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="flex flex-col text-sm">
              <label>И-мэйл</label>
              <input
                name="email"
                className="border bg-gray-50 p-2 rounded shadow-lg"
                placeholder="И-мэйл хаягаа оруулна уу"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="flex flex-col text-sm relative">
              <label>Нууц үг</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="border bg-gray-50 p-2 rounded shadow-lg"
                placeholder="Нууц үгээ оруулна уу"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div
                className="absolute right-3 top-10 transform -translate-y-1/2 cursor-pointer"
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
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div
                className="absolute right-3 top-10 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </div>
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-xs text-red-500">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <div>
              <div className="flex gap-2 items-center text-sm py-12">
                <Checkbox onClick={handleCheckboxClick} />
                <Link href={"/termofservice"}>
                  <p className="text-end text-sm cursor-pointer hover:underline hover:underline-offset-4 ">
                    Үйлчилгээний нөхцөл зөвшөөрөх
                  </p>
                </Link>
              </div>
            </div>
            <button
              type="submit"
              className={`${
                isChecked
                  ? "bg-green-500  text-white cursor-pointer "
                  : "bg-gray-200 cursor-not-allowed "
              }py-2 rounded w-full text-center text-sm shadow-lg`}
              disabled={!isChecked}
              onClick={() => {
                if (isChecked) {
                  router.push("/login");
                }
              }}
            >
              Бүртгүүлэх
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
