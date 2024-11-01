"use client";
import { SheetContent, Sheet, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { MdOutlineCancel } from "react-icons/md";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";

// // Define cart item, user, and sag types
// type CartItem = {
//   id: number;
//   title: string;
//   price: number;
//   src: string;
//   quantity: number;
//   orts: string;
// };

type UserMeResponse = {
  id: string;
};

type SagsCardType = {
  _id: string;
  userId: string;
  foodId: FoodType;
  price: number;
  count: number;
};

type FoodType = {
  orts: string;
  images: string[];
  salePercent: number;
  foodName: string;
  _id: string;
};

export const CartContent: React.FC = () => {
  const [userMe, setUserMe] = useState<UserMeResponse | null>(null);
  const [sags, setSags] = useState<SagsCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getMe = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserMe(response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
      setError("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  const getSags = async () => {
    const token = localStorage.getItem("token");
    if (!userMe) return;

    setLoading(true);
    try {
      const response = await api.get("/sags", {
        params: { userId: userMe.id },
        headers: { Authorization: `Bearer ${token}` },
      });
      setSags(response.data.sags);
    } catch (error) {
      console.error("Failed to fetch sags:", error);
      setError("Failed to fetch cart items.");
    } finally {
      setLoading(false);
    }
  };

  const deleteSags = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.delete("/sags", {
        data: { _id: id },
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setSags((prev) => prev.filter((sag) => sag._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete sag:", error);
      setError("Failed to delete item.");
    }
  };

  const totalPrice = sags.reduce(
    (total, sag) => total + sag.price * sag.count,
    0
  );

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
        <Button variant="outline" onClick={() => getSags()}>
          Сагс
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col justify-between z-[101]">
        <div className="flex font-bold items-center text-3xl gap-48 pb-4">
          <p>Таны сагс</p>
        </div>
        <div className="h-[90%] overflow-y-scroll">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : sags.length > 0 ? (
            <div className="mt-6">
              {sags.map((sag) => (
                <div
                  key={sag._id}
                  className="flex border-t-2 border-b-2 py-2 justify-start items-start gap-4"
                >
                  <div className="w-full h-[250px] p-2 relative flex-1 mt-2 gap-2">
                    <Image
                      src={sag.foodId.images[0]}
                      fill
                      alt={sag.foodId.foodName}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-1/2 flex flex-col gap-2 justify-between p-2">
                    <div>
                      <div className="text-2xl flex items-center justify-between">
                        <b>{sag.foodId.foodName}</b>
                        <button onClick={() => deleteSags(sag._id)}>
                          <MdOutlineCancel />
                        </button>
                      </div>
                      <b className="text-green-500 text-lg font-bold">
                        {sag.price} ₮
                      </b>
                    </div>
                    <div>
                      <b className="text-lg">Орц</b>
                      <p className="p-2 bg-gray-50 rounded-lg my-2">
                        {sag.foodId.orts}
                      </p>
                    </div>
                    <div>
                      <b className="text-lg">Тоо</b>
                      <p className="p-2 my-2">{sag.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Таны сагс хоосон байна.</p>
          )}
        </div>
        <div className="flex justify-between border-t-2 py-8">
          <div className="flex flex-col">
            <p>Нийт төлөх дүн</p>
            <b>{totalPrice} ₮</b>
          </div>
          <Link
            href="/order"
            className="w-1/2 rounded-sm text-white bg-green-500 flex items-center justify-center"
          >
            Захиалах
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};
