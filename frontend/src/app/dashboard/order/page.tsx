"use client";
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
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/app/(main)/components/Header";

type Food = {
  food: { foodName: string; price: string; images: string[] }[]; // Updated to include images
  count: number;
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
  phoneNumber: string;
  district: string;
  khoroo: string;
  apartment: string;
  orderDetail: string;
  createdAt: string;
  foods: Food[];
};

type MappedOrder = {
  _id: string;
  orderNumber: number;
  userId: string;
  userName: string;
  totalPrice: number;
  createdAt: number;
  district: string;
  khoroo: string;
  apartment: string;
  foodNames: string;
  foodImages: string[]; // New field for food images
};

export default function Home() {
  const [orders, setOrders] = useState<MappedOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<{ orders: Order[] }>("/order");
      const ordersWithId: MappedOrder[] = response.data.orders.map((order) => {
        const totalPrice = order.foods.reduce((total, food) => {
          const foodItem = food.food[0];
          const foodPrice = parseFloat(foodItem.price);
          const quantity = food.count;

          const validFoodPrice = isNaN(foodPrice) ? 0 : foodPrice;
          return total + validFoodPrice * (quantity || 0);
        }, 0);

        const foodNames = order.foods
          .map((food) => food.food[0]?.foodName)
          .join(", ");
        const foodImages = order.foods.flatMap((food) =>
          food.food.map((item) => item.images[0])
        ); // Collect images

        return {
          _id: order._id,
          orderNumber: order.orderNumber,
          userId: order.userId._id.slice(15),
          userName: order.userName || "Unnamed",
          totalPrice: totalPrice,
          createdAt: new Date(order.createdAt).getTime(),
          district: order.district,
          khoroo: order.khoroo,
          apartment: order.apartment,
          foodNames: foodNames,
          foodImages: foodImages,
        };
      });
      setOrders(ordersWithId);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="flex flex-col bg-gray-100 h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="w-[1440px] m-auto rounded-xl border-2 h-[800px] my-16 bg-white">
        <div className="flex items-center w-full h-28 justify-between px-8 bg-white rounded-xl">
          <b className="text-2xl">Admin Dashboard</b>
          <div className="relative flex items-center w-full max-w-md ml-48">
            <IoIosSearch size={20} className="absolute left-3" />
            <input
              type="text"
              placeholder="Search"
              className="pl-12 py-2 w-96 rounded-md bg-gray-100 focus:outline-none focus:ring-2 border-gray-400 border-2"
            />
          </div>
        </div>
        {loading && <div className="text-center py-4">Loading...</div>}
        {error && <div className="text-red-500 text-center py-4">{error}</div>}
        <div className="flex h-16 font-bold bg-gray-100 ">
          <div className="flex items-center border-b-2 w-[15%] justify-center">
            Order Name
          </div>
          <div className="flex items-center border-b-2 w-[20%] justify-center">
            Buyer Info
          </div>
          <div className="flex items-center border-b-2 justify-center w-[15%]">
            Payment
          </div>
          <div className="flex items-center border-b-2 justify-center w-[10%]"></div>
          <div className="flex items-center border-b-2 justify-center w-[20%]">
            Address
          </div>
          <div className="flex items-center border-b-2 justify-center w-[15%]">
            Delivery State
          </div>
          <div className="flex items-center border-b-2 justify-center w-[5%]}"></div>
        </div>
        <div className="flex flex-col border-b-2">
          {orders.map((order) => (
            <div key={order._id} className="flex items-center bg-white">
              <div className="flex pl-2 w-[15%] items-center">
                <div className="flex-1 flex items-center gap-4">
                  <Image
                    src={order.foodImages[0]} // Display the first food image
                    width={120}
                    height={200}
                    alt={order.foodNames}
                    className="h-20 object-cover rounded-xl"
                  />
                </div>
                <div className="flex-1 pl-2">
                  <p>#{order.orderNumber} </p>
                  <p>{order.foodNames}</p>
                </div>
              </div>
              <div className="flex w-[20%] flex-col items-center">
                <p className="font-bold">{order.userId}</p>
                <p>{order.userName}</p>
              </div>
              <div className="flex items-center w-[15%] flex-col">
                <p className="font-bold">₮{order.totalPrice.toFixed(2)} </p>
                <p>
                  {new Date(order.createdAt).toLocaleDateString()}{" "}
                  {new Date(order.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex items-center w-[10%] pl-8">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="isPaid" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Not">Not Paid</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center w-[20%] justify-center">
                {order.district}, {order.khoroo}, {order.apartment}
              </div>
              <div className="flex items-center w-[15%]">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
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
                </Select>
              </div>
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
