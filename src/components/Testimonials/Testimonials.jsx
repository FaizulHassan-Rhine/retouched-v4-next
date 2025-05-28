import React from 'react';
import GridBoxTwo from '../GridBox/GridBoxTwo';
import { Carousel } from 'react-div-carousel'
import 'react-div-carousel/dist/index.css'

const Testimonials = () => {

    const testimoniaList = [
        {
            imageUrl: '/images/v-4/avatar-1.png',
            title: 'Shopify User',
            address: 'Kif-Kif Import',
            starNumber: 4,
            description: '“Excellent final images and really quick turnaround. Will be using this app many more times in the future!”'
        },

        {
            imageUrl: '/images/v-4/avatar-2.png',
            title: 'Shopify User',
            address: 'Stonhart',
            starNumber: 5,
            description: '“Fast, meticulous, exactly follow your requests (sizes, layouts, etc.). You just have to describe your needs and the work will be done wonderfully. Many thanks”'
        },

        {
            imageUrl: '/images/v-4/avatar-3.avif',
            title: 'Anonymous',
            address: 'Shopify',
            starNumber: 4,
            description: '“The turnaround time on getting images silo\'d is super fast. This lets me get product live on the site much faster...”'
        }
    ]

    const brandTrustList = [
        '/images/v-4/icons/logoipsum-244.svg',
        '/images/v-4/icons/logoipsum-250.svg',
        '/images/v-4/icons/logoipsum-262.svg',
        '/images/v-4/icons/logoipsum-264.svg',
        '/images/v-4/icons/logoipsum-265.svg',
        '/images/v-4/icons/logoipsum-244.svg',
        '/images/v-4/icons/logoipsum-250.svg',
        '/images/v-4/icons/logoipsum-262.svg',
        '/images/v-4/icons/logoipsum-264.svg',
        '/images/v-4/icons/logoipsum-265.svg',

    ]
    return (
        <div className='pt-[62px]  md:pb-[128px]'>
            <div className='container mx-auto px-3 md:px-0'>
                <div className='flex flex-col'>
                    <div className='flex flex-col items-center lg:items-start gap-[9px] pb-10 md:pb-20'>
                        <h1 className='font-jakarta font-bold text-4xl'>Testimonials</h1>
                        <p className='text-[#5A5555] text-xl font-semibold'>See what our clients say about us.</p>
                    </div>
                    {/* <div className='flex flex-col lg:grid lg:grid-cols-3 gap-[38px]'>
                        {
                            testimoniaList.map((item, index) =>

                                <GridBoxTwo key={index} {...item} />

                            )}
                    </div> */}
                    <div className='flex gap-[38px]'>
                        <Carousel
                            uniqueId="id_1"
                            item={3}
                            indicators={false}
                            speed={0.5}
                            responsive={[
                                {
                                    breakPoint: 640,
                                    item: 1,
                                    indicators:true
                                },
                                {
                                    breakPoint: 768,
                                    item: 2,
                                },
                                {
                                    breakPoint: 1024,
                                    item: 3,
                                }
                            ]}
                        >
                            {
                                testimoniaList.map((item, index) =>

                                    <div className='px-[16px]'>
                                        <GridBoxTwo key={index} {...item} />
                                    </div>

                                )}
                        </Carousel>

                    </div>

                    {/* 
                    <div className='pt-[52px] flex flex-col gap-[72px]'>
                        <p className='text-[32px] text-center lg:text-left'><b>Trusted by leading brands </b>worldwide</p>
                        <div className='flex gap-[96px]'>
                            <Carousel
                                uniqueId="id_1"
                                item={5}
                                indicators={false}
                                speed={0.5}
                                responsive={[
                                    {
                                        breakPoint: 640,
                                        item: 1,
                                    },
                                    {
                                        breakPoint: 768,
                                        item: 2,
                                    },
                                    {
                                        breakPoint: 1024,
                                        item: 3,
                                    }
                                ]}
                            >
                                {
                                    brandTrustList.map((item, index) =>
                                        <div className='p-3 flex flex-col items-center'>
                                            <img src={item} alt="" />
                                        </div>
                                    )
                                }
                            </Carousel>
                        </div>

                    </div>
                    */}

                </div>
            </div>
        </div>
    );
};

export default Testimonials;