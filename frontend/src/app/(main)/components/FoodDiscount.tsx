// "use client";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import Image from "next/image";

// import { Sparkle } from "lucide-react";
// import { ChevronRight } from "lucide-react";
// import { useCart } from "./context/Cartcontext";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { api } from "@/lib/axios";
// import { useEffect, useState } from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Card, CardContent } from "@/components/ui/card";
// import { FoodDiscountCard } from "./FoodDiscountCart";
// import { Category } from "../menu/page";

// export type DiscountCalculatorType = {
//   originalPrice: number;
//   discountPercentage: number;
//   discountAmount: number;
//   discountPrice: number;
// };
// type CategoryType = {
//   _id: string;
//   categoryName: string;
// };
// type foodCardType = {
//   category: CategoryType[];
//   images: string[];
//   foodName: string;
//   price: number;
//   salePercent: number;
//   discountAmount: number;
//   discountedPrice: number;
// };
// export const FoodDiscount = () => {

//   const [percent, setPercent] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(true);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [foods, setFoods] = useState<foodCardType[]>([]);

//   const getFoods = async () => {
//     try {
//       const response = await api.get("/food");
//       setFoods(response.data.foods);
//       console.log(response.data.foods);
//     } catch (error) {
//       console.log("Failed to fetch foods:", error);
//     }
//   };

//   const filteredSaledPercentFoods = foods.filter(
//     (item) => item.salePercent > 0
//   );
//   const filteredVndsenHoolfoods = foods.filter(
//     (item) => item.category[0].categoryName === "Breakfast"
//   );
//   const filteredSaladFoods = foods.filter(
//     (item) => item.category[0].categoryName === "Desserts"
//   );
//   const filteredSweetFoods = foods.filter(
//     (item) => item.category[0].categoryName === "Soup"
//   );

//   useEffect(() => {
//     getFoods();
//   }, []);

//   const { addItem } = useCart();
//   const [quantity, setQuantity] = useState(1);
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const handleDecrease = () => {
//     setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
//   };

//   const handleIncrease = () => {
//     setQuantity((prevQuantity) => prevQuantity + 1);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       percent === 3 ? setIsTransitioning(false) : setIsTransitioning(true);
//       setPercent((prev) => (prev + 1) % 4);
//     }, 3000);
//     return () => clearInterval(interval);
//   });

//   return (
//     <>
//       <div className=" ">
//         {/* categories.map */}
//       <div className="">
//                 {categories.map((category) => (
//               <div
//                 key={category._id}
//                 className=""
//                 >
                 
//                 {/* <button className="border border-b px-2 rounded-lg">{category.categoryName}</button> */}
                
//               </div>
//             ))}

                  
//       </div>
//       {/*  */}


//           {/*  */}
//         <div className="flex justify-between mt-6 px-20">
//           <div className="flex font-bold ">
//             <Sparkle className="text-green-400" />
//             <Image
//               src="/images/Star.png"
//               alt="Description"
//               width={20}
//               height={20}
//             />
//             Хямдралтай
//           </div>
//         </div>

//         <div className=" flex justify-center bg-blue-300   ">
//           <Carousel className="  w-[800px]">
//             <CarouselContent
//               style={{ transform: `translateX(-${(percent * 100) / 6}%)` }}
//               className={`  w-full flex h-fit gap-10  ${
//                 isTransitioning ? "duration-1000" : null
//               }`}
//             >
//               {filteredSaledPercentFoods.map((item, index) => {
//                 const discountAmount = item.price * (item.salePercent / 100);
//                 const discountedPrice = item.price - discountAmount;
//                 return (
//                   <CarouselItem
//                     key={index}
//                     className="pl-1  md:basis-1/2 relative lg:basis-1/3"
//                   >
//                     <div className="p-1">
//                       <Card>
//                         <CardContent className="flex aspect-square items-center justify-center p-6">
//                           <Dialog key={index}>
//                             <DialogTrigger asChild>
//                               <div
//                                 className="cursor-pointer m-auto"
//                                 onClick={() => {}}
//                               >
//                                 <FoodDiscountCard
//                                   src={item.images[0]}
//                                   title={item.foodName}
//                                   price={item.price}
//                                   discountPercentage={item.salePercent}
//                                   discountAmount={discountAmount}
//                                   discountedPrice={discountedPrice}
//                                 />
//                               </div>
//                             </DialogTrigger>

//                             <DialogContent className="sm:max-w-[800px] flex gap-8">
//                               <div className="w-[48%]">
//                                 <Image
//                                   src={item.images[0]}
//                                   width={800}
//                                   height={800}
//                                   alt="Picture of the pizza"
//                                   className="h-full w-full object-cover rounded-2xl"
//                                 />
//                               </div>
//                               <div className="w-[48%] flex flex-col py-8">
//                                 <div>
//                                   <b className="text-2xl">{item.foodName}</b>
//                                   <div className="flex gap-5">
//                                     <p className="text-base font-serif text-[#18BA51]">
//                                       {/* {item.price * (discountPercentage / 100)}₮ */}
//                                     </p>
//                                     <p className="text-base font-serif text-[#e13bc8] line-through">
//                                       {/* {item.price - (item.price * (discountPercentage / 100))}₮ */}
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <div>
//                                   <b className="text-lg">Орц</b>
//                                   <p className="p-2 bg-gray-50 rounded-lg my-2">
//                                     Хулуу, төмс, лууван, сонгино, цөцгийн тос,
//                                     самрын үр
//                                   </p>
//                                 </div>
//                                 <div className="flex flex-col gap-4">
//                                   <b className="text-lg">Тоо</b>
//                                   <div>
//                                     <div className="flex justify-between">
//                                       <button
//                                         className="h-10 px-4 text-xl rounded-lg bg-green-500 text-white"
//                                         onClick={handleDecrease}
//                                       >
//                                         -
//                                       </button>
//                                       <div className="flex items-center">
//                                         {quantity}
//                                       </div>
//                                       <button
//                                         className="h-10 px-4 text-xl rounded-lg bg-green-500 text-white"
//                                         onClick={handleIncrease}
//                                       >
//                                         +
//                                       </button>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <button
//                                   className="mt-8 h-12 rounded-sm px-20 bg-green-500 flex justify-center text-white items-center"
//                                   onClick={() => {
//                                     addItem({
//                                       id: index,
//                                       title: item.foodName,
//                                       price: discountedPrice,
//                                       src: item.images[0],
//                                       quantity,
//                                     });
//                                   }}
//                                 >
//                                   Сагслах
//                                 </button>
//                               </div>
//                             </DialogContent>
//                           </Dialog>
//                           <span className="text-2xl font-semibold">
//                             {index + 1}
//                           </span>
//                         </CardContent>
//                       </Card>
//                     </div>
//                   </CarouselItem>
//                 );
//               })}
//             </CarouselContent>
//             <CarouselPrevious />
//             <CarouselNext />
//           </Carousel>
//         </div>
//         {/* filteredSaladFoods*/}
//         <div className="w-full  bg-red-400">
//           <div className=" flex w-full  justify-around gap-5 my-10">
//             {filteredVndsenHoolfoods?.map((item, index) => {
//               return (
//                 <Dialog key={index}>
//                   <DialogTrigger asChild>
//                     <div className="cursor-pointer" onClick={() => {}}>
//                       <FoodDiscountCard
//                         src={item.images[0]}
//                         title={item.foodName}
//                         price={item.price}
//                         // discountPercentage={item.salePercent}
//                       />

//                     </div>
//                   </DialogTrigger>
//                   <DialogContent className="sm:max-w-[800px] flex gap-8">
//                     <div className="w-[48%]">
//                       <Image
//                         src={item.images[0]}
//                         width={800}
//                         height={800}
//                         alt="Picture of the pizza"
//                         className="h-full w-full object-cover rounded-2xl"
//                       />
//                     </div>

//                     <div className="w-[48%] flex flex-col py-8">
//                       <div>
//                         <b className="text-2xl">{item.foodName}</b>
//                         <p className="text-green-500 text-lg font-bold py-4">
//                           {item.price} ₮
//                         </p>
//                       </div>
//                       <div>
//                         <b className="text-lg">Орц</b>
//                         <p className="p-2 bg-gray-50 rounded-lg my-2">
//                           Хулуу, төмс, лууван, сонгино, цөцгийн тос, самрын үр
//                         </p>
//                       </div>
//                       <div className="flex flex-col gap-4">
//                         <b className="text-lg">Тоо</b>
//                         <div>
//                           <div className="flex justify-between">
//                             <button
//                               className="h-10 px-4 text-xl rounded-lg bg-green-500 text-white"
//                               onClick={handleDecrease}
//                             >
//                               -
//                             </button>
//                             <div className="flex items-center">{quantity}</div>
//                             <button
//                               className="h-10 px-4 text-xl rounded-lg bg-green-500 text-white"
//                               onClick={handleIncrease}
//                             >
//                               +
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                       <button
//                         className="mt-8 h-12 rounded-sm px-20 bg-green-500 flex justify-center text-white items-center"
//                         onClick={() => {
//                           addItem({
//                             id: index,
//                             title: item.foodName,
//                             price: item.price,
//                             src: item.images[0],
//                             quantity,
//                           });
//                         }}
//                       >
//                         Сагслах
//                       </button>
//                     </div>
//                   </DialogContent>
//                 </Dialog>
//               );
//             })}
//           </div>
//         </div>
//         {/*  */}
//       </div>
//     </>
//   );
// };

// type foodCardType = {
//   src: string;
//   title: string;
//   price: number;
//   discountPercentage: number;
//   discountAmount: number;
//   discountedPrice: number;
//   categoryNameItem?:string;
// };

// export const FoodDiscountCard = ({
//   src,
//   title,
//   price,
//   discountPercentage,
//   discountedPrice,
//   categoryNameItem, // Пропс хүлээн авах
// }: foodCardType) => {
//   return (
//     <div className="">
//       <div className="relative">
//         <div className={`relative w-[350px] h-[250px]`}>
//           <Image src={src} alt="Picture" fill className={`object-cover rounded-2xl`} />
//         </div>
//         <div className="absolute top-5 right-10">
//           <button className="bg-[#18BA51] rounded-lg px-2 text-white font-semibold text-[12px]">
//             {discountPercentage}%
//           </button>
//         </div>
//       </div>
//       <p className="text-base font-bold text-black">{title}</p>
//       <p className="text-sm text-gray-600">{categoryNameItem}</p> {/* Категорын нэрийг харуулах */}
//       <div className="flex gap-5">
//         <p className="text-base font-serif text-[#18BA51]">
//           {discountedPrice}₮
//         </p>
//         <p className="text-base font-serif text-[#e13bc8] line-through">
//           {price}₮
//         </p>
//       </div>
//     </div>
//   );
// };


// // export const GGG = () => {
// //   return(
// //     <div>dfkjgnfgjkhnf</div>
// //   )
// // }

"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Sparkle } from "lucide-react";
import { useCart } from "./context/Cartcontext";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "../menu/page";

export type DiscountCalculatorType = {
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  discountPrice: number;
};

type CategoryType = {
  _id: string;
  categoryName: string;
};

type foodCardType = {
  category: CategoryType[];
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
  const [categories, setCategories] = useState<Category[]>([]);
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

  const filteredSaledPercentFoods = foods.filter(item => item.salePercent > 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => (prev + 1) % filteredSaledPercentFoods.length);
      setIsTransitioning(true);
    }, 3000);
    return () => clearInterval(interval);
  }, [filteredSaledPercentFoods.length]);

  return (
    <>
      <div>
        <div>
          {categories.map((category) => (
            <div key={category._id}>
              {/* Category buttons can be uncommented here */}
              {/* <button className="border border-b px-2 rounded-lg">{category.categoryName}</button> */}
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6 px-20">
          <div className="flex font-bold">
            <Sparkle className="text-green-400" />
            <Image src="/images/Star.png" alt="Description" width={20} height={20} />
            Хямдралтай
          </div>
        </div>

        <div className="flex justify-center bg-blue-300">
          <Carousel className="w-[800px]">
            <CarouselContent
              style={{ transform: `translateX(-${(percent * 100) / filteredSaledPercentFoods.length}%)` }}
              className={`w-full flex h-fit gap-10 ${isTransitioning ? "duration-1000" : ""}`}
            >
              {filteredSaledPercentFoods.map((item, index) => {
                const discountAmount = item.price * (item.salePercent / 100);
                const discountedPrice = item.price - discountAmount;
                return (
                  <CarouselItem key={index} className="pl-1 md:basis-1/2 relative lg:basis-1/3">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <Dialog>
                            <DialogTrigger asChild>
                              <div className="cursor-pointer m-auto">
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
                                <Image src={item.images[0]} width={800} height={800} alt="Food image" className="h-full w-full object-cover rounded-2xl" />
                              </div>
                              <div className="w-[48%] flex flex-col py-8">
                                <div>
                                  <b className="text-2xl">{item.foodName}</b>
                                  <div className="flex gap-5">
                                    <p className="text-base font-serif text-[#18BA51]">{discountedPrice}₮</p>
                                    <p className="text-base font-serif text-[#e13bc8] line-through">{item.price}₮</p>
                                  </div>
                                </div>
                                <div>
                                  <b className="text-lg">Орц</b>
                                  <p className="p-2 bg-gray-50 rounded-lg my-2">Ingredients description...</p>
                                </div>
                                <div className="flex flex-col gap-4">
                                  <b className="text-lg">Тоо</b>
                                  <div>
                                    <div className="flex justify-between">
                                      <button className="h-10 px-4 text-xl rounded-lg bg-green-500 text-white" onClick={handleDecrease}>-</button>
                                      <div className="flex items-center">{quantity}</div>
                                      <button className="h-10 px-4 text-xl rounded-lg bg-green-500 text-white" onClick={handleIncrease}>+</button>
                                    </div>
                                  </div>
                                </div>
                                <button className="mt-8 h-12 rounded-sm px-20 bg-green-500 flex justify-center text-white items-center" onClick={() => {
                                  addItem({
                                    id: index,
                                    title: item.foodName,
                                    price: discountedPrice,
                                    src: item.images[0],
                                    quantity,
                                  });
                                }}>
                                  Сагслах
                                </button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <span className="text-2xl font-semibold">{index + 1}</span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
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
  discountedPrice,
}: FoodDiscountCardProps) => {
  return (
    <div>
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
      <div className="flex gap-5">
        <p className="text-base font-serif text-[#18BA51]">{discountedPrice}₮</p>
        <p className="text-base font-serif text-[#e13bc8] line-through">{price}₮</p>
      </div>
    </div>
  );
};
