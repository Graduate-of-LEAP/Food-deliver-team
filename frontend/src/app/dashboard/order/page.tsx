"use client";
import { HeaderDashboard } from "../components/HeaderDashboard";
import { IoIosSearch } from "react-icons/io";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useAuthContext } from "@/components/utils/authProvider";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import Image from "next/image";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Food = {
    foodname: string;
    price: string; // Assuming price comes as a string
    quantity: number;
};

type User = {
    _id: string;
    userName: string;
};

type Order = {
    _id: string;
    orderNumber: number;
    userId: User;
    userName: string;
    district: string;
    khoroo: string;
    apartment: string;
    createdAt: string; // Original format
    foods: Food[];
};

type MappedOrder = {
    _id: string;
    orderNumber: number;
    userId: string;
    userName: string;
    totalPrice: number; // Calculated total price
    createdAt: number; // Timestamp
    district: string;
    khoroo: string;
    apartment: string;
    isRedlined: boolean; // Redline flag
    foodNames: string; // New field for concatenated food names
};


export default function Home() {
    const { userMe } = useAuthContext();
    const [orders, setOrders] = useState<MappedOrder[]>([]);

    const getOrders = async () => {
        try {
            const response = await api.get<{ orders: Order[] }>("/order"); // Specify response type
            const ordersWithId: MappedOrder[] = response.data.orders.map((order) => {
                const totalPrice = order.foods.reduce((total, food) => {
                    return total + parseFloat(food.price) * food.quantity;
                }, 0);

                const redlineThreshold = 100; // Adjust as needed

                // Get food names and concatenate them into a string
                const foodNames = order.foods.map(food => food.foodname).join(", ");

                return {
                    _id: order._id,
                    orderNumber: order.orderNumber,
                    userId: order.userId._id.slice(15),
                    userName: order.userName,
                    totalPrice: totalPrice,
                    createdAt: new Date(order.createdAt).getTime(),
                    district: order.district,
                    khoroo: order.khoroo,
                    apartment: order.apartment,
                    isRedlined: totalPrice > redlineThreshold,
                    foodNames: foodNames, // Add foodNames to the mapped order
                };
            });
            setOrders(ordersWithId);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };


    useEffect(() => {
        getOrders();
    }, []);

    console.log(orders);

    return (
        <div className="flex flex-col bg-gray-100 h-screen">
            <div className="bg-white">
                <HeaderDashboard />
            </div>
            <div className="w-[1440px] m-auto rounded-xl border-2 h-[800px] my-16 bg-white">
                <div className="flex items-center w-full h-28 justify-between px-8 bg-white rounded-xl">
                    <b className="text-2xl">Admin dashboard</b>
                    <div className="relative flex items-center w-full max-w-md ml-48">
                        <IoIosSearch size={20} className="absolute left-3" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-12 py-2 w-96 rounded-md bg-gray-100 focus:outline-none focus:ring-2 border-gray-400 border-2"
                        />
                    </div>
                </div>
                <div className="flex h-16 font-bold bg-gray-100 ">
                    <div className=" flex items-center border-b-2 w-[15%] justify-center">Order name</div>
                    <div className=" flex items-center border-b-2 w-[20%] justify-center">Buyer info</div>
                    <div className=" flex items-center border-b-2 justify-center w-[15%]">Payment</div>
                    <div className=" flex items-center border-b-2 justify-center w-[10%]"></div>
                    <div className=" flex items-center border-b-2 justify-center w-[20%]">Address</div>
                    <div className=" flex items-center border-b-2 justify-center w-[15%]">Delivery state</div>
                    <div className=" flex items-center border-b-2 justify-center w-[5%]}"></div>
                </div>
                <div className="flex flex-col border-b-2">
                    {orders.map((order) => (
                        <div key={order._id} className="flex items-center bg-white">
                            <div className="flex pl-2 w-[15%] items-center font-bold">

                                <div className="h-24 w-32 flex items-center"><Image
                                    src="/img1.png"
                                    width={120}
                                    height={200}
                                    alt="Picture of the author"
                                />
                                </div>
                                <div ><p>#{order.orderNumber} </p>
                                    <p>{order.foodNames}</p>

                                </div>
                            </div>
                            <div className="flex w-[20%] flex-col items-center">
                                <p className="font-bold">{order.userId}</p>
                                <p>{order.userName}</p>
                            </div>
                            <div className="flex items-center w-[15%] flex-col"><p className="font-bold">₮{order.totalPrice.toFixed(2)} </p>
                                <p> {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</p></div>
                            <div className="flex items-center w-[10%] pl-8"><Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="isPaid" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Paid">Paid</SelectItem>
                                        <SelectItem value="Not">Not Paid</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select></div>
                            <div className="flex items-center w-[20%] justify-center">
                                {order.district}, {order.khoroo}, {order.apartment}
                            </div>
                            <div className="flex items-center w-[15%]"><Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="
                                    Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Progress">Progress</SelectItem>
                                        <SelectItem value="Delivered">Delivered</SelectItem>
                                        <SelectItem value="Waiting">Waiting</SelectItem>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select></div>
                            <div className="flex items-center w-[5%]">
                                <button>
                                    <PiDotsThreeOutlineVerticalFill />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center items-end">
                <div className="border-t-2 mt-16 border-gray-200 py-8 w-[58%]">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}
