import React, { useContext, useEffect, useState } from "react";

import { apiUrlContextManager, userContextManager } from "../../App";
import { GrDownload } from "react-icons/gr";
import { ImFolderUpload } from "react-icons/im";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { IoCloseCircleSharp } from "react-icons/io5";
import Navbar from "../Navbar/Navbar";
import ReactCompareImage from 'react-compare-image';  // Import ReactCompareImage
import { IoCloseCircle } from "react-icons/io5";

const OrderDetailsListView = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
  const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageForPopup, setSelectedImageForPopup] = useState(""); 
  const [isLoadingCircle, setIsLoadingCircle] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [totalFiles, setTotalFiles] = useState(0);
  const [filesProcessed, setFilesProcessed] = useState(0);
  const [successCount, setSuccessCount] = useState(0);

  const handleImageSelect = (imageId) => {
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.includes(imageId)
        ? prevSelectedImages.filter((id) => id !== imageId)
        : [...prevSelectedImages, imageId]
    );
  };

  const handleSelectAll = () => {
    const allImageIds = getAllImageIds();
    if (selectedImages.length === allImageIds.length) {
      setSelectedImages([]); // Deselect all if all are selected
    } else {
      setSelectedImages(allImageIds); // Select all
    }
  };

  const getAllImageIds = () => {
    return orderDetails.map((imgData) => imgData.id);
  };

  const reworkDataFunc = (reworkfileInfo) => {
    setTotalFiles(reworkfileInfo.length);
    setIsLoadingCircle(true);
    
    for (const file of reworkfileInfo) {
      let data = new FormData();
      data.append("file", file);

      const newPath = file.webkitRelativePath; // Get the relative path for the file
      reworkUploadFunc(data, orderId, newPath);
    }
  };

  const reworkUploadFunc = async (fileData, orderId, filePath) => {
    try {
      const response = await fetch(
        `${getApiBasicUrl}/api/2023-02/file-upload?order_image_master_id=${orderId}&filePath=${filePath}`,
        {
          method: "POST",
          headers: {
            Authorization: "bearer " + getToken,
          },
          body: fileData,
        }
      );

      const data = await response.json();
      setFilesProcessed((prev) => prev + 1);

      if (data.status_code === 200) {
        setUploadStatus('success');
        setSuccessCount((prev) => prev + 1);
      } else {
        console.error("Upload failed:", data.message || "Unknown error");
        setUploadStatus('failure');
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setUploadStatus('failure');
    }
  };

  const reworkCompleteMailFunc = () => {
    fetch(`${getApiBasicUrl}/api/2023-02/email-send?order_image_master_id=${orderId}`, {
      headers: {
        Authorization: "bearer " + getToken,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(res => res.json())
      .then(data => {
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const updateOrderStatusFunc = () => {
    const getOrderId = {
      id: orderId,
      status_id: 30,
    };

    fetch(getApiBasicUrl + "/api/2023-02/update-order-master-info-by-id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + getToken,
      },
      body: JSON.stringify(getOrderId),
    })
      .then((res) => res.json())
      .then((data) => {
      });
  };

  useEffect(() => {
    if (totalFiles === filesProcessed && filesProcessed > 0) {
      setIsLoadingCircle(false);
      if (filesProcessed === successCount) {
        alert("Upload successful");
        updateOrderStatusFunc();
        reworkCompleteMailFunc();
      } else {
        alert("Some uploads failed");
      }
    }
  }, [filesProcessed, successCount, totalFiles]);

  const OrderDetailsListFunc = () => {
    setIsLoading(true);

    const apiUrl = `${getApiBasicUrl}/api/2023-02/order-detail-info-by-order-master-id?order_image_master_id=${orderId}`;

    fetch(apiUrl, {
      headers: {
        Authorization: "bearer " + getToken,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch order details: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.results && data.results.order_detail_image_list) {
          setOrderDetails(data.results.order_detail_image_list);
        } else {
          setOrderDetails([]);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch order details:", error);
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (orderId && getApiBasicUrl && getToken) {
      OrderDetailsListFunc();
    }
  }, [orderId, getApiBasicUrl, getToken]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <div className="loader-order"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[100vh] text-red-600">
        {error}
      </div>
    );
  }

  const downloadFunc = () => {
    if (selectedImages.length > 0) {
      zipDownloadWithCheckFunc();
    } else {
      alert("Please select at least one image");
    }
  };

  const zipDownloadWithCheckFunc = () => {
    const downloadUrl = `${getApiBasicUrl}/api/2023-02/selected-file-rework-zip-download?order_image_master_id=${orderId}&order_image_detail_ids=${selectedImages.join(",,")}`;
    window.open(downloadUrl, "_blank");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-5">
        <div className="bg-white">
          <div className="relative">
            <div className="container mx-auto pt-2 relative">
              <h2 className="text-2xl text-center mb-8 text-green-900 font-bold">
                REWORK ORDER DETAILS
              </h2>

              <div className="flex flex-col justify-items-center gap-5">
                <div className="flex justify-start items-center gap-3">
                  <button
                    onClick={handleSelectAll}
                    className="bg-gray-50 text-black px-4 py-2 rounded-md border border-gray-300"
                  >
                    {selectedImages.length === getAllImageIds().length ? (
                      <div className="flex items-center gap-1">
                        <IoCloseCircleSharp className="text-xl text-red-600" />
                        <p>Deselect All</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <IoCheckmarkCircleSharp className="text-xl text-green-600" />
                        <p>Select All</p>
                      </div>
                    )}
                  </button>
                  <p className="bg-gray-50 text-black px-4 py-2 rounded-md border border-gray-300">
                    {selectedImages.length} image(s) selected
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 justify-items-center gap-y-4">
                  {orderDetails.map((data) => (
                    <div key={data.id} className="relative">
                      <label>
                        <input
                          className="absolute top-2 right-2 h-[20px] w-[20px]"
                          type="checkbox"
                          checked={selectedImages.includes(data.id)}
                          onChange={() => handleImageSelect(data.id)}
                        />
                      </label>
                      <img
                        className="h-40 w-40 rounded-md cursor-pointer"
                        src={data.compressed_raw_image_public_url}
                        alt={`Image for ${data.image_name}`}
                        onClick={() => setSelectedImageForPopup(data)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute top-0 right-0 md:top-4 md:right-4 rounded-md">
                <div className="flex justify-center items-center gap-5">
                  <div className="bg-gray-200 px-6 py-2 rounded-lg">
                    <button onClick={downloadFunc}>
                      <GrDownload className="text-3xl" />
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

              {isLoadingCircle && (
                <div className="absolute top-[50%] left-[50%]">
                  <div className="loader-admin"></div>
                </div>
              )}

              {selectedImageForPopup && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-4 w-[500px] max-h-[80vh] overflow-hidden flex flex-col justify-center rounded-lg relative">
                  {/* Image Comparison Component */}
                  <div className="h-full  flex flex-col justify-center">
                    <ReactCompareImage
                      // Make ReactCompareImage take full width and height
                      leftImage={selectedImageForPopup.compressed_raw_image_public_url} // Original image
                      rightImage={selectedImageForPopup.default_compressed_output_public_url} // Processed image
                    />
                  </div>
                  <button
                    onClick={() => setSelectedImageForPopup(null)}
                    className="absolute top-2 right-2  text-red-500"
                  >
                    <IoCloseCircle className="text-2xl"/>
                  </button>
                </div>
              </div>
              
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsListView;
