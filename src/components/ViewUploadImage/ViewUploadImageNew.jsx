import React, { useContext, useEffect, useState } from "react";

import {
  FileContextManager,
  OrderContextManager,
  apiUrlContextManager,
  menuContextManager,
  userContextManager,
} from "../../App";
import { MdDownload } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import { BsPlus } from "react-icons/bs";
import { BsPlusCircleDotted } from "react-icons/bs";
import "./style.css";
import { TfiDownload } from "react-icons/tfi";
import AfterBeforeImage from "./AfterBeforeImage";
import PopupMessage from "../PopUp/PopupMessage";

import SignInForm from "../SignInForm/SignInForm";
import { TIFFViewer } from "react-tiff";

// import 'tippy.js/dist/tippy.css';
import { generateRandomString } from "../ComonFunc/ComonFunc";

import Navbar from "../Navbar/Navbar";
import Modal from "../Modal/Modal";
import ModalRework from "../ModalRework/ModalRework";
import ReworkConfirmModal from "../ReworkConfirmModal/ReworkConfirmModal";
import Loading3 from "../Loading/Loading_3";
import { ImCancelCircle } from "react-icons/im";

const ViewUploadImage = () => {
  const [getImageInfo, setImageInfo] = useState({});
  const [getImgType, setImgType] = useState("png");
  const [currentPage, setCurrentPage] = useState(1);
  const [getOpenImg, setOpenImg] = useState(0);
  const [getPopBool, setPopBool] = useState(false);
  const [getMsg, setMsg] = useState("");
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [getShowSinginFormForFree, setShowSinginFormForFree] = useState(false);
  const [
    fileInfo,
    setFileInfo,
    getAfterBeforeImg,
    setAfterBeforeImg,
    getProccessImgIndex,
    setProccessImgIndex,
    getTotalImage,
    setTotalImage,
  ] = useContext(FileContextManager);
  const [
    getServiceTypeId,
    setServiceTypeId,
    getSubscriptionPlanId,
    setSubscriptionPlanId,
    getOrderMasterId,
    setOrderMasterId,
    getCostDetails,
    setCostDetails,
    getOrderDetailInfo,
    setOrderDetailInfo,
    getLimitImg,
    setLimitImg,
    getLimitUploadImg,
    setLimitUploadImg,
  ] = useContext(OrderContextManager);
  const [getMenuId, setMenuId, getMenu, setMenu] =
    useContext(menuContextManager);
  const [getUserInfo, setUserInfo, getToken, setToken] =
    useContext(userContextManager);
  const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] =
    useContext(apiUrlContextManager);
  const [getUrlCompleteImg, setUrlCompleteImg] = useState({});
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [countRework, setCountRework] = useState(0);
  const [getConfirmed, setConfirmed] = useState(false);
  const [reworkSelections, setReworkSelections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [invoiceInfo, setInvoiceInfo] = useState({});
  const [processedImagesCount, setProcessedImagesCount] = useState(0);
  const handleImageProcessed = () => {
    setProcessedImagesCount(prev => prev + 1);
  };

  const itemsPerPage = 11;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // const currentImages = actionStatus == "filter" ? getSuggest.slice(indexOfFirstItem, indexOfLastItem) : fileInfo.length > getProccessImgIndex ? fileInfo.slice(indexOfFirstItem, indexOfLastItem) : getAfterBeforeImg.slice(indexOfFirstItem, indexOfLastItem) ;
  const currentImages = fileInfo.length > 0 && fileInfo.slice(indexOfFirstItem, indexOfLastItem);
  const [isActive, setIsActive] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isReworkModalOpen, setReworkModalOpen] = useState(false);
  const [isReworkConfirmModalOpen, setIsReworkConfirmModalOpen] = useState(false);
  const [getService, setService] = useState({});

  const reworkServiceFunc = () => {
    fetch(getApiBasicUrl + "/api/2023-02/services", {
      headers: {
        Authorization: "bearer " + getToken,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setService(data);
      })
      .catch((error) => console.error("Failed to fetch order details:", error));
  };

  useEffect(() => {
    reworkServiceFunc();
  }, []);

  const handleRework = (bl, id) => {
    const found = getAfterBeforeImg.some(el => el.output_urls[0].filter_image_file_path == fileInfo[getOpenImg].file.name);

    if (found) {
      const getData = getAfterBeforeImg.find(el => el.output_urls[0].filter_image_file_path == fileInfo[getOpenImg].file.name)

      const imageId = getData.output_urls[0].order_image_detail_id;
      const imageDetail = {
        order_image_detail_id: imageId,
        service_item_id: getService.results.service_items[0].id,
        is_selected_for_rework: !bl,
        // "is_download": false
      };

      console.log("imageDetail ");
      console.log(imageDetail);
      fetch(getApiBasicUrl + "/api/2023-02/order-image-service-update-for-rework", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + getToken,
        },
        body: JSON.stringify(imageDetail),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status_code == 200) {
            // Create a copy of the fileinfo array
            const updatedFileinfo = [...fileInfo];
            // Update the object at the 2nd index
            updatedFileinfo[getOpenImg] = {
              ...updatedFileinfo[getOpenImg],
              rework: !bl,
            };
            console.log("pdatedFileinfo");
            console.log(updatedFileinfo[getOpenImg]);
            !bl == true
              ? setCountRework(countRework + 1)
              : setCountRework(countRework - 1);
            setFileInfo(updatedFileinfo);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  var img_i = 0;
  const navigate = useNavigate();

  const uploadFile = () => {
    // const newFile = e.target.files;
    const newFile = fileInfo;
    console.log(newFile);
    if (fileInfo.length > 0) {
      console.log(newFile.length);
      console.log(getLimitImg);
      newOrderCreate(newFile);
    } else {
      navigate("/");
    }
  };

  const uploadNewFile = (e) => {
    const newFile = e.target.files;

    const totalImage = getTotalImage + newFile.length;
    // setTotalImage(totalImage);
    if (totalImage > getLimitUploadImg) {
      setMsg(`You can not upload more than ${getLimitUploadImg} images`);
      setPopBool(true);
    } else {
      // setFileInfo(newFile);
      // setLoadProgress(0);
      // setActionStatus("");

      if (fileInfo.length > 0) {
        console.log("update file");
        updateOrderFile(newFile);
      } else {
        console.log("new file");
        newOrderCreate(newFile);
      }
    }
  };



  // -----------------------------------------------------------UpdateOrderStatus------------------------------
  const UpdateOrderStatus = () => {
    const orderStatus = {
      "order_master_id": getOrderMasterId,
    }
    console.log(orderStatus);


    fetch( getApiBasicUrl + "/api/2024-05/update-order-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + getToken,
      },
      body: JSON.stringify(orderStatus),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };
  // -------------------------------------------------confirmEmailFunc------------------------------------
  const confirmEmailFunc = () => {
    const confirmEmailFunc = {
      "order_master_id": getOrderMasterId,
      "image_count": getTotalImage
    }
    console.log(confirmEmailFunc);


    fetch( getApiBasicUrl + "/api/2024-05/order-place-confirmation-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + getToken,
      },
      body: JSON.stringify(confirmEmailFunc),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };

  useEffect(() => {
    if (processedImagesCount > 0 && processedImagesCount === getTotalImage) {
      confirmEmailFunc();
      UpdateOrderStatus();

    }
  }, [processedImagesCount, getTotalImage]);

  // --------------------------------------------------end---------------------------------------------

  const updateOrderFile = (newFile) => {
    // let i = 0;
    for (const file of newFile) {
      console.log(file);
      // console.log("file.type " + file.type)
      if (
        file.type == "image/jpeg" ||
        file.type == "image/png" ||
        file.type == "image/tiff"
      ) {
        if (fileInfo.length > 0) {
          // check if the images is already exits
          const foundFile = fileInfo.find(
            (fl) =>
              fl.file.lastModified === file.lastModified &&
              fl.file.name === file.name &&
              fl.file.size === file.size &&
              fl.file.type === file.type
          );

          if (foundFile) {
            console.log("The file already exists in the array.");
          } else {
            console.log("New file.");
            const imageUrl = URL.createObjectURL(file);
            const fileObject = {
              file: file,
              imageUrl: imageUrl,
              rework: false,
            };
            setFileInfo((fileInfo) => [...fileInfo, fileObject]);
            img_i++;
            setTotalImage((getTotalImage) => getTotalImage + 1);
            console.log(file);
            const filePath = file.webkitRelativePath.split("/");
            filePath.pop();
            console.log(filePath.join("/"));
            const pathOfFile = filePath.join("/");

            console.log("pathOfFile : " + pathOfFile);
            let data = new FormData();
            data.append("order_master_id", getOrderMasterId);
            data.append("service_type_id", getServiceTypeId);
            data.append("file", file);
            data.append("file_relative_path", pathOfFile);
            data.append("subscription_plan_type_id", getSubscriptionPlanId);
            dataTransfer(data);
          }
        }
      }
    }
  };

  const newOrderCreate = (newFile) => {
    console.log("my new order");
    const myOrdre = {
      menu_id: getMenuId,
      service_type_id: getServiceTypeId,
      subscription_plan_type_id: getSubscriptionPlanId,
      file_upload_from: 1,
      file_upload_by: 1
    };
    console.log("getToken : " + getToken);
    console.log("getMenuId : " + getMenuId);
    console.log("getServiceTypeId : " + getServiceTypeId);
    console.log("subscription_plan_type_id : " + getSubscriptionPlanId);

    setTotalImage(() => 0);
    setProccessImgIndex(0);
    setAfterBeforeImg([]);

    fetch(getApiBasicUrl + "/api/2023-02/order-master-info", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + getToken,
      },
      body: JSON.stringify(myOrdre),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(
          "order master id : " + data.results.order_master_info.order_id
        );
        console.log(data);
        let order_id = data.results.order_master_info.order_id;
        setOrderMasterId(order_id);
        // setTotalImage(0)
        // setProccessImgIndex(0)
        // // setFirstImgView(true);
        // // scrollToElement('upload')
        // setAfterBeforeImg([])
        // let i = 0;
        console.log(newFile);
        disableAllAnchoLink();
        for (const file of newFile) {
          console.log(file);
          console.log("file name : " + file.file.name);
          console.log("file name : " + file.file.type);

          if (
            file.file.type == "image/jpeg" ||
            file.file.type == "image/png" ||
            file.file.type == "image/tiff"
          ) {
            console.log("getTotalImage : " + getTotalImage);
            setTotalImage((getTotalImage) => getTotalImage + 1);
            const filePath = file.file.webkitRelativePath.split("/");
            filePath.pop();
            console.log(filePath.join("/"));
            const pathOfFile = filePath.join("/");
            console.log("pathOfFile : " + pathOfFile);
            let data = new FormData();
            data.append("order_master_id", order_id);
            data.append("service_type_id", getServiceTypeId);
            data.append("file", file.file);
            data.append("file_relative_path", pathOfFile);
            data.append("subscription_plan_type_id", getSubscriptionPlanId);
            // console.log("check lenght : " + i + " check img : " + newFile.length)
            dataTransfer(data);
            console.log("The file does not exist in the array.");
          } else {
            setTotalImage((getTotalImage) => getTotalImage + 1);
            let file_data = new FormData();
            console.log(
              "order master id : " + data.results.order_master_info.order_id
            );
            let order_id = data.results.order_master_info.order_id;
            setOrderMasterId(order_id);
            console.log(newFile);
            file_data.append("order_master_id", order_id);
            file_data.append("image_url", file.file);
            dataTransferForUrl(file_data);
          }

          //   }
          // }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const dataTransferForUrl = async (formData) => {
    try {
      // const response = await fetch(`http://103.197.204.22:8008/v.03.13.23/upload-for-ai-processing`,
      const response = await fetch(
        `${getModelBaseUrl}process-image-url`,
        // const response = await fetch(`${getModelBaseUrl}upload-for-ai-processing`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      setProccessImgIndex((getProccessImgIndex) => getProccessImgIndex + 1);

      if (data.status_code == 200) {
        handleImageProcessed();
        // img_i++;
        const found = getAfterBeforeImg.some(
          (el) =>
            el.output_urls[0].compressed_raw_image_public_url ===
            data.results.output_urls[0].compressed_raw_image_public_url
        );
        found == false &&
          setAfterBeforeImg((getAfterBeforeImg) => [
            ...getAfterBeforeImg,
            data.results,
          ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const dataTransfer = async (formData) => {
    console.log("formData");
    try {
      // const response = await fetch(`http://103.197.204.22:8008/v.03.13.23/upload-for-ai-processing`,
      // const response = await fetch(`${getModelBaseUrl}process-image`,
      const response = await fetch(
        `${getModelBaseUrl}process-image`,
        // const response = await fetch(`${getModelBaseUrl}upload-for-ai-processing`,
        {
          method: "POST",
          headers: {
            Authorization: "bearer " + getToken,
          },
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      setProccessImgIndex((getProccessImgIndex) => getProccessImgIndex + 1);

      if (data.status_code == 200) {
        // img_i++;
        handleImageProcessed();
        const found = getAfterBeforeImg.some(
          (el) =>
            el.output_urls[0].compressed_raw_image_public_url ===
            data.results.output_urls[0].compressed_raw_image_public_url
        );
        found == false &&
          setAfterBeforeImg((getAfterBeforeImg) => [
            ...getAfterBeforeImg,
            data.results,
          ]);

        // console.log("img_i " + img_i)
        // img_i == 1 && checkAiProccesDone(data.results.output_urls[0].default_compressed_output_public_url)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const freeDownloadFunc = () => {
    fetch(
      getApiBasicUrl +
      `/api/2023-02/sd-download?order_image_master_id=${getOrderMasterId}&image_format=${getImgType}`,
      {
        headers: {
          Authorization: "bearer " + getToken,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // ZipDownload();
        console.log(data);
        // downloadAllFile(data.results.image_list)
        downloadAllFileWithIframe(data.results.image_list);
      });
  };

  const downloadProccesFile = () => {
    console.log(
      " getTotalImage : " + getTotalImage + " getLimitImg :" + getLimitImg
    );
    if (getTotalImage > getLimitImg) {
      // setPopBool(true);
      // setMsg(`Please login for download all images!!`)
      setShowSinginFormForFree(true);
    } else {
      if (getProccessImgIndex < getTotalImage) {
        setPopBool(true);

        setMsg(`Hang tight! We're still working on processing your image.`);
      } else {
        if (getImgType == "psd") {
          if (getUserInfo.status_code == 200) {
            freeDownloadFunc();
          } else {
            setMsg(`Please login to download the PSD file.`);
            setPopBool(true);
          }
        } else {
          freeDownloadFunc();
        }
      }
    }
  };

  const viewImage = (data) => {
    setOpenImg(() => data);
    console.log("index: " + data);
    // setImageInfo(data);
  };

  const PopupCloseFunc = () => {
    setPopBool(false);
  };
  const SignInHandleClose = () => {
    setShowSignInForm(false);
    setShowSinginFormForFree(false);
  };

  const nextImage = () => {
    fileInfo.length > getOpenImg + 1 &&
      setOpenImg((getOpenImg) => getOpenImg + 1);
  };
  const prevImage = () => {
    getOpenImg > 0 && setOpenImg((getOpenImg) => getOpenImg - 1);
  };

  const InvoiceFunc = () => {
    console.log(
      `${getApiBasicUrl}/api/2023-02/cost-breakdown?order_master_image_id=${getOrderMasterId}`
    );

    fetch(
      `${getApiBasicUrl}/api/2023-02/cost-breakdown?order_master_image_id=${getOrderMasterId}`,
      {
        headers: {
          Authorization: "bearer " + getToken,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setInvoiceInfo(data);
        data.status_code == 200 && data.results.downloadable_image_count > 0
          ? setModalOpen(true)
          : DownloadFunc();
      })
      .catch((error) => console.error("Failed to fetch order details:", error));
  };

  const DownloadFunc = () => {
    console.log(getOrderMasterId);
    const orderId = {
      // "spendPoint": 0,
      order_image_master_id: getOrderMasterId,
    };

    console.log(orderId);
    fetch(
      getApiBasicUrl + "/api/2024-04/reduce-user-points-on-download",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + getToken,
        },
        body: JSON.stringify(orderId),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        downloadAllFileWithIframe(data.results);
        // Handle success here
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });
  };
  const downloadAllFileWithIframe = (fileArray) => {
    fileArray.map((data, index) => {
      console.log("getImgType : " + getImgType);
      if (getImgType == "png") {
        downloadFile(data.png_image_output_url, index);
      } else if (getImgType == "jpg") {
        downloadFile(data.original_output_public_url, index);
      } else if (getImgType == "psd") {
        downloadFile(data.psd_image_output_url, index);
      }
    });

    function downloadFile(url, index) {
      console.log(url);
      const randomFrameName = `ifram-${generateRandomString(6)}-${index}`;

      /*======= frame create =====*/
      const iframe = document.createElement("iframe");
      iframe.name = randomFrameName;
      iframe.style.display = "none";
      document.getElementById("frame-container").appendChild(iframe);
      /*======== frame end ========*/

      var link = document.createElement("a");
      link.href = url;
      link.download = "";
      link.target = randomFrameName;
      document.body.appendChild(link);
      link.click();
      // clearInterval(timeout);

      document.body.removeChild(link);
    }
  };

  const zipFileDownload = () => {
    const downloadLink = `${getApiBasicUrl}/api/2023-02/user-file-zip-download?order_image_master_id=${getOrderMasterId}&fileType=${getImgType}&is_free=true`;
    const randomIndex = Math.floor(Math.random() * 9999);
    downloadFile(downloadLink, randomIndex);


    function downloadFile(url, index) {
      console.log(url);
      const randomFrameName = `ifram-${generateRandomString(6)}-${index}`;

      /*======= frame create =====*/
      const iframe = document.createElement("iframe");
      iframe.name = randomFrameName;
      iframe.style.display = "none";
      document.getElementById("frame-container").appendChild(iframe);
      /*======== frame end ========*/

      var link = document.createElement("a");
      link.href = url;
      link.download = "";
      link.target = randomFrameName;
      document.body.appendChild(link);
      link.click();
      // clearInterval(timeout);

      document.body.removeChild(link);
    }
  }
  useEffect(() => {
    uploadFile();
    window.scroll(0, 0);
    document.getElementById("frame-container").innerHTML = "";
  }, []);

  useEffect(() => { }, [getTotalImage]);

  const modalCallBack = (bl) => {
    setModalOpen(bl);
  };
  const modalCallBackRework = (bl) => {
    setReworkModalOpen(bl);
  };
  const reworkModalCallBack = (bl) => {
    setIsReworkConfirmModalOpen(bl);
  };

  const confirmCallback = (bl) => {
    setConfirmed(bl);
  };

  // const reworkTransfer = () => {

  //   setIsLoading(true);

  //   let reworkImageList = [];
  //   console.log("fileInfo : ");
  //   console.log(fileInfo);
  //   const filterReworkFile = fileInfo.filter(item => item.rework == true);
  //   console.log("filterReworkFile : ");
  //   console.log(filterReworkFile);

  //   filterReworkFile.map((item, index) => {
  //     // const found = fileInfo.some(el => el.rework == true);

  //     // console.log("found : ", found , " index : ", index);
  //     // if (found) {
  //     const getData = getAfterBeforeImg.find(el => el.output_urls[0].filter_image_file_path == item.file.name)

  //     const imageId = getData.output_urls[0].order_image_detail_id;
  //     const imageDetail = {
  //       order_image_detail_id: imageId,
  //       service_item_id: getService.results.service_items[0].id,
  //       is_rework: true,
  //     };
  //     reworkImageList.push(imageDetail);

  //     // }
  //   })

  //   const orderId = {
  //     // "spendPoint": 0,
  //     order_image_master_id: getOrderMasterId,
  //     orderImageServiceVM: reworkImageList
  //   };

  //   console.log(orderId);

  //   fetch(
  //     getApiBasicUrl + "/api/2024-04/reduce-user-points-on-rework",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "bearer " + getToken,
  //       },
  //       body: JSON.stringify(orderId),
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       data.status_code === 200 && removeFromRework();
  //       data.status_code === 200 && setIsReworkConfirmModalOpen(true);
  //       data.status_code === 200 && setIsLoading(false);
  //       data.status_code === 200 && checkAvailableProccessImage();
  //       data.status_code === 200 && setCountRework(0);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       // Handle errors here
  //     });

  //   const checkAvailableProccessImage = () => {
  //     const availableProccesFile = fileInfo.filter(item => item.rework === false);
  //     console.log(availableProccesFile);
  //     if (availableProccesFile.length > 0) {
  //       const index = fileInfo.findIndex(item => item.imageUrl === availableProccesFile[0].imageUrl);
  //       setOpenImg(() => index);
  //       console.log(index);
  //     } else {
  //       navigate("/");
  //       console.log("navigate");
  //     }

  //   }
  //   const removeFromRework = () => {
  //     const updatedFileData = fileInfo.map(item => ({
  //       ...item,
  //       rework: item.rework === true ? null : item.rework == null ? null : false
  //     }));

  //     setFileInfo(updatedFileData);
  //   }


  // };


  // const reworkTransfer = () => {

  //   setIsLoading(true);
  //   const orderId = {
  //     // "spendPoint": 0,
  //     order_image_master_id: getOrderMasterId,
  //   };

  //   fetch(
  //     "https://shopifyapi.retouched.ai/api/2024-04/reduce-user-points-on-rework",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "bearer " + getToken,
  //       },
  //       body: JSON.stringify(orderId),
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       data.status_code === 200 && removeFromRework();
  //       data.status_code === 200 && setIsReworkConfirmModalOpen(true);
  //       data.status_code === 200 && setIsLoading(false);
  //       data.status_code === 200 && checkAvailableProccessImage();
  //       data.status_code === 200 && setCountRework(0);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       // Handle errors here
  //     });

  //   const checkAvailableProccessImage = () => {
  //     const availableProccesFile = fileInfo.filter(item => item.rework === false);
  //     console.log(availableProccesFile);
  //     if (availableProccesFile.length > 0) {
  //       const index = fileInfo.findIndex(item => item.imageUrl === availableProccesFile[0].imageUrl);
  //       setOpenImg(() => index);
  //       console.log(index);
  //     } else {
  //       navigate("/");
  //       console.log("navigate");
  //     }

  //   }
  //   const removeFromRework = () => {
  //     const updatedFileData = fileInfo.map(item => ({
  //       ...item,
  //       rework: item.rework === true ? null : item.rework == null ? null : false
  //     }));

  //     setFileInfo(updatedFileData);
  //   }


  // };
  const reworkTransfer = () => {
 
    setIsLoading(true);
 
 
    let reworkImageList = [];
    console.log("fileInfo : ");
    console.log(fileInfo);
    const filterReworkFile = fileInfo.filter(item => item.rework == true);
    console.log("filterReworkFile : ");
    console.log(filterReworkFile);
 
    filterReworkFile.map((item, index) => {
      // const found = fileInfo.some(el => el.rework == true);
 
      // console.log("found : ", found , " index : ", index);
      // if (found) {
      const getData = getAfterBeforeImg.find(el => el.output_urls[0].filter_image_file_path == item.file.name)
 
      const imageId = getData.output_urls[0].order_image_detail_id;
      const imageDetail = {
        order_image_detail_id: imageId,
        service_item_id: getService.results.service_items[0].id,
        is_rework: true,
      };
      reworkImageList.push(imageDetail);
      // setReworkModalOpen(true);
 
      // }
    })
 
    const orderId = {
      // "spendPoint": 0,
      order_image_master_id: getOrderMasterId,
      orderImageServiceVM: reworkImageList
    };
 
    console.log(orderId);
 
    fetch(
      getApiBasicUrl + "/api/2024-04/user-rework-confirmation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + getToken,
        },
        body: JSON.stringify(orderId),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.status_code === 200 && removeFromRework();
        data.status_code === 200 && setIsReworkConfirmModalOpen(true);
        data.status_code === 200 && setIsLoading(false);
        data.status_code === 200 && checkAvailableProccessImage();
        data.status_code === 200 && setCountRework(0);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });
 
    const checkAvailableProccessImage = () => {
      const availableProccesFile = fileInfo.filter(item => item.rework === false);
      console.log(availableProccesFile);
      if (availableProccesFile.length > 0) {
        const index = fileInfo.findIndex(item => item.imageUrl === availableProccesFile[0].imageUrl);
        setOpenImg(() => index);
        console.log(index);
      } else {
        navigate("/");
        console.log("navigate");
      }
 
    }
    const removeFromRework = () => {
      const updatedFileData = fileInfo.map(item => ({
        ...item,
        rework: item.rework === true ? null : item.rework == null ? null : false
      }));
 
      setFileInfo(updatedFileData);
    }
 
 
  };

  const disableAllAnchoLink = () => {
    const anchors = document.getElementsByTagName("a");
    const menuitem = document.getElementById("dropdown24");

    for (let i = 0; i < anchors.length; i++) {
      anchors[i].style.pointerEvents = "none";
    }
    if (menuitem != null) {
      menuitem.style.pointerEvents = "none";
    }
  } 

  const enalbleAllAnchorLink = () => {
    const anchors = document.getElementsByTagName("a");
    const menuitem = document.getElementById("dropdown24");

    for (let i = 0; i < anchors.length; i++) {
      anchors[i].style.pointerEvents = "auto";
    }
    if (menuitem != null) {
      menuitem.style.pointerEvents = "auto";
    }

  }
  
  useEffect(() => {
    getProccessImgIndex > 0 && getProccessImgIndex == getTotalImage && enalbleAllAnchorLink();
  }, [getProccessImgIndex])

  useEffect(() => {
    const beforeUnloadCallback = (e) => {
      e.preventDefault();
      alert("Are you sure you want to leave?");

    }
    window.addEventListener('beforeunload', beforeUnloadCallback)
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadCallback)
    }

  }, [])
  return (
    <>
      <Navbar />
      {console.log(
        "getTotalImage: " +
          getTotalImage +
          " getProccessImgIndex : " +
          getProccessImgIndex
      )}
      {console.log(fileInfo)}
      {console.log(getService)}
      <input
        onChange={uploadNewFile}
        type="file"
        id="newfileupload"
        name="imageFile"
        className="hidden"
        accept="image/jpeg, image/png, image/tiff,.tif"
        multiple
      />
      {console.log(getAfterBeforeImg)}

      {/* {getAfterBeforeImg.length == 0 && <LoadingUploadImage />} */}

      {fileInfo.length > 0 && (
        <div className="container mx-auto h-full pb-0 lg:pb-5 ">
          <div className="lg:flex justify-center pt-10 md:pt-12 gap-12">
            {/* this is for mobile view */}
            <div className="w-full px-5  lg:hidden pb-6">
              <div className="scrolling-wrapper gap-3">
                <div className="flex gap-2">
                  <div
                    onClick={() =>
                      document.getElementById("newfileupload").click()
                    }
                    className=" text-[19px] bg-white flex flex-col justify-items-center items-center border card  border-gray-400 rounded-lg h-[52px] w-[52px] cursor-pointer pt-[10px] text-gray-600"
                  >
                    {/* <BsPlus className="w-4 h-4 " /> */}
                    <p className="text-[10px] flex justify-center items-center pt-2 ">Upload</p>
                  </div>
                  {fileInfo.map(
                    (data, index) => (
                      <div
                        key={index}
                        className={`h-[52px] w-[52px] rounded-lg cursor-pointer relative overflow-hidden border-gray-200 border ${data.rework ? "hidden" : ""
                          }`}
                      >
                        {data.file.type == "image/tiff" ? (
                          <TIFFViewer
                            onClick={() =>
                              viewImage(
                                (currentPage - 1) * itemsPerPage + index
                              )
                            }
                            tiff={data.imageUrl}
                            style={{
                              width: "100%",
                              height: "100%",
                              padding: "0px",
                            }}
                          />
                        ) : (
                          <img
                            onClick={() =>
                              viewImage(
                                (currentPage - 1) * itemsPerPage + index
                              )
                            }
                            className="absolute w-full top-[50%]"
                            style={{ transform: "translateY(-50%)" }}
                            src={data.imageUrl}
                          />
                        )}
                      </div>
                    )
                    // <img onClick={() => viewImage(index)} className="card h-[52px] w-[52px] rounded-lg cursor-pointer" src={data.output_urls[0].compressed_raw_image_public_url} />
                  )}
                </div>
              </div>
            </div>
            {/* this is for destop view */}

            <div className="h-[450px] w-[260px] rounded-lg shadow-2xl relative hidden lg:block">
              <div className="px-10  pt-10 pb-3 grid grid-cols-3 gap-3 justify-items-center  ">

                {/* { getProccessImgIndex !== getTotalImage &&   */}
                <button
                  disabled={getProccessImgIndex === getTotalImage}
                  onClick={() =>
                    document.getElementById("newfileupload").click()
                  }
                  className="bg-white border border-gray-400 disabled:bg-gray-300 flex flex-col justify-items-center pt-2 items-center  rounded-lg h-[52px] w-[52px] cursor-pointer"
                >
                  <BsPlus className="w-4 h-4" />
                  <p className="text-[10px]">Upload</p>
                </button>
                {/* } */}

                {currentImages.map((data, index) => (
                  <div
                    key={index}
                    className={`h-[52px] w-[52px] flex justify-center items-center rounded-lg cursor-pointer relative overflow-hidden border-gray-200 border ${data.rework == true ? "hidden" : data.rework == null ? "hidden" : ""
                      }`}
                  >
                    {data.file.type === "image/tiff" ? (
                      <TIFFViewer
                        tiff={data.imageUrl}
                        style={{
                          width: "100%",
                          height: "100%",
                          padding: "0px",
                        }}
                      />
                    ) : (
                      <img
                        onClick={() =>
                          viewImage((currentPage - 1) * itemsPerPage + index)
                        }
                        src={data.imageUrl}
                        style={{ width: "100%" }}
                        alt="Uploaded content"

                      />
                    )}
                  </div>
                ))}
              </div>
              <div
                className="absolute bottom-[50%] left-[50%]"
                style={{ transform: "translateX(-50%)" }}
              >
                <div className="flex gap-52  w-full justify-center">
                  <button
                    disabled={currentPage === 1}
                    className="disabled:text-gray-200"
                    onClick={previousPage}
                  >
                    <i className="fa-solid text-xl cursor-pointer fa-caret-left"></i>
                  </button>
                  <button
                    disabled={
                      currentPage === Math.ceil(fileInfo.length / itemsPerPage)
                    }
                    className=" disabled:text-gray-200"
                    onClick={nextPage}
                  >
                    <i className="fa-solid text-xl cursor-pointer fa-caret-right"></i>
                  </button>
                </div>
              </div>
              <div className="absolute  top-[40%] left-[35%]"></div>
              {/* ------------------------------------download--------------------------------------------------------- */}

              <div className="flex absolute lg:bottom-7 left-10 flex-col  md:flex-col justify-items-center justify-center items-center gap-4 ">

                <div className="flex  gap-5 lg:gap-3">
                  <div className="form-group form-check">
                    <input
                      checked={getImgType == "jpg"}
                      onChange={() => setImgType("jpg")}
                      className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      type="radio"
                      id="jpg"
                      name="download_type"
                    />
                    <label htmlFor="jpg" className="cursor-pointer">
                      JPG
                    </label>
                  </div>
                  <div className="form-group form-check">
                    <input
                      checked={getImgType == "png"}
                      onChange={() => setImgType("png")}
                      className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      type="radio"
                      id="png"
                      name="download_type"
                    />
                    <label htmlFor="png" className="cursor-pointer">
                      PNG
                    </label>
                    <br></br>
                  </div>

                  <div className="form-group form-check">
                    <input
                      checked={getImgType == "psd"}
                      onChange={() => setImgType("psd")}
                      className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      type="radio"
                      id="psd"
                      name="download_type"
                    />
                    <label htmlFor="psd" className="cursor-pointer">
                      PSD
                    </label>
                  </div>
                </div>

                <div className="flex  gap-2 lg:flex-col ">
                  <button
                    disabled={getAfterBeforeImg.length == 0}
                    onClick={zipFileDownload}
                    className={` px-12 py-2  text-white font-semibold  shadow-lg  rounded-3xl ${getAfterBeforeImg.length == 0
                      ? "bg-slate-300"
                      : "bg-[#F9A431]"
                      }`}

                  >
                    Download
                  </button>
                  {/* <Link to={"/invoice"}
    
    className="px-5 py-2 font-bold text-white bg-[#003333] rounded-3xl">Download</Link> */}
                </div>
              </div>
            </div>

            {console.log(fileInfo[getOpenImg])}

            <div>
              <div className=" flex flex-col justify-items-center items-center ">
                <div className="relative overflow-hidden shadow-md border border-gray-100">
                  {console.log("getOpenImg : " + getOpenImg)}

                  {fileInfo.length > 0 &&

                    fileInfo.map((data, index) => (
                      <>
                        {
                          data.rework !== null &&

                          <div
                            key={index}
                            className={getOpenImg == index ? "block" : "hidden"}
                          >
                            <AfterBeforeImage proccesImages={data} />
                          </div>
                        }
                      </>
                    ))}
                  <button
                    onClick={nextImage}
                    className="absolute top-1/2 transform -translate-y-1/2 right-0 w-[30px] text-lg text-[#003333] hover:text-[#006464] transition duration-500 z-30"
                  >
                    <i className="fa-solid fa-angle-right"></i>
                  </button>
                  <button
                    onClick={prevImage}
                    className="absolute top-1/2 transform -translate-y-1/2 left-0 w-[30px] text-lg text-[#003333] hover:text-[#006464] transition duration-500 z-30"
                  >
                    <i className="fa-solid fa-angle-left"></i>
                  </button>
                  <div className="absolute top-2 right-0 text-white rounded-l-3xl  bg-[#0B6156] px-4  py-2">
                    <h2 className="text-xs font-normal">
                      {/* {getProccessImgIndex < getTotalImage && (
                      <i className="fa-solid animate-spin mr-2 fa-spinner"></i>
                    )} */}
                      <b className=" ">
                        {getProccessImgIndex}/{getTotalImage}
                      </b>
                    </h2>
                  </div>
                </div>
                <div className="flex justify-center w-full items-center bg-white  rounded-md px-4">
                  {console.log('getService')}
                  {console.log(getService)}
                  {getService && 
                    getService.results &&
                    getService.results.service_items &&
                    getService.results.service_items.length > 0 &&
                    getService.results.service_items.map((data, index) => (
                      <>
                        {data.is_visible === true && (
                          <div className="flex justify-center  lg:justify-center  ml-0 lg:ml-2 mt-2 mb-2 lg:mt-4 items-center gap-2 ">
                            <button
                              className={`cursor-pointer    text-black text-[16px]  focus:outline-none ${fileInfo[getOpenImg].rework
                                ? " text-green-500"
                                : ""
                                }`}
                              onClick={() =>
                                handleRework(
                                  fileInfo[getOpenImg].rework,
                                  data.id
                                )
                              }
                            >
                              {fileInfo[getOpenImg].rework ? (
                                <ImCancelCircle className='text-red-800 w-5 h-5' />

                              ) : (
                                <BsPlusCircleDotted className="w-5 h-5" />
                              )}
                            </button>
                            {fileInfo[getOpenImg].rework ?
                              <h1 className="text-[16px] text-red-800 ">
                                Remove from rework
                              </h1>
                              :
                              <h1 className="text-[16px] text-[#0B6156] ">
                                Select to send for rework
                              </h1>
                            }
                          </div>
                        )}
                      </>
                    ))}
                </div>
              </div>
            </div>

            <div className="h-full  pb-5 lg:h-[450px] relative w-full lg:w-[270px] lg:shadow-2xl  flex flex-col  gap-3 md:gap-7 justify-start items-center  rounded-lg">
              {/* --------------------------------------desktop view start-------------------------- */}
              <div className="hidden lg:block">
                <div className="px-10  pt-10 pb-3 grid grid-cols-3 gap-3 justify-items-center  ">
                  {fileInfo.map((data, index) => (
                    <div
                      key={index}
                      className={`h-[52px] w-[52px] rounded-lg cursor-pointer relative overflow-hidden border-gray-200 border ${data.rework ? "block" : "hidden"
                        }`}
                    >
                      {data.file.type === "image/tiff" ? (
                        <TIFFViewer
                          tiff={data.imageUrl}
                          style={{
                            width: "100%",
                            height: "100%",
                            padding: "0px",
                          }}
                        />
                      ) : (
                        <img
                          onClick={() =>
                            viewImage((currentPage - 1) * itemsPerPage + index)
                          }
                          src={data.imageUrl}
                          style={{ width: "100%" }}
                          alt="Uploaded content"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* ---------------------------------------desktop view end------------------------------ */}
              {/* ----------------------------------------------mobile view start------------------------------ */}
              <div className="block lg:hidden">
                <div className="px-10  pt-10 pb-3 grid grid-cols-6  gap-3 justify-items-center  ">
                  {fileInfo.map((data, index) => (
                    <div
                      key={index}
                      className={`h-[52px] w-[52px] rounded-lg cursor-pointer relative overflow-hidden border-gray-200 border ${data.rework ? "block" : "hidden"
                        }`}
                    >
                      {data.file.type === "image/tiff" ? (
                        <TIFFViewer
                          tiff={data.imageUrl}
                          style={{
                            width: "100%",
                            height: "100%",
                            padding: "0px",
                          }}
                        />
                      ) : (
                        <img
                          onClick={() =>
                            viewImage((currentPage - 1) * itemsPerPage + index)
                          }
                          src={data.imageUrl}
                          style={{ width: "100%" }}
                          alt="Uploaded content"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* ---------------------------------------mobile view end------------------------------ */}
              <div className="lg:pt-20 w-full hidden lg:block">
                {countRework > 0 && (
                  <div
                    // onClick={() => setReworkModalOpen(true)}
                    onClick={reworkTransfer}
                    className="cursor-pointer absolute bottom-10 left-[60px] "
                  >
                    <button className="px-4 py-2 bg-[#F9A431] text-white font-semibold  shadow-lg  rounded-3xl">
                      Confirm Rework
                    </button>
                  </div>
                )}
              </div>
              {/* ---------------------mobile view------------------ */}
              <div className="block lg:hidden">
                <div className=" w-full pb-5 flex justify-center ">
                  {countRework > 0 && (
                    <div
                      // onClick={() => setReworkModalOpen(true)}
                      onClick={reworkTransfer}
                      className="cursor-pointer "
                    >
                      <button className="px-4 py-2 bg-[#F9A431] text-white font-semibold  shadow-lg  rounded-3xl">
                        Confirm Rework
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* --------------------------for mobile download----------------------------- */}
              <div className="flex flex-col  md:flex-col justify-items-center justify-center items-center gap-4 lg:hidden">
                <div className="flex  gap-5 lg:gap-3">
                  <div className="form-group form-check">
                    <input
                      checked={getImgType == "jpg"}
                      onChange={() => setImgType("jpg")}
                      className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      type="radio"
                      id="jpg2"
                      name="download"
                    />
                    <label htmlFor="jpg2" className="cursor-pointer">
                      JPG
                    </label>
                  </div>
                  <div className="form-group form-check">
                    <input
                      checked={getImgType == "png"}
                      onChange={() => setImgType("png")}
                      className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      type="radio"
                      id="png2"
                      name="download"
                    />
                    <label htmlFor="png2" className="cursor-pointer">
                      PNG
                    </label>
                    <br></br>
                  </div>

                  <div className="form-group form-check">
                    <input
                      checked={getImgType == "psd"}
                      onChange={() => setImgType("psd")}
                      className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      type="radio"
                      id="psd2"
                      name="download"
                    />
                    <label htmlFor="psd2" className="cursor-pointer">
                      PSD
                    </label>
                  </div>
                </div>

                <div className="flex  gap-2 lg:flex-col ">
                  <button
                    disabled={getAfterBeforeImg.length == 0}
                    onClick={zipFileDownload}
                    className={` px-12 py-2  text-white font-semibold  shadow-lg  rounded-3xl ${getAfterBeforeImg.length == 0
                      ? "bg-slate-300"
                      : "bg-[#F9A431]"
                      }`}
                  >
                    Download
                  </button>

                </div>
              </div>
              {isLoading &&
                <div className="absolute left-[43%] top-[50%]">
                  <Loading3 />
                </div>
              }
            </div>

          </div>
          {/* {isModalOpen && (
            <Modal
              invoiceInfo={invoiceInfo}
              confirmCallback={confirmCallback}
              modalCallBack={modalCallBack}
              imageType={getImgType}
              orderMasterId={getOrderMasterId}
            />
          )} */}
          {/* {isReworkModalOpen && (
            <ModalRework modalCallBackRework={modalCallBackRework} />
          )} */}
          {isReworkConfirmModalOpen && (
            <ReworkConfirmModal reworkModalCallBack={reworkModalCallBack} />
          )}



        </div>
      )}

      {getPopBool && (
        <PopupMessage
          dark={true}
          msg={getMsg}
          callBackCloseFunc={PopupCloseFunc}
        />
      )}
      {showSignInForm && (
        <SignInForm onClose={SignInHandleClose} redirectUrl="/sub-plan" />
      )}
      {getShowSinginFormForFree && <SignInForm onClose={SignInHandleClose} />}
      <div id="frame-container"></div>
    </>
  );
};

export default ViewUploadImage;