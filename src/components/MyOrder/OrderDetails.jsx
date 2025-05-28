import React, { useContext, useEffect, useState } from 'react';
import { apiUrlContextManager, userContextManager } from '../../App';
import Navbar from '../Navbar/Navbar';
import DropdownButton from '../Dropdown.js/Dropdown';
import { generateRandomString } from '../ComonFunc/ComonFunc';
import FullScreenModal from '../Modal/Modal';

const OrderDetails = () => {
    const location = useLocation()
    const { orderData } = location.state
    const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);
    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    // const [imageType, setImageType] = useState('');
    const [allData, setAllData] = useState([]);
    const [invoiceInfo, setInvoiceInfo] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);
    const [isReworkModalOpen, setReworkModalOpen] = useState(false);
    const [getConfirmed, setConfirmed] = useState(false);
    const [getImgType, setImgType] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

   

    const downloadFunc = (imageType) => {
    
        fetch(getApiBasicUrl + `/api/2023-02/get-order-image-detail-by-order-master-image-id?order_master_iamge_id=${orderData.id}`, {
            headers: {
                'Authorization': 'bearer ' + getToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => res.json())
            .then(data => {
           
                data.status_code == 200 && downloadAllFileWithIframe(data.results.order_image_detial, imageType);
            })
            .catch(error => console.error("Failed to fetch order details:", error))

        setIsOpen(false);
    }


    const downloadAllFileWithIframe = (fileArray, imageType) => {


        fileArray.map((data, index) => {
        
            if (!data.is_rework) {
                if (imageType == 'png') {
                    downloadFile(data.png_image_output_url, index);
    
                } else if (imageType == 'jpg') {
                    downloadFile(data.original_output_public_url, index);
    
                } else if (imageType == 'psd') {
                    downloadFile(data.psd_image_output_url, index);
                }
    
            }
           
        })

        function downloadFile(url, index) {

            const randomFrameName = `ifram-${generateRandomString(6)}-${index}`;

            /*======= frame create =====*/
            const iframe = document.createElement('iframe');
            iframe.name = randomFrameName;
            iframe.style.display = 'none';
            document.getElementById('frame-container').appendChild(iframe);
            /*======== frame end ========*/

            var link = document.createElement('a');
            link.href = url;
            link.download = "";
            link.target = randomFrameName;
            document.body.appendChild(link);
            link.click();
            // clearInterval(timeout);

            document.body.removeChild(link);
        }


    }


    const modalCallBack = (bl) => {
        setModalOpen(bl);
    }

    const modalCallBackRework = (bl) => {
        setReworkModalOpen(bl);
    }

    const confirmCallback = (bl) => {
        setConfirmed(bl)
    }


    return (
        <>
       
            <div className='bg-[#FAFAFA] h-screen'>
                <Navbar />
                <div className='relative'>

                    <div className='container mx-auto py-6 relative'>
                        {/* <p>Order Id : {id}</p> */}

                        <h2 className="text-2xl text-center mt-2 mb-6 text-green-900 font-bold"><i className="fa-solid mr-2 fa-basket-shopping"></i>ORDER DETAILS </h2>


                        <div className='grid  sm:grid-cols-2  items-center lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-y-6'>

                            {
                                orderData.orderImageDetails.map((data, index) => {
                                    return (
                                        <div key={index} className='bg-white shadow-2xl rounded-xl w-64 h-48 flex justify-center items-center'>
                                            <img className='w-64 h-48 object-contain rounded-md' src={data.raw_image_public_url} />
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className='absolute top-0 right-0 md:top-4 md:right-4'>
                            <div className="relative inline-block text-left">
                                <div>
                                    <button
                                        type="button"
                                        onClick={toggleDropdown}
                                        className="inline-flex justify-center w-full rounded-md shadow-sm bg-green-900 px-4 py-2 text-sm font-medium text-white focus:outline-none "
                                        id="options-menu"
                                        aria-expanded="true"
                                        aria-haspopup="true"
                                    >
                                        Download
                                        {/* Dropdown arrow */}
                                        <svg
                                            className="-mr-1 ml-2 h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                {/* Dropdown panel */}
                                {isOpen && (
                                    <div
                                        className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="options-menu"
                                    >

                                        {/* Dropdown items */}
                                        <button
                                            onClick={() => downloadFunc('jpg')}
                                            className="block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            role="menuitem"
                                        >
                                            JPG
                                        </button>
                                        <button
                                            onClick={() => downloadFunc('png')}
                                            className="block px-4 py-2 text-sm w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            role="menuitem"
                                        >
                                            PNG
                                        </button>
                                        <button
                                            onClick={() => downloadFunc('psd')}
                                            className="block px-4 py-2 text-sm w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            role="menuitem"
                                        >
                                            PSD
                                        </button>
                                    </div>

                                )}
                            </div>
                        </div>

                        {/* Dropdown panel */}

                    </div>
                </div>
            </div>
            {
                isModalOpen && <FullScreenModal invoiceInfo={invoiceInfo} confirmCallback={confirmCallback} modalCallBack={modalCallBack} imageType={getImgType} orderMasterId={orderData.id} />
            }
            <div id="frame-container"></div>
        </>
    );
};

export default OrderDetails;