"use client";
import Image from "next/image";
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

export const Address: React.FC = () => {
  const [district, setDistrict] = useState<string>("");
  const [khoro, setKhoro] = useState<string>("");
  const [building, setBuilding] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [cashChecked, setCashChecked] = useState<boolean>(false);
  const [cardChecked, setCardChecked] = useState<boolean>(false);

  const allFieldsFilled = (): boolean => {
    return (
      district !== "" && khoro !== "" && building !== "" && phone.length >= 8
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
          <Select onValueChange={setKhoro} value={khoro}>
            <SelectTrigger
              className={`${khoro ? "bg-green-500 text-white" : "bg-gray-100"
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
                      khoro === value
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
          <Select onValueChange={setBuilding} value={building}>
            <SelectTrigger
              className={`${building ? "bg-green-500 text-white" : "bg-gray-100"
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
                      building === value
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
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
          Утасны дугаар*
          <Input
            className="bg-gray-100"
            type="text"
            placeholder="Утасны дугаараа оруулна уу"
            value={phone}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setPhone(value);
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
      <div className="px-8">
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
        <div className="border-2 rounded-lg p-4 flex flex-col gap-[24.2rem] shadow-lg">
          <div className="flex py-2 border-t-2 border-b-2 w-[432px] gap-4 ">
            <div className="w-1/2 flex items-center justify-center">
              <Image
                src="/pizza.png"
                width={180}
                height={120}
                alt="Picture of the pizza"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-between">
              <div>
                <b className="text-xl">Main Pizza</b>
                <p className="text-green-500 text-md font-bold">34,800 ₮</p>
              </div>
              <div>
                <b className="text-md">Орц</b>
                <p className="p-1 bg-gray-50 rounded-lg my-2">
                  Хулуу, төмс, лууван, сонгино, цөцгийн тос, самрын үр
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p>Нийт төлөх дүн</p>
              <b>34,800₮</b>
            </div>
            <button
              className={`w-1/2 rounded-sm text-white ${allFieldsFilled() && isPaymentSelected()
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
    </div>
  );
};
