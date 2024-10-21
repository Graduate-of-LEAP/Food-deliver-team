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
  address: string;
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
      address: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Хэрэглэгчийн нэр шаардлагатай"),
      email: Yup.string()
        .email("Имэйл хаяг буруу байна")
        .required("Имэйл хаяг шаардлагатай"),
      address: Yup.string().required("Хаягаа оруулна уу"),
      password: Yup.string()
        .min(8, "Нууц үг 8 тэмдэгтээс дээш байх ёстой")
        .matches(/[A-Z]/, "Том үсэг оруулах шаардлагатай")
        .matches(/[a-z]/, "Жижиг үсэг оруулах шаардлагатай")
        .matches(/\d/, "Тоо оруулах шаардлагатай")
        .matches(/[\W_]/, "Тусгай тэмдэгт оруулах шаардлагатай")
        .required("Нууц үг шаардлагатай"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Нууц үг таарахгүй байна")
        .required("Нууц үгээ давтан оруулах шаардлагатай"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await register(values);
        console.log("Амжилттай бүртгүүллээ:", response.data);
      } catch (error) {
        console.error("Бүртгэл амжилтгүй боллоо:", error);
      }
    },
  });
  const register = async (values: Formvalues) => {
    const response = await axios.post("https:locakhost:3001/register", {
      username: values.userName,
      email: values.email,
      address: values.address,
      password: values.password,
    });
    return response;
  };

  const isValidUpperCase = /[A-Z]/.test(formik.values.password);
  const isValidLowerCase = /[a-z]/.test(formik.values.password);
  const isValidNumber = /\d/.test(formik.values.password);
  const isValidSpecialChar = /[\W_]/.test(formik.values.password);

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
              {formik.touched.userName && formik.errors.userName ? (
                <div className="text-xs text-red-500">
                  {formik.errors.userName}
                </div>
              ) : null}
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
              {formik.touched.email && formik.errors.email ? (
                <div className="text-xs text-red-500">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col text-sm">
              <label>Хаяг</label>
              <input
                name="address"
                className="border bg-gray-50 p-2 rounded shadow-lg"
                placeholder="Хаягаа оруулна уу"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="text-xs text-red-500">
                  {formik.errors.address}
                </div>
              ) : null}
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
              {formik.touched.password && formik.errors.password ? (
                <div className="text-xs text-red-500">
                  {formik.errors.password}
                </div>
              ) : null}
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
            <div className="text-xs p-2 leading-5 text-gray-500 ">
              <li
                className={`${
                  formik.values.password === ""
                    ? "text-gray-500"
                    : isValidUpperCase
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Том үсэг оруулах шаардлагатай
              </li>
              <li
                className={`${
                  formik.values.password === ""
                    ? "text-gray-500"
                    : isValidLowerCase
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Жижиг үсэг оруулах шаардлагатай
              </li>
              <li
                className={`${
                  formik.values.password === ""
                    ? "text-gray-500"
                    : isValidNumber
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Тоо оруулах шаардлагатай
              </li>
              <li
                className={`${
                  formik.values.password === ""
                    ? "text-gray-500"
                    : isValidSpecialChar
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Тусгай тэмдэгт оруулах шаардлагатай
              </li>
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
              className="bg-gray-50 p-2 rounded w-full text-center text-sm cursor-pointer shadow-lg"
            >
              Бүртгүүлэх
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
