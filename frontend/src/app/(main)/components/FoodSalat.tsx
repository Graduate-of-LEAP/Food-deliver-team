"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useCart } from "./context/Cartcontext";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { FoodDiscountCard } from "./FoodDiscountCart";
import { AxiosError } from "axios";
import { useAuthContext } from "@/components/utils/authProvider";
import { FoodMainLast } from "./FoodMainLast";
import { FoodDrinkLast } from "./FoodDrinkLast";

export type Category = {
  _id: string;
  categoryName: string;
};

type CartItem = {
  id: number;
  title: string;
  price: number;
  src: string;
  quantity: number;
  orts: string;
};

type foodCardType = {
  _id: string;
  category: CategoryType[];
  images: string[];
  foodName: string;
  price: number;
  salePercent: number;
  discountAmount: number;
  discountedPrice: number;
  orts: string;
};

type CategoryType = {
  _id: string;
  categoryName: string;
};

interface CreateSagsType {
  userId: string;
  price: number;
  foodId: string;
  count: string;
}

export const FoodSalad = () => {
  const [foods, setFoods] = useState<foodCardType[]>([]);
  const [currentItem, setCurrentItem] = useState<foodCardType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { userMe } = useAuthContext();
  const { addItem } = useCart();
  const [dialogOpen, setDialogOpen] = useState(false);

  const getFoods = async () => {
    try {
      const response = await api.get("/food");
      const foodsWithId = response.data.foods.map((food: foodCardType) => ({
        ...food,
        _id: food._id,
      }));
      setFoods(foodsWithId);
    } catch (error) {
      console.log("Failed to fetch foods:", error);
    }
  };

  const filteredVndsenHoolfoods = foods.filter(
    (item) => item.category[0]?.categoryName === "Үндсэн хоол"
  );

  const createSags = async (addSags: CreateSagsType) => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.post("/sags", addSags, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        "API error:",
        axiosError.response?.data || axiosError.message
      );
      throw error;
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const openDialog = (item: foodCardType) => {
    setCurrentItem(item);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="flex flex-col container pt-6">
        <div className="flex text-gray-800 font-bold text-2xl pl-6">
          Үндсэн хоол
        </div>
        <div className="grid grid-cols-5 grid-flow-row gap-5 my-10">
          {filteredVndsenHoolfoods?.slice(0, 5).map((item, index) => (
            <Dialog key={index} open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <div
                  className="cursor-pointer"
                  onClick={() => openDialog(item)} // Use the openDialog function
                >
                  <FoodDiscountCard
                    src={item.images[0]}
                    title={item.foodName}
                    price={item.price}
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] flex gap-8">
                {currentItem && ( // Ensure currentItem is set
                  <>
                    <div className="w-[48%]">
                      <Image
                        src={currentItem.images[0]}
                        width={800}
                        height={800}
                        alt={currentItem.foodName}
                        className="h-[400px] w-full object-cover rounded-2xl"
                      />
                    </div>

                    <div className="w-[48%] flex flex-col py-8">
                      <div>
                        <b className="text-2xl">{currentItem.foodName}</b>
                        <p className="text-green-500 text-lg font-bold py-4">
                          {currentItem.price} ₮
                        </p>
                      </div>
                      <div>
                        <b className="text-lg">Орц</b>
                        <p className="p-2 bg-gray-50 rounded-lg my-2">
                          Хулуу, төмс, лууван, сонгино, цөцгийн тос, самрын үр
                        </p>
                      </div>
                      <div className="flex flex-col gap-4">
                        <b className="text-lg">Тоо</b>
                        <div>
                          <div className="flex justify-between">
                            <button
                              className="h-10 px-4 text-xl rounded-lg bg-green-500 text-white"
                              onClick={handleDecrease}
                            >
                              -
                            </button>
                            <div className="flex items-center">{quantity}</div>
                            <button
                              className="h-10 px-4 text-xl rounded-lg bg-green-500 text-white"
                              onClick={handleIncrease}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        className="mt-8 h-12 rounded-sm px-20 bg-green-500 flex justify-center text-white items-center"
                        onClick={async () => {
                          if (!userMe?.id) {
                            alert("Захиалга нэмэхийн тулд та нэвтэрч орно уу.");
                            return;
                          }

                          if (!currentItem) {
                            alert("Тухайн бүтээгдэхүүн олдсонгүй.");
                            return;
                          }

                          const cartItem: CartItem = {
                            id: Number(currentItem._id),
                            title: currentItem.foodName,
                            price: currentItem.price,
                            src: currentItem.images[0],
                            quantity: quantity,
                            orts: String(currentItem.orts),
                          };

                          try {
                            addItem(cartItem);
                            const result = await createSags({
                              foodId: currentItem._id,
                              userId: userMe.id,
                              price: currentItem.price || 0,
                              count: quantity.toString(),
                            });

                            if (result) {
                              alert("Захиалга амжилттай нэмэгдлээ!");
                            }
                          } catch (error) {
                            console.error("Error:", error);
                            alert(
                              "Захиалга нэмэхэд алдаа гарлаа. Дахин оролдож үзнэ үү."
                            );
                          } finally {
                            setDialogOpen(false);
                            setQuantity(1);
                          }
                        }}
                      >
                        Сагсанд нэмэх & Сагслах
                      </button>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <FoodMainLast />
        <FoodDrinkLast />
      </div>
    </>
  );
};
