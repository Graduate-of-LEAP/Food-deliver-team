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
import { useAuthContext } from "@/components/utils/authProvider";

type sagsCardType = {
  userId: string;
  _id: string;
  foodName: string;
  price: number;
  orts: string;
  images: string[];
};


export const Address: React.FC = () => {

  const {
    userMe,
  } = useAuthContext();

  const [district, setDistrict] = useState<string>("");
  const [khoroo, setKhoroo] = useState<string>("");
  const [apartment, setApartment] = useState<string>("");
  const [orderDetail, setOrderDetail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [cashChecked, setCashChecked] = useState<boolean>(false);
  const [cardChecked, setCardChecked] = useState<boolean>(false);
  const [sags, setSags] = useState<sagsCardType[]>([]);

  const getSags = async () => {
    try {
      const response = await api.get("/sags");
      console.log(response.data); // Check the structure of the response
      const sagsWithId = response.data.sags.map((sags: any) => ({
        _id: sags._id,
        foodName: sags.foodId.foodName,
        price: sags.price,
        orts: sags.foodId.orts,
        images: sags.foodId.images,
      }));
      setSags(sagsWithId);
    } catch (error) {
      console.log("Failed to fetch sags:", error);
    }
  };




  useEffect(() => {
    getSags();
  }, []);

  console.log(sags)

  const allFieldsFilled = (): boolean => {
    return (
      district !== "" && khoroo !== "" && apartment !== "" && phoneNumber.length >= 8
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
              className={`${district ? "bg-green-500 text-white" : "bg-gray-100"
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
              className={`${khoroo ? "bg-green-500 text-white" : "bg-gray-100"
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
              className={`${apartment ? "bg-green-500 text-white" : "bg-gray-100"
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
                <div>
                  {item.images && item.images.length > 0 && (
                    <img src={item.images[0]} className="w-60 h-40 object-cover" />
                  )}
                </div>
                <div className="flex flex-col justify-between p-4">
                  <span className="font-bold">{item.foodName}</span>
                  <span className="text-green-400 font-bold">₮{item.price.toFixed(2)}</span>
                  <span>{item.orts}</span>
                </div>
              </div>
            ))
          ) : (
            <span className="text-gray-500">No items in the cart</span>
          )}
          <button
            className={`w-1/2 rounded-sm p-2 text-white ${allFieldsFilled() && isPaymentSelected()
              ? "bg-green-500"
              : "bg-gray-100 text-gray-400"
              }`}
            disabled={!allFieldsFilled() || !isPaymentSelected()}
          >
            Захиалах
          </button>
        </div>
      </div>
    </div>

  );
};


