"use client"
import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FoodDiscount } from '../components/FoodDiscount';
import { FoodMain } from '../components/FoodMain';
import { FoodSweet } from '../components/FoodSweet';
 
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
 
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
 
    const handleClick = (index: number) => {
        setActiveIndex(index);
    };
 
    return (<>
<Header/>
        <div className="flex justify-center">
            <div className="container">
                <div className="w-full gap-7 flex h-fit">
                    {menu.map((item, index) => (
                        <div
                            key={item.title}  
                            className={`border py-2 rounded-[8px] w-full flex justify-center border-[#D6D8DB] font-medium text-[18px] ${activeIndex === index ? 'bg-[#18BA51] text-white '  : 'hover:bg-white'}`}
                            onClick={() => handleClick(index)}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
                <div>
                    <FoodDiscount/>
                    <FoodMain/>
                    <FoodSweet/>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};
export default Page;
