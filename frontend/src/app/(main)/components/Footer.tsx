"use client";
import { Logo } from "@/icon/Logo";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  const pathname: string = usePathname();

  type FooterLink = {
    title: string;
    href: string;
  };

  const footer: FooterLink[] = [
    { href: "/", title: "Нүүр" },
    { href: "/", title: "Холбоо барих" },
    { href: "/menu", title: "Хоолны цэс" },
    { href: "/service", title: "Үйлчилгээний нөхцөл" },
    { href: "/map", title: "Хүргэлтийн бүс" },
    { href: "/policy", title: "Нууцлалын бодлого" },
  ];
  const router = useRouter();

  return (
    <div className="w-full ">
      <div className="relative w-full h-[30%]">
        <Image
          src="/foot.jpeg"
          alt="Food delivery logo"
          fill
          className="object-cover -z-50"
        />

        <div className="flex justify-center z-50 text-white bg-[#191313] opacity-70">
          <div className="container flex justify-center">
            <div className="w-full px-8 py-16">
              <div className="flex justify-center text-white items-center gap-4 font-bold text-xl">
                <Logo /> Food Delivery
              </div>
              <div className="flex flex-col md:flex-row justify-between  mt-12 ">
                {footer.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => router.push(item.href)}
                    className=" relative z-20"
                  >
                    <p className="text-white font-semibold border-b  text-base">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 justify-center mt-10 text-white">
                <FaFacebook
                  className="social-icon text-white text-4xl hover:text-gray-300"
                  aria-label="Facebook"
                />
                <FaInstagram
                  className="social-icon text-white text-4xl hover:text-gray-300"
                  aria-label="Instagram"
                />
                <FaTwitter
                  className="social-icon text-white text-4xl hover:text-gray-300"
                  aria-label="Twitter"
                />
              </div>
              <div className="w-full border border-white my-10 rounded-lg"></div>
              <div>
                <p className="text-white flex justify-center">
                  © 2024 Pinecone Foods LLC
                </p>
                <p className="text-white flex justify-center">
                  Зохиогчийн эрх хуулиар хамгаалагдсан.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
