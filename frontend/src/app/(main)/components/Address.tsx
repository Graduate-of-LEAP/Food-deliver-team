"use client";
import { TbCircleCheckFilled } from "react-icons/tb";
import { useState } from "react";
import { Textarea } from "../../../components/ui/textarea";
import { CiLocationOn } from "react-icons/ci";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
import { api } from "@/lib/axios";
import { useEffect } from "react";
import Link from "next/link";

type sagsCardType = {
  _id: string;
  userId: string;
  foodId: foodType;
  price: number;
  count: number;
};
type foodType = {
  orts: string;
  images: string[];
  salePercent: number;
  foodName: string;
  _id: string;
};
type UserMeResponse = {
  id: string;
};
type addOrderPackResponse = {
  userId: string;
  foods: {
    food: string;
    price: number;
    count: number;
  }[];
  status: string;
  phoneNumber: string;
  district: string;
  khoroo: string;
  apartment: string;
  orderDetail: string;
};
export const Address: React.FC = () => {
  const [district, setDistrict] = useState<string>("");
  const [khoroo, setKhoroo] = useState<string>("");
  const [apartment, setApartment] = useState<string>("");
  const [orderDetail, setOrderDetail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [cashChecked, setCashChecked] = useState<boolean>(false);
  const [cardChecked, setCardChecked] = useState<boolean>(false);
  const [sags, setSags] = useState<sagsCardType[]>([]);
  const [userMe, setUserMe] = useState<UserMeResponse>();

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
      console.log("Error fetching user data", error);
    }
  };

  const getSags = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/sags", {
        params: { userId: userMe?.id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSags(response.data.sags);
      console.log(response.data.sags);
    } catch (error) {
      console.log("Failed to fetch sags:", error);
    }
  };

  const createOrderPack = async (addOrderPack: addOrderPackResponse) => {
    try {
      const response = await api.post("/order", addOrderPack);

      console.log("Order pack creation response:", response);
    } catch (error) {
      console.error("Error adding orderPack:", error);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    if (userMe) {
      getSags();
    }
  }, [userMe]);

  const allFieldsFilled = (): boolean => {
    return (
      district !== "" &&
      khoroo !== "" &&
      apartment !== "" &&
      phoneNumber.length >= 8
    );
  };

  const isPaymentSelected = (): boolean => {
    return cashChecked || cardChecked;
  };

  return (
    <div className="flex gap-60">
      <div className="px-8 w-fit">
        <div className="flex items-center gap-8 py-8">
          {allFieldsFilled() && isPaymentSelected() ? (
            <TbCircleCheckFilled color="green" size={48} />
          ) : (
            <div className="w-10 h-10 rounded-full flex items-center justify-center border-2">
              <div className="w-5 h-5 rounded-full bg-blue-700"></div>
            </div>
          )}
          <div>
            <p className="text-gray-500">Алхам 1</p>
            <b>Хаягийн мэдээлэл оруулах</b>
            <p className="text-blue-700">Хүлээгдэж байна</p>
          </div>
        </div>

        <div className="border-2 rounded-lg p-8 flex flex-col gap-8 shadow-lg">
          Хаяг аа оруулна уу
          <Select onValueChange={setDistrict} value={district}>
            <SelectTrigger
              className={`${
                district ? "bg-green-500 text-white" : "bg-gray-100"
              } w-[432px]`}
            >
              <SelectValue
                placeholder={
                  <div className="flex items-center">
                    <CiLocationOn size={22} className="mr-4" />
                    <span>Дүүрэг сонгоно уу</span>
                  </div>
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[
                  "Баянзүрх",
                  "Хан-Уул",
                  "Баянгол",
                  "Сонгинохайрхан",
                  "Чингэлтэй",
                ].map((value) => (
                  <SelectItem
                    key={value}
                    value={value}
                    className={
                      district === value
                        ? "bg-green-500 text-white"
                        : "bg-white text-black"
                    }
                  >
                    <div className="flex gap-2">
                      <CiLocationOn size={18} /> {value} дүүрэг
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={setKhoroo} value={khoroo}>
            <SelectTrigger
              className={`${
                khoroo ? "bg-green-500 text-white" : "bg-gray-100"
              } w-[432px]`}
            >
              <SelectValue
                placeholder={
                  <div className="flex items-center">
                    <CiLocationOn size={22} className="mr-4" />
                    <span>Хороо сонгоно уу</span>
                  </div>
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {["1", "2", "3", "4", "5", "6", "7"].map((value) => (
                  <SelectItem
                    key={value}
                    value={value}
                    className={
                      khoroo === value
                        ? "bg-green-500 text-white"
                        : "bg-white text-black"
                    }
                  >
                    <div className="flex gap-2">
                      <CiLocationOn size={18} /> {value}-р хороо
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={setApartment} value={apartment}>
            <SelectTrigger
              className={`${
                apartment ? "bg-green-500 text-white" : "bg-gray-100"
              } w-[432px]`}
            >
              <SelectValue
                placeholder={
                  <div className="flex items-center">
                    <CiLocationOn size={22} className="mr-4" />
                    <span>Байр, гудамж сонгоно уу</span>
                  </div>
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {["Нархан хотхон", "Зайсан хотхон"].map((value) => (
                  <SelectItem
                    key={value}
                    value={value}
                    className={
                      apartment === value
                        ? "bg-green-500 text-white"
                        : "bg-white text-black"
                    }
                  >
                    <div className="flex gap-2">
                      <CiLocationOn size={18} /> {value}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          Нэмэлт мэдээлэл
          <Textarea
            className="bg-gray-100"
            placeholder="Орц, давхар, орцны код ..."
            value={orderDetail}
            onChange={(e) => setOrderDetail(e.target.value)}
          />
          Утасны дугаар*
          <Input
            className="bg-gray-100"
            type="text"
            placeholder="Утасны дугаараа оруулна уу"
            value={phoneNumber}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setPhoneNumber(value);
              }
            }}
          />
          Төлбөр төлөх
          <div className="flex gap-20 text-gray-400">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="cash"
                checked={cashChecked}
                onChange={() => setCashChecked((prev) => !prev)}
                className="cursor-pointer"
              />
              <label
                htmlFor="cash"
                className="text-sm font-medium leading-none"
              >
                Бэлнээр
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="card"
                checked={cardChecked}
                onChange={() => setCardChecked((prev) => !prev)}
                className="cursor-pointer"
              />
              <label
                htmlFor="card"
                className="text-sm font-medium leading-none"
              >
                Картаар
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 w-[500px]">
        <div className="flex items-center gap-8 py-8">
          <div className="w-10 h-10 rounded-full flex items-center justify-center border-2">
            <div className="w-5 h-5 rounded-full bg-blue-700"></div>
          </div>
          <div>
            <p className="text-gray-500">Алхам 2</p>
            <b>Захиалга баталгаажуулах</b>
            <p className="text-blue-400">Хүлээгдэж байна</p>
          </div>
        </div>
        <div className="border-2 rounded-lg p-6 flex flex-col gap-4 shadow-lg">
          {sags.length > 0 ? (
            sags.map((item) => (
              <div className="flex border-b-2 border-t-2 pt-2" key={item._id}>
                <div className="flex-1">
                  {item.foodId.images && item.foodId.images.length > 0 && (
                    <img
                      src={item.foodId.images[0]}
                      className="w-60 h-40 object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-between p-4 flex-1">
                  <span className="font-bold uppercase">
                    {item.foodId.foodName}
                  </span>
                  <span className="text-green-400 font-bold">
                    ₮{item.price.toFixed(2)}
                  </span>
                  <span>{item.foodId.orts}</span>
                </div>
              </div>
            ))
          ) : (
            <span className="text-gray-500">No items in the cart</span>
          )}
          <Link href={`/userexit/userOrder`}>
            <button
              className={`w-1/2 rounded-sm p-2 text-white ${
                allFieldsFilled() && isPaymentSelected()
                  ? "bg-green-500"
                  : "bg-gray-100 text-gray-400"
              }`}
              disabled={!allFieldsFilled() || !isPaymentSelected()}
              onClick={() => {
                if (userMe?.id) {
                  const foods = sags.map((item) => ({
                    food: item.foodId._id, // Pass only the product ID (string)
                    price: item.price, // Use the updated price
                    count: item.count, // Use the updated count
                  }));

                  createOrderPack({
                    userId: userMe.id,
                    status: "Шинэ захиалга",
                    foods,
                    phoneNumber: phoneNumber,
                    district: district,
                    khoroo: khoroo,
                    apartment: apartment,
                    orderDetail: orderDetail,
                  });
                } else {
                  console.error("User ID is undefined");
                }
              }}
            >
              Захиалах
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
