"use client";
import { api } from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PackageOpen } from "lucide-react";

type FoodType = {
  foodName: string;
  price: number;
  orts: string;
  images: string[];
  salePercent: number;
  averageRating: number;
  category: [{ categoryName: string }];
  quantity: number;
  saledCount: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
};

interface SearchCardProps {
  searchTerm: string;
}
export const SearchCard = ({ searchTerm }: SearchCardProps) => {
  const [foods, setFoods] = useState<FoodType[]>([]); // List of products
  const [filteredFoods, setFilteredFoods] = useState<FoodType[]>([]); // Filtered products

  // Fetch all products when the component mounts
  const getFoods = async () => {
    try {
      const response = await api.get("/food");
      setFoods(response.data.foods);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);
  // Filter products based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = foods.filter((item) =>
        item.foodName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFoods(filtered);
    } else {
      setFilteredFoods([]); // Clear results when no search term
    }
  }, [searchTerm, foods]);

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-3 gap-6 p-4 bg-white shadow-md rounded-md">
        {/* Display filtered foods */}
        {filteredFoods.length > 0 ? (
          filteredFoods.map((item, index) => (
            <Link
              key={index}
              href={`/food/${item._id}`}
              className="w-full border-b border-gray-300 hover:bg-gray-100 transition duration-200"
            >
              <div className="flex items-center gap-2 py-1">
                <div className="relative h-[100px] w-[100px] rounded-full overflow-hidden border border-gray-300 shadow-sm">
                  <Image
                    src={item.images[0]}
                    width={800}
                    height={800}
                    alt="Picture of the food"
                    className="h-full w-full object-cover rounded-2xl"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-semibold text-lg text-gray-800">
                    {item.foodName}
                  </div>
                  <div className="text-gray-600 text-sm">{item.price}₮</div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex gap-2">
            <div className="flex text-red-500 items-center justify-center">
              <PackageOpen />
            </div>
            <div className="text-gray-500 text-center py-1">
              Уучлаарай илэрц олдсонгүй...
            </div>
          </div>
        )}
      </div>
    </>
  );
};
