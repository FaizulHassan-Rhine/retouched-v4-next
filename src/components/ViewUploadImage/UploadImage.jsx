import React, { useContext, useEffect, useRef, useState } from 'react';
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
import { generateRandomString, isValidColor } from '../ComonFunc/ComonFunc';
import Loading3 from '../Loading/Loading_3';
import ReworkConfirmModal from '../ReworkConfirmModal/ReworkConfirmModal';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import PopUpInfo from '../PopUp/PopUpInfo';
import { toast, ToastContainer } from 'react-toastify';
import { IoMdColorFilter } from "react-icons/io";
import AfterBeforeImageV4 from './AfterBeforeImageV4';

const UploadImage = () => {
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
    const [visibleSection, setVisibleSection] = useState("5b49f1d-b72e-4d2e-8ded-7ac98fe3184e"); // New state to control visibility of sections
    const [image, setImage] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState("");
    const [showFirstGrid, setShowFirstGrid] = useState(true);
    const [runOnceTime, setRunOnceTime] = useState(false);
    const [getResize, setResize] = useState({ height: 0, width: 0, ratio: true });
    const [resizOption, setResizeOption] = useState({
        width: "",
        height: ""
    });
    const [openCustomSize, setOpenCustomSize] = useState(false);
    const [resizeAllApplyBool, setResizeAllApplyBool] = useState(false);
    const [presetApplyBool, setpresetApplyBool] = useState(false);
    const [getAiImageSelect, setAiImageSelect] = useState(true);
    const [loaderBool, setLoaderBool] = useState(false);
    const [imageLoader, setImageLoader] = useState(false);
    const itemsPerPage = 11;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [storeData, setStoreData] = useState([]);
    const [getNewFileBool, setNewFilebool] = useState(false);
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

    const [featrueSwitch, setFeatureSwitch] = useState('protouch'); // protouch, presets, gnbg, resize
    const [presetSwitch, setPresetSwitch] = useState('colours'); // colours, background
    const imageList = [
        '/images/v-4/junk/test (1).jpg',
        '/images/v-4/junk/test (2).jpg',
        '/images/v-4/junk/test (3).jpg',
        '/images/v-4/junk/test (4).jpg',
        '/images/v-4/junk/test (5).jpg',
        '/images/v-4/junk/test (6).jpg',
        '/images/v-4/junk/test (7).jpg',
        '/images/v-4/junk/test (1).jpg',
        '/images/v-4/junk/test (2).jpg',
        '/images/v-4/junk/test (3).jpg',
        '/images/v-4/junk/test (4).jpg',
        '/images/v-4/junk/test (5).jpg',
        '/images/v-4/junk/test (6).jpg',
        '/images/v-4/junk/test (7).jpg',
        '/images/v-4/junk/test (1).jpg',
        '/images/v-4/junk/test (2).jpg',
        '/images/v-4/junk/test (3).jpg',
        '/images/v-4/junk/test (4).jpg',
        '/images/v-4/junk/test (5).jpg',
        '/images/v-4/junk/test (6).jpg',
        '/images/v-4/junk/test (7).jpg',
    ]

    const [colorList] = useState([
        "#EA4335",
        "#FBBC05",
        "#FF7A00",
        "#34A853",
        "#E435EA",
        "#4285F4",
        "#35EAB7"
    ]);
    const [customColorPick, setCustomColorPick] = useState(null);
    const [prCount, setPrCount] = useState(0);
    const [presetRowImgList] = useState([
        '/images/images/presetrow/1.jpg',
        '/images/images/presetrow/2.jpg',
        '/images/images/presetrow/3.jpg',
        '/images/images/presetrow/4.jpg',
        '/images/images/presetrow/5.jpg',
        '/images/images/presetrow/6.jpg',
        '/images/images/presetrow/7.jpg',
        '/images/images/presetrow/8.jpg',
        // '/images/images/presetrow/9.jpg',
        // '/images/images/presetrow/10.jpg',
        // '/images/images/presetrow/11.jpg',
        // '/images/images/presetrow/12.jpg',
        // '/images/images/presetrow/13.jpg',
        // '/images/images/presetrow/14.jpg',
        // '/images/images/presetrow/15.jpg',
        // '/images/images/presetrow/16.jpg',
        // '/images/images/presetrow/17.jpg'
    ])
    const featureSwitchHandler = (feature) => {
        setFeatureSwitch(feature);
    }

    const presetSwitchHandler = (preset) => {
        setPresetSwitch(preset);
    }
    const [getActionData, setActionData] = useState(null);
    const [getAiPromt, setAiPromt] = useState("");
    const [getReworkText, setReworkText] = useState("");
    const [gnImageList, setGnImageList] = useState([]);
    const [loadingImages, setLoadingImages] = useState([]); // To track loading images
    const location = useLocation();
    let aiPromtCall = 3; // first time call for ai prompt
    let resizeImageCount = 0;
    let presetImageCount = 0;
    const countImageCallIndex = useRef(0);

    const showToastMessage = (msg, type = "success") => {

        toast[type](msg, {
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
                setService(data);
            })
            .catch((error) => console.error("Failed to fetch order details:", error));
    };

    useEffect(() => {
        reworkServiceFunc();
    }, []);
    const handleColorChange = (e) => {
        e.preventDefault();
        const color = e.target.value;
        setCustomColorPick(color);
        setActionData(color);
    }
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

        try {
            const response = await fetch(getApiBasicUrl + '/api/2023-02/order-image-service-insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + getToken
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (data.status_code === 200) {
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
        // toggleSection(id);
        console.log("", storeData);
        if (storeData && storeData[getOpenImg] && storeData[getOpenImg].proccessImage.output_urls) {
            const imageId = storeData[getOpenImg].proccessImage.output_urls[0].order_image_detail_id;
            const imageDetail = {
                order_image_detail_id: imageId,
                service_item_id: id,
                is_selected_for_rework: !bl,
                // is_rework: !bl,
                // "is_download": false
            };

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

    const handleReworkRemove = (bl, index) => {
        const id = '25b49f1d-b72e-4d2e-8ded-7ac98fe3184e';
        console.log("", storeData);
        if (storeData && storeData[index] && storeData[index].proccessImage.output_urls) {
            const imageId = storeData[index].proccessImage.output_urls[0].order_image_detail_id;
            const imageDetail = {
                order_image_detail_id: imageId,
                service_item_id: id,
                is_selected_for_rework: !bl,
                // is_rework: !bl,
                // "is_download": false
            };

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
                    if (data.status_code == 200) {
                        // Create a copy of the fileinfo array
                        const updatedFileinfo = [...storeData];
                        // Update the object at the 2nd index
                        updatedFileinfo[index] = {
                            ...updatedFileinfo[index],
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
        setResizeAllApplyBool(true);
    }
    const resetPreset = () => {
        setActionData("");
        setResizeAllApplyBool(true);

    }
    const sendForPreset = () => {

        setLoaderBool(true);
        let selectedImage = [];

        if (!presetApplyBool) {
            selectedImage.push(storeData[getOpenImg]);
        } else {
            selectedImage = storeData;
        }
        presetImageCount = selectedImage.length;
        // setPrCount(prev=> prev + selectedImage.length);

        selectedImage.map((item, index) => {
            const imageId = item.proccessImage.output_urls[0].order_image_detail_id;
            updateOrderImageService(imageId, visibleSection);  // Call the new API function after resizing is done
            isValidColor(getActionData) ? presetColorFromServer(imageId, index) : presetFromServer(imageId, index);
        })


    }

    const sendForResize = () => {

        setLoaderBool(true);
        let selectedImage = [];

        if (!resizeAllApplyBool) {
            selectedImage.push(storeData[getOpenImg]);
        } else {
            selectedImage = storeData;
        }
        resizeImageCount = selectedImage.length;
        // const imageWidth = resizOption == "shopify" ? "2048" : resizOption == "facebook" ? "1200" : resizOption == "amazon" ? "2000" : getResize.width;
        // const imageHeight = resizOption == "shopify" ? "2048" : resizOption == "facebook" ? "1200" : resizOption == "amazon" ? "2000" : getResize.height;

        const imageWidth = resizOption.width;
        const imageHeight = resizOption.height;

        const ratio = true;

        selectedImage.map((item, index) => {
            const imageId = item.proccessImage.output_urls[0].order_image_detail_id;
            updateOrderImageService(imageId, visibleSection);  // Call the new API function after resizing is done
            resizeFromServer(imageId, imageWidth, imageHeight, ratio, index);
        })


    }

    const resetFeatureSelection = () => {
        setpresetApplyBool(false);
        setResizeAllApplyBool(false);
        setAiImageSelect(true);
    }
    const handleServices = (id) => {
        const openImageRkBool = storeData[getOpenImg].rework;
        toggleSection(id);
        resetFeatureSelection(); // Reset the feature selection
        id == "25b49f1d-b72e-4d2e-8ded-7ac98fe3184e" && handleRework(openImageRkBool, id);
        // id == "1d4fe99a-ac36-4a22-b15d-db864acaaa01" && handleResize(id);
    }

    
    const generateBgFirstCall = () => {
        setGnImageList([]);
        if (getAiPromt.length == 0) {
            showToastMessage("Prompt box is empty! Please input.", "warn");
        } else {
            const newLoadingArray = Array(aiPromtCall).fill(true); // Mark all images as loading initially
            setLoadingImages((p)=>[...newLoadingArray]);
            setImageLoader(true);
            handleGenerateBgRecall();

            // for (let index = 0; index < aiPromtCall; index++) {
            //   handleGenerateBgRecall();
            // }
        }
    }
    const handleGenerateBgRecall = async () => {
        let retryCount = 0;
        const maxRetries = 3;
        // let success = false;
        const myPrompt = getAiPromt;
        // aiPromtCall = aiPromtCall - 1;
        aiPromtCall = aiPromtCall - 1;

        while (retryCount < maxRetries) {
            try {
                const response = await fetch(
                    `${getModelBaseUrl}ai-image-generation`,
                    {
                        method: "POST",
                        headers: {
                            'Authorization': 'bearer ' + getToken
                        },
                        body: myPrompt,
                    }
                );
                const data = await response.json();
                if (data.status_code == 200) {
                    const gnImage = data.results.image_detail_info.image_url;
                    setGnImageList(prev => [...prev, gnImage]);
                    await delay(1000); // Wait for 1 second before retrying
                    aiPromtCall !== 0 && handleGenerateBgRecall(); // recall generate bg function
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
            aiPromtCall !== 0 && handleGenerateBgRecall(); // recall generate bg function
        }

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        if (aiPromtCall == 0) {
            setImageLoader(false);
        }
    }

    const handleGenerateBg = async () => {
        let retryCount = 0;
        const maxRetries = 3;
        // let success = false;
        const myPrompt = getAiPromt;
        while (retryCount < maxRetries) {
            try {
                const response = await fetch(
                    `${getModelBaseUrl}ai-image-generation`,
                    {
                        method: "POST",
                        headers: {
                            'Authorization': 'bearer ' + getToken
                        },
                        body: myPrompt,
                    }
                );
                const data = await response.json();
                if (data.status_code == 200) {
                    setLoaderBool(false);
                    const gnImage = data.results.image_detail_info.image_url;
                    setGnImageList(prev => [...prev, gnImage]);

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
        aiPromtCall = aiPromtCall - 1;

        if (retryCount === maxRetries) {
            console.error("Maximum retry attempts reached.");
        }

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }


        // if (aiPromtCall == 0) {
        //   setLoaderBool(false);
        // }
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
        if (newFile.length > 0 && getNewFileBool == false) {
            newOrderCreate(newFile);
        } else if (getNewFileBool) {
            console.log("countImageCallIndex", countImageCallIndex.current);
            const count = countImageCallIndex.current;
            console.log("count", count);
            setNewFilebool(false);
            dataTransferNewFile(count);
        }
        else {
            navigate("/");
        }
    };


    const uploadNewFile = (e) => {
        let newFile = e.target.files;
        setNewFilebool(true);
        console.log("newFile", newFile)
        const totalImage = getTotalImage + newFile.length;
        // setTotalImage(totalImage);
        if (totalImage > getLimitUploadImg) {
            setMsg(`You can not upload more than ${getLimitUploadImg} images`);
            setPopBool(true)
        } else {
            setRunOnceTime(false);
            let imageArray = [];



            for (const file of newFile) {
                if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/tiff") {
                    const foundFile = storeData.find(
                        (fl) =>
                            fl.file.lastModified === file.lastModified &&
                            fl.file.name === file.name &&
                            fl.file.size === file.size &&
                            fl.file.type === file.type
                    );

                    if (foundFile) {
                        console.log("The file already exists in the array.");
                    } else {
                        console.log("New file.", file.lastModified);
                        const imageUrl = URL.createObjectURL(file);

                        const fileObject = { file: file, src: imageUrl, rework: false, proccessImage: {}, history: [] };
                        imageArray.push(fileObject);
                        // setTotalImage((getTotalImage) => getTotalImage + 1);
                    }
                }
            }
            setStoreData((prevStoreData) => [...prevStoreData, ...imageArray]);
            // updateOrderFile(newFile);
        }

    };

    const updateOrderFile = (newFile) => {
        console.log(newFile); // Check if this logs an array or files

        let imageArray = [];

        for (const file of newFile) {

            if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/tiff") {
                const foundFile = storeData.find(
                    (fl) =>
                        fl.file.lastModified === file.lastModified &&
                        fl.file.name === file.name &&
                        fl.file.size === file.size &&
                        fl.file.type === file.type
                );

                if (foundFile) {
                    console.log("The file already exists in the array.");
                } else {
                    console.log("New file.", file.lastModified);
                    const imageUrl = URL.createObjectURL(file);

                    const fileObject = { file: file, src: imageUrl, rework: false, proccessImage: {}, history: [] };
                    imageArray.push(fileObject);
                    // setTotalImage((getTotalImage) => getTotalImage + 1);
                }
            }
        }
        setStoreData((prevStoreData) => [...prevStoreData, ...imageArray]);
    };

    const imageOrderId = useRef(null);
    const piplineImageSendLimit = 3;
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
                setOrderMasterId(() => order_id);
                imageOrderId.current = order_id;

                const fileSlice = newFile.length < piplineImageSendLimit ? newFile.slice(0, (newFile.length)) : newFile.slice(0, piplineImageSendLimit);
                // countImageCallIndex.current += (fileSlice.length - 1);

                fileSlice.map((file, index) => {

                    if (
                        file.file.type == "image/jpeg" ||
                        file.file.type == "image/png"
                    ) {
                        setTotalImage((getTotalImage) => getTotalImage + 1);
                        const filePath = file.file.webkitRelativePath.split("/");
                        filePath.pop();
                        const pathOfFile = filePath.join("/");
                        let data = new FormData();
                        console.log("order_master_id test", order_id);

                        data.append("order_master_id", order_id);
                        data.append("service_type_id", getServiceTypeId);
                        data.append("file", file.file);
                        data.append("file_relative_path", pathOfFile);
                        data.append("subscription_plan_type_id", getSubscriptionPlanId);
                        dataTransferFirst(data, index);
                    } else {
                        setTotalImage((getTotalImage) => getTotalImage + 1);
                        let file_data = new FormData();

                        // let order_id = data.results.order_master_info.order_id;
                        // setOrderMasterId(order_id);
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

    const dataTransferFirst = async (formData, index) => {
        console.log("storeData", storeData, "storelenght : ", storeData.length, "countImageCallIndex", countImageCallIndex.current, "index is : ", index);
        console.log('file index : ', storeData[index]);

        let retryCount = 0;
        const maxRetries = 3;
        countImageCallIndex.current += 1;

        // let success = false;
        while (retryCount < maxRetries) {

            try {
                const response = await fetch(
                    `${getModelBaseUrl}process-image`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: "bearer " + getToken,
                        },
                        body: formData,
                    }
                );
                const data = await response.json();
                { console.log(data) }
                if (data.status_code == 200) {
                    const updateFileData = [...storeData];

                    updateFileData[index].proccessImage = data.results;
                    setStoreData(updateFileData);
                    setProccessImgIndex((getProccessImgIndex) => getProccessImgIndex + 1);
                    storeData.length > countImageCallIndex.current && dataTransfer(countImageCallIndex.current);
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

    const dataTransfer = async (index) => {
        let retryCount = 0;
        const maxRetries = 3;
        setTotalImage((getTotalImage) => getTotalImage + 1);
        console.log("storeData", storeData, "storelenght : ", storeData.length, "countImageCallIndex", countImageCallIndex.current, "index is : ", index);
        const filePath = storeData[index].file.webkitRelativePath.split("/");

        filePath.pop();

        const pathOfFile = filePath.join("/");
        let formData = new FormData();

        console.log("order_master_id", imageOrderId.current);
        console.log("service_type_id", getServiceTypeId);
        console.log("file", storeData[index].file);
        console.log("file_relative_path", pathOfFile);
        console.log("subscription_plan_type_id", getSubscriptionPlanId);


        formData.append("order_master_id", imageOrderId.current);
        formData.append("service_type_id", getServiceTypeId);
        formData.append("file", storeData[index].file);
        formData.append("file_relative_path", pathOfFile);
        formData.append("subscription_plan_type_id", getSubscriptionPlanId);
        countImageCallIndex.current += 1;

        let getReturnData;
        while (retryCount < maxRetries) {

            try {
                const response = await fetch(
                    `${getModelBaseUrl}process-image`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: "bearer " + getToken,
                        },
                        body: formData,
                    }
                );
                const data = await response.json();
                getReturnData = data;
                if (data.status_code == 200) {
                    const updateFileData = [...storeData];
                    updateFileData[index].proccessImage = data.results;
                    setStoreData(updateFileData);
                    setProccessImgIndex((getProccessImgIndex) => getProccessImgIndex + 1);
                    storeData.length > countImageCallIndex.current && dataTransfer(countImageCallIndex.current);
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
            // countImageCallIndex.current += 1;
            setProccessFailcount((proccessFailcount) => proccessFailcount + 1);
            storeData.length > countImageCallIndex.current && dataTransfer(countImageCallIndex.current);
        }

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    };

    const dataTransferNewFile = async (index) => {
        let retryCount = 0;
        const maxRetries = 3;
        setTotalImage((getTotalImage) => getTotalImage + 1);
        console.log("storeData", storeData, "storelenght : ", storeData.length, "countImageCallIndex", countImageCallIndex.current, "index is : ", index);
        const filePath = storeData[index].file.webkitRelativePath.split("/");

        filePath.pop();

        const pathOfFile = filePath.join("/");
        let formData = new FormData();

        console.log("order_master_id", imageOrderId.current);
        console.log("service_type_id", getServiceTypeId);
        console.log("file", storeData[index].file);
        console.log("file_relative_path", pathOfFile);
        console.log("subscription_plan_type_id", getSubscriptionPlanId);


        formData.append("order_master_id", imageOrderId.current);
        formData.append("service_type_id", getServiceTypeId);
        formData.append("file", storeData[index].file);
        formData.append("file_relative_path", pathOfFile);
        formData.append("subscription_plan_type_id", getSubscriptionPlanId);
        countImageCallIndex.current += 1;

        let getReturnData;
        while (retryCount < maxRetries) {

            try {
                const response = await fetch(
                    `${getModelBaseUrl}process-image`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: "bearer " + getToken,
                        },
                        body: formData,
                    }
                );
                const data = await response.json();
                getReturnData = data;
                if (data.status_code == 200) {
                    const updateFileData = [...storeData];
                    updateFileData[index].proccessImage = data.results;
                    setStoreData(updateFileData);
                    setProccessImgIndex((getProccessImgIndex) => getProccessImgIndex + 1);
                    storeData.length > index && dataTransfer(index + 1);
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
            // countImageCallIndex.current += 1;
            setProccessFailcount((proccessFailcount) => proccessFailcount + 1);
            storeData.length > countImageCallIndex.current && dataTransfer(countImageCallIndex.current);
        }

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    };
    const dataTransferNewUploadFile = async (updatedStoreData, index) => {
        console.log("Data Transfer with updated storeData:", updatedStoreData);
        let retryCount = 0;
        const maxRetries = 3;
        setTotalImage((prev) => prev + 1);

        const filePath = updatedStoreData[index].file.webkitRelativePath.split("/");
        filePath.pop();
        const pathOfFile = filePath.join("/");

        let formData = new FormData();

        console.log("order_master_id", imageOrderId.current);
        console.log("service_type_id", getServiceTypeId);
        console.log("file", updatedStoreData[index].file);
        console.log("file_relative_path", pathOfFile);
        console.log("subscription_plan_type_id", getSubscriptionPlanId);

        formData.append("order_master_id", imageOrderId.current);
        formData.append("service_type_id", getServiceTypeId);
        formData.append("file", updatedStoreData[index].file);
        formData.append("file_relative_path", pathOfFile);
        formData.append("subscription_plan_type_id", getSubscriptionPlanId);

        console.log("FormaData:", formData);
        let getReturnData;
        while (retryCount < maxRetries) {
            try {
                const response = await fetch(`${getModelBaseUrl}process-image`, {
                    method: "POST",
                    headers: {
                        Authorization: "bearer " + getToken,
                    },
                    body: formData,
                });

                const data = await response.json();
                getReturnData = data;

                console.log("Get Return Data:", getReturnData);
                if (data.status_code === 200) {
                    const updateFileData = [...updatedStoreData];
                    updateFileData[index].proccessImage = data.results;

                    countImageCallIndex.current += 1;
                    setProccessImgIndex((prev) => prev + 1);
                    break; // Exit retry loop on success
                } else {
                    retryCount++;
                    await delay(1000); // Wait for 1 second before retrying
                }
            } catch (error) {
                console.error(error);
                retryCount++;
                await delay(1000); // Wait for 1 second before retrying
            }
        }

        if (retryCount === maxRetries) {
            console.error("Maximum retry attempts reached.");
            countImageCallIndex.current += 1;
            setProccessFailcount((prev) => prev + 1);
        }

        function delay(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
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

                if (data.status_code == 200) {
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
            setVisibleSection("25b49f1d-b72e-4d2e-8ded-7ac98fe3184e");
            setActiveSection("");
        }
    };

    const presetFromServer = async (imageId, index) => {
        let retryCount = 0;
        const maxRetries = 3;
        const imageSplit = getActionData.split("/");
        const presetImgName = imageSplit[imageSplit.length - 1];

        // let success = false;
        while (retryCount < maxRetries) {

            try {
                const response = await fetch(
                    `${getModelBaseUrl}replace-background-image?order_image_detail_id=${imageId}&preset_bg_image_name=${presetImgName}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: "bearer " + getToken,
                        }
                    }
                );
                const data = await response.json();

                if (data.status_code == 200) {
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

        presetImageCount = presetImageCount - 1;

        setPrCount(pr => pr + 1);

        if (retryCount === maxRetries) {
            console.error("Maximum retry attempts for resize.");
        }

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }


        if (presetImageCount == 0) {
            setLoaderBool(false);
            // const popupData = {
            //   message: "Image resizing is complete! Your file is now ready for download.",
            //   show: true,
            // }
            // setPopInfo(popupData);
            showToastMessage("The image background is complete! Your file is now ready for download.");
            setVisibleSection("25b49f1d-b72e-4d2e-8ded-7ac98fe3184e");
            setActiveSection("");
        }
    };

    const presetColorFromServer = async (imageId, index) => {
        const slColor = "%23" + getActionData.substring(1);
        let retryCount = 0;
        const maxRetries = 3;
        const imageSplit = getActionData.split("/");
        const presetImgName = imageSplit[imageSplit.length - 1];

        // let success = false;
        while (retryCount < maxRetries) {

            try {
                const response = await fetch(
                    `${getModelBaseUrl}replace-background-color?order_image_detail_id=${imageId}&color_code=${slColor}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: "bearer " + getToken,
                        }
                    }
                );
                const data = await response.json();

                if (data.status_code == 200) {
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

        presetImageCount = presetImageCount - 1;

        setPrCount(pr => pr + 1);

        if (retryCount === maxRetries) {
            console.error("Maximum retry attempts for resize.");
        }

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }


        if (presetImageCount == 0) {
            setLoaderBool(false);
            // const popupData = {
            //   message: "Image resizing is complete! Your file is now ready for download.",
            //   show: true,
            // }
            // setPopInfo(popupData);
            showToastMessage("The image background is complete! Your file is now ready for download.");
            setVisibleSection("25b49f1d-b72e-4d2e-8ded-7ac98fe3184e");
            setActiveSection("");
        }
    };
    useEffect(() => { }, [presetImageCount]);

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

    const checkData = () => {
        setStoreData(() => location.state.selectedImages);
        navigate(".", { state: null })
    }
    useEffect(() => {
        location.state ? location.state.selectedImages
            && checkData()
            : navigate("/");
    }, [])


    // useEffect(() => {
    //   uploadFile();
    //   window.scroll(0, 0);
    //   document.getElementById("frame-container").innerHTML = "";
    // }, []);

    useEffect(() => {
        if (storeData.length > 0 && runOnceTime == false) {
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
            if (availableProccesFile.length > 0) {
                const index = storeData.findIndex(item => item.src === availableProccesFile[0].src);
                setOpenImg(() => index);
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
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    };

    const handleImageChange = (event) => {
        setActionData(null);
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
                if (data.status_code == 200 && data.results.order_detail_charge_breakdown.length > 0) {

                    const imagePoint = parseInt(data.results.order_detail_charge_breakdown[0].point);

                    if (imagePoint > 0) {
                        setInvoice(data);
                        setModalOpen(true)
                    } else {
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
        setActiveSection("");
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

    const protoucheHandle = () => {
        const popupData = {
            message: `
           <div style="padding:10px">
            <p style="text-align:left">Dear user_name, this is to confirm that we have received your edited/all_photos for the Pro-Touch feature. We will notify you shortly after your request has been processed.</p>
            <br>
            <p style="text-align:left">Thank you</p>
           </div>
            `,
            show: true,
        }
        setPopInfo(popupData);
    }

    const resizeHandler = (width, height) => {
        setResizeOption({
            width: width,
            height: height
        })
        setOpenCustomSize(false);
    }
    const customResizeHandler = (width, height) => {

        setResizeOption((prevData) => ({
            ...prevData,
            ...(width ? { width } : {}), // Update width only if a valid value is provided
            ...(height ? { height } : {}) // Update height only if a valid value is provided
        }));
    }
    return (
        <div>
            {
                console.log("storeData", storeData)
            }
            {
                console.log("getTotalImage", getTotalImage, "proccessFailCount", proccessFailCount, "getProccessImgIndex", getProccessImgIndex, 'countImageCallIndex', countImageCallIndex)
            }
            <div className='flex flex-col'>
                <div className='lg:border-b-[1px] border-solid border-black'>
                    <div className='container mx-auto px-3 lg:px-0'>
                        <div className='flex flex-col lg:grid lg:grid-cols-[300px_auto_287px]  '>
                            <div className='flex flex-col lg:border-r-[1px] border-solid border-black'>
                                <div className='flex flex-col gap-2 pt-[17px] pb-2 lg:border-b-[1px] border-solid border-[#CCCBCB]'>
                                    <h3 className='text-2xl font-bold font-jakarta leading-7'>Your Uploaded Photos</h3>
                                    <div className='flex gap-[5px] items-center'>
                                        {
                                            getProccessImgIndex == storeData.length ?
                                                <span><img src='/images/v-4/icons/tabler_progress-check.svg' /></span>
                                                :
                                                <span className='animate-spin'><img src="/images/v-4/icons/tabler_progress.svg" alt="" /></span>
                                        }
                                        <p className='text-[#5A5555] text-sm font-medium leading-none'><span>{getProccessImgIndex}</span>/<span>{storeData.length}</span> Images Processed</p>
                                    </div>
                                </div>
                                <div className='h-[151px] lg:h-[430px] overflow-y-auto'>
                                    <div className='grid grid-cols-4 lg:grid-cols-3 gap-x-[22px] gap-y-[16px] pt-[20px]'>

                                        {
                                            storeData.length == (proccessFailCount + getProccessImgIndex) ?

                                                <button
                                                    onClick={() =>
                                                        document
                                                            .getElementById("singleImagePick")
                                                            .click()
                                                    }
                                                    className='w-full lg:w-[78px]  h-[75px] md:h-28 lg:h-[55px] bg-[#87E17F] border-[2px] border-solid border-[#34A853] flex justify-center items-center rounded overflow-hidden'>
                                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.34502 4.017C10.4389 3.67445 13.5611 3.67445 16.655 4.017C18.368 4.209 19.75 5.558 19.951 7.277C20.3176 10.415 20.3176 13.585 19.951 16.723C19.75 18.442 18.368 19.791 16.655 19.983C13.5611 20.3256 10.4389 20.3256 7.34502 19.983C5.63202 19.791 4.25002 18.442 4.04902 16.723C3.68247 13.5853 3.68247 10.4157 4.04902 7.278C4.15069 6.44287 4.5314 5.66655 5.12945 5.07485C5.7275 4.48315 6.50785 4.11075 7.34402 4.018M12 7.007C12.1989 7.007 12.3897 7.08602 12.5303 7.22667C12.671 7.36732 12.75 7.55809 12.75 7.757V11.25H16.243C16.4419 11.25 16.6327 11.329 16.7733 11.4697C16.914 11.6103 16.993 11.8011 16.993 12C16.993 12.1989 16.914 12.3897 16.7733 12.5303C16.6327 12.671 16.4419 12.75 16.243 12.75H12.75V16.243C12.75 16.4419 12.671 16.6327 12.5303 16.7733C12.3897 16.914 12.1989 16.993 12 16.993C11.8011 16.993 11.6103 16.914 11.4697 16.7733C11.329 16.6327 11.25 16.4419 11.25 16.243V12.75H7.75702C7.55811 12.75 7.36734 12.671 7.22669 12.5303C7.08604 12.3897 7.00702 12.1989 7.00702 12C7.00702 11.8011 7.08604 11.6103 7.22669 11.4697C7.36734 11.329 7.55811 11.25 7.75702 11.25H11.25V7.757C11.25 7.55809 11.329 7.36732 11.4697 7.22667C11.6103 7.08602 11.8011 7.007 12 7.007Z" fill="#255646" />
                                                    </svg></span>
                                                </button>
                                                :
                                                <button className='cursor-not-allowed w-full lg:w-[78px]  h-[75px] md:h-28 lg:h-[55px] bg-gray-200 border-[2px] border-solid border-gray-400 flex justify-center items-center rounded overflow-hidden'>
                                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.34502 4.017C10.4389 3.67445 13.5611 3.67445 16.655 4.017C18.368 4.209 19.75 5.558 19.951 7.277C20.3176 10.415 20.3176 13.585 19.951 16.723C19.75 18.442 18.368 19.791 16.655 19.983C13.5611 20.3256 10.4389 20.3256 7.34502 19.983C5.63202 19.791 4.25002 18.442 4.04902 16.723C3.68247 13.5853 3.68247 10.4157 4.04902 7.278C4.15069 6.44287 4.5314 5.66655 5.12945 5.07485C5.7275 4.48315 6.50785 4.11075 7.34402 4.018M12 7.007C12.1989 7.007 12.3897 7.08602 12.5303 7.22667C12.671 7.36732 12.75 7.55809 12.75 7.757V11.25H16.243C16.4419 11.25 16.6327 11.329 16.7733 11.4697C16.914 11.6103 16.993 11.8011 16.993 12C16.993 12.1989 16.914 12.3897 16.7733 12.5303C16.6327 12.671 16.4419 12.75 16.243 12.75H12.75V16.243C12.75 16.4419 12.671 16.6327 12.5303 16.7733C12.3897 16.914 12.1989 16.993 12 16.993C11.8011 16.993 11.6103 16.914 11.4697 16.7733C11.329 16.6327 11.25 16.4419 11.25 16.243V12.75H7.75702C7.55811 12.75 7.36734 12.671 7.22669 12.5303C7.08604 12.3897 7.00702 12.1989 7.00702 12C7.00702 11.8011 7.08604 11.6103 7.22669 11.4697C7.36734 11.329 7.55811 11.25 7.75702 11.25H11.25V7.757C11.25 7.55809 11.329 7.36732 11.4697 7.22667C11.6103 7.08602 11.8011 7.007 12 7.007Z" fill="#9ca3af" />
                                                    </svg></span>
                                                </button>

                                        }
                                        {
                                            storeData.map((data, index) =>

                                                <button
                                                    onClick={() => viewImage(index)}
                                                    disabled={data.proccessImage && data.proccessImage.output_urls ? false : true}
                                                    key={index}
                                                    className={`relative w-full lg:w-[78px]  h-[75px] md:h-28 lg:h-[55px] flex justify-center items-center rounded overflow-hidden ${data.proccessImage && data.proccessImage.output_urls ? "" : "opacity-40"}  ${getOpenImg == index && 'border-[2px] border-solid border-black'} ${data.rework  == false ? "block" : "hidden"}`}>
                                                    <img
                                                        src={data.src}
                                                        alt="" />
                                                    {
                                                        data.history.length > 0 &&
                                                        <span className='absolute bottom-1 right-1'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M12.6667 2C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H12.6667ZM11.1333 6.23333C11.28 6.09333 11.28 5.86 11.1333 5.72L10.28 4.86667C10.247 4.83176 10.2072 4.80396 10.1631 4.78496C10.1189 4.76596 10.0714 4.75616 10.0233 4.75616C9.97529 4.75616 9.92774 4.76596 9.88361 4.78496C9.83948 4.80396 9.79969 4.83176 9.76667 4.86667L9.1 5.53333L10.4667 6.9L11.1333 6.23333ZM4.66667 9.96V11.3333H6.04L10.08 7.29333L8.70667 5.92L4.66667 9.96Z" fill="#FBBC05" />
                                                            </svg>
                                                        </span>
                                                    }
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='px-8 py-4 flex flex-col gap-[18px]'>
                                {/* aftebefore area */}

                                <div>
                                    {storeData.length > 0 &&
                                        storeData.map((data, index) => (
                                            <>
                                                <div className={`${getOpenImg == index ? "block" : "hidden"}`}>
                                                    <AfterBeforeImageV4 proccesImages={data} counte={prCount} visibleSection={visibleSection} actionData={getActionData} />
                                                </div>
                                            </>
                                        ))}
                                </div>
                            </div>
                            <div className='flex flex-col pl-[30px] pt-[16px]'>
                                <div className='flex flex-col gap-[18px] pb-[19px] border-b-[1px] border-solid border-[#CCCBCB] '>
                                    <h3 className='font-jakarta text-2xl font-bold'>Select Format</h3>
                                    <div className='flex flex-col gap-4'>
                                        <div className="form-group form-check grid grid-cols-[20px_auto] gap-1">
                                            <div className=' h-[19px] w-[19px] flex flex-col items-center justify-center border-2 border-black rounded-full'>
                                                <input
                                                    checked={getImgType == "png"}
                                                    onChange={() => setImgType("png")}

                                                    className="form-check-input rounded-full appearance-none h-[9px] w-[9px] border-2 border-none bg-white checked:bg-[#009024] focus:outline-none transition duration-200 cursor-pointer"
                                                    type="radio"
                                                    id="png"
                                                    name="download_type"
                                                />
                                            </div>
                                            <label htmlFor="png" className="cursor-pointer flex flex-col">
                                                <span className='font-jakarta text-base font-medium'>PNG</span>
                                                <span className='text-[#726C6C] text-xs font-bold'>Need a transparent background?</span>
                                                <span className='text-[#726C6C] text-xs font-medium leading-[14px]'>Download as PNG for crisp, high-quality images perfect for logos, graphics, and web use.</span>
                                            </label>
                                        </div>
                                        <div className="form-group form-check grid grid-cols-[20px_auto] gap-1">
                                            <div className=' h-[19px] w-[19px] flex flex-col items-center justify-center border-2 border-black rounded-full'>
                                                <input
                                                    checked={getImgType == "jpg"}
                                                    onChange={() => setImgType("jpg")}
                                                    className="form-check-input rounded-full appearance-none h-[9px] w-[9px] border-2 border-none bg-white checked:bg-[#009024] focus:outline-none transition duration-200 cursor-pointer"
                                                    type="radio"
                                                    id="jpg"
                                                    name="download_type"
                                                />
                                            </div>

                                            <label htmlFor="jpg" className="cursor-pointer flex flex-col">
                                                <span className='font-jakarta text-base font-medium'>JPG</span>
                                                <span className='text-[#726C6C] text-xs font-bold'>Looking for smaller file sizes?</span>
                                                <span className='text-[#726C6C] text-xs font-medium leading-[14px]'>Choose JPG for easy sharing, faster loading, and great quality for photos or online content.</span>
                                            </label>
                                        </div>
                                        <div className="form-group form-check grid grid-cols-[20px_auto] gap-1">
                                            <div className=' h-[19px] w-[19px] flex flex-col items-center justify-center border-2 border-black rounded-full'>
                                                <input
                                                    checked={getImgType == "psd"}
                                                    onChange={() => setImgType("psd")}
                                                    className="form-check-input rounded-full appearance-none h-[9px] w-[9px] border-2 border-none bg-white checked:bg-[#009024] focus:outline-none transition duration-200 cursor-pointer"
                                                    type="radio"
                                                    id="PSD"
                                                    name="download_type"
                                                />
                                            </div>
                                            <label htmlFor="PSD" className="cursor-pointer flex flex-col">
                                                <span className='font-jakarta text-base font-medium'>PSD</span>
                                                <span className='text-[#726C6C] text-xs font-bold'>Want to edit later?</span>
                                                <span className='text-[#726C6C] text-xs font-medium leading-[14px]'>Go with PSD to keep all layers intact for advanced editing in Photoshop.</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-[18px] pt-4'>
                                    <div className='flex flex-col gap-2'>
                                        <button disabled className='cursor-not-allowed border-[1px] border-solid border-black rounded bg-[#255646] py-[14px] flex justify-center items-center gap-[5px] text-sm text-white font-medium leading-none'>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                                                    <path d="M9.49995 8.62499V15M9.49995 15L11.75 12.75M9.49995 15L7.24995 12.75M6.49995 5.27699C7.06091 5.35808 7.58056 5.61856 7.9812 6.01949M13.625 10.5C14.7642 10.5 15.5 9.57674 15.5 8.43749C15.4999 7.98645 15.352 7.54786 15.0789 7.18889C14.8059 6.82993 14.4226 6.57037 13.988 6.44999C13.9211 5.60883 13.5725 4.81481 12.9985 4.19631C12.4245 3.5778 11.6587 3.17096 10.8248 3.04156C9.991 2.91215 9.13789 3.06776 8.40344 3.4832C7.66899 3.89865 7.09612 4.54966 6.77745 5.33099C6.10652 5.145 5.38919 5.23316 4.78326 5.57607C4.17733 5.91898 3.73243 6.48855 3.54645 7.15949C3.36047 7.83042 3.44863 8.54775 3.79154 9.15368C4.13445 9.75961 4.70402 10.2045 5.37495 10.3905" stroke="white" stroke-opacity="0.5" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                            <span>Download</span>
                                        </button>
                                        <div className='flex items-center justify-center gap-[6px]'>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M6 4H6.004M6 8V5.5M11 6C11 8.7615 8.7615 11 6 11C3.2385 11 1 8.7615 1 6C1 3.2385 3.2385 1 6 1C8.7615 1 11 3.2385 11 6Z" stroke="#5B626C" strokeWidth="0.875" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                            <span className='text-[#5B626C] text-xs font-normal'>654x472 pixels</span>

                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <button
                                            disabled={getProccessImgIndex == 0}
                                            onClick={downloadLatestFunc}
                                            className='border-[1px] border-solid border-black rounded bg-[#87E17F] py-[14px] flex justify-center items-center gap-[5px] text-sm text-black font-medium leading-none'>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                                                    <path d="M9.49995 8.62499V15M9.49995 15L11.75 12.75M9.49995 15L7.24995 12.75M6.49995 5.27699C7.06091 5.35808 7.58056 5.61856 7.9812 6.01949M13.625 10.5C14.7642 10.5 15.5 9.57674 15.5 8.43749C15.4999 7.98645 15.352 7.54786 15.0789 7.18889C14.8059 6.82993 14.4226 6.57037 13.988 6.44999C13.9211 5.60883 13.5725 4.81481 12.9985 4.19631C12.4245 3.5778 11.6587 3.17096 10.8248 3.04156C9.991 2.91215 9.13789 3.06776 8.40344 3.4832C7.66899 3.89865 7.09612 4.54966 6.77745 5.33099C6.10652 5.145 5.38919 5.23316 4.78326 5.57607C4.17733 5.91898 3.73243 6.48855 3.54645 7.15949C3.36047 7.83042 3.44863 8.54775 3.79154 9.15368C4.13445 9.75961 4.70402 10.2045 5.37495 10.3905" stroke="black" stroke-opacity="0.5" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                            <span>Download All Images</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='container mx-auto px-3 lg:px-0'>
                        <div className='flex flex-col pt-8 lg:pt-0 lg:grid lg:grid-cols-[300px_auto]'>
                            <div className='flex flex-col gap-[23px] pt-[16px] pb-[50px] pr-[42px]  lg:border-r-[1px] border-solid border-black '>
                                {/* <h3 className='font-jakarta text-2xl font-bold'>History</h3>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex justify-between text-xs font-medium text-[#726C6C] pb-2 border-b-[1px] border-solid border-[#CCCBCB]'><span>Background removed</span><span>2 mins ago</span></div>
                                    <div className='flex justify-between text-xs font-medium text-[#726C6C] pb-2 border-b-[1px] border-solid border-[#CCCBCB]'><span>Background removed</span><span>2 mins ago</span></div>
                                    <div className='flex justify-between text-xs font-medium text-[#726C6C] pb-2 border-b-[1px] border-solid border-[#CCCBCB]'><span>Background removed</span><span>2 mins ago</span></div>
                                </div> */}
                            </div>
                            <div className='flex flex-col gap-[23px] pt-[17px] lg:pl-[41px] pb-10'>
                                <div className=' flex flex-col gap-3'>
                                    <h3 className='font-jakarta text-2xl font-bold'>Choose Features</h3>
                                    <div className='flex flex-col lg:flex-row gap-[15px]'>
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
                                                            //   onClick={() => featureSwitchHandler('protouch')}
                                                            className={`px-4 py-2 border-[2px] border-solid border-[#255646] flex gap-1 rounded items-center text-sm font-medium font-jakarta 
                                                            ${activeSection === data.id && 'bg-[#87E17F]'}
                                                            ${getTotalImage !== (proccessFailCount + getProccessImgIndex) && 'cursor-not-allowed'}
                                                            `}>
                                                            <span className='flex w-4 h-6 justify-end items-center'>
                                                                {/* <img src='/images/v-4/icons/f7_wand-rays.svg' alt='btn-icon' /> */}
                                                                <img
                                                                    src={data.fab_icon_url}
                                                                    alt="BG AI Icon"
                                                                />
                                                            </span>
                                                            <span>
                                                                {data.name}
                                                                {/* {data.id == "25b49f1d-b72e-4d2e-8ded-7ac98fe3184e" ? storeData[getOpenImg].rework ? "Cancel " + data.name : data.name : data.name} */}

                                                            </span>
                                                        </button>
                                                        //   <button
                                                        //     disabled={getTotalImage !== (proccessFailCount + getProccessImgIndex)}
                                                        //     onClick={() => handleServices(data.id)}
                                                        //     className={`text-sm font-semibold py-1 px-2 flex flex-col justify-center items-center rounded ${activeSection === data.id
                                                        //       ? "text-[#FFB752]"
                                                        //       : "text-black"
                                                        //       }`}
                                                        //   >
                                                        //     <img
                                                        //       className="w-[20px]"
                                                        //       src={data.fab_icon_url}
                                                        //       alt="BG AI Icon"
                                                        //     />
                                                        //     {data.id == "25b49f1d-b72e-4d2e-8ded-7ac98fe3184e" ? storeData[getOpenImg].rework ? "Cancel " + data.name : data.name : data.name}
                                                        //   </button>


                                                    )}

                                                </>))}
                                        {/* 
                                        <button onClick={() => featureSwitchHandler('protouch')} className={`px-4 py-2 border-[2px] border-solid border-[#255646] flex gap-1 rounded items-center text-sm font-medium font-jakarta ${featrueSwitch === 'protouch' && 'bg-[#87E17F]'}`}>
                                            <span className='flex w-4 h-6 justify-end items-center'>
                                                <img src='/images/v-4/icons/f7_wand-rays.svg' alt='btn-icon' /></span>
                                            <span>Pro-Touch</span>
                                        </button>
                                        <button onClick={() => featureSwitchHandler('presets')} className={`px-4 py-2 border-[2px] border-solid border-[#255646] flex gap-1 rounded items-center text-sm font-medium font-jakarta ${featrueSwitch === 'presets' && 'bg-[#87E17F]'}`}>
                                            <span className='flex w-4 h-6 justify-end items-center'>
                                                <img src='/images/v-4/icons/feature-btn/mingc.svg' alt='btn-icon' /></span>
                                            <span>Free Presets</span>
                                        </button>
                                        <button onClick={() => featureSwitchHandler('gnbg')} className={`px-4 py-2 border-[2px] border-solid border-[#255646] flex gap-1 rounded items-center text-sm font-medium font-jakarta ${featrueSwitch === 'gnbg' && 'bg-[#87E17F]'}`}>
                                            <span className='flex w-4 h-6 justify-end items-center'>
                                                <img src='/images/v-4/icons/feature-btn/streamline_ai-generate-landscape-image-spark.svg' alt='btn-icon' /></span>
                                            <span>Generate Background</span>
                                        </button>
                                        <button onClick={() => featureSwitchHandler('resize')} className={`px-4 py-2 border-[2px] border-solid border-[#255646] flex gap-1 rounded items-center text-sm font-medium font-jakarta ${featrueSwitch === 'resize' && 'bg-[#87E17F]'}`}>
                                            <span className='flex w-4 h-6 justify-end items-center'>
                                                <img src='/images/v-4/icons/feature-btn/fluent_resize-large-16-regular.svg' alt='btn-icon' /></span>
                                            <span>Resize Photo</span>
                                        </button> */}
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    {/* protouch area */}
                                    {visibleSection === "25b49f1d-b72e-4d2e-8ded-7ac98fe3184e" &&
                                        <div className='flex flex-col gap-3'>
                                            {/* <div className='flex flex-col lg:flex-row gap-7 items-center'>
                                                <div className='flex justify-center items-center'>
                                                    <input
                                                        className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                        type="radio" id="protouch-single" name="protouch" value="touch-single" />
                                                    <label className='font-jakarta text-sm font-semibold' for="protouch-single">Send <span className='underline'>Edited</span> Photos for Pro-Touch</label>
                                                </div>

                                                <div className='flex justify-center items-center'>
                                                    <input
                                                        className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                        type="radio" id="protouch-all" name="protouch" value="touch-all" />
                                                    <label className='font-jakarta text-sm font-semibold' for="protouch-all">Send <span className='underline'>All</span> Photos for Pro-Touch</label>
                                                </div>
                                            </div> */}
                                            <div className='flex flex-col lg:flex-row gap-3 items-end'>
                                                {/* <div className='flex w-full lg:w-auto relative'>
                                                    <textarea
                                                        onChange={(e) => setReworkText(() => e.target.value)}
                                                        maxLength={300}
                                                        className={`w-full lg:w-[439px] h-[148px] mt-1 resize-none text-black  shadow-lg focus:outline-none  text-sm box-border p-3 overflow-auto  rounded-tl-lg rounded border-solid border-[1px] border-black `}
                                                        placeholder="Please Provide Instruction"
                                                        rows=""
                                                    ></textarea>
                                                    <span className=' text-sm font-medium text-black absolute right-1 bottom-1'>Char:{getReworkText.length}/300</span>

                                                </div> */}
                                                <div className='flex flex-col gap-2 w-full lg:w-auto'>
                                                    <div className='flex gap-3 flex-wrap w-full lg:w-[650px] max-h-[214px] overflow-y-auto'>
                                                        {
                                                            storeData.map((data, index) =>
                                                                <div className={`w-24 h-16 rounded shadow cursor-pointer group relative flex-col justify-center items-center overflow-hidden ${data.rework ? "flex" : "hidden"}`}>
                                                                    <img 
                                                                        onClick={() =>
                                                                            viewImage(index)
                                                                        } src={data.src} alt="" />
                                                                        <span
                                                                        onClick={()=>handleReworkRemove(storeData[index].rework, index)}
                                                                         className='w-[20px] h-[20px] hidden group-hover:flex justify-center items-center absolute right-[2px] top-[2px] cursor-pointer bg-white rounded-full text-red-700 border-red-700 border-[1px] border-solid font-bold text-xs'><span>x</span></span>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                    <div className='flex flex-col gap-2'>
                                                        <button
                                                        disabled={getTotalImage !== (proccessFailCount + getProccessImgIndex)}

                                                            onClick={reworkTransfer}
                                                            className='disabled:bg-gray-400 disabled:cursor-not-allowed border-[1px] border-solid border-black rounded bg-[#255646] py-[14px] px-[24px] flex justify-center items-center gap-[5px] text-sm text-white font-medium leading-none'>
                                                            <span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                    <path d="M8.58995 11.41L12.6283 7.37167M16.7583 4.90833L13.3499 15.9867C13.0441 16.98 12.8916 17.4767 12.6274 17.6408C12.515 17.7111 12.3873 17.7535 12.2551 17.7645C12.1229 17.7756 11.99 17.7549 11.8674 17.7042C11.5808 17.585 11.3474 17.1208 10.8824 16.1908L8.72411 11.8725C8.67998 11.7725 8.62611 11.677 8.56328 11.5875C8.51993 11.531 8.46952 11.4803 8.41328 11.4367C8.32646 11.3764 8.2341 11.3245 8.13745 11.2817L3.80995 9.11667C2.88078 8.65167 2.41578 8.41917 2.29661 8.1325C2.24578 8.00981 2.22501 7.87675 2.23603 7.74441C2.24704 7.61206 2.28953 7.48426 2.35995 7.37167C2.52411 7.10833 3.02078 6.955 4.01411 6.64917L15.0933 3.24083C15.8741 3 16.2641 2.88 16.5283 2.9775C16.6418 3.01917 16.7448 3.08503 16.8303 3.1705C16.9158 3.25598 16.9816 3.35903 17.0233 3.4725C17.1199 3.73583 16.9999 4.12584 16.7599 4.90584L16.7583 4.90833Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </span>
                                                            <span>Request Pro-Touch</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {/* Free presets area */}
                                    {visibleSection === "81206d6f-e2e5-46e8-836e-b657ab504392" &&
                                        <div className='flex flex-col gap-3'>
                                            <div className='flex gap-3 font-jakarta text-sm font-semibold'>
                                                <button className={`${presetSwitch == 'colours' && 'underline'}`} onClick={() => presetSwitchHandler('colours')}>Colours</button>
                                                <button className={`${presetSwitch == 'backgrounds' && 'underline'}`} onClick={() => presetSwitchHandler('backgrounds')}>Background</button>
                                            </div>
                                            <div className='flex flex-col'>
                                                {
                                                    presetSwitch == 'colours' &&
                                                    <div>
                                                        <div className='flex flex-wrap lg:flex-nowrap gap-3'>
                                                            {
                                                                colorList.map((color, index) =>
                                                                    <button
                                                                        onClick={() => setActionData(color)}
                                                                        className='flex w-[42px] h-[42px] border-[2px] border-solid border-black rounded-full p-[3px]'>
                                                                        <span style={{ backgroundColor: color }} className='w-full h-full rounded-full'></span>
                                                                    </button>
                                                                )
                                                            }
                                                            <div
                                                                onClick={() =>
                                                                    document
                                                                        .getElementById("colorPick")
                                                                        .click()
                                                                }
                                                                // style={{ backgroundColor: customColorPick ? customColorPick : "white" }}
                                                                className='flex w-[42px] h-[42px] border-[2px] border-solid border-black rounded-full p-[3px]'                                                                    >
                                                                <span className='flex items-center justify-center w-full h-full bg-[#726C6C] rounded-full relative'>
                                                                    <span className='absolute'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                                            <path d="M13.5 9.75H9.75V13.5C9.75 13.9125 9.4125 14.25 9 14.25C8.5875 14.25 8.25 13.9125 8.25 13.5V9.75H4.5C4.0875 9.75 3.75 9.4125 3.75 9C3.75 8.5875 4.0875 8.25 4.5 8.25H8.25V4.5C8.25 4.0875 8.5875 3.75 9 3.75C9.4125 3.75 9.75 4.0875 9.75 4.5V8.25H13.5C13.9125 8.25 14.25 8.5875 14.25 9C14.25 9.4125 13.9125 9.75 13.5 9.75Z" fill="white" />
                                                                        </svg>
                                                                    </span>
                                                                </span>
                                                                <input
                                                                    onChange={handleColorChange}
                                                                    className='opacity-0 h-0 w-0' id="colorPick" name="color" type="color" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    presetSwitch == 'backgrounds' &&
                                                    <div className='flex gap-[21px] flex-wrap'>
                                                        {
                                                            presetRowImgList.map((item, index) =>

                                                                <div
                                                                    onClick={() => setActionData(item)}
                                                                    className='flex flex-col gap-[21px] w-[78px] h-[55px] rounded overflow-hidden'>
                                                                    <img src={item} alt='' />
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                }
                                                <div className='pt-[9px] flex flex-col gap-[10px]'>
                                                    <div className='flex items-center gap-1'>
                                                        <input
                                                            onChange={() => setpresetApplyBool(!presetApplyBool)}
                                                            checked={presetApplyBool}
                                                            type='checkbox' />
                                                        <span className='text-xs font-medium text-[#5A5555] leading-6'>Apply to all images</span>
                                                    </div>
                                                    <div>
                                                        <button
                                                        disabled={getTotalImage !== (proccessFailCount + getProccessImgIndex)}
                                                            onClick={sendForPreset}
                                                            className='font-jakarta bg-[#255646]  disabled:bg-gray-400 disabled:cursor-not-allowed rounded text-sm font-medium text-white py-[14px] px-[40px] border-[1px] border-solid border-black'>Apply</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {/* Generate BG area */}
                                    {visibleSection === "25b49f1d-b72e-4d2e-8ded-7ac98fe3194e" &&
                                        <div className='flex flex-col lg:flex-row gap-[20px]'>
                                            <div className='flex flex-col w-full lg:w-auto'>
                                                <div className='w-full lg:w-auto'>
                                                    <div className='flex flex-col w-full lg:w-auto'>
                                                        <textarea
                                                            onChange={(e) => setAiPromt(() => e.target.value)}
                                                            maxLength={200}
                                                            className={`w-full lg:w-[577px] h-[117px] mt-1 resize-none text-black  shadow-lg focus:outline-none  text-sm box-border p-3 overflow-auto rounded-t border-solid border-t-[1px] border-l-[1px] border-r-[1px] border-black `}
                                                            placeholder="Sea as a background"
                                                            rows=""
                                                        ></textarea>
                                                        <button disabled={imageLoader} onClick={generateBgFirstCall} className={`${imageLoader ? "bg-gray-500 cursor-default" : "bg-[#87E17F]  cursor-pointer"} rounded-b  w-full p-1 text-center text-black border-b-[1px] border-l-[1px] border-r-[1px] border-black border-solid`}>Generate</button>
                                                    </div>
                                                    <div className='flex justify-end'>
                                                        <span className='text-[#606060] text-xs font-semibold'>{getAiPromt.length}/200 character</span>
                                                    </div>
                                                </div>

                                                <div className='flex flex-col gap-[10px]'>
                                                    <div className='flex items-center gap-1'>

                                                        <input
                                                            type='checkbox'
                                                            onChange={() => setpresetApplyBool(!presetApplyBool)}
                                                            checked={presetApplyBool}
                                                        />
                                                        <span className='text-xs font-medium text-[#5A5555] leading-6'>Apply to all images</span>
                                                    </div>
                                                    <div>
                                                        <button
                                                            // disabled={getAiPromt.length == 0 || imageLoader && getActionData.length > 0}
                                                            disabled={getAiPromt.length == 0 ? true : getAiImageSelect}
                                                            onClick={sendForPreset}
                                                            className={`font-jakarta bg-[#255646] disabled:bg-gray-400 disabled:cursor-not-allowed rounded text-sm font-medium text-white py-[14px] px-[40px] border-[1px] border-solid border-black `}>Apply</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-4 2xl:grid-cols-5 h-[155px] w-full gap-[22px]'>
                                                {
                                                    loadingImages.map((item, index) => (
                                                        gnImageList[index] ?

                                                            <div
                                                                onClick={() =>{setAiImageSelect(false); setActionData(gnImageList[index])}}
                                                                key={index}
                                                                className={`cursor-pointer h-[66px] rounded overflow-hidden flex flex-col ${gnImageList[index] == getActionData ? "border-[3px] border-green-700" : ""}`}>
                                                                <img src={gnImageList[index]} alt="prompt generated image" />
                                                            </div>
                                                            :
                                                            <div className='h-[66px] w-full rounded overflow-hidden relative flex flex-col justify-center items-center bg-slate-100 shadow-lg'>
                                                                <div className="absolute top-0 right-0 w-full h-full bg-gray-800 opacity-85 animate-pulse" />
                                                            </div>
                                                    ))
                                                }

                                                {/* {
                                                    presetRowImgList.map((item, index) =>

                                                        <div key={index} className=' h-[66px] rounded overflow-hidden flex flex-col'>
                                                            <img src={item} alt='' />
                                                        </div>
                                                    )
                                                } */}
                                            </div>
                                        </div>
                                    }
                                    {/* Resize Photo area */}
                                    {visibleSection === "1d4fe99a-ac36-4a22-b15d-db864acaaa01" &&

                                        <div className='flex flex-col gap-[17px]'>
                                            <div className='flex flex-col lg:flex-row gap-5'>
                                                <div className='flex'>
                                                    <input
                                                        onChange={() => resizeHandler("1000", "722")
                                                        }
                                                        className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                        type="radio" id="sizeOne" name="fav_language" value="sizeOne" />
                                                    <label
                                                        className='font-jakarta text-base font-medium'
                                                        for="sizeOne">1000x722</label>
                                                </div>

                                                <div className='flex'>
                                                    <input
                                                        onChange={() => resizeHandler('1440', '1040')}
                                                        className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                        type="radio" id="sizeTwo" name="fav_language" value="sizeTwo" />
                                                    <label
                                                        className='font-jakarta text-base font-medium'
                                                        for="sizeTwo">1440x1040</label>
                                                </div>

                                                <div className='flex'>
                                                    <input
                                                        onChange={() => resizeHandler('2448', '1768')}
                                                        className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                        type="radio" id="sizeThree" name="fav_language" value="sizeThree" />
                                                    <label
                                                        className='font-jakarta text-base font-medium'
                                                        for="sizeThree">2448x1768</label>
                                                </div>

                                                <div className='flex'>
                                                    <input
                                                        onChange={() => setOpenCustomSize(true)}
                                                        className="form-check-input rounded-full  appearance-none h-4 w-4 border-2 border-[#003333]  bg-white checked:bg-[#003333] checked:border-[#003333] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                        type="radio" id="sizeFour" name="fav_language" value="sizeFour" />
                                                    <label
                                                        className='font-jakarta text-base font-medium pr-4'
                                                        for="sizeFour">Custom Size</label>
                                                    {
                                                        openCustomSize &&
                                                        <div className='flex gap-2'>
                                                            <input
                                                                onChange={(e) => customResizeHandler(e.target.value, '')}
                                                                className='w-16 px-3 border-[1px] border-solid border-gray-500 rounded'
                                                                placeholder='width' type='text' />
                                                            <input
                                                                onChange={(e) => customResizeHandler('', e.target.value)}
                                                                className='w-16 px-3 border-[1px] border-solid border-gray-500 rounded'
                                                                placeholder='height' type='text' />
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-[10px]'>
                                                <div className='flex items-center gap-1'>
                                                    <input
                                                        type='checkbox'
                                                        onChange={() => setResizeAllApplyBool(!resizeAllApplyBool)}
                                                        checked={resizeAllApplyBool}
                                                    />
                                                    <span className='text-xs font-medium text-[#5A5555] leading-6'>Apply to all images</span>
                                                </div>
                                                <div>
                                                    <button
                                                    disabled={getTotalImage !== (proccessFailCount + getProccessImgIndex)}
                                                        onClick={sendForResize}
                                                        className='font-jakarta bg-[#255646] disabled:bg-gray-400 disabled:cursor-not-allowed rounded text-sm font-medium text-white py-[14px] px-[40px] border-[1px] border-solid border-black'>Apply</button>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    {
                                        loaderBool &&
                                        <div className='fixed top-0 left-0 w-full h-full flex z-50'>
                                            <div className='m-auto z-40'>
                                                <div className="loader_resize"></div>
                                            </div>
                                            <div className='absolute top-0 left-0 w-full h-full bg-slate-800 opacity-20'></div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <input
                onChange={uploadNewFile}
                type="file"
                id="singleImagePick"
                name="imageFile"
                className="hidden"
                accept="image/jpeg, image/png, image/tiff,.tif"
                multiple
            />
            {
                popupInfo.show &&
                <PopUpInfo msg={popupInfo.message} dark={true} callBackPopupClose={callBackPopupClose} />
            }
            <div id="frame-container"></div>
            <ToastContainer />
            {getPopBool && <PopupMessage dark={true} msg={getMsg} callBackCloseFunc={PopupCloseFunc} />}

        </div>
    );
};

export default UploadImage;