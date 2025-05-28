import React from 'react';

const GridBoxOne = ({ icon, title, description, videoUrl }) => {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex justify-center lg:justify-normal gap-2 items-center'>
                <span className='w-8 h-8 flex justify-center items-center'>
                    <img src={icon} alt="icon" />
                </span>
                <h3 className='text-xl font-semibold text-center lg:text-left'>{title}</h3>
            </div>
            <div className='flex justify-center items-center rounded-lg overflow-hidden'>
                <video
                    muted
                    playsInline
                    autoPlay
                    loop
                >
                    <source src={videoUrl} type="video/mp4" />
                </video>
            </div>
            <div>
                <p className='text-base font-normal leading-normal text-center lg:text-left'>{description}</p>
            </div>
        </div>
    );
};

export default GridBoxOne;