import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

import HomeContainer from "../components/HomeContainer/HomeContainer";
import Navbar from "../components/Navbar/Navbar";
import PopupMessage from "../components/PopUp/PopupMessage";
import HiddenUploadFile from "../components/FileUploadPage/HiddenUploadFile";
// import HowToUse from "../components/HowToUse/HowToUse";
// import Pricing from "../components/Pricing/Pricing";
// import Footer2 from "../components/Footer/Footer2";

import dragImg from "/public/images/dropimg.png"; // OK to use with `img src` directly

import { FileContextManager, OrderContextManager } from "@/context/AppContexts";
import Footer from "@/components/Footer/Footer";

const HomePage = () => {
  const router = useRouter();

  const [getDrugBool, setDrugBool] = useState(false);
  const [getPopBool, setPopBool] = useState(false);
  const [getMsg, setMsg] = useState("");
  const [elementVisible, setElementVisible] = useState(false);

  const [fileInfo, setFileInfo, getAfterBeforeImg, setAfterBeforeImg] = useContext(FileContextManager);
  const [getServiceTypeId, setServiceTypeId, getSubscriptionPlanId, setSubscriptionPlanId, getOrderMasterId, setOrderMasterId, getCostDetails, setCostDetails, getOrderDetailInfo, setOrderDetailInfo, getLimitImg, setLimitImg, getLimitUploadImg] = useContext(OrderContextManager);

  const dragOverHandler = (e) => {
    e.preventDefault();
    setDrugBool(true);
  };

  const dragEnterHandler = (e) => {
    e.preventDefault();
    setDrugBool(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrugBool(false);
  };

function dropHandler(ev) {
  ev.preventDefault();
  setDrugBool(false);
  console.log("DROP!");

  let imageArray = [];

  if (ev.dataTransfer.items) {
    [...ev.dataTransfer.items].forEach(item => {
      if (item.kind === 'file') {
        const file = item.getAsFile();
        const fileType = file.type;

        if (fileType.startsWith("image/")) {
          const url = URL.createObjectURL(file);
          imageArray.push({
            file,
            src: url,
            rework: false,
            proccessImage: {},
            history: [],
            status: 'new'
          });
        }
      }
    });
  }

  console.log("Dropped files:", imageArray);

  if (imageArray.length > 0) {
    setFileInfo(imageArray);

    const serializableImages = imageArray.map(img => ({
      src: img.src,
      name: img.file.name,
      type: img.file.type,
      size: img.file.size,
      rework: img.rework,
      proccessImage: img.proccessImage,
      history: img.history,
      status: img.status
    }));

    console.log("Serializable for sessionStorage:", serializableImages);
    sessionStorage.setItem("selectedImages", JSON.stringify(serializableImages));

    setTimeout(() => {
      window.location.assign("/upload-image");
    }, 100);

    // Clean up object URLs after navigation
    setTimeout(() => {
      imageArray.forEach(img => URL.revokeObjectURL(img.src));
    }, 1000);
  } else {
    console.warn("⚠️ No valid image files found.");
    setMsg("No valid images detected.");
    setPopBool(true);
  }
}




  const pastFileFunc = (e) => {
    const newFile = e.clipboardData.files;
    const imageTypes = ["image/png", "image/jpeg", "image/tiff"];
    let imageArray = [];

    for (const file of newFile) {
      if (imageTypes.includes(file.type)) {
        const imageUrl = URL.createObjectURL(file);
        const fileObject = {
          file,
          src: imageUrl,
          rework: false,
          proccessImage: {},
          history: [],
          status: "new",
        };
        imageArray.push(fileObject);
      }
    }

   if (imageArray.length > 0) {
  setFileInfo(imageArray); // ✅ Save to context
  sessionStorage.setItem("selectedImages", JSON.stringify(imageArray)); // ✅ Fallback for page reload
  router.push("/upload-image");
}


    window.removeEventListener("paste", pastFileFunc);
  };

  useEffect(() => {
    // Add paste event listener only on client
    window.addEventListener("paste", pastFileFunc, { once: true });

    return () => {
      window.removeEventListener("paste", pastFileFunc);
    };
  }, []);

  const PopupCloseFunc = () => setPopBool(false);

  return (
    <>
     <Navbar/>
      <div
        id="homeContainer"
        className="font-jakarta"
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
        onDragEnter={dragEnterHandler}
        onDragLeave={dragLeaveHandler}
      >
        <HomeContainer />
        {/* <HowToUse /> */}
        {/* <Pricing /> */}
        {/* <Footer2 /> */}
        <HiddenUploadFile />

        {getDrugBool && (
          <img className="fixed w-full h-full top-0 left-0 opacity-90 z-50" src="/images/dropimg.png" alt="Drop Area" />
        )}
      </div>

      {getPopBool && (
        <PopupMessage msg={getMsg} callBackCloseFunc={PopupCloseFunc} dark={true} />
      )}
      <Footer/>
    </>
  );
};

export default HomePage;
