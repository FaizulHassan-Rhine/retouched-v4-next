import React, { useState } from 'react';
import SignInForm from '../SignInForm/SignInForm';
import ButtonOne from '../ButtonOne/ButtonOne';

const SignInSignUpBtn = () => {
    const [showSignInForm, setShowSignInForm] = useState(false);
    const [getSwitchForm, setSwitchForm] = useState(true);

    const SignInHandleOpen = () => {
        setShowSignInForm(true);
        setSwitchForm(true);
    };
    const formCallBack = (b) => {
        setShowSignInForm(b);
    }
    const SignUpHandleOpen = () => {
        setShowSignInForm(true);
        setSwitchForm(false);
    };
    const SignInHandleClose = () => {
        setShowSignInForm(false);
    };

    return (
        < >
            <div className="flex">
                <ButtonOne name={"Log in"} onClick={SignInHandleOpen} />
                {/* <div
                    onClick={SignInHandleOpen}
                    className="relative p-1 group"
                >
                    <button
                        className="absolute left-1 top-1 py-[12px] px-[24px] rounded bg-[#255646] border-[1px] border-solid border-black text-white text-sm font-medium transition-all duration-100 group-hover:top-0 group-hover:left-0 leading-none"
                    >
                        Log in
                    </button>
                    <button
                        className="py-[12px] px-[24px] rounded bg-black border-[1px] border-solid border-black text-white text-sm font-medium leading-none"
                    > Log in
                    </button>
                </div> */}
                <ButtonOne name={"Sign up"} onClick={SignUpHandleOpen} className={'!px-[16px] bg-[#87E17F] !text-black'} />

                {/* 
                <div
                    onClick={SignUpHandleOpen}
                    className="relative p-1 group"
                >
                    <button
                        className="absolute left-1 top-1 py-[12px] px-[16px] rounded bg-[#87E17F] border-[1px] border-solid border-black text-[#0A0B0A] text-sm font-medium transition-all duration-100 group-hover:top-0 group-hover:left-0 leading-none"
                    >
                        Sign up
                    </button>
                    <button
                        className="py-[12px] px-[16px] rounded bg-black border-[1px] border-solid border-black text-[#0A0B0A] text-sm font-medium leading-none"
                    >
                        Sign up
                    </button>
                </div> */}

            </div>

            {
                <SignInForm onClose={SignInHandleClose} switchBool={getSwitchForm} openForm={showSignInForm} formCallBack={formCallBack} />
            }
        </ >
    );
};

export default SignInSignUpBtn;