import React, { useContext, useEffect, useState } from 'react'
// import free from '../images/free.png'
// import enterprise from '../images/enterprise.png'
import { OrderContextManager, apiUrlContextManager, userContextManager } from '../../App';

import SignInForm from '../SignInForm/SignInForm';
import localforage from 'localforage';
import PopupMessage from '../PopUp/PopupMessage';
// import './pricing.css'

const SubscriptionPlan = () => {

    const [isModOpen, setIsModOpen] = useState(false);
    const [getSubscribId, setSubscribId] = useState("");
    const [getTotalPrice, setTotalPrice] = useState("");
    const [getSubscribtionValue, setSubscribtionValue] = useState("")
    const [getPopBool, setPopBool] = useState(false);
    const [getMsg, setMsg] = useState('');

    const subscriptionPlanFunc = (value) => {
        setSubscribtionValue(value);
    }


    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getServiceTypeId, setServiceTypeId, getSubscriptionPlanId, setSubscriptionPlanId, getOrderMasterId, setOrderMasterId, getCostDetails, setCostDetails] = useContext(OrderContextManager);
    const [getSubscriptionPlan, setSubscriptionPlan] = useState([])
    const [showSignInForm, setShowSignInForm] = useState(false);
    const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);

    const navigate = useNavigate();
    const openModal = (id) => {
     
        setIsModOpen(true);
        setSubscribId(id)
        // setSubscriptionPlanId(id)
    };

    const closeModal = () => {
        setIsModOpen(false);
    };
    const okayButton = () => {
    
        checkoutFunc(getSubscribId)
        setSubscriptionPlanId(getSubscribId)
        closeModal()
    }
    const getSubscriptionFunc = () => {

        console.log(getToken)
        fetch(getApiBasicUrl + `/api/2023-02/user-order-subscription-plan-types?order_master_image_id=${getOrderMasterId}`, {
            headers: {
                'Authorization': 'bearer ' + getToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => res.json())
            .then(data => {
            
                setSubscriptionPlan(data)
            })
    }

    const SignInHandleOpen = () => {
        setShowSignInForm(true)
    };

    const SignInHandleClose = () => {
        setShowSignInForm(false);
    }

    const updateOrderIdFunc = () => {
        const orderId = {
            "id": getOrderMasterId
        }

        fetch(getApiBasicUrl + "/api/2023-02/update-order-master-info-by-id", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'bearer ' + getToken
            },
            body: JSON.stringify(orderId),
        })
            .then((res) => res.json())
            .then((data) => {
             
            })
    }

    const checkoutFunc = (sbId) => {

       
        updateOrderIdFunc();
        // http://103.197.204.22:8008/v.03.13.23/checkout?order_master_image_id=3AD8432C-AE95-4A80-8FDD-0AEA825F8972&subscription_plan_type_id=5830BA07-B329-4724-8AF2-482B7056F52E
        fetch(`${getModelBaseUrl}checkout?order_master_image_id=${getOrderMasterId}&subscription_plan_type_id=${sbId}`, {
            headers: {
                'Authorization': 'bearer ' + getToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => res.json())
            .then(data => {
       
                // data.status_code == 200 && window.open(data.results.checkout_url, "_blank");
                data.status_code == 200 && window.open(data.results.checkout_url, "_self");
                if (data.status_code == 500) {
                    setPopBool(true)
                    setMsg(data.message)
                }
            })
    }

    // sbId = subscribe id , pr = price 
    const choosPlan = async (sbId, pr) => {
        try {
            const data = await localforage.getItem('userInfo');
            
            // This code runs once the value has been loaded
            // from the offline store.
            if (data !== null && Object.keys(data).length > 0) {
                // setTotalPrice(pr)
                openModal(sbId)
            } else {
                SignInHandleOpen()
            }
        } catch (err) {
            console.log(err);
            SignInHandleOpen()
        }

    }

    const PopupCloseFunc = () => {
        setPopBool(false);
    }
    useEffect(() => {
      
        getUserInfo.status_code == 200 ? getSubscriptionFunc() : navigate('/');
    }, [getOrderMasterId]);

    return (
        <div className='mx-auto container h-full pb-20'>

            <div>
                <h2 className='font-bold text-3xl text-[#003333] pb-16'>Choose the perfect plan for your current proccessing</h2>
            </div>
            <div className={`grid sm:grid-cols-2 lg:grid-cols-3 justify-items-center xl:mx-16`}>


                {typeof getSubscriptionPlan.results !== 'undefined' &&
                    getSubscriptionPlan.results.subscription_plan_type.map((data, index) => (
                        <div>
                            <div className={`w-[270px] lg:w-[240px] xl:w-[270px] pt-2 h-12 rounded-b-none bg-[#003333] text-white  rounded-xl ${data.is_default ? "visible" : "invisible"}`}>
                                Most Popular
                            </div>
                            <div className={`h-[420px] w-[270px] lg:w-[240px] xl:w-[270px]  mb-2 border-2 bg-white border-stone-200 shadow-x  ${data.is_default ? "rounded-t-none rounded-xl" : "rounded-xl"}`}>


                                <h2 className='text-left ml-3 mt-3  pt-1 text-[#003333]  text-lg font-bold'>{data.title}</h2>
                                <h2 className='text-left ml-3 pt-1 text-[#003333] mb-12 h-12 text-sm font-semibold'>{data.description}</h2>
                                <h2 className='text-left ml-3 mb-8 pt-1 text-[#003333]  text-4xl font-bold'><span className='text-lg mr-2'>TOTAL</span>{data.netCharge}</h2>

                                <input
                                    type="checkbox"
                                    id={"planCheck_" + index}
                                    value={data.id}
                                    hidden
                                    onChange={() => subscriptionPlanFunc(data.id)}
                                    className=" checked:bg-teal-500 rounded-full disabled:bg-red-400 "
                                />
                                <label
                                    htmlFor={"planCheck_" + index}
                                    className=" text-sm font-semibold"
                                >

                                    <button disabled={getSubscribtionValue == data.id} onClick={() => { choosPlan(data.id, data.netCharge) }} className=' w-56 lg:w-44 xl:w-56 mb-10 rounded-3xl py-3 disabled:bg-black hover:bg-white border border-[#003333] mt-1 bg-[#003333] text-white hover:text-[#003333] text-sm  font-semibold '>{data.tagline}</button>
                                </label>


                                {data.subscription_plan_type_description.map((data_2, index_2) => (
                                    <p className='text-start text-sm lg:text-xs xl:text-sm ml-2 mt-1 px-2'><i className="fa-solid fa-check mr-3 text-[#003333]"></i><span dangerouslySetInnerHTML={{ __html: data_2.description }} /></p>
                                ))}



                            </div>
                        </div>

                    ))}
                {/* 
                        <>
                            {isModOpen && (
                                <div className="absolute w-full h-full inset-0 z-50 flex flex-col items-center justify-center ">
                                    <div className="flex  bg-white w-[450px] mx-auto pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                        <div
                                            className="fixed inset-0 "
                                            aria-hidden="true"
                                            onClick={closeModal}
                                        >
                                            <div className="absolute "></div>

                                        </div>

                                        <div
                                            className="absolute flex gap-4 left-[50%] w-[780px] h-[320px] bottom-0 border border-teal-700 bg-white  text-left overflow-hidden shadow-xl transform transition-all "
                                            role="dialog"
                                            aria-modal="true"
                                            aria-labelledby="modal-headline"
                                            style={{ transform: 'translateX(-50%)' }}
                                        >
                                            <div className="priceCircle ">
                                                <h2 className='flex justify-center font-bold text-3xl'>Total</h2>
                                                <h5 className='flex justify-center font-bold text-5xl'>{getTotalPrice}</h5>
                                            </div>
                                            <div className='flex flex-col justify-center items-center'>
                                                <div className="bg-white  flex gap-6 justify-center items-center pt-5 pb-4 sm:p-6 sm:pb-4">
                                                    <div className="sm:flex sm:items-start">

                                                        <div className="mt-3 mb-6 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                            <h3
                                                                className="text-lg pt-6 pb-8 leading-6 font-bold text-gray-900"

                                                            >
                                                                <i className="fa-solid text-yellow-500  fa-circle-exclamation"></i> Confirmation: <span className='text-sm font-medium'>Redirecting to Payment Processing </span>
                                                            </h3>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" py-4 flex gap-8 justify-center ">
                                                    <button
                                                        onClick={okayButton}
                                                        className="text-white w-20 bg-green-600  px-3 py-1 rounded-md">
                                                        Okay
                                                    </button>

                                                    <button

                                                        className="text-white w-20 bg-red-500  px-3 py-1 rounded-md"
                                                        onClick={() => closeModal()}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </> */}
                <>
                    {isModOpen && (
                        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-opacity-50 bg-gray-500">
                            <div className="flex  bg-white w-[450px] mx-auto pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div
                                    className="fixed inset-0 "
                                    aria-hidden="true"
                                    onClick={closeModal}
                                >
                                    <div className="absolute inset-0 bg-gray-600 opacity-20"></div>

                                </div>

                                <div
                                    className="inline-block w-[460px] align-bottom border border-teal-700 bg-white  text-left overflow-hidden shadow-xl transform transition-all "
                                    role="dialog"
                                    aria-modal="true"
                                    aria-labelledby="modal-headline"
                                >
                                    <div className="bg-white  flex justify-center p-5">
                                        <div className="sm:flex sm:items-start">

                                            <div className="text-center sm:text-left">
                                                <h3
                                                    className="text-lg pt-6 pb-3 leading-6 font-bold text-gray-900 text-center "

                                                >
                                                    {/* <i className="fa-solid text-yellow-500  fa-circle-exclamation"></i> */}
                                                    Almost there! <span className='text-sm font-medium'>You're being redirected to our secure payment processing.</span>
                                                </h3>


                                            </div>
                                        </div>
                                    </div>
                                    <div className=" py-4 pb-3 flex gap-4 justify-center ">


                                        <button
                                            onClick={okayButton}
                                            className="text-white w-20 bg-green-600  px-1 py-1 rounded-md">
                                            Okay
                                        </button>

                                        <button

                                            className="text-white w-20 bg-red-500  px-1 py-1 rounded-md"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>





            </div>



            {/* {showSignInForm && <SignInForm onClose={SignInHandleClose} />} */}

            {getPopBool && <PopupMessage msg={getMsg} callBackCloseFunc={PopupCloseFunc} dark={true} />}


        </div>
    )
}

export default SubscriptionPlan


