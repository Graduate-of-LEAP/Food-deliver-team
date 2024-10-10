"use client"
import { Logo } from "@/icon/Logo"
import Image from "next/image"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

export const Footer = () => {
    return (
        <>
            <div className="w-full  bg-[#18BA51]">
                <div className="relative w-full h-fit"> 
                    <Image
                        src="/traced.png"
                        alt="Food delivery logo"
                        layout="fill" 
                        className="object-cover"
                    />
                    <div className="flex justify-center">
                    <div className="container flex justify-center">
                        <div className="w-full px-8 py-28 ">
                            <div className="flex justify-center  text-white  items-center gap-4 font-bold text-xl">
                                <Logo /> Food Delivery
                            </div>
                            <div className="flex flex-col md:flex-row justify-between mt-12">
                                <a href="#" className="text-white font-semibold text-base">Нүүр</a>
                                <a href="#" className="text-white font-semibold text-base">Холбоо барих</a>
                                <a href="#" className="text-white font-semibold text-base">Хоолны цэс</a>
                                <a href="#" className="text-white font-semibold text-base">Үйлчилгээний нөхцөл</a>
                                <a href="#" className="text-white font-semibold text-base">Хүргэлтийн бүс</a>
                                <a href="#" className="text-white font-semibold text-base">Нууцлалын бодлого</a>
                            </div>
                            <div className="flex gap-4 justify-center mt-10">
                                <FaFacebook className="social-icon text-white text-4xl hover:text-gray-300" />
                                <FaInstagram className="social-icon text-white text-4xl hover:text-gray-300" />
                                <FaTwitter className="social-icon text-white text-4xl hover:text-gray-300" />
                            </div>
                            <div className="w-full border border-white my-10 rounded-lg"></div>
                            <div>
                                <p className="text-white flex justify-center">© 2024 Pinecone Foods LLC</p>
                                <p className="text-white flex justify-center">Зохиогчийн эрх хуулиар хамгаалагдсан.</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
