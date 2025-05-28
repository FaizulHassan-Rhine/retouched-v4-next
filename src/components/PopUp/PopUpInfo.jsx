import React from 'react';

const PopUpInfo = ({ msg, dark = false, callBackPopupClose }) => {
    return (
        <>
            <div className='fixed w-full h-full  top-0 left-0 flex justify-center items-center z-50'>
                <div className='absolute rounded-lg  bg-white z-10 max-w-[400px] min-w-[300px] m-auto px-4 pb-6 bt-2  shadow-2xl '>

                    <div className='pb-8 pt-10 text-center text-lg relative'>
                        <p className='absolute animate-pulse right-0 top-1'><i className="fa-solid text-green-600 fa-circle-check"></i></p>
                        <h3> <span className='text-base font-medium' dangerouslySetInnerHTML={{ __html: msg}}/></h3>
                    </div>
                    <div className='flex justify-center gap-3'>
                        <button onClick={() => callBackPopupClose()} className='bg-green-700 hover:bg-green-500   min-w-[80px] text-white text-sm py-1 rounded-3xl'>Okay</button>
                        {/* <button onClick={() => callBackPopupClose()} className='bg-red-700 hover:bg-red-500 min-w-[80px] text-white py-1 text-sm rounded-3xl'>Okey</button> */}
                    </div>
                </div>
                {dark && <div onClick={() => callBackPopupClose()} className='bg-black opacity-50 absolute w-full h-full top-0 left-0'></div>}
            </div>
        </>
    );
};

export default PopUpInfo;