"use client";

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
import { Header } from "../(main)/components/Header";
import Link from "next/link";

type Category = {
  _id: string;
  categoryName: string;
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Set default to "all" for "All Categories"
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
  const editCategory = async ({
    _id,
    newCategoryName,
  }: {
    _id: string;
    newCategoryName: string | undefined;
  }) => {
    try {
      await api.put("/category", {
        _id,
        newCategoryName,
      });
      setNewCategoryName("");
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async ({ _id }: { _id: string }) => {
    try {
      await api.delete("/category", {
        data: { _id }, // pass _id in the request body
      });
      setNewCategoryName("");
      getCategories();
    } catch (error) {
      console.log("Error deleting category:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex flex-col pt-[80px]">
      <Header />
      <div className="flex gap-8 w-[1440px] m-auto  ">
        <div className="flex-1 flex flex-col gap-10 pl-[120px] py-6">
          <div className="font-bold text-[22px]">Food menu</div>
          <div className="flex flex-col gap-6">
            <div
              onClick={() => handleCategorySelect("")}
              className={`flex items-center w-[258px] justify-between px-4 py-1 rounded-[8px] border text-xl font-medium cursor-pointer ${
                selectedCategory === "" ? "bg-[#86c41d] text-white" : ""
              }`}

            >
              <div>All Categories</div>
            </div>

            {categories.map((category) => (
              <div
                key={category._id}
                onClick={() => handleCategorySelect(category._id)}
                className={`flex items-center w-[258px] justify-between px-4 py-1 rounded-[8px] border text-xl font-medium cursor-pointer ${
                  selectedCategory === category._id
                    ? "bg-[#86c41d] text-white"
                    : ""
                }`}

              >
                <div>{category.categoryName}</div>
                <Dialog>
                  <DialogTrigger>
                    <div className="hover:scale-125 duration-1000">
                      <FaEllipsisV />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Category нэр өөрчлөх</DialogTitle>
                      <DialogDescription className="flex flex-col gap-2 items-center">
                        <input
                          className="border bg-slate-200 w-full p-4 rounded-lg"
                          placeholder={category.categoryName}
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                        ></input>
                        <div className="flex justify-between w-full">
                          <DialogClose>
                            <button
                              className="rounded-lg bg-[#86c41d] px-4 py-2 text-red-600 font-semibold"
                              onClick={() =>
                                deleteCategory({
                                  _id: category._id,
                                })
                              }
                            >
                              Category устгах
                            </button>
                          </DialogClose>

                          <DialogClose>
                            <button
                              className="rounded-lg bg-[#86c41d] px-4 py-2 text-white font-semibold"
                              onClick={() =>
                                editCategory({
                                  _id: category._id,
                                  newCategoryName: newCategoryName,
                                })
                              }
                            >
                              Өөрчлөх
                            </button>
                          </DialogClose>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
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
                  <DialogTitle className="flex justify-center font-bold">
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
                        onClick={() => setNewCategoryName("")}
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
            <Link href="/dashboard/order">Захиалгууд харах</Link>
          </div>
        </div>
        <RightSideFood selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}
