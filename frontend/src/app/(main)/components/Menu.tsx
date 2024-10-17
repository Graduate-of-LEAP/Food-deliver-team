"use client"
import { useState } from 'react';
 
export const Menu = () => {
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
 
    return (
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
            </div>
        </div>
    );
};