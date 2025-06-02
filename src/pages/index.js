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

  const items = ev.dataTransfer.items;
  const files = ev.dataTransfer.files;
  const imageArray = [];

  const validImageTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/tiff"];

  if (items && items.length > 0) {
    [...items].forEach((item) => {
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (file && validImageTypes.includes(file.type)) {
          const url = URL.createObjectURL(file);
          imageArray.push({
            file,
            src: url,
            rework: false,
            proccessImage: {},
            history: [],
            status: "new",
          });
        }
      }
    });
  } else if (files && files.length > 0) {
    [...files].forEach((file) => {
      if (file && validImageTypes.includes(file.type)) {
        const url = URL.createObjectURL(file);
        imageArray.push({
          file,
          src: url,
          rework: false,
          proccessImage: {},
          history: [],
          status: "new",
        });
      }
    });
  }

  console.log("Dropped files:", imageArray);

  if (imageArray.length > 0) {
    setFileInfo(imageArray);

    const serializableImages = imageArray.map((img) => ({
      src: img.src,
      name: img.file.name,
      type: img.file.type,
      size: img.file.size,
      rework: img.rework,
      proccessImage: img.proccessImage,
      history: img.history,
      status: img.status,
    }));

    sessionStorage.setItem("selectedImages", JSON.stringify(serializableImages));

    // Navigate using router
    router.push("/upload-image");

    // Clean up object URLs after short delay
    setTimeout(() => {
      imageArray.forEach((img) => URL.revokeObjectURL(img.src));
    }, 2000);
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
