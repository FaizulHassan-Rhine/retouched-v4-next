import React, { useContext, useEffect, useState } from 'react';
import {
  FileContextManager,
  OrderContextManager,
  apiUrlContextManager,
  menuContextManager,
  userContextManager
} from '../../App';

import AfterBeforeImageStore from './AfterBeforeImageStore';
import PopupMessage from '../PopUp/PopupMessage';
import Navbar from '../Navbar/Navbar';
import { generateRandomString } from '../ComonFunc/ComonFunc';
import Loading3 from '../Loading/Loading_3';
import ReworkConfirmModal from '../ReworkConfirmModal/ReworkConfirmModal';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import PopUpInfo from '../PopUp/PopUpInfo';
import { toast, ToastContainer } from 'react-toastify';

const UploadImageLatest = () => {
  const [getImageInfo, setImageInfo] = useState({});
  const [getImgType, setImgType] = useState("png");
  const [currentPage, setCurrentPage] = useState(1);
  const [getOpenImg, setOpenImg] = useState(0);
  const [getPopBool, setPopBool] = useState(false);
  const [getMsg, setMsg] = useState("");
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
  const [proccessFailCount, setProccessFailcount] = useState(0);
  const [activeSection, setActiveSection] = useState("null");
  const [visibleSection, setVisibleSection] = useState(null); // New state to control visibility of sections
  const [image, setImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [showFirstGrid, setShowFirstGrid] = useState(true);
  const [runOnceTime, setRunOnceTime] = useState(false);
  const [getResize, setResize] = useState({ height: 0, width: 0, ratio: true });
  const [resizOption, setResizeOption] = useState("");
  const [resizeApplyBool, setResizeApplyBool] = useState(true);
  const [loaderBool, setLoaderBool] = useState(false);
  const itemsPerPage = 11;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [storeData, setStoreData] = useState([]);

  // const currentImages = actionStatus == "filter" ? getSuggest.slice(indexOfFirstItem, indexOfLastItem) : fileInfo.length > getProccessImgIndex ? fileInfo.slice(indexOfFirstItem, indexOfLastItem) : getAfterBeforeImg.slice(indexOfFirstItem, indexOfLastItem) ;
  const currentImages = storeData.length > 0 && storeData.slice(indexOfFirstItem, indexOfLastItem);
  const [isActive, setIsActive] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  // const [isReworkModalOpen, setReworkModalOpen] = useState(false);
  const [isReworkConfirmModalOpen, setIsReworkConfirmModalOpen] = useState(false);
  const [getService, setService] = useState({});
  const [getInvoice, setInvoice] = useState({});
  const [popupInfo, setPopInfo] = useState({
    message: "",
    show: false,
  });
  const location = useLocation();
  let resizeImageCount = 0;
    
  const showToastMessage = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000
    });
  };
  const reworkServiceFunc = () => {
    fetch(getApiBasicUrl + "/api/2023-02/services", {
      headers: {
        Authorization: "bearer " + getToken,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("services");
        console.log(data);
        setService(data);
      })
      .catch((error) => console.error("Failed to fetch order details:", error));
  };

  useEffect(() => {
    reworkServiceFunc();
  }, []);

  // New function to call the API for submit resize image -----------------------------------------
  const updateOrderImageService = async (imgId, srvId) => {

    const imageId = imgId;
    const serviceId = srvId;  
    const isChecked = true; 

    const requestBody = {
      order_image_detail_id: imageId,
      service_item_id: serviceId,
      is_checked: isChecked
    };

    console.log("requestBody", requestBody);
    try {
      const response = await fetch(getApiBasicUrl+'/api/2023-02/order-image-service-insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + getToken
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      
      if (data.status_code === 200) {
        console.log("API call was successful", data);
        // Optionally update state or UI here
      } else {
        console.error("Failed to update order image service:", data);
        // Handle failure case here
      }
    } catch (error) {
      console.error("Error calling API:", error);
    } 
  };

  

  const checkImageDimensions = (imageProperty) => {
    if (parseInt(imageProperty.height) === 0 || parseInt(imageProperty.width) === 0 || imageProperty.height.length == 0 || imageProperty.width.length == 0) {
      setResizeOption('');
      return false;
    }
    setResizeOption('custom');
    return true;
  }
  const handleRework = (bl, id) => {
    toggleSection(id);
    if (storeData && storeData[getOpenImg] && storeData[getOpenImg].proccessImage.output_urls) {
      const imageId = storeData[getOpenImg].proccessImage.output_urls[0].order_image_detail_id;
      const imageDetail = {
        order_image_detail_id: imageId,
        service_item_id: id,
        is_selected_for_rework: !bl,
        // is_rework: !bl,
        // "is_download": false
      };

      console.log("imageDetail", imageDetail);
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
            const updatedFileinfo = [...storeData];
            // Update the object at the 2nd index
            updatedFileinfo[getOpenImg] = {
              ...updatedFileinfo[getOpenImg],
              rework: !bl,
            };
            !bl == true
              ? setCountRework(countRework + 1)
              : setCountRework(countRework - 1);
            setStoreData(updatedFileinfo);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleResize = (id) => {
    toggleSection(id);
  }

  const resetResize = () => {
    setResize({ height: 0, width: 0, ratio: true });
    setResizeOption("");
    setResizeApplyBool(true); 
  }
  const sendForResize = () => {

    setLoaderBool(true);
    let selectedImage = [];

    if (resizeApplyBool) {
      selectedImage.push(storeData[getOpenImg]);
    } else {
      selectedImage = storeData;
    }
    resizeImageCount = selectedImage.length;
    const imageWidth = resizOption == "shopify" ? "2048" : resizOption == "facebook" ? "1200" : resizOption == "amazon" ? "2000" : getResize.width;
    const imageHeight = resizOption == "shopify" ? "2048" : resizOption == "facebook" ? "1200" : resizOption == "amazon" ? "2000" : getResize.height;
    const ratio = true;

    selectedImage.map((item, index) => {
      const imageId = item.proccessImage.output_urls[0].order_image_detail_id;
      console.log("imageId", imageId, "imageWidth", imageWidth, "imageHeight", imageHeight, "ratio", ratio, "index", index);
      updateOrderImageService(imageId, visibleSection);  // Call the new API function after resizing is done
      resizeFromServer(imageId, imageWidth, imageHeight, ratio, index);
    })
    // console.log("selectedImage", selectedImage, "imageWidth", imageWidth, "imageHeight", imageHeight, "ratio", ratio);


  }
  const handleServices = (id) => {
    const openImageRkBool = storeData[getOpenImg].rework;

    id == "25b49f1d-b72e-4d2e-8ded-7ac98fe3184e" && handleRework(openImageRkBool, id);
    id == "1d4fe99a-ac36-4a22-b15d-db864acaaa01" && handleResize(id);
  }

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
    setRunOnceTime(true);
    const newFile = storeData;
    if (newFile.length > 0) {
      newOrderCreate(newFile);
    } else {
      // navigate("/");
    }
  };


  const newOrderCreate = (newFile) => {
    disableAllAnchoLink();

    const myOrdre = {
      menu_id: getMenuId,
      service_type_id: getServiceTypeId,
      subscription_plan_type_id: getSubscriptionPlanId,
      file_upload_from: 1,
      file_upload_by: 1
    };

    setTotalImage(() => 0);
    setProccessImgIndex(0);
    // setAfterBeforeImg([]);

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
        let order_id = data.results.order_master_info.order_id;
        setOrderMasterId(order_id);
        // setTotalImage(0)
        // setProccessImgIndex(0)
        // // setFirstImgView(true);
        // // scrollToElement('upload')
        // setAfterBeforeImg([])
        // let i = 0;
        newFile.map((file, index) => {

          if (
            file.file.type == "image/jpeg" ||
            file.file.type == "image/png"
          ) {
            setTotalImage((getTotalImage) => getTotalImage + 1);
            const filePath = file.file.webkitRelativePath.split("/");
            filePath.pop();
            const pathOfFile = filePath.join("/");
            let data = new FormData();
            console.log("order_master_id ", order_id);
            console.log("service_type_id ", getServiceTypeId);
            console.log("file ", file.file);
            console.log("file_relative_path ", pathOfFile);
            console.log("subscription_plan_type_id ", getSubscriptionPlanId);

            data.append("order_master_id", order_id);
            data.append("service_type_id", getServiceTypeId);
            data.append("file", file.file);
            data.append("file_relative_path", pathOfFile);
            data.append("subscription_plan_type_id", getSubscriptionPlanId);
            dataTransfer(data, index);
          } else {
            setTotalImage((getTotalImage) => getTotalImage + 1);
            let file_data = new FormData();

            let order_id = data.results.order_master_info.order_id;
            setOrderMasterId(order_id);
            file_data.append("order_master_id", order_id);
            file_data.append("image_url", file.file);
            dataTransferForUrl(file_data, index);
          }

          //   }
          // }
        }
        )
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const dataTransferForUrl = async (formData, index) => {
    console.log()
    let retryCount = 0;
    const maxRetries = 3;
    // let success = false;
    while (retryCount < maxRetries) {
      try {
        const response = await fetch(
          `${getModelBaseUrl}process-image-url`,
          {
            method: "POST",
            headers: {
              'Authorization': 'bearer ' + getToken
            },
            body: formData,
          }
        );
        const data = await response.json();

        if (data.status_code == 200) {
          // img_i++;
          const updateFileData = [...storeData];
          updateFileData[index].proccesImages = data.results;
          setStoreData(updatedStoreData);
          setProccessImgIndex((getProccessImgIndex) => getProccessImgIndex + 1);
          break; // Break out of the loop if successful
        } else {
          retryCount++; // Increment retry count if status_code is not 200
          await delay(1000); // Wait for 1 second before retrying
        }

      } catch (error) {
        console.error(error);
        retryCount++; // Increment retry count on error
        await delay(1000); // Wait for 1 second before retrying
      }
    }

    if (retryCount === maxRetries) {
      console.error("Maximum retry attempts reached.");
      setProccessFailcount((proccessFailcount) => proccessFailcount + 1);
    }

    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

  };


  const dataTransfer = async (formData, index) => {
    let retryCount = 0;
    const maxRetries = 3;
    // let success = false;
    while (retryCount < maxRetries) {

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

        if (data.status_code == 200) {
          // img_i++;
          const updateFileData = [...storeData];
          updateFileData[index].proccessImage = data.results;
          console.log("updateFileData", updateFileData);
          setStoreData(updateFileData);
          setProccessImgIndex((getProccessImgIndex) => getProccessImgIndex + 1);
          break; // Break out of the loop if successful
        } else {
          retryCount++; // Increment retry count if status_code is not 200
          await delay(1000); // Wait for 1 second before retrying
        }
      } catch (error) {
        console.error(error);
        retryCount++; // Increment retry count on error
        await delay(1000); // Wait for 1 second before retrying
      }
    }

    if (retryCount === maxRetries) {
      console.error("Maximum retry attempts reached.");
      setProccessFailcount((proccessFailcount) => proccessFailcount + 1);
    }

    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  };

  const resizeFromServer = async (imageId, imageWidth, imageHeight, ratio, index) => {
    let retryCount = 0;
    const maxRetries = 3;
    // let success = false;
    while (retryCount < maxRetries) {

      try {
        const response = await fetch(
          `${getModelBaseUrl}image-resizer?order_image_detail_id=${imageId}&height=${imageHeight}&width=${imageWidth}&aspectRatio=${ratio}`,
          {
            method: "GET",
            headers: {
              Authorization: "bearer " + getToken,
            }
          }
        );
        const data = await response.json();

        console.log("Resize Api", data);
        if (data.status_code == 200) {
          console.log("Resize Api success");
          break; // Break out of the loop if successful
        } else {
          retryCount++; // Increment retry count if status_code is not 200
          await delay(1000); // Wait for 1 second before retrying
        }
      } catch (error) {
        console.error(error);
        retryCount++; // Increment retry count on error
        await delay(1000); // Wait for 1 second before retrying
      }
    }

    resizeImageCount = resizeImageCount - 1;
    if (retryCount === maxRetries) {
      console.error("Maximum retry attempts for resize.");
    }

    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }


    if (resizeImageCount == 0) {
      setLoaderBool(false);
      // const popupData = {
      //   message: "Image resizing is complete! Your file is now ready for download.",
      //   show: true,
      // }
      // setPopInfo(popupData);
      showToastMessage("Image resizing is complete! Your file is now ready for download"); 
      setVisibleSection("25b49f1d-b72e-4d2e-8ded-7ac98fe3184e")
    }
  };


  const freeDownloadFunc = () => {
    fetch(
      getApiBasicUrl +
      `/sd-download?order_image_master_id=${getOrderMasterId}&image_format=${getImgType}`,
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
        // downloadAllFile(data.results.image_list)
        downloadAllFileWithIframe(data.results.image_list);
      });
  };


  const viewImage = (data) => {
    setOpenImg(data);
    // setImageInfo(data);
  };

  const PopupCloseFunc = () => {
    setPopBool(false);
  };

  const nextImage = () => {
    storeData.length > getOpenImg + 1 &&
      setOpenImg((getOpenImg) => getOpenImg + 1);
  };
  const prevImage = () => {
    getOpenImg > 0 && setOpenImg((getOpenImg) => getOpenImg - 1);
  };

  const InvoiceFunc = () => {

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
        setInvoiceInfo(data);
        data.status_code == 200 && data.results.downloadable_image_count > 0
          ? setModalOpen(true)
          : DownloadFunc();
      })
      .catch((error) => console.error("Failed to fetch order details:", error));
  };

  const DownloadFunc = () => {
    const orderId = {
      // "spendPoint": 0,
      order_image_master_id: getOrderMasterId,
    };

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
      if (getImgType == "png") {
        downloadFile(data.png_image_output_url, index);
      } else if (getImgType == "jpg") {
        downloadFile(data.original_output_public_url, index);
      } else if (getImgType == "psd") {
        downloadFile(data.psd_image_output_url, index);
      }
    });

    function downloadFile(url, index) {
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

  useEffect(() => {
    console.log("locationState", location);
    location.state ? location.state.selectedImages
      && setStoreData(() => location.state.selectedImages)
      : navigate("/");
  }, [])


  // useEffect(() => {
  //   uploadFile();
  //   window.scroll(0, 0);
  //   document.getElementById("frame-container").innerHTML = "";
  // }, []);

  useEffect(() => {
    if (storeData.length > 0 && runOnceTime == false) {
      console.log(storeData);
      uploadFile();
    }
    document.getElementById("frame-container").innerHTML = "";

  }, [storeData]);

  useEffect(() => { }, [getTotalImage]);

  const modalCallBack = (bl) => {
    setModalOpen(bl);
  };
  // const modalCallBackRework = (bl) => {
  //   setReworkModalOpen(bl);
  // };
  const reworkModalCallBack = (bl) => {
    setIsReworkConfirmModalOpen(bl);
  };

  const confirmCallback = (bl) => {
    setConfirmed(bl);
  };


  const reworkTransfer = () => {

    setIsLoading(true);

    let reworkImageList = [];
    const filterReworkFile = storeData.filter(item => item.rework == true);

    filterReworkFile.map((item, index) => {

      const getData = item.proccessImage;

      const imageId = getData.output_urls[0].order_image_detail_id;
      const imageDetail = {
        order_image_detail_id: imageId,
        service_item_id: getService.results.service_items[0].id,
        is_rework: true,
      };
      reworkImageList.push(imageDetail);

      // }
    })

    const orderId = {
      // "spendPoint": 0,
      order_image_master_id: getOrderMasterId,
      orderImageServiceVM: reworkImageList
    };

    console.log("orderId : ");
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
        console.log("rework confirm : ");
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
      const availableProccesFile = storeData.filter(item => item.rework === false);
      console.log(availableProccesFile);
      if (availableProccesFile.length > 0) {
        const index = storeData.findIndex(item => item.src === availableProccesFile[0].src);
        setOpenImg(() => index);
        console.log(index);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }

    }


    const removeFromRework = () => {
      const updatedFileData = storeData.map(item => ({
        ...item,
        rework: item.rework === true ? null : item.rework == null ? null : false
      }));

      setStoreData(updatedFileData);
    }
  };
  const UpdateOrderStatus = () => {
    const orderStatus = {
      "order_master_id": getOrderMasterId,
    }
    console.log(orderStatus);


    fetch(getApiBasicUrl + "/api/2024-05/update-order-status", {
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

    fetch(getApiBasicUrl + "/api/2024-05/order-place-confirmation-mail", {
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

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const toggleSection = (section) => {
    setActiveSection(section);
    if (visibleSection === section) {
      setVisibleSection(section); // Hide section if clicked again
    } else {
      setVisibleSection(section); // Show the selected section
    }
  };


  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setText("");
  };
  const handleSubmit = () => {
    // Handle the submit action
    console.log("Submitted text:", text);
    handleClose();
  };


  useEffect(() => {
    if (getProccessImgIndex > 0 && getProccessImgIndex === getTotalImage) {
      // alert("Image uploaded successfully");
      confirmEmailFunc();
      UpdateOrderStatus();
    }
  }, [getProccessImgIndex, getTotalImage]);

  // --------------------------------------------------end---------------------------------------------

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

  const downloadLatestFunc = () => {

    fetch(`${getApiBasicUrl}/api/2023-02/cost-breakdown?order_master_image_id=${getOrderMasterId}`, {
      headers: {
        'Authorization': 'bearer ' + getToken,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("cost breakdown");
        console.log("cost", data);
        if (data.status_code == 200 && data.results.order_detail_charge_breakdown.length > 0) {

          const imagePoint = parseInt(data.results.order_detail_charge_breakdown[0].point);

          if (imagePoint > 0) {
            setInvoice(data);
            setModalOpen(true)
            console.log("purchese");
          } else {
            console.log("free");
            zipFileDownload(true)
          }

        } else {
          zipFileDownload()
        }
      })
      .catch(error => console.error("Failed to fetch order details:", error))

  }
  const zipFileDownload = (freeType = false) => {
    const downloadLink = `${getApiBasicUrl}/api/2023-02/user-file-zip-download?order_image_master_id=${getOrderMasterId}&fileType=${getImgType}&is_free=${freeType}`;
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

  const callBackPopupClose = () => {
      const data = {
        message: "",
        show: false,
      }

      setPopInfo(data);
      setVisibleSection("25b49f1d-b72e-4d2e-8ded-7ac98fe3184e");
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
      {console.log("storeData", storeData)}

      {/* {getAfterBeforeImg.length == 0 && <LoadingUploadImage />} */}

      {storeData.length > 0 && (
        <div className="container mx-auto h-full pb-0">
          <div className="lg:flex justify-center pt-10 md:pt-20 gap-12">
            {/* left Section */}
            {/* this is for mobile view  */}
            <div className="w-full px-5  lg:hidden pb-6">
              <div className="scrolling-wrapper gap-3">
                <div className="flex gap-2">
                  {storeData.map((data, index) => (
                    <div
                      key={index}
                      className={`h-[52px] w-[52px] rounded-lg cursor-pointer relative overflow-hidden border-gray-200 border ${data.rework == true
                        ? "hidden"
                        : data.rework == null
                          ? "hidden"
                          : ""
                        }`}
                    >
                      <img
                        onClick={() =>
                          viewImage(index)
                        }
                        className="absolute w-full top-[50%]"
                        style={{ transform: "translateY(-50%)" }}
                        src={data.src}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-[450px] w-[370px] rounded-lg shadow-2xl relative hidden lg:block">
              <div className="px-10  pt-10 pb-3 grid grid-cols-4 gap-3 justify-items-center  ">
                {currentImages.map((data, index) => (
                  <div
                    onClick={() =>
                      viewImage((currentPage - 1) * itemsPerPage + index)
                    }
                    key={index}
                    className={` h-[52px] w-[52px] flex justify-center items-center rounded-lg cursor-pointer relative overflow-hidden border-gray-200 border ${data.rework == true
                      ? "hidden"
                      : data.rework == null
                        ? "hidden"
                        : ""
                      }`}
                  >
                    <img
                      src={data.src}
                      style={{ width: "100%" }}
                      alt="Uploaded content"
                    />
                    {data.proccessImage && data.proccessImage.output_urls ? (
                      ""
                    ) : (
                      <div className="absolute top-0 right-0 w-full h-full bg-gray-800 opacity-85 animate-pulse" />
                    )}
                  </div>
                ))}

                {proccessFailCount > 0 && (
                  <div className="absolute right-0 top-0 bg-rose-800 text-white px-3 py-[2px] text-xs rounded-l-lg">
                    {proccessFailCount}
                  </div>
                )}
              </div>
              <div
                className="absolute bottom-[50%] left-[50%]"
                style={{ transform: "translateX(-50%)" }}
              >
                <div className="flex gap-64  w-full justify-center">
                  <button
                    disabled={currentPage === 1}
                    className="disabled:text-gray-200"
                    onClick={previousPage}
                  >
                    <i className="fa-solid text-xl cursor-pointer fa-caret-left"></i>
                  </button>
                  <button
                    disabled={
                      currentPage === Math.ceil(storeData.length / itemsPerPage)
                    }
                    className=" disabled:text-gray-200"
                    onClick={nextPage}
                  >
                    <i className="fa-solid text-xl cursor-pointer fa-caret-right"></i>
                  </button>
                </div>
              </div>

              <div className="absolute  lg:bottom-7 left-[95px]">
                <div className="flex flex-col  md:flex-col justify-items-center justify-center items-center gap-4 pt-3">
                  <div className="flex  gap-5 lg:gap-3">
                    <div className="form-group form-check ">
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
                      disabled={getProccessImgIndex == 0}
                      onClick={downloadLatestFunc}
                      className={` px-12 py-2  text-white text-sm font-semibold  shadow-lg  rounded-3xl ${getProccessImgIndex == 0
                        ? "bg-slate-300"
                        : "bg-[#F9A431]"
                        }`}
                    >
                      Download All
                    </button>
                    {
                      // <Link to={"/invoice"} className="px-5 py-2 font-bold text-white bg-[#003333] rounded-3xl">Download</Link>
                    }
                  </div>
                </div>
              </div>
            </div>
            {/* testing layouter  */}
            {/* center Section */}
            <div>
              <div className=" flex flex-col justify-items-center items-center ">
                <div className="relative overflow-hidden shadow-md border border-gray-100">
                  {console.log("getOpenImg : " + getOpenImg)}

                  {storeData.length > 0 &&
                    storeData.map((data, index) => (
                      <>
                        {
                          // data.rework !== null &&
                          <div
                            key={index}
                            className={getOpenImg == index ? "block" : "hidden"}
                          >
                            <AfterBeforeImageStore proccesImages={data} />
                          </div>
                        }
                      </>
                    ))}
                  <button
                    onClick={nextImage}
                    className="absolute top-1/2 transform -translate-y-1/2 right-[-30px] w-[30px] text-lg text-[#003333] hover:text-[#006464] transition duration-500 z-30"
                  >
                    <i className="fa-solid fa-angle-right"></i>
                  </button>
                  <button
                    onClick={prevImage}
                    className="absolute top-1/2 transform -translate-y-1/2 left-[-30px] w-[30px] text-lg text-[#003333] hover:text-[#006464] transition duration-500 z-30"
                  >
                    <i className="fa-solid fa-angle-left"></i>
                  </button>
                  <div className="absolute top-2 right-0 text-white rounded-l-3xl  bg-[#0B6156] px-4  py-2">
                    <h2 className="text-xs font-normal">
                      <b className=" ">
                        {getProccessImgIndex}/{storeData.length}
                      </b>
                    </h2>
                  </div>
                </div>
                <div className="flex justify-center w-full items-center bg-white  rounded-md px-4">
                  {getService &&
                    getService.results &&
                    getService.results.service_items &&
                    getService.results.service_items.length > 0 &&
                    getService.results.service_items.map((data, index) => (
                      <>
                        {data.is_visible === true && (
                          <div className="flex justify-center  lg:justify-center  ml-0 lg:ml-2 mt-2 mb-2 lg:mt-0 items-center gap-2 ">
                            {/* <Link
                              className={`cursor-pointer    text-black text-[16px]  focus:outline-none ${
                                storeData[getOpenImg].rework
                                  ? " text-green-500"
                                  : ""
                              }`}
                              onClick={() =>
                                handleRework(
                                  storeData[getOpenImg].rework,
                                  data.id
                                )
                              }
                            >
                              {storeData[getOpenImg].rework ? (
                                <GiCheckMark />
                              ) : (
                                <BsPlusCircleDotted className="w-5 h-5" />
                              )}
                            </Link> */}
                            {/* <h1 className="text-[16px] text-[#0B6156] ">
                              Select to send for rework
                            </h1> */}
                          </div>
                        )}
                      </>
                    ))}
                </div>
                {/* New Buttons for Toggling Sections */}
                <div className="flex justify-center gap-4 shadow-lg w-full">
                  {console.log("getService", getService)}
                  {getService &&
                    getService.results &&
                    getService.results.service_items &&
                    getService.results.service_items.length > 0 &&
                    getService.results.service_items.map((data, index) => (
                      <>
                        {data.is_visible === true && (

                          <button
                            disabled={getTotalImage !== (proccessFailCount + getProccessImgIndex)}
                            onClick={() => handleServices(data.id)}
                            className={`text-sm font-semibold py-1 px-2 flex flex-col justify-center items-center rounded ${activeSection === data.id
                              ? "text-[#FFB752]"
                              : "text-black"
                              }`}
                          >
                            <img
                              className="w-[20px]"
                              src={data.fab_icon_url}
                              alt="BG AI Icon"
                            />
                            {data.id == "25b49f1d-b72e-4d2e-8ded-7ac98fe3184e" ? storeData[getOpenImg].rework ? "Cancel " + data.name : data.name : data.name}
                          </button>

                        )}

                      </>))}

{/* 
                  <button
                    onClick={() => handleServices("1d4fe99a-ac36-4a22-b15d-db864acaaa01")}
                    className={`text-sm font-semibold py-1 px-2 flex flex-col justify-center items-center rounded ${activeSection === "25b49f1d-b72e-4d2e-8ded-7ac98fe3184e"
                      ? "text-[#FFB752]"
                      : "text-black"
                      }`}
                  >
                    <img
                      className="w-[20px]"
                      src={"https://retouched.ai/images/images/Preset.png"}
                      alt="BG AI Icon"
                    />
                    {"Resize"}
                  </button> */}
                  {/*
                   <button
                    onClick={() => toggleSection("section1")}
                    className={`text-sm font-semibold py-1 px-2 flex flex-col justify-center items-center rounded ${activeSection === "section1"
                      ? "text-[#FFB752]"
                      : "text-black"
                      }`}
                  >
                    <img
                      className="w-[20px]"
                      src="/images/images/BG-AI.png"
                      alt="BG AI Icon"
                    />
                    BG AI
                  </button>

                  <button
                    onClick={() => toggleSection("section2")}
                    className={`text-sm font-semibold py-1 px-2 flex flex-col justify-center items-center rounded ${activeSection === "section2"
                      ? "text-[#FFB752]"
                      : "text-black"
                      }`}
                  >
                    <img
                      className="w-[20px]"
                      src="/images/images/Preset.png"
                      alt="Pre-set Icon"
                    />
                    Pre-set
                  </button>

                  <button
                    onClick={() => toggleSection("section3")}
                    className={`text-sm font-semibold py-1 px-2 flex flex-col justify-center items-center rounded ${activeSection === "section3"
                      ? "text-[#FFB752]"
                      : "text-black"
                      }`}
                  >
                    <img
                      className="w-[20px]"
                      src="/images/images/Resize-IMG.png"
                      alt="Re-size Icon"
                    />
                    Re-size
                  </button>

                  <button
                    onClick={() => handleRework(
                      storeData[getOpenImg].rework,
                      data.id
                    )}
                    className={`text-sm font-semibold py-1 px-2 flex flex-col justify-center items-center rounded ${activeSection === "25b49f1d-b72e-4d2e-8ded-7ac98fe3184e"
                      ? "text-[#FFB752]"
                      : "text-black"
                      }`}
                  >
                    <img
                      className="w-[20px]"
                      src="/images/images/Touch-Up.png"
                      alt="Pro touch-up Icon"
                    />
                    {storeData[getOpenImg].rework ? "Undo pro touch-up" : "Pro touch-up"}
                  </button>
                   */}
                </div>
              </div>
            </div>

            {/* right Section */}

            <div className="h-full pb-5 lg:h-[450px] relative w-full lg:w-[400px] xl:w-[370px]  lg:shadow-2xl  flex flex-col  gap-3 md:gap-7 justify-start items-center  ">
              {/* <div className="hidden md:block">
                <div className="flex flex-col items-center justify-center min-h-screen ">
                  <button
                    onClick={handleOpen}
                    className="p-1 rotate-90 text-[14px] bg-[#0B6156] text-white rounded-t-lg  absolute right-[-53px] bottom-[125px]"
                  >
                    Comments
                  </button>

                  {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[999]">
                      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                        <h2 className="text-xl font-bold text-gray-700 mb-4">
                          Your Thoughts
                        </h2>
                        <textarea
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none mb-6 resize-none"
                          placeholder="Write something..."
                          rows="5"
                        ></textarea>
                        <div className="flex justify-end space-x-4">
                          <button
                            onClick={handleSubmit}
                            className="px-5 py-2 bg-[#ffb752] text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                          >
                            Submit
                          </button>
                          <button
                            onClick={handleClose}
                            className="px-5 py-2 bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 transition duration-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div> */}
              {/* Conditionally render the sections based on visibleSection state */}
              {visibleSection === "section1" && (
                <div className="static lg:absolute top-0 left-0 w-full h-full bg-white z-50">
                  {/* Close Button */}
                  <button
                    onClick={() => setVisibleSection("25b49f1d-b72e-4d2e-8ded-7ac98fe3184e")} // Close button functionality
                    className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded"
                  >
                    <IoMdCloseCircleOutline className="text-red-500 text-xl" />
                  </button>

                  {/* Prompt Text Section with Input Field */}
                  <div className="p-4 mt-5">
                    <textarea
                      className="w-full mt-2 p-2 text-black rounded shadow-lg focus:outline-none border text-sm"
                      placeholder="Generate AI Background..."
                      rows="4"
                    ></textarea>
                  </div>

                  {/* Image Grid */}
                  <div className="grid grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 pb-4 pt-2 ">
                    <img
                      src="/images/images/111.jpg"
                      alt="Image 1"
                      className="w-[50px] h-[50px] rounded shadow-md"
                    />
                    <img
                      src="/images/images/222.jpg"
                      alt="Image 2"
                      className="w-[50px] h-[50px] rounded shadow-md"
                    />
                    <img
                      src="/images/images/333.jpg"
                      alt="Image 3"
                      className="w-[50px] h-[50px] rounded shadow-md"
                    />
                    <img
                      src="/images/images/444.jpg"
                      alt="Image 3"
                      className="w-[50px] h-[50px] rounded shadow-md"
                    />
                    <img
                      src="/images/images/555.jpg"
                      alt="Image 3"
                      className="w-[50px] h-[50px] rounded shadow-md"
                    />
                  </div>

                  {/* Radio Button Options */}
                  <div className="">
                    <div className="flex justify-center gap-4 w-full items-center py-2  border bg-white shadow-lg    absolute bottom-[60px] ">
                      <label className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer">
                        <input
                          type="radio"
                          name="option"
                          value="option1"
                          className="mr-2 cursor-pointer appearance-none w-4 h-4 border-2 border-blue-400 rounded-full checked:bg-blue-400 checked:border-transparent transition duration-200"
                        />
                        <span className="text-sm">Apply to all images</span>
                      </label>
                      {/* |
                      <label className="flex items-center text-gray-700  hover:text-blue-600 cursor-pointer">
                        <input
                          type="radio"
                          name="option"
                          value="option2"
                          className="mr-2 cursor-pointer appearance-none w-4 h-4 border-2 border-blue-400 rounded-full checked:bg-blue-400 checked:border-transparent transition duration-200"
                        />
                        <span className="text-sm">Apply to this image</span>
                      </label> */}
                    </div>
                  </div>

                  {/* Buttons: Reset and Done */}
                  <div className="flex justify-between ">
                    <button
                      className=" text-white px-4 text-sm  bg-[#ffb752] py-1 rounded-md shadow-md absolute bottom-2 left-2"
                      onClick={() => {
                        /* Reset functionality */
                      }}
                    >
                      Reset
                    </button>
                    <button
                      className="text-white px-4 text-sm bg-[#ffb752] py-1 rounded-md shadow-md absolute right-2 bottom-2"
                      onClick={() => {
                        /* Done functionality */
                      }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
              {visibleSection === "section2" && (
                <div className="static lg:absolute top-0 left-0 w-full h-full bg-white z-50">
                  {/* Close Button */}
                  <button
                    onClick={() => setVisibleSection("25b49f1d-b72e-4d2e-8ded-7ac98fe3184e")} // Close button functionality
                    className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded"
                  >
                    <IoMdCloseCircleOutline className="text-red-500 text-xl" />
                  </button>

                  {/* Prompt Text Section with Input Field */}
                  <div className="p-4 mt-6 ">
                    <div>
                      {/* Buttons */}
                      <div className="flex justify-center ">
                        <button
                          onClick={() => setShowFirstGrid(true)}
                          className={`px-4 py-2 rounded-l-md shadow-md ${showFirstGrid
                            ? "bg-[#ffb752] text-white"
                            : "bg-white text-black"
                            }`}
                        >
                          Photo
                        </button>
                        <button
                          onClick={() => setShowFirstGrid(false)}
                          className={`px-4 py-2 rounded-r-md shadow-md ${!showFirstGrid
                            ? "bg-[#ffb752] text-white"
                            : "bg-white text-black"
                            }`}
                        >
                          Color
                        </button>
                      </div>

                      {/* Image Sections */}
                      {showFirstGrid ? (
                        <div className="grid grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10">
                          {/* 4 Grid Images */}
                          <div className="flex items-center justify-center w-[50px] h-[50px]">
                            <label className="relative">
                              <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleImageChange}
                              />
                              <div className="w-12 h-12 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center rounded-md">
                                {image ? (
                                  <img
                                    src={image}
                                    alt="Selected"
                                    className="object-cover w-full h-full rounded-md"
                                  />
                                ) : (
                                  <span className="text-gray-500 text-xl">
                                    +
                                  </span>
                                )}
                              </div>
                            </label>
                          </div>
                          <img
                            src="/images/images/555.jpg"
                            alt="Image 2"
                            className="w-[50px] h-[50px] rounded shadow-md"
                          />
                          <img
                            src="/images/images/444.jpg"
                            alt="Image 3"
                            className="w-[50px] h-[50px] rounded shadow-md"
                          />
                          <img
                            src="/images/images/222.jpg"
                            alt="Image 4"
                            className="w-[50px] h-[50px] rounded shadow-md"
                          />
                          <img
                            src="/images/images/111.jpg"
                            alt="Image 4"
                            className="w-[50px] h-[50px] rounded shadow-md"
                          />
                          <img
                            src="/images/images/666.jpg"
                            alt="Image 4"
                            className="w-[50px] h-[50px] rounded shadow-md"
                          />
                          <img
                            src="/images/images/777.jpg"
                            alt="Image 4"
                            className="w-[50px] h-[50px] rounded shadow-md"
                          />
                          <img
                            src="/images/images/888.jpg"
                            alt="Image 4"
                            className="w-[50px] h-[50px] rounded shadow-md"
                          />
                          <img
                            src="/images/images/999.jpg"
                            alt="Image 4"
                            className="w-[50px] h-[50px] rounded shadow-md"
                          />
                          <img
                            src="/images/images/100.jpg"
                            alt="Image 4"
                            className="w-[50px] h-[50px] rounded shadow-md"
                          />
                        </div>
                      ) : (
                        <div className="grid lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10">
                          {/* 5 Grid Images */}
                          <div
                            alt=""
                            className="w-[50px] h-[50px] rounded shadow-md bg-red-500"
                          ></div>
                          <div
                            alt=""
                            className="w-[50px] h-[50px] rounded shadow-md bg-blue-500"
                          ></div>
                          <div
                            alt=""
                            className="w-[50px] h-[50px] rounded shadow-md bg-green-500"
                          ></div>
                          <div
                            alt=""
                            className="w-[50px] h-[50px] rounded shadow-md bg-yellow-500"
                          ></div>
                          <div
                            alt=""
                            className="w-[50px] h-[50px] rounded shadow-md bg-purple-500"
                          ></div>
                          <div
                            alt=""
                            className="w-[50px] h-[50px] rounded shadow-md bg-black"
                          ></div>
                          <div
                            alt=""
                            className="w-[50px] h-[50px] rounded shadow-md bg-teal-500"
                          ></div>
                          <div
                            alt=""
                            className="w-[50px] h-[50px] rounded shadow-md bg-orange-500"
                          ></div>
                          <div
                            alt=""
                            className="w-[50px] h-[50px] rounded shadow-md bg-pink-500"
                          ></div>
                          <div
                            alt=""
                            className="w-[50px] h-[50px] rounded shadow-md bg-lime-500"
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Radio Button Options */}
                  <div className="">
                    <div className="flex justify-center gap-4 w-full items-center py-2  border bg-white shadow-lg    absolute bottom-[60px] ">
                      <label className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer">
                        <input
                          type="radio"
                          name="option"
                          value="option1"
                          className="mr-2 cursor-pointer appearance-none w-4 h-4 border-2 border-blue-400 rounded-full checked:bg-blue-400 checked:border-transparent transition duration-200"
                        />
                        <span className="text-sm">Apply to all images</span>
                      </label>
                      {/* |
                      <label className="flex items-center text-gray-700  hover:text-blue-600 cursor-pointer">
                        <input
                          type="radio"
                          name="option"
                          value="option2"
                          className="mr-2 cursor-pointer appearance-none w-4 h-4 border-2 border-blue-400 rounded-full checked:bg-blue-400 checked:border-transparent transition duration-200"
                        />
                        <span className="text-sm">Apply to this image</span>
                      </label> */}
                    </div>
                  </div>

                  {/* Buttons: Reset and Done */}
                  <div className="flex justify-between ">
                    <button
                      className=" text-white px-4 text-sm  bg-[#ffb752] py-1 rounded-md shadow-md absolute bottom-2 left-2"
                      onClick={() => {
                        /* Reset functionality */
                      }}
                    >
                      Reset
                    </button>
                    <button
                      className="text-white px-4 text-sm bg-[#ffb752] py-1 rounded-md shadow-md absolute right-2 bottom-2"
                      onClick={() => {
                        /* Done functionality */
                      }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
              {visibleSection === "1d4fe99a-ac36-4a22-b15d-db864acaaa01" && (
                <div className="static lg:absolute top-0 left-0 w-full h-full bg-white z-50">
                  <button
                    onClick={() => setVisibleSection("25b49f1d-b72e-4d2e-8ded-7ac98fe3184e")} // Close button functionality
                    className="absolute top-1 right-1 bg-white text-black px-2 py-1 rounded"
                  >
                    <IoMdCloseCircleOutline className="hover:text-red-500 text-xl" />
                  </button>
                  <div className="my-10">
                    <div className="grid grid-cols-2 justify-items-center gap-4 px-6">
                      <div onClick={() => setResizeOption('shopify')} className={`border border-gray-300 px-3 flex flex-col items-center cursor-pointer hover:bg-blue-100 rounded-md shadow-md ${resizOption == 'shopify' && "bg-blue-200"}`}>
                        {/* <h1 className="font-semibold ">Shopify</h1> */}
                        <img src="/images/images/shopify.png" />
                        <h2 className=" text-sm -mt-2">2048 x 2048</h2>
                      </div>
                      <div onClick={() => setResizeOption('facebook')} className={` border border-gray-300 px-3 flex flex-col items-center cursor-pointer hover:bg-blue-100 rounded-md shadow-md ${resizOption == 'facebook' && "bg-blue-200"}`}>
                        {/* <h1 className="font-semibold">Facebook</h1> */}
                        <img src="/images/images/facebook.png" />
                        <h2 className="text-sm -mt-2">1200 x 1200</h2>
                      </div>
                      <div onClick={() => setResizeOption('amazon')} className={`border border-gray-300 px-3 flex flex-col items-center cursor-pointer hover:bg-blue-100 rounded-md shadow-md ${resizOption == 'amazon' && "bg-blue-200"}`}>
                        {/* <h1 className="font-semibold">Amazon</h1> */}
                        <img src="/images/images/amazon.png" />
                        <h2 className="text-sm -mt-2">2000 x 2000</h2>
                      </div>
                      <div onClick={() => setResizeOption('custom')} className={`border cursor-pointer border-gray-300  flex flex-col items-center  hover:bg-blue-100 rounded-md shadow-md  ${resizOption == 'custom' && "bg-blue-200"}`}>
                        <p className="text-center font-semibold">Customize</p>
                        <div className="flex  gap-1 lg:p-1 xl:p-4">
                          <div className="flex flex-col ">
                            <label
                              htmlFor="height"
                              className="mb-2 text-sm text-center text-gray-700"
                            >
                              Height
                            </label>
                            <input
                              type="number"
                              id="height"
                              name="height"
                              className="p-1 text-sm border w-[50px] text-center border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="H"
                              min="0"
                              value={getResize.height}
                              onChange={(e) => { setResize((dt) => { return { ...dt, height: e.target.value } }) }}
                            />
                          </div>

                          {/* Width Input */}
                          <div className="flex flex-col">
                            <label
                              htmlFor="width"
                              className="mb-2 text-sm text-center text-gray-700"
                            >
                              Width
                            </label>
                            <input
                              type="number"
                              id="width"
                              name="width"
                              className="p-1 border text-sm text-center  border-gray-300 w-[50px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="W"
                              min="0"
                              value={getResize.width}
                              onChange={(e) => { setResize((dt) => { return { ...dt, width: e.target.value } }) }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Radio Button Options */}
                  <div className="">
                    <div className="flex justify-center gap-4 w-full items-center py-2  border bg-white shadow-lg static lg:absolute bottom-[60px] ">
                      <label className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer">
                        <input
                          type="radio"
                          name="option"
                          value="option1"
                          onChange={() => setResizeApplyBool(false)}
                          checked={resizeApplyBool === false}
                          className="mr-2 cursor-pointer appearance-none w-4 h-4 border-2 border-blue-400 rounded-full checked:bg-blue-400 checked:border-transparent transition duration-200"
                        />
                        <span className="text-sm">Apply to all images</span>
                      </label>
                      {/* |
                      <label className="flex items-center text-gray-700  hover:text-blue-600 cursor-pointer">
                        <input
                          type="radio"
                          name="option"
                          value="option2"
                          checked={resizeApplyBool}
                          onChange={() => setResizeApplyBool(true)}
                          className="mr-2 cursor-pointer appearance-none w-4 h-4 border-2 border-blue-400 rounded-full checked:bg-blue-400 checked:border-transparent transition duration-200"
                        />
                        <span className="text-sm">Apply to this image</span>
                      </label> */}
                    </div>
                  </div>

                  {/* Buttons: Reset and Done */}
                  <div className="flex justify-between relative lg:static pb-14 md:pb-0">
                    <button
                      className=" text-white px-4 text-sm  bg-[#ffb752] py-1 rounded-md shadow-md absolute bottom-2 left-2"
                      onClick={resetResize}
                    >
                      Reset
                    </button>
                    <button
                      className="text-white px-4 text-sm bg-[#ffb752] py-1 rounded-md shadow-md absolute right-2 bottom-2"
                      onClick={sendForResize}>
                      Done
                    </button>
                  </div>
                </div>
              )}
              {visibleSection === "25b49f1d-b72e-4d2e-8ded-7ac98fe3184e" && (
                <div className="static lg:absolute top-0 left-0 w-full h-full bg-white z-50">
                  {/* <h1 className="text-center font-semibold py-1">
                    {" "}
                    Rework Section
                  </h1> */}
                  <div className="px-10  pt-10 pb-3 grid grid-cols-4 gap-3 justify-items-center  ">

                    {storeData.map((data, index) => (
                      <div
                        onClick={() => viewImage(index)}

                        key={index}
                        className={`h-[52px] w-[52px] flex items-center rounded-lg cursor-pointer relative overflow-hidden border-gray-200 border ${data.rework ? "block" : "hidden"
                          }`}
                      >
                        <img
                          src={data.src}
                          style={{ width: "100%" }}
                          alt="Uploaded content"
                        />
                        {
                          data.proccessImage && data.proccessImage.output_urls ? "" :
                            <div className='absolute top-0 right-0 w-full h-full bg-red-800 opacity-50' />
                        }
                      </div>
                    ))}
                  </div>
                  <div className="lg:pt-20 w-full hidden lg:flex justify-center">
                    {countRework > 0 && (
                      <div
                        onClick={reworkTransfer}
                        className="cursor-pointer absolute bottom-10 mx-auto"
                      >
                        <button className="px-4 py-2 bg-[#F9A431] text-white font-semibold  shadow-lg  rounded-3xl">
                          Confirm
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* loading for resize section */}
              {
                loaderBool &&
                <div className='absolute top-0 left-0 w-full h-full flex z-50'>
                  <div className='m-auto z-40'>
                    <div className="loader_resize"></div>
                  </div>
                  <div className='absolute top-0 left-0 w-full h-full bg-slate-800 opacity-20'></div>
                </div>
              }

              {/* end loading for resize section */}

              {
                //--------------------------------------desktop view start--------------------------
              }
              <div className="hidden lg:block">
                <div className="px-10  pt-10 pb-3 grid grid-cols-4 gap-3 justify-items-center  ">
                  {currentImages.map((data, index) => (
                    <div
                      key={index}
                      className={`h-[52px] w-[52px] rounded-lg cursor-pointer relative overflow-hidden border-gray-200 border ${data.rework ? "block" : "hidden"
                        }`}
                    >
                      <img
                        onClick={() =>
                          viewImage((currentPage - 1) * itemsPerPage + index)
                        }
                        src={data.src}
                        style={{ width: "100%" }}
                        alt="Uploaded content"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {
                // ---------------------mobile view------------------
              }

{visibleSection === "25b49f1d-b72e-4d2e-8ded-7ac98fe3184e" && (

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
)}
              {
                // --------------------------for mobile download-----------
              }
              <div className="flex flex-col w-full p-2 shadow-3xl  md:flex-col justify-items-center justify-center items-center gap-4 lg:hidden">
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
                    disabled={getProccessImgIndex == 0}
                    onClick={downloadLatestFunc}
                    className={` px-12 py-2  text-white font-semibold  shadow-lg  rounded-3xl ${getProccessImgIndex == 0
                      ? "bg-slate-300"
                      : "bg-[#F9A431]"
                      }`}
                  >
                    Download
                  </button>
                </div>
              </div>
              {isLoading && (
                <div className="absolute left-[43%] top-[50%]">
                  <Loading3 />
                </div>
              )}
            </div>
          </div>

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
      {
        popupInfo.show && 
        <PopUpInfo msg={popupInfo.message} dark={true} callBackPopupClose={callBackPopupClose}/>
      }
      <div id="frame-container"></div>
      <ToastContainer />

    </>
  );
};

export default UploadImageLatest;
