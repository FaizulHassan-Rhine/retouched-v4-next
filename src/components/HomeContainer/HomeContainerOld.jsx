import { useContext } from "react";

import {
  FileContextManager,
  apiUrlContextManager,
  userContextManager,
} from "../../App";
import Footer2 from "../Footer/Footer2";
import Footer from "../Footer/Footer";
// import sample_img_1 from '../../../public/images/1.jpg'
// import sample_img_2 from '../../../public/images/2.jpg'
// import sample_img_3 from '../../../public/images/3.jpg'
// import sample_img_4 from '../../../public/images/4.jpg'

const HomeContainerOld = () => {
  const [
    fileInfo,
    setFileInfo,
    getAfterBeforeImg,
    setAfterBeforeImg,
    getProccessImgIndex,
    setProccessImgIndex,
    getTotalImage,
    setTotalImage,
    getImageUrl,
    setImageUrl,
  ] = useContext(FileContextManager);
  const [getUserInfo, setUserInfo, getToken, setToken] =
    useContext(userContextManager);
  const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] =
    useContext(apiUrlContextManager);

  const navigate = useNavigate();

  const uploadFile = (e) => {
    const newFile = e.target.files;
    setAfterBeforeImg([]);
    setFileInfo(newFile);
    navigate("/upload-image");
  };

  const pastUrlPrompt = () => {
    let person = prompt("Image URL:");
    if (person != null) {
      //   do action here
      checkAiProccesDone(person);
    }
  };
  const checkAiProccesDone = (imgFile) => {
    const myCallback = (result) => {
      if (result == "success") {
        setFileInfo([]);
        setAfterBeforeImg([]);

        const fileObject = { file: imgFile, imageUrl: imgFile, rework: false };
        setFileInfo((fileInfo) => [...fileInfo, fileObject]);
        navigate("/upload-image");
      } else {
        setTimeout(() => checkAiProccesDone(imgFile), 1000);
      }
    };
    testImage(imgFile, myCallback);
  };

  function testImage(url, callback, timeout) {
    timeout = timeout || 5000;
    var timedOut = false,
      timer;
    var img = new Image();
    img.src = url;
    img.onerror = img.onabort = function () {
      if (!timedOut) {
        clearTimeout(timer);
        callback("error");
      }
    };
    img.onload = function () {
      if (!timedOut) {
        clearTimeout(timer);
        callback("success");
      }
    };

    timer = setTimeout(function () {
      timedOut = true;
      callback("timeout");
    }, timeout);
  }

  return (
    <>
      <div>
        <div className="relative hidden lg:flex lg:flex-col">
          <div className="flex justify-center items-center">
            <video
              className=" object-cover lg:-mt-[48px] w-full h-screen "
              muted
              playsInline
              autoPlay
              loop
            >
              <source src="/videos/bg.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="absolute h-full w-full flex items-center">
            <div className="container mx-auto relative px-4 lg:px-8 xl:max-w-7xl ">
              {/* <div className=""> */}
              {Object.keys(getUserInfo).length > 0 ? (
                typeof getUserInfo.results !== "undefined" &&
                getUserInfo.results &&
                getUserInfo.results.roleName &&
                getUserInfo.results.roleName !== "admin" && (
                  <div className="absolute w-full md:w-auto  rounded-md lg:-translate-y-[60%] xl:-translate-y-1/2  lg:right-8 p-5 shadow-md bg-white justify-items-center  flex flex-col items-center  xl:items-center">
                    <div className="w-full lg:w-80 flex flex-col gap-3 md:gap-3 ">
                      <div className="flex flex-col items-center">
                        <h2 className=" font-extrabold tracking-[2px] leading-[35px] text-3xl lg:text-4xl text-center lg:text-center text-[#333333]">
                          Remove Image Background
                        </h2>
                        <p className="text-[#F9A431] text-base pt-1 md:pt-4 text-center  ">
                          Completely Free and Automatic
                        </p>
                      </div>
                      <div>
                        <div className="flex flex-col items-center  w-full  py-[16px] px-4 shadow-md rounded-3xl">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() =>
                                document
                                  .getElementById("singleImagePick")
                                  .click()
                              }
                              className="bg-[#0C6559] w-60 shadow-gray-400 shadow-lg transition-all py-4 px-4 text-white font-bold rounded-3xl text-xl"
                            >
                              Upload Images
                            </button>
                          </div>
                          <p className="font-bold pt-4 text-xl">
                            Drop a file here
                          </p>
                          <p className="font-semibold text-[13px]">
                            or paste image
                            {/* <span
                                onClick={pastUrlPrompt}
                                className="underline cursor-pointer"
                              >
                                URL
                              </span> */}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div className="absolute w-full md:w-auto  rounded-md lg:-translate-y-[60%] xl:-translate-y-1/2  lg:right-8 p-5 shadow-md bg-white justify-items-center  flex flex-col items-center  xl:items-center">
                  <div className="w-full lg:w-96 flex flex-col gap-3 md:gap-3">
                    <div className="flex flex-col items-center">
                      <h2 className=" font-extrabold tracking-[2px] leading-[35px] text-3xl lg:text-4xl text-center lg:text-center text-[#333333]">
                        Remove Image Background
                      </h2>
                      <p className="text-[#F9A431] text-base pt-1 md:pt-4 text-center  ">
                        Completely Free and Automatic
                      </p>
                    </div>
                    <div>
                      <div className="flex flex-col items-center  w-full  py-[16px] px-4 shadow-md rounded-3xl">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() =>
                              document.getElementById("singleImagePick").click()
                            }
                            className="bg-[#0C6559] w-60 shadow-gray-400 shadow-lg transition-all py-4 px-4 text-white font-bold rounded-3xl text-xl"
                          >
                            Upload Images
                          </button>
                        </div>
                        <p className="font-bold pt-4 text-xl">
                          Drop a file here
                        </p>
                        <p className="font-semibold text-[13px]">
                          or paste image
                          {/* <span
                              onClick={pastUrlPrompt}
                              className="underline cursor-pointer"
                            >
                              URL
                            </span> */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="absolute bottom-0 w-full">
            <Footer2 />
          </div>
        </div>
        <div className="block lg:hidden ">
          <div className="flex justify-center items-center">
            <video
              className=" object-cover  w-full h-[300px] sm:h-auto "
              muted
              playsInline
              autoPlay
              loop
            >
              <source src="/videos/bg.mp4" type="video/mp4" />
            </video>
          </div>

          <div className=" w-full flex justify-center rounded-md">
            {Object.keys(getUserInfo).length > 0 ? (
              typeof getUserInfo.results !== "undefined" &&
              getUserInfo.results &&
              getUserInfo.results.roleName &&
              getUserInfo.results.roleName !== "admin" && (
                <div className=" w-full  px-8 pt-4 bg-white justify-items-center  flex flex-col items-center  ">
                  <div className="w-full lg:w-80  flex flex-col gap-3 md:gap-3">
                    <div className="flex flex-col items-center">
                      <h2 className=" font-extrabold tracking-[2px] leading-[40px] text-4xl  text-center  text-[#333333]">
                        Remove Image Background
                      </h2>
                      <p className="text-[#F9A431] text-base pt-3 text-center  ">
                        Completely Free and Automatic
                      </p>
                    </div>
                    <div>
                      <div className="flex flex-col items-center  w-full  pt-4 pb-8 px-4 shadow-md rounded-3xl">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() =>
                              document.getElementById("singleImagePick").click()
                            }
                            className="bg-[#0C6559] w-60 shadow-gray-400 shadow-lg transition-all py-4 px-6 text-white font-bold rounded-full text-2xl"
                          >
                            Upload Images
                          </button>
                        </div>
                        <p className="font-bold pt-4 text-xl">
                          Drop a file here
                        </p>
                        <p className="font-semibold text-[13px]">
                          or paste image
                          {/* <span
                            onClick={pastUrlPrompt}
                            className="underline cursor-pointer"
                          >
                            URL
                          </span> */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className=" w-full px-8   rounded-md   pt-4 bg-white justify-items-center  flex flex-col items-center  xl:items-center">
                <div className="w-full lg:w-96  flex flex-col gap-3 md:gap-3">
                  <div className="flex flex-col items-center">
                    <h2 className=" font-extrabold tracking-[2px] leading-[35px] text-3xl lg:text-4xl text-center lg:text-center text-[#333333]">
                      Remove Image Background
                    </h2>
                    <p className="text-[#F9A431] text-base pt-1 md:pt-4 text-center  ">
                      Completely Free and Automatic
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-col items-center pb-8 w-full  pt-4 px-4 shadow-md rounded-3xl">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() =>
                            document.getElementById("singleImagePick").click()
                          }
                          className="bg-[#0C6559] w-60 shadow-gray-400 shadow-lg transition-all py-4 px-4 text-white font-bold rounded-3xl text-xl"
                        >
                          Upload Images
                        </button>
                      </div>
                      <p className="font-bold pt-4 text-xl">Drop a file here</p>
                      <p className="font-semibold text-[13px]">
                        or paste image
                        {/* <span
                          onClick={pastUrlPrompt}
                          className="underline cursor-pointer"
                        >
                          URL
                        </span> */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <div className="absolute bottom-[-150px] w-full">
            <Footer />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default HomeContainerOld;
