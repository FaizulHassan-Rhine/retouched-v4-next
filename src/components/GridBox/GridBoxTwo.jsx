import React from 'react';

const GridBoxTwo = ({ imageUrl, title, address, starNumber, description }) => {
    return (
        <div className='min-h-[440px] md:min-h-[390px] flex flex-col gap-4 py-4 justify-center items-center border-[2px] border-solid border-black rounded-xl p-4'>
            <div className='w-[130px] h-[130px] flex justify-center items-center rounded-full overflow-hidden'>
                <img src={imageUrl} alt="" />
            </div>
            <h4 className='font-jakarta text-2xl font-bold text-center'>{title}</h4>
            <p className='text-[#726C6C] text-center text-base font-semibold'>{address}</p>
            <div className='flex gap-2'>
                {
                    Array.from({ length: starNumber }).map((d, index) =>
                        index < starNumber ?
                            <img className='w-[25px] h-[25px]' src="/images/v-4/icons/star.svg" alt="star" />
                            :
                            <img className='w-[25px] h-[25px]' src="/images/v-4/icons/star-empty.svg" alt="star" />

                    )
                }
            </div>
            <p className='text-center text-base font-normal'>{description}</p>
        </div>
    );
};

export default GridBoxTwo;