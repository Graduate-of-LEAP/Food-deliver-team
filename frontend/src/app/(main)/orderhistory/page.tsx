"use client"

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Orderhistory } from "../components/Orderhistory";

const Page = () => {
    return (
        <div className="w-full h-fit">
            <Header />
            <div className="m-auto flex justify-center items-center py-8">
                <Orderhistory />
            </div>
            <Footer />

        </div>
    );
};
export default Page;
