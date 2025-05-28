import React, { useContext, useEffect, useState } from "react";
import {
  FileContextManager,
  OrderContextManager,
  apiUrlContextManager,
  userContextManager,
} from "../../App";
import { FaEye, FaListUl, FaTh } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import { convertDate } from "../ComonFunc/ComonFunc";

const AdminDashboardOrderList = () => {
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

  const [orderDetailsInfo, setOrderDetailsInfo] = useState([]);
  const [orderDetailsInfoList, setOrderDetailsInfoList] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]); // State for filtered orders in details view
  const [filteredOrdersListView, setFilteredOrdersListView] = useState([]); // State for filtered orders in list view
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [searchQuery, setSearchQuery] = useState(""); // State for search query in details view
  const [searchQueryListView, setSearchQueryListView] = useState(""); // State for search query in list view
  const [currentPage, setCurrentPage] = useState(1); // State for current page in details view
  const [currentPageListView, setCurrentPageListView] = useState(1); // State for current page in list view
  const itemsPerPage = 8; // Items per page
  const itemsPerPageList = 12; // Items per page
  const [viewMode, setViewMode] = useState("list"); // State for view mode ('details' or 'list')

  const handleRowClick = (orderId) => {
    window.open(`/order-details-list/${orderId}`, "_blank"); // Open the new page in a new tab
  };

  const handleOrderClick = (data) => {
    const orderId = data.id;

    // Store the selected order data in localStorage
    localStorage.setItem("selectedOrderData", JSON.stringify(data));

    // Open the new tab with the orderId in the URL
    // window.open(`/admin-order-details/${orderId}`, "_blank");
    window.open(`/order-details-list/${orderId}`, "_blank");
  };

  const OrderDetailFunc = () => {
    setIsLoading(true); // Start loading
    fetch(getApiBasicUrl + "/api/2023-02/user-rework-order-master-info", {
      headers: {
        Authorization: "bearer " + getToken,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.results && data.results.user_order_master_info_list) {
          setOrderDetailsInfo(data.results.user_order_master_info_list);
          setFilteredOrders(data.results.user_order_master_info_list); // Initialize filtered orders
        } else {
          setOrderDetailsInfo([]);
          setFilteredOrders([]);
        }
      })
      .catch((error) => console.error("Failed to fetch order details:", error))
      .finally(() => setIsLoading(false)); // End loading
  };

  useEffect(() => {
    if (getUserInfo && getUserInfo.status_code === 200) {
      OrderDetailFunc();
    }
  }, [getUserInfo]);

  const OrderDetailListFunc = () => {
    setIsLoading(true); // Start loading
    fetch(getApiBasicUrl + "/api/2023-02/user-rework-order-master-info-list", {
      headers: {
        Authorization: "bearer " + getToken,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.results && data.results.user_order_master_info_list) {
          setOrderDetailsInfoList(data.results.user_order_master_info_list);
          setFilteredOrdersListView(
            data.results.user_order_master_info_list
          ); // Initialize filtered orders for list view
        } else {
          setOrderDetailsInfoList([]);
          setFilteredOrdersListView([]);
        }
      })
      .catch((error) => console.error("Failed to fetch order details:", error))
      .finally(() => setIsLoading(false)); // End loading
  };

  useEffect(() => {
    if (getUserInfo && getUserInfo.status_code === 200) {
      OrderDetailListFunc();
    }
  }, [getUserInfo]);

  // Filter orders for details view based on exact match with trimmed search query
  useEffect(() => {
    const trimmedQuery = searchQuery.trim(); // Trim the search query
    if (trimmedQuery === "") {
      setFilteredOrders(orderDetailsInfo); // If search query is empty, show all orders
    } else {
      const filtered = orderDetailsInfo.filter(
        (order) =>
          order &&
          order.custom_code &&
          order.custom_code.toLowerCase() === trimmedQuery.toLowerCase()
      );
      setFilteredOrders(filtered);
    }
    setCurrentPage(1); // Reset to the first page when search query changes
  }, [searchQuery, orderDetailsInfo]);

  // Filter orders for list view based on exact match with trimmed search query
  useEffect(() => {
    const trimmedQuery = searchQueryListView.trim(); // Trim the search query
    if (trimmedQuery === "") {
      setFilteredOrdersListView(orderDetailsInfoList); // If search query is empty, show all orders
    } else {
      const filtered = orderDetailsInfoList.filter(
        (order) =>
          order &&
          order.custom_code &&
          order.custom_code.toLowerCase() === trimmedQuery.toLowerCase()
      );
      setFilteredOrdersListView(filtered);
    }
    setCurrentPageListView(1); // Reset to the first page when search query changes
  }, [searchQueryListView, orderDetailsInfoList]);

  // Pagination logic for details view
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = Array.isArray(filteredOrders)
    ? filteredOrders.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = Array.isArray(filteredOrders)
    ? Math.ceil(filteredOrders.length / itemsPerPage)
    : 0;

  // Pagination logic for list view
  const indexOfLastItemListView = currentPageListView * itemsPerPageList;
  const indexOfFirstItemListView = indexOfLastItemListView - itemsPerPageList;
  const currentOrdersListView = Array.isArray(filteredOrdersListView)
    ? filteredOrdersListView.slice(
        indexOfFirstItemListView,
        indexOfLastItemListView
      )
    : [];
  const totalPagesListView = Array.isArray(filteredOrdersListView)
    ? Math.ceil(filteredOrdersListView.length / itemsPerPageList)
    : 0;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pageNumbers.push(i);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      pageNumbers.push("...");
    }
  }

  const pageNumbersListView = [];
  for (let i = 1; i <= totalPagesListView; i++) {
    if (
      i === 1 ||
      i === totalPagesListView ||
      (i >= currentPageListView - 1 && i <= currentPageListView + 1)
    ) {
      pageNumbersListView.push(i);
    } else if (
      i === currentPageListView - 2 ||
      i === currentPageListView + 2
    ) {
      pageNumbersListView.push("...");
    }
  }

  // Handle page change for details view
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber !== "...") {
      setCurrentPage(pageNumber);
    }
  };

  // Handle page change for list view
  const handleNextPageListView = () => {
    if (currentPageListView < totalPagesListView) {
      setCurrentPageListView((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPageListView = () => {
    if (currentPageListView > 1) {
      setCurrentPageListView((prevPage) => prevPage - 1);
    }
  };

  const handlePageClickListView = (pageNumber) => {
    if (pageNumber !== "...") {
      setCurrentPageListView(pageNumber);
    }
  };

  // Function to toggle view mode
  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <div className="loader-order"></div>
      </div>
    ); // Show loading indicator while data is being fetched
  }

  return (
    <div className="">
      <Navbar />

      <div className="container mx-auto pb-10 relative">
        <div className="flex justify-between items-center mb-5">
          <h2></h2>
          <div className="flex justify-center items-center gap-2 mt-2">
            <div className="flex justify-center items-center">
              <img src="/images/images/BG-AI.png" alt="Logo" className="w-8" />
            </div>
          <h2 className="text-2xl text-center  font-bold">
            Rework Order Information
          </h2>
          </div>

          {/* Toggle View Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => toggleViewMode("list")}
              className={`p-2 rounded ${
                viewMode === "list" ? "bg-gray-300" : "bg-white"
              }`}
            >
              <FaListUl />
            </button>
            <button
              onClick={() => toggleViewMode("details")}
              className={`p-2 rounded ${
                viewMode === "details" ? "bg-gray-300" : "bg-white"
              }`}
            >
              <FaTh />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="absolute right-[100px] top-2">
          {viewMode === "details" ? (
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID"
              className="border p-1 text-sm rounded-md w-[300px] shadow-md bg-gradient-to-r from-orange-50 to-orange-200  outline-none"
            />
          ) : (
            <input
              type="text"
              value={searchQueryListView}
              onChange={(e) => setSearchQueryListView(e.target.value)}
              placeholder="Search by Order ID"
              className="border p-1 text-sm shadow-md rounded-md w-[300px] bg-gradient-to-r from-orange-50 to-orange-200  outline-none"
            />
          )}
        </div>

        {/* Conditional Rendering Based on View Mode */}
        {viewMode === "details" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-y-2 mx-6">
            {currentOrders.length > 0 ? (
              currentOrders.map((data, index) => (
                <div
                  key={index}
                  className="w-72 mt-6 m-auto lg:mt-2 max-w-sm relative"
                >
                  <div className="bg-white shadow-2xl rounded-xl p-4 flex flex-col h-full">
                    <div className="flex flex-col justify-items-start items-start ">
                      <p className="text-[16px] font-semibold">
                        {data.status_id === 1 ? "In Progress" : "Completed"}
                      </p>
                      <p className="text-[12px]">
                        Order ID : {data.custom_code}
                      </p>
                      <p className="text-[12px]">
                        No of Images : {data.no_of_images}
                      </p>
                      <p className="text-[12px]">
                        Order Date : {convertDate(data.order_time)}
                      </p>
                      <p className="text-[12px]">
                        Order Upload From :{" "}
                        {data.file_upload_from === 1 ? "PC" : "Store"}
                      </p>
                    </div>

                    <p className="bg-green-900 h-6 w-6 text-xs flex justify-center items-center rounded-full text-white text-center absolute top-2 right-2">
                      {data.order_squence}
                    </p>

                    <div className="flex justify-center items-center gap-1 mb-7">
                      {data.orderImageDetails &&
                        data.orderImageDetails.map((imageData, index) => (
                          <div
                            key={index}
                            className="flex justify-center items-center gap-2 mt-1"
                          >
                            {imageData.slice(0, 1).map((imgData, index) => (
                              <div key={index}>
                                <img
                                  className="h-16 w-16 rounded-md"
                                  src={
                                    imgData.compressed_raw_image_public_url ||
                                    ""
                                  }
                                  alt=""
                                />
                              </div>
                            ))}
                          </div>
                        ))}
                    </div>

                    {/* Modified "View" Button */}
                    <div
                      className="bg-[#dbe1e3] absolute bottom-0 -left-0 flex justify-center w-full items-center gap-2 px-6 m-auto mt-6 py-2 cursor-pointer rounded-b-md text-green-900 text-center shadow-md"
                      onClick={() => handleOrderClick(data)}
                    >
                      <h1>
                        <FaEye />
                      </h1>
                      <button className="lg:text-sm text-lg font-normal">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center col-span-full mt-10">
                <p className="text-2xl font-bold text-red-600">
                  No orders found...
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto mx-10 rounded-lg shadow-xl">
            {/* Orders Table for List View */}
            <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md overflow-hidden">
              <thead className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white ">
                <tr>
                  <th className="px-2 py-2 text-center text-sm font-semibold  uppercase tracking-wider border border-gray-300">
                    SL
                  </th>
                  <th className="px-2 py-2 text-center text-sm font-semibold  uppercase tracking-wider border border-gray-300">
                    User Email
                  </th>
                  <th className="px-2 py-2 text-center text-sm font-semibold  uppercase tracking-wider border border-gray-300">
                    Order ID
                  </th>
                  <th className="px-2 py-2 text-center text-sm font-semibold  uppercase tracking-wider border border-gray-300">
                    Status
                  </th>
                  <th className="px-2 py-2 text-center text-sm  font-semibold  uppercase tracking-wider border border-gray-300">
                    No of Images
                  </th>
                  <th className="px-2 py-2 text-center text-sm font-semibold  uppercase tracking-wider border border-gray-300">
                    Order Date
                  </th>
                  <th className="px-2 py-2 text-center text-sm font-semibold  uppercase tracking-wider border border-gray-300">
                    Order Upload From
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentOrdersListView.length > 0 ? (
                  currentOrdersListView.map((data, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(data.id)}
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      {/* Calculate SL number based on current page and items per page */}
                      <td className="px-4 py-2 text-center font-semibold text-sm text-gray-900 border border-gray-300">
                        {(currentPageListView - 1) * itemsPerPageList +
                          (index + 1)}
                      </td>
                      <td className="px-4 py-2  text-center text-sm border border-gray-300">
                        <span className="px-2  py-1 rounded-md bg-gradient-to-r from-blue-500 to-blue-300 text-white">
                          {data.useremail}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center text-sm border border-gray-300">
                        <span className="px-2 py-1 rounded-md bg-gradient-to-r from-gray-300 to-gray-100 text-black">
                          {data.custom_code}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center text-sm border border-gray-300">
                        <span
                          className={`px-2 py-1 rounded-md ${
                            data.status_id === 1
                              ? "bg-gradient-to-r from-rose-500 to-rose-300 text-white"
                              : "bg-gradient-to-r from-green-600 to-green-500 text-white"
                          }`}
                        >
                          {data.status_id === 1 ? "In Progress" : "Completed"}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center text-sm text-gray-500 border border-gray-300">
                        <span className="px-2 py-1 rounded-md  font-semibold">
                          {data.no_of_images}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center text-sm text-gray-500 border border-gray-300">
                        <span className="px-2 py-1 rounded-md bg-white border border-purple-600 text-black">
                          {convertDate(data.order_time)}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center text-sm border border-gray-300">
                        <span
                          className={`px-2 py-1 rounded-md ${
                            data.file_upload_from === 1
                              ? "bg-gradient-to-r from-orange-400 to-orange-300 text-white"
                              : "bg-gradient-to-r from-cyan-500 to-cyan-700 text-white"
                          }`}
                        >
                          {data.file_upload_from === 1 ? "Web" : "Shopify Store"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-2 text-center text-red-600 border border-gray-300"
                    >
                      No orders found...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-4 gap-2">
          {viewMode === "details" ? (
            <>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-4 w-[100px] py-1 mx-1 border disabled:bg-gray-400 rounded-md ${
                  currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                Previous
              </button>

              {/* Page Numbers for details view */}
              <div className="flex items-center">
                {pageNumbers.map((number, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageClick(number)}
                    className={`px-4 py-1 mx-1 rounded-md ${
                      number === currentPage
                        ? "bg-[#ffb752] text-white"
                        : "border"
                    }`}
                    disabled={number === "..."}
                  >
                    {number}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 w-[100px] mx-1 border disabled:bg-gray-400 rounded-md ${
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              >
                Next
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handlePreviousPageListView}
                disabled={currentPageListView === 1}
                className={`px-4 w-[100px] py-1 mx-1 border disabled:bg-gray-400 rounded-md ${
                  currentPageListView === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                Previous
              </button>

              {/* Page Numbers for list view */}
              <div className="flex items-center">
                {pageNumbersListView.map((number, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageClickListView(number)}
                    className={`px-4 py-1 mx-1 rounded-md ${
                      number === currentPageListView
                        ? "bg-[#ffb752] text-white"
                        : "border"
                    }`}
                    disabled={number === "..."}
                  >
                    {number}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextPageListView}
                disabled={currentPageListView === totalPagesListView}
                className={`px-4 py-1 w-[100px] mx-1 border disabled:bg-gray-400 rounded-md ${
                  currentPageListView === totalPagesListView
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              >
                Next
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrderList;
