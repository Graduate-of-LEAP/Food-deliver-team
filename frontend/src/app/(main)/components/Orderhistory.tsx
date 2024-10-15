"use client"
import { TbCircleCheckFilled } from "react-icons/tb";
export const Orderhistory = () => {

    return (
        <div className="flex">
            <div className='px-8'>

                <div className='border-2 rounded-lg p-4 flex flex-col  shadow-lg h-[720px]'>
                    <p>Захиалгын түүх</p>
                    <div className='flex items-center gap-8 py-8 border-b-2 border-blue-700'>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center border-2">
                            <div className='w-5 h-5 rounded-full bg-blue-700'></div>
                        </div>
                        <div className='flex justify-between gap-8'>
                            <div className='flex flex-col'>
                                <p className='text-gray-500'>Захиалга #23790</p>
                                <p className='text-blue-400'>Хүлээгдэж буй</p>
                            </div>
                            <button>

                                2024/04/26
                            </button>
                        </div>

                    </div>
                    <div className='flex items-center gap-8 py-8 border-b-2 border-green-500'>
                        <TbCircleCheckFilled color="green" size={48} />
                        <div className='flex justify-between gap-8'>
                            <div className='flex flex-col'>
                                <p className='text-gray-500'>Захиалга #23790</p>
                                <p className='text-green-500'>Амжилттай</p>
                            </div>
                            <button className='text-gray-500'>

                                2024/04/26
                            </button>
                        </div>

                    </div>

                </div>
            </div>
            <div className='px-8'>

                <div className='border-2 rounded-lg p-4 flex flex-col  shadow-lg h-[720px] w-[384px]'>
                    <p>Захиалгын дэлгэрэнгүй</p>
                    <div className='py-8 border-b-2 border-gray-200'>
                        <div className='flex justify-between'>
                            <p>Main pizza</p>
                            <button>
                                (1)
                            </button>
                        </div>
                    </div>
                    <div className='py-8 border-b-2 border-gray-200'>
                        <div className='flex justify-between'>
                            <p>Хулууны зутан шөл</p>
                            <button>
                                (1)
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
