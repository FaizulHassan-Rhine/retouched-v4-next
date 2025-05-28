import React, { useContext, useEffect, useState } from "react";
import { FileContextManager, OrderContextManager, apiUrlContextManager, userContextManager } from "../../App";
import { FaEye } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import { convertDate } from '../ComonFunc/ComonFunc';
import { useQuery } from "@tanstack/react-query";

const MyOrder = () => {
    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);
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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['OrderDetailInfo'],
        queryFn: () =>
            fetch(getApiBasicUrl + "/api/2023-02/user-order-master-info", {
                headers: {
                    'Authorization': 'bearer ' + getToken,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((res) => res.json()),
        enabled: false,
        cacheTime: 1000 * 60 * 5,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        if (getUserInfo.status_code === 200) {
            refetch();
        }
    }, [getUserInfo, refetch]);

    useEffect(() => {
        if (data) {
            setOrderDetailsInfo(data.results.user_order_master_info_list || []);
        }
    }, [data]);

    const totalItems = orderDetailsInfo.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginateData = orderDetailsInfo.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Generate a range of page numbers based on current page
    const getPaginationGroup = () => {
        const maxPagesToShow = 3; // Change this to show more or fewer pages
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        let pages = [];
        if (startPage > 2) {
            pages.push(1, "...");
        }
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        if (endPage < totalPages - 1) {
            pages.push("...", totalPages);
        } else if (endPage === totalPages - 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-[100vh]">
            <div className="loader-order"></div>
        </div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-[100vh]">
            <div className="System Error">System Error</div>
        </div>;
    }

    return (
        <div className="bg-white">
            <Navbar />
            <div className="container mx-auto pb-10">
                <div className="flex justify-center ml-10 mb-5">
                    <h2 className="text-2xl mt-4 font-bold"><i className="fa-solid mr-2 fa-basket-shopping"></i>ORDERS</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-y-4 mx-6">
                    {paginateData.map((data, index) => (
                        <Link to={`/order-details-update`}
                            state={{ orderData: data }}
                            key={index} className="w-72 mt-6 m-auto lg:mt-2 max-w-sm relative">
                            <div className="bg-white shadow-2xl rounded-xl p-4 flex flex-col h-60 md:h-56">
                                <div className="flex flex-col justify-items-start items-start">
                                    <p className="text-[16px] text-green-700 font-semibold"> {data.status_id === 1 ? "In Progress" : "Completed"}</p>
                                    <p className="text-[12px]">Order Id : {data.custom_code}</p>
                                    <p className="text-[12px]">No of Images : {data.no_of_images}</p>
                                    <p className="text-[12px]">Order Date : {convertDate(data.order_time)}</p>
                                    <p className="text-[12px]">Order Upload From : {data.file_upload_from === 1 ? "PC" : "Store"}</p>
                                </div>
                                <p className="bg-green-900 h-6 w-6 text-xs flex justify-center items-center rounded-full text-white text-center absolute top-2 right-2">{data.order_squence}</p>
                                <div className="flex justify-center items-center gap-2 mt-2">
                                    {data.orderImageDetails.slice(0, 3).map((imageData, index) => (
                                        <div key={index}>
                                            <img className="h-16 w-16 rounded-md shadow-lg border border-gray-200" src={imageData.compressed_raw_image_public_url} alt={`Order ${index}`} />
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-[#dbe1e3] absolute bottom-0 -left-0 flex justify-center w-full items-center gap-2 px-6 m-auto mt-6 py-2 cursor-pointer rounded-b-md text-green-900 text-center shadow-md">
                                    <h1><FaEye /></h1>
                                    <button className="lg:text-sm text-lg font-normal">View</button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex justify-center mt-6">
                    <button
                        className={`mx-1 px-3 py-1 border rounded-lg disabled:bg-gray-200 disabled:text-gray-600  hover:bg-orange-400  hover:text-white ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : ''}`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {getPaginationGroup().map((page, index) => (
                        <button
                            key={index}
                            className={`mx-1 px-3 py-1 rounded-lg border ${currentPage === page ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white ' : 'hover:bg-orange-300 hover:text-white'}`}
                            onClick={() => typeof page === "number" && handlePageChange(page)}
                            disabled={typeof page !== "number"}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className={`mx-1 px-3 py-1 border disabled:bg-gray-200 rounded-lg disabled:text-gray-600  hover:bg-orange-400  hover:text-white ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed ' : ''}`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled= {currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyOrder;
