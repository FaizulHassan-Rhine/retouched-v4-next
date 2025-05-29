import React from 'react';

const
    ButtonOne = ({ name, wrapClassName = '', className = '', onClick, type='button' }) => {
        return (
            <>
                <div
                    onClick={onClick}
                    className={`relative p-1 group ${wrapClassName}`}
                >
                    <button
                     type={type}
                        className={`${className} absolute left-1 top-1 py-[12px] px-[24px] rounded bg-[#255646] border-[1px] border-solid border-black text-white text-sm font-medium transition-all duration-100 group-hover:top-0 group-hover:left-0 leading-none `}
                    >
                        {name}
                    </button>
                    <button
                        type={type}
                        className={`${className} py-[12px] px-[24px] rounded bg-black border-[1px] border-solid border-black text-white text-sm font-medium leading-none ${className}`}
                    > {name}
                    </button>
                </div>
            </>
        );
    };

export default ButtonOne;