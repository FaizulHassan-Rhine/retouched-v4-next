import React, { useContext, useEffect, useState } from 'react';
// import { FileContextManager } from '../../App';
import ReactCompareImage from "react-compare-image";
// import Loading3 from '../Loading/Loading_3';
import { isValidColor } from '../ComonFunc/ComonFunc';
import { FileContextManager } from '@/context/AppContexts';


const AfterBeforeImageV4 = ({ proccesImages, counte = 0, visibleSection = "", actionData, claseNameAfterBeforeWrap }) => {

    const [getZoom, setZoom] = useState(1);
    const [clickSliderSwitch, setClickSliderSwitch] = useState(false);
    const [startSlider, setStartSlide] = useState(0);
    const [getRating, setRating] = useState(0)
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [ratio, setRatio] = useState(0);
    const [getImageStatus, setImageStatus] = useState(false);
    const [hasAvailableData, setHasAvailableData] = useState(false);
    const [rightImagePath, setRightImagePath] = useState(null);
    const [fileInfo, setFileInfo, getAfterBeforeImg, setAfterBeforeImg, getProccessImgIndex, setProccessImgIndex, getTotalImage, setTotalImage] = useContext(FileContextManager);

    const checkSelectImages = () => {
        checkAiProccesDone()
    }

    const imageRatiocheck = (imgFile) => {
        const img = new Image();
        img.src = proccesImages.imageUrl

        img.onload = () => {
            const { naturalWidth, naturalHeight } = img;
            const aspectRatio = naturalWidth / naturalHeight;

            setWidth(naturalWidth);
            setHeight(naturalHeight);
            setRatio(aspectRatio);
        };
    }

    useEffect(() => {
        imageRatiocheck(proccesImages.imageUrl);
    }, [])


    useEffect(() => {

        counte > 0 && setRightImagePath(proccesImages.proccessImage &&
            proccesImages.proccessImage.output_urls &&
            proccesImages.proccessImage.output_urls.length > 0 &&
            `${proccesImages.proccessImage.output_urls[0].default_compressed_output_public_url}?v=${new Date().getTime()}`);
    }, [counte])

    useEffect(() => {
        console.log("proccessImage", proccesImages)

        // getImageStatus == false && checkSelectImages();
        setHasAvailableData(proccesImages.proccessImage && proccesImages.proccessImage.output_urls && proccesImages.proccessImage.output_urls.length > 0);
        proccesImages.proccessImage &&
            proccesImages.proccessImage.output_urls &&
            proccesImages.proccessImage.output_urls.length > 0 && setRightImagePath((pr) => proccesImages.proccessImage.output_urls[0].default_compressed_output_public_url);

    }, [proccesImages.proccessImage && proccesImages.proccessImage.output_urls && proccesImages.proccessImage.output_urls.length > 0])

    return (
        <>

            <div className={`flex flex-col gap-[18px]`}>
                <div className={`w-full h-[300px] lg:h-[547px] border-[2px] border-solid border-[#5A5555] rounded-xl overflow-hidden ${claseNameAfterBeforeWrap}`}>
                    <div className="w-full h-full relative">
                        <div className="h-full  flex flex-col justify-center">
                            {
                                proccesImages.proccessImage && proccesImages.proccessImage.output_urls && proccesImages.proccessImage.output_urls.length > 0 ?
                                    (visibleSection == "81206d6f-e2e5-46e8-836e-b657ab504392" || visibleSection == "25b49f1d-b72e-4d2e-8ded-7ac98fe3194e") ?
                                        <div className='relative'>
                                            <img
                                                className={`mx-auto relative z-10 w-full`}
                                                // className={`mx-auto relative z-10 ${ratio > 1 ? 'w-full' : 'h-full'}`}
                                                src={proccesImages.proccessImage.output_urls[0].png_image_output_url} />
                                            <div className="absolute top-0 right-0 w-full h-full z-0"
                                                style={{
                                                    backgroundImage: isValidColor(actionData) ? '' : `url(${actionData})`,
                                                    backgroundSize: '100% 100%',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundColor: isValidColor(actionData) ? actionData : 'transparent',
                                                }} />
                                        </div>
                                        :
                                        <ReactCompareImage
                                            leftImage={proccesImages.proccessImage.output_urls[0].compressed_raw_image_public_url}
                                            rightImage={rightImagePath}
                                        />
                                    :
                                    <div className='relative'>
                                        <img className={`mx-auto w-full`} src={proccesImages.src} />
                                        {/* <img className={`mx-auto ${ratio > 1 ? 'w-full' : 'h-full'}`} src={proccesImages.src} /> */}
                                        <div className="absolute top-0 right-0 w-full h-full bg-gray-800 opacity-85 animate-pulse" />
                                    </div>
                            }
                        </div>
                    </div>
                </div>
               
            </div>
        </>
    );
};

export default AfterBeforeImageV4;
