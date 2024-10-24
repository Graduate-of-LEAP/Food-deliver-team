"use client"
import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FoodDiscount } from '../components/FoodDiscount';
import { FoodMain } from '../components/FoodMain';
import { FoodSweet } from '../components/FoodSweet';
import { api } from "@/lib/axios";
import { FaEllipsisV } from 'react-icons/fa';
import { foodCardType } from '@/app/(main)/components/FoodDiscount';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FoodDiscountCard } from "../../(main)/components/FoodDiscountCart";
import Image from "next/image";
import { useCart } from '../components/context/Cartcontext';

export type Category = {
  _id: string;
  categoryName: string;

};



const Page = () => {



  const [selectedCategory, setSelectedCategory] = useState<string[] | string>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [foods, setFoods] = useState<foodCardType[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [percent, setPercent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [filteredAllFoods, setFilteredAllFoods] = useState<foodCardType[]>([]);



  const handleCategorySelect = (_id: string) => {
    setSelectedCategory((prev) => {

      if (Array.isArray(prev) && prev.includes(_id)) {
        return prev.filter(id => id !== _id);
      } else {
        return [_id];
      }
    });
  };


 

  const getCategories = async () => {
    try {
      const response = await api.get("/category");
      setCategories(response.data.categories);
    } catch (error) {
      console.log("Failed to fetch categories:", error);
    }
  };
  const getFoods = async () => {
    try {
      const response = await api.get("/food");
      setFoods(response.data.foods);
      console.log(response.data.foods);

    } catch (error) {
      console.log("Failed to fetch foods:", error);
    }
  };



  const filteredSaledPercentFoods = foods.filter(
    (item) => item.salePercent > 0
  );

  const { addItem } = useCart();


  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleNext = () => {
    setPercent((prev) => (prev + 1) % filteredSaledPercentFoods.length);
    setIsTransitioning(true);
  };

  const handlePrevious = () => {
    setPercent((prev) =>
      prev === 0 ? filteredSaledPercentFoods.length - 1 : prev - 1
    );
    setIsTransitioning(true);
  };




  useEffect(() => {
    getFoods();
    getCategories();
  }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      const response = await api.get("/food");
      setFoods(response.data.foods);
      setFilteredAllFoods(response.data.foods);
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    const filteredFoods = foods.filter((food) =>
      food.category.some(cat => selectedCategory.includes(cat._id))
    );
    setFilteredAllFoods(selectedCategory.length ? filteredFoods : foods);
  }, [selectedCategory, foods]);


  return (<>
    <Header />
    <div className="flex justify-center">
      <div className="container">
        <div className="w-full gap-7 flex h-fit justify-center items-center">
          {categories.map((category) => (
            <div
              key={category._id}
              onClick={() => handleCategorySelect(category._id)}
              className={`border py-2 w-full   justify-center flex items-center rounded-[8px] w-fulll  border-[#D6D8DB] font-medium text-[18px] ${selectedCategory === category._id
                  ? "bg-[#18BA51] text-white"
                  : ""
                }`}
            >
              <div>{category.categoryName}</div>
              <div>

              </div>
            </div>
          ))}



        </div>
        <div className="bg-pink-200">
          <div className="w-full  bg-red-400">
            <div className="grid w-full   bg-slate-100  grid-cols-4 grid-rows-4 gap-5 my-10">
              {filteredAllFoods?.map((item: foodCardType, index: number) => {
                return (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer" onClick={() => { }}>
                        <FoodDiscountCard
                          src={item.images[0]}
                          title={item.foodName}
                          price={item.price}

                        />

                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px] flex gap-8">
                      <div className="w-[48%]">
                        <Image
                          src={item.images[0]}
                          width={800}
                          height={800}
                          alt="Picture of the pizza"
                          className="h-full w-full object-cover rounded-2xl"
                        />
                      </div>

                      <div className="w-[48%] flex flex-col py-8">
                        <div>
                          <b className="text-2xl">{item.foodName}</b>
                          <p className="text-green-500 text-lg font-bold py-4">
                            {item.price} ₮
                          </p>
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
                        <button
                          className="mt-8 h-12 rounded-sm px-20 bg-green-500 flex justify-center text-white items-center"
                          onClick={() => {
                            addItem({
                              id: index,
                              title: item.foodName,
                              price: item.price,
                              src: item.images[0],
                              quantity,
                            });
                          }}
                        >
                          Сагслах
                        </button>
                      </div>
                    </DialogContent>
                  </Dialog>
                );
              })}
            </div>
          </div>


        </div>
      </div>
    </div>
    <Footer />
  </>
  );
};
export default Page;
