// "use client";
// import { useState, useEffect } from "react";
// import { Header } from "../components/Header";
// import { Footer } from "../components/Footer";
// import { FoodDiscount } from "../components/FoodDiscount";
// import { FoodMain } from "../components/FoodMain";
// import { FoodSweet } from "../components/FoodSweet";
// import { api } from "@/lib/axios";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { FoodDiscountCard } from "../../(main)/components/FoodDiscountCart";
// import Image from "next/image";
// import { AxiosError } from 'axios';
// import { useCart } from "../components/context/Cartcontext";
// import { useAuthContext } from "@/components/utils/authProvider";

// export type Category = {
//   _id: string;
//   categoryName: string;
// };

// type CartItem = {
//   id: number;
//   title: string;
//   price: number;
//   src: string;
//   quantity: number;
//   orts: string;
// };

// type foodCardType = {
//   _id: string;
//   category: CategoryType[];
//   images: string[];
//   foodName: string;
//   price: number;
//   salePercent: number;
//   discountAmount: number;
//   discountedPrice: number;
//   orts: string;
// };

// type CategoryType = {
//   _id: string;
//   categoryName: string;
// };

// interface CreateSagsType {
//   userId: string;
//   price: number;
//   foodId: string;
//   count: string;

// }

// const Page = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [foods, setFoods] = useState<foodCardType[]>([]);
//   const [filteredAllFoods, setFilteredAllFoods] = useState<foodCardType[]>([]);
//   const [currentItem, setCurrentItem] = useState<foodCardType | null>(null);
//   const [quantity, setQuantity] = useState(1);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const { userMe } = useAuthContext();

//   const handleCategorySelect = (_id: string) => {
//     if (_id === "all") {
//       setSelectedCategory([]);
//     } else {
//       setSelectedCategory((prev) => {
//         if (Array.isArray(prev) && prev.includes(_id)) {
//           return prev.filter((id) => id !== _id);
//         } else {
//           return [_id];
//         }
//       });
//     }
//   };

//   const getCategories = async () => {
//     try {
//       const response = await api.get("/category");
//       setCategories([
//         { _id: "all", categoryName: "All" },
//         ...response.data.categories,
//       ]);
//     } catch (error) {
//       console.log("Failed to fetch categories:", error);
//     }
//   };

//   const getFoods = async () => {
//     try {
//       const response = await api.get("/food");
//       const foodsWithId = response.data.foods.map((food: any) => ({
//         ...food,
//         _id: food._id,
//       }));
//       setFoods(foodsWithId);
//     } catch (error) {
//       console.log("Failed to fetch foods:", error);
//     }
//   };

//   const { addItem } = useCart();

//   const handleDecrease = () => {
//     setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
//   };

//   const handleIncrease = () => {
//     setQuantity((prevQuantity) => prevQuantity + 1);
//   };

//   const createSags = async (addSags: CreateSagsType): Promise<any> => {
//     const token = localStorage.getItem("token");
//     console.log("Creating sags with token:", token, "data:", addSags);

//     try {
//       const response = await api.post("/sags", addSags, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("API response:", response.data);
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError;
//       console.error("API error:", axiosError.response?.data || axiosError.message);
//       throw error;
//     }
//   };
//   useEffect(() => {
//     getFoods();
//     getCategories();
//   }, []);

//   useEffect(() => {
//     // Filter foods based on selected category
//     const filteredFoods = foods.filter((food) =>
//       food.category.some((cat) => selectedCategory.includes(cat._id))
//     );
//     setFilteredAllFoods(selectedCategory.length ? filteredFoods : foods);
//   }, [selectedCategory, foods]);

//   return (
//     <>
//       <Header />
//       <div className="flex justify-center min-h-[40vh]">
//         <div className="container">
//           <div className="w-full gap-7 flex h-fit justify-center items-center">
//             {categories.map((category) => (
//               <div
//                 key={category._id}
//                 onClick={() => handleCategorySelect(category._id)}
//                 className={`border py-2 w-full justify-center cursor-pointer flex items-center rounded-[8px] border-[#D6D8DB] font-medium text-[18px] ${selectedCategory.includes(category._id) ||
//                   (!selectedCategory.length && category._id === "all")
//                   ? "bg-[#18BA51] text-white"
//                   : ""
//                   }`}
//               >
//                 <div>{category.categoryName}</div>
//               </div>
//             ))}
//           </div>
//           <div className="bg-pink-200">
//             <div className="w-full bg-red-400">
//               <div className="grid w-full bg-slate-100 grid-cols-4 grid-rows-4 gap-5 my-10">
//                 {filteredAllFoods?.map((item: foodCardType, index: number) => (
//                   <Dialog key={index}>
//                     <DialogTrigger asChild>
//                       <div className="cursor-pointer">
//                         <FoodDiscountCard
//                           src={item.images[0]}
//                           title={item.foodName}
//                           price={item.price}
//                         />
//                       </div>
//                     </DialogTrigger>
//                     <DialogContent className="sm:max-w-[800px] flex gap-8">
//                       <div className="w-[48%]">
//                         <Image
//                           src={item.images[0]}
//                           width={200}
//                           height={200}
//                           alt="Picture of the food"
//                           className="w-96 h-96 object-cover rounded-2xl"
//                         />
//                       </div>

//                       <div className="w-[48%] flex flex-col">
//                         <div>
//                           <b className="text-2xl">{item.foodName}</b>
//                           <p className="text-green-500 text-lg font-bold py-4">
//                             {item.price} ₮
//                           </p>
//                         </div>
//                         <div>
//                           <b className="text-lg">Орц</b>
//                           <p className="p-2 bg-gray-50 rounded-lg my-2">
//                             {item.orts}
//                           </p>
//                         </div>
//                         <div className="flex flex-col gap-4">
//                           <b className="text-lg">Quantity</b>
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
//                         <button
//                           className="mt-8 h-12 rounded-sm px-20 bg-green-500 flex justify-center text-white items-center"
//                           onClick={async () => {
//                             if (!userMe?.id) {
//                               alert("Захиалга нэмэхийн тулд та нэвтэрч орно уу.");
//                               return;
//                             }

//                             if (!currentItem) {
//                               alert("Тухайн бүтээгдэхүүн олдсонгүй.");
//                               return;
//                             }

//                             const cartItem: CartItem = {
//                               id: Number(currentItem._id),
//                               title: currentItem.foodName,
//                               price: currentItem.price,
//                               src: currentItem.images[0],
//                               quantity: quantity,
//                               orts: String(currentItem.orts)
//                             };

//                             try {
//                               addItem(cartItem);
//                               const result = await createSags({
//                                 foodId: currentItem._id,
//                                 userId: userMe.id,
//                                 price: currentItem.price || 0,
//                                 count: quantity.toString(),
//                               });

//                               if (result) {
//                                 alert("Захиалга амжилттай нэмэгдлээ!");
//                               }
//                             } catch (error) {
//                               console.error("Error:", error);
//                               alert("Захиалга нэмэхэд алдаа гарлаа. Дахин оролдож үзнэ үү.");
//                             } finally {
//                               setDialogOpen(false);
//                               setQuantity(1);
//                             }
//                           }}
//                         >
//                           Сагсанд нэмэх & Сагслах
//                         </button>
//                       </div>
//                     </DialogContent>
//                   </Dialog>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Page;

"use client";
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FoodDiscountCard } from "../../(main)/components/FoodDiscountCart";
import { api } from "@/lib/axios";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { AxiosError } from "axios";
import { useCart } from "../components/context/Cartcontext";
import { useAuthContext } from "@/components/utils/authProvider";
import { DialogTrigger } from "@radix-ui/react-dialog";

export type Category = {
  _id: string;
  categoryName: string;
};

type CartItem = {
  id: number;
  title: string;
  price: number;
  src: string;
  quantity: number;
  orts: string;
};

type foodCardType = {
  _id: string;
  category: CategoryType[];
  images: string[];
  foodName: string;
  price: number;
  salePercent: number;
  discountAmount: number;
  discountedPrice: number;
  orts: string;
};

type CategoryType = {
  _id: string;
  categoryName: string;
};

interface CreateSagsType {
  userId: string;
  price: number;
  foodId: string;
  count: string;
}

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [foods, setFoods] = useState<foodCardType[]>([]);
  const [filteredAllFoods, setFilteredAllFoods] = useState<foodCardType[]>([]);
  const [currentItem, setCurrentItem] = useState<foodCardType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { userMe } = useAuthContext();
  const { addItem } = useCart();

  const handleCategorySelect = (_id: string) => {
    if (_id === "all") {
      setSelectedCategory([]);
    } else {
      setSelectedCategory((prev) => {
        if (Array.isArray(prev) && prev.includes(_id)) {
          return prev.filter((id) => id !== _id);
        } else {
          return [_id];
        }
      });
    }
  };

  const getCategories = async () => {
    try {
      const response = await api.get("/category");
      setCategories([
        { _id: "all", categoryName: "All" },
        ...response.data.categories,
      ]);
    } catch (error) {
      console.log("Failed to fetch categories:", error);
    }
  };

  const getFoods = async () => {
    try {
      const response = await api.get("/food");
      const foodsWithId = response.data.foods.map((food: any) => ({
        ...food,
        _id: food._id,
      }));
      setFoods(foodsWithId);
    } catch (error) {
      console.log("Failed to fetch foods:", error);
    }
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const createSags = async (addSags: CreateSagsType): Promise<any> => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.post("/sags", addSags, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        "API error:",
        axiosError.response?.data || axiosError.message
      );
      throw error;
    }
  };

  useEffect(() => {
    getFoods();
    getCategories();
  }, []);

  useEffect(() => {
    const filteredFoods = foods.filter((food) =>
      food.category.some((cat) => selectedCategory.includes(cat._id))
    );
    setFilteredAllFoods(selectedCategory.length ? filteredFoods : foods);
  }, [selectedCategory, foods]);

  const handleFoodSelect = (item: foodCardType) => {
    setCurrentItem(item);
    setQuantity(1); // Reset quantity when a new item is selected
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setCurrentItem(null);
  };

  return (
    <>
      <Header />
      <div className="flex justify-center bg-gray-200 bg-gradient-to-b from-white to-transparent min-h-[40vh] pt-[120px]">
        <div className="container ">
          <div className="w-full gap-7 flex h-fit justify-center items-center">
            {categories.map((category) => (
              <div
                key={category._id}
                onClick={() => handleCategorySelect(category._id)}
                className={`border py-2 w-full justify-center cursor-pointer flex items-center rounded-[8px] border-[#D6D8DB] font-medium text-[18px] ${
                  selectedCategory.includes(category._id) ||
                  (!selectedCategory.length && category._id === "all")
                    ? "bg-[#86c41d] text-white"
                    : ""
                }`}
              >
                <div>{category.categoryName}</div>
              </div>
            ))}
          </div>
          <div className="">
            <div className="w-full ">
              <div className="grid w-full grid-cols-5 grid-rows-4 gap-5 my-10  ">
                {filteredAllFoods.map((item: foodCardType, index: number) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer">
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
                          alt="Picture of the food"
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
                          <b className="text-lg">Ingredients</b>
                          <p className="p-2 bg-gray-50 rounded-lg my-2">
                            Хулуу, төмс, лууван, сонгино, цөцгийн тос, самрын үр
                          </p>
                        </div>
                        <div className="flex flex-col gap-4">
                          <b className="text-lg">Quantity</b>
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
                          Add to Cart
                        </button>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog Component Outside of Map */}
      {dialogOpen && currentItem && (
        <Dialog open={dialogOpen} onOpenChange={closeDialog}>
          <DialogContent className="sm:max-w-[800px] flex gap-8">
            <div className="w-[48%]">
              <Image
                src={currentItem.images[0]}
                width={200}
                height={200}
                alt="Picture of the food"
                className="w-96 h-96 object-cover rounded-2xl"
              />
            </div>

            <div className="w-[48%] flex flex-col">
              <div>
                <b className="text-2xl">{currentItem.foodName}</b>
                <p className="text-green-500 text-lg font-bold py-4">
                  {currentItem.price} ₮
                </p>
              </div>
              <div>
                <b className="text-lg">Орц</b>
                <p className="p-2 bg-gray-50 rounded-lg my-2">
                  {currentItem.orts}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <b className="text-lg">Quantity</b>
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
              <button
                className="mt-8 h-12 rounded-sm px-20 bg-green-500 flex justify-center text-white items-center"
                onClick={async () => {
                  if (!userMe?.id) {
                    alert("Захиалга нэмэхийн тулд та нэвтэрч орно уу.");
                    return;
                  }

                  const cartItem: CartItem = {
                    id: Number(currentItem._id),
                    title: currentItem.foodName,
                    price: currentItem.price,
                    src: currentItem.images[0],
                    quantity: quantity,
                    orts: String(currentItem.orts),
                  };

                  try {
                    addItem(cartItem);
                    const result = await createSags({
                      foodId: currentItem._id,
                      userId: userMe.id,
                      price: currentItem.price || 0,
                      count: quantity.toString(),
                    });

                    if (result) {
                      alert("Захиалга амжилттай нэмэгдлээ!");
                    }
                  } catch (error) {
                    console.error("Error:", error);
                    alert(
                      "Захиалга нэмэхэд алдаа гарлаа. Дахин оролдож үзнэ үү."
                    );
                  } finally {
                    closeDialog();
                  }
                }}
              >
                Сагсанд нэмэх & Сагслах
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </>
  );
};

export default Page;
