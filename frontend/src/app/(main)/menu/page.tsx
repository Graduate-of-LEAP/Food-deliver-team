"use client"
import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FoodDiscount } from '../components/FoodDiscount';
import { FoodMain } from '../components/FoodMain';
import { FoodSweet } from '../components/FoodSweet';
import { api } from "@/lib/axios";
import { FaEllipsisV } from 'react-icons/fa';

export type Category = {
    _id: string;
    categoryName: string;
  };
  type Menu = {
    title: string,
};

 const Page = () => {
    type Menu = {
        title: string,
    };
 
    const menu: Menu[] = [
        { title: "Breakfast" },
        { title: "Soup" },
        { title: "Main Course" },
        { title: "Dessert" },
    ];
 

    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
 
  
 
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
    return (<>
<Header/>
        <div className="flex justify-center">
            <div className="container">
                <div className="w-full gap-7 flex h-fit justify-center items-center">
                {categories.slice(0, 4).map((category) => (
              <div
                key={category._id}
                onClick={() => handleCategorySelect(category._id)}
                className={`border py-2 w-full   justify-center  items-center rounded-[8px] w-fulll justify-center border-[#D6D8DB] font-medium text-[18px] ${
                  selectedCategory === category._id
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
                    
                    <FoodDiscount />

                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};
export default Page;
