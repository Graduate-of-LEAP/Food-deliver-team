import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Opt = () => {
    return (
        <>
            <Header />
            <div className="w-full flex justify-center">
                <div className="container flex justify-center">
                    <div className="w-fit px-8 py-8 mt-24 mb-14">
                        <p className="flex justify-center font-bold text-2xl">Шинэ нууц үг зохиох</p>
                        <form className="mt-12">
                            <div>
                                <label className="text-base mt-8">Нууц үг</label>
                                <Input 
                                   
                                    name="password"
                                    type="password"
                                    placeholder="Шинэ нууц үг"
                                    className="w-[384px] h-12 bg-[#F7F7F8] border-[#ECEDF0] mt-1" 
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="text-base mt-8">Нууц үг давтах</label>
                                <Input 
                                
                                    name="confirm-password"
                                    type="password"
                                    placeholder="Шинэ нууц үг давтах"
                                    className="w-full h-12 bg-[#F7F7F8] border-[#ECEDF0] mt-1" 
                                />
                            </div>
                            <Button className="w-full mt-12 bg-[#18BA51] h-12 text-base hover:bg-[#18BA51]">Үргэлжлүүлэх</Button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
