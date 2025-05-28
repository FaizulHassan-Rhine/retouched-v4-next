import React, { useContext, useState } from 'react';
import SignInSignUpBtn from '../SignInSignUpBtn/SignInSignUpBtn';
import { FiXCircle } from "react-icons/fi";
import { userContextManager } from '@/context/AppContexts';



const PopUpForSignUp = ({ msg, dark = false, callBackCloseFunc }) => {
    const [getUserInfo] = useContext(userContextManager);

    return (
        <>
            <div className='fixed w-full h-full   top-0 left-0 flex justify-center items-center z-50'>
                <div className='absolute rounded-md  bg-white z-10 max-w-[400px] min-w-[300px] m-auto px-4 pb-6 bt-2  shadow-2xl '>

                    <div className='pb-8 pt-10  text-left text-lg relative'>
                        <p onClick={() => callBackCloseFunc()} className='absolute cursor-pointer  right-[-12px] top-[4px]'><FiXCircle className='text-red-500 h-5 w-5' /></p>
                        <h3> <span className='text-base font-medium'>{msg}</span></h3>
                        <h3 className='mt-4'> <span className='text-base font-medium '>Thank You.</span></h3>
                    </div>
                    {
                        getUserInfo?.status_code == 200 ?
                            <div className='flex justify-center gap-3'>
                                <button onClick={() => callBackCloseFunc()} className='bg-green-700 hover:bg-green-500   min-w-[80px] text-white text-sm py-1 rounded-3xl'>Okay</button>
                                {/* <button onClick={() => callBackCloseFunc()} className='bg-red-700 hover:bg-red-500 min-w-[80px] text-white py-1 text-sm rounded-3xl'>Close</button> */}
                            </div>
                            :
                            <div className='flex justify-center gap-3'>
                                <SignInSignUpBtn />
                            </div>
                    }

                </div>
                {dark && <div onClick={() => callBackCloseFunc()} className='bg-black opacity-50 absolute w-full h-full top-0 left-0'></div>}
            </div>
        </>
    );
};

export default PopUpForSignUp;