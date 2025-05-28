import React from 'react';
import kowlogo from "/images/logo_2.png"
import retouchedlogo from "/images/logo_white.png"


const FooterOld = () => {
    const learnMoreList = [
        { text: "Magic Brush", link: "#" },
        { text: "Individuals", link: "#" },
        { text: "Photographers", link: "#" },
        { text: "Marketing", link: "#" },
        { text: "Developers", link: "#" },
        { text: "Ecommerce", link: "#" },
        { text: "Media", link: "#" },
        { text: "Car Dealerships", link: "#" },
        { text: "Enterprise", link: "#" },
        { text: "Success stories", link: "#" }
    ]
    const resourcesList = [
        { text: "API Documentation", link: "#" },
        { text: "Integrations, tools & apps", link: "#" },
        { text: "Photoshop Extension", link: "#" },
        { text: "Windows / Mac / Linux", link: "#" },
        { text: "Android App", link: "#" },
        { text: "Design Templates", link: "#" },
    ]

    const supportList = [
        { text: "Help & FAQs", link: "#" },
        { text: "Contact us", link: "#" },
        { text: "Refunds", link: "#" },
        { text: "Platform Status", link: "#" }
    ]
    const companyList = [
        { text: "Blog", link: "#" },
        { text: "Affiliate Program", link: "#" },
        { text: "Create automatic designs", link: "#" },
        { text: "Video Background Removal", link: "#" },
        { text: "Careers", link: "#" },
        { text: "About us", link: "#" },
        { text: "Press", link: "#" },
    ]

    return (
        <>
            <div className="bg-[#255646] pt-16 pb-[101px]">
                <div className='container mx-auto px-3 md:px-0'>
                    <div className='flex flex-col gap-11 lg:gap-0'>
                        <div className='text-center md:text-left flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-11 lg:gap-0 justify-center text-white'>

                            <div className='flex flex-col gap-4 items-center'>
                                <div className='flex flex-col gap-4'>
                                    <h4 className='text-base font-bold'>Learn More</h4>
                                    <ul className='flex flex-col text-xs font-normal list-disc list-inside underline gap-4'>
                                        {
                                            learnMoreList.map((d) => (<li><Link to={d.link}>{d.text}</Link></li>))
                                        }
                                    </ul>
                                </div>
                            </div>

                            <div className='flex flex-col gap-4 items-center'>
                                <div className='flex flex-col gap-4'>

                                    <h4 className='text-base font-bold'>Resources</h4>
                                    <ul className='flex flex-col text-xs font-normal list-disc list-inside underline gap-4'>
                                        {
                                            resourcesList.map((d) => (<li><Link to={d.link}>{d.text}</Link></li>))
                                        }
                                    </ul>
                                </div>
                            </div>

                            <div className='flex flex-col gap-4 items-center'>
                                <div className='flex flex-col gap-4'>

                                    <h4 className='text-base font-bold'>Support</h4>
                                    <ul className='flex flex-col text-xs font-normal list-disc list-inside underline gap-4'>
                                        {
                                            supportList.map((d) => (<li><Link to={d.link}>{d.text}</Link></li>))
                                        }
                                    </ul>
                                </div>
                            </div>

                            <div className='flex flex-col gap-4 items-center'>
                                <div className='flex flex-col gap-4'>

                                    <h4 className='text-base font-bold'>Company</h4>
                                    <ul className='flex flex-col text-xs font-normal list-disc list-inside underline gap-4'>
                                        {
                                            companyList.map((d) => (<li><Link to={d.link}>{d.text}</Link></li>))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className=' lg:pr-[50px] flex flex-col md:flex-row justify-center items-center lg:justify-end text-white gap-4 md:gap-[47px] font-jakarta text-xs font-medium underline '>
                            <Link to={"#"}>Terms of Service</Link>
                            <Link to={"#"}>General Terms and Conditions</Link>
                            <Link to={"#"}>Privacy Policy</Link>
                            <Link to={"#"}>Imprint</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default FooterOld;