"use client"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import Image from 'next/image';
import { useState } from 'react';

export const Order = () => {
    const [quantity, setQuantity] = useState(1);

    const handleDecrease = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
    };

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Product</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] flex">
                    <div className="w-1/2">
                        <Image
                            src="/pizza.png"
                            width={500}
                            height={500}
                            alt="Picture of the pizza"
                        />
                    </div>
                    <div className="w-1/2 flex flex-col justify-between py-8">
                        <div>
                            <b className="text-2xl">Main Pizza</b>
                            <p className="text-green-500 text-lg font-bold">34,800 ₮</p>
                        </div>
                        <div>
                            <b className="text-lg">Орц</b>
                            <p className="p-2 bg-gray-50 rounded-lg my-2">
                                Хулуу, төмс, лууван , сонгино, цөцгийн тос, самрын үр
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
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
                        <button className="mt-4 h-12 rounded-sm px-20 bg-green-500 flex justify-center text-white items-center">
                            Сагслах
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
