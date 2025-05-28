import React, { useState } from 'react';

const UploadImageStatic = () => {

    const [featrueSwitch, setFeatureSwitch] = useState('protouch'); // protouch, presets, gnbg, resize
    const [presetSwitch, setPresetSwitch] = useState('colours'); // colours, background

    const imageList = [
        '/images/v-4/junk/test (1).jpg',
        '/images/v-4/junk/test (2).jpg',
        '/images/v-4/junk/test (3).jpg',
        '/images/v-4/junk/test (4).jpg',
        '/images/v-4/junk/test (5).jpg',
        '/images/v-4/junk/test (6).jpg',
        '/images/v-4/junk/test (7).jpg',
        '/images/v-4/junk/test (1).jpg',
        '/images/v-4/junk/test (2).jpg',
        '/images/v-4/junk/test (3).jpg',
        '/images/v-4/junk/test (4).jpg',
        '/images/v-4/junk/test (5).jpg',
        '/images/v-4/junk/test (6).jpg',
        '/images/v-4/junk/test (7).jpg',
        '/images/v-4/junk/test (1).jpg',
        '/images/v-4/junk/test (2).jpg',
        '/images/v-4/junk/test (3).jpg',
        '/images/v-4/junk/test (4).jpg',
        '/images/v-4/junk/test (5).jpg',
        '/images/v-4/junk/test (6).jpg',
        '/images/v-4/junk/test (7).jpg',
    ]
    const [colorList] = useState([
        "#EA4335",
        "#FBBC05",
        "#FF7A00",
        "#34A853",
        "#E435EA",
        "#4285F4",
        "#35EAB7"
    ]);

    const [presetRowImgList] = useState([
        '/images/images/presetrow/1.jpg',
        '/images/images/presetrow/2.jpg',
        '/images/images/presetrow/3.jpg',
        '/images/images/presetrow/4.jpg',
        '/images/images/presetrow/5.jpg',
        '/images/images/presetrow/6.jpg',
        '/images/images/presetrow/7.jpg',
        '/images/images/presetrow/8.jpg',
        // '/images/images/presetrow/9.jpg',
        // '/images/images/presetrow/10.jpg',
        // '/images/images/presetrow/11.jpg',
        // '/images/images/presetrow/12.jpg',
        // '/images/images/presetrow/13.jpg',
        // '/images/images/presetrow/14.jpg',
        // '/images/images/presetrow/15.jpg',
        // '/images/images/presetrow/16.jpg',
        // '/images/images/presetrow/17.jpg'
    ])
    const featureSwitchHandler = (feature) => {
        setFeatureSwitch(feature);
    }

    const presetSwitchHandler = (preset) => {
        setPresetSwitch(preset);
    }
    return (
        <div>
            <div className='flex flex-col'>
                <div className='border-b-[1px] border-solid border-black'>
                    <div className='container mx-auto'>
                        <div className='grid grid-cols-[300px_auto_287px]  '>
                            <div className='flex flex-col border-r-[1px] border-solid border-black'>
                                <div className='flex flex-col gap-2 pt-[17px] pb-2 border-b-[1px] border-solid border-[#CCCBCB]'>
                                    <h3 className='text-2xl font-bold font-jakarta leading-7'>Your Uploaded Photos</h3>
                                    <div className='flex gap-[5px] items-center'>
                                        <span><img src="/images/v-4/icons/tabler_progress.svg" alt="" /></span>
                                        <p className='text-[#5A5555] text-sm font-medium leading-none'><span>6</span>/<span>120</span> Images Processed</p>
                                    </div>
                                </div>
                                <div className='h-[430px] grid grid-cols-3 gap-x-[22px] gap-y-[16px] pt-[20px] overflow-y-auto'>
                                    <button className='w-[78px] h-[55px] bg-[#87E17F] border-[2px] border-solid border-[#34A853] flex justify-center items-center rounded overflow-hidden'>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.34502 4.017C10.4389 3.67445 13.5611 3.67445 16.655 4.017C18.368 4.209 19.75 5.558 19.951 7.277C20.3176 10.415 20.3176 13.585 19.951 16.723C19.75 18.442 18.368 19.791 16.655 19.983C13.5611 20.3256 10.4389 20.3256 7.34502 19.983C5.63202 19.791 4.25002 18.442 4.04902 16.723C3.68247 13.5853 3.68247 10.4157 4.04902 7.278C4.15069 6.44287 4.5314 5.66655 5.12945 5.07485C5.7275 4.48315 6.50785 4.11075 7.34402 4.018M12 7.007C12.1989 7.007 12.3897 7.08602 12.5303 7.22667C12.671 7.36732 12.75 7.55809 12.75 7.757V11.25H16.243C16.4419 11.25 16.6327 11.329 16.7733 11.4697C16.914 11.6103 16.993 11.8011 16.993 12C16.993 12.1989 16.914 12.3897 16.7733 12.5303C16.6327 12.671 16.4419 12.75 16.243 12.75H12.75V16.243C12.75 16.4419 12.671 16.6327 12.5303 16.7733C12.3897 16.914 12.1989 16.993 12 16.993C11.8011 16.993 11.6103 16.914 11.4697 16.7733C11.329 16.6327 11.25 16.4419 11.25 16.243V12.75H7.75702C7.55811 12.75 7.36734 12.671 7.22669 12.5303C7.08604 12.3897 7.00702 12.1989 7.00702 12C7.00702 11.8011 7.08604 11.6103 7.22669 11.4697C7.36734 11.329 7.55811 11.25 7.75702 11.25H11.25V7.757C11.25 7.55809 11.329 7.36732 11.4697 7.22667C11.6103 7.08602 11.8011 7.007 12 7.007Z" fill="#255646" />
                                        </svg></span>
                                    </button>
                                    {
                                        imageList.map((item, index) =>

                                            <button key={index} className='relative w-[78px] h-[55px] flex justify-center items-center rounded overflow-hidden'>
                                                <img src={item} alt="" />
                                                <span className='absolute bottom-1 right-1'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M12.6667 2C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H12.6667ZM11.1333 6.23333C11.28 6.09333 11.28 5.86 11.1333 5.72L10.28 4.86667C10.247 4.83176 10.2072 4.80396 10.1631 4.78496C10.1189 4.76596 10.0714 4.75616 10.0233 4.75616C9.97529 4.75616 9.92774 4.76596 9.88361 4.78496C9.83948 4.80396 9.79969 4.83176 9.76667 4.86667L9.1 5.53333L10.4667 6.9L11.1333 6.23333ZM4.66667 9.96V11.3333H6.04L10.08 7.29333L8.70667 5.92L4.66667 9.96Z" fill="#FBBC05" />
                                                    </svg>
                                                </span>
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                            <div className='px-8 py-4 flex flex-col gap-[18px]'>
                                <div className='w-full h-[496px] border-[2px] border-solid border-[#5A5555] rounded-xl'></div>
                                <div className='flex justify-center items-center'>
                                    <div className='flex justify-between items-center gap-[29px]'>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M4.5 8H15C15 8 20 8 20 12.706C20 18 15 18 15 18H6.286" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7.5 11.5L4 8L7.5 4.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M19.5 8H9C9 8 4 8 4 12.706C4 18 9 18 9 18H17.714" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M16.5 11.5L20 8L16.5 4.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <g clip-path="url(#clip0_207_457)">
                                                    <path d="M12.5 23L12.5 1M9.4 21C7.16 21 6.04 21 5.184 20.564C4.43139 20.1805 3.81949 19.5686 3.436 18.816C3 17.96 3 16.84 3 14.6L3 9.4C3 7.16 3 6.04 3.436 5.184C3.81949 4.43139 4.43138 3.81949 5.184 3.436C6.04 3 7.16 3 9.4 3L14.6 3C16.84 3 17.96 3 18.816 3.436C19.5686 3.81949 20.1805 4.43138 20.564 5.184C21 6.04 21 7.16 21 9.4L21 14.6C21 16.84 21 17.96 20.564 18.816C20.1805 19.5686 19.5686 20.1805 18.816 20.564C17.96 21 16.84 21 14.6 21L9.4 21Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_207_457">
                                                        <rect width="24" height="24" fill="white" transform="translate(0 24) rotate(-90)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </button>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M21 21L17 17M8 11H14M11 14V8M19 11C19 13.1217 18.1571 15.1566 16.6569 16.6569C15.1566 18.1571 13.1217 19 11 19C8.87827 19 6.84344 18.1571 5.34315 16.6569C3.84285 15.1566 3 13.1217 3 11C3 8.87827 3.84285 6.84344 5.34315 5.34315C6.84344 3.84285 8.87827 3 11 3C13.1217 3 15.1566 3.84285 16.6569 5.34315C18.1571 6.84344 19 8.87827 19 11Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M21 21L16.657 16.657M16.657 16.657C17.3998 15.9141 17.9891 15.0322 18.3912 14.0616C18.7932 13.0909 19.0002 12.0506 19.0002 11C19.0002 9.94942 18.7932 8.90911 18.3912 7.93848C17.9891 6.96785 17.3998 6.08591 16.657 5.34302C15.9141 4.60014 15.0321 4.01084 14.0615 3.6088C13.0909 3.20675 12.0506 2.99982 11 2.99982C9.94936 2.99982 8.90905 3.20675 7.93842 3.6088C6.96779 4.01084 6.08585 4.60014 5.34296 5.34302C3.84263 6.84335 2.99976 8.87824 2.99976 11C2.99976 13.1218 3.84263 15.1567 5.34296 16.657C6.84329 18.1574 8.87818 19.0002 11 19.0002C13.1217 19.0002 15.1566 18.1574 16.657 16.657ZM7.99996 11H14" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col pl-[30px] pt-[16px]'>
                                <div className='flex flex-col gap-[18px] pb-[19px] border-b-[1px] border-solid border-[#CCCBCB] '>
                                    <h3 className='font-jakarta text-2xl font-bold'>Select Format</h3>
                                    <div className='flex flex-col gap-4'>
                                        <div className="form-group form-check grid grid-cols-[20px_auto] gap-1">
                                            <input
                                                className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                type="radio"
                                                id="png"
                                                name="download_type"
                                            />
                                            <label htmlFor="png" className="cursor-pointer flex flex-col">
                                                <span className='font-jakarta text-base font-medium'>PNG</span>
                                                <span className='text-[#726C6C] text-xs font-bold'>Need a transparent background?</span>
                                                <span className='text-[#726C6C] text-xs font-medium leading-[14px]'>Download as PNG for crisp, high-quality images perfect for logos, graphics, and web use.</span>
                                            </label>
                                        </div>
                                        <div className="form-group form-check grid grid-cols-[20px_auto] gap-1">
                                            <input
                                                className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                type="radio"
                                                id="jpg"
                                                name="download_type"
                                            />
                                            <label htmlFor="jpg" className="cursor-pointer flex flex-col">
                                                <span className='font-jakarta text-base font-medium'>JPG</span>
                                                <span className='text-[#726C6C] text-xs font-bold'>Looking for smaller file sizes?</span>
                                                <span className='text-[#726C6C] text-xs font-medium leading-[14px]'>Choose JPG for easy sharing, faster loading, and great quality for photos or online content.</span>
                                            </label>
                                        </div>


                                        <div className="form-group form-check grid grid-cols-[20px_auto] gap-1">
                                            <input
                                                className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                type="radio"
                                                id="PSD"
                                                name="download_type"
                                            />
                                            <label htmlFor="PSD" className="cursor-pointer flex flex-col">
                                                <span className='font-jakarta text-base font-medium'>PSD</span>
                                                <span className='text-[#726C6C] text-xs font-bold'>Want to edit later?</span>
                                                <span className='text-[#726C6C] text-xs font-medium leading-[14px]'>Go with PSD to keep all layers intact for advanced editing in Photoshop.</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-[18px] pt-4'>
                                    <div className='flex flex-col gap-2'>
                                        <button className='border-[1px] border-solid border-black rounded bg-[#255646] py-[14px] flex justify-center items-center gap-[5px] text-sm text-white font-medium leading-none'>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                                                    <path d="M9.49995 8.62499V15M9.49995 15L11.75 12.75M9.49995 15L7.24995 12.75M6.49995 5.27699C7.06091 5.35808 7.58056 5.61856 7.9812 6.01949M13.625 10.5C14.7642 10.5 15.5 9.57674 15.5 8.43749C15.4999 7.98645 15.352 7.54786 15.0789 7.18889C14.8059 6.82993 14.4226 6.57037 13.988 6.44999C13.9211 5.60883 13.5725 4.81481 12.9985 4.19631C12.4245 3.5778 11.6587 3.17096 10.8248 3.04156C9.991 2.91215 9.13789 3.06776 8.40344 3.4832C7.66899 3.89865 7.09612 4.54966 6.77745 5.33099C6.10652 5.145 5.38919 5.23316 4.78326 5.57607C4.17733 5.91898 3.73243 6.48855 3.54645 7.15949C3.36047 7.83042 3.44863 8.54775 3.79154 9.15368C4.13445 9.75961 4.70402 10.2045 5.37495 10.3905" stroke="white" stroke-opacity="0.5" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </span>
                                            <span>Download</span>
                                        </button>
                                        <div className='flex items-center justify-center gap-[6px]'>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M6 4H6.004M6 8V5.5M11 6C11 8.7615 8.7615 11 6 11C3.2385 11 1 8.7615 1 6C1 3.2385 3.2385 1 6 1C8.7615 1 11 3.2385 11 6Z" stroke="#5B626C" stroke-width="0.875" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </span>
                                            <span className='text-[#5B626C] text-xs font-normal'>654x472 pixels</span>

                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <button className='border-[1px] border-solid border-black rounded bg-[#87E17F] py-[14px] flex justify-center items-center gap-[5px] text-sm text-black font-medium leading-none'>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                                                    <path d="M9.49995 8.62499V15M9.49995 15L11.75 12.75M9.49995 15L7.24995 12.75M6.49995 5.27699C7.06091 5.35808 7.58056 5.61856 7.9812 6.01949M13.625 10.5C14.7642 10.5 15.5 9.57674 15.5 8.43749C15.4999 7.98645 15.352 7.54786 15.0789 7.18889C14.8059 6.82993 14.4226 6.57037 13.988 6.44999C13.9211 5.60883 13.5725 4.81481 12.9985 4.19631C12.4245 3.5778 11.6587 3.17096 10.8248 3.04156C9.991 2.91215 9.13789 3.06776 8.40344 3.4832C7.66899 3.89865 7.09612 4.54966 6.77745 5.33099C6.10652 5.145 5.38919 5.23316 4.78326 5.57607C4.17733 5.91898 3.73243 6.48855 3.54645 7.15949C3.36047 7.83042 3.44863 8.54775 3.79154 9.15368C4.13445 9.75961 4.70402 10.2045 5.37495 10.3905" stroke="black" stroke-opacity="0.5" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </span>
                                            <span>Download All Images</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='container mx-auto'>
                        <div className='grid grid-cols-[300px_auto] '>
                            <div className='flex flex-col gap-[23px] pt-[16px] pb-[50px] pr-[42px] border-r-[1px] border-solid border-black '>
                                <h3 className='font-jakarta text-2xl font-bold'>History</h3>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex justify-between text-xs font-medium text-[#726C6C] pb-2 border-b-[1px] border-solid border-[#CCCBCB]'><span>Background removed</span><span>2 mins ago</span></div>
                                    <div className='flex justify-between text-xs font-medium text-[#726C6C] pb-2 border-b-[1px] border-solid border-[#CCCBCB]'><span>Background removed</span><span>2 mins ago</span></div>
                                    <div className='flex justify-between text-xs font-medium text-[#726C6C] pb-2 border-b-[1px] border-solid border-[#CCCBCB]'><span>Background removed</span><span>2 mins ago</span></div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-[23px] pt-[17px] pl-[41px] pb-10'>
                                <div className='flex flex-col gap-3'>
                                    <h3 className='font-jakarta text-2xl font-bold'>Choose Features</h3>
                                    <div className='flex gap-[15px]'>
                                        <button onClick={() => featureSwitchHandler('protouch')} className={`px-4 py-2 border-[2px] border-solid border-[#255646] flex gap-1 rounded items-center text-sm font-medium font-jakarta ${featrueSwitch === 'protouch' && 'bg-[#87E17F]'}`}>
                                            <span className='flex w-4 h-6 justify-end items-center'>
                                                <img src='/images/v-4/icons/f7_wand-rays.svg' alt='btn-icon' /></span>
                                            <span>Pro-Touch</span>
                                        </button>
                                        <button onClick={() => featureSwitchHandler('presets')} className={`px-4 py-2 border-[2px] border-solid border-[#255646] flex gap-1 rounded items-center text-sm font-medium font-jakarta ${featrueSwitch === 'presets' && 'bg-[#87E17F]'}`}>
                                            <span className='flex w-4 h-6 justify-end items-center'>
                                                <img src='/images/v-4/icons/feature-btn/mingc.svg' alt='btn-icon' /></span>
                                            <span>Free Presets</span>
                                        </button>
                                        <button onClick={() => featureSwitchHandler('gnbg')} className={`px-4 py-2 border-[2px] border-solid border-[#255646] flex gap-1 rounded items-center text-sm font-medium font-jakarta ${featrueSwitch === 'gnbg' && 'bg-[#87E17F]'}`}>
                                            <span className='flex w-4 h-6 justify-end items-center'>
                                                <img src='/images/v-4/icons/feature-btn/streamline_ai-generate-landscape-image-spark.svg' alt='btn-icon' /></span>
                                            <span>Generate Background</span>
                                        </button>
                                        <button onClick={() => featureSwitchHandler('resize')} className={`px-4 py-2 border-[2px] border-solid border-[#255646] flex gap-1 rounded items-center text-sm font-medium font-jakarta ${featrueSwitch === 'resize' && 'bg-[#87E17F]'}`}>
                                            <span className='flex w-4 h-6 justify-end items-center'>
                                                <img src='/images/v-4/icons/feature-btn/fluent_resize-large-16-regular.svg' alt='btn-icon' /></span>
                                            <span>Resize Photo</span>
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    {/* protouch area */}
                                    {
                                        featrueSwitch == 'protouch' &&
                                        <div className='flex flex-col gap-3'>
                                            <div className='flex gap-7 items-center'>
                                                <div className='flex justify-center items-center'>
                                                    <input
                                                        className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                        type="radio" id="protouch-single" name="protouch" value="touch-single" />
                                                    <label className='font-jakarta text-sm font-semibold' for="protouch-single">Send <span className='underline'>Edited</span> Photos for Pro-Touch</label>
                                                </div>

                                                <div className='flex justify-center items-center'>
                                                    <input
                                                        className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                        type="radio" id="protouch-all" name="protouch" value="touch-all" />
                                                    <label className='font-jakarta text-sm font-semibold' for="protouch-all">Send <span className='underline'>All</span> Photos for Pro-Touch</label>
                                                </div>
                                            </div>
                                            <div className='flex gap-3 items-end'>
                                                <div className='flex relative'>
                                                    <textarea
                                                        // onChange={(e) => setAiPromt(() => e.target.value)}
                                                        maxLength={100}
                                                        className={`w-[439px] h-[148px] mt-1 resize-none text-black  shadow-lg focus:outline-none  text-sm box-border p-3 overflow-auto  rounded-tl-lg rounded border-solid border-[1px] border-black `}
                                                        placeholder="Please Provide Instruction"
                                                        rows=""
                                                    ></textarea>
                                                    <span className=' text-sm font-medium text-black absolute right-1 bottom-1'>Char:49/100</span>

                                                </div>
                                                <div>
                                                    <div className='flex flex-col gap-2'>
                                                        <button className='border-[1px] border-solid border-black rounded bg-[#255646] py-[14px] px-[24px] flex justify-center items-center gap-[5px] text-sm text-white font-medium leading-none'>
                                                            <span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                    <path d="M8.58995 11.41L12.6283 7.37167M16.7583 4.90833L13.3499 15.9867C13.0441 16.98 12.8916 17.4767 12.6274 17.6408C12.515 17.7111 12.3873 17.7535 12.2551 17.7645C12.1229 17.7756 11.99 17.7549 11.8674 17.7042C11.5808 17.585 11.3474 17.1208 10.8824 16.1908L8.72411 11.8725C8.67998 11.7725 8.62611 11.677 8.56328 11.5875C8.51993 11.531 8.46952 11.4803 8.41328 11.4367C8.32646 11.3764 8.2341 11.3245 8.13745 11.2817L3.80995 9.11667C2.88078 8.65167 2.41578 8.41917 2.29661 8.1325C2.24578 8.00981 2.22501 7.87675 2.23603 7.74441C2.24704 7.61206 2.28953 7.48426 2.35995 7.37167C2.52411 7.10833 3.02078 6.955 4.01411 6.64917L15.0933 3.24083C15.8741 3 16.2641 2.88 16.5283 2.9775C16.6418 3.01917 16.7448 3.08503 16.8303 3.1705C16.9158 3.25598 16.9816 3.35903 17.0233 3.4725C17.1199 3.73583 16.9999 4.12584 16.7599 4.90584L16.7583 4.90833Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                </svg>
                                                            </span>
                                                            <span>Request Pro-Touch</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {/* Free presets area */}
                                    {
                                        featrueSwitch == 'presets' &&
                                        <div className='flex flex-col gap-3'>
                                            <div className='flex gap-3 font-jakarta text-sm font-semibold'>
                                                <button className={`${presetSwitch == 'colours' && 'underline'}`} onClick={() => presetSwitchHandler('colours')}>Colours</button>
                                                <button className={`${presetSwitch == 'backgrounds' && 'underline'}`} onClick={() => presetSwitchHandler('backgrounds')}>Background</button>
                                            </div>
                                            <div className='flex flex-col'>
                                                {
                                                    presetSwitch == 'colours' &&
                                                    <div>
                                                        <div className='flex gap-3'>
                                                            {
                                                                colorList.map((color, index) =>
                                                                    <button className='flex w-[42px] h-[42px] border-[2px] border-solid border-black rounded-full p-[3px]'>
                                                                        <span style={{ backgroundColor: color }} className='w-full h-full rounded-full'></span>
                                                                    </button>
                                                                )
                                                            }
                                                            <div
                                                                onClick={() =>
                                                                    document
                                                                        .getElementById("colorPick")
                                                                        .click()
                                                                }
                                                                // style={{ backgroundColor: customColorPick ? customColorPick : "white" }}
                                                                className='flex w-[42px] h-[42px] border-[2px] border-solid border-black rounded-full p-[3px]'                                                                    >
                                                                <span className='flex items-center justify-center w-full h-full bg-[#726C6C] rounded-full relative'>
                                                                    <span className='absolute'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                                            <path d="M13.5 9.75H9.75V13.5C9.75 13.9125 9.4125 14.25 9 14.25C8.5875 14.25 8.25 13.9125 8.25 13.5V9.75H4.5C4.0875 9.75 3.75 9.4125 3.75 9C3.75 8.5875 4.0875 8.25 4.5 8.25H8.25V4.5C8.25 4.0875 8.5875 3.75 9 3.75C9.4125 3.75 9.75 4.0875 9.75 4.5V8.25H13.5C13.9125 8.25 14.25 8.5875 14.25 9C14.25 9.4125 13.9125 9.75 13.5 9.75Z" fill="white" />
                                                                        </svg>
                                                                    </span>
                                                                </span>
                                                                <input
                                                                    // onChange={handleColorChange} 
                                                                    className='opacity-0 h-0 w-0' id="colorPick" name="color" type="color" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    presetSwitch == 'backgrounds' &&
                                                    <div className='flex gap-[21px] flex-wrap'>
                                                        {
                                                            presetRowImgList.map((item, index) =>

                                                                <div className='flex flex-col gap-[21px] w-[78px] h-[55px] rounded overflow-hidden'>
                                                                    <img src={item} alt='' />
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                }
                                                <div className='pt-[9px] flex flex-col gap-[10px]'>
                                                    <div className='flex items-center gap-1'>
                                                        <input type='checkbox' />
                                                        <span className='text-xs font-medium text-[#5A5555] leading-6'>Apply to all images</span>
                                                    </div>
                                                    <div>
                                                        <button className='font-jakarta bg-[#255646] rounded text-sm font-medium text-white py-[14px] px-[40px] border-[1px] border-solid border-black'>Apply</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {/* Generate BG area */}
                                    {
                                        featrueSwitch == 'gnbg' &&
                                        <div className='flex gap-[20px]'>
                                            <div className='flex flex-col'>
                                                <div>
                                                    <textarea
                                                        // onChange={(e) => setAiPromt(() => e.target.value)}
                                                        maxLength={200}
                                                        className={`w-[577px] h-[117px] mt-1 resize-none text-black  shadow-lg focus:outline-none  text-sm box-border p-3 overflow-auto  rounded-tl-lg rounded border-solid border-[1px] border-black `}
                                                        placeholder="Sea as a background"
                                                        rows=""
                                                    ></textarea>
                                                    <div className='flex justify-end'>
                                                        <span className='text-[#606060] text-xs font-semibold'>0/200 character</span>
                                                    </div>
                                                </div>

                                                <div className='flex flex-col gap-[10px]'>
                                                    <div className='flex items-center gap-1'>
                                                        <input type='checkbox' />
                                                        <span className='text-xs font-medium text-[#5A5555] leading-6'>Apply to all images</span>
                                                    </div>
                                                    <div>
                                                        <button className='font-jakarta bg-[#255646] rounded text-sm font-medium text-white py-[14px] px-[40px] border-[1px] border-solid border-black'>Apply</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-4 2xl:grid-cols-5 h-[155px] gap-[22px]'>
                                                {
                                                    presetRowImgList.map((item, index) =>

                                                        <div key={index} className=' h-[66px] rounded overflow-hidden flex flex-col'>
                                                            <img src={item} alt='' />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    }
                                    {/* Resize Photo area */}
                                    {
                                        featrueSwitch == 'resize' &&

                                        <div className='flex flex-col gap-[17px]'>
                                            <div className='flex gap-5'>
                                                <div className='flex'>
                                                    <input
                                                        className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                        type="radio" id="sizeOne" name="fav_language" value="sizeOne" />
                                                    <label
                                                        className='font-jakarta text-base font-medium'
                                                        for="sizeOne">1000x722</label>
                                                </div>

                                                <div className='flex'>
                                                    <input
                                                        className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                        type="radio" id="sizeTwo" name="fav_language" value="sizeTwo" />
                                                    <label
                                                        className='font-jakarta text-base font-medium'
                                                        for="sizeTwo">1440x1040</label>
                                                </div>

                                                <div className='flex'>
                                                    <input
                                                        className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                        type="radio" id="sizeThree" name="fav_language" value="sizeThree" />
                                                    <label
                                                        className='font-jakarta text-base font-medium'
                                                        for="sizeThree">2448x1768</label>
                                                </div>

                                                <div className='flex'>
                                                    <input
                                                        className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                        type="radio" id="sizeFour" name="fav_language" value="sizeFour" />
                                                    <label
                                                        className='font-jakarta text-base font-medium'
                                                        for="sizeFour">Custom Size</label>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-[10px]'>
                                                <div className='flex items-center gap-1'>
                                                    <input type='checkbox' />
                                                    <span className='text-xs font-medium text-[#5A5555] leading-6'>Apply to all images</span>
                                                </div>
                                                <div>
                                                    <button className='font-jakarta bg-[#255646] rounded text-sm font-medium text-white py-[14px] px-[40px] border-[1px] border-solid border-black'>Apply</button>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadImageStatic;