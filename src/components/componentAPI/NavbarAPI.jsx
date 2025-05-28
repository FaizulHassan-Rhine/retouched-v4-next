
import Link from 'next/link';


const NavbarAPI = () => {
    return (
        <>
            <div className="lg:sticky top-0 bg-white z-50">
                <div className="hidden lg:flex bg-white h-[93px] border-b border-[#000]">
                    <nav className=" w-full flex relative justify-start items-center gap-[127px]  pl-[117px] mx-auto ">
                        {/* Logo */}
                        <Link href="/" className=" flex justify-center items-center gap-[8px]">
                            <img className="w-[230px] h-[48px] " src="./images/newlogoBlack.png" />
                            {/* <h1 className="text-[34px] leading-[24px] font-bold font-anek-latin text-[#255646]">Resources</h1> */}
                        </Link>

                        {/* Search Bar */}
                        <div className="">
                            <ul className="flex justify-center items-center gap-[56px] text-[20px] leading-[24px] h-[24px] lg:pl-10 font-ibm-plex  font-normal   text-[#000]">
                                <Link href={"#"} className="cursor-pointer text-[#009665] font-semibold hover:text-[#009665] hover:font-semibold">API</Link>
                                <Link href={"#"} className="cursor-pointer hover:text-[#009665] hover:font-semibold">SKD</Link>
                                <Link href={"#"} className="cursor-pointer hover:text-[#009665] hover:font-semibold">UI Component</Link>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className="">
                    <div className="flex flex-col gap-4 lg:hidden">
                    <Link href="/" className="flex justify-center items-center pt-5">
                            <img className="w-[230px] h-[48px] " src="./images/newlogoBlack.png" />
                            {/* <h1 className="text-[34px] leading-[24px] font-bold font-anek-latin text-[#255646]">Resources</h1> */}
                            </Link>
                        <div>
                            {/* <div className="border-y border-[#000] px-6">
                                <ul className="flex items-center py-[10px] gap-[23px] text-base font-normal font-ibm-plex text-black">
                                    <Link href={"/api-resources/retouched"} className="cursor-pointer flex-shrink-0  hover:text-[#009665] hover:font-bold">Retouched.ai</Link>
                                    <Link href={"#"} className="cursor-pointer flex-shrink-0  hover:text-[#009665] hover:font-bold">KowToMate</Link>
                                    <Link href={"#"} className="cursor-pointer flex-shrink-0  hover:text-[#009665] hover:font-bold">Holosnap</Link>
                                </ul>
                            </div> */}
                            {/* <div className="border-b border-[#000] px-6 sticky top-0">
                                <ul className="anek-latin-font flex items-center font-ibm-plex text-base font-normal gap-8 py-[10px]">
                                    <li><Link href="#" className="text-[#009665] font-[700] hover:font-[700] hover:text-[#009665]">API</Link></li>
                                    <li><Link href="#" className="font-[400] hover:font-[700] hover:text-[#009665]">SDK</Link></li>
                                    <li><Link href="#" className="font-[400] hover:font-[700] hover:text-[#009665]">UI Component</Link></li>
                                </ul>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center lg:hidden border-b border-[#000] px-6 sticky top-0 bg-white z-20">
                <ul className="anek-latin-font flex items-center font-ibm-plex text-base font-normal gap-8 py-[10px]">
                    <li><Link href="#" className="text-[#009665] font-[700] hover:font-[700] hover:text-[#009665]">API</Link></li>
                    <li><Link href="#" className="font-[400] hover:font-[700] hover:text-[#009665]">SDK</Link></li>
                    <li><Link href="#" className="font-[400] hover:font-[700] hover:text-[#009665]">UI Component</Link></li>
                </ul>
            </div>
        </>
    );
};

export default NavbarAPI;