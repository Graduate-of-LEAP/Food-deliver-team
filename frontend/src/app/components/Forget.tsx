import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
 
export const Forget = () => {
    return(
        <div className=" w-full flex  justify-center">
            <div className=" container  flex justify-center">
                <div className="  w-fit px-8 py-8 mt-24">
                    <p className=" flex justify-center font-bold text-2xl ">Нууц үг сэргээх</p>
                    <div className=" mt-12">
                        <p>Имэйл </p>
                        < Input placeholder="Имэйл хаягаа оруулна уу" className="w-[384px] h-12 bg-[#F7F7F8] border-[#ECEDF0]" />
                      
                    </div>
                    <Button className="w-full mt-12 bg-[#18BA51] h-12 text-base hover:bg-[#18BA51] ">Үргэлжлүүлэх</Button>
                    <div className="">
                        <div className=""></div>
                    </div>
                </div>
            </div>
        </div>
    )
}