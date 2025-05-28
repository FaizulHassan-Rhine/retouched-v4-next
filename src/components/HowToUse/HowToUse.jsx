import React from "react";
// import model from "./images/B1.jpg";
// import model2 from "./images/B2.png";

import ReactCompareImage from "react-compare-image";


const HowToUse = () => {
  return (
    <>
      <div id="use" className=" w-full pt-16 pb-16 ">
        <div className="container mx-auto  overflow-hidden">
          <div className="lg:flex  gap-2 lg:pl-10  ">
            <div className=" pt-5 sm:pt-10 lg:pt-20 px-5 lg:px-0 lg:pl-4 sm:pl-16 md:pl-28 text-start xl:ml-28 lg:w-1/2 ">
            <div className="w-full ">
            <h2 style={{color: "#0B6156"}} className=" text-3xl md:text-4xl text-center lg:text-left  font-bold">
                Want to Take Your
              </h2>
              <h2 style={{color: "#0B6156"}} className=" text-3xl md:text-4xl text-center lg:text-left  font-bold">
                Product Images to
              </h2>
              <h2 style={{color: "#0B6156"}} className="text-3xl md:text-4xl  text-center lg:text-left font-bold">
                the Next Level?
              </h2>
              {/* <div className="absolute left-0 top-[-20px] sm:left-[70px] lg:top-[-40px] lg:left-[-70px] opacity-50">
                <img className="w-28 sm:w-36" src="/images/Round.svg"/>
              </div> */}
            </div>

              <p className="text-sm text-center lg:text-left mt-5 mb-4 ">
                If you have a store in Shopify, our retouching service will help
                you create flawless product photos that will boost your
                conversion rates. Head over to the Shopify App store today & see
                the retouched.ai difference for yourself!
              </p>

              <div className="w-full flex justify-center lg:justify-start relative">
                {" "}
                <button
                  onClick={() =>
                    document.getElementById("singleImagePick").click()
                  }
                  style={{backgroundColor: "#F9A431"}}
                  className="px-5  py-2 font-bold text-white  border-gray-100 border-2 shadow-md rounded-3xl mt-6"
                >
                  Try it for Free
                </button>
                {/* <div className="absolute top-0 right-10 sm:right-20 ">
                  <img className="w-12" src="/public/images/indicate.svg"/>
                </div> */}
              </div>
              
            </div>

            <div className=" h-full relative z-50 mt-5 lg:mt-0 bg-white md:w-[450px] sm:w-[450px] lg:w-full sm:ml-20 md:ml-28  ">
              <div className="h-full overflow-hidden reactCompareImg">
                <ReactCompareImage leftImage={"/images/B1.jpg"} rightImage={"/images/B2.png"} />
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </>
  );
};

export default HowToUse;
