"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import { foodCardType } from "./FoodDiscount";
import { FoodDiscountCard } from "./FoodDiscountCart";
import { api } from "@/lib/axios";
import { useCart } from "./context/Cartcontext";
export const FoodDiscountDialog = () => {
    const [foods, setFoods] = useState<foodCardType[]>([]);
    const [percent, setPercent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);


    const getFoods = async () => {
        try {
            const response = await api.get("/food");
            setFoods(response.data.foods);
        } catch (error) {
            console.log("Failed to fetch foods:", error);
        }
    };

    useEffect(() => {
        getFoods();
    }, []);


   
    const filteredSaledPercentFoods = foods.filter(
        (item) => item.salePercent > 0
    );

    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);

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

    return (
        <>
            <div className="flex justify-center bg-pink-700">

                {filteredSaledPercentFoods.map((item, index) => {
                    const discountAmount = item.price * (item.salePercent / 100);
                    const discountedPrice = item.price - discountAmount;
                    return (

                        <div className="p-1">

                            <Dialog key={index}>
                                <DialogTrigger asChild>
                                    <div className="cursor-pointer m-auto">
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
                                <DialogContent className="sm:max-w-[800px] flex gap-8">
                                    <div className="w-[48%]">
                                        <Image
                                            src={item.images[0]}
                                            width={800}
                                            height={800}
                                            alt="Picture of the food"
                                            className="h-full w-full object-cover rounded-2xl"
                                        />
                                    </div>
                                    <div className="w-[48%] flex flex-col py-8">
                                        <div>
                                            <b className="text-2xl">{item.foodName}</b>
                                            <p className="text-base font-serif text-[#e13bc8] line-through">
                                                {item.price}₮
                                            </p>
                                            <p className="text-green-500 text-lg font-bold">
                                                {discountedPrice}₮
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
                                                    <div className="flex items-center">
                                                        {quantity}
                                                    </div>
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
                                            onClick={() => {
                                                addItem({
                                                    id: index,
                                                    title: item.foodName,
                                                    price: discountedPrice,
                                                    src: item.images[0],
                                                    quantity,
                                                });
                                            }}
                                        >
                                            Сагслах
                                        </button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    );
                })}
            </div>

        </>
    )
}