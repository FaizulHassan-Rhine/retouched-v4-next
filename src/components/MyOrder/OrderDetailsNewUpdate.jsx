import React, { useContext, useEffect, useState } from "react";
import {
  FileContextManager,
  OrderContextManager,
  apiUrlContextManager,
  userContextManager,
} from "../../App";
import Navbar from "../Navbar/Navbar";
import { GrDownload } from "react-icons/gr";
import DropdownButton from "../Dropdown.js/Dropdown";
import { TbReplace } from "react-icons/tb";
import { generateRandomString } from "../ComonFunc/ComonFunc";
import FullScreenModal from "../Modal/Modal";
import ReactCompareImage from "react-compare-image";
import { GiCheckMark } from "react-icons/gi";
import { BsPlusCircleDotted } from "react-icons/bs";

import ReworkConfirmModal from "../ReworkConfirmModal/ReworkConfirmModal";

const OrderDetailsNew = () => {
  const location = useLocation();
  const { orderData } = location.state;

  const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] =
    useContext(apiUrlContextManager);
  const [getUserInfo, setUserInfo, getToken, setToken] =
    useContext(userContextManager);

  const [allData, setAllData] = useState([]);
  const [invoiceInfo, setInvoiceInfo] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [isReworkModalOpen, setReworkModalOpen] = useState(false);
  const [getConfirmed, setConfirmed] = useState(false);
  const [getImgType, setImgType] = useState("");
  const [isReworkConfirmModalOpen, setIsReworkConfirmModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenrework, setIsOpenrework] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDownloadableIndex, setSelectedDownloadableIndex] = useState(0);
  const [selectedReworkedIndex, setSelectedReworkedIndex] = useState(0);
  const [getService, setService] = useState({});
  const [getCountsRework, setCountsRework] = useState(0);
  const [isModalOpenImage, setIsModalOpenImage] = useState(false);


  const openModal = (data) => {
    setSelectedImage(data);
    setIsModalOpenImage(true);
  };

  const closeModal = () => {
    setIsModalOpenImage(false);
    // setSelectedImage(null);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      closeModal();
    }
  };


  useEffect(() => {
    const initialImage = orderData.orderImageDetails?.find(
      (data) => !data.is_rework
    );
    if (initialImage) {
      setSelectedImage(initialImage); // Set the first downloadable image as default
    }
  }, [orderData.orderImageDetails]);

  const handleImageSelect = (image, index, isRework) => {
    setSelectedImage(image);
    if (isRework) {
      setSelectedReworkedIndex(index);
    } else {
      setSelectedDownloadableIndex(index);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdownrework = () => {
    setIsOpenrework(!isOpenrework);
  };

  // ------------------------------------------------------------------------rework function------------------------------------------------------
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
    const imageId = selectedImage.id;
    const imageDetail = {
      order_image_detail_id: imageId,
      service_item_id: getService.results.service_items[0].id,
      is_selected_for_rework: !bl,
      // is_rework: !bl,
      // "is_download": false
    };

  
    fetch(
      getApiBasicUrl + "/api/2023-02/order-image-service-update-for-rework",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + getToken,
        },
        body: JSON.stringify(imageDetail),
      }
    )
      .then((res) => res.json())
      .then((data) => {

        if (data.status_code == 200) {
          const dataIndex = allData.findIndex(
            (el) => el.id == selectedImage.id
          );

          const updatedFileinfo = [...allData];
          updatedFileinfo[dataIndex] = {
            ...updatedFileinfo[dataIndex],
            rework: !bl,
            status_id: 5,
          };
          setIsModalOpenImage(false);
          setAllData(updatedFileinfo);
   

          if (bl) {
            setCountsRework(getCountsRework - 1);
          } else {
            setCountsRework(getCountsRework + 1);
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const reworkTransfer = () => {
    let reworkImageList = [];

    const filterReworkFile = allData.filter((item) => item.rework == true);


    filterReworkFile.map((item, index) => {
     

      const imageId = item.id;
      const imageDetail = {
        order_image_detail_id: imageId,
        service_item_id: getService.results.service_items[0].id,
        is_rework: true,
      };
      reworkImageList.push(imageDetail);

      // }
    });

    // setIsLoading(true);
    const orderId = {
      // "spendPoint": 0,

      order_image_master_id: orderData.id,
      orderImageServiceVM: reworkImageList,
    };


    fetch(
      // getApiBasicUrl + "/api/2024-04/reduce-user-points-on-rework",
      getApiBasicUrl + "/api/2024-04/user-rework-confirmation",
       {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + getToken,
      },
      body: JSON.stringify(orderId),
    })
      .then((res) => res.json())
      .then((data) => {
   
        // data.status_code === 200 && removeFromRework();
        data.status_code === 200 && setIsReworkConfirmModalOpen(true);
        // data.status_code === 200 && setIsLoading(false);
        data.status_code === 200 && checkAvailableProccessImage();

        data.status_code === 200 && setCountsRework(0);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });

    const checkAvailableProccessImage = () => {
      const availableProccesFile = allData.filter(
        (item) => item.rework === false
      );
 
      if (availableProccesFile.length > 0) {
        const filterData = allData.filter(
          (item) => item.id === availableProccesFile[0].id
        );
        setSelectedImage(filterData[0]);
     
      } else {
      ""
      }
    };

    const removeFromRework = () => {
      const updatedFileData = allData.map((item) => ({
        ...item,
        rework:
          item.rework === true ? null : item.rework == null ? null : false,
      }));

      setAllData(updatedFileData);
    };
  };

  const reworkModalCallBack = (bl) => {
    setIsReworkConfirmModalOpen(bl);
  };

  // ------------------------------------------------------------------------rework function end------------------------------------------------------

  const downloadAllFileWithIframe = (fileArray, imageType) => {
    fileArray.map((data, index) => {
   
      if (!data.is_rework) {
        if (imageType == "png") {
          downloadFile(data.png_image_output_url, index);
        } else if (imageType == "jpg") {
          downloadFile(data.original_output_public_url, index);
        } else if (imageType == "psd") {
          downloadFile(data.psd_image_output_url, index);
        }
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
  const downloadAllFileWithIframeReworked = (fileArray, imgType) => {
    fileArray.map((data, index) => {
  
      if (data.status_id === 25 || data.status_id === 45) {
        if (imgType == "png") {
          downloadFilerework(data.png_image_output_url, index);
        } else if (imgType == "jpg") {
          downloadFilerework(data.original_output_public_url, index);
        } else if (imgType == "psd") {
          downloadFilerework(data.psd_image_output_url, index);
        }
      }
    });

    function downloadFilerework(url, index) {
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

  const zipFileDownload = (imageType) => {
    const downloadAble = `${getApiBasicUrl}/api/2023-02/my-order-user-file-zip-download?order_image_master_id=${orderData.id}&FileType=${imageType}`;
    const randomIndex = Math.floor(Math.random() * 9999);

    downloadFile(downloadAble, randomIndex);
  };

  const zipFileDownloadWork = (imageType) => {
    const reworkDownload = `${getApiBasicUrl}/api/2023-02/my-order-user-rework-completed-file-zip-download?order_image_master_id=${orderData.id}&FileType=${imageType}`;
    const randomIndex = Math.floor(Math.random() * 9999);
    downloadFile(reworkDownload, randomIndex);
  };

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
  const modalCallBack = (bl) => {
    setModalOpen(bl);
  };

  const modalCallBackRework = (bl) => {
    setReworkModalOpen(bl);
  };

  const confirmCallback = (bl) => {
    setConfirmed(bl);
  };

  // ---------------------------------------------------------------------mobile tab-v--------------------------
  const [activeTab, setActiveTab] = useState('downloadable');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'downloadable':
        return (
          <div>
            {/* Downloadable content */}
            <div className="flex justify-between items-center gap-2 px-3 pb-2">
              <h1 className="font-semibold text-lg">Downloadable</h1>
              <div className="">
                <div className="relative inline-block text-left">
                  <div className="flex justify-center items-center gap-2">
                    {orderData.file_upload_from === 2 && (
                      <button
                        type="button"
                        className="px-1.5 py-1 text-[11px] bg-gray-400 rounded-md text-white outline-none shadow-lg flex justify-center items-center gap-2"
                      >
                        <TbReplace className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={toggleDropdown}
                      className="px-1.5 py-1 text-[11px] bg-gray-400 rounded-md text-white outline-none shadow-lg flex justify-center items-center gap-2"
                      id="options-menu"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </button>
                  </div>
                  {isOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <button
                        onClick={() => zipFileDownload('jpg')}
                        className="block px-6 py-1 w-full text-[11px] text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                        role="menuitem"
                      >
                        JPG
                      </button>
                      <button
                        onClick={() => zipFileDownload('png')}
                        className="block px-6 py-1 text-[11px] w-full text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                        role="menuitem"
                      >
                        PNG
                      </button>
                      <button
                        onClick={() => zipFileDownload('psd')}
                        className="block px-6 py-1 text-[11px] w-full text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                        role="menuitem"
                      >
                        PSD
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="h-[385px] overflow-y-auto">
              <div className="grid grid-cols-3 justify-items-center  py-2 gap-4 px-2">
                {allData &&
                  allData.map((data, index) => {
                    if (
                      (data.status_id == 30 && data.rework == false) ||
                      (data.status_id == 45 && data.is_rework == false)
                    ) {
                      return (
                        <div key={index} className="h-28 w-28 shadow-xl rounded-md">
                          <img
                            src={data.compressed_raw_image_public_url}
                            className="w-28 h-28 object-contain rounded-md cursor-pointer"
                            onClick={() => openModal(data)}
                            alt={`Downloadable detail ${index}`}
                          />
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
            <div className="flex justify-center mt-4">
              {getCountsRework > 0 && (
                <div onClick={reworkTransfer} className="cursor-pointer">
                  <button className="px-4 py-2 bg-[#F9A431] text-white font-semibold shadow-lg rounded-3xl">
                    Confirm Rework
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      case 'reworkCompleted':
        return (
          <div>
            {/* Rework Completed content */}
            <div className="flex justify-between items-center gap-2 px-3 mb-2 mt-[7px]">
              <h1 className="font-semibold text-lg">Rework Completed</h1>
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  onClick={toggleDropdownrework}
                  className="px-1.5 py-1 text-[11px] bg-gray-400 rounded-md text-white outline-none shadow-lg flex justify-center items-center gap-2"
                  id="options-menu"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button>
                {isOpenrework && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <button
                      onClick={() => zipFileDownloadWork('jpg')}
                      className="block px-6 py-1 w-full text-[11px] text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                      role="menuitem"
                    >
                      JPG
                    </button>
                    <button
                      onClick={() => zipFileDownloadWork('png')}
                      className="block px-6 py-1 text-[11px] w-full text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                      role="menuitem"
                    >
                      PNG
                    </button>
                    <button
                      onClick={() => zipFileDownloadWork('psd')}
                      className="block px-6 py-1 text-[11px] w-full text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                      role="menuitem"
                    >
                      PSD
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="h-[385px] overflow-y-auto">
              <div className="grid grid-cols-3  justify-items-center  py-2 gap-4 px-2">
                {allData &&
                  allData.map((data, index) => {
                    if (
                      data.status_id === 25 ||
                      (data.status_id === 45 && data.is_rework === true)
                    ) {
                      return (
                        <div key={index} className="h-28 w-28 shadow-xl rounded-md">
                          <img
                            src={data.compressed_raw_image_public_url}
                            className={`w-28 h-28 object-contain rounded-md cursor-pointer ${selectedReworkedIndex === index
                                ? 'border-2 border-red-500'
                                : 'border border-gray-300'
                              }`}
                            onClick={() => openModal(data)}
                            alt={`Reworked detail ${index}`}
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>
            </div>
          </div>
        );
      case 'reworkInProcess':
        return (
          <div>
            {/* Rework In-Process content */}
            <h1 className="font-semibold text-lg mb-2 px-2 mt-5">Rework In-Process</h1>
            <div className="h-[385px] overflow-y-auto">
              <div className="grid grid-cols-3  justify-items-center  py-2  gap-4 px-2">
                {allData &&
                  allData.map((data, index) => {
                    if (data.status_id === 5) {
                      return (
                        <div key={index} className="bg-white shadow-xl rounded-md  w-28 h-28 ">
                          <img
                            className="w-28 h-28 object-contain rounded-md"
                            src={data.compressed_raw_image_public_url}
                            alt={`Detail ${index}`}
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>
            </div>

          </div>
        );
      default:
        return null;
    }
  };


  // --------------------------------------------------------------------------------------------------------------


  useEffect(() => {
    if (orderData && orderData.orderImageDetails.length > 0) {
      const dataAdded = orderData.orderImageDetails.map((item) => ({
        ...item,
        rework: false,
      }));
      setAllData(dataAdded);
    }
  }, [orderData]);

  useEffect(() => { }, [selectedImage]);
  return (
    <>

      

      <div className="bg-[#FAFAFA] h-screen">
        <Navbar />
        <div className=" hidden lg:block">
          <div className="container mx-auto pt-2 relative">
            <div className=" absolute top-2 right-0 bg-gray-300 rounded-full"></div>
            <div className="flex justify-center items-center gap-3 mb-4">
              <h2 className="text-2xl text-center   text-green-900 font-bold">
                <i className="fa-solid mr-2 -mt-1 fa-basket-shopping"></i>ORDER
                DETAILS
              </h2>
              <div className="bg-gray-200 rounded-full">
                <p className="flex justify-center items-center  h-10 w-10 text-black text-sm ">
                  {orderData.order_squence}
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 justify-items-center items-start gap-5 md:gap-20 xl:gap-2">
              <div className="">
                {/* downloadable starte */}
                {allData.some(
                  (item) =>
                    (item.status_id == 30 || item.status_id == 45) &&
                    item.is_rework == false
                ) && (
                    <div>
                      <div className="flex justify-between items-center gap-2 pb-2 ">
                        <h1 className="font-semibold text-lg ">Downloadable</h1>
                        {/* --------------------------------------------------download--------------------------------------- */}
                        <div className="">
                          <div className="relative inline-block text-left">
                            <div className="flex justify-center items-center gap-2">
                              {orderData.file_upload_from === 2 && (
                                <button
                                  type="button"
                                  className="px-1.5 py-1 text-[11px] bg-gray-400 rounded-md text-white outline-none  shadow-lg  flex justify-center items-center  gap-2"
                                >
                                  <TbReplace className="h-4 w-4" />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={toggleDropdown}
                                className="px-1.5 py-1 text-[11px]   bg-gray-400 rounded-md text-white outline-none  shadow-lg  flex justify-center items-center gap-2 "
                                id="options-menu"
                                aria-expanded="true"
                                aria-haspopup="true"
                              >
                                {/* <span className="">Download</span> */}
                                {/* Dropdown arrow */}
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                  />
                                </svg>
                              </button>
                            </div>

                            {/* Dropdown panel */}
                            {isOpen && (
                              <div
                                className="origin-top-right absolute right-[-20px] mt-1  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none "
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                              >
                                {/* Dropdown items */}
                                <button
                                  onClick={() => zipFileDownload("jpg")}
                                  className="block px-6 py-1 w-full text-[11px] text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                                  role="menuitem"
                                >
                                  JPG
                                </button>
                                <button
                                  onClick={() => zipFileDownload("png")}
                                  className="block px-6 py-1 text-[11px] w-full text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                                  role="menuitem"
                                >
                                  PNG
                                </button>
                                <button
                                  onClick={() => zipFileDownload("psd")}
                                  className="block px-6 py-1 text-[11px] w-full text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                                  role="menuitem"
                                >
                                  PSD
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`bg-white p-2 w-[230px] xl:w-[270px] rounded-lg shadow-lg overflow-y-auto  ${allData.some(
                          (item) =>
                            (item.status_id == 25 || item.status_id == 45) &&
                            item.is_rework === true
                        )
                            ? "h-[190px]"
                            : "h-[130px] lg:h-[380px]"
                          } `}
                      >
                        <div className="grid  grid-cols-3  justify-items-center gap-y-3 lg:gap-y-6">
                          {allData &&
                            allData.map((data, index) => (
                              <>
                                {data.status_id == 30 && data.rework == false && (
                                  <div key={index} className="w-[50px] h-[50px]">
                                    <img
                                      key={index}
                                      src={data.compressed_raw_image_public_url}
                                      className={`w-[50px] h-[50px] object-contain rounded-md cursor-pointer ${selectedDownloadableIndex === index
                                          ? "border-2 border-green-500"
                                          : "border border-gray-300"
                                        }`}
                                      onClick={() =>
                                        handleImageSelect(data, index, false)
                                      }
                                      alt={`Downloadable detail ${index}`}
                                    />
                                  </div>
                                )}
                                {data.status_id == 45 &&
                                  data.is_rework == false && (
                                    <div className="w-[50px] h-[50px]">
                                      <img
                                        key={index}
                                        src={data.compressed_raw_image_public_url}
                                        className={`w-[50px] h-[50px] object-contain rounded-md cursor-pointer ${selectedDownloadableIndex === index
                                            ? "border-2 border-green-500"
                                            : "border border-gray-300"
                                          }`}
                                        onClick={() =>
                                          handleImageSelect(data, index, false)
                                        }
                                        alt={`Downloadable detail ${index}`}
                                      />
                                    </div>
                                  )}
                              </>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                {/* downloadable end  */}
                {/* {allData.some((data) => data.status_id === 25) && ( */}
                {/* rework complete start  */}
                {allData.some(
                  (item) =>
                    (item.status_id == 25 || item.status_id == 45) &&
                    item.is_rework === true
                ) && (
                    <div>
                      <div className="flex justify-between items-center gap-2 mb-2 mt-[7px]">
                        <h1 className="font-semibold text-lg ">
                          Rework Completed
                        </h1>
                        <div className="">
                          <div className="relative inline-block text-left">
                            <div>
                              <button
                                type="button"
                                onClick={toggleDropdownrework}
                                className="px-1.5 py-1 text-[11px]  bg-gray-400 rounded-md text-white outline-none  shadow-lg  flex justify-center items-center gap-2"
                                id="options-menu"
                                aria-expanded="true"
                                aria-haspopup="true"
                              >
                                {/* <span className="">Download</span> */}
                                {/* Dropdown arrow */}
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                  />
                                </svg>
                              </button>
                            </div>

                            {/* Dropdown panel */}
                            {isOpenrework && (
                              <div
                                className="origin-top-right absolute right-[-20px] mt-2  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                              >
                                {/* Dropdown items */}
                                <button
                                  onClick={() => zipFileDownloadWork("jpg")}
                                  // onClick={() => reworkedDownloadFunc("jpg")}
                                  className="block px-6 py-1 w-full text-[11px] text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                                  role="menuitem"
                                >
                                  JPG
                                </button>
                                <button
                                  onClick={() => zipFileDownloadWork("png")}
                                  className="block px-6 py-1 text-[11px] w-full text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                                  role="menuitem"
                                >
                                  PNG
                                </button>
                                <button
                                  onClick={() => zipFileDownloadWork("psd")}
                                  className="block px-6 py-1 text-[11px] w-full text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                                  role="menuitem"
                                >
                                  PSD
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`p-2 w-[230px] xl:w-[270px]  bg-white rounded-lg shadow-lg  overflow-y-auto  ${allData.some(
                          (item) =>
                            (item.status_id == 30 || item.status_id == 45) &&
                            item.is_rework == false
                        )
                            ? "h-[150px]"
                            : "h-[380px]"
                          }`}
                      >
                        <div className="grid grid-cols-3 justify-items-center gap-y-6">
                          {allData &&
                            allData.map((data, index) => (
                              <>
                                {data.status_id === 25 && (
                                  <div className="h-[50px] w-[50px]">
                                    <img
                                      key={index}
                                      src={data.compressed_raw_image_public_url}
                                      className={`w-[50px] h-[50px] object-contain rounded-md cursor-pointer ${selectedReworkedIndex === index
                                          ? "border-2 border-red-500"
                                          : "border border-gray-300"
                                        }`}
                                      onClick={() =>
                                        handleImageSelect(data, index, true)
                                      }
                                      alt={`Reworked detail ${index}`}
                                    />
                                  </div>
                                )}
                                {data.status_id === 45 &&
                                  data.is_rework === true && (
                                    <div className="h-[50px] w-[50px]">
                                      <img
                                        key={index}
                                        src={data.compressed_raw_image_public_url}
                                        className={`w-[50px] h-[50px] object-contain rounded-md cursor-pointer ${selectedReworkedIndex === index
                                            ? "border-2 border-red-500"
                                            : "border border-gray-300"
                                          }`}
                                        onClick={() =>
                                          handleImageSelect(data, index, true)
                                        }
                                        alt={`Reworked detail ${index}`}
                                      />
                                    </div>
                                  )}
                              </>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                {/* rework complete end */}
                {/* )} */}
              </div>
              <div>
                <div className=" h-[300px] w-[280px] md:h-[370px] md:w-[380px] bg-white  lg:w-[400px]    shadow-lg ">
                  {allData &&
                    allData.map((data, index) => (
                      <div
                        key={index}
                        className={`h-full  flex-col justify-center ${selectedImage.id == data.id ? "flex" : "hidden"
                          }`}
                      >
                        <ReactCompareImage
                          leftImage={data.compressed_raw_image_public_url}
                          rightImage={data.original_output_public_url}
                        />
                      </div>
                    ))}
                </div>
                <div className="flex justify-center w-full items-center bg-white   px-4">
                  <div
                    className={`flex justify-center  lg:justify-center  ml-0 lg:ml-2 mt-2 mb-2 lg:mt-4 items-center gap-2  ${selectedImage.status_id == 45 ? "hidden" : "block"
                      }`}
                  >
                    <button
                      className={`cursor-pointer text-black text-[16px] focus:outline-none
                       ${selectedImage.rework ? "text-green-500" : ""}`}
                      onClick={() =>
                        handleRework(
                          selectedImage.rework, // Providing a default value if rework is undefined
                          getService.results.service_items[0].id
                        )
                      }
                    >
                      {selectedImage.rework ? (
                        <GiCheckMark />
                      ) : (
                        <BsPlusCircleDotted className="w-5 h-5  text-green-700 font-semibold " />
                      )}
                    </button>
                    <h1 className="text-[16px] text-green-700 font-semibold ">
                      Select to send for pro-touch
                    </h1>
                  </div>
                </div>
              </div>
              {/* rework progresss start */}
              {allData.some((data) => data.status_id === 5) && (
                <div className="">
                  <h1 className="font-semibold text-lg mb-2">
                    Rework In-Process
                  </h1>

                  <div className="w-[230px] xl:w-[270px] h-[130px] lg:h-[380px]   bg-white p-2 shadow-lg rounded-lg  overflow-y-auto  ">
                    <div className="grid grid-cols-3 justify-items-center gap-y-3 lg:gap-y-6 ">
                      {allData &&
                        allData.map((data, index) => (
                          <>
                            {data.status_id === 5 && (
                              <div
                                key={index}
                                className="bg-white shadow-2xl border border-gray-300 rounded-xl w-[52px] h-[52px] flex justify-center items-center"
                              >
                                <img
                                  className="w-[50px] h-[50px] object-contain rounded-md"
                                  src={data.compressed_raw_image_public_url}
                                />
                              </div>
                            )}
                          </>
                        ))}
                    </div>
                  </div>
                  <div className="pt-5 flex justify-center">
                    {getCountsRework > 0 && (
                      <div
                      
                        // onClick={() => setReworkModalOpen(true)}
                        onClick={reworkTransfer}
                        className="cursor-pointer  "
                      >
                        <button className="px-4 py-2 bg-[#F9A431] text-white font-semibold  shadow-lg  rounded-3xl">
                          Confirm
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* rework progress end */}
            </div>

            {/* Dropdown panel */}
          </div>
        </div>
        <div className="block lg:hidden">
          <div className="container mx-auto pt-2 relative">
            <div className="absolute top-2 right-0 bg-gray-300 rounded-full"></div>
            <div className="flex justify-center items-center gap-3 mb-4">
              <h2 className="text-2xl text-center text-green-900 font-bold">
                ORDER DETAILS
              </h2>
              <div className="bg-gray-200 rounded-full">
                <p className="flex justify-center items-center h-10 w-10 text-black text-sm ">{orderData.order_squence}</p>
              </div>
            </div>

            <div className="flex justify-center gap-2 mb-4">
              <button
                onClick={() => handleTabClick('downloadable')}
                className={`px-4 py-1 text-xs rounded-md ${activeTab === 'downloadable' ? 'bg-green-700 text-white' : ' text-black'}`}
              >
                Downloadable
              </button>
              <button
                onClick={() => handleTabClick('reworkCompleted')}
                className={`px-4 py-1 text-xs rounded-md ${activeTab === 'reworkCompleted' ? 'bg-green-700 text-white' : ' text-black'}`}
              >
                R-Completed
              </button>
              <button
                onClick={() => handleTabClick('reworkInProcess')}
                className={`px-4 py-1 rounded-md text-xs ${activeTab === 'reworkInProcess' ? 'bg-green-700 text-white' : ' text-black'}`}
              >
                R-In-Process
              </button>
            </div>

            {renderContent()}

            {isModalOpenImage && (
              <div
                id="modal-overlay"
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                onClick={closeModal}
              >
                <div
                  onClick={(e) => e.stopPropagation()}  // Stop propagation of the click event
                >
                  <div className="h-[300px] w-[330px] bg-white shadow-lg z-50">
                    {allData &&
                      allData.map((data, index) => (
                        <div key={index} className={`h-full flex-col justify-center ${selectedImage && selectedImage.id == data.id ? 'flex' : 'hidden'}`}>
                          <ReactCompareImage
                            leftImage={data.compressed_raw_image_public_url}
                            rightImage={data.default_compressed_output_public_url}
                          />
                        </div>
                      ))}
                  </div>
                  <div className="flex justify-center w-full items-center bg-white px-4">
                    <div
                      className={`flex justify-center ml-0 lg:ml-2 mt-2 mb-2 lg:mt-4 items-center gap-2 ${selectedImage && (selectedImage.status_id == 45 || selectedImage.status_id == 25) ? 'hidden' : 'block'
                        }`}
                    >
                      <button
                        className={`cursor-pointer text-black text-[16px] focus:outline-none ${selectedImage && selectedImage.rework ? 'text-green-500' : ''}`}
                        onClick={() => handleRework(selectedImage && selectedImage.rework, getService.results.service_items[0].id)}
                      >
                        {selectedImage && selectedImage.rework ? (
                          <GiCheckMark />
                        ) : (
                          <BsPlusCircleDotted className="w-5 h-5 text-green-700 font-semibold" />
                        )}
                      </button>
                      <h1 className="text-[16px] text-green-700 font-semibold">Select to send for pro-touch</h1>
                    </div>
                  </div>
                </div>
              </div>

            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <FullScreenModal
          invoiceInfo={invoiceInfo}
          confirmCallback={confirmCallback}
          modalCallBack={modalCallBack}
          imageType={getImgType}
          orderMasterId={orderData.id}
        />
      )}
      <div id="frame-container"></div>
      {isReworkConfirmModalOpen && (
        <ReworkConfirmModal reworkModalCallBack={reworkModalCallBack} />
      )}
    </>
  );
};

export default OrderDetailsNew;
