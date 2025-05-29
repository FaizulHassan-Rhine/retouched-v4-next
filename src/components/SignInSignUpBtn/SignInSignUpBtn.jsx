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
             <ButtonOne
  name="Sign up"
  onClick={SignUpHandleOpen}
//   className="!px-4 !text-black bg-[#87E17F]"
/>


               

            </div>

            {
                <SignInForm onClose={SignInHandleClose} switchBool={getSwitchForm} openForm={showSignInForm} formCallBack={formCallBack} />
            }
        </ >
    );
};

export default SignInSignUpBtn;