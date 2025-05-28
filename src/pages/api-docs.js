
import SectionFive from "@/components/componentAPI/Content/SectionFive";
import SectionFourPartFive from "@/components/componentAPI/Content/SectionFourPartFive";
import SectionFourPartFour from "@/components/componentAPI/Content/SectionFourPartFour";
import SectionFourPartOne from "@/components/componentAPI/Content/SectionFourPartOne";
import SectionFourPartThree from "@/components/componentAPI/Content/SectionFourPartThree";
import SectionFourPartTwo from "@/components/componentAPI/Content/SectionFourPartTwo";
import SectionOne from "@/components/componentAPI/Content/SectionOne";
import SectionThree from "@/components/componentAPI/Content/SectionThree";
import SectionTwo from "@/components/componentAPI/Content/SectionTwo";
import ParagraphOne from "@/components/componentAPI/microComponent/ParagraphOne";
import NavbarAPI from "@/components/componentAPI/NavbarAPI";
import { useEffect, useRef, useState } from "react";

const APIDocs = () => {
    const [isSticky, setIsSticky] = useState(false);
    const boxRef = useRef(null);
    const [showButton, setShowButton] = useState(false);
    const [activeMenu, setActiveMenu] = useState("");

    const scrollAction = () => {
        const box_one_par = boxRef.current;
        if (!box_one_par) return; // Check if the box is defined

        // const box_one_par = document.querySelector(`#box_two`);
        const windowHeight = window.innerHeight;
        const elementTop = box_one_par.getBoundingClientRect().top;

        console.log(
            "window hegith ", windowHeight,
            "visible", elementTop
        );

        // if (elementTop < windowHeight - offset) {
        if (elementTop < 0) {
            console.log("Testing iiii :")
            setShowButton(window.scrollY > 600);
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }

    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

 

    const handleSidebarMenu = (id) => {
        setActiveMenu(id);
        const targetElement = document.getElementById(id);

        window.scrollTo({
            top: targetElement.offsetTop + 30, // Adjust the offset value to match your fixed element's height
            behavior: 'smooth'
        });
    }

    return (
        <div className="overflow-visible">

            <NavbarAPI />

            <div ref={boxRef} className="min-h-screen">
                <div className="flex h-full relative">
                    {/* sidebar */}
                    <div  className="fixed hidden lg:block z-40 h-full left-0 top-[91px] pl-[120px] pr-[33px] pt-[51px] border-r-[1px] border-[#1E1E1E]">
                        <div className="w-[308px] flex flex-col gap-[42px]">
                            <ParagraphOne>In this section, you will find the following detailed information</ParagraphOne>
                            <div className="flex flex-col gap-[33px]">
                                <a onClick={() => handleSidebarMenu("api-resources")} className={`flex gap-3 group cursor-pointer hover:text-[#009665] ${activeMenu == "api-resources" && 'text-[#009665]'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={`group-hover:fill-[#009665] ${activeMenu == "api-resources" && 'fill-[#009665]'}`}>
                                        <path d="M20 8.25V18C20 21 18.21 22 16 22H8C5.79 22 4 21 4 18V8.25C4 5 5.79 4.25 8 4.25C8 4.87 8.24997 5.43 8.65997 5.84C9.06997 6.25 9.63 6.5 10.25 6.5H13.75C14.99 6.5 16 5.49 16 4.25C18.21 4.25 20 5 20 8.25Z" className={`stroke-[#292D32] group-hover:stroke-white ${activeMenu == "api-resources" && 'stroke-white'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M16 4.25C16 5.49 14.99 6.5 13.75 6.5H10.25C9.63 6.5 9.06997 6.25 8.65997 5.84C8.24997 5.43 8 4.87 8 4.25C8 3.01 9.01 2 10.25 2H13.75C14.37 2 14.93 2.25 15.34 2.66C15.75 3.07 16 3.63 16 4.25Z" className={`stroke-[#292D32] group-hover:stroke-white  ${activeMenu == "api-resources" && 'stroke-white'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M8 13H12" className={`stroke-[#292D32] group-hover:stroke-white  ${activeMenu == "api-resources" && 'stroke-white'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M8 17H16" className={`stroke-[#292D32] group-hover:stroke-white  ${activeMenu == "api-resources" && 'stroke-white'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span className="font-anek-latin text-base font-normal">API Resources</span>
                                </a>
                                <a onClick={() => handleSidebarMenu("api-endpoint")} className={`flex gap-3 group  cursor-pointer hover:text-[#009665] ${activeMenu == "api-endpoint" && 'text-[#009665]'}`}>
                                    <svg className={`group-hover:fill-[#009665]  ${activeMenu == "api-endpoint" && 'fill-[#009665]'}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M6.36997 9.50993C2.28997 9.79993 2.29997 15.7099 6.36997 15.9999H16.03C17.2 16.0099 18.33 15.5699 19.2 14.7799C22.06 12.2799 20.53 7.27991 16.76 6.79991C15.41 -1.34009 3.61998 1.74993 6.40998 9.50993" className={` group-hover:stroke-white ${activeMenu == "api-endpoint" ? 'stroke-white' : 'stroke-[#292D32]'}`} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 16V19" className={` group-hover:stroke-[#009665]  ${activeMenu == "api-endpoint" ? 'stroke-[#009665]' : 'stroke-[#292D32]'}`} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 23C13.1046 23 14 22.1046 14 21C14 19.8954 13.1046 19 12 19C10.8954 19 10 19.8954 10 21C10 22.1046 10.8954 23 12 23Z" className={`group-hover:stroke-[#009665] ${activeMenu == "api-endpoint" ? 'stroke-[#009665]' : 'stroke-[#292D32]'}`} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M18 21H14"
                                            className={`group-hover:stroke-[#009665] ${activeMenu == "api-endpoint" ? 'stroke-[#009665]' : 'stroke-[#292D32]'}`} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M10 21H6"
                                            className={` group-hover:stroke-[#009665] ${activeMenu == "api-endpoint" ? 'stroke-[#009665]' : 'stroke-[#292D32]'}`} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span className="font-anek-latin text-base font-normal">API Endpoints Overview</span>
                                </a>
                                <a onClick={() => handleSidebarMenu("detailed-endpoint")} className={`flex gap-3 group cursor-pointer hover:text-[#009665] ${activeMenu == "detailed-endpoint" && 'text-[#009665]'}`}>
                                    <svg className={`group-hover:fill-[#009665] ${activeMenu == "detailed-endpoint" && 'fill-[#009665]'}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M8.5 18.97H8C4 18.97 2 17.97 2 12.97V7.96997C2 3.96997 4 1.96997 8 1.96997H16C20 1.96997 22 3.96997 22 7.96997V12.97C22 16.97 20 18.97 16 18.97H15.5C15.19 18.97 14.89 19.12 14.7 19.37L13.2 21.37C12.54 22.25 11.46 22.25 10.8 21.37L9.29999 19.37C9.13999 19.15 8.78 18.97 8.5 18.97Z" className={` group-hover:stroke-[#009665] ${activeMenu == "detailed-endpoint" ? 'stroke-[#009665]' : 'stroke-[#292D32]'}`} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M8 8.69995L6 10.7L8 12.7" className={`stroke-[#292D32] group-hover:stroke-white ${activeMenu == "detailed-endpoint" && 'stroke-white'}`} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M16 8.69995L18 10.7L16 12.7" className={`stroke-[#292D32] group-hover:stroke-white  ${activeMenu == "detailed-endpoint" && 'stroke-white'}`} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M13 8.37L11 13.03" className={`stroke-[#292D32] group-hover:stroke-white  ${activeMenu == "detailed-endpoint" && 'stroke-white'}`} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span className="font-anek-latin text-base font-normal">Detailed Endoints Description</span>
                                </a>
                                <a onClick={() => handleSidebarMenu("conclusion")} className={`flex gap-3 group cursor-pointer hover:text-[#009665] ${activeMenu == "conclusion" && 'text-[#009665]'}`}>
                                    <svg className={`group-hover:fill-[#009665] ${activeMenu == "conclusion" && 'fill-[#009665]'}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M14.9 2H9.10001C8.42001 2 7.46 2.4 6.98 2.88L2.88 6.98001C2.4 7.46001 2 8.42001 2 9.10001V14.9C2 15.58 2.4 16.54 2.88 17.02L6.98 21.12C7.46 21.6 8.42001 22 9.10001 22H14.9C15.58 22 16.54 21.6 17.02 21.12L21.12 17.02C21.6 16.54 22 15.58 22 14.9V9.10001C22 8.42001 21.6 7.46001 21.12 6.98001L17.02 2.88C16.54 2.4 15.58 2 14.9 2Z" className={`stroke-[#292D32] group-hover:stroke-white ${activeMenu == "conclusion" && 'stroke-white'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M8.5 15.5L15.5 8.5" className={`stroke-[#292D32] group-hover:stroke-white ${activeMenu == "conclusion" && 'stroke-white'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M15.5 15.5L8.5 8.5" className={`stroke-[#292D32] group-hover:stroke-white ${activeMenu == "conclusion" && 'stroke-white'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span className="font-anek-latin text-base font-normal">Conclusion</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* main content*/}
                    <div className="w-full">
                        <div className="flex flex-col">
                            

                            <div className="w-full lg:w-[550px] xl:w-[750px] 2xl:w-[1000px] px-6 lg:px-0 lg:ml-[514px] mt-[31px] lg:mt-[49px] pb-[47px]">
                                <div className="flex flex-col gap-[28px]">
                                    <SectionOne />
                                    <hr className="w-full"></hr>
                                    <div id="api-resources">
                                        <SectionTwo />
                                    </div>
                                    <hr className="w-full "></hr>
                                    <div id="api-endpoint"><SectionThree /></div>
                                    <hr className="w-full "></hr>
                                    <div id="detailed-endpoint"><SectionFourPartOne /></div>
                                    {/* <hr className="w-full "></hr> */}
                                    <SectionFourPartTwo />
                                    {/* <hr className="w-full "></hr> */}
                                    <SectionFourPartThree />
                                    {/* <hr className="w-full "></hr> */}
                                    <SectionFourPartFour />
                                    {/* <hr className="w-full "></hr> */}
                                    <SectionFourPartFive />
                                    <hr className="w-full "></hr>
                                    <div id="conclusion"><SectionFive /></div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Up Arrow Button */}
            {showButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4  bg-[#00AC74] text-white rounded-full shadow-xl  hover:bg-[#00D690] focus:outline-none"
                >
                    <svg className="group-hover:fill-[#00D690]" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="" />
                        <path d="M31.0599 21.94L25.0599 15.94C24.4799 15.36 23.5199 15.36 22.9399 15.94L16.9399 21.94C16.3599 22.52 16.3599 23.48 16.9399 24.06C17.5199 24.64 18.4799 24.64 19.0599 24.06L22.4999 20.62V31C22.4999 31.82 23.1799 32.5 23.9999 32.5C24.8199 32.5 25.4999 31.82 25.4999 31V20.62L28.9399 24.06C29.2399 24.36 29.6199 24.5 29.9999 24.5C30.3799 24.5 30.7599 24.36 31.0599 24.06C31.6399 23.48 31.6399 22.52 31.0599 21.94Z" fill="#292D32" />
                    </svg>
                </button>
            )}

        </div>
    );
};

export default APIDocs;