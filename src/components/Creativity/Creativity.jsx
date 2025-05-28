import React from 'react';

const Creativity = () => {

    const creatifyList = [
        {
            id: 1,
            icon: '/images/v-4/icons/creativity/fluent_magic-wand-16-regular.svg',
            title: "For Creative Individuals"
        },
        {
            id: 2,
            icon: '/images/v-4/icons/creativity/iconoir_lens.svg',
            title: "For Photographers"
        },
        {
            id: 1,
            icon: '/images/v-4/icons/creativity/hugeicons_marketing.svg',
            title: "For Marketing"
        },
        {
            id: 1,
            icon: '/images/v-4/icons/creativity/solar_tv-linear.svg',
            title: "For Media"
        },
        {
            id: 1,
            icon: '/images/v-4/icons/creativity/mynaui_store.svg',
            title: "For Ecommerce"
        },
        {
            id: 1,
            icon: '/images/v-4/icons/creativity/fluent_code-16-regular.svg',
            title: "For Developers"
        },

        {
            id: 1,
            icon: '/images/v-4/icons/creativity/hugeicons_car-01.svg',
            title: "For Car Dealerships"
        },

        {
            id: 1,
            icon: '/images/v-4/icons/creativity/carbon_building.svg',
            title: "For Enterprise"
        },
    ]

    return (
        <div className='bg-[#87e17f33] pt-[62px] pb-[58px]'>
            <div className='container mx-auto px-3 md:px-0'>
                <div className='flex flex-col'>
                    <div className='flex flex-col gap-[9px] pb-20 text-center lg:text-left lg:w-[919px]'>
                        <h1 className='font-jakarta font-bold text-4xl'>Ramp up the creativity - and efficiency!</h1>
                        <p className='text-[#5A5555] text-xl font-semibold'>Whether you want to make a mind-blowing greetings card for your bestie or to power through thousands of car photos in next to no time, remove.bg makes it happen.</p>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='gap-[51px] flex justify-center flex-wrap w-[940px]'>
                            {
                                creatifyList.map((item, index) => (
                                    <div className='flex gap-2 py-4 px-3 items-center border-[2px] border-solid border-black rounded-xl'>
                                        <span>
                                            <img src={item.icon} alt="" />
                                        </span>
                                        <span className='text-[22px] font-bold'>{item.title}</span>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Creativity;