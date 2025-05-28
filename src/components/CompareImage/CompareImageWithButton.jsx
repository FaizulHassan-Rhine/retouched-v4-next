import React, { useEffect, useRef } from "react";
import { useState } from 'react';
import "./style.css";
import color from '../../images/color.png';
import transparent from '../../images/transparent.jpg'
import { FaCropAlt } from "react-icons/fa";

const CompareImageWithButton = ({ topImage, bottomImage }) => {
    const [showImage1, setShowImage1] = useState(true);
    const [isAfterButtonDisabled, setIsAfterButtonDisabled] = useState(true);
    const [isBeforeButtonDisabled, setIsBeforeButtonDisabled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const afterImage = () => {
        setShowImage1(!showImage1);
        setIsAfterButtonDisabled(true);
        setIsBeforeButtonDisabled(false);
    };
    const beforeImage = () => {
        setShowImage1(!showImage1);
        setIsBeforeButtonDisabled(true);
        setIsAfterButtonDisabled(false);
    };

    return (
        <>
            <div className="h-full">
                <div className="flex absolute bottom-[100%] bg-gray-100 shadow-lg mb-2 rounded-[4px] p-1">
                    <button className="px-4 py-1   rounded-[4px] bg-gray-100   disabled:bg-[#D6F2D8] " onClick={beforeImage} disabled={isBeforeButtonDisabled} >Before</button>
                    <button className="px-4 py-1  rounded-[4px] bg-gray-100  disabled:bg-[#D6F2D8] " onClick={afterImage} disabled={isAfterButtonDisabled}>After</button>
                </div>
                <div className="relative h-full">

                    <img src={topImage} alt="Image 1" className={`${showImage1 ? "opacity-0" : "opacity-1"} transition-all duration-500 absolute top-[50%]`} style={{ transform: "translateY(-50%)" }} />
                    <img src={bottomImage} alt="Image 2" className={`${showImage1 ? "opacity-1" : "opacity-0"} transition-all duration-500 absolute top-[50%]`} style={{ transform: "translateY(-50%)" }} />

                    {/* {showImage1 ? (
                        <img src={topImage} alt="Image 1" />

                    ) : (
            
                    <img src={bottomImage} alt="Image 2" />

                    )} */}
                    <button
                        className="absolute top-2  right-2 bg-gray-200 overflow-hidden rounded-2xl crop-btn"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(true)}
                    >
                        <div className="flex items-center text-base  ml-3 w-40 ">
                            <FaCropAlt className="mr-[14px]" />
                            {isHovered && <span className=" text-black  text-xs">Crop/Choose area</span>}

                        </div>
                    </button>

                </div>

                {/* <div className="flex gap-3 absolute bottom-[100%]  mb-2 right-[-80%]">
                    <button className=" border-slate-300 rounded-full">
                        <img className="rounded-full  h-8 w-8" src={transparent} />
                    </button>
                    <button className="h-8 w-8 bg-white border border-slate-300 rounded-full"></button>
                    <button className="h-8 w-8 bg-red-600 border border-slate-300 rounded-full"></button>
                    <button className="h-8 w-8 bg-green-600 border border-slate-300 rounded-full"></button>
                    <button className="h-8 w-8 bg-blue-600 border border-slate-300 rounded-full"></button>

                    <button className="  border-slate-300 rounded-full">
                        <img className="rounded-full h-8 w-8" src={color} />
                    </button>
                </div> */}
            </div>

        </>
    );
};

export default CompareImageWithButton;
