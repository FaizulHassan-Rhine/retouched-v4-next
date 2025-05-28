import React, { useState } from 'react';
import GridBoxOne from '../GridBox/GridBoxOne';
import ButtonOne from '../ButtonOne/ButtonOne';

const Features = () => {
    const [limit, setLimit] = useState(5); 
    const featuresList = [
            {
                id: 1,
                title: "Free Background Removal",
                description: "Say goodbye to unwanted distractions! Effortlessly remove backgrounds to make your products, portraits, or designs stand out.",
                icon: "/images/v-4/icons/ph_selection-background.svg",
                videoUrl: "/videos/feature-1.mp4",
            },
            {
                id: 2,
                title: "Professional Touch-up",
                description: "For those perfect finishing touches, rely on our team of expert retouchers. Get detailed, handcrafted edits for a flawless and professional look to your clicks.",
                icon: "/images/v-4/icons/f7_wand-rays.svg",
                videoUrl: "/videos/feature-2.mp4",
            },
            {
                id: 3,
                title: "Preset Backgrounds",
                description: "Say goodbye to distractions and make your products or photos pop!",
                icon: "/images/v-4/icons/mingcute_background-line.svg",
                videoUrl: "/videos/feature-1.mp4",
            },
            {
                id: 4,
                title: "Smart Resize",
                description: "Easily adjust your images to fit any platform or project. Whether it’s for social media, print or web, our resizing tool ensures flawless dimensions every time.",
                icon: "/images/v-4/icons/fluent_resize-large-16-regular.svg",
                videoUrl: "/videos/feature-2.mp4",
            },
            {
                id: 5,
                title: "AI Background Generation",
                description: "Bring your imagination to life with AI-generated backgrounds—perfectly tailored to fit your creative vision. From realistic to abstract, the possibilities are endless.",
                icon: "/images/v-4/icons/streamline_ai-generate-landscape-image-spark.svg",
                videoUrl: "/videos/feature-1.mp4",
            },
            {
                id: 6,
                title: "Download In Multiple Formats",
                description: "From PNG to JPG, TIFF to PSD, we ensure your visuals are optimized for web, print, or social media, making them easy to use across all your marketing channels.",
                icon: "/images/v-4/icons/hugeicons_image-download-02.svg",
                videoUrl: "/videos/feature-2.mp4",
            },
        
            {
                id: 7,
                title: "Free Background Removal",
                description: "Say goodbye to distractions and make your products or photos pop!",
                icon: "/images/v-4/icons/ph_selection-background.svg",
                videoUrl: "/videos/feature-1.mp4",
            },
            {
                id: 8,
                title: "Pro Touch",
                description: "We bring expert editing, color correction, and fine-tuning to your photos, ensuring they look polished and professional.",
                icon: "/images/v-4/icons/f7_wand-rays.svg",
                videoUrl: "/videos/feature-2.mp4",
            },
            {
                id: 9,
                title: "Free Background Removal",
                description: "Say goodbye to distractions and make your products or photos pop!",
                icon: "/images/v-4/icons/ph_selection-background.svg",
                videoUrl: "/videos/feature-1.mp4",
            },
            {
                id: 10,
                title: "Pro Touch",
                description: "We bring expert editing, color correction, and fine-tuning to your photos, ensuring they look polished and professional.",
                icon: "/images/v-4/icons/f7_wand-rays.svg",
                videoUrl: "/videos/feature-2.mp4",
            },
            {
                id: 11,
                title: "Free Background Removal",
                description: "Say goodbye to distractions and make your products or photos pop!",
                icon: "/images/v-4/icons/ph_selection-background.svg",
                videoUrl: "/videos/feature-1.mp4",
            },
            {
                id: 12,
                title: "Pro Touch",
                description: "We bring expert editing, color correction, and fine-tuning to your photos, ensuring they look polished and professional.",
                icon: "/images/v-4/icons/f7_wand-rays.svg",
                videoUrl: "/videos/feature-2.mp4",
            }
    ];

    const learnMoreHandle = () => {
        featuresList.length > limit ? setLimit(limit + 3) : setLimit(featuresList.length);
    }

    const lessMoreHandle = () =>{
        setLimit(limit - 3);
    }
    return (
        <div className='bg-[#87e17f33] pt-[21px] pb-[62px]'>
            <div className='container mx-auto px-3 md:px-0'>
                <div className='flex flex-col gap-[30px]'>
                    <div className='flex flex-col items-center lg:items-start  gap-[9px] pb-[40px] md:pb-0'>
                        <h1 className='font-jakarta font-bold text-[32px] lg:text-4xl'>Features</h1>
                        <p className='text-[#5A5555] text-[18px] lg:text-xl  font-semibold text-center leading-[100] lg:text-left'>Discover powerful tools designed to simplify your workflow and elevate your creativity.</p>
                    </div>
                    <div className='flex flex-col lg:grid lg:grid-cols-3 md:gap-x-[40px]  lg:gap-x-[80px] 2xl:gap-x-[140px] gap-y-[56px] px-[20px] md:px-0'>
                        { featuresList.map((feature, index) =>
                             index <= limit && 
                             <GridBoxOne key={feature.id} icon={feature.icon} title={feature.title} description={feature.description} videoUrl={feature.videoUrl} />
                             ) }
                    </div>
                    <div className='pt-[34px] flex justify-center'>
                    { featuresList.length -1 > limit ?
                    <ButtonOne name={'Learn More'} className={'px-[40px]'} onClick={learnMoreHandle}/>
                    //  <button onClick={learnMoreHandle} className='bg-[#255646] border-[1px] border-solid border-black py-[14px] px-[40px] text-sm font-medium leading-none rounded text-white'>Learn More</button>
                    : 
                    <ButtonOne name={'Less More'} className={'px-[40px]'}  onClick={lessMoreHandle}/>
                    // <button onClick={lessMoreHandle} className='bg-[#255646] border-[1px] border-solid border-black py-[14px] px-[40px] text-sm font-medium leading-none rounded text-white'>Less More</button>
}   
                     </div>
                </div>
            </div>
        </div>
    );
};

export default Features;