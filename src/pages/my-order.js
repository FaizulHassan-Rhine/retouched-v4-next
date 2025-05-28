import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { IoMdArrowDropdown } from "react-icons/io";
import ReactCompareImage from "react-compare-image";

import { useQuery } from "@tanstack/react-query";
import {
  convertDate,
  generateRandomString,
} from "../components/ComonFunc/ComonFunc";
import { apiUrlContextManager, FileContextManager, OrderContextManager, userContextManager } from "@/context/AppContexts";

const MyOrder = () => {
  const [getUserInfo, setUserInfo, getToken, setToken] =
    useContext(userContextManager);
  const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] =
    useContext(apiUrlContextManager);
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

  const [selectedImage, setSelectedImage] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [viewMode, setViewMode] = useState("default");
  const [viewModeLower, setViewModeLower] = useState("default");
  const [activeDiv, setActiveDiv] = useState("div1");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownMultipleDownload, setDropdownMultipleDownload] =
    useState(false);
  const [dropdownSingleDownloadPopUp, setdropdownSingleDownloadPopUp] =
    useState(false);
  const [dropdownProTouchVisible, setDropdownProTouchVisible] = useState(false);
  const [orderDetailsInfo, setOrderDetailsInfo] = useState([]);
  const [activeTab, setActiveTab] = useState("original");
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMainOpen, setIsMainOpen] = useState(false); // State for the main dropdown
  const [openNestedDropdown, setOpenNestedDropdown] = useState(null); // State for nested dropdowns
  const [isAscending, setIsAscending] = useState(false);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["OrderDetailInfo"],
    queryFn: () =>
      fetch(`${getApiBasicUrl}/api/2023-02/user-order-master-info`, {
        headers: {
          Authorization: `bearer ${getToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((res) => res.json()),
    enabled: false,
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (getUserInfo?.status_code === 200) {
      refetch();
    }
  }, [getUserInfo, refetch]);

  useEffect(() => {
    if (data) {
      const orders = data?.results?.user_order_master_info_list || [];
      const sortedOrders = orders.sort(
        (a, b) => b.order_squence - a.order_squence
      );
      setOrderDetailsInfo(sortedOrders);

      if (sortedOrders.length > 0) {
        setActiveOrder(sortedOrders[0]);
      }
    }
  }, [data]);

  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev);
  };

  const filteredOrders = searchTerm
    ? orderDetailsInfo
        .filter((order) => order.order_squence?.toString() === searchTerm)
        .sort((a, b) =>
          isAscending
            ? a.order_squence - b.order_squence
            : b.order_squence - a.order_squence
        )
    : orderDetailsInfo.sort((a, b) =>
        isAscending
          ? a.order_squence - b.order_squence
          : b.order_squence - a.order_squence
      );

  // single download func
  function downloadFile(url) {
    const index = Math.floor(Math.random() * 9999);
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

  const SingleImageDownloadFunc = async (imgTypes) => {
    try {
      const response = await fetch(
        `${getApiBasicUrl}/api/2023-02/single-image-free-download?order_image_detail_id=${selectedImages}&type=${imgTypes}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + getToken,
          },
        }
      );

      const result = await response.json();
      if (response.ok && result.status_code === 200) {
        downloadFile(result.results.default_compressed_output_public_url);
      } else {
        throw new Error(
          `Failed to fetch image: ${result.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  let isDownloading = false; // Flag to prevent multiple simultaneous downloads

  const MultipleDownloadFunc = async (imageType) => {
    if (isDownloading) {
      console.warn("A download is already in progress. Please wait.");
      return;
    }

    isDownloading = true; // Mark as downloading

    const orderId = {
      order_image_detail_ids: [...selectedImages], // Send only selected image IDs
      order_image_master_id: activeOrder.id,
      fileType: imageType,
    };

    console.log("Request Payload:", orderId);

    try {
      const response = await fetch(
        getApiBasicUrl + "/api/2023-02/user-selected-file-zip-download",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + getToken,
          },
          body: JSON.stringify(orderId),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get file size from headers
      const contentLength = response.headers.get("Content-Length");
      const totalSize = contentLength ? parseInt(contentLength, 10) : null;

      // UI Elements for progress
      const progressBar = document.getElementById("progress-bar");
      const progressText = document.getElementById("progress-text");
      const downloadProgress = document.getElementById("download-progress");
      downloadProgress.style.display = "block";

      // Read response stream
      const reader = response.body.getReader();
      let receivedLength = 0;
      let chunks = [];

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        chunks.push(value);
        receivedLength += value.length;

        // Update Progress UI
        if (totalSize) {
          const percentComplete = (receivedLength / totalSize) * 100;
          progressBar.style.width = `${percentComplete}%`;
          progressText.textContent = `${Math.round(percentComplete)}%`;
        }
      }

      // Combine chunks and verify content type
      const blob = new Blob(chunks);
      const contentType = response.headers.get("Content-Type");

      if (!contentType?.includes("application/zip")) {
        throw new Error(
          "Received unexpected response format, expected a ZIP file."
        );
      }

      // Create a temporary download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `download_${activeOrder.id}.zip`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      console.log("Download completed successfully");

      // Hide UI after success
      downloadProgress.style.display = "none";
    } catch (error) {
      console.error("Download Error:", error);

      // Hide UI in case of an error
      document.getElementById("download-progress").style.display = "none";
    } finally {
      isDownloading = false; // Reset flag to allow new downloads
    }
  };

  const handleSingleAndMultipleDownload = (imageType) => {
    console.log(selectedImages);
    if (selectedImages.length > 1) {
      MultipleDownloadFunc(imageType);
    } else {
      SingleImageDownloadFunc(imageType);
    }
  };

  const zipFileDownload = (imageType) => {
    if (!activeOrder?.id) return;

    const downloadUrl = `${getApiBasicUrl}/api/2023-02/my-order-user-file-zip-download?order_image_master_id=${activeOrder.id}&FileType=${imageType}`;
    console.log("Download URL:", downloadUrl);
    downloadFile(downloadUrl);
  };

  const zipFileDownloadProTouch = (imageType) => {
    if (!activeOrder?.id) return;

    const reworkDownloadUrl = `${getApiBasicUrl}/api/2023-02/my-order-user-rework-completed-file-zip-download?order_image_master_id=${activeOrder.id}&FileType=${imageType}`;

    console.log("Rework Download URL:", reworkDownloadUrl);
    downloadFile(reworkDownloadUrl);
  };

  const handleOrderClick = (order) => {
    setActiveOrder(order);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleImageClick = (image) => {
    toggleImageSelection(image.id);
    setSelectedImage(image);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    setDropdownMultipleDownload(false);
    setDropdownProTouchVisible(false);
  };
  const toggleDropdownMultipleDownload = () => {
    setDropdownMultipleDownload(!dropdownMultipleDownload);
    setDropdownVisible(false);
    setDropdownProTouchVisible(false);
  };

  const toggleDropdownProTouch = () => {
    setDropdownProTouchVisible(!dropdownProTouchVisible);
    setDropdownVisible(false);
    setDropdownMultipleDownload(false);
  };
  const toggleDropdownSingleDownloadPop = () => {
    setdropdownSingleDownloadPopUp(!dropdownSingleDownloadPopUp);
  };

  const toggleMainDropdown = () => {
    setIsMainOpen((prev) => !prev);
    setOpenNestedDropdown(null); // Close nested dropdowns when main dropdown is toggled
  };

  const toggleNestedDropdown = (menu) => {
    setOpenNestedDropdown((prev) => (prev === menu ? null : menu));
  };
  const toggleImageSelection = (imageId) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(imageId)
        ? prevSelected.filter((id) => id !== imageId)
        : [...prevSelected, imageId]
    );
  };

  // let totalProcessedImages = filteredOrders.reduce(
  //   (total, order) => total + order.no_of_images,
  //   0
  // );

  const filterImages = (tab, image) => {
    if (tab === "original") {
      return (
        (image.status_id === 30 && !image.is_rework) ||
        (image.status_id === 45 && !image.is_rework)
      );
    } else if (tab === "pro-touch") {
      return (
        image.status_id === 25 || (image.status_id === 45 && image.is_rework)
      );
    }
    return false;
  };

  // Conditional rendering moved below hooks
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <div className="loader-order"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <div className="System Error">System Error</div>
      </div>
    );
  }

  return (
    <div className="font-gilroy ">
    <Navbar/>
      <div className="">
        <div className="grid md:grid-cols-[280px_auto] gap-4 container mx-auto ">
          <div className=" bg-[#E5E5E5] border-[2px] border-[#000] mx-3 px-2  md:mx-0 pb-2 md:pb-0 mt-6 rounded-lg">
            <div className="flex flex-col gap-[15px]  mt-[15px]">
              <div className="flex justify-between items-end gap-[6px]  px-4 md:px-0 ">
                <h1 className="font-jakarta text-[24px] font-bold leading-[28px]">
                  My Orders
                </h1>

                <div className="block md:hidden">
                  <div className="flex flex-col gap-[6px] ">
                    <h1 className="text-[12px] font-bold leading-[14px]">
                      Total Order Till Date: {data?.results?.total_order_count}
                    </h1>
                    <h1 className="text-[12px] font-bold leading-[14px]">
                      Total images processed:{" "}
                      {data?.results?.total_image_processed}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex   items-center gap-2 px-4 md:px-0">
                <div className="flex w-full items-center gap-2">
                  <div className="w-full md:w-[236px] h-[32px] px-[10px] py-[4px] flex items-center gap-1 bg-white rounded-[100px]">
                    <input
                      type="text"
                      placeholder="Search by Order Number"
                      className="w-full h-full text-[14px] text-[#5A5555] bg-transparent outline-none"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                <div className="md:pr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="hover-icon cursor-pointer"
                    onClick={toggleSortOrder}
                  >
                    <path
                      d="M5.24402 3.5775C5.40029 3.42128 5.61221 3.33351 5.83318 3.33351C6.05415 3.33351 6.26608 3.42128 6.42235 3.5775L9.75568 6.91084C9.90748 7.068 9.99148 7.27851 9.98958 7.497C9.98768 7.7155 9.90004 7.92451 9.74553 8.07902C9.59103 8.23352 9.38202 8.32117 9.16352 8.32306C8.94502 8.32496 8.73452 8.24097 8.57735 8.08917L6.66652 6.17834V15.8333C6.66652 16.0543 6.57872 16.2663 6.42244 16.4226C6.26616 16.5789 6.0542 16.6667 5.83318 16.6667C5.61217 16.6667 5.40021 16.5789 5.24393 16.4226C5.08765 16.2663 4.99985 16.0543 4.99985 15.8333V6.17834L3.08902 8.08917C2.93185 8.24097 2.72135 8.32496 2.50285 8.32306C2.28435 8.32117 2.07534 8.23352 1.92084 8.07902C1.76633 7.92451 1.67869 7.7155 1.67679 7.497C1.67489 7.27851 1.75889 7.068 1.91068 6.91084L5.24402 3.5775ZM13.3332 13.8217V4.16667C13.3332 3.94566 13.421 3.73369 13.5773 3.57741C13.7335 3.42113 13.9455 3.33334 14.1665 3.33334C14.3875 3.33334 14.5995 3.42113 14.7558 3.57741C14.9121 3.73369 14.9999 3.94566 14.9999 4.16667V13.8217L16.9107 11.9108C17.0679 11.759 17.2784 11.675 17.4969 11.6769C17.7153 11.6788 17.9244 11.7665 18.0789 11.921C18.2334 12.0755 18.321 12.2845 18.3229 12.503C18.3248 12.7215 18.2408 12.932 18.089 13.0892L14.7557 16.4225C14.5994 16.5787 14.3875 16.6665 14.1665 16.6665C13.9455 16.6665 13.7336 16.5787 13.5774 16.4225L10.244 13.0892C10.0922 12.932 10.0082 12.7215 10.0101 12.503C10.012 12.2845 10.0997 12.0755 10.2542 11.921C10.4087 11.7665 10.6177 11.6788 10.8362 11.6769C11.0547 11.675 11.2652 11.759 11.4224 11.9108L13.3332 13.8217Z"
                      fill="#5A5555"
                    />
                  </svg>
                </div>
              </div>
              <div className="hidden md:block ">
                <div className="flex flex-col gap-[6px] ">
                  <h1 className="text-[12px] font-bold leading-[14px]">
                    Total Order Till Date: {data?.results?.total_order_count}
                  </h1>
                  <h1 className="text-[12px] font-bold leading-[14px]">
                    Total images processed:{" "}
                    {data?.results?.total_image_processed}
                  </h1>
                </div>
              </div>
            </div>
            <h1 className="w-[236px] h-[1px]  bg-[#CCCBCB] mt-[7px] hidden md:block"></h1>
            {/* Orders List View */}
            <div className="flex justify-center md:justify-start">
              <div className="mt-[13px]  h-[210px] w-[350px] md:h-[347px] md:w-[256px] 2xl:h-[650px] flex flex-row  md:flex-col gap-2 md:gap-6 overflow-x-scroll overflow-y-hidden md:overflow-y-scroll md:overflow-x-hidden mx-1 md:mx-0">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <div
                      onClick={() => handleOrderClick(order)}
                      key={order.order_squence}
                      className={`min-w-[170px] md:w-[236px] h-[191px] rounded-[10px] border-2 cursor-pointer ${
                        activeOrder?.order_squence === order.order_squence
                          ? "border-[#34A853]"
                          : "border-gray-400"
                      }`}
                    >
                      <h1
                        className={`text-[16px] font-bold ${
                          activeOrder?.order_squence === order.order_squence
                            ? "bg-[#34A853] text-white"
                            : "bg-gray-400 text-black"
                        } h-[31px] rounded-t-[6px] flex items-center pl-[13px]`}
                      >
                        Order # {order.order_squence}
                      </h1>
                      <div className="flex flex-col gap-[8px] pt-[5px] pl-[13px] pb-[5px]">
                        <h1 className="text-[12px] leading-[14px]">
                          <span className="font-bold">Order ID:</span>{" "}
                          {order.custom_code}
                        </h1>
                        <h1 className="text-[12px] leading-[14px]">
                          <span className="font-bold">Total Images:</span>{" "}
                          {order.no_of_images}
                        </h1>
                        <h1 className="text-[12px] leading-[14px] text-[#009024]">
                          <span className="font-bold">Completed:</span>{" "}
                          {order.no_of_completed_images}
                        </h1>
                        <h1 className="text-[12px] leading-[14px] text-[#FF7A00]">
                          <span className="font-bold">From Pro-Touch:</span>{" "}
                          {order.from_protouch}
                        </h1>
                        <h1 className="text-[12px] leading-[14px] text-[#007DFC]">
                          <span className="font-bold">Sent for Pro-Touch:</span>{" "}
                          {order.to_protouch}
                        </h1>
                        <h1 className="text-[12px] leading-[14px]">
                          <span className="font-bold">Order Date:</span>{" "}
                          {convertDate(order.order_time)}
                        </h1>
                        <h1 className="text-[12px] leading-[14px]">
                          <span className="font-bold">Order Upload From:</span>{" "}
                          {order.file_upload_from === 1 ? "Web" : "Store"}
                        </h1>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center">
                    <p className="text-gray-500 text-lg font-medium">
                      No orders found matching your search.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-6  px-[12px] md:px-0 mb-4 md:mb-0">
            <div className=" h-[260px] md:h-[250px] 2xl:h-[400px] bg-[#ECECEC] border-[2px] border-[#000] rounded-md relative ">
              <div className="flex justify-between  pt-[14px] px-4  ">
                <div className="flex flex-col">
                  <div className="flex justify-center items-center gap-2 bg-[#87e17f33] w-[127px] h-[30px] px-2 py-1  rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                    >
                      <mask
                        id="mask0_415_1977"
                        //   style="mask-type:luminance"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="1"
                        width="16"
                        height="15"
                      >
                        <path
                          d="M7.99968 15.1667C8.87532 15.1677 9.74254 14.9958 10.5515 14.6607C11.3605 14.3256 12.0953 13.8339 12.7137 13.214C13.3336 12.5956 13.8253 11.8608 14.1604 11.0518C14.4955 10.2429 14.6674 9.37564 14.6663 8.5C14.6674 7.62436 14.4955 6.75714 14.1604 5.94816C13.8253 5.13918 13.3336 4.40439 12.7137 3.786C12.0953 3.16605 11.3605 2.67441 10.5515 2.33931C9.74254 2.0042 8.87532 1.83225 7.99968 1.83333C7.12404 1.83225 6.25682 2.0042 5.44784 2.33931C4.63886 2.67441 3.90407 3.16605 3.28568 3.786C2.66573 4.40439 2.17409 5.13918 1.83898 5.94816C1.50388 6.75714 1.33193 7.62436 1.33301 8.5C1.33193 9.37564 1.50388 10.2429 1.83898 11.0518C2.17409 11.8608 2.66573 12.5956 3.28568 13.214C3.90407 13.8339 4.63886 14.3256 5.44784 14.6607C6.25682 14.9958 7.12404 15.1677 7.99968 15.1667Z"
                          fill="white"
                          stroke="white"
                          strokeWidth="1.33333"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.33301 8.5L7.33301 10.5L11.333 6.5"
                          stroke="black"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </mask>
                      <g mask="url(#mask0_415_1977)">
                        <path d="M0 0.5H16V16.5H0V0.5Z" fill="#009024" />
                      </g>
                    </svg>
                    <div>
                      <h1 className="text-[12px] md:text-[16px] font-bold leading-[19px] text-[#009024]">
                        Completed
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="flex justify-center gap-[8px] items-center ">
                    <div
                      id="download-progress"
                      className="hidden mt-1 md:mt-0 md:mb-5 mb-1 w-full md:w-[250px] md:mr-10"
                    >
                      <div className="flex flex-col justify-items-center justify-center md:flex-row items-center gap-[2px] md:gap-3 ">
                        <span className="text-xs md:text-sm font-medium text-gray-700">
                          Downloading...
                        </span>
                        <div className="flex justify-center gap-[3px] md:gap-3 items-center">
                          <div className="w-[70px] md:w-[150px] h-2 bg-white rounded overflow-hidden">
                            <div
                              id="progress-bar"
                              className="h-2 bg-green-600  "
                            ></div>
                          </div>
                          <span
                            id="progress-text"
                            className="text-xs md:text-sm   font-medium progress-bar-anim text-gray-700"
                          >
                            0%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-3">
                  <div className="mr-6 md:mr-0">
                    <button
                      className={`px-2 py-1 rounded font-semibold transition ease-in-out delay-50  ${
                        isSelectMode
                          ? "hover:bg-red-50 text-red-500 border-red-600 border text-[14px]"
                          : "hover:bg-green-50 text-[#009024] text-[14px] border border-green-600"
                      }`}
                      onClick={() => {
                        setIsSelectMode((prev) => !prev);
                        setSelectedImages([]);
                      }}
                    >
                      {isSelectMode ? "Unselect " : "Select "}
                    </button>
                  </div>
                  <div className="hidden md:block">
                    <div className="flex justify-center gap-[10px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        onClick={() => setViewMode("default")}
                        className={`btn cursor-pointer transition duration-500 ${
                          viewMode === "default"
                        }`}
                      >
                        <path
                          d="M5.504 18H10.908C11.0633 18 11.1797 17.9277 11.257 17.783C11.3343 17.6383 11.3257 17.495 11.231 17.353L9.766 15.352C9.678 15.2447 9.57 15.191 9.442 15.191C9.314 15.191 9.20633 15.2447 9.119 15.352L8.096 16.687C8.00933 16.7943 7.90167 16.851 7.773 16.857C7.645 16.8637 7.53733 16.8133 7.45 16.706L6.85 15.925C6.76333 15.8177 6.65567 15.7647 6.527 15.766C6.399 15.768 6.29133 15.823 6.204 15.931L5.156 17.354C5.06133 17.4953 5.05633 17.6383 5.141 17.783C5.22567 17.9277 5.34667 18 5.504 18ZM5.616 20C5.17133 20 4.791 19.8417 4.475 19.525C4.159 19.2083 4.00067 18.8287 4 18.386V13C4 12.556 4.15833 12.176 4.475 11.86C4.791 11.5427 5.171 11.384 5.615 11.384H11C11.444 11.384 11.824 11.5423 12.14 11.859C12.4573 12.1757 12.616 12.556 12.616 13V18.385C12.616 18.829 12.4577 19.209 12.141 19.525C11.8243 19.8417 11.444 20 11 20H5.616ZM4.616 5.23C4.44133 5.23 4.295 5.17133 4.177 5.054C4.059 4.936 4 4.79 4 4.616C4 4.44133 4.059 4.295 4.177 4.177C4.295 4.059 4.44133 4 4.616 4C4.79067 4 4.93667 4.059 5.054 4.177C5.17133 4.295 5.23033 4.44133 5.231 4.616C5.23167 4.79067 5.17267 4.93666 5.054 5.054C4.93533 5.17133 4.789 5.23033 4.615 5.231M8.308 5.231C8.13333 5.231 7.987 5.172 7.869 5.054C7.751 4.936 7.692 4.79 7.692 4.616C7.692 4.442 7.751 4.29567 7.869 4.177C7.987 4.05833 8.13333 3.99933 8.308 4C8.48267 4.00067 8.62867 4.05967 8.746 4.177C8.86333 4.29433 8.92233 4.44067 8.923 4.616C8.92367 4.79133 8.86467 4.93733 8.746 5.054C8.62733 5.17067 8.48133 5.22967 8.308 5.231ZM12 5.231C11.826 5.231 11.68 5.172 11.562 5.054C11.444 4.936 11.385 4.79 11.385 4.616C11.385 4.442 11.444 4.29567 11.562 4.177C11.68 4.05833 11.826 3.99933 12 4C12.174 4.00067 12.3203 4.05967 12.439 4.177C12.5577 4.29433 12.6163 4.44067 12.615 4.616C12.6137 4.79133 12.5547 4.93733 12.438 5.054C12.3213 5.17067 12.1753 5.23033 12 5.231ZM15.692 5.23C15.518 5.23 15.372 5.171 15.254 5.053C15.136 4.935 15.077 4.78866 15.077 4.614C15.077 4.43933 15.136 4.29333 15.254 4.176C15.372 4.05867 15.518 3.99967 15.692 3.999C15.866 3.99833 16.0123 4.05733 16.131 4.176C16.2497 4.29467 16.3087 4.441 16.308 4.615C16.3073 4.789 16.2483 4.935 16.131 5.053C16.0137 5.171 15.8673 5.23 15.692 5.23ZM19.384 5.23C19.21 5.23 19.064 5.171 18.946 5.053C18.828 4.935 18.769 4.78866 18.769 4.614C18.769 4.43933 18.828 4.29333 18.946 4.176C19.064 4.05867 19.21 3.99967 19.384 3.999C19.558 3.99833 19.7043 4.05733 19.823 4.176C19.9417 4.29467 20.0007 4.441 20 4.615C19.9993 4.789 19.9403 4.935 19.823 5.053C19.7057 5.171 19.5587 5.23 19.384 5.23ZM15.692 20C15.518 20 15.372 19.941 15.254 19.823C15.136 19.705 15.077 19.559 15.077 19.385C15.077 19.211 15.136 19.0647 15.254 18.946C15.372 18.8273 15.518 18.7683 15.692 18.769C15.866 18.7697 16.0123 18.8287 16.131 18.946C16.2497 19.0633 16.3087 19.2093 16.308 19.384C16.3073 19.5587 16.2483 19.705 16.131 19.823C16.0137 19.941 15.8673 20 15.692 20ZM4.615 8.923C4.441 8.923 4.295 8.864 4.177 8.746C4.059 8.628 4 8.482 4 8.308C4 8.134 4.059 7.98766 4.177 7.869C4.295 7.75033 4.441 7.69133 4.615 7.692C4.789 7.69266 4.93533 7.75166 5.054 7.869C5.17267 7.98633 5.23167 8.13266 5.231 8.308C5.23033 8.48333 5.17133 8.62933 5.054 8.746C4.93667 8.86267 4.79033 8.92167 4.615 8.923ZM19.385 8.923C19.2103 8.923 19.064 8.864 18.946 8.746C18.828 8.628 18.769 8.482 18.769 8.308C18.769 8.134 18.828 7.98766 18.946 7.869C19.064 7.75033 19.21 7.69133 19.384 7.692C19.5587 7.692 19.705 7.751 19.823 7.869C19.941 7.987 20 8.13333 20 8.308C20 8.48267 19.941 8.62867 19.823 8.746C19.705 8.86333 19.559 8.92233 19.385 8.923ZM19.385 12.616C19.2103 12.616 19.064 12.557 18.946 12.439C18.828 12.321 18.7693 12.1747 18.77 12C18.7707 11.8253 18.8297 11.6793 18.947 11.562C19.0643 11.4447 19.2103 11.3857 19.385 11.385C19.5597 11.3843 19.706 11.4433 19.824 11.562C19.942 11.6807 20.0007 11.8267 20 12C19.9993 12.1733 19.9403 12.3197 19.823 12.439C19.705 12.5563 19.559 12.615 19.385 12.615M19.385 16.308C19.2103 16.308 19.064 16.249 18.946 16.131C18.828 16.013 18.769 15.8667 18.769 15.692C18.769 15.5173 18.828 15.3713 18.946 15.254C19.064 15.1367 19.21 15.0777 19.384 15.077C19.5587 15.077 19.705 15.136 19.823 15.254C19.941 15.372 20 15.518 20 15.692C20 15.866 19.941 16.0123 19.823 16.131C19.705 16.2497 19.559 16.3087 19.385 16.308ZM19.385 20C19.2103 20 19.064 19.941 18.946 19.823C18.828 19.705 18.769 19.559 18.769 19.385C18.769 19.211 18.828 19.0647 18.946 18.946C19.064 18.8273 19.21 18.7683 19.384 18.769C19.5587 18.769 19.705 18.828 19.823 18.946C19.941 19.064 20 19.21 20 19.384C20 19.558 19.941 19.7043 19.823 19.823C19.705 19.9417 19.559 20.0007 19.385 20Z"
                          fill={viewMode === "default" ? "#009024" : "#000"}
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        onClick={() => setViewMode("expanded")}
                        className={`btn cursor-pointer transition duration-500 ${
                          viewMode === "expanded"
                        }`}
                      >
                        <path
                          d="M5.85 18H13.85C14.0667 18 14.221 17.9083 14.313 17.725C14.405 17.5417 14.384 17.3667 14.25 17.2L11.85 14.025C11.75 13.8917 11.6167 13.825 11.45 13.825C11.2833 13.825 11.15 13.8917 11.05 14.025L9.25 16.45C9.15 16.5833 9.01667 16.65 8.85 16.65C8.68334 16.65 8.55 16.5833 8.45 16.45L7.65 15.375C7.55 15.2417 7.41667 15.175 7.25 15.175C7.08334 15.175 6.95 15.2417 6.85 15.375L5.45 17.2C5.31667 17.3667 5.29567 17.5417 5.387 17.725C5.47834 17.9083 5.63267 18 5.85 18ZM5 21C4.45 21 3.979 20.8043 3.587 20.413C3.195 20.0217 2.99934 19.5507 3 19V9C3 8.45 3.196 7.97933 3.588 7.588C3.98 7.19667 4.45067 7.00067 5 7H15C15.55 7 16.021 7.196 16.413 7.588C16.805 7.98 17.0007 8.45067 17 9V19C17 19.55 16.8043 20.021 16.413 20.413C16.0217 20.805 15.5507 21.0007 15 21H5ZM4 5C3.71667 5 3.479 4.904 3.287 4.712C3.095 4.52 2.99934 4.28267 3 4C3.00067 3.71733 3.09667 3.48 3.288 3.288C3.47934 3.096 3.71667 3 4 3C4.28334 3 4.521 3.096 4.713 3.288C4.905 3.48 5.00067 3.71733 5 4C4.99934 4.28267 4.90334 4.52033 4.712 4.713C4.52067 4.90567 4.28334 5.00133 4 5ZM8 5C7.71667 5 7.47934 4.904 7.288 4.712C7.09667 4.52 7.00067 4.28267 7 4C6.99934 3.71733 7.09534 3.48 7.288 3.288C7.48067 3.096 7.718 3 8 3C8.282 3 8.51967 3.096 8.713 3.288C8.90634 3.48 9.002 3.71733 9 4C8.998 4.28267 8.902 4.52033 8.712 4.713C8.522 4.90567 8.28467 5.00133 8 5ZM12 5C11.7167 5 11.4793 4.904 11.288 4.712C11.0967 4.52 11.0007 4.28267 11 4C10.9993 3.71733 11.0953 3.48 11.288 3.288C11.4807 3.096 11.718 3 12 3C12.282 3 12.5197 3.096 12.713 3.288C12.9063 3.48 13.002 3.71733 13 4C12.998 4.28267 12.902 4.52033 12.712 4.713C12.522 4.90567 12.2847 5.00133 12 5ZM16 5C15.7167 5 15.4793 4.904 15.288 4.712C15.0967 4.52 15.0007 4.28267 15 4C14.9993 3.71733 15.0953 3.48 15.288 3.288C15.4807 3.096 15.718 3 16 3C16.282 3 16.5197 3.096 16.713 3.288C16.9063 3.48 17.002 3.71733 17 4C16.998 4.28267 16.902 4.52033 16.712 4.713C16.522 4.90567 16.2847 5.00133 16 5ZM20 5C19.7167 5 19.4793 4.904 19.288 4.712C19.0967 4.52 19.0007 4.28267 19 4C18.9993 3.71733 19.0953 3.48 19.288 3.288C19.4807 3.096 19.718 3 20 3C20.282 3 20.5197 3.096 20.713 3.288C20.9063 3.48 21.002 3.71733 21 4C20.998 4.28267 20.902 4.52033 20.712 4.713C20.522 4.90567 20.2847 5.00133 20 5ZM20 9C19.7167 9 19.4793 8.904 19.288 8.712C19.0967 8.52 19.0007 8.28267 19 8C18.9993 7.71733 19.0953 7.48 19.288 7.288C19.4807 7.096 19.718 7 20 7C20.282 7 20.5197 7.096 20.713 7.288C20.9063 7.48 21.002 7.71733 21 8C20.998 8.28267 20.902 8.52033 20.712 8.713C20.522 8.90567 20.2847 9.00133 20 9ZM20 13C19.7167 13 19.4793 12.904 19.288 12.712C19.0967 12.52 19.0007 12.2827 19 12C18.9993 11.7173 19.0953 11.48 19.288 11.288C19.4807 11.096 19.718 11 20 11C20.282 11 20.5197 11.096 20.713 11.288C20.9063 11.48 21.002 11.7173 21 12C20.998 12.2827 20.902 12.5203 20.712 12.713C20.522 12.9057 20.2847 13.0013 20 13ZM20 17C19.7167 17 19.4793 16.904 19.288 16.712C19.0967 16.52 19.0007 16.2827 19 16C18.9993 15.7173 19.0953 15.48 19.288 15.288C19.4807 15.096 19.718 15 20 15C20.282 15 20.5197 15.096 20.713 15.288C20.9063 15.48 21.002 15.7173 21 16C20.998 16.2827 20.902 16.5203 20.712 16.713C20.522 16.9057 20.2847 17.0013 20 17ZM20 21C19.7167 21 19.4793 20.904 19.288 20.712C19.0967 20.52 19.0007 20.2827 19 20C18.9993 19.7173 19.0953 19.48 19.288 19.288C19.4807 19.096 19.718 19 20 19C20.282 19 20.5197 19.096 20.713 19.288C20.9063 19.48 21.002 19.7173 21 20C20.998 20.2827 20.902 20.5203 20.712 20.713C20.522 20.9057 20.2847 21.0013 20 21Z"
                          fill={viewMode === "expanded" ? "#009024" : "#000"}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <div>
                  <div className="flex justify-left gap-2 px-4  mb-[17px]">
                    <button
                      className={`px-2 py-1 rounded text-[16px] font-bold leading-[19px] ${
                        activeTab === "original"
                          ? "bg-[#cccbcb80] text-[#5A5555]"
                          : "text-[#5A5555]"
                      } transition duration-300`}
                      onClick={() => setActiveTab("original")}
                    >
                      Original
                    </button>
                    <button
                      className={`px-2 py-1 rounded text-[16px] font-bold leading-[19px] ${
                        activeTab === "pro-touch"
                          ? "bg-[#cccbcb80] text-[#5A5555]"
                          : "text-[#5A5555]"
                      } transition duration-300`}
                      onClick={() => setActiveTab("pro-touch")}
                    >
                      From Pro-Touch
                    </button>
                  </div>

                  {/* Divs with Conditional Rendering */}
                  <div className="h-[150px] md:h-[140px] 2xl:h-[300px] overflow-hidden   relative overflow-y-auto overflow-x-hidden px-4 ">
                    {orderDetailsInfo.length > 0 ? (
                      <>
                        {/* Original Images Section */}
                        {activeTab === "original" ? (
                          activeOrder?.orderImageDetails?.some((image) =>
                            filterImages("original", image)
                          ) ? (
                            <div
                              className={`${
                                viewMode === "expanded"
                                  ? "grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-2"
                                  : "grid grid-cols-4 md:grid-cols-10 gap-2 md:gap-y-2 2xl:gap-y-4 gap-y-3"
                              } `}
                            >
                              {activeOrder.orderImageDetails.map(
                                (image, index) =>
                                  filterImages("original", image) && (
                                    <div
                                      key={image.id}
                                      className={`relative border rounded cursor-pointer ${
                                        selectedImages.includes(image.id)
                                          ? "border-blue-500"
                                          : "border-gray-300"
                                      }`}
                                      onClick={() =>
                                        isSelectMode
                                          ? toggleImageSelection(image.id)
                                          : handleImageClick(image)
                                      }
                                    >
                                      <img
                                        src={
                                          image.compressed_raw_image_public_url
                                        }
                                        alt={`Image ${index + 1}`}
                                        className={`transition-all duration-300 rounded object-cover cursor-pointer ${
                                          viewMode === "expanded"
                                            ? "h-[140px]  w-full"
                                            : "h-[70px] md:h-[65px] 2xl:h-[85px] w-full"
                                        }`}
                                      />
                                      {isSelectMode && (
                                        <div className="absolute top-1 right-1">
                                          <input
                                            className="cursor-pointer"
                                            onClick={() =>
                                              toggleImageSelection(image.id)
                                            }
                                            type="checkbox"
                                            checked={selectedImages.includes(
                                              image.id
                                            )}
                                            onChange={() =>
                                              toggleImageSelection(image.id)
                                            }
                                          />
                                        </div>
                                      )}
                                    </div>
                                  )
                              )}
                            </div>
                          ) : (
                            <p>
                              No images available for this order in Original.
                            </p>
                          )
                        ) : null}

                        {/* Pro-Touch Images Section */}
                        {activeTab === "pro-touch" ? (
                          activeOrder?.orderImageDetails?.some((image) =>
                            filterImages("pro-touch", image)
                          ) ? (
                            <div
                              className={`${
                                viewMode === "expanded"
                                  ? "grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-2"
                                  : "grid grid-cols-4 md:grid-cols-10 gap-2 md:gap-y-2 2xl:gap-y-4 gap-y-3"
                              }`}
                            >
                              {activeOrder.orderImageDetails.map(
                                (image, index) =>
                                  filterImages("pro-touch", image) ? (
                                    <div
                                      key={image.id}
                                      className={`relative border rounded object-cover cursor-pointer ${
                                        selectedImages.includes(image.id)
                                          ? "border-blue-500"
                                          : "border-gray-300"
                                      }`}
                                      onClick={() =>
                                        isSelectMode
                                          ? toggleImageSelection(image.id)
                                          : handleImageClick(image)
                                      }
                                    >
                                      <img
                                        src={
                                          image.compressed_raw_image_public_url
                                        }
                                        alt={`Image ${index + 1}`}
                                        className={`transition-all duration-300 rounded w-full h-auto ${
                                          viewMode === "expanded"
                                            ? "h-[140px] w-full"
                                            : "h-[70px] md:h-[65px] 2xl:h-[85px] w-full"
                                        }`}
                                      />
                                      {isSelectMode && (
                                        <div className="absolute top-1 right-1">
                                          <input
                                            type="checkbox"
                                            checked={selectedImages.includes(
                                              image.id
                                            )}
                                            onChange={() =>
                                              toggleImageSelection(image.id)
                                            }
                                          />
                                        </div>
                                      )}
                                    </div>
                                  ) : null
                              )}
                            </div>
                          ) : (
                            <p>
                              No images available for this order in Pro-Touch.
                            </p>
                          )
                        ) : null}
                      </>
                    ) : (
                      <p>No orders available.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* ----------------------------------------download for mobile---------------------------------------------- */}
              {/* --------------------------------------------------------------------------------------------------------------------------- */}

              <div className="block md:hidden ">
                <div className="absolute top-[4px] right-[2px] mt-2 mr-2">
                  <div className="relative inline-block text-left">
                    {/* Main Dropdown Button */}
                    <button
                      onClick={toggleMainDropdown}
                      className=" text-white px-1 py-2 rounded"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3.33333 6.66602C2.6 6.66602 2 7.26602 2 7.99935C2 8.73268 2.6 9.33268 3.33333 9.33268C4.06667 9.33268 4.66667 8.73268 4.66667 7.99935C4.66667 7.26602 4.06667 6.66602 3.33333 6.66602ZM12.6667 6.66602C11.9333 6.66602 11.3333 7.26602 11.3333 7.99935C11.3333 8.73268 11.9333 9.33268 12.6667 9.33268C13.4 9.33268 14 8.73268 14 7.99935C14 7.26602 13.4 6.66602 12.6667 6.66602ZM8 6.66602C7.26667 6.66602 6.66667 7.26602 6.66667 7.99935C6.66667 8.73268 7.26667 9.33268 8 9.33268C8.73333 9.33268 9.33333 8.73268 9.33333 7.99935C9.33333 7.26602 8.73333 6.66602 8 6.66602Z"
                          fill="black"
                        />
                      </svg>
                    </button>

                    {/* Main Dropdown Menu */}
                    {isMainOpen && (
                      <div className="absolute  right-0 mt-2 w-[130px] bg-white border rounded-lg shadow-lg">
                        <div className="flex flex-col ">
                          {/* Nested Dropdown: Change View */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleNestedDropdown("view");
                            }}
                            className="flex text-[12px] border-b-black border justify-between rounded-t-lg items-center px-4 py-1 hover:bg-[#87E17F]"
                          >
                            Change View{" "}
                            <span className="ml-auto">
                              <IoMdArrowDropdown className="h-4 w-4" />
                            </span>
                          </button>
                          {openNestedDropdown === "view" && (
                            <div className="py-1 space-y-1 pl-4 ">
                              <div className="flex justify-center gap-[10px] ">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  onClick={() => setViewMode("default")}
                                  className={`btn cursor-pointer transition duration-500 ${
                                    viewMode === "default"
                                  }`}
                                >
                                  <path
                                    d="M5.504 18H10.908C11.0633 18 11.1797 17.9277 11.257 17.783C11.3343 17.6383 11.3257 17.495 11.231 17.353L9.766 15.352C9.678 15.2447 9.57 15.191 9.442 15.191C9.314 15.191 9.20633 15.2447 9.119 15.352L8.096 16.687C8.00933 16.7943 7.90167 16.851 7.773 16.857C7.645 16.8637 7.53733 16.8133 7.45 16.706L6.85 15.925C6.76333 15.8177 6.65567 15.7647 6.527 15.766C6.399 15.768 6.29133 15.823 6.204 15.931L5.156 17.354C5.06133 17.4953 5.05633 17.6383 5.141 17.783C5.22567 17.9277 5.34667 18 5.504 18ZM5.616 20C5.17133 20 4.791 19.8417 4.475 19.525C4.159 19.2083 4.00067 18.8287 4 18.386V13C4 12.556 4.15833 12.176 4.475 11.86C4.791 11.5427 5.171 11.384 5.615 11.384H11C11.444 11.384 11.824 11.5423 12.14 11.859C12.4573 12.1757 12.616 12.556 12.616 13V18.385C12.616 18.829 12.4577 19.209 12.141 19.525C11.8243 19.8417 11.444 20 11 20H5.616ZM4.616 5.23C4.44133 5.23 4.295 5.17133 4.177 5.054C4.059 4.936 4 4.79 4 4.616C4 4.44133 4.059 4.295 4.177 4.177C4.295 4.059 4.44133 4 4.616 4C4.79067 4 4.93667 4.059 5.054 4.177C5.17133 4.295 5.23033 4.44133 5.231 4.616C5.23167 4.79067 5.17267 4.93666 5.054 5.054C4.93533 5.17133 4.789 5.23033 4.615 5.231M8.308 5.231C8.13333 5.231 7.987 5.172 7.869 5.054C7.751 4.936 7.692 4.79 7.692 4.616C7.692 4.442 7.751 4.29567 7.869 4.177C7.987 4.05833 8.13333 3.99933 8.308 4C8.48267 4.00067 8.62867 4.05967 8.746 4.177C8.86333 4.29433 8.92233 4.44067 8.923 4.616C8.92367 4.79133 8.86467 4.93733 8.746 5.054C8.62733 5.17067 8.48133 5.22967 8.308 5.231ZM12 5.231C11.826 5.231 11.68 5.172 11.562 5.054C11.444 4.936 11.385 4.79 11.385 4.616C11.385 4.442 11.444 4.29567 11.562 4.177C11.68 4.05833 11.826 3.99933 12 4C12.174 4.00067 12.3203 4.05967 12.439 4.177C12.5577 4.29433 12.6163 4.44067 12.615 4.616C12.6137 4.79133 12.5547 4.93733 12.438 5.054C12.3213 5.17067 12.1753 5.23033 12 5.231ZM15.692 5.23C15.518 5.23 15.372 5.171 15.254 5.053C15.136 4.935 15.077 4.78866 15.077 4.614C15.077 4.43933 15.136 4.29333 15.254 4.176C15.372 4.05867 15.518 3.99967 15.692 3.999C15.866 3.99833 16.0123 4.05733 16.131 4.176C16.2497 4.29467 16.3087 4.441 16.308 4.615C16.3073 4.789 16.2483 4.935 16.131 5.053C16.0137 5.171 15.8673 5.23 15.692 5.23ZM19.384 5.23C19.21 5.23 19.064 5.171 18.946 5.053C18.828 4.935 18.769 4.78866 18.769 4.614C18.769 4.43933 18.828 4.29333 18.946 4.176C19.064 4.05867 19.21 3.99967 19.384 3.999C19.558 3.99833 19.7043 4.05733 19.823 4.176C19.9417 4.29467 20.0007 4.441 20 4.615C19.9993 4.789 19.9403 4.935 19.823 5.053C19.7057 5.171 19.5587 5.23 19.384 5.23ZM15.692 20C15.518 20 15.372 19.941 15.254 19.823C15.136 19.705 15.077 19.559 15.077 19.385C15.077 19.211 15.136 19.0647 15.254 18.946C15.372 18.8273 15.518 18.7683 15.692 18.769C15.866 18.7697 16.0123 18.8287 16.131 18.946C16.2497 19.0633 16.3087 19.2093 16.308 19.384C16.3073 19.5587 16.2483 19.705 16.131 19.823C16.0137 19.941 15.8673 20 15.692 20ZM4.615 8.923C4.441 8.923 4.295 8.864 4.177 8.746C4.059 8.628 4 8.482 4 8.308C4 8.134 4.059 7.98766 4.177 7.869C4.295 7.75033 4.441 7.69133 4.615 7.692C4.789 7.69266 4.93533 7.75166 5.054 7.869C5.17267 7.98633 5.23167 8.13266 5.231 8.308C5.23033 8.48333 5.17133 8.62933 5.054 8.746C4.93667 8.86267 4.79033 8.92167 4.615 8.923ZM19.385 8.923C19.2103 8.923 19.064 8.864 18.946 8.746C18.828 8.628 18.769 8.482 18.769 8.308C18.769 8.134 18.828 7.98766 18.946 7.869C19.064 7.75033 19.21 7.69133 19.384 7.692C19.5587 7.692 19.705 7.751 19.823 7.869C19.941 7.987 20 8.13333 20 8.308C20 8.48267 19.941 8.62867 19.823 8.746C19.705 8.86333 19.559 8.92233 19.385 8.923ZM19.385 12.616C19.2103 12.616 19.064 12.557 18.946 12.439C18.828 12.321 18.7693 12.1747 18.77 12C18.7707 11.8253 18.8297 11.6793 18.947 11.562C19.0643 11.4447 19.2103 11.3857 19.385 11.385C19.5597 11.3843 19.706 11.4433 19.824 11.562C19.942 11.6807 20.0007 11.8267 20 12C19.9993 12.1733 19.9403 12.3197 19.823 12.439C19.705 12.5563 19.559 12.615 19.385 12.615M19.385 16.308C19.2103 16.308 19.064 16.249 18.946 16.131C18.828 16.013 18.769 15.8667 18.769 15.692C18.769 15.5173 18.828 15.3713 18.946 15.254C19.064 15.1367 19.21 15.0777 19.384 15.077C19.5587 15.077 19.705 15.136 19.823 15.254C19.941 15.372 20 15.518 20 15.692C20 15.866 19.941 16.0123 19.823 16.131C19.705 16.2497 19.559 16.3087 19.385 16.308ZM19.385 20C19.2103 20 19.064 19.941 18.946 19.823C18.828 19.705 18.769 19.559 18.769 19.385C18.769 19.211 18.828 19.0647 18.946 18.946C19.064 18.8273 19.21 18.7683 19.384 18.769C19.5587 18.769 19.705 18.828 19.823 18.946C19.941 19.064 20 19.21 20 19.384C20 19.558 19.941 19.7043 19.823 19.823C19.705 19.9417 19.559 20.0007 19.385 20Z"
                                    fill={
                                      viewMode === "default"
                                        ? "#009024"
                                        : "#000"
                                    }
                                  />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  onClick={() => setViewMode("expanded")}
                                  className={`btn cursor-pointer transition duration-500 ${
                                    viewMode === "expanded"
                                  }`}
                                >
                                  <path
                                    d="M5.85 18H13.85C14.0667 18 14.221 17.9083 14.313 17.725C14.405 17.5417 14.384 17.3667 14.25 17.2L11.85 14.025C11.75 13.8917 11.6167 13.825 11.45 13.825C11.2833 13.825 11.15 13.8917 11.05 14.025L9.25 16.45C9.15 16.5833 9.01667 16.65 8.85 16.65C8.68334 16.65 8.55 16.5833 8.45 16.45L7.65 15.375C7.55 15.2417 7.41667 15.175 7.25 15.175C7.08334 15.175 6.95 15.2417 6.85 15.375L5.45 17.2C5.31667 17.3667 5.29567 17.5417 5.387 17.725C5.47834 17.9083 5.63267 18 5.85 18ZM5 21C4.45 21 3.979 20.8043 3.587 20.413C3.195 20.0217 2.99934 19.5507 3 19V9C3 8.45 3.196 7.97933 3.588 7.588C3.98 7.19667 4.45067 7.00067 5 7H15C15.55 7 16.021 7.196 16.413 7.588C16.805 7.98 17.0007 8.45067 17 9V19C17 19.55 16.8043 20.021 16.413 20.413C16.0217 20.805 15.5507 21.0007 15 21H5ZM4 5C3.71667 5 3.479 4.904 3.287 4.712C3.095 4.52 2.99934 4.28267 3 4C3.00067 3.71733 3.09667 3.48 3.288 3.288C3.47934 3.096 3.71667 3 4 3C4.28334 3 4.521 3.096 4.713 3.288C4.905 3.48 5.00067 3.71733 5 4C4.99934 4.28267 4.90334 4.52033 4.712 4.713C4.52067 4.90567 4.28334 5.00133 4 5ZM8 5C7.71667 5 7.47934 4.904 7.288 4.712C7.09667 4.52 7.00067 4.28267 7 4C6.99934 3.71733 7.09534 3.48 7.288 3.288C7.48067 3.096 7.718 3 8 3C8.282 3 8.51967 3.096 8.713 3.288C8.90634 3.48 9.002 3.71733 9 4C8.998 4.28267 8.902 4.52033 8.712 4.713C8.522 4.90567 8.28467 5.00133 8 5ZM12 5C11.7167 5 11.4793 4.904 11.288 4.712C11.0967 4.52 11.0007 4.28267 11 4C10.9993 3.71733 11.0953 3.48 11.288 3.288C11.4807 3.096 11.718 3 12 3C12.282 3 12.5197 3.096 12.713 3.288C12.9063 3.48 13.002 3.71733 13 4C12.998 4.28267 12.902 4.52033 12.712 4.713C12.522 4.90567 12.2847 5.00133 12 5ZM16 5C15.7167 5 15.4793 4.904 15.288 4.712C15.0967 4.52 15.0007 4.28267 15 4C14.9993 3.71733 15.0953 3.48 15.288 3.288C15.4807 3.096 15.718 3 16 3C16.282 3 16.5197 3.096 16.713 3.288C16.9063 3.48 17.002 3.71733 17 4C16.998 4.28267 16.902 4.52033 16.712 4.713C16.522 4.90567 16.2847 5.00133 16 5ZM20 5C19.7167 5 19.4793 4.904 19.288 4.712C19.0967 4.52 19.0007 4.28267 19 4C18.9993 3.71733 19.0953 3.48 19.288 3.288C19.4807 3.096 19.718 3 20 3C20.282 3 20.5197 3.096 20.713 3.288C20.9063 3.48 21.002 3.71733 21 4C20.998 4.28267 20.902 4.52033 20.712 4.713C20.522 4.90567 20.2847 5.00133 20 5ZM20 9C19.7167 9 19.4793 8.904 19.288 8.712C19.0967 8.52 19.0007 8.28267 19 8C18.9993 7.71733 19.0953 7.48 19.288 7.288C19.4807 7.096 19.718 7 20 7C20.282 7 20.5197 7.096 20.713 7.288C20.9063 7.48 21.002 7.71733 21 8C20.998 8.28267 20.902 8.52033 20.712 8.713C20.522 8.90567 20.2847 9.00133 20 9ZM20 13C19.7167 13 19.4793 12.904 19.288 12.712C19.0967 12.52 19.0007 12.2827 19 12C18.9993 11.7173 19.0953 11.48 19.288 11.288C19.4807 11.096 19.718 11 20 11C20.282 11 20.5197 11.096 20.713 11.288C20.9063 11.48 21.002 11.7173 21 12C20.998 12.2827 20.902 12.5203 20.712 12.713C20.522 12.9057 20.2847 13.0013 20 13ZM20 17C19.7167 17 19.4793 16.904 19.288 16.712C19.0967 16.52 19.0007 16.2827 19 16C18.9993 15.7173 19.0953 15.48 19.288 15.288C19.4807 15.096 19.718 15 20 15C20.282 15 20.5197 15.096 20.713 15.288C20.9063 15.48 21.002 15.7173 21 16C20.998 16.2827 20.902 16.5203 20.712 16.713C20.522 16.9057 20.2847 17.0013 20 17ZM20 21C19.7167 21 19.4793 20.904 19.288 20.712C19.0967 20.52 19.0007 20.2827 19 20C18.9993 19.7173 19.0953 19.48 19.288 19.288C19.4807 19.096 19.718 19 20 19C20.282 19 20.5197 19.096 20.713 19.288C20.9063 19.48 21.002 19.7173 21 20C20.998 20.2827 20.902 20.5203 20.712 20.713C20.522 20.9057 20.2847 21.0013 20 21Z"
                                    fill={
                                      viewMode === "expanded"
                                        ? "#009024"
                                        : "#000"
                                    }
                                  />
                                </svg>
                              </div>
                            </div>
                          )}

                          {/* Nested Dropdown: Download all */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleNestedDropdown("download");
                            }}
                            className="border-b-black border flex text-[12px] justify-between items-center px-4 py-1 hover:bg-[#87E17F]"
                          >
                            Download{" "}
                            <span className="ml-auto">
                              <IoMdArrowDropdown className="h-4 w-4" />
                            </span>
                          </button>
                          {openNestedDropdown === "download" && (
                            <div className=" space-y-1  text-[12px]">
                              <button
                                onClick={() =>
                                  handleSingleAndMultipleDownload("JPG")
                                }
                                className="flex w-full justify-center items-center px-4 py-1 hover:bg-[#87E17F]"
                              >
                                JPG
                              </button>
                              <button
                                onClick={() =>
                                  handleSingleAndMultipleDownload("PNG")
                                }
                                className="flex  w-full justify-center items-center px-4 py-1 hover:bg-[#87E17F]"
                              >
                                PNG
                              </button>
                              <button
                                onClick={() =>
                                  handleSingleAndMultipleDownload("PSD")
                                }
                                className="flex  w-full justify-center items-center px-4 py-1 hover:bg-[#87E17F]"
                              >
                                PSD
                              </button>
                            </div>
                          )}

                          {/* Regular Button: Download All */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleNestedDropdown("downloadAll");
                            }}
                            className=" text-[12px]  flex justify-between items-center px-4 py-1 hover:bg-[#87E17F]"
                          >
                            Download All{" "}
                            <span className="ml-auto">
                              <IoMdArrowDropdown className="h-4 w-4" />
                            </span>
                          </button>
                          {openNestedDropdown === "downloadAll" && (
                            <div className=" space-y-1  text-[12px]">
                              <button
                                onClick={() => zipFileDownload("JPG")}
                                className="flex  w-full justify-center items-center px-4 py-1 hover:bg-[#87E17F]"
                              >
                                JPG
                              </button>
                              <button
                                onClick={() => zipFileDownload("PNG")}
                                className="flex  w-full justify-center items-center px-4 py-1 hover:bg-[#87E17F]"
                              >
                                PNG
                              </button>
                              <button
                                onClick={() => zipFileDownload("PSD")}
                                className="flex  w-full justify-center items-center px-4 py-1 hover:bg-[#87E17F]"
                              >
                                PSD
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* --------------------------------------------------------------------download buttons------------------------------------------------------------------ */}
              {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}
              {/* ----------------------------------------for original download-------------------------------------------------------- */}
              {activeTab === "original" ? (
                <div className="hidden md:block">
                  <div className="absolute bottom-[82%] md:bottom-2 right-[70px] md:right-0 flex justify-center items-center z-[999]">
                    <div
                      onClick={toggleDropdownMultipleDownload}
                      className="flex  justify-center items-center px-4 py-2 gap-[5px] bg-[#255646] w-[140px] rounded mr-[14px] border-black border shadow-lg cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M9.00007 8.62499V15M9.00007 15L11.2501 12.75M9.00007 15L6.75007 12.75M6.00007 5.27699C6.56104 5.35808 7.08068 5.61856 7.48132 6.01949M13.1251 10.5C14.2643 10.5 15.0001 9.57674 15.0001 8.43749C15 7.98645 14.8521 7.54786 14.5791 7.18889C14.306 6.82993 13.9227 6.57037 13.4881 6.44999C13.4212 5.60883 13.0726 4.81481 12.4986 4.19631C11.9246 3.5778 11.1588 3.17096 10.3249 3.04156C9.49112 2.91215 8.63802 3.06776 7.90357 3.4832C7.16911 3.89865 6.59624 4.54966 6.27757 5.33099C5.60664 5.145 4.88931 5.23316 4.28338 5.57607C3.67745 5.91898 3.23256 6.48855 3.04657 7.15949C2.86059 7.83042 2.94875 8.54775 3.29166 9.15368C3.63457 9.75961 4.20414 10.2045 4.87507 10.3905"
                          stroke="white"
                          strokeWidth="1.16667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <button className="text-[14px] font-medium text-[#FFF] cursor-pointer">
                        Download
                      </button>
                    </div>

                    <div
                      className="flex justify-center items-center px-1 md:px-4 py-1 md:py-2 gap-[5px] bg-[#87E17F] w-[100px] md:w-[180px] rounded mr-[14px] border-black border shadow-lg cursor-pointer"
                      onClick={toggleDropdown}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M9.00007 8.62499V15M9.00007 15L11.2501 12.75M9.00007 15L6.75007 12.75M6.00007 5.27699C6.56104 5.35808 7.08068 5.61856 7.48132 6.01949M13.1251 10.5C14.2643 10.5 15.0001 9.57674 15.0001 8.43749C15 7.98645 14.8521 7.54786 14.5791 7.18889C14.306 6.82993 13.9227 6.57037 13.4881 6.44999C13.4212 5.60883 13.0726 4.81481 12.4986 4.19631C11.9246 3.5778 11.1588 3.17096 10.3249 3.04156C9.49112 2.91215 8.63802 3.06776 7.90357 3.4832C7.16911 3.89865 6.59624 4.54966 6.27757 5.33099C5.60664 5.145 4.88931 5.23316 4.28338 5.57607C3.67745 5.91898 3.23256 6.48855 3.04657 7.15949C2.86059 7.83042 2.94875 8.54775 3.29166 9.15368C3.63457 9.75961 4.20414 10.2045 4.87507 10.3905"
                          stroke="black"
                          strokeWidth="1.16667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <button className="text-[10px] md:text-[14px] font-medium text-[black]">
                        Download All
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              {dropdownVisible && (
                <div className="absolute bottom-[42%] md:bottom-[50px] right-[21%] md:right-[14px] bg-gray-100 shadow-xl rounded-md w-[85px] md:w-[100px] border border-gray-400 z-[999]">
                  <div
                    className="flex items-center gap-2 px-4 py-[6px] hover:bg-[#4AD991] border-b border-b-gray-400 hover:text-black cursor-pointer"
                    onClick={() => {
                      console.log(
                        "zipFileDownload function called with parameter: JPG"
                      );
                      zipFileDownload("JPG");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1071_2097)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.75 5.0625V15.75C15.75 16.3467 15.5129 16.919 15.091 17.341C14.669 17.7629 14.0967 18 13.5 18H12.375V16.875H13.5C13.7984 16.875 14.0845 16.7565 14.2955 16.5455C14.5065 16.3345 14.625 16.0484 14.625 15.75V5.0625H12.375C11.9274 5.0625 11.4982 4.88471 11.1818 4.56824C10.8653 4.25178 10.6875 3.82255 10.6875 3.375V1.125H4.5C4.20163 1.125 3.91548 1.24353 3.7045 1.4545C3.49353 1.66548 3.375 1.95163 3.375 2.25V12.375H2.25V2.25C2.25 1.65326 2.48705 1.08097 2.90901 0.65901C3.33097 0.237053 3.90326 0 4.5 0L10.6875 0L15.75 5.0625ZM10.8675 14.211C10.953 14.3835 11.0055 14.568 11.025 14.7645H10.152C10.1316 14.6657 10.0947 14.571 10.0429 14.4844C9.99275 14.402 9.92792 14.3296 9.85162 14.2706C9.77273 14.2066 9.68219 14.1585 9.585 14.1289C9.47603 14.0954 9.36261 14.0787 9.24862 14.0794C8.92762 14.0794 8.67825 14.1926 8.5005 14.4191C8.325 14.6449 8.23725 14.9636 8.23725 15.3754V15.9356C8.23725 16.1989 8.27363 16.4295 8.34638 16.6275C8.41291 16.8123 8.53173 16.9737 8.68838 17.0921C8.8607 17.2073 9.06514 17.2648 9.27225 17.2564C9.44975 17.2615 9.62593 17.2244 9.78638 17.1484C9.91484 17.0809 10.0211 16.9778 10.0924 16.8514C10.1599 16.7284 10.194 16.5923 10.1948 16.443V16.1561H9.27V15.4924H11.043V16.3901C11.043 16.6076 11.0066 16.8139 10.9339 17.0089C10.8615 17.2019 10.7492 17.3775 10.6042 17.5241C10.4455 17.6794 10.2557 17.7994 10.0474 17.8763C9.82537 17.9595 9.564 18.0011 9.26325 18.0011C8.97395 18.0066 8.68632 17.9561 8.41612 17.8526C8.18661 17.7587 7.98154 17.6136 7.8165 17.4285C7.6523 17.2385 7.52967 17.0162 7.4565 16.776C7.37507 16.5042 7.33525 16.2216 7.33837 15.9379V15.3686C7.33837 14.9614 7.41338 14.6051 7.56338 14.2999C7.71413 13.9954 7.93237 13.758 8.21812 13.5878C8.50612 13.4168 8.85337 13.3313 9.25987 13.3313C9.52762 13.3313 9.76612 13.3687 9.97537 13.4437C10.1854 13.5187 10.3654 13.6219 10.5154 13.7531C10.6654 13.8844 10.7831 14.037 10.8686 14.211H10.8675ZM0 16.6343C0 16.8188 0.03075 16.9931 0.09225 17.1574C0.1545 17.3224 0.245625 17.4686 0.365625 17.5961C0.489375 17.7236 0.642 17.8237 0.8235 17.8965C1.008 17.9662 1.22138 18.0011 1.46362 18.0011C1.93612 18.0011 2.30513 17.8718 2.57063 17.613C2.83838 17.3535 2.97262 16.9766 2.97337 16.4824V13.4167H2.0835V16.5049C2.0835 16.7321 2.03175 16.9069 1.92825 17.0291C1.82475 17.1514 1.6665 17.2129 1.4535 17.2136C1.35124 17.2183 1.24964 17.1951 1.15963 17.1463C1.06963 17.0975 0.994644 17.0251 0.94275 16.9369C0.891829 16.8435 0.863689 16.7394 0.860625 16.6331H0V16.6343ZM5.535 13.4167H3.73725V17.9167H4.62712V16.4059H5.5305C5.853 16.4059 6.1275 16.3414 6.354 16.2124C6.58275 16.0796 6.75638 15.9015 6.87488 15.678C6.99638 15.4515 7.05675 15.1976 7.056 14.9164C7.056 14.6359 6.99675 14.382 6.87825 14.1547C6.75954 13.9308 6.5802 13.7449 6.36075 13.6181C6.13575 13.4831 5.86125 13.416 5.53725 13.4167H5.535ZM6.14925 14.9164C6.15326 15.065 6.1204 15.2122 6.05363 15.345C5.99373 15.46 5.90037 15.5541 5.78588 15.615C5.65482 15.6795 5.51003 15.7112 5.364 15.7072H4.62375V14.1255H5.36625C5.6115 14.1255 5.8035 14.1937 5.94225 14.3302C6.081 14.466 6.14925 14.6614 6.14925 14.9164Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1071_2097">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-[12px] md:text-[14px] font-medium text-black">
                      JPG
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-2 px-4 py-[6px] hover:bg-[#4AD991] border-b border-b-gray-400 hover:text-black cursor-pointer"
                    onClick={() => zipFileDownload("PNG")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1071_2102)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.75 5.0625V15.75C15.75 16.3467 15.5129 16.919 15.091 17.341C14.669 17.7629 14.0967 18 13.5 18V16.875C13.7984 16.875 14.0845 16.7565 14.2955 16.5455C14.5065 16.3345 14.625 16.0484 14.625 15.75V5.0625H12.375C11.9274 5.0625 11.4982 4.88471 11.1818 4.56824C10.8653 4.25178 10.6875 3.82255 10.6875 3.375V1.125H4.5C4.20163 1.125 3.91548 1.24353 3.7045 1.4545C3.49353 1.66548 3.375 1.95163 3.375 2.25V12.375H2.25V2.25C2.25 1.65326 2.48705 1.08097 2.90901 0.65901C3.33097 0.237053 3.90326 0 4.5 0L10.6875 0L15.75 5.0625ZM11.52 14.211C11.6055 14.3835 11.658 14.568 11.6775 14.7645H10.8045C10.7841 14.6657 10.7472 14.571 10.6954 14.4844C10.6452 14.402 10.5804 14.3296 10.5041 14.2706C10.4252 14.2066 10.3347 14.1585 10.2375 14.1289C10.1285 14.0954 10.0151 14.0787 9.90112 14.0794C9.58087 14.0794 9.3315 14.1926 9.153 14.4191C8.9775 14.6449 8.88975 14.9636 8.88975 15.3754V15.9356C8.88975 16.1989 8.92613 16.4295 8.99888 16.6275C9.06541 16.8123 9.18423 16.9737 9.34088 17.0921C9.5132 17.2073 9.71764 17.2648 9.92475 17.2564C10.1022 17.2615 10.2784 17.2244 10.4389 17.1484C10.5673 17.0809 10.6736 16.9778 10.7449 16.8514C10.8124 16.7284 10.8465 16.5923 10.8473 16.443V16.1561H9.9225V15.4924H11.6955V16.3901C11.6955 16.6076 11.6591 16.8139 11.5864 17.0089C11.514 17.2019 11.4017 17.3775 11.2567 17.5241C11.098 17.6794 10.9082 17.7994 10.6999 17.8763C10.4779 17.9595 10.2165 18.0011 9.91575 18.0011C9.62645 18.0066 9.33882 17.9561 9.06862 17.8526C8.83911 17.7587 8.63404 17.6136 8.469 17.4285C8.3048 17.2385 8.18217 17.0162 8.109 16.776C8.02757 16.5042 7.98775 16.2216 7.99088 15.9379V15.3686C7.99088 14.9614 8.06587 14.6051 8.21587 14.2999C8.36662 13.9954 8.58488 13.758 8.87063 13.5878C9.15863 13.4168 9.50587 13.3313 9.91237 13.3313C10.1801 13.3313 10.4186 13.3687 10.6279 13.4437C10.8386 13.5187 11.0186 13.6219 11.1679 13.7531C11.3179 13.8851 11.4356 14.0377 11.5211 14.211H11.52ZM1.8 13.4167H0V17.9167H0.889875V16.4059H1.79325C2.11575 16.4059 2.39025 16.3414 2.61675 16.2124C2.8455 16.0796 3.01913 15.9015 3.13763 15.678C3.26114 15.4434 3.32344 15.1814 3.31875 14.9164C3.31875 14.6359 3.2595 14.382 3.141 14.1547C3.02229 13.9308 2.84295 13.7449 2.6235 13.6181C2.3985 13.4831 2.124 13.416 1.8 13.4167ZM2.41312 14.9164C2.41713 15.065 2.38428 15.2122 2.3175 15.345C2.2576 15.46 2.16425 15.5541 2.04975 15.615C1.9187 15.6795 1.7739 15.7112 1.62788 15.7072H0.8865V14.1255H1.629C1.87425 14.1255 2.06625 14.1937 2.205 14.3302C2.34375 14.466 2.41312 14.6614 2.41312 14.9164ZM4.62263 17.9156V14.9062H4.65862L6.63975 17.9156H7.37775V13.4167H6.534V16.4093H6.498L4.527 13.4167H3.78225V17.9167L4.62263 17.9156Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1071_2102">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-[12px] md:text-[14px] font-medium text-black">
                      PNG
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-2 px-4 py-[6px] hover:bg-[#4AD991] hover:text-black cursor-pointer "
                    onClick={() => zipFileDownload("PSD")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1071_2107)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.75 5.0625V15.75C15.75 16.3467 15.5129 16.919 15.091 17.341C14.669 17.7629 14.0967 18 13.5 18H12.9375V16.875H13.5C13.7984 16.875 14.0845 16.7565 14.2955 16.5455C14.5065 16.3345 14.625 16.0484 14.625 15.75V5.0625H12.375C11.9274 5.0625 11.4982 4.88471 11.1818 4.56824C10.8653 4.25178 10.6875 3.82255 10.6875 3.375V1.125H4.5C4.20163 1.125 3.91548 1.24353 3.7045 1.4545C3.49353 1.66548 3.375 1.95163 3.375 2.25V12.375H2.25V2.25C2.25 1.65326 2.48705 1.08097 2.90901 0.65901C3.33097 0.237053 3.90326 0 4.5 0L10.6875 0L15.75 5.0625ZM3.5055 16.6961C3.51194 16.8734 3.5554 17.0473 3.6331 17.2068C3.71079 17.3663 3.821 17.5077 3.95662 17.622C4.10212 17.7435 4.28137 17.838 4.49437 17.9055C4.70737 17.9738 4.95675 18.0079 5.2425 18.0079C5.62275 18.0079 5.9445 17.9486 6.20775 17.8301C6.474 17.7116 6.6765 17.5466 6.81525 17.3351C6.95712 17.1155 7.03036 16.8586 7.02562 16.5971C7.02562 16.3451 6.975 16.1351 6.87375 15.9671C6.77082 15.7985 6.62532 15.66 6.45188 15.5655C6.25315 15.4551 6.03884 15.3754 5.81625 15.3293L5.11762 15.1673C4.95289 15.136 4.79722 15.0684 4.662 14.9692C4.61088 14.9295 4.56972 14.8785 4.54179 14.8201C4.51387 14.7617 4.49994 14.6976 4.50112 14.6329C4.50112 14.4574 4.57012 14.3134 4.70812 14.2009C4.84912 14.0869 5.0415 14.0299 5.28525 14.0299C5.44575 14.0299 5.5845 14.0554 5.7015 14.1064C5.80936 14.1494 5.9043 14.2195 5.97713 14.31C6.04636 14.3935 6.09287 14.4935 6.11213 14.6002H6.95588C6.94169 14.3714 6.86418 14.1509 6.732 13.9635C6.59024 13.7612 6.39567 13.6016 6.1695 13.5022C5.89339 13.3806 5.59359 13.3222 5.292 13.3313C4.962 13.3313 4.671 13.3875 4.419 13.5C4.16625 13.6117 3.96825 13.7696 3.825 13.9736C3.6825 14.1784 3.61125 14.418 3.61125 14.6925C3.61125 14.919 3.65737 15.1155 3.74962 15.282C3.84187 15.4485 3.9735 15.5861 4.1445 15.6949C4.31625 15.8021 4.51875 15.882 4.752 15.9345L5.44725 16.0965C5.67975 16.1512 5.853 16.2236 5.967 16.3136C6.02305 16.3564 6.06796 16.4121 6.09793 16.4759C6.12789 16.5398 6.14202 16.6099 6.13912 16.6804C6.14166 16.7964 6.10826 16.9103 6.0435 17.0066C5.97101 17.1053 5.87132 17.1808 5.75663 17.2238C5.63138 17.2763 5.4765 17.3025 5.292 17.3025C5.16 17.3025 5.04 17.2875 4.932 17.2575C4.83227 17.2307 4.73789 17.1869 4.653 17.1281C4.5782 17.0795 4.51414 17.0162 4.4648 16.9418C4.41546 16.8675 4.38188 16.7839 4.36613 16.6961H3.5055ZM1.8 13.4235H0V17.9235H0.889875V16.4126H1.79325C2.11575 16.4126 2.39025 16.3478 2.61675 16.218C2.8455 16.0868 3.01913 15.909 3.13763 15.6848C3.26114 15.4502 3.32344 15.1882 3.31875 14.9231C3.31875 14.6419 3.2595 14.388 3.141 14.1615C3.02229 13.9376 2.84295 13.7516 2.6235 13.6249C2.3985 13.4899 2.124 13.4228 1.8 13.4235ZM2.41312 14.9231C2.41695 15.0713 2.3841 15.2182 2.3175 15.3506C2.25778 15.466 2.16441 15.5606 2.04975 15.6217C1.9187 15.6863 1.7739 15.7179 1.62788 15.714H0.8865V14.1323H1.629C1.87425 14.1323 2.06625 14.2005 2.205 14.337C2.34375 14.4728 2.41312 14.6681 2.41312 14.9231ZM7.59825 17.9224V13.4235H9.23963C9.69638 13.4235 10.0729 13.5113 10.3691 13.6868C10.6661 13.863 10.8874 14.118 11.0329 14.4517C11.1791 14.7855 11.2522 15.1886 11.2522 15.6611C11.2522 16.1366 11.1787 16.5431 11.0317 16.8806C10.8847 17.2181 10.662 17.4765 10.3635 17.6558C10.0665 17.8335 9.6915 17.9224 9.2385 17.9224H7.59825ZM9.12038 14.1491H8.48813V17.1945H9.12038C9.32963 17.1945 9.51075 17.1637 9.66375 17.1022C9.81193 17.0428 9.94162 16.9449 10.0395 16.8187C10.1464 16.6781 10.222 16.5163 10.2611 16.344C10.3114 16.155 10.3365 15.933 10.3365 15.678C10.3447 15.39 10.3 15.1029 10.2049 14.8309C10.1313 14.6215 9.99101 14.442 9.8055 14.3201C9.6285 14.2061 9.40013 14.1491 9.12038 14.1491Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1071_2107">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-[12px] md:text-[14px] font-medium text-black">
                      PSD
                    </span>
                  </div>
                </div>
              )}
              {/* --------------------------------for multiple download---------------------------------------- */}
              {dropdownMultipleDownload && (
                <div className="absolute bottom-[42%] md:bottom-[50px] right-[21%] md:right-[208px] bg-gray-100 shadow-xl rounded-md w-[85px] md:w-[100px] border border-gray-400 z-[999]">
                  <div
                    className="flex items-center gap-2 px-4 py-[6px] hover:bg-[#4AD991] border-b border-b-gray-400 hover:text-black cursor-pointer"
                    onClick={() => {
                      console.log(
                        "zipFileDownload function called with parameter: JPG"
                      );
                      handleSingleAndMultipleDownload("JPG");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1071_2097)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.75 5.0625V15.75C15.75 16.3467 15.5129 16.919 15.091 17.341C14.669 17.7629 14.0967 18 13.5 18H12.375V16.875H13.5C13.7984 16.875 14.0845 16.7565 14.2955 16.5455C14.5065 16.3345 14.625 16.0484 14.625 15.75V5.0625H12.375C11.9274 5.0625 11.4982 4.88471 11.1818 4.56824C10.8653 4.25178 10.6875 3.82255 10.6875 3.375V1.125H4.5C4.20163 1.125 3.91548 1.24353 3.7045 1.4545C3.49353 1.66548 3.375 1.95163 3.375 2.25V12.375H2.25V2.25C2.25 1.65326 2.48705 1.08097 2.90901 0.65901C3.33097 0.237053 3.90326 0 4.5 0L10.6875 0L15.75 5.0625ZM10.8675 14.211C10.953 14.3835 11.0055 14.568 11.025 14.7645H10.152C10.1316 14.6657 10.0947 14.571 10.0429 14.4844C9.99275 14.402 9.92792 14.3296 9.85162 14.2706C9.77273 14.2066 9.68219 14.1585 9.585 14.1289C9.47603 14.0954 9.36261 14.0787 9.24862 14.0794C8.92762 14.0794 8.67825 14.1926 8.5005 14.4191C8.325 14.6449 8.23725 14.9636 8.23725 15.3754V15.9356C8.23725 16.1989 8.27363 16.4295 8.34638 16.6275C8.41291 16.8123 8.53173 16.9737 8.68838 17.0921C8.8607 17.2073 9.06514 17.2648 9.27225 17.2564C9.44975 17.2615 9.62593 17.2244 9.78638 17.1484C9.91484 17.0809 10.0211 16.9778 10.0924 16.8514C10.1599 16.7284 10.194 16.5923 10.1948 16.443V16.1561H9.27V15.4924H11.043V16.3901C11.043 16.6076 11.0066 16.8139 10.9339 17.0089C10.8615 17.2019 10.7492 17.3775 10.6042 17.5241C10.4455 17.6794 10.2557 17.7994 10.0474 17.8763C9.82537 17.9595 9.564 18.0011 9.26325 18.0011C8.97395 18.0066 8.68632 17.9561 8.41612 17.8526C8.18661 17.7587 7.98154 17.6136 7.8165 17.4285C7.6523 17.2385 7.52967 17.0162 7.4565 16.776C7.37507 16.5042 7.33525 16.2216 7.33837 15.9379V15.3686C7.33837 14.9614 7.41338 14.6051 7.56338 14.2999C7.71413 13.9954 7.93237 13.758 8.21812 13.5878C8.50612 13.4168 8.85337 13.3313 9.25987 13.3313C9.52762 13.3313 9.76612 13.3687 9.97537 13.4437C10.1854 13.5187 10.3654 13.6219 10.5154 13.7531C10.6654 13.8844 10.7831 14.037 10.8686 14.211H10.8675ZM0 16.6343C0 16.8188 0.03075 16.9931 0.09225 17.1574C0.1545 17.3224 0.245625 17.4686 0.365625 17.5961C0.489375 17.7236 0.642 17.8237 0.8235 17.8965C1.008 17.9662 1.22138 18.0011 1.46362 18.0011C1.93612 18.0011 2.30513 17.8718 2.57063 17.613C2.83838 17.3535 2.97262 16.9766 2.97337 16.4824V13.4167H2.0835V16.5049C2.0835 16.7321 2.03175 16.9069 1.92825 17.0291C1.82475 17.1514 1.6665 17.2129 1.4535 17.2136C1.35124 17.2183 1.24964 17.1951 1.15963 17.1463C1.06963 17.0975 0.994644 17.0251 0.94275 16.9369C0.891829 16.8435 0.863689 16.7394 0.860625 16.6331H0V16.6343ZM5.535 13.4167H3.73725V17.9167H4.62712V16.4059H5.5305C5.853 16.4059 6.1275 16.3414 6.354 16.2124C6.58275 16.0796 6.75638 15.9015 6.87488 15.678C6.99638 15.4515 7.05675 15.1976 7.056 14.9164C7.056 14.6359 6.99675 14.382 6.87825 14.1547C6.75954 13.9308 6.5802 13.7449 6.36075 13.6181C6.13575 13.4831 5.86125 13.416 5.53725 13.4167H5.535ZM6.14925 14.9164C6.15326 15.065 6.1204 15.2122 6.05363 15.345C5.99373 15.46 5.90037 15.5541 5.78588 15.615C5.65482 15.6795 5.51003 15.7112 5.364 15.7072H4.62375V14.1255H5.36625C5.6115 14.1255 5.8035 14.1937 5.94225 14.3302C6.081 14.466 6.14925 14.6614 6.14925 14.9164Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1071_2097">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-[12px] md:text-[14px] font-medium text-black">
                      JPG
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-2 px-4 py-[6px] hover:bg-[#4AD991] border-b border-b-gray-400 hover:text-black cursor-pointer"
                    onClick={() => handleSingleAndMultipleDownload("PNG")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1071_2102)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.75 5.0625V15.75C15.75 16.3467 15.5129 16.919 15.091 17.341C14.669 17.7629 14.0967 18 13.5 18V16.875C13.7984 16.875 14.0845 16.7565 14.2955 16.5455C14.5065 16.3345 14.625 16.0484 14.625 15.75V5.0625H12.375C11.9274 5.0625 11.4982 4.88471 11.1818 4.56824C10.8653 4.25178 10.6875 3.82255 10.6875 3.375V1.125H4.5C4.20163 1.125 3.91548 1.24353 3.7045 1.4545C3.49353 1.66548 3.375 1.95163 3.375 2.25V12.375H2.25V2.25C2.25 1.65326 2.48705 1.08097 2.90901 0.65901C3.33097 0.237053 3.90326 0 4.5 0L10.6875 0L15.75 5.0625ZM11.52 14.211C11.6055 14.3835 11.658 14.568 11.6775 14.7645H10.8045C10.7841 14.6657 10.7472 14.571 10.6954 14.4844C10.6452 14.402 10.5804 14.3296 10.5041 14.2706C10.4252 14.2066 10.3347 14.1585 10.2375 14.1289C10.1285 14.0954 10.0151 14.0787 9.90112 14.0794C9.58087 14.0794 9.3315 14.1926 9.153 14.4191C8.9775 14.6449 8.88975 14.9636 8.88975 15.3754V15.9356C8.88975 16.1989 8.92613 16.4295 8.99888 16.6275C9.06541 16.8123 9.18423 16.9737 9.34088 17.0921C9.5132 17.2073 9.71764 17.2648 9.92475 17.2564C10.1022 17.2615 10.2784 17.2244 10.4389 17.1484C10.5673 17.0809 10.6736 16.9778 10.7449 16.8514C10.8124 16.7284 10.8465 16.5923 10.8473 16.443V16.1561H9.9225V15.4924H11.6955V16.3901C11.6955 16.6076 11.6591 16.8139 11.5864 17.0089C11.514 17.2019 11.4017 17.3775 11.2567 17.5241C11.098 17.6794 10.9082 17.7994 10.6999 17.8763C10.4779 17.9595 10.2165 18.0011 9.91575 18.0011C9.62645 18.0066 9.33882 17.9561 9.06862 17.8526C8.83911 17.7587 8.63404 17.6136 8.469 17.4285C8.3048 17.2385 8.18217 17.0162 8.109 16.776C8.02757 16.5042 7.98775 16.2216 7.99088 15.9379V15.3686C7.99088 14.9614 8.06587 14.6051 8.21587 14.2999C8.36662 13.9954 8.58488 13.758 8.87063 13.5878C9.15863 13.4168 9.50587 13.3313 9.91237 13.3313C10.1801 13.3313 10.4186 13.3687 10.6279 13.4437C10.8386 13.5187 11.0186 13.6219 11.1679 13.7531C11.3179 13.8851 11.4356 14.0377 11.5211 14.211H11.52ZM1.8 13.4167H0V17.9167H0.889875V16.4059H1.79325C2.11575 16.4059 2.39025 16.3414 2.61675 16.2124C2.8455 16.0796 3.01913 15.9015 3.13763 15.678C3.26114 15.4434 3.32344 15.1814 3.31875 14.9164C3.31875 14.6359 3.2595 14.382 3.141 14.1547C3.02229 13.9308 2.84295 13.7449 2.6235 13.6181C2.3985 13.4831 2.124 13.416 1.8 13.4167ZM2.41312 14.9164C2.41713 15.065 2.38428 15.2122 2.3175 15.345C2.2576 15.46 2.16425 15.5541 2.04975 15.615C1.9187 15.6795 1.7739 15.7112 1.62788 15.7072H0.8865V14.1255H1.629C1.87425 14.1255 2.06625 14.1937 2.205 14.3302C2.34375 14.466 2.41312 14.6614 2.41312 14.9164ZM4.62263 17.9156V14.9062H4.65862L6.63975 17.9156H7.37775V13.4167H6.534V16.4093H6.498L4.527 13.4167H3.78225V17.9167L4.62263 17.9156Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1071_2102">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-[12px] md:text-[14px] font-medium text-black">
                      PNG
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-2 px-4 py-[6px] hover:bg-[#4AD991] hover:text-black cursor-pointer "
                    onClick={() => handleSingleAndMultipleDownload("PSD")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1071_2107)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.75 5.0625V15.75C15.75 16.3467 15.5129 16.919 15.091 17.341C14.669 17.7629 14.0967 18 13.5 18H12.9375V16.875H13.5C13.7984 16.875 14.0845 16.7565 14.2955 16.5455C14.5065 16.3345 14.625 16.0484 14.625 15.75V5.0625H12.375C11.9274 5.0625 11.4982 4.88471 11.1818 4.56824C10.8653 4.25178 10.6875 3.82255 10.6875 3.375V1.125H4.5C4.20163 1.125 3.91548 1.24353 3.7045 1.4545C3.49353 1.66548 3.375 1.95163 3.375 2.25V12.375H2.25V2.25C2.25 1.65326 2.48705 1.08097 2.90901 0.65901C3.33097 0.237053 3.90326 0 4.5 0L10.6875 0L15.75 5.0625ZM3.5055 16.6961C3.51194 16.8734 3.5554 17.0473 3.6331 17.2068C3.71079 17.3663 3.821 17.5077 3.95662 17.622C4.10212 17.7435 4.28137 17.838 4.49437 17.9055C4.70737 17.9738 4.95675 18.0079 5.2425 18.0079C5.62275 18.0079 5.9445 17.9486 6.20775 17.8301C6.474 17.7116 6.6765 17.5466 6.81525 17.3351C6.95712 17.1155 7.03036 16.8586 7.02562 16.5971C7.02562 16.3451 6.975 16.1351 6.87375 15.9671C6.77082 15.7985 6.62532 15.66 6.45188 15.5655C6.25315 15.4551 6.03884 15.3754 5.81625 15.3293L5.11762 15.1673C4.95289 15.136 4.79722 15.0684 4.662 14.9692C4.61088 14.9295 4.56972 14.8785 4.54179 14.8201C4.51387 14.7617 4.49994 14.6976 4.50112 14.6329C4.50112 14.4574 4.57012 14.3134 4.70812 14.2009C4.84912 14.0869 5.0415 14.0299 5.28525 14.0299C5.44575 14.0299 5.5845 14.0554 5.7015 14.1064C5.80936 14.1494 5.9043 14.2195 5.97713 14.31C6.04636 14.3935 6.09287 14.4935 6.11213 14.6002H6.95588C6.94169 14.3714 6.86418 14.1509 6.732 13.9635C6.59024 13.7612 6.39567 13.6016 6.1695 13.5022C5.89339 13.3806 5.59359 13.3222 5.292 13.3313C4.962 13.3313 4.671 13.3875 4.419 13.5C4.16625 13.6117 3.96825 13.7696 3.825 13.9736C3.6825 14.1784 3.61125 14.418 3.61125 14.6925C3.61125 14.919 3.65737 15.1155 3.74962 15.282C3.84187 15.4485 3.9735 15.5861 4.1445 15.6949C4.31625 15.8021 4.51875 15.882 4.752 15.9345L5.44725 16.0965C5.67975 16.1512 5.853 16.2236 5.967 16.3136C6.02305 16.3564 6.06796 16.4121 6.09793 16.4759C6.12789 16.5398 6.14202 16.6099 6.13912 16.6804C6.14166 16.7964 6.10826 16.9103 6.0435 17.0066C5.97101 17.1053 5.87132 17.1808 5.75663 17.2238C5.63138 17.2763 5.4765 17.3025 5.292 17.3025C5.16 17.3025 5.04 17.2875 4.932 17.2575C4.83227 17.2307 4.73789 17.1869 4.653 17.1281C4.5782 17.0795 4.51414 17.0162 4.4648 16.9418C4.41546 16.8675 4.38188 16.7839 4.36613 16.6961H3.5055ZM1.8 13.4235H0V17.9235H0.889875V16.4126H1.79325C2.11575 16.4126 2.39025 16.3478 2.61675 16.218C2.8455 16.0868 3.01913 15.909 3.13763 15.6848C3.26114 15.4502 3.32344 15.1882 3.31875 14.9231C3.31875 14.6419 3.2595 14.388 3.141 14.1615C3.02229 13.9376 2.84295 13.7516 2.6235 13.6249C2.3985 13.4899 2.124 13.4228 1.8 13.4235ZM2.41312 14.9231C2.41695 15.0713 2.3841 15.2182 2.3175 15.3506C2.25778 15.466 2.16441 15.5606 2.04975 15.6217C1.9187 15.6863 1.7739 15.7179 1.62788 15.714H0.8865V14.1323H1.629C1.87425 14.1323 2.06625 14.2005 2.205 14.337C2.34375 14.4728 2.41312 14.6681 2.41312 14.9231ZM7.59825 17.9224V13.4235H9.23963C9.69638 13.4235 10.0729 13.5113 10.3691 13.6868C10.6661 13.863 10.8874 14.118 11.0329 14.4517C11.1791 14.7855 11.2522 15.1886 11.2522 15.6611C11.2522 16.1366 11.1787 16.5431 11.0317 16.8806C10.8847 17.2181 10.662 17.4765 10.3635 17.6558C10.0665 17.8335 9.6915 17.9224 9.2385 17.9224H7.59825ZM9.12038 14.1491H8.48813V17.1945H9.12038C9.32963 17.1945 9.51075 17.1637 9.66375 17.1022C9.81193 17.0428 9.94162 16.9449 10.0395 16.8187C10.1464 16.6781 10.222 16.5163 10.2611 16.344C10.3114 16.155 10.3365 15.933 10.3365 15.678C10.3447 15.39 10.3 15.1029 10.2049 14.8309C10.1313 14.6215 9.99101 14.442 9.8055 14.3201C9.6285 14.2061 9.40013 14.1491 9.12038 14.1491Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1071_2107">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-[12px] md:text-[14px] font-medium text-black">
                      PSD
                    </span>
                  </div>
                </div>
              )}

              {/* --------------------------------------------------------------for pro touch download---------------------------------------------------------------- */}
              {activeTab === "pro-touch" ? (
                <div className="hidden md:block">
                  <div className="absolute bottom-2 right-0 flex justify-center items-center z-[999]">
                    <div
                      onClick={toggleDropdownMultipleDownload}
                      className="flex justify-center items-center px-4 py-2 gap-[5px] bg-[#255646] w-[140px] rounded mr-[14px] border-black border shadow-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M9.00007 8.62499V15M9.00007 15L11.2501 12.75M9.00007 15L6.75007 12.75M6.00007 5.27699C6.56104 5.35808 7.08068 5.61856 7.48132 6.01949M13.1251 10.5C14.2643 10.5 15.0001 9.57674 15.0001 8.43749C15 7.98645 14.8521 7.54786 14.5791 7.18889C14.306 6.82993 13.9227 6.57037 13.4881 6.44999C13.4212 5.60883 13.0726 4.81481 12.4986 4.19631C11.9246 3.5778 11.1588 3.17096 10.3249 3.04156C9.49112 2.91215 8.63802 3.06776 7.90357 3.4832C7.16911 3.89865 6.59624 4.54966 6.27757 5.33099C5.60664 5.145 4.88931 5.23316 4.28338 5.57607C3.67745 5.91898 3.23256 6.48855 3.04657 7.15949C2.86059 7.83042 2.94875 8.54775 3.29166 9.15368C3.63457 9.75961 4.20414 10.2045 4.87507 10.3905"
                          stroke="white"
                          strokeWidth="1.16667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <button className="text-[14px] font-medium text-[#FFF]">
                        Download
                      </button>
                    </div>

                    <div
                      className="flex justify-center items-center px-4 py-2 gap-[5px] bg-[#87E17F] w-[180px] rounded mr-[14px] border-black border shadow-lg cursor-pointer"
                      onClick={toggleDropdownProTouch}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M9.00007 8.62499V15M9.00007 15L11.2501 12.75M9.00007 15L6.75007 12.75M6.00007 5.27699C6.56104 5.35808 7.08068 5.61856 7.48132 6.01949M13.1251 10.5C14.2643 10.5 15.0001 9.57674 15.0001 8.43749C15 7.98645 14.8521 7.54786 14.5791 7.18889C14.306 6.82993 13.9227 6.57037 13.4881 6.44999C13.4212 5.60883 13.0726 4.81481 12.4986 4.19631C11.9246 3.5778 11.1588 3.17096 10.3249 3.04156C9.49112 2.91215 8.63802 3.06776 7.90357 3.4832C7.16911 3.89865 6.59624 4.54966 6.27757 5.33099C5.60664 5.145 4.88931 5.23316 4.28338 5.57607C3.67745 5.91898 3.23256 6.48855 3.04657 7.15949C2.86059 7.83042 2.94875 8.54775 3.29166 9.15368C3.63457 9.75961 4.20414 10.2045 4.87507 10.3905"
                          stroke="black"
                          strokeWidth="1.16667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <button className="text-[14px] font-medium text-[black]">
                        Download All
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              {dropdownProTouchVisible && (
                <div className="absolute bottom-[50px] right-[14px] bg-gray-100 shadow-xl rounded-md  w-[100px] border border-gray-400 z-[999]">
                  <div
                    className="flex items-center gap-2 px-4 py-[6px] hover:bg-[#4AD991] border-b border-b-gray-400 hover:text-black cursor-pointer"
                    onClick={() => {
                      zipFileDownloadProTouch("JPG");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1071_2097)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.75 5.0625V15.75C15.75 16.3467 15.5129 16.919 15.091 17.341C14.669 17.7629 14.0967 18 13.5 18H12.375V16.875H13.5C13.7984 16.875 14.0845 16.7565 14.2955 16.5455C14.5065 16.3345 14.625 16.0484 14.625 15.75V5.0625H12.375C11.9274 5.0625 11.4982 4.88471 11.1818 4.56824C10.8653 4.25178 10.6875 3.82255 10.6875 3.375V1.125H4.5C4.20163 1.125 3.91548 1.24353 3.7045 1.4545C3.49353 1.66548 3.375 1.95163 3.375 2.25V12.375H2.25V2.25C2.25 1.65326 2.48705 1.08097 2.90901 0.65901C3.33097 0.237053 3.90326 0 4.5 0L10.6875 0L15.75 5.0625ZM10.8675 14.211C10.953 14.3835 11.0055 14.568 11.025 14.7645H10.152C10.1316 14.6657 10.0947 14.571 10.0429 14.4844C9.99275 14.402 9.92792 14.3296 9.85162 14.2706C9.77273 14.2066 9.68219 14.1585 9.585 14.1289C9.47603 14.0954 9.36261 14.0787 9.24862 14.0794C8.92762 14.0794 8.67825 14.1926 8.5005 14.4191C8.325 14.6449 8.23725 14.9636 8.23725 15.3754V15.9356C8.23725 16.1989 8.27363 16.4295 8.34638 16.6275C8.41291 16.8123 8.53173 16.9737 8.68838 17.0921C8.8607 17.2073 9.06514 17.2648 9.27225 17.2564C9.44975 17.2615 9.62593 17.2244 9.78638 17.1484C9.91484 17.0809 10.0211 16.9778 10.0924 16.8514C10.1599 16.7284 10.194 16.5923 10.1948 16.443V16.1561H9.27V15.4924H11.043V16.3901C11.043 16.6076 11.0066 16.8139 10.9339 17.0089C10.8615 17.2019 10.7492 17.3775 10.6042 17.5241C10.4455 17.6794 10.2557 17.7994 10.0474 17.8763C9.82537 17.9595 9.564 18.0011 9.26325 18.0011C8.97395 18.0066 8.68632 17.9561 8.41612 17.8526C8.18661 17.7587 7.98154 17.6136 7.8165 17.4285C7.6523 17.2385 7.52967 17.0162 7.4565 16.776C7.37507 16.5042 7.33525 16.2216 7.33837 15.9379V15.3686C7.33837 14.9614 7.41338 14.6051 7.56338 14.2999C7.71413 13.9954 7.93237 13.758 8.21812 13.5878C8.50612 13.4168 8.85337 13.3313 9.25987 13.3313C9.52762 13.3313 9.76612 13.3687 9.97537 13.4437C10.1854 13.5187 10.3654 13.6219 10.5154 13.7531C10.6654 13.8844 10.7831 14.037 10.8686 14.211H10.8675ZM0 16.6343C0 16.8188 0.03075 16.9931 0.09225 17.1574C0.1545 17.3224 0.245625 17.4686 0.365625 17.5961C0.489375 17.7236 0.642 17.8237 0.8235 17.8965C1.008 17.9662 1.22138 18.0011 1.46362 18.0011C1.93612 18.0011 2.30513 17.8718 2.57063 17.613C2.83838 17.3535 2.97262 16.9766 2.97337 16.4824V13.4167H2.0835V16.5049C2.0835 16.7321 2.03175 16.9069 1.92825 17.0291C1.82475 17.1514 1.6665 17.2129 1.4535 17.2136C1.35124 17.2183 1.24964 17.1951 1.15963 17.1463C1.06963 17.0975 0.994644 17.0251 0.94275 16.9369C0.891829 16.8435 0.863689 16.7394 0.860625 16.6331H0V16.6343ZM5.535 13.4167H3.73725V17.9167H4.62712V16.4059H5.5305C5.853 16.4059 6.1275 16.3414 6.354 16.2124C6.58275 16.0796 6.75638 15.9015 6.87488 15.678C6.99638 15.4515 7.05675 15.1976 7.056 14.9164C7.056 14.6359 6.99675 14.382 6.87825 14.1547C6.75954 13.9308 6.5802 13.7449 6.36075 13.6181C6.13575 13.4831 5.86125 13.416 5.53725 13.4167H5.535ZM6.14925 14.9164C6.15326 15.065 6.1204 15.2122 6.05363 15.345C5.99373 15.46 5.90037 15.5541 5.78588 15.615C5.65482 15.6795 5.51003 15.7112 5.364 15.7072H4.62375V14.1255H5.36625C5.6115 14.1255 5.8035 14.1937 5.94225 14.3302C6.081 14.466 6.14925 14.6614 6.14925 14.9164Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1071_2097">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-[14px] font-medium text-black">
                      JPG
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-2 px-4 py-[6px] hover:bg-[#4AD991] border-b border-b-gray-400 hover:text-black cursor-pointer"
                    onClick={() => zipFileDownloadProTouch("PNG")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1071_2102)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.75 5.0625V15.75C15.75 16.3467 15.5129 16.919 15.091 17.341C14.669 17.7629 14.0967 18 13.5 18V16.875C13.7984 16.875 14.0845 16.7565 14.2955 16.5455C14.5065 16.3345 14.625 16.0484 14.625 15.75V5.0625H12.375C11.9274 5.0625 11.4982 4.88471 11.1818 4.56824C10.8653 4.25178 10.6875 3.82255 10.6875 3.375V1.125H4.5C4.20163 1.125 3.91548 1.24353 3.7045 1.4545C3.49353 1.66548 3.375 1.95163 3.375 2.25V12.375H2.25V2.25C2.25 1.65326 2.48705 1.08097 2.90901 0.65901C3.33097 0.237053 3.90326 0 4.5 0L10.6875 0L15.75 5.0625ZM11.52 14.211C11.6055 14.3835 11.658 14.568 11.6775 14.7645H10.8045C10.7841 14.6657 10.7472 14.571 10.6954 14.4844C10.6452 14.402 10.5804 14.3296 10.5041 14.2706C10.4252 14.2066 10.3347 14.1585 10.2375 14.1289C10.1285 14.0954 10.0151 14.0787 9.90112 14.0794C9.58087 14.0794 9.3315 14.1926 9.153 14.4191C8.9775 14.6449 8.88975 14.9636 8.88975 15.3754V15.9356C8.88975 16.1989 8.92613 16.4295 8.99888 16.6275C9.06541 16.8123 9.18423 16.9737 9.34088 17.0921C9.5132 17.2073 9.71764 17.2648 9.92475 17.2564C10.1022 17.2615 10.2784 17.2244 10.4389 17.1484C10.5673 17.0809 10.6736 16.9778 10.7449 16.8514C10.8124 16.7284 10.8465 16.5923 10.8473 16.443V16.1561H9.9225V15.4924H11.6955V16.3901C11.6955 16.6076 11.6591 16.8139 11.5864 17.0089C11.514 17.2019 11.4017 17.3775 11.2567 17.5241C11.098 17.6794 10.9082 17.7994 10.6999 17.8763C10.4779 17.9595 10.2165 18.0011 9.91575 18.0011C9.62645 18.0066 9.33882 17.9561 9.06862 17.8526C8.83911 17.7587 8.63404 17.6136 8.469 17.4285C8.3048 17.2385 8.18217 17.0162 8.109 16.776C8.02757 16.5042 7.98775 16.2216 7.99088 15.9379V15.3686C7.99088 14.9614 8.06587 14.6051 8.21587 14.2999C8.36662 13.9954 8.58488 13.758 8.87063 13.5878C9.15863 13.4168 9.50587 13.3313 9.91237 13.3313C10.1801 13.3313 10.4186 13.3687 10.6279 13.4437C10.8386 13.5187 11.0186 13.6219 11.1679 13.7531C11.3179 13.8851 11.4356 14.0377 11.5211 14.211H11.52ZM1.8 13.4167H0V17.9167H0.889875V16.4059H1.79325C2.11575 16.4059 2.39025 16.3414 2.61675 16.2124C2.8455 16.0796 3.01913 15.9015 3.13763 15.678C3.26114 15.4434 3.32344 15.1814 3.31875 14.9164C3.31875 14.6359 3.2595 14.382 3.141 14.1547C3.02229 13.9308 2.84295 13.7449 2.6235 13.6181C2.3985 13.4831 2.124 13.416 1.8 13.4167ZM2.41312 14.9164C2.41713 15.065 2.38428 15.2122 2.3175 15.345C2.2576 15.46 2.16425 15.5541 2.04975 15.615C1.9187 15.6795 1.7739 15.7112 1.62788 15.7072H0.8865V14.1255H1.629C1.87425 14.1255 2.06625 14.1937 2.205 14.3302C2.34375 14.466 2.41312 14.6614 2.41312 14.9164ZM4.62263 17.9156V14.9062H4.65862L6.63975 17.9156H7.37775V13.4167H6.534V16.4093H6.498L4.527 13.4167H3.78225V17.9167L4.62263 17.9156Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1071_2102">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-[14px] font-medium text-black">
                      PNG
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-2 px-4 py-[6px] hover:bg-[#4AD991] hover:text-black cursor-pointer "
                    onClick={() => zipFileDownloadProTouch("PSD")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1071_2107)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.75 5.0625V15.75C15.75 16.3467 15.5129 16.919 15.091 17.341C14.669 17.7629 14.0967 18 13.5 18H12.9375V16.875H13.5C13.7984 16.875 14.0845 16.7565 14.2955 16.5455C14.5065 16.3345 14.625 16.0484 14.625 15.75V5.0625H12.375C11.9274 5.0625 11.4982 4.88471 11.1818 4.56824C10.8653 4.25178 10.6875 3.82255 10.6875 3.375V1.125H4.5C4.20163 1.125 3.91548 1.24353 3.7045 1.4545C3.49353 1.66548 3.375 1.95163 3.375 2.25V12.375H2.25V2.25C2.25 1.65326 2.48705 1.08097 2.90901 0.65901C3.33097 0.237053 3.90326 0 4.5 0L10.6875 0L15.75 5.0625ZM3.5055 16.6961C3.51194 16.8734 3.5554 17.0473 3.6331 17.2068C3.71079 17.3663 3.821 17.5077 3.95662 17.622C4.10212 17.7435 4.28137 17.838 4.49437 17.9055C4.70737 17.9738 4.95675 18.0079 5.2425 18.0079C5.62275 18.0079 5.9445 17.9486 6.20775 17.8301C6.474 17.7116 6.6765 17.5466 6.81525 17.3351C6.95712 17.1155 7.03036 16.8586 7.02562 16.5971C7.02562 16.3451 6.975 16.1351 6.87375 15.9671C6.77082 15.7985 6.62532 15.66 6.45188 15.5655C6.25315 15.4551 6.03884 15.3754 5.81625 15.3293L5.11762 15.1673C4.95289 15.136 4.79722 15.0684 4.662 14.9692C4.61088 14.9295 4.56972 14.8785 4.54179 14.8201C4.51387 14.7617 4.49994 14.6976 4.50112 14.6329C4.50112 14.4574 4.57012 14.3134 4.70812 14.2009C4.84912 14.0869 5.0415 14.0299 5.28525 14.0299C5.44575 14.0299 5.5845 14.0554 5.7015 14.1064C5.80936 14.1494 5.9043 14.2195 5.97713 14.31C6.04636 14.3935 6.09287 14.4935 6.11213 14.6002H6.95588C6.94169 14.3714 6.86418 14.1509 6.732 13.9635C6.59024 13.7612 6.39567 13.6016 6.1695 13.5022C5.89339 13.3806 5.59359 13.3222 5.292 13.3313C4.962 13.3313 4.671 13.3875 4.419 13.5C4.16625 13.6117 3.96825 13.7696 3.825 13.9736C3.6825 14.1784 3.61125 14.418 3.61125 14.6925C3.61125 14.919 3.65737 15.1155 3.74962 15.282C3.84187 15.4485 3.9735 15.5861 4.1445 15.6949C4.31625 15.8021 4.51875 15.882 4.752 15.9345L5.44725 16.0965C5.67975 16.1512 5.853 16.2236 5.967 16.3136C6.02305 16.3564 6.06796 16.4121 6.09793 16.4759C6.12789 16.5398 6.14202 16.6099 6.13912 16.6804C6.14166 16.7964 6.10826 16.9103 6.0435 17.0066C5.97101 17.1053 5.87132 17.1808 5.75663 17.2238C5.63138 17.2763 5.4765 17.3025 5.292 17.3025C5.16 17.3025 5.04 17.2875 4.932 17.2575C4.83227 17.2307 4.73789 17.1869 4.653 17.1281C4.5782 17.0795 4.51414 17.0162 4.4648 16.9418C4.41546 16.8675 4.38188 16.7839 4.36613 16.6961H3.5055ZM1.8 13.4235H0V17.9235H0.889875V16.4126H1.79325C2.11575 16.4126 2.39025 16.3478 2.61675 16.218C2.8455 16.0868 3.01913 15.909 3.13763 15.6848C3.26114 15.4502 3.32344 15.1882 3.31875 14.9231C3.31875 14.6419 3.2595 14.388 3.141 14.1615C3.02229 13.9376 2.84295 13.7516 2.6235 13.6249C2.3985 13.4899 2.124 13.4228 1.8 13.4235ZM2.41312 14.9231C2.41695 15.0713 2.3841 15.2182 2.3175 15.3506C2.25778 15.466 2.16441 15.5606 2.04975 15.6217C1.9187 15.6863 1.7739 15.7179 1.62788 15.714H0.8865V14.1323H1.629C1.87425 14.1323 2.06625 14.2005 2.205 14.337C2.34375 14.4728 2.41312 14.6681 2.41312 14.9231ZM7.59825 17.9224V13.4235H9.23963C9.69638 13.4235 10.0729 13.5113 10.3691 13.6868C10.6661 13.863 10.8874 14.118 11.0329 14.4517C11.1791 14.7855 11.2522 15.1886 11.2522 15.6611C11.2522 16.1366 11.1787 16.5431 11.0317 16.8806C10.8847 17.2181 10.662 17.4765 10.3635 17.6558C10.0665 17.8335 9.6915 17.9224 9.2385 17.9224H7.59825ZM9.12038 14.1491H8.48813V17.1945H9.12038C9.32963 17.1945 9.51075 17.1637 9.66375 17.1022C9.81193 17.0428 9.94162 16.9449 10.0395 16.8187C10.1464 16.6781 10.222 16.5163 10.2611 16.344C10.3114 16.155 10.3365 15.933 10.3365 15.678C10.3447 15.39 10.3 15.1029 10.2049 14.8309C10.1313 14.6215 9.99101 14.442 9.8055 14.3201C9.6285 14.2061 9.40013 14.1491 9.12038 14.1491Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1071_2107">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-[14px] font-medium text-black">
                      PSD
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-5 md:my-1  2xl:my-2">
              {/* <h1 className="outline-slate-200  outline-1 outline-dashed w-full "></h1> */}
            </div>
            <div className="h-[230px] md:h-[235px] 2xl:h-[380px]  bg-[#ECECEC] border-[2px] border-[#000] rounded-md">
              <div className=" px-4 ">
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center gap-1 bg-[#ffd14b33]   w-[222px] h-[30px] px-2 py-1  rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                    >
                      <path
                        d="M2.97976 14.5H13.0198C14.0464 14.5 14.6864 13.3867 14.1731 12.5L9.15309 3.82668C8.63976 2.94002 7.35976 2.94002 6.84642 3.82668L1.82642 12.5C1.31309 13.3867 1.95309 14.5 2.97976 14.5ZM7.99976 9.83335C7.63309 9.83335 7.33309 9.53335 7.33309 9.16668V7.83335C7.33309 7.46668 7.63309 7.16668 7.99976 7.16668C8.36642 7.16668 8.66642 7.46668 8.66642 7.83335V9.16668C8.66642 9.53335 8.36642 9.83335 7.99976 9.83335ZM8.66642 12.5H7.33309V11.1667H8.66642V12.5Z"
                        fill="#FF7A00"
                      />
                    </svg>
                    <h1 className="text-[12px] md:text-[16px] font-bold leading-[19px] text-[#FF7A00]">
                      Processing For Pro-Touch
                    </h1>
                  </div>
                  <div className="flex flex-col gap-[3px] items-end pt-[18px] pb-[18px]">
                    <div className="flex justify-center gap-[10px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        onClick={() => setViewModeLower("default")}
                        className={`btn cursor-pointer ${
                          viewModeLower === "default"
                        }`}
                      >
                        <path
                          d="M5.504 18H10.908C11.0633 18 11.1797 17.9277 11.257 17.783C11.3343 17.6383 11.3257 17.495 11.231 17.353L9.766 15.352C9.678 15.2447 9.57 15.191 9.442 15.191C9.314 15.191 9.20633 15.2447 9.119 15.352L8.096 16.687C8.00933 16.7943 7.90167 16.851 7.773 16.857C7.645 16.8637 7.53733 16.8133 7.45 16.706L6.85 15.925C6.76333 15.8177 6.65567 15.7647 6.527 15.766C6.399 15.768 6.29133 15.823 6.204 15.931L5.156 17.354C5.06133 17.4953 5.05633 17.6383 5.141 17.783C5.22567 17.9277 5.34667 18 5.504 18ZM5.616 20C5.17133 20 4.791 19.8417 4.475 19.525C4.159 19.2083 4.00067 18.8287 4 18.386V13C4 12.556 4.15833 12.176 4.475 11.86C4.791 11.5427 5.171 11.384 5.615 11.384H11C11.444 11.384 11.824 11.5423 12.14 11.859C12.4573 12.1757 12.616 12.556 12.616 13V18.385C12.616 18.829 12.4577 19.209 12.141 19.525C11.8243 19.8417 11.444 20 11 20H5.616ZM4.616 5.23C4.44133 5.23 4.295 5.17133 4.177 5.054C4.059 4.936 4 4.79 4 4.616C4 4.44133 4.059 4.295 4.177 4.177C4.295 4.059 4.44133 4 4.616 4C4.79067 4 4.93667 4.059 5.054 4.177C5.17133 4.295 5.23033 4.44133 5.231 4.616C5.23167 4.79067 5.17267 4.93666 5.054 5.054C4.93533 5.17133 4.789 5.23033 4.615 5.231M8.308 5.231C8.13333 5.231 7.987 5.172 7.869 5.054C7.751 4.936 7.692 4.79 7.692 4.616C7.692 4.442 7.751 4.29567 7.869 4.177C7.987 4.05833 8.13333 3.99933 8.308 4C8.48267 4.00067 8.62867 4.05967 8.746 4.177C8.86333 4.29433 8.92233 4.44067 8.923 4.616C8.92367 4.79133 8.86467 4.93733 8.746 5.054C8.62733 5.17067 8.48133 5.22967 8.308 5.231ZM12 5.231C11.826 5.231 11.68 5.172 11.562 5.054C11.444 4.936 11.385 4.79 11.385 4.616C11.385 4.442 11.444 4.29567 11.562 4.177C11.68 4.05833 11.826 3.99933 12 4C12.174 4.00067 12.3203 4.05967 12.439 4.177C12.5577 4.29433 12.6163 4.44067 12.615 4.616C12.6137 4.79133 12.5547 4.93733 12.438 5.054C12.3213 5.17067 12.1753 5.23033 12 5.231ZM15.692 5.23C15.518 5.23 15.372 5.171 15.254 5.053C15.136 4.935 15.077 4.78866 15.077 4.614C15.077 4.43933 15.136 4.29333 15.254 4.176C15.372 4.05867 15.518 3.99967 15.692 3.999C15.866 3.99833 16.0123 4.05733 16.131 4.176C16.2497 4.29467 16.3087 4.441 16.308 4.615C16.3073 4.789 16.2483 4.935 16.131 5.053C16.0137 5.171 15.8673 5.23 15.692 5.23ZM19.384 5.23C19.21 5.23 19.064 5.171 18.946 5.053C18.828 4.935 18.769 4.78866 18.769 4.614C18.769 4.43933 18.828 4.29333 18.946 4.176C19.064 4.05867 19.21 3.99967 19.384 3.999C19.558 3.99833 19.7043 4.05733 19.823 4.176C19.9417 4.29467 20.0007 4.441 20 4.615C19.9993 4.789 19.9403 4.935 19.823 5.053C19.7057 5.171 19.5587 5.23 19.384 5.23ZM15.692 20C15.518 20 15.372 19.941 15.254 19.823C15.136 19.705 15.077 19.559 15.077 19.385C15.077 19.211 15.136 19.0647 15.254 18.946C15.372 18.8273 15.518 18.7683 15.692 18.769C15.866 18.7697 16.0123 18.8287 16.131 18.946C16.2497 19.0633 16.3087 19.2093 16.308 19.384C16.3073 19.5587 16.2483 19.705 16.131 19.823C16.0137 19.941 15.8673 20 15.692 20ZM4.615 8.923C4.441 8.923 4.295 8.864 4.177 8.746C4.059 8.628 4 8.482 4 8.308C4 8.134 4.059 7.98766 4.177 7.869C4.295 7.75033 4.441 7.69133 4.615 7.692C4.789 7.69266 4.93533 7.75166 5.054 7.869C5.17267 7.98633 5.23167 8.13266 5.231 8.308C5.23033 8.48333 5.17133 8.62933 5.054 8.746C4.93667 8.86267 4.79033 8.92167 4.615 8.923ZM19.385 8.923C19.2103 8.923 19.064 8.864 18.946 8.746C18.828 8.628 18.769 8.482 18.769 8.308C18.769 8.134 18.828 7.98766 18.946 7.869C19.064 7.75033 19.21 7.69133 19.384 7.692C19.5587 7.692 19.705 7.751 19.823 7.869C19.941 7.987 20 8.13333 20 8.308C20 8.48267 19.941 8.62867 19.823 8.746C19.705 8.86333 19.559 8.92233 19.385 8.923ZM19.385 12.616C19.2103 12.616 19.064 12.557 18.946 12.439C18.828 12.321 18.7693 12.1747 18.77 12C18.7707 11.8253 18.8297 11.6793 18.947 11.562C19.0643 11.4447 19.2103 11.3857 19.385 11.385C19.5597 11.3843 19.706 11.4433 19.824 11.562C19.942 11.6807 20.0007 11.8267 20 12C19.9993 12.1733 19.9403 12.3197 19.823 12.439C19.705 12.5563 19.559 12.615 19.385 12.615M19.385 16.308C19.2103 16.308 19.064 16.249 18.946 16.131C18.828 16.013 18.769 15.8667 18.769 15.692C18.769 15.5173 18.828 15.3713 18.946 15.254C19.064 15.1367 19.21 15.0777 19.384 15.077C19.5587 15.077 19.705 15.136 19.823 15.254C19.941 15.372 20 15.518 20 15.692C20 15.866 19.941 16.0123 19.823 16.131C19.705 16.2497 19.559 16.3087 19.385 16.308ZM19.385 20C19.2103 20 19.064 19.941 18.946 19.823C18.828 19.705 18.769 19.559 18.769 19.385C18.769 19.211 18.828 19.0647 18.946 18.946C19.064 18.8273 19.21 18.7683 19.384 18.769C19.5587 18.769 19.705 18.828 19.823 18.946C19.941 19.064 20 19.21 20 19.384C20 19.558 19.941 19.7043 19.823 19.823C19.705 19.9417 19.559 20.0007 19.385 20Z"
                          fill={
                            viewModeLower === "default" ? "#009024" : "#000"
                          }
                        />
                      </svg>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          onClick={() => setViewModeLower("expanded")}
                          className={`btn cursor-pointer ${
                            viewModeLower === "expanded"
                          }`}
                        >
                          <path
                            d="M5.85 18H13.85C14.0667 18 14.221 17.9083 14.313 17.725C14.405 17.5417 14.384 17.3667 14.25 17.2L11.85 14.025C11.75 13.8917 11.6167 13.825 11.45 13.825C11.2833 13.825 11.15 13.8917 11.05 14.025L9.25 16.45C9.15 16.5833 9.01667 16.65 8.85 16.65C8.68334 16.65 8.55 16.5833 8.45 16.45L7.65 15.375C7.55 15.2417 7.41667 15.175 7.25 15.175C7.08334 15.175 6.95 15.2417 6.85 15.375L5.45 17.2C5.31667 17.3667 5.29567 17.5417 5.387 17.725C5.47834 17.9083 5.63267 18 5.85 18ZM5 21C4.45 21 3.979 20.8043 3.587 20.413C3.195 20.0217 2.99934 19.5507 3 19V9C3 8.45 3.196 7.97933 3.588 7.588C3.98 7.19667 4.45067 7.00067 5 7H15C15.55 7 16.021 7.196 16.413 7.588C16.805 7.98 17.0007 8.45067 17 9V19C17 19.55 16.8043 20.021 16.413 20.413C16.0217 20.805 15.5507 21.0007 15 21H5ZM4 5C3.71667 5 3.479 4.904 3.287 4.712C3.095 4.52 2.99934 4.28267 3 4C3.00067 3.71733 3.09667 3.48 3.288 3.288C3.47934 3.096 3.71667 3 4 3C4.28334 3 4.521 3.096 4.713 3.288C4.905 3.48 5.00067 3.71733 5 4C4.99934 4.28267 4.90334 4.52033 4.712 4.713C4.52067 4.90567 4.28334 5.00133 4 5ZM8 5C7.71667 5 7.47934 4.904 7.288 4.712C7.09667 4.52 7.00067 4.28267 7 4C6.99934 3.71733 7.09534 3.48 7.288 3.288C7.48067 3.096 7.718 3 8 3C8.282 3 8.51967 3.096 8.713 3.288C8.90634 3.48 9.002 3.71733 9 4C8.998 4.28267 8.902 4.52033 8.712 4.713C8.522 4.90567 8.28467 5.00133 8 5ZM12 5C11.7167 5 11.4793 4.904 11.288 4.712C11.0967 4.52 11.0007 4.28267 11 4C10.9993 3.71733 11.0953 3.48 11.288 3.288C11.4807 3.096 11.718 3 12 3C12.282 3 12.5197 3.096 12.713 3.288C12.9063 3.48 13.002 3.71733 13 4C12.998 4.28267 12.902 4.52033 12.712 4.713C12.522 4.90567 12.2847 5.00133 12 5ZM16 5C15.7167 5 15.4793 4.904 15.288 4.712C15.0967 4.52 15.0007 4.28267 15 4C14.9993 3.71733 15.0953 3.48 15.288 3.288C15.4807 3.096 15.718 3 16 3C16.282 3 16.5197 3.096 16.713 3.288C16.9063 3.48 17.002 3.71733 17 4C16.998 4.28267 16.902 4.52033 16.712 4.713C16.522 4.90567 16.2847 5.00133 16 5ZM20 5C19.7167 5 19.4793 4.904 19.288 4.712C19.0967 4.52 19.0007 4.28267 19 4C18.9993 3.71733 19.0953 3.48 19.288 3.288C19.4807 3.096 19.718 3 20 3C20.282 3 20.5197 3.096 20.713 3.288C20.9063 3.48 21.002 3.71733 21 4C20.998 4.28267 20.902 4.52033 20.712 4.713C20.522 4.90567 20.2847 5.00133 20 5ZM20 9C19.7167 9 19.4793 8.904 19.288 8.712C19.0967 8.52 19.0007 8.28267 19 8C18.9993 7.71733 19.0953 7.48 19.288 7.288C19.4807 7.096 19.718 7 20 7C20.282 7 20.5197 7.096 20.713 7.288C20.9063 7.48 21.002 7.71733 21 8C20.998 8.28267 20.902 8.52033 20.712 8.713C20.522 8.90567 20.2847 9.00133 20 9ZM20 13C19.7167 13 19.4793 12.904 19.288 12.712C19.0967 12.52 19.0007 12.2827 19 12C18.9993 11.7173 19.0953 11.48 19.288 11.288C19.4807 11.096 19.718 11 20 11C20.282 11 20.5197 11.096 20.713 11.288C20.9063 11.48 21.002 11.7173 21 12C20.998 12.2827 20.902 12.5203 20.712 12.713C20.522 12.9057 20.2847 13.0013 20 13ZM20 17C19.7167 17 19.4793 16.904 19.288 16.712C19.0967 16.52 19.0007 16.2827 19 16C18.9993 15.7173 19.0953 15.48 19.288 15.288C19.4807 15.096 19.718 15 20 15C20.282 15 20.5197 15.096 20.713 15.288C20.9063 15.48 21.002 15.7173 21 16C20.998 16.2827 20.902 16.5203 20.712 16.713C20.522 16.9057 20.2847 17.0013 20 17ZM20 21C19.7167 21 19.4793 20.904 19.288 20.712C19.0967 20.52 19.0007 20.2827 19 20C18.9993 19.7173 19.0953 19.48 19.288 19.288C19.4807 19.096 19.718 19 20 19C20.282 19 20.5197 19.096 20.713 19.288C20.9063 19.48 21.002 19.7173 21 20C20.998 20.2827 20.902 20.5203 20.712 20.713C20.522 20.9057 20.2847 21.0013 20 21Z"
                            fill={
                              viewModeLower === "expanded" ? "#009024" : "#000"
                            }
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-[12px] font-bold leading-[14px] text-[#726C6C]">
                        Change View
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[150px] md:h-[160px]   2xl:h-[300px] overflow-y-auto overflow-x-hidden px-4 ">
                {activeOrder?.orderImageDetails?.length > 0 ? (
                  activeOrder.orderImageDetails.some(
                    (image) => image.status_id === 5
                  ) ? (
                    <div
                      className={`${
                        viewModeLower === "expanded"
                          ? "grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-2"
                          : "grid grid-cols-4 md:grid-cols-10 gap-2 md:gap-y-2 2xl:gap-y-4 gap-y-3"
                      }`}
                    >
                      {activeOrder.orderImageDetails.map((image, index) =>
                        image.status_id === 5 ? (
                          <img
                            key={index}
                            src={image.compressed_raw_image_public_url}
                            alt={`Image ${index + 1}`}
                            className={`transition-all duration-300  object-cover rounded cursor-pointer ${
                              viewModeLower === "expanded"
                                ? "h-[140px] w-full"
                                : "h-[70px] md:h-[65px] 2xl:h-[85px] w-full"
                            }`}
                            onClick={() => handleImageClick(image)}
                          />
                        ) : null
                      )}
                    </div>
                  ) : (
                    <p>No images Processing For Pro-Touch</p>
                  )
                ) : (
                  <p>No images available for this order.</p>
                )}
              </div>
            </div>

            {/* -------------------------------------------------------------------------------------------------------------- */}
          </div>
          {/* Right Slide-In Panel */}
          {/* {selectedImage && ( */}
          <div
            className={`fixed top-0 right-0 h-full  bg-white shadow-lg transform ${
              isPanelOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-700 w-full md:w-[720px] z-[99999]`}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 hover:scale-150 transition-transform duration-500"
              onClick={closePanel}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="red"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="ml-4 mt-5 md:mt-10 mb-4">
              {/* <h1 className="text-2xl font-bold text-black leading-6">
                From Pro-Touch
              </h1> */}
            </div>
            <div className="flex justify-center  items-center">
              {/* Outer container with fixed dimensions */}
              <div className="h-[400px] w-[600px] flex justify-center items-center overflow-hidden ">
                <ReactCompareImage
                  leftImage={selectedImage?.compressed_raw_image_public_url}
                  rightImage={
                    selectedImage?.default_compressed_output_public_url
                  }
                  containerStyle={{
                    height: "100%",
                    width: "100%",
                  }}
                  sliderLineCss={{
                    width: "3px",
                    backgroundColor: "#000",
                  }}
                  leftImageCss={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                  }}
                  rightImageCss={{
                    objectFit: "contain",
                    height: "100%",
                    width: "100%",
                  }}
                />
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <hr className="bg-gray-500 h-[1px] w-[691px]" />
            </div>
            <div className="ml-4 mt-4">
              <h1 className="text-2xl font-bold text-black leading-6">
                Details
              </h1>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 md:gap-7 py-3 ml-4">
                <div className="flex flex-col items-center">
                  <h1 className="text-xs font-bold text-black leading-4">
                    Order ID
                  </h1>
                  <h1 className="text-xs font-normal text-gray-600 leading-4">
                    {activeOrder?.custom_code}
                  </h1>
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="text-xs font-bold text-black leading-4">
                    Order Date
                  </h1>
                  <h1 className="text-xs font-normal text-gray-600 leading-4">
                    {convertDate(activeOrder?.order_time)}
                  </h1>
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="text-xs font-bold text-black leading-4">
                    Upload From
                  </h1>
                  <h1 className="text-xs font-normal text-gray-600 leading-4">
                    {activeOrder?.file_upload_from === 1 ? "Web" : "Store"}
                  </h1>
                </div>
              </div>

              <div className="relative">
                <div
                  onClick={toggleDropdownSingleDownloadPop}
                  className="flex justify-center items-center px-3 h-8 md:h-full md:px- py-1 md:py-3 gap-[5px] bg-[#255646] md:w-[256px] rounded mr-[14px] cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M9.00007 8.62499V15M9.00007 15L11.2501 12.75M9.00007 15L6.75007 12.75M6.00007 5.27699C6.56104 5.35808 7.08068 5.61856 7.48132 6.01949M13.1251 10.5C14.2643 10.5 15.0001 9.57674 15.0001 8.43749C15 7.98645 14.8521 7.54786 14.5791 7.18889C14.306 6.82993 13.9227 6.57037 13.4881 6.44999C13.4212 5.60883 13.0726 4.81481 12.4986 4.19631C11.9246 3.5778 11.1588 3.17096 10.3249 3.04156C9.49112 2.91215 8.63802 3.06776 7.90357 3.4832C7.16911 3.89865 6.59624 4.54966 6.27757 5.33099C5.60664 5.145 4.88931 5.23316 4.28338 5.57607C3.67745 5.91898 3.23256 6.48855 3.04657 7.15949C2.86059 7.83042 2.94875 8.54775 3.29166 9.15368C3.63457 9.75961 4.20414 10.2045 4.87507 10.3905"
                      stroke="white"
                      strokeWidth="1.16667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <button className="text-[10px] md:text-[14px] font-medium text-[#FFF] ">
                    Download
                  </button>

                  {/* -----------single download pop up screen --------------------*/}
                  {dropdownSingleDownloadPopUp && (
                    <div className="absolute bottom-[102%] md:bottom-[101%] right-[13%] md:right-[15px] bg-gray-100 shadow-xl rounded-md w-[93px] md:w-[100px] border border-gray-400 z-[999]">
                      <div
                        className="flex items-center gap-2 px-4 py-[6px] hover:bg-[#4AD991] border-b border-b-gray-400 hover:text-black cursor-pointer"
                        onClick={() => SingleImageDownloadFunc("JPG")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_1071_2097)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M15.75 5.0625V15.75C15.75 16.3467 15.5129 16.919 15.091 17.341C14.669 17.7629 14.0967 18 13.5 18H12.375V16.875H13.5C13.7984 16.875 14.0845 16.7565 14.2955 16.5455C14.5065 16.3345 14.625 16.0484 14.625 15.75V5.0625H12.375C11.9274 5.0625 11.4982 4.88471 11.1818 4.56824C10.8653 4.25178 10.6875 3.82255 10.6875 3.375V1.125H4.5C4.20163 1.125 3.91548 1.24353 3.7045 1.4545C3.49353 1.66548 3.375 1.95163 3.375 2.25V12.375H2.25V2.25C2.25 1.65326 2.48705 1.08097 2.90901 0.65901C3.33097 0.237053 3.90326 0 4.5 0L10.6875 0L15.75 5.0625ZM10.8675 14.211C10.953 14.3835 11.0055 14.568 11.025 14.7645H10.152C10.1316 14.6657 10.0947 14.571 10.0429 14.4844C9.99275 14.402 9.92792 14.3296 9.85162 14.2706C9.77273 14.2066 9.68219 14.1585 9.585 14.1289C9.47603 14.0954 9.36261 14.0787 9.24862 14.0794C8.92762 14.0794 8.67825 14.1926 8.5005 14.4191C8.325 14.6449 8.23725 14.9636 8.23725 15.3754V15.9356C8.23725 16.1989 8.27363 16.4295 8.34638 16.6275C8.41291 16.8123 8.53173 16.9737 8.68838 17.0921C8.8607 17.2073 9.06514 17.2648 9.27225 17.2564C9.44975 17.2615 9.62593 17.2244 9.78638 17.1484C9.91484 17.0809 10.0211 16.9778 10.0924 16.8514C10.1599 16.7284 10.194 16.5923 10.1948 16.443V16.1561H9.27V15.4924H11.043V16.3901C11.043 16.6076 11.0066 16.8139 10.9339 17.0089C10.8615 17.2019 10.7492 17.3775 10.6042 17.5241C10.4455 17.6794 10.2557 17.7994 10.0474 17.8763C9.82537 17.9595 9.564 18.0011 9.26325 18.0011C8.97395 18.0066 8.68632 17.9561 8.41612 17.8526C8.18661 17.7587 7.98154 17.6136 7.8165 17.4285C7.6523 17.2385 7.52967 17.0162 7.4565 16.776C7.37507 16.5042 7.33525 16.2216 7.33837 15.9379V15.3686C7.33837 14.9614 7.41338 14.6051 7.56338 14.2999C7.71413 13.9954 7.93237 13.758 8.21812 13.5878C8.50612 13.4168 8.85337 13.3313 9.25987 13.3313C9.52762 13.3313 9.76612 13.3687 9.97537 13.4437C10.1854 13.5187 10.3654 13.6219 10.5154 13.7531C10.6654 13.8844 10.7831 14.037 10.8686 14.211H10.8675ZM0 16.6343C0 16.8188 0.03075 16.9931 0.09225 17.1574C0.1545 17.3224 0.245625 17.4686 0.365625 17.5961C0.489375 17.7236 0.642 17.8237 0.8235 17.8965C1.008 17.9662 1.22138 18.0011 1.46362 18.0011C1.93612 18.0011 2.30513 17.8718 2.57063 17.613C2.83838 17.3535 2.97262 16.9766 2.97337 16.4824V13.4167H2.0835V16.5049C2.0835 16.7321 2.03175 16.9069 1.92825 17.0291C1.82475 17.1514 1.6665 17.2129 1.4535 17.2136C1.35124 17.2183 1.24964 17.1951 1.15963 17.1463C1.06963 17.0975 0.994644 17.0251 0.94275 16.9369C0.891829 16.8435 0.863689 16.7394 0.860625 16.6331H0V16.6343ZM5.535 13.4167H3.73725V17.9167H4.62712V16.4059H5.5305C5.853 16.4059 6.1275 16.3414 6.354 16.2124C6.58275 16.0796 6.75638 15.9015 6.87488 15.678C6.99638 15.4515 7.05675 15.1976 7.056 14.9164C7.056 14.6359 6.99675 14.382 6.87825 14.1547C6.75954 13.9308 6.5802 13.7449 6.36075 13.6181C6.13575 13.4831 5.86125 13.416 5.53725 13.4167H5.535ZM6.14925 14.9164C6.15326 15.065 6.1204 15.2122 6.05363 15.345C5.99373 15.46 5.90037 15.5541 5.78588 15.615C5.65482 15.6795 5.51003 15.7112 5.364 15.7072H4.62375V14.1255H5.36625C5.6115 14.1255 5.8035 14.1937 5.94225 14.3302C6.081 14.466 6.14925 14.6614 6.14925 14.9164Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1071_2097">
                              <rect width="18" height="18" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <span className="text-[12px] md:text-[14px] font-medium text-black">
                          JPG
                        </span>
                      </div>
                      <div
                        className="flex items-center gap-2 px-4 py-[6px] hover:bg-[#4AD991] border-b border-b-gray-400 hover:text-black cursor-pointer"
                        onClick={() => SingleImageDownloadFunc("PNG")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_1071_2102)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M15.75 5.0625V15.75C15.75 16.3467 15.5129 16.919 15.091 17.341C14.669 17.7629 14.0967 18 13.5 18V16.875C13.7984 16.875 14.0845 16.7565 14.2955 16.5455C14.5065 16.3345 14.625 16.0484 14.625 15.75V5.0625H12.375C11.9274 5.0625 11.4982 4.88471 11.1818 4.56824C10.8653 4.25178 10.6875 3.82255 10.6875 3.375V1.125H4.5C4.20163 1.125 3.91548 1.24353 3.7045 1.4545C3.49353 1.66548 3.375 1.95163 3.375 2.25V12.375H2.25V2.25C2.25 1.65326 2.48705 1.08097 2.90901 0.65901C3.33097 0.237053 3.90326 0 4.5 0L10.6875 0L15.75 5.0625ZM11.52 14.211C11.6055 14.3835 11.658 14.568 11.6775 14.7645H10.8045C10.7841 14.6657 10.7472 14.571 10.6954 14.4844C10.6452 14.402 10.5804 14.3296 10.5041 14.2706C10.4252 14.2066 10.3347 14.1585 10.2375 14.1289C10.1285 14.0954 10.0151 14.0787 9.90112 14.0794C9.58087 14.0794 9.3315 14.1926 9.153 14.4191C8.9775 14.6449 8.88975 14.9636 8.88975 15.3754V15.9356C8.88975 16.1989 8.92613 16.4295 8.99888 16.6275C9.06541 16.8123 9.18423 16.9737 9.34088 17.0921C9.5132 17.2073 9.71764 17.2648 9.92475 17.2564C10.1022 17.2615 10.2784 17.2244 10.4389 17.1484C10.5673 17.0809 10.6736 16.9778 10.7449 16.8514C10.8124 16.7284 10.8465 16.5923 10.8473 16.443V16.1561H9.9225V15.4924H11.6955V16.3901C11.6955 16.6076 11.6591 16.8139 11.5864 17.0089C11.514 17.2019 11.4017 17.3775 11.2567 17.5241C11.098 17.6794 10.9082 17.7994 10.6999 17.8763C10.4779 17.9595 10.2165 18.0011 9.91575 18.0011C9.62645 18.0066 9.33882 17.9561 9.06862 17.8526C8.83911 17.7587 8.63404 17.6136 8.469 17.4285C8.3048 17.2385 8.18217 17.0162 8.109 16.776C8.02757 16.5042 7.98775 16.2216 7.99088 15.9379V15.3686C7.99088 14.9614 8.06587 14.6051 8.21587 14.2999C8.36662 13.9954 8.58488 13.758 8.87063 13.5878C9.15863 13.4168 9.50587 13.3313 9.91237 13.3313C10.1801 13.3313 10.4186 13.3687 10.6279 13.4437C10.8386 13.5187 11.0186 13.6219 11.1679 13.7531C11.3179 13.8851 11.4356 14.0377 11.5211 14.211H11.52ZM1.8 13.4167H0V17.9167H0.889875V16.4059H1.79325C2.11575 16.4059 2.39025 16.3414 2.61675 16.2124C2.8455 16.0796 3.01913 15.9015 3.13763 15.678C3.26114 15.4434 3.32344 15.1814 3.31875 14.9164C3.31875 14.6359 3.2595 14.382 3.141 14.1547C3.02229 13.9308 2.84295 13.7449 2.6235 13.6181C2.3985 13.4831 2.124 13.416 1.8 13.4167ZM2.41312 14.9164C2.41713 15.065 2.38428 15.2122 2.3175 15.345C2.2576 15.46 2.16425 15.5541 2.04975 15.615C1.9187 15.6795 1.7739 15.7112 1.62788 15.7072H0.8865V14.1255H1.629C1.87425 14.1255 2.06625 14.1937 2.205 14.3302C2.34375 14.466 2.41312 14.6614 2.41312 14.9164ZM4.62263 17.9156V14.9062H4.65862L6.63975 17.9156H7.37775V13.4167H6.534V16.4093H6.498L4.527 13.4167H3.78225V17.9167L4.62263 17.9156Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1071_2102">
                              <rect width="18" height="18" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <span className="text-[12px] md:text-[14px] font-medium text-black">
                          PNG
                        </span>
                      </div>
                      <div
                        className="flex items-center gap-2 px-4 py-[6px] hover:bg-[#4AD991] hover:text-black cursor-pointer "
                        onClick={() => SingleImageDownloadFunc("PSD")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_1071_2107)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M15.75 5.0625V15.75C15.75 16.3467 15.5129 16.919 15.091 17.341C14.669 17.7629 14.0967 18 13.5 18H12.9375V16.875H13.5C13.7984 16.875 14.0845 16.7565 14.2955 16.5455C14.5065 16.3345 14.625 16.0484 14.625 15.75V5.0625H12.375C11.9274 5.0625 11.4982 4.88471 11.1818 4.56824C10.8653 4.25178 10.6875 3.82255 10.6875 3.375V1.125H4.5C4.20163 1.125 3.91548 1.24353 3.7045 1.4545C3.49353 1.66548 3.375 1.95163 3.375 2.25V12.375H2.25V2.25C2.25 1.65326 2.48705 1.08097 2.90901 0.65901C3.33097 0.237053 3.90326 0 4.5 0L10.6875 0L15.75 5.0625ZM3.5055 16.6961C3.51194 16.8734 3.5554 17.0473 3.6331 17.2068C3.71079 17.3663 3.821 17.5077 3.95662 17.622C4.10212 17.7435 4.28137 17.838 4.49437 17.9055C4.70737 17.9738 4.95675 18.0079 5.2425 18.0079C5.62275 18.0079 5.9445 17.9486 6.20775 17.8301C6.474 17.7116 6.6765 17.5466 6.81525 17.3351C6.95712 17.1155 7.03036 16.8586 7.02562 16.5971C7.02562 16.3451 6.975 16.1351 6.87375 15.9671C6.77082 15.7985 6.62532 15.66 6.45188 15.5655C6.25315 15.4551 6.03884 15.3754 5.81625 15.3293L5.11762 15.1673C4.95289 15.136 4.79722 15.0684 4.662 14.9692C4.61088 14.9295 4.56972 14.8785 4.54179 14.8201C4.51387 14.7617 4.49994 14.6976 4.50112 14.6329C4.50112 14.4574 4.57012 14.3134 4.70812 14.2009C4.84912 14.0869 5.0415 14.0299 5.28525 14.0299C5.44575 14.0299 5.5845 14.0554 5.7015 14.1064C5.80936 14.1494 5.9043 14.2195 5.97713 14.31C6.04636 14.3935 6.09287 14.4935 6.11213 14.6002H6.95588C6.94169 14.3714 6.86418 14.1509 6.732 13.9635C6.59024 13.7612 6.39567 13.6016 6.1695 13.5022C5.89339 13.3806 5.59359 13.3222 5.292 13.3313C4.962 13.3313 4.671 13.3875 4.419 13.5C4.16625 13.6117 3.96825 13.7696 3.825 13.9736C3.6825 14.1784 3.61125 14.418 3.61125 14.6925C3.61125 14.919 3.65737 15.1155 3.74962 15.282C3.84187 15.4485 3.9735 15.5861 4.1445 15.6949C4.31625 15.8021 4.51875 15.882 4.752 15.9345L5.44725 16.0965C5.67975 16.1512 5.853 16.2236 5.967 16.3136C6.02305 16.3564 6.06796 16.4121 6.09793 16.4759C6.12789 16.5398 6.14202 16.6099 6.13912 16.6804C6.14166 16.7964 6.10826 16.9103 6.0435 17.0066C5.97101 17.1053 5.87132 17.1808 5.75663 17.2238C5.63138 17.2763 5.4765 17.3025 5.292 17.3025C5.16 17.3025 5.04 17.2875 4.932 17.2575C4.83227 17.2307 4.73789 17.1869 4.653 17.1281C4.5782 17.0795 4.51414 17.0162 4.4648 16.9418C4.41546 16.8675 4.38188 16.7839 4.36613 16.6961H3.5055ZM1.8 13.4235H0V17.9235H0.889875V16.4126H1.79325C2.11575 16.4126 2.39025 16.3478 2.61675 16.218C2.8455 16.0868 3.01913 15.909 3.13763 15.6848C3.26114 15.4502 3.32344 15.1882 3.31875 14.9231C3.31875 14.6419 3.2595 14.388 3.141 14.1615C3.02229 13.9376 2.84295 13.7516 2.6235 13.6249C2.3985 13.4899 2.124 13.4228 1.8 13.4235ZM2.41312 14.9231C2.41695 15.0713 2.3841 15.2182 2.3175 15.3506C2.25778 15.466 2.16441 15.5606 2.04975 15.6217C1.9187 15.6863 1.7739 15.7179 1.62788 15.714H0.8865V14.1323H1.629C1.87425 14.1323 2.06625 14.2005 2.205 14.337C2.34375 14.4728 2.41312 14.6681 2.41312 14.9231ZM7.59825 17.9224V13.4235H9.23963C9.69638 13.4235 10.0729 13.5113 10.3691 13.6868C10.6661 13.863 10.8874 14.118 11.0329 14.4517C11.1791 14.7855 11.2522 15.1886 11.2522 15.6611C11.2522 16.1366 11.1787 16.5431 11.0317 16.8806C10.8847 17.2181 10.662 17.4765 10.3635 17.6558C10.0665 17.8335 9.6915 17.9224 9.2385 17.9224H7.59825ZM9.12038 14.1491H8.48813V17.1945H9.12038C9.32963 17.1945 9.51075 17.1637 9.66375 17.1022C9.81193 17.0428 9.94162 16.9449 10.0395 16.8187C10.1464 16.6781 10.222 16.5163 10.2611 16.344C10.3114 16.155 10.3365 15.933 10.3365 15.678C10.3447 15.39 10.3 15.1029 10.2049 14.8309C10.1313 14.6215 9.99101 14.442 9.8055 14.3201C9.6285 14.2061 9.40013 14.1491 9.12038 14.1491Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1071_2107">
                              <rect width="18" height="18" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <span className="text-[12px] md:text-[14px] font-medium text-black">
                          PSD
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* )} */}

          {/* Overlay */}
          {isPanelOpen && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
              onClick={closePanel}
            ></div>
          )}
        </div>
      </div>
      <div id="frame-container"></div>
    </div>
  );
};

export default MyOrder;
