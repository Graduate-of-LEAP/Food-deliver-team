"use client";
import {
    SheetContent,
    Sheet,
    SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useCart } from "./context/Cartcontext";
import { MdOutlineCancel } from "react-icons/md";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";

type CartItem = {
    id: number;
    title: string;
    price: number;
    src: string;
    quantity: number;
    orts: string;

};

type UserMeResponse = {
    id: string;
};

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

export const CartContent: React.FC = () => {
    const { items, removeItem, updateItemQuantity } = useCart();
    const [userMe, setUserMe] = useState<UserMeResponse>();
    const [sags, setSags] = useState<sagsCardType[]>([]);

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

    const totalPrice = sags.reduce((total, sag) => total + sag.price * sag.count, 0);

    const handleDecrease = (item: CartItem) => {
        if (item.quantity > 1) {
            updateItemQuantity(item.id, item.quantity - 1);
        }
    };

    const handleIncrease = (item: CartItem) => {
        updateItemQuantity(item.id, item.quantity + 1);
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
        } catch (error) {
            console.log("Failed to fetch sags:", error);
        }
    };

    const deleteSags = async (id: string) => {
        const token = localStorage.getItem("token");
        try {
            const response = await api.delete("/sags", {
                data: { _id: id },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setSags((prev) => prev.filter((sag) => sag._id !== id));
            }
        } catch (error) {
            console.log("Failed to delete sag:", error);
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



    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Сагс</Button>
            </SheetTrigger>

            <SheetContent className="flex flex-col justify-between">
                <div className="flex font-bold items-center text-3xl gap-48 pb-4">
                    <p>Таны сагс</p>
                </div>
                <div className="h-[90%] overflow-y-scroll">
                    {sags.length > 0 && (
                        <div className="mt-6">
                            {sags.map((sags) => (
                                <div key={sags._id} className="flex border-t-2 border-b-2 py-2 justify-start items-start gap-4">
                                    <div className="w-full h-[250px] p-2 relative flex-1 mt-2 gap-2">
                                        <Image src={sags.foodId.images[0]} fill alt={sags.foodId.foodName} className="object-cover" />
                                    </div>
                                    <div className="w-1/2 flex flex-col gap-2 justify-between p-2">
                                        <div>
                                            <div className="text-2xl flex items-center justify-between">
                                                <b>{sags.foodId.foodName}</b>
                                                <button onClick={() => deleteSags(sags._id)}>
                                                    <MdOutlineCancel />
                                                </button>
                                            </div>
                                            <b className="text-green-500 text-lg font-bold">{sags.price} ₮</b>
                                        </div>
                                        <div>
                                            <b className="text-lg">Орц</b>
                                            <p className="p-2 bg-gray-50 rounded-lg my-2">
                                                {sags.foodId.orts}
                                            </p>
                                        </div>
                                        <div>
                                            <b className="text-lg">Тоо</b>
                                            <p className="p-2 my-2">{sags.count}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex justify-between border-t-2 py-8">
                    <div className="flex flex-col">
                        <p>Нийт төлөх дүн</p>
                        <b>{totalPrice} ₮</b>
                    </div>
                    <Link href="/order" className="w-1/2 rounded-sm text-white bg-green-500 flex items-center justify-center">
                        Захиалах
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    );
};
