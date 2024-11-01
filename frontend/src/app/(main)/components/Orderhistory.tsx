"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/lib/axios";
import { useAuthContext } from "@/components/utils/authProvider";

type Food = {
  food: { foodName: string; price: string; images: string[] }[];
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
  foodImages: string[];
};

export const Orderhistory = () => {
  const { userMe } = useAuthContext();
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
          return total + (isNaN(foodPrice) ? 0 : foodPrice * (quantity || 0));
        }, 0);

        const foodNames = order.foods
          .map((food) => food.food[0]?.foodName)
          .join(", ");
        const foodImages = order.foods.flatMap((food) =>
          food.food.map((item) => item.images[0])
        );

        return {
          _id: order._id,
          orderNumber: order.orderNumber,
          userId: order.userId._id,
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex gap-60 pt-[120px]">
      <div className="px-8">
        <div className="border-2 rounded-lg p-4 flex flex-col w-[432px] shadow-lg h-[720px]">
          <p>Захиалгын түүх</p>
          {orders
            .filter((item) => item.userId === userMe?.id)
            .map((order) => (
              <div
                key={order._id}
                className="flex items-center gap-8 py-8 border-b-2 border-blue-700"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center border-2">
                  <div className="w-5 h-5 rounded-full bg-blue-700"></div>
                </div>
                <div className="flex justify-between gap-8">
                  <div className="flex flex-col">
                    <p className="text-gray-500">
                      Захиалга #{order.orderNumber}
                    </p>
                    <p className="text-blue-400">Хүлээгдэж буй</p>
                  </div>
                  <button>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="px-8">
        <div className="border-2 rounded-lg p-4 flex flex-col shadow-lg h-[720px] w-[432px]">
          <p>Захиалгын дэлгэрэнгүй</p>
          {orders.filter((item) => item.userId === userMe?.id).length > 0 && (
            <div className="py-8 border-b-2 border-gray-200">
              {orders
                .filter((item) => item.userId === userMe?.id)
                .map((order) => (
                  <div key={order._id} className="py-4 flex gap-4">
                    <div className="flex gap-4 mt-2">
                      {order.foodImages.map((image, index) => (
                        <Image
                          key={index}
                          src={image}
                          alt={`Food Image ${index + 1}`}
                          width={50}
                          height={50}
                          className="rounded"
                        />
                      ))}
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">{order.foodNames}</p>
                      <button>({order.foodImages.length})</button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
