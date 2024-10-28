"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { api } from "@/lib/axios";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

type AddFoodType = {
  foodName: string;
  orts: string;
  price: number;
  quantity: number;
  category: string;
  salePercent: number;
  images: string[];
};

type Category = {
  _id: string;
  categoryName: string;
};
type Food = {
  _id: string;
  foodName: string;
  images: string[];
  price: number;
};
interface RightSideFoodProps {
  selectedCategory: string;
}
export const RightSideFood: React.FC<RightSideFoodProps> = ({
  selectedCategory,
}) => {
  const [uploadedUrl, setUploadedUrl] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedAddCategory, setSelectedAddCategory] = useState<string>("");
  const [foodName, setFoodName] = useState<string>("");
  const [orts, setOrts] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [discounted, setDiscounted] = useState<boolean>(false);
  const [salePercent, setSalePercent] = useState<number>(0);

  const [foods, setFoods] = useState<Food[]>([]);

  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const limit = 9;

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      await handleUpload(files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const uploadedUrls = [...uploadedUrl, res.data.secure_url];
      setUploadedUrl(uploadedUrls);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFoods = async () => {
    try {
      const response = await api.get("/food", {
        params: { page, limit, selectedCategory },
      });
      setFoods(response.data.foods);
      setTotal(response.data.totalCount);
    } catch (error) {
      console.error("Failed to fetch food items:", error);
    }
  };

  const createFood = async () => {
    const addFood: AddFoodType = {
      salePercent,
      foodName,
      orts,
      price,
      quantity,
      category: selectedAddCategory,
      images: uploadedUrl,
    };

    try {
      await api.post("/food", addFood);
      getFoods();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await api.get("/category");
      setCategories(response.data.categories);
    } catch (error) {
      console.log("Failed to fetch categories:", error);
    }
  };
  useEffect(() => {
    getFoods();
  }, [page, selectedCategory]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex-[4] flex flex-col gap-8 py-6">
      <div className="flex justify-between">
        <div className="font-bold text-xl">Breakfast</div>
        <div>
          <Dialog>
            <DialogTrigger>
              <div className="flex items-center bg-[#18BA51] text-white px-4 py-1 rounded-[8px] border font-medium cursor-pointer">
                <div>Add new food</div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex justify-center font-bold">
                  Create food
                </DialogTitle>
                <DialogDescription className="rounded-lg">
                  <div className="flex flex-col py-6 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-[14px] text-black">
                        Хоолны нэр
                      </label>
                      <input
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        placeholder="Нэр оруулна уу"
                        className="py-4 px-3 w-full placeholder-[#8B8E95] bg-[#F4F4F4] rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-[14px] text-black">
                        Хоолны ангилал
                      </label>
                      <Select onValueChange={setSelectedAddCategory}>
                        <SelectTrigger className="w-full bg-[#F7F7F8]">
                          <SelectValue placeholder="Сонгох" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((item) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.categoryName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-[14px] text-black">
                        Хоолны орц
                      </label>
                      <input
                        value={orts}
                        onChange={(e) => setOrts(e.target.value)}
                        placeholder="Хоолны орц оруулна уу"
                        className="py-4 px-3 w-full placeholder-[#8B8E95] bg-[#F4F4F4] rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-[14px] text-black">
                        Хоолны үнэ
                      </label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        placeholder="Хоолны үнэ оруулна уу"
                        className="py-4 px-3 w-full placeholder-[#8B8E95] bg-[#F4F4F4] rounded-lg"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="font-medium text-[14px] text-black flex items-center gap-2">
                        <Switch
                          checked={discounted}
                          onCheckedChange={(checked) => {
                            setDiscounted(checked);
                            if (!checked) {
                              setSalePercent(0);
                            }
                          }}
                        />
                        Хямдралтай эсэх
                      </div>
                      <input
                        type="number"
                        value={salePercent}
                        onChange={(e) => setSalePercent(Number(e.target.value))}
                        placeholder="Хямдрал оруулна уу"
                        className="py-4 px-3 w-full placeholder-[#8B8E95] bg-[#F4F4F4] rounded-lg"
                        disabled={!discounted}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="font-medium text-[14px] text-black">
                        Хоолны зураг
                      </div>
                      <div className="flex flex-col gap-4 bg-white rounded-lg">
                        <div className="font-semibold text-lg">
                          Бүтээгдэхүүний зураг оруулна уу
                        </div>
                        <div className="flex gap-2">
                          {uploadedUrl.map((url, index) => (
                            <div
                              key={index}
                              className="flex-1 border-2 rounded-lg border-dashed h-[124px] relative flex justify-center items-center"
                            >
                              <Image
                                alt="Uploaded image"
                                fill
                                src={url}
                                className="object-contain"
                              />
                            </div>
                          ))}
                          <div className="flex flex-col w-[160px] justify-center items-center">
                            <input
                              type="file"
                              className="hidden"
                              id="fileInput"
                              onChange={handleChangeFile}
                            />
                            <label
                              htmlFor="fileInput"
                              className="cursor-pointer"
                            >
                              <div className="w-16 h-16 flex justify-center items-center text-2xl bg-gray-200 rounded-full">
                                +
                              </div>
                            </label>
                          </div>
                          {loading && (
                            <div className="absolute flex justify-center items-center w-full h-full bg-white opacity-75 rounded-lg">
                              <span className="text-sm font-semibold">
                                Loading...
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-end pt-6 px-4 items-center">
                    <DialogClose>
                      <div className="text-[#3F4145] font-bold cursor-pointer">
                        Cancel
                      </div>
                    </DialogClose>
                    <DialogClose>
                      <div
                        className="bg-[#393939] rounded-lg text-white px-5 py-2 font-medium cursor-pointer"
                        onClick={createFood}
                      >
                        Continue
                      </div>
                    </DialogClose>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-6 gap-y-16">
        {foods.map((item) => (
          <div key={item._id} className="">
            <div className="relative w-full h-[186px]">
              <Image
                src={item.images[0] || "/1.png"}
                alt={item.foodName}
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="">
              <p className="text-base font-bold text-black">{item.foodName}</p>
              <p className="text-base font-serif text-[#18BA51]">
                {item.price}₮
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-evenly pt-10">
        {new Array(Math.ceil(total / 9)).fill(0).map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => setPage(index + 1)}
              className={`w-8 h-8 flex justify-center items-center cursor-pointer rounded-lg ${
                page === index + 1 ? "bg-green-400 text-white font-bold" : ""
              }`}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};
