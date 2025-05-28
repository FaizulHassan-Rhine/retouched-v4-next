import React, { useState } from 'react';

const PopupMessage = ({ msg, dark = false, callBackCloseFunc }) => {
    return (
        <>
            <div className='fixed w-full h-full  top-0 left-0 flex justify-center items-center z-50'>
                <div className='absolute rounded-lg  bg-white z-10 max-w-[400px] min-w-[300px] m-auto px-4 pb-6 bt-2  shadow-2xl '>

                    <div className='pb-8 pt-10 text-center text-lg relative'>
                        <p className='absolute animate-pulse right-0 top-1'><i className="fa-solid text-yellow-400 fa-triangle-exclamation"></i></p>
                        <h3> <span className='text-base font-medium'>{msg}</span></h3>
                    </div>
                    <div className='flex justify-center gap-3'>
                        <button onClick={() => callBackCloseFunc()} className='bg-green-700 hover:bg-green-500   min-w-[80px] text-white text-sm py-1 rounded-3xl'>Okay</button>
                        <button onClick={() => callBackCloseFunc()} className='bg-red-700 hover:bg-red-500 min-w-[80px] text-white py-1 text-sm rounded-3xl'>Close</button>
                    </div>
                </div>
                {dark && <div onClick={() => callBackCloseFunc()} className='bg-black opacity-50 absolute w-full h-full top-0 left-0'></div>}
            </div>
        </>
    );
};

export default PopupMessage;