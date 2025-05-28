import React from "react";
import photo from '../../images/model.png'
import photo2 from '../../images/model-BR.png'
import CompareImage from "../CompareImage/CompareImage";

const LoadingUploadImage = () => {
    return (
        <>
            <div className="container mx-auto h-full pb-28 ">
                <div className="lg:flex animate-pulse  justify-center pt-10 md:pt-20 gap-12">

                    <div className="w-full px-5  lg:hidden pb-6">
                        <div className="scrolling-wrapper gap-3">
                            <div className="flex gap-2">
                                <div className=" card bg-gray-200 rounded-lg h-[52px] w-[52px] "></div>
                                <div className=" card bg-gray-200 rounded-lg h-[52px] w-[52px] "></div>
                                <div className=" card bg-gray-200 rounded-lg h-[52px] w-[52px] "></div>
                                <div className=" card bg-gray-200 rounded-lg h-[52px] w-[52px] "></div>
                                <div className=" card bg-gray-200 rounded-lg h-[52px] w-[52px] "></div>
                                <div className=" card bg-gray-200 rounded-lg h-[52px] w-[52px] "></div>
                                <div className=" card bg-gray-200 rounded-lg h-[52px] w-[52px] "></div>
                                <div className=" card bg-gray-200 rounded-lg h-[52px] w-[52px] "></div>
                                <div className=" card bg-gray-200 rounded-lg h-[52px] w-[52px] "></div>
                                <div className=" card bg-gray-200 rounded-lg h-[52px] w-[52px] "></div>
                                <div className=" card bg-gray-200 rounded-lg h-[52px] w-[52px] "></div>
                                <div className=" card bg-gray-200 rounded-lg h-[52px] w-[52px] "></div>
                                <div className=" card bg-gray-200 rounded-lg h-[52px] w-[52px] "></div>

                            </div>
                        </div>

                    </div>
                    <div className="h-[470px] w-[260px] rounded-lg shadow-2xl relative hidden lg:block">
                        <div className="px-10  pt-10 pb-3 grid grid-cols-3 gap-3 justify-items-center  ">
                            <div className="bg-gray-200 border  text-[8px] pt-3 rounded-lg h-[52px] w-[52px]"></div>
                            <div className="bg-gray-200 border  text-[8px] pt-3 rounded-lg h-[52px] w-[52px]"></div>
                            <div className="bg-gray-200 border  text-[8px] pt-3 rounded-lg h-[52px] w-[52px]"></div>
                            <div className="bg-gray-200 border  text-[8px] pt-3 rounded-lg h-[52px] w-[52px]"></div>
                            <div className="bg-gray-200 border  text-[8px] pt-3 rounded-lg h-[52px] w-[52px]"></div>
                            <div className="bg-gray-200 border  text-[8px] pt-3 rounded-lg h-[52px] w-[52px]"></div>
                            <div className="bg-gray-200 border  text-[8px] pt-3 rounded-lg h-[52px] w-[52px]"></div>
                            <div className="bg-gray-200 border  text-[8px] pt-3 rounded-lg h-[52px] w-[52px]"></div>
                            <div className="bg-gray-200 border  text-[8px] pt-3 rounded-lg h-[52px] w-[52px]"></div>
                            <div className="bg-gray-200 border  text-[8px] pt-3 rounded-lg h-[52px] w-[52px]"></div>
                            <div className="bg-gray-200 border  text-[8px] pt-3 rounded-lg h-[52px] w-[52px]"></div>
                            <div className="bg-gray-200 border  text-[8px] pt-3 rounded-lg h-[52px] w-[52px]"></div>
                            <div className="bg-gray-200 border  text-[8px] pt-3 rounded-lg h-[52px] w-[52px]"></div>
                            <div className="bg-gray-200 border  text-[8px] pt-3 rounded-lg h-[52px] w-[52px]"></div>
                            <div className="bg-gray-200 border  text-[8px] pt-3 rounded-lg h-[52px] w-[52px]"></div>
                            <div className="bg-gray-200 border  text-[8px] pt-3 rounded-lg h-[52px] w-[52px]"></div>
                            <div className="bg-gray-200 border  text-[8px] pt-3 rounded-lg h-[52px] w-[52px]"></div>
                            <div className="bg-gray-200 border  text-[8px] pt-3 rounded-lg h-[52px] w-[52px]"></div>

                        </div>
                    </div>
                    <div className="h-[450px] w-full lg:w-96  rounded-lg shadow-lg">
                        <div className="h-full">
                            <div className="h-full w-full flex text-3xl font-extrabold mt justify-center items-center bg-gray-200">
                                Loading......

                            </div>
                        </div>

                    </div>
                    <div className="h-[270px] lg:h-[470px] w-full lg:w-[270px] shadow-2xl flex flex-col gap-5 justify-center items-center  rounded-lg">

                        <div className="flex lg:flex-col gap-5 lg:gap-3">
                            <button className="px-5 w-36 h-10 py-2 font-bold text-white bg-gray-200 rounded-3xl"></button>
                            <button className="px-5 py-2 w-36 h-10 font-bold bg-gray-200 border   rounded-3xl"></button>
                        </div>

                        <div className="flex lg:flex-col gap-5 lg:gap-3">
                            <div className="w-16 h-6 bg-gray-200">

                            </div>
                            <div className="w-16 h-6 bg-gray-200">

                            </div>
                            <div className="w-16 h-6 bg-gray-200">

                            </div>
                        </div>

                    </div>



                </div>
            </div>

        </>

    )
}

export default LoadingUploadImage;