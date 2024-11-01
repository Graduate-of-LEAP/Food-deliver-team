"use client";

import { Header } from "../../components/Header";
import { Orderhistory } from "../../components/Orderhistory";

const Page = () => {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <Orderhistory />
    </div>
  );
};
export default Page;
