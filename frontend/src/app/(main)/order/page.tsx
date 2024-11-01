"use client";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Address } from "../components/Address";

const Page = () => {
  return (
    <div className="w-full h-fit">
      <Header />
      <div className="m-auto flex justify-center items-center py-8 pt-[80px]">
        <Address />
      </div>
      <Footer />
    </div>
  );
};
export default Page;
