"use client";

import { HeaderDashboard } from "./components/HeaderDashboard";
import { RightSideFood } from "./components/RightSideFoodCreate";
import { FaEllipsisV } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/lib/axios";
type Category = {
  _id: string;
  categoryName: string;
};
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");

  const handleCategorySelect = (_id: string) => {
    setSelectedCategory(_id);
  };

  const getCategories = async () => {
    try {
      const response = await api.get("/category");
      setCategories(response.data.categories);
    } catch (error) {
      console.log("Failed to fetch categories:", error);
    }
  };

  const createCategory = async () => {
    if (newCategoryName) {
      try {
        await api.post("/category", { categoryName: newCategoryName });
        setNewCategoryName("");
        getCategories();
      } catch (error) {
        console.error("Error creating category:", error);
      }
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="flex flex-col ">
      <HeaderDashboard />
      <div className="flex gap-8 w-[1440px] m-auto">
        <div className="flex-1 flex flex-col gap-10 pl-[120px] py-6">
          <div className="font-bold text-[22px]">Food menu</div>
          <div className="flex flex-col gap-6">
            {categories.map((category) => (
              
              <div
                key={category._id}
                onClick={() => handleCategorySelect(category._id)}
                className={`flex items-center w-[258px] justify-between px-4 py-1 rounded-[8px] border text-xl font-medium cursor-pointer ${
                  selectedCategory === category._id
                    ? "bg-[#18BA51] text-white"
                    : ""
                }`}
              >
                <div>{category.categoryName}</div>
                <div>
                  <FaEllipsisV />
                </div>
              </div>
            ))}

            <Dialog>
              <DialogTrigger>
                <div className="flex items-center w-[258px] gap-3 px-4 py-1 rounded-[8px] border text-[#5E6166] font-medium cursor-pointer">
                  <div>+</div>
                  <div>Create new category</div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex justify-center font-bold ">
                    Create new category
                  </DialogTitle>
                  <DialogDescription className="rounded-lg">
                    <div className="flex flex-col gap-2">
                      <div className="font-medium text-[14px] text-black">
                        Category name
                      </div>
                      <input
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Enter category name"
                        className="py-4 px-3 w-full bg-[#F4F4F4] rounded-lg"
                      />
                    </div>
                    <div className="flex gap-4 justify-end pt-6 px-4 items-center">
                      <div
                        className="text-[#3F4145] font-bold cursor-pointer"
                        onClick={() => setNewCategoryName("")} // Clear input on click
                      >
                        Clear
                      </div>
                      <DialogClose>
                        <div
                          className="bg-[#393939] rounded-lg text-white px-5 py-2 font-medium cursor-pointer"
                          onClick={createCategory}
                        >
                          Continue
                        </div>
                      </DialogClose>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="font-medium text-[18px] border text-center rounded-lg py-2 cursor-pointer bg-gray-300">
            Захиалгууд харах
          </div>
        </div>
        <RightSideFood selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}
