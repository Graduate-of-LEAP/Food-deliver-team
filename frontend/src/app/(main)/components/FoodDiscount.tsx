"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Sparkle } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useCart } from "./context/Cartcontext";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";


export type DiscountCalculatorType = {
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  discountPrice: number;
};
type CategoryType={
  _id:string;
  categoryName:string;
}
type foodCardType = {
  category:CategoryType[];
  images: string[];
  foodName: string;
  price: number;
  salePercent: number;
  discountAmount: number;
  discountedPrice: number;
};
export const FoodDiscount = () => {
  const [percent, setPercent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  

  const [foods, setFoods] = useState<foodCardType[]>([]);
  
  const getFoods = async () => {
    try {
      const response = await api.get("/food");
      setFoods(response.data.foods);
      console.log(response.data.foods);
    } catch (error) {
      console.log("Failed to fetch foods:", error);
    }
  };

  const filteredSaledPercentFoods = foods.filter(item => item.salePercent > 0);
  const filteredVndsenHoolfoods=foods.filter(item=>item.category[0].categoryName==="Breakfast")

  useEffect(() => {
    getFoods();
  }, []);

  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };




  useEffect(() => {
    const interval = setInterval(() => {
      percent === 3 ? setIsTransitioning(false) : setIsTransitioning(true);
      setPercent((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  });
 
  return (
    <>
      <div className="flex flex-col container border ">
        <div className="flex justify-between mt-6 px-20">
          <div className="flex font-bold ">
            <Sparkle className="text-green-400" />
            <Image
              src="/images/Star.png"
              alt="Description"
              width={20}
              height={20}
              className=""
            />
            Хямдралтай
          </div>
        
        </div>

<div 
 className="flex overflow-hidden"
 >


  <div
       style={{ transform: `translateX(-${(percent * 100) / 6}%)` }}
       className={`  w-[800%] flex h-fit gap-10  ${
         isTransitioning ? "duration-1000" : null
     
       
      }`}>



 
  {/* 1 */}
        <div className="bg-pink-300 w-full flex  h-fit  gap-10   my-10"
   
       >
          {filteredSaledPercentFoods?.map((item, index) => {
            const discountAmount = item.price * (item.salePercent / 100);
            const discountedPrice = item.price - discountAmount;
            return (
              <Dialog key={index}>
                
                <DialogTrigger asChild>
                  <div
                    className="cursor-pointer m-auto"
                    onClick={() => { }}
                  >
                    
                    <FoodDiscountCard
                      src={item.images[0]}
                      title={item.foodName}
                      price={item.price}
                      discountPercentage={item.salePercent}
                      discountAmount={discountAmount}
                      discountedPrice={discountedPrice}
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
                      <div className="flex gap-5">
                        <p className="text-base font-serif text-[#18BA51]">
                          {discountAmount}₮
                        </p>
                        <p className="text-base font-serif text-[#e13bc8] line-through">
                          {discountedPrice}₮
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
                          price: discountedPrice,
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
        {/* 2 */}
      <div className="  w-full flex  h-fit  gap-10   my-10 bg-blue-300">
          {filteredSaledPercentFoods?.map((item, index) => {
            const discountAmount = item.price * (item.salePercent / 100);
            const discountedPrice = item.price - discountAmount;
            return (
              <Dialog key={index}>
                
                <DialogTrigger asChild>
                  <div
                    className="cursor-pointer m-auto"
                    onClick={() => { }}
                  >
                    
                    <FoodDiscountCard
                      src={item.images[0]}
                      title={item.foodName}
                      price={item.price}
                      discountPercentage={item.salePercent}
                      discountAmount={discountAmount}
                      discountedPrice={discountedPrice}
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
                      <div className="flex gap-5">
                        <p className="text-base font-serif text-[#18BA51]">
                          {discountAmount}₮
                        </p>
                        <p className="text-base font-serif text-[#e13bc8] line-through">
                          {discountedPrice}₮
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
                          price: discountedPrice,
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
        {/*  */}
        </div>
        {/*  */}
      </div>
      </div>
    </>
  );
};

type FoodDiscountCardProps = {
  src: string;
  title: string;
  price: number;
  discountPercentage: number;
  discountAmount: number;
  discountedPrice: number;
};


export const FoodDiscountCard = ({
  src,
  title,
  price,
  discountPercentage,
  discountAmount,
  discountedPrice,
}: FoodDiscountCardProps) => {
  return (
    <div className=" ">
      <div className="relative ">
        <div className={`relative  w-[350px] h-[250px]`}>
          <Image
            src={src}
            alt="Picture"
            fill
            className={`object-cover rounded-2xl`}
          ></Image>
        </div>
        <div className="absolute top-5 right-10">
          <button className="bg-[#18BA51] rounded-lg px-2 text-white font-semibold text-[12px]">
            {discountPercentage}%
          </button>
        </div>
      </div>
      <p className="text-base font-bold  text-black  ">{title}</p>
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
