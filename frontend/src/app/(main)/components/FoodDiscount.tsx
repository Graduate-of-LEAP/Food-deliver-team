"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useState, useEffect } from 'react';

import { Sparkle } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useCart } from "./context/Cartcontext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from "@/lib/axios";

const slidesFood = [
  {
    title: "Өглөөний хоол",
    src: "/images/main2.png",
    price: 14800,
  },
  {
    title: "Зайрмаг",
    src: "/images/main3.png",
    price: 4800,
  },
  {
    title: "Өглөөний хоол",
    src: "/images/main4.png",
    price: 24800,
  },
  {
    title: "Breakfast",
    src: "/images/main5.png",
    price: 24800,
  },
];
type Category = {
  _id: string;
  categoryName: string;
};

export const FoodDiscount = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  // 
  const { addItem } = useCart();
  const discountPercentage = 20;
  const [quantity, setQuantity] = useState(1);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleAddToCart = (item: typeof slidesFood[number], index: number) => {
    const discountAmount = item.price * (discountPercentage / 100);
    const discountedPrice = item.price - discountAmount;

    addItem({
      id: index,
      title: item.title,
      price: discountedPrice,
      src: item.src,
      quantity,
    });

    toast.success(`${item.title} added to cart!`); // Show toast notification
    setOpenIndex(null); // Close the dialog
  };
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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className=" ">
        {/* categories.map */}
      <div className="">
                {categories.map((category) => (
              <div
                key={category._id}
                className=""
                >
                 
                {/* <button className="border border-b px-2 rounded-lg">{category.categoryName}</button> */}
                
              </div>
            ))}

                  
      </div>
      {/*  */}


          {/*  */}
        <div className="flex justify-between mt-6 px-20">
          <div className="flex font-bold ">
            <Sparkle className="text-green-400" />
            <Image src="/images/Star.png" alt="Description" width={20} height={20} />
            Хямдралтай
          </div>
          <div className="flex text-[#18BA51] font-normal">
            Бүгдийг харах <ChevronRight />
          </div>
        </div>
          {/*  */}
        {/*  */}
        <div className="flex w-full justify-around gap-5 my-10">
          {slidesFood.map((item, index) => {
            return (
              
              <Dialog key={index} open={openIndex === index} onOpenChange={(open) => setOpenIndex(open ? index : null)}>
                <DialogTrigger asChild>
                  <div className="cursor-pointer m-auto">
                    <FoodDiscountCard
                      src={item.src}
                      title={item.title}
                      price={item.price}
                      discountPercentage={discountPercentage}
                      discountAmount={item.price * (discountPercentage / 100)}
                      discountedPrice={item.price - (item.price * (discountPercentage / 100))}
                      categoryNameItem={categories.length > 0 ? categories[index % categories.length].categoryName : "Нэргүй"} // Дараах мөрөнд категориын нэрийг дамжуулж байна
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] flex gap-8">
                  <div className="w-[48%]">
                    <Image
                      src={item.src}
                      width={800}
                      height={800}
                      alt="Picture of the pizza"
                      className="h-full w-full object-cover rounded-2xl"
                    />
                  </div>
                  <div className="w-[48%] flex flex-col py-8">
                    <div>
                      <b className="text-2xl">{item.title}</b>
                      <div className="flex gap-5">
                        <p className="text-base font-serif text-[#18BA51]">
                          {item.price * (discountPercentage / 100)}₮
                        </p>
                        <p className="text-base font-serif text-[#e13bc8] line-through">
                          {item.price - (item.price * (discountPercentage / 100))}₮
                        </p>
                      </div>
                    </div>
                    <div>
                      <b className="text-lg">Орц</b>
                      <p className="p-2 bg-gray-50 rounded-lg my-2">
                        Хулуу, төмс, лууван, сонгино, цөцгийн тос, самрын үр
                      </p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <b className="text-lg">Тоо</b>
                      <div>
                        <div className="flex justify-between">
                          <button className="h-10 px-4 text-xl rounded-lg bg-green-500 text-white" onClick={handleDecrease}>
                            -
                          </button>
                          <div className="flex items-center">{quantity}</div>
                          <button className="h-10 px-4 text-xl rounded-lg bg-green-500 text-white" onClick={handleIncrease}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      className="mt-8 h-12 rounded-sm px-20 bg-green-500 flex justify-center text-white items-center"
                      onClick={() => handleAddToCart(item, index)}
                    >
                      Сагслах
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
        {/*  */}
      </div>
    </>
  );
};

type foodCardType = {
  src: string;
  title: string;
  price: number;
  discountPercentage: number;
  discountAmount: number;
  discountedPrice: number;
  categoryNameItem?:string;
};

export const FoodDiscountCard = ({
  src,
  title,
  price,
  discountPercentage,
  discountedPrice,
  categoryNameItem, // Пропс хүлээн авах
}: foodCardType) => {
  return (
    <div className="">
      <div className="relative">
        <div className={`relative w-[350px] h-[250px]`}>
          <Image src={src} alt="Picture" fill className={`object-cover rounded-2xl`} />
        </div>
        <div className="absolute top-5 right-10">
          <button className="bg-[#18BA51] rounded-lg px-2 text-white font-semibold text-[12px]">
            {discountPercentage}%
          </button>
        </div>
      </div>
      <p className="text-base font-bold text-black">{title}</p>
      <p className="text-sm text-gray-600">{categoryNameItem}</p> {/* Категорын нэрийг харуулах */}
      <div className="flex gap-5">
        <p className="text-base font-serif text-[#18BA51]">
          {discountedPrice}₮
        </p>
        <p className="text-base font-serif text-[#e13bc8] line-through">
          {price}₮
        </p>
      </div>
    </div>
  );
};
