import React, { useContext, useEffect, useState } from "react";

import {
  apiUrlContextManager,
  OrderContextManager,
  userContextManager,
} from "../../App";
import Navbar from "../Navbar/Navbar";
import { GrDownload } from "react-icons/gr";
import { ImFolderUpload } from "react-icons/im";
import { IoCheckmarkCircleSharp, IoCloseCircleSharp } from "react-icons/io5";

const AdminOrderDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);
  const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] =
    useContext(apiUrlContextManager);
  const [getUserInfo, setUserInfo, getToken, setToken] =
    useContext(userContextManager);
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

  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoadingCircle, setIsLoadingCircle] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [totalFiles, setTotalFiles] = useState(0);
  const [filesProcessed, setFilesProcessed] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [modalImage, setModalImage] = useState(null); // State for modal image

  useEffect(() => {
    const storedOrderData = localStorage.getItem("selectedOrderData");
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData));
      // localStorage.removeItem("selectedOrderData");
    } else {
      console.error("No order data found in localStorage");
    }
  }, []);

  const handleImageSelect = (imageId) => {
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.includes(imageId)
        ? prevSelectedImages.filter((id) => id !== imageId)
        : [...prevSelectedImages, imageId]
    );
  };

  const handleSelectAll = () => {
    if (selectedImages.length === getAllImageIds().length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(getAllImageIds());
    }
  };

  const getAllImageIds = () => {
    return orderData?.orderImageDetails?.flat().map((imgData) => imgData.id);
  };

  const downloadFunc = () => {
    if (selectedImages.length > 0) {
      zipDownloadWithCheckFunc();
    } else {
      alert("Please select at least one image");
    }
  };

  const zipDownloadWithCheckFunc = () => {
    const downloadUrl = `${getApiBasicUrl}/api/2023-02/selected-file-rework-zip-download?order_image_master_id=${orderData.id}&order_image_detail_ids=${selectedImages.join(
      ","
    )}`;
    window.open(downloadUrl, "_blank");
  };

  const reworkDataFunc = (reworkfileInfo) => {
    setTotalFiles(reworkfileInfo.length);
    setIsLoadingCircle(true);
    for (const file of reworkfileInfo) {
      let data = new FormData();
      data.append("file", file);
      const newPath = file.webkitRelativePath;
      reworkUploadFunc(data, orderData.id, newPath);
    }
  };

  const reworkUploadFunc = async (fileData, orderId, filePath) => {
    try {
      const response = await fetch(
        `${getApiBasicUrl}/api/2023-02/file-upload?order_image_master_id=${orderId}&filePath=${filePath}`,
        {
          method: "POST",
          headers: {
            Authorization: `bearer ${getToken}`,
          },
          body: fileData,
        }
      );

      const data = await response.json();
      setFilesProcessed((prevCount) => prevCount + 1);
      if (data.status_code === 200) {
        setUploadStatus("success");
        setSuccessCount((prevCount) => prevCount + 1);
      } else {
        console.error("Upload failed:", data.message || "Unknown error");
        setUploadStatus("failure");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("failure");
    }
  };

  useEffect(() => {
    if (totalFiles > 0 && filesProcessed === totalFiles) {
      setIsLoadingCircle(false);
      if (filesProcessed === successCount) {
        alert("Upload successful");
        updateOrderStatusFunc();
        reworkCompleteMailFunc();
      } else {
        alert("Some files failed to upload");
      }
    }
  }, [filesProcessed, totalFiles, successCount]);

  const reworkCompleteMailFunc = () => {
    fetch(
      `${getApiBasicUrl}/api/2023-02/email-send?order_image_master_id=${orderData.id}`,
      {
        headers: {
          Authorization: `bearer ${getToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {})
      .catch((error) => console.error("Error sending email:", error));
  };

  const updateOrderStatusFunc = () => {
    const orderId = {
      id: orderData.id,
      status_id: 30,
    };

    fetch(getApiBasicUrl + "/api/2023-02/update-order-master-info-by-id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + getToken,
      },
      body: JSON.stringify(orderId),
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl); // Set the image to show in the modal
  };

  const closeModal = () => {
    setModalImage(null); // Close the modal
  };

  return (
    <>
      <div className="bg-white">
        <Navbar />
        <div className="relative">
          <div className="container mx-auto pt-2 relative">
            <h2 className="text-2xl text-center mb-8 text-green-900 font-bold">
              <i className="fa-solid mr-2 fa-basket-shopping"></i>REWORK ORDER
              DETAILS
            </h2>

            <div className="flex flex-col justify-items-center gap-5">
              <div className="flex justify-start items-center gap-3">
                <button
                  onClick={handleSelectAll}
                  className="bg-gray-50 text-black px-4 py-2 rounded-md border border-gray-300"
                >
                  {selectedImages?.length === getAllImageIds()?.length ? (
                    <div className="flex items-center gap-1">
                      <IoCloseCircleSharp className="text-xl text-red-600" />{" "}
                      <p>Deselect All</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <IoCheckmarkCircleSharp className="text-xl text-green-600" />{" "}
                      <p>Select All</p>
                    </div>
                  )}
                </button>

                <p className="bg-gray-50 text-black px-4 py-2 rounded-md border border-gray-300">
                  {selectedImages.length} image(s) selected
                </p>
              </div>
              {orderData?.orderImageDetails?.map((imageData, batchIndex) => (
                <div key={batchIndex}>
                  <div>
                    <p className="w-[100px] bg-red-100 text-center mb-4">
                      Batch No: {batchIndex + 1}
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 justify-items-center gap-y-4">
                    {imageData.map((imgData, imgIndex) => (
                      <div key={imgIndex} className="relative">
                        <label>
                          <input
                            className="absolute top-2 right-2"
                            type="checkbox"
                            checked={selectedImages.includes(imgData.id)}
                            onChange={() => handleImageSelect(imgData.id)}
                          />
                          </label>
                          <img
                            className="h-40 w-40 rounded-md cursor-pointer"
                            src={imgData.compressed_raw_image_public_url}
                            alt={`Image ${imgIndex + 1}`}
                            onClick={() =>
                              handleImageClick(
                                imgData.compressed_raw_image_public_url
                              )
                            }
                          />
                       
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute top-0 right-0 md:top-4 md:right-4 rounded-md">
              <div className="flex justify-center items-center gap-5">
                <div className="bg-gray-200 px-6 py-2 rounded-lg">
                  <button onClick={downloadFunc} className="">
                    <GrDownload className="text-3xl " />
                  </button>
                </div>

                <div className="bg-gray-200 px-6 py-3 rounded-lg">
                  <label className="cursor-pointer" htmlFor="fileUpload">
                    <input
                      type="file"
                      webkitdirectory="true"
                      directory="true"
                      multiple
                      onChange={(e) => reworkDataFunc(e.target.files)}
                      className="hidden"
                      id="fileUpload"
                    />
                    <ImFolderUpload className="text-3xl" />
                  </label>
                </div>
              </div>
            </div>
          </div>
          {isLoadingCircle && (
            <div className="absolute top-[50%] left-[50%] ">
              <div className="loader-admin"></div>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <img
              className="w-40 h-40 rounded-lg"
              src={modalImage}
              alt="Enlarged"
            />
            <button
              className="absolute top-2 right-2 text-white bg-red-600 p-2 rounded-full"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOrderDetails;
