import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const ForgetCode = () => {
    return (
        <>
            <Header />
            <div className="w-full flex justify-center">
                <div className="container flex justify-center">
                    <div className="w-fit px-8 py-8 mt-24 mb-14">
                        <p className="flex justify-center font-bold text-2xl">Нууц үг сэргээх</p>
                        <div className="mt-12">
                            <div className="flex w-full justify-center text-[#695C08]">
                                <p>Таны </p>
                                <p className="text-green-500">example@pinecone.mn</p>
                                <p> хаяг руу сэргээх код илгээх болно.</p>
                            </div>
                            <p className="text-[#695C08]">Нууц үг сэргээх код</p>
                            <label htmlFor="recovery-code" className="text-base m mt-7 block">
                            Имэйл 
                            </label>
                            <Input
                              
                                name="recovery-code"
                                placeholder="Имэйл хаягаа оруулна уу"
                                className="w-[ 384px] h-12 bg-[#F7F7F8] border-[#ECEDF0] mt-1"
                            />
                            <Button className="w-full mt-12 bg-[#18BA51] h-12 text-base hover:bg-[#18BA51]">
                                Үргэлжлүүлэх
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};





