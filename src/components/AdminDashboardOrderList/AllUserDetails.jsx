import { useContext, useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiUrlContextManager, userContextManager } from "../../App";
import { convertDate } from "../ComonFunc/ComonFunc";
import { FaSort, FaSortUp, FaSortDown, FaSearch } from "react-icons/fa";
import { FcCalendar } from "react-icons/fc";
import { IoMdArrowDropdown, IoMdRefresh } from "react-icons/io";
import CountryFullName from "../ComonFunc/CountryFullName";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import { TfiDownload } from "react-icons/tfi";
const AllUserDetails = () => {
  const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] =
    useContext(apiUrlContextManager);
  const [getUserInfo, setUserInfo, getToken, setToken] =
    useContext(userContextManager);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [newUserInstall, setNewUserInstall] = useState(7);
  const [dropdownOpenForUserShowTally, setdropdownOpenForUserShowTally] = useState(false);
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);
  const [dateRangeData, setDateRangeData] = useState(null);
  const [isDateRangeLoading, setIsDateRangeLoading] = useState(false);
  const [dateRangeError, setDateRangeError] = useState(null);
  const [startDateForDownload, setStartDateForDownload] = useState(null);
  const [endDateForDownload, setEndDateForDownload] = useState(null);
  const optionsForUserShowTally = [10, 25, 50, 100];
  const [sortColumn, setSortColumn] = useState("install_date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUserDetails = async () => {
    const response = await fetch(
      getApiBasicUrl + "/api/2023-02/get-all-user-process-report",
      {
        headers: {
          Authorization: "bearer " + getToken,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results.user_process_report;
  };

  const {
    data: userData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userDetails", getUserInfo],
    queryFn: fetchUserDetails,
    enabled: !!getUserInfo && getUserInfo.status_code === 200,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const formatDateToLocalWithTime = (date, time = "00:00:00") => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}T${time}`;
  };

  const fetchDateRangeUserProcessReport = async (startDate, endDate) => {
    setIsDateRangeLoading(true);
    try {
      const response = await fetch(
        `https://api1.retouched.ai/api/2023-02/get-date-range-user-total-process-report_count?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: "bearer " + getToken,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data from the new API.");
      }

      const data = await response.json();
      setDateRangeData(data.results);
      setDateRangeError(null);
    } catch (error) {
      setDateRangeError(error.message);
      setDateRangeData(null);
    } finally {
      setIsDateRangeLoading(false);
    }
  };

  const handleReportFileDownload = () => {
    const downloadUrl = `${getApiBasicUrl}/api/2023-02/get-date-range-user-activity_report_excel_download?startDate=${startDateForDownload}&endDate=${endDateForDownload}`;
    window.open(downloadUrl, "_blank");
  };

  const handleFetchDateRangeData = () => {
    if (customStartDate && customEndDate) {
      const startDateFormatted = formatDateToLocalWithTime(
        customStartDate,
        "00:00:00"
      ); 
      const endDateFormatted = formatDateToLocalWithTime(
        customEndDate,
        "23:59:59"
      ); 
      fetchDateRangeUserProcessReport(startDateFormatted, endDateFormatted);
      setStartDateForDownload(startDateFormatted);
      setEndDateForDownload(endDateFormatted);
    }
  };

  const {
    shopify: {
      total_users: shopifyUsers = 0,
      new_install_users: newShopifyUsers = 0,
      old_users: oldShopifyUsers = 0,
      orders_placed_count: shopifyOrdersPlaced = 0,
      images_processed_count: shopifyImagesProcessed = 0,
      rework_image_count: shopifyReworkImages = 0,
      preset_take_service_count: shopifyPresetTakeService = 0,
      image_resized_take_service_count: shopifyImageResizedTakeService = 0,
      ai_background_addition_take_service_count: shopifyAIBackgroundAdditionTakeService = 0,
      uninstall_user_count: shopifyUninstallUserCount = 0,
      same_day_uninstall_user_count: shopifySameDayUninstallUserCount = 0,
      old_uninstall_user_count: shopifyOldUninstallUserCount = 0,
      new_user_count: shopifyNewUniqueUser = 0,
      new_user_order_placed_count: shopifyNewUserOrderPlaced = 0,
      new_user_image_process_count: shopifyNewUserImageProcess = 0,
      new_user_rework_image_count: shopifyNewUserReworkImage = 0,
    } = {}, 
    retouchedai: {
      total_users: retouchedTotalUsers = 0,
      new_install_users: retouchedNewUsers = 0,
      new_user_count: retouchedNewUniqueUsers = 0,
      old_users: retouchedOldUsers = 0,
      orders_placed_count: retouchedOrdersPlaced = 0,
      images_processed_count: retouchedImagesProcessed = 0,
      rework_image_count: retouchedReworkImages = 0,
      preset_take_service_count: retouchedPresetTakeService = 0,
      image_resized_take_service_count: retouchedImageResizedTakeService = 0,
      ai_background_addition_take_service_count: retouchedAIBackgroundAdditionTakeService = 0,
      new_user_order_placed_count: retouchedNewUserOrderPlaced = 0,
      new_user_image_process_count: retouchedNewUserImageProcess = 0,
      new_user_rework_image_count: retouchedNewUserReworkImage = 0,
    } = {}, 
  } = dateRangeData || {}; 

  const {
    totalUsers,
    shopifyUsers: shopifyTotalUsers,
    retouchedWebUsers,
  } = useMemo(() => {
    const total = userData.length;

    const shopify = userData.filter(
      (user) => user.source && user.source.trim() === "Shopify App"
    ).length;

    const retouchedWeb = userData.filter(
      (user) => user.source && user.source.trim() === "Retouched Web"
    ).length;

    const endDate = customEndDate ? new Date(customEndDate) : new Date();
    const startDate = customStartDate
      ? new Date(customStartDate)
      : new Date(new Date().setDate(endDate.getDate() - newUserInstall));

    const newUsersShopify = userData.filter((user) => {
      if (!user.install_date || user.source.trim() !== "Shopify App")
        return false;
      const installDate = new Date(user.install_date);
      return installDate >= startDate && installDate <= endDate;
    }).length;

    const newUsersRetouched = userData.filter((user) => {
      if (!user.install_date || user.source.trim() !== "Retouched Web")
        return false;
      const installDate = new Date(user.install_date);
      return installDate >= startDate && installDate <= endDate;
    }).length;

    return {
      totalUsers: total,
      shopifyUsers: shopify,
      retouchedWebUsers: retouchedWeb,
      newUsersInRangeShopify: newUsersShopify,
      newUsersInRangeRetouched: newUsersRetouched,
    };
  }, [userData, newUserInstall, customStartDate, customEndDate]);

  const filteredUserData = useMemo(() => {
    return userData.filter((user) => {
      const email = user.email_address || "";
      const domain = user.myshopify_domain || "";
      const installDate = user.install_date
        ? new Date(user.install_date)
        : null;
      const adjustedEndDate = customEndDate
        ? new Date(new Date(customEndDate).setHours(23, 59, 59, 999))
        : null;

      const isWithinDateRange =
        customStartDate && adjustedEndDate
          ? installDate >= new Date(customStartDate) &&
            installDate <= adjustedEndDate
          : true; 

      return (
        isWithinDateRange &&
        (email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          domain.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  }, [userData, searchTerm, customStartDate, customEndDate]);

  const sortedUserData = useMemo(() => {
    if (!sortColumn) return filteredUserData;

    return [...filteredUserData].sort((a, b) => {
      if (sortOrder === "asc") {
        if (sortColumn === "install_date" || sortColumn === "uninstall_date") {
          return new Date(a[sortColumn]) - new Date(b[sortColumn]);
        }
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else {
        if (sortColumn === "install_date" || sortColumn === "uninstall_date") {
          return new Date(b[sortColumn]) - new Date(a[sortColumn]);
        }
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    });
  }, [filteredUserData, sortColumn, sortOrder]);

  const currentUsers = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return sortedUserData.slice(indexOfFirstItem, indexOfLastItem);
  }, [sortedUserData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredUserData.length / itemsPerPage);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 3;

    if (totalPages <= 1) return pageNumbers;

    pageNumbers.push(1);

    if (currentPage > visiblePages + 2) {
      pageNumbers.push("...");
    }

    for (
      let i = Math.max(2, currentPage - visiblePages);
      i <= Math.min(totalPages - 1, currentPage + visiblePages);
      i++
    ) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPages - visiblePages - 1) {
      pageNumbers.push("...");
    }

    pageNumbers.push(totalPages);

    return pageNumbers;
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber === "...") return;
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleRefresh = () => {
    window.location.reload();
  };
  const handleSortChange = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader_resize"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center py-10">Error: {error.message}</div>
      </div>
    );
  }
// useEffect(() => {
  
// }, [userData]);
  return (
    <div className="user-info-bg min-h-screen">
      {console.log("userData",userData)}
      <div className="container 2xl:container mx-auto pb-3">
        <h1 className=" text-xl font-bold md:text-4xl md:font-extrabold text-center mb-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text shadow-lg  underline uppercase tracking-wider rounded-md ">
          User Detail Information
        </h1>

        <div className="flex justify-between">
          <div className="w-full">
            <h1 className="text-2xl font-bold ml-2">Search</h1>
            <div className="flex justify-between  gap-3 items-center mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder=" Email or Shopify domain"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="px-4 w-full  md:w-[600px] py-2 pl-12 bg-gradient-to-r from-orange-50 to-orange-200 border border-orange-100  text-md rounded-xl shadow-md focus:outline-none "
                />
                <FaSearch className="absolute left-4 text-xl top-1/2 transform -translate-y-1/2 text-orange-300" />
              </div>

              {/* Items Per Page Dropdown */}
              <div className="relative inline-flex items-center space-x-2 text-left">
                {/* Refresh Button */}
                <button
                  onClick={handleRefresh}
                  className="px-4 py-[10px] flex items-center justify-center bg-gradient-to-r from-orange-200 to-orange-300 text-lg font-semibold text-white rounded-xl shadow-lg hover:bg-orange-400 transition duration-200"
                >
                  <IoMdRefresh className="text-2xl" />
                </button>

                {/* Main Dropdown Button */}
                <button
                  onClick={() =>
                    setdropdownOpenForUserShowTally(
                      !dropdownOpenForUserShowTally
                    )
                  }
                  className="px-4 py-2 flex items-center justify-center bg-gradient-to-r from-orange-200 to-orange-300 text-lg font-semibold text-white rounded-xl shadow-lg focus:outline-none   transition duration-200"
                >
                  <span>{itemsPerPage}</span>
                  <IoMdArrowDropdown className="ml-1 text-xl mt-[3px]" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpenForUserShowTally && (
                  <div className="absolute top-[38px] left-[58px] z-10 mt-2 w-[70px] bg-white rounded-lg shadow-lg">
                    <div className="py-1">
                      {optionsForUserShowTally.map((option) => (
                        <div
                          key={option}
                          onClick={() => {
                            setItemsPerPage(option);
                            setdropdownOpenForUserShowTally(false);
                          }}
                          className={`px-4 py-2 text-center text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition duration-150 ${
                            itemsPerPage === option ? "bg-gray-200" : ""
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <button
                  onClick={handleReportFileDownload}
                  className="px-4 py-[10px] flex items-center justify-center bg-gradient-to-r from-orange-200 to-orange-300 text-lg font-semibold text-white rounded-xl shadow-lg hover:bg-orange-400 transition duration-200"
                >
                  <TfiDownload className="text-2xl" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Existing Information Boxes */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-2">
          {/* Total Users */}
          <div className=" bg-gradient-to-r from-green-100 to-green-300 shadow-lg rounded-xl px-6 py-3 border border-green-200">
            <h2 className="text-md font-bold text-green-600 mb-10">
              User Statistics
            </h2>
            <div className="grid grid-cols-3 gap-4  text-center">
              <div className="p-2 bg-white rounded-md shadow-inner border border-gray-200">
                <h2 className="text-sm text-gray-500">Total</h2>
                <p className="text-xl font-semibold text-gray-800">
                  {totalUsers}
                </p>
              </div>
              <div className="p-2 bg-white rounded-md shadow-inner border border-gray-200">
                <h2 className="text-sm text-gray-500">Shopify</h2>
                <p className="text-xl font-semibold text-gray-800">
                  {shopifyTotalUsers}
                </p>
              </div>
              <div className="p-2 bg-white rounded-md shadow-inner border border-gray-200">
                <h2 className="text-sm text-gray-500">Retouched</h2>
                <p className="text-xl font-semibold text-gray-800">
                  {retouchedWebUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="   bg-gradient-to-r from-rose-100 to-rose-300 shadow-lg rounded-xl px-6  py-3 border border-rose-200">
            <h2 className="text-md font-bold text-rose-600 mb-4">Shopify</h2>
            {isDateRangeLoading ? (
              <div className="flex items-center justify-center ">
                <div className="loader-user-info"></div>
              </div>
            ) : dateRangeError ? (
              <p className="text-red-500">Error: {dateRangeError}</p>
            ) : (
              <div className="flex flex-col space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 font-semibold">
                    Total User
                  </span>
                  <span className="text-xl font-semibold text-gray-800">
                    {shopifyUsers}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    New Installs
                  </span>
                  <span className="text-sm text-gray-800">
                    {newShopifyUsers}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Old User
                  </span>
                  <span className="text-sm text-gray-800">
                    {oldShopifyUsers}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Total Orders
                  </span>
                  <span className="text-sm text-gray-800">
                    {shopifyOrdersPlaced}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Total Images Processed
                  </span>
                  <span className="text-sm text-gray-800">
                    {shopifyImagesProcessed}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Pro-Touch Images
                  </span>
                  <span className="text-sm text-gray-800">
                    {shopifyReworkImages}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                  Images Resized
                  </span>
                  <span className="text-sm text-gray-800">
                    {shopifyImageResizedTakeService}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                  AI BG Addition
                  </span>
                  <span className="text-sm text-gray-800">
                    {shopifyAIBackgroundAdditionTakeService}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                  Preset
                  </span>
                  <span className="text-sm text-gray-800">
                    {shopifyPresetTakeService}
                  </span>
                </div>
                <div className="h-0.5 bg-rose-300"> </div>

                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                  Unique Users
                  </span>
                  <span className="text-sm text-gray-800">
                    {shopifyNewUniqueUser}
                  </span>
                </div>
              
               
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Orders from New Installs
                  </span>
                  <span className="text-sm text-gray-800">
                    {shopifyNewUserOrderPlaced}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                  Image processed from new Installs
                  </span>
                  <span className="text-sm text-gray-800">
                    {shopifyNewUserImageProcess}
                  </span>
                </div>
                
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    New User Pro-Touch Images
                  </span>
                  <span className="text-sm text-gray-800">
                    {shopifyNewUserReworkImage}
                  </span>
                </div>
                <div className="h-0.5 bg-rose-300"> </div>
               
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Uninstall Users</span>
                  <span className="text-sm text-gray-800">
                    {shopifyUninstallUserCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Same day Uninstall Users</span>
                  <span className="text-sm text-gray-800">
                    {shopifySameDayUninstallUserCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Old Users Uninstalls</span>
                  <span className="text-sm text-gray-800">
                    {shopifyOldUninstallUserCount}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className=" bg-gradient-to-r from-purple-100 to-purple-300 shadow-lg rounded-xl px-6 py-3 border border-purple-200">
            <h2 className="text-md font-bold text-purple-600 mb-4">
              Retouched Web
            </h2>
            {isDateRangeLoading ? (
              <div className="flex items-center justify-center ">
                <div className="loader-user-info"></div>
              </div>
            ) : dateRangeError ? (
              <p className="text-red-500">Error: {dateRangeError}</p>
            ) : (
              <div className="flex flex-col space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total User</span>
                  <span className="text-xl font-semibold text-gray-800">
                    {retouchedTotalUsers}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">New User Install</span>
                  <span className="text-base text-gray-800 font-semibold ">
                    {retouchedNewUsers}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                  
                    Old Users
                  </span>
                  <span className="text-sm text-gray-800">
                    {retouchedOldUsers}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                  
                    Total Orders Placed
                  </span>
                  <span className="text-sm text-gray-800">
                    {retouchedOrdersPlaced}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Total Images Processed
                  </span>
                  <span className="text-sm text-gray-800">
                    {retouchedImagesProcessed}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Pro-Touch Images
                  </span>
                  <span className="text-sm text-gray-800">
                    {retouchedReworkImages}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                  Images Resized
                  </span>
                  <span className="text-sm text-gray-800">
                    {retouchedImageResizedTakeService}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                  AI BG Addition
                  </span>
                  <span className="text-sm text-gray-800">
                    {retouchedAIBackgroundAdditionTakeService}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Preset
                  </span>
                  <span className="text-sm text-gray-800">
                    {retouchedPresetTakeService}
                  </span>
                </div>
                <div className="h-0.5 bg-purple-300"> </div>
               
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">New Unique User</span>
                  <span className="text-sm text-gray-800">
                    {retouchedNewUniqueUsers}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                  Orders from New Users
                  </span>
                  <span className="text-sm text-gray-800">
                    {retouchedNewUserOrderPlaced}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                  Image processed from new Users
                  </span>
                  <span className="text-sm text-gray-800">
                    {retouchedNewUserImageProcess}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    New User Pro-Touch Images
                  </span>
                  <span className="text-sm text-gray-800">
                    {retouchedNewUserReworkImage}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Date Range Picker */}
          <div className=" bg-gradient-to-r from-sky-100 to-sky-200  rounded-xl p-4  shadow-lg items-end gap-3 mb-2">
            <div className="w-full">
              <h2 className="text-md font-bold text-sky-600 mb-4">
                Select Date Range
              </h2>
            </div>
            <div className="flex flex-col items-center justify-between w-full gap-4">
              <div className="flex items-center  justify-center mt-5 w-full gap-2">
                <FcCalendar className="text-[44px]" />
                <DatePicker
                  selected={customStartDate}
                  onChange={(date) => setCustomStartDate(date)}
                  selectsStart
                  startDate={customStartDate}
                  endDate={customEndDate}
                  placeholderText="Start Date"
                  className="px-3 py-2 border w-[100px] text-sm border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                <DatePicker
                  selected={customEndDate}
                  onChange={(date) => setCustomEndDate(date)}
                  selectsEnd
                  startDate={customStartDate}
                  endDate={customEndDate}
                  placeholderText="End Date"
                  className="px-3 py-2 border w-[100px] text-sm border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>
              <button
                onClick={handleFetchDateRangeData}
                className="px-4 py-2 bg-gradient-to-r ml-10 from-sky-300 to-sky-500  text-sm text-white rounded-md shadow-md  focus:outline-none "
              >
                Apply
              </button>
            </div>
          </div>
        </div>
        <div
          className={`overflow-x-auto mt-4 shadow-md overflow-y-auto ${
            itemsPerPage > 10 ? "h-[400px]" : ""
          }`}
        >
          <table className="min-w-full divide-y divide-gray-200 bg-white shadow-xl rounded-lg  relative">
            {/* Table Header */}
            <thead className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white sticky top-[-2px] shadow-md">
              <tr>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider border border-gray-300 whitespace-nowrap">
                  SL
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider border border-gray-300 whitespace-nowrap">
                  Email Address
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider border border-gray-300 whitespace-nowrap">
                  Phone Number
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider border border-gray-300 whitespace-nowrap">
                  Shop Name
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider border border-gray-300 whitespace-nowrap">
                  Domain Name
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider border border-gray-300 whitespace-nowrap">
                  Shopify Domain Name
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider border border-gray-300 whitespace-nowrap">
                  User Status
                </th>

                <th
                  className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider border border-gray-300 cursor-pointer whitespace-nowrap"
                  onClick={() => handleSortChange("install_date")}
                >
                  <div className="flex justify-center items-center gap-2">
                    <span>Install Date</span>
                    {sortColumn === "install_date" ? (
                      sortOrder === "asc" ? (
                        <FaSortUp />
                      ) : (
                        <FaSortDown />
                      )
                    ) : (
                      <FaSort />
                    )}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider border border-gray-300 cursor-pointer whitespace-nowrap"
                  onClick={() => handleSortChange("uninstall_date")}
                >
                  <div className="flex justify-center items-center gap-2">
                    <span>Uninstall Date</span>
                    {sortColumn === "uninstall_date" ? (
                      sortOrder === "asc" ? (
                        <FaSortUp />
                      ) : (
                        <FaSortDown />
                      )
                    ) : (
                      <FaSort />
                    )}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider border border-gray-300 cursor-pointer whitespace-nowrap"
                  onClick={() => handleSortChange("orders_placed_count")}
                >
                  <div className="flex justify-center items-center gap-2">
                    <span>Orders Placed</span>
                    {sortColumn === "orders_placed_count" ? (
                      sortOrder === "asc" ? (
                        <FaSortUp />
                      ) : (
                        <FaSortDown />
                      )
                    ) : (
                      <FaSort />
                    )}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider border border-gray-300 cursor-pointer whitespace-nowrap"
                  onClick={() => handleSortChange("images_processed_count")}
                >
                  <div className="flex justify-center items-center gap-2">
                    <span>Images Processed</span>
                    {sortColumn === "images_processed_count" ? (
                      sortOrder === "asc" ? (
                        <FaSortUp />
                      ) : (
                        <FaSortDown />
                      )
                    ) : (
                      <FaSort />
                    )}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider border border-gray-300 cursor-pointer whitespace-nowrap"
                  onClick={() => handleSortChange("rework_image_count")}
                >
                  <div className="flex justify-center items-center gap-2">
                    <span>Rework Images</span>
                    {sortColumn === "rework_image_count" ? (
                      sortOrder === "asc" ? (
                        <FaSortUp />
                      ) : (
                        <FaSortDown />
                      )
                    ) : (
                      <FaSort />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider border border-gray-300 whitespace-nowrap">
                  Service Used
                </th>
                <th
                  className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider border border-gray-300 cursor-pointer whitespace-nowrap"
                  onClick={() => handleSortChange("source")}
                >
                  <div className="flex justify-center items-center gap-2">
                    <span>Source</span>
                    {sortColumn === "source" ? (
                      sortOrder === "asc" ? (
                        <FaSortUp />
                      ) : (
                        <FaSortDown />
                      )
                    ) : (
                      <FaSort />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider border border-gray-300 whitespace-nowrap">
                  Location
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr
                    key={index}
                    className={` cursor-pointer transition-all duration-200 ease-in-out ${
                      user.source === "Retouched Web"
                        ? "bg-orange-100 "
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <td className="px-4 py-2 text-center  text-sm text-gray-900 border border-gray-300 whitespace-nowrap">
                      {(currentPage - 1) * itemsPerPage + (index + 1)}
                    </td>
                    <td className="px-4 py-2 text-left text-sm border border-gray-300 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-sm shadow-lg rounded-md ${
                          user.email_address
                            ? "bg-stone-20 text-stone-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {user.email_address || "No Data"}
                      </span>
                    </td>

                    <td className="px-4 py-2 text-center text-sm border border-gray-300 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-sm shadow-lg rounded-md ${
                          user.phone_number
                            ? "bg-gradient-to-t from-blue-600 to-blue-400 text-white"
                            : "bg-white text-black border border-blue-800"
                        }`}
                      >
                        {user.phone_number || "No Data"}
                      </span>
                    </td>

                    <td className="px-4 py-2 text-left text-sm border border-gray-300 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-sm shadow-lg rounded-md ${
                          user.shop_name
                            ? "bg-white text-stone-700"
                            : "bg-white text-black border border-blue-800"
                        }`}
                      >
                        {user.shop_name || "No Data"}
                      </span>
                    </td>

                    <td className="px-4 py-2 text-left text-sm border border-gray-300 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-sm shadow-lg rounded-md ${
                          user.domain
                            ? "bg-white text-stone-700"
                            : "bg-white text-black border border-blue-800"
                        }`}
                      >
                        {user.domain || "No Data"}
                      </span>
                    </td>

                    <td className="px-4 py-2 text-left text-sm border border-gray-300 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-sm shadow-lg rounded-md ${
                          user.myshopify_domain
                            ? "bg-white text-stone-700"
                            : "bg-white text-black border border-blue-800"
                        }`}
                      >
                        {user.myshopify_domain || "No Data"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-left text-sm border border-gray-300 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-sm shadow-lg rounded-md ${
                          user.is_active === true
                            ? "bg-gradient-to-t from-green-800 to-green-600 text-white"
                            : "bg-gradient-to-t from-red-600 to-red-400 text-white"
                        }`}
                      >
                        {user.is_active ? "Active" : "Deactive"}
                      </span>
                    </td>

                    <td className="px-4 py-2 text-center text-sm border border-gray-300 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-sm shadow-lg rounded-md ${
                          user.install_date
                            ? "white text-green-600 font-semibold border border-green-600"
                            : "bg-white text-black border border-blue-800"
                        }`}
                      >
                        {user.install_date
                          ? convertDate(user.install_date)
                          : "No Data"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`px-2 py-1 text-sm shadow-lg rounded-md whitespace-nowrap ${
                          user.uninstall_date
                            ? "bg-white text-red-600 border border-red-600"
                            : "bg-white text-black border border-blue-800"
                        }`}
                      >
                        {user.uninstall_date
                          ? convertDate(user.uninstall_date)
                          : "No Data"}
                      </span>
                    </td>

                    <td className="px-4 py-2 text-center text-sm border border-gray-300 whitespace-nowrap">
                      {user.orders_placed_count}
                    </td>
                    <td className="px-4 py-2 text-center text-sm border border-gray-300 whitespace-nowrap">
                      {user.images_processed_count}
                    </td>
                    <td className="px-4 py-2 text-center text-sm border border-gray-300 whitespace-nowrap">
                      {user.rework_image_count}
                    </td>
                    <td className="px-4 py-2 text-center text-sm border border-gray-300 whitespace-nowrap">
                      {user.requested_service}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`px-2 py-1 text-sm shadow-lg rounded-md whitespace-nowrap ${
                          user.source === "Shopify App"
                            ? "bg-gradient-to-t from-green-600 to-green-400 text-white"
                            : user.source === "Retouched Web"
                            ? "bg-gradient-to-t from-orange-500 to-orange-300 text-white"
                            : "bg-white text-black border border-blue-800"
                        }`}
                      >
                        {user.source}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center text-sm border border-gray-300 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-sm shadow-lg rounded-md ${
                          user.country
                            ? "bg-gradient-to-r from-cyan-500 to-cyan-700 text-white"
                            : "bg-white text-black border border-blue-800"
                        }`}
                      >
                        <CountryFullName code={user.country || "No Data"} />
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="13"
                    className="px-4 py-2 text-center text-xs text-gray-900 border border-gray-300 whitespace-nowrap"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-2 items-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm w-[100px] hover:bg-gradient-to-r from-orange-300 to-orange-500 hover:text-white bg-gray-300 shadow-md text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <div className="flex items-center">
            {generatePageNumbers().map((pageNumber, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(pageNumber)}
                className={`px-4 py-2 w-[40px] text-sm mx-1 ${
                  pageNumber === currentPage
                    ? "bg-gradient-to-r from-orange-300 to-orange-500 shadow-md text-white"
                    : "bg-gray-300 text-gray-700"
                } rounded ${
                  pageNumber === "..."
                    ? "cursor-default"
                    : "hover:bg-gradient-to-r from-orange-300 to-orange-500 hover:text-white"
                }`}
                disabled={pageNumber === "..."}
              >
                {pageNumber}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm w-[100px]  hover:bg-gradient-to-r from-orange-300 to-orange-500 hover:text-white bg-gray-300 shadow-md text-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllUserDetails;
