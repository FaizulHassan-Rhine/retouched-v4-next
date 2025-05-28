import Link from 'next/link';
import React from 'react';


const Footer = () => {
    return (
        <div className="bg-[#255646] pt-16 pb-[101px]">
            <div className='container mx-auto px-3 lg:px-0'>
                <div className='flex flex-col lg:grid lg:grid-cols-[auto_455px] gap-10'>
                    <div className='font-jakarta text-white flex flex-col  lg:grid lg:grid-cols-2 gap-10 flex-wrap'>
                        <div>
                            <Link href='/footer-notes' className='cursor-pointer underline'>
                            <h3 className='text-base font-bold leading-loose'>FAQ</h3>
                            </Link>
                            <ul className='text-xs font-normal leading-[250%]'>
                                <li>How does AI background removal work?</li>
                                <li>Can I customize AI-generated backgrounds?</li>
                                <li>How do I request manual retouching?</li>
                                <li>What formats can I download my images in?</li>
                            </ul>
                        </div>
                        
                        
                        
                        <div>
                        <Link href='/footer-notes' className='cursor-pointer underline'>
                            <h3 className='text-base font-bold leading-loose'>Terms of Use</h3>
                            </Link>
                            <ul className='list-inside list-disc text-xs font-normal leading-[250%] ml-[5px]'>
                                <li>Account Usage</li>
                                <li>Prohibited Content</li>
                                <li>Liability</li>
                            </ul>
                        </div>

                        <div>
                        <Link href='/footer-notes' className='cursor-pointer underline'>
                            <h3 className='text-base font-bold leading-loose'>Privacy Policy</h3>
                            </Link>
                            <ul className='list-inside list-disc text-xs font-normal leading-[250%] ml-[5px]'>
                                <li>Data Collection</li>
                                <li>Data Security</li>
                                <li>Third-Party Sharing</li>
                            </ul>
                            <p className='text-xs font-normal leading-[250%]'>For detailed information, please read our full <a href='/footer-notes' className='underline'>Privacy Policy</a> </p>
                        </div>
                        <div>
                        <Link href='/footer-notes' className='cursor-pointer underline'>
                            <h3 className='text-base font-bold leading-loose'>Contact Us</h3>
                            </Link>
                            <ul className='text-xs font-normal leading-[250%]'>
                                <li>Need assistance? We’re here to help!</li>
                                <li>
  <b>Email</b>: <a href="mailto:care@retouched.ai" className="underline">care@retouched.ai</a>
</li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h3 className='font-jakarta text-base font-bold text-white leading-loose'>Our Address</h3>
                        <div className='h-[323px]'>
                            <iframe
                                title="map"
                                className='rounded-md'
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10329.283883735325!2d90.39304891556642!3d23.749043274767246!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc1fb12dbea63beca!2sCutOutWiz!5e0!3m2!1sbn!2sbd&language=en"
                                width="100%"
                                height="100%"
                                style={{ border: "0" }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;