import React, { useState, useEffect, useRef, useCallback } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

import "./style.css";
import { checkImageRatio } from "../ComonFunc/ComonFunc";

const CompareImage = ({ topImage, bottomImage }) => {
    const [isResizing, setIsResizing] = useState(false);
    const topImageRef = useRef();
    const handleRef = useRef();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [ratio, setRatio] = useState(0);

    const setPositioning = useCallback((x) => {
        const { left, width } = topImageRef.current.getBoundingClientRect();
        const handleWidth = handleRef.current.offsetWidth;

        if (x >= left && x <= width + left - handleWidth) {
            handleRef.current.style.left = `${((x - left) / width) * 100}%`;
            topImageRef.current.style.clipPath = `inset(0 ${100 - ((x - left) / width) * 100
                }% 0 0)`;
        }
    }, []);

    const handleResize = useCallback(
        (e) => {
            if (e.clientX) {
                setPositioning(e.clientX);
            } else if (e.touches && e.touches[0] && e.touches[0].clientX) {
                setPositioning(e.touches[0].clientX);
            }
        },
        [setPositioning]
    );

    // Set initial positioning on component mount
    useEffect(() => {
        const { left, width } = topImageRef.current.getBoundingClientRect();
        const handleWidth = handleRef.current.offsetWidth;

        setPositioning(width / 2 + left - handleWidth / 2);
    }, [setPositioning]);

    const handleResizeEnd = useCallback(() => {
        setIsResizing(false);

        window.removeEventListener("mousemove", handleResize);
        window.removeEventListener("touchmove", handleResize);
        window.removeEventListener("mouseup", handleResizeEnd);
        window.removeEventListener("touchend", handleResizeEnd);
    }, [handleResize]);

    const onKeyDown = useCallback(
        (e) => {
            if (handleRef.current) {
                const { offsetLeft, offsetParent } = handleRef.current;

                if (e.code === "ArrowLeft") {
                    setPositioning(offsetLeft + offsetParent.offsetLeft - 10);
                }

                if (e.code === "ArrowRight") {
                    setPositioning(offsetLeft + offsetParent.offsetLeft + 10);
                }
            } else {
                // Handle the case when handleRef.current is null
            }

        },
        [setPositioning]
    );

    // Add keydown event on mount
    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        // window.addEventListener("click", handleResize); // added new for click compare
    }, [onKeyDown]);

    useEffect(() => {
        if (isResizing) {
            // window.addEventListener("mousedown", handleResize);
            window.addEventListener("mousemove", handleResize);
            window.addEventListener("touchmove", handleResize);
            window.addEventListener("mouseup", handleResizeEnd);
            window.addEventListener("touchend", handleResizeEnd);
        }

        return () => {
            window.removeEventListener("mousemove", handleResize);
            window.addEventListener("touchmove", handleResize);
            window.removeEventListener("mouseup", handleResizeEnd);
            window.removeEventListener("touchend", handleResizeEnd);
            window.removeEventListener("keyup", onKeyDown);
        };
    }, [isResizing, handleResize, handleResizeEnd, onKeyDown]);

    const compareOnclick = () => {
        // setIsResizing(true)   // added new for click compare
        // handleResize()
    }

    const imageRatiocheck = ()=>{
        const img = new Image();
        img.src = topImage;
    
        img.onload = () => {
          const { naturalWidth, naturalHeight } = img;
          const aspectRatio = naturalWidth / naturalHeight;
    
          setWidth(naturalWidth);
          setHeight(naturalHeight);
          setRatio(aspectRatio);
        };
    }

    useEffect(()=>{
        imageRatiocheck()
        topImageRef.current.style.clipPath = `inset(0 50% 0 0)`;
    },[])
    
    return (
        <>
            <div className="comparison-slider">
                <div
                    ref={handleRef}
                    className="handle"
                    // onMouseOver={()=>setIsResizing(true)}
                    onMouseDown={() => setIsResizing(true)}
                    onTouchStart={() => setIsResizing(true)}
                >
                    
                </div>
                <div
                    onClick={compareOnclick}
                    ref={topImageRef} className="comparison-item top">
                    {/* <LazyLoadImage
                        className="topImage"
                        draggable="false"
                        effect="blur"
                        src={topImage}
                        height="100%"
                        width="100%"
                    /> */}
                    <img src={topImage} className={`mx-auto ${ratio > 1 ? 'w-full' : 'h-full'}`} />
                </div>
                <div
                    onClick={compareOnclick}
                    className="comparison-item">
                    <img src={bottomImage} className={`mx-auto ${ratio > 1 ? 'w-full' : 'h-full'}`} />

                    {/* <LazyLoadImage
                        className="bottomImage"
                        draggable="false"
                        effect="blur"
                        src={bottomImage}
                        height="100%"
                        width="100%"
                    /> */}
                </div>
            </div>
        </>
    );
};

export default CompareImage;
