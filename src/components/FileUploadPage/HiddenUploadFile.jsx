import React, { useContext, useEffect, useState } from "react";

// import { FileContextManager, OrderContextManager } from "../../App";

import PopupMessage from "../PopUp/PopupMessage";
import { FileContextManager, OrderContextManager } from "@/context/AppContexts";
import { useRouter } from "next/router";

const HiddenUploadFile = () => {
    const [getPopBool, setPopBool] = useState(false);
    const [getMsg, setMsg] = useState('');
    const [fileInfo, setFileInfo, getAfterBeforeImg, setAfterBeforeImg] = useContext(FileContextManager);
    const [getServiceTypeId, setServiceTypeId, getSubscriptionPlanId, setSubscriptionPlanId, getOrderMasterId, setOrderMasterId, getCostDetails, setCostDetails, getOrderDetailInfo, setOrderDetailInfo, getLimitImg, setLimitImg, getLimitUploadImg] = useContext(OrderContextManager);
    const [selectedImages, setSelectedImages] = useState([]);

    // const navigate = useNavigate();
     const router = useRouter();
    

 const uploadFile = (e) => {
  const newFile = e.target.files;

  if (newFile.length > getLimitUploadImg) {
    setMsg(`Attention! Your current subscription limits the upload of more than ${getLimitUploadImg} images.`);
    setPopBool(true);
    return;
  }

  let imageArray = [];
  for (const file of newFile) {
    if (["image/jpeg", "image/png", "image/tiff", "image/tif"].includes(file.type)) {
      const imageUrl = URL.createObjectURL(file);
      imageArray.push({
        file,
        src: imageUrl,
        rework: false,
        proccessImage: {},
        history: [],
        status: "new"
      });
    }
  }

  if (imageArray.length === 0) {
    console.warn("No valid image files selected.");
    return;
  }

  const safeArray = imageArray.map(img => ({
    name: img.file.name,
    src: img.src,
    type: img.file.type,
    size: img.file.size,
    rework: img.rework,
    proccessImage: img.proccessImage,
    history: img.history,
    status: img.status
  }));

  sessionStorage.setItem("selectedImages", JSON.stringify(safeArray));

  router.push("/upload-image");
};


    const PopupCloseFunc = () => {
        setPopBool(false);
        document.getElementById('singleImagePick').value = "";
    }

    return (
        <>
            {getPopBool && <PopupMessage msg={getMsg} callBackCloseFunc={PopupCloseFunc} dark={true} />}
            <input
                onChange={uploadFile}
                type="file"
                id="singleImagePick"
                name="imageFile"
                className="hidden"
                accept="image/jpeg, image/png, image/tiff,.tif"
                multiple
            />
        </>
    )
}

export default HiddenUploadFile;