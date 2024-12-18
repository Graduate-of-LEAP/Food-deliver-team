"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Sparkle } from "lucide-react";
import { useCart } from "./context/Cartcontext";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { FoodDiscountCard } from "./FoodDiscountCart";
import { useAuthContext } from "@/components/utils/authProvider";

export type DiscountCalculatorType = {
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  discountPrice: number;
};

type CategoryType = {
  _id: string;
  categoryName: string;
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

type CartItem = {
  id: number;
  title: string;
  price: number;
  src: string;
  quantity: number;
  orts: string;
};

interface CreateSagsType {
  userId: string;
  price: number;
  foodId: string;
  count: string;
}

// Define the response type for createSags
interface SagsResponseType {
  success: boolean;
  message?: string;
  // Add any other fields returned by the API if needed
}

export const FoodDiscount = () => {
  const { userMe } = useAuthContext();
  const [percent, setPercent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [foods, setFoods] = useState<foodCardType[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<foodCardType | null>(null);
  const [quantity, setQuantity] = useState(1);

  const getFoods = async () => {
    try {
      const response = await api.get("/food");
      const foodsWithId: foodCardType[] = response.data.foods.map(
        (food: foodCardType) => ({
          ...food,
          _id: food._id,
        })
      );
      setFoods(foodsWithId);
    } catch (error) {
      console.log("Failed to fetch foods:", error);
    }
  };

  const createSags = async (
    addSags: CreateSagsType
  ): Promise<SagsResponseType> => {
    const token = localStorage.getItem("token");
    console.log("Creating sags with token:", token, "data:", addSags);

    try {
      const response = await api.post<SagsResponseType>("/sags", addSags, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API response:", response.data);
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

  const filteredSaledPercentFoods = foods.filter(
    (item) => item.salePercent > 0
  );

  const { addItem } = useCart();

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleNext = () => {
    setPercent((prev) => (prev + 1) % filteredSaledPercentFoods.length);
    setIsTransitioning(true);
  };

  const handlePrevious = () => {
    setPercent((prev) =>
      prev === 0 ? filteredSaledPercentFoods.length - 1 : prev - 1
    );
    setIsTransitioning(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => (prev + 1) % filteredSaledPercentFoods.length);
      setIsTransitioning(true);
    }, 3000);

    return () => clearInterval(interval);
  }, [filteredSaledPercentFoods.length]);

  const openDialog = (item: foodCardType) => {
    setCurrentItem(item);
    setDialogOpen(true);
  };

  return (
    <div className="flex flex-col max-w-7xl border ">
      <div className="flex justify-between mt-6 px-20">
        <div className="flex font-bold">
          <Sparkle className="text-green-400" />
          <Image
            src="/images/Star.png"
            alt="Description"
            width={20}
            height={20}
          />
          Хямдралтай
        </div>
      </div>
      <div className="flex justify-center">
        <Carousel className="w-full">
          <CarouselContent
            style={{
              transform: `translateX(-${
                percent * ((100 / filteredSaledPercentFoods.length) * 2.9)
              }%)`,
            }}
            className={`w-full flex h-fit gap-10 ${
              isTransitioning ? "transition-transform duration-1000" : ""
            }`}
          >
            {filteredSaledPercentFoods.map((item) => {
              const discountAmount = item.price * (item.salePercent / 100);
              const discountedPrice = item.price - discountAmount;
              return (
                <CarouselItem
                  key={item._id}
                  className="pl-1 md:basis-1/2 relative lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                          <DialogTrigger asChild>
                            <div
                              className="cursor-pointer m-auto"
                              onClick={() => openDialog(item)}
                            >
                              <FoodDiscountCard
                                src={item.images[0]}
                                title={item.foodName}
                                price={item.price}
                                discountPercentage={item.salePercent}
                                discountAmount={discountAmount}
                                discountedPrice={discountedPrice}
                              />
                            </div>
                          </DialogTrigger>
                        </Dialog>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious onClick={handlePrevious} />
          <CarouselNext onClick={handleNext} />
        </Carousel>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[800px] flex gap-8">
          {currentItem && (
            <>
              <div className="w-[48%] ">
                <Image
                  src={currentItem.images[0]}
                  width={200}
                  height={200}
                  alt="Picture of the food"
                  className="w-96 h-96 object-cover rounded-2xl"
                />
              </div>
              <div className="w-[48%] flex flex-col">
                <div>
                  <b className="text-2xl">{currentItem.foodName}</b>
                  <p className="text-base font-serif text-[#e13bc8] line-through">
                    {currentItem.price}₮
                  </p>
                  <p className="text-green-500 text-lg font-bold">
                    {currentItem.price -
                      currentItem.price * (currentItem.salePercent / 100)}
                    ₮
                  </p>
                </div>
                <div>
                  <b className="text-lg">Орц</b>
                  <p className="p-2 bg-gray-50 rounded-lg my-2">
                    {currentItem.orts}
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
                      price: currentItem.discountedPrice,
                      src: currentItem.images[0],
                      quantity: quantity,
                      orts: currentItem.orts,
                    };

                    addItem(cartItem);

                    await createSags({
                      userId: userMe.id,
                      price: currentItem.price,
                      foodId: currentItem._id,
                      count: String(quantity),
                    });

                    alert("Таны сагсанд нэмэгдлээ.");
                  }}
                >
                  Сагсанд нэмэх
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
