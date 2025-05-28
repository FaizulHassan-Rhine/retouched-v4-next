import React, { useContext, useEffect, useState } from 'react';
import { FileContextManager } from '../../App';
import ReactCompareImage from "react-compare-image";
import { TIFFViewer } from 'react-tiff'
import Loading3 from '../Loading/Loading_3';
import 'react-tiff/dist/index.css'
import CompareImage from '../CompareImage/CompareImage';

const AfterBeforeImage = ({ proccesImages }) => {

    const [getRating, setRating] = useState(0)
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [ratio, setRatio] = useState(0);
    const [getImageStatus, setImageStatus] = useState(false);
    const [getCompleteImage, setCompleteImage] = useState({});

    const [fileInfo, setFileInfo, getAfterBeforeImg, setAfterBeforeImg, getProccessImgIndex, setProccessImgIndex, getTotalImage, setTotalImage] = useContext(FileContextManager);


    const checkAiProccesDone = () => {
        
        const found = getAfterBeforeImg.some(el => el.output_urls[0].filter_image_file_path == proccesImages.file.name);

        if (found == false) {
            console.log("")
        } else {
            setImageStatus(true);
            const getData = getAfterBeforeImg.find(el => el.output_urls[0].filter_image_file_path == proccesImages.file.name)
            setCompleteImage(getData);
            
        }
    }

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
        getImageStatus == false && checkSelectImages();
    }, [getAfterBeforeImg])

    return (
        <>
            <div className="h-[400px] w-[380px]  lg:w-[400px]  rounded-lg shadow-lg relative">
                <div className="h-full  flex flex-col justify-center">
                    {
                        getImageStatus ?
                            //     <CompareImage
                            //     topImage={getCompleteImage.output_urls[0].compressed_raw_image_public_url}
                            //     bottomImage={getCompleteImage.output_urls[0].default_compressed_output_public_url}
                            // />                 
                            <ReactCompareImage
                                leftImage={getCompleteImage.output_urls[0].compressed_raw_image_public_url}
                                rightImage={getCompleteImage.output_urls[0].default_compressed_output_public_url}
                            />
                            :
                            proccesImages.file.type === 'image/tiff' ?
                                <TIFFViewer tiff={proccesImages.imageUrl} className={`mx-auto w-full h-full}`} />
                                :
                                <img className={`mx-auto ${ratio > 1 ? 'w-full' : 'h-full'}`} src={proccesImages.imageUrl} />
                    }
                </div>
                {
                    getImageStatus == false &&
                    <div className='loadingImg absolute top-[50%] left-[50%]' style={{ transform: 'translate(-50%)' }} > <Loading3 /></div>
                }
            </div>
        </>
    );
};

export default AfterBeforeImage;