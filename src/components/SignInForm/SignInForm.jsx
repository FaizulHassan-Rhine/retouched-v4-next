/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";

import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { apiUrlContextManager, userContextManager } from "../../App";
import localforage from "localforage";
// import LoginWithSocial from '../SignInForm/LoginWithSocial'
// import InitialDataLoad from "../InitialDataLoad/InitialDataLoad";
// import "./style.css";
import ButtonOne from "../ButtonOne/ButtonOne";
// import { apiUrlContextManager, userContextManager } from "@/pages/_app";
import { useRouter } from "next/router";
import { apiUrlContextManager, userContextManager } from "@/context/AppContexts";
import Link from "next/link";

function SignInForm({
  onClose,
  switchBool = true,
  openForm,
  formCallBack,
  redirectUrl = "",
}) {
  const [isDiv1Visible, setIsDiv1Visible] = useState(true);
  const [isDiv2Visible, setIsDiv2Visible] = useState(false);
  const [isDiv3Visible, setIsDiv3Visible] = useState(false);
  const [fullName, setFullName] = useState("");

  const [getPassword, setPassword] = useState("");
  const [getMail, setMail] = useState("");
  const [getSignUpMail, setSignUpMail] = useState("");
  const [getResetMail, setResetMail] = useState("");
  const [getRemember, setRemember] = useState(false);
  const [getAgreeTerms, setAgreeTerms] = useState(false);
  const [getSignUpAgreeTerms, setSignUpAgreeTerms] = useState(false);
  const [getUserInfo, setUserInfo, getToken, setToken] =
    useContext(userContextManager);
  const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] =
    useContext(apiUrlContextManager);

 const router = useRouter();

  // const { prevPath } = location.state ? location.state : '/';

  const showToastMessage = (msg) => {
    toast.success(msg, {
  position: "top-right", // use string instead of toast.POSITION.TOP_RIGHT
  autoClose: 3000,
  transition: Slide,
});
  };

  const showToastMessageWarning = (msg) => {
    toast.warning(msg, {
     position: "top-right", // use string instead of toast.POSITION.TOP_RIGHT
  autoClose: 3000,
  transition: Slide,
    });
  };

  const showToastMessageError = (msg) => {
    toast.error(msg, {
     position: "top-right", // use string instead of toast.POSITION.TOP_RIGHT
  autoClose: 3000,
  transition: Slide,
    });
  };

  const singInFunc = async (e) => {
    e.preventDefault();
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (getMail.length > 0 && getPassword.length > 0) {
      if (getMail.match(validRegex)) {
        const signInData = {
          email: getMail,
          password: getPassword,
        };

        try {
          fetch(getApiBasicUrl + "/api/2023-02/system-sign-in", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "bearer " + getToken,
            },
            body: JSON.stringify(signInData),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("signInData", data);

              if (data.status_code === 200) {
                setUserInfo(data);
                setToken(data.results.token);
                showToastMessage(data.message);
                localforage.setItem("userInfo", data);
                const rememberInfo = {
                  mail: getMail,
                  pass: getPassword,
                };

                if (getRemember) {
                  localforage.setItem("remember", rememberInfo);
                } else {
                  localforage.removeItem("remember");
                }
                if (redirectUrl.length > 0) {
  router.push(redirectUrl);
}

                onClose(); // Close the modal after successful sign-in
              } else {
                showToastMessageWarning(data.message);
              }
            });
        } catch (error) {
          showToastMessageError(error);

        }
      } else {
        showToastMessageError("Email format is not valid!!");

      }
    } else {
      const singInMail = document.getElementById("signInMailId");
      const signInPass = document.getElementById("singInPass");

      getMail.length == 0 &&
        showToastMessageError("Please provide your email address.");
      getMail.length == 0 && singInMail.classList.add("warnintField");

      getPassword.length == 0 &&
        showToastMessageError("Please enter your password");
      getPassword.length == 0 && signInPass.classList.add("warnintField");
      // getAgreeTerms == false &&
      //   showToastMessageError("Please agree to the terms and conditions");
    }
  };

  const rememberFunc = () => {
    localforage.getItem("remember").then((data) => {
      if (data !== null && Object.keys(data).length > 0) {
        setMail(data.mail);
        setPassword(data.pass);
        setRemember(true);
      }
    });
  };

  const singUpFunc = async (e) => {
    e.preventDefault();
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (getSignUpMail.length > 0 && getSignUpAgreeTerms) {
      if (getSignUpMail.match(validRegex)) {
        const regMail = { email: getSignUpMail };
        try {
          const rawResponse = await fetch(
            getApiBasicUrl + "/api/2023-02/system-sign-up",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "bearer " + getToken,
              },
              body: JSON.stringify(regMail),
            }
          );

          const res = await rawResponse.json();
          if (res.status_code == 200) {
            showToastMessage(res.message);
            onClose();
            //   navigate("/thank-you-note")
          } else {
            showToastMessageWarning(res.message);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        showToastMessageError("email format is not valid");
      }
    } else {
      const signUpMail = document.getElementById("singUpMail");

      getSignUpMail.length == 0 &&
        showToastMessageError("Please provide your email address.");
      getSignUpMail.length == 0 && signUpMail.classList.add("warnintField");

      getSignUpAgreeTerms == false &&
        showToastMessageError("Please agree to the terms and conditions");
    }
  };

  const resetPassFunc = async (e) => {
    e.preventDefault();
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (getResetMail.length > 0) {
      if (getResetMail.match(validRegex)) {
        const regMail = { email: getResetMail };
        try {
          const rawResponse = await fetch(
            getApiBasicUrl + "/api/2023-02/reset-password-form",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "bearer " + getToken,
              },
              body: JSON.stringify(regMail),
            }
          );

          const res = await rawResponse.json();
          res.status_code == 200
            ? showToastMessage(res.message)
            : showToastMessageWarning(res.message);
        } catch (error) {
          console.log(error);
        }
      } else {
        showToastMessageError("email format is not valid");
      }
    } else {
      const lostPassEmailId = document.getElementById("lostPassId");

      getResetMail.length == 0 &&
        showToastMessageError("Please provide your email address.");
      getResetMail.length == 0 && lostPassEmailId.classList.add("warnintField");
    }
  };

  const onChangeSingMail = (e) => {
    const singInMail = document.getElementById("signInMailId");
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/\s/g, ""); // Remove spaces
    setMail(sanitizedValue);
    sanitizedValue.length > 0 &&
      singInMail.classList.contains("warnintField") &&
      singInMail.classList.remove("warnintField");
  };
  const onChangeSingPass = (e) => {
    const signInPass = document.getElementById("singInPass");
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/\s/g, ""); // Remove spaces
    setPassword(sanitizedValue);
    sanitizedValue.length > 0 &&
      signInPass.classList.contains("warnintField") &&
      signInPass.classList.remove("warnintField");
  };

  const onChangeSingUpMail = (e) => {
    const signUpMail = document.getElementById("singUpMail");

    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/\s/g, ""); // Remove spaces
    setSignUpMail(sanitizedValue);

    sanitizedValue.length > 0 &&
      signUpMail.classList.contains("warnintField") &&
      signUpMail.classList.remove("warnintField");
  };

  const onChangeLostPassword = (e) => {
    const lostPassEmailId = document.getElementById("lostPassId");
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/\s/g, ""); // Remove spaces
    setResetMail(sanitizedValue);

    sanitizedValue.length > 0 &&
      lostPassEmailId.classList.contains("warnintField") &&
      lostPassEmailId.classList.remove("warnintField");
  };

  const showDiv1 = () => {
    setIsDiv1Visible(true);
    setIsDiv2Visible(false);
    setIsDiv3Visible(false);
  };

  const showDiv2 = () => {
    setIsDiv1Visible(false);
    setIsDiv2Visible(true);
    setIsDiv3Visible(false);
  };
  const showDiv3 = () => {
    setIsDiv1Visible(false);
    setIsDiv2Visible(false);
    setIsDiv3Visible(true);
  };



  const updateUserDetailsFunc = () => {
    let userInfoDetail = getUserInfo;

    const UserName = {
      "full_name": fullName
    }

    console.log("UserName", UserName);

    fetch(getApiBasicUrl + "/api/2023-02/user-info-update", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'bearer ' + getToken
      },
      body: JSON.stringify(UserName),
    })
      .then((res) => res.json())
      .then((data) => {

        console.log("userInfo", data);

        if (data.status_code === 200) {
          userInfoDetail.results.full_name = data.results.full_name;
        
          setUserInfo(getUserInfo => ({
            ...getUserInfo,
            ...userInfoDetail
          }))
          localforage.setItem("userInfo", userInfoDetail);
          showToastMessage(data.message);
        } else {
          showToastMessageWarning(data.message);
        }
      })
  }

  useEffect(() => {
    rememberFunc();
    switchBool ? showDiv1() : showDiv2();
  }, [switchBool]);

  const closeForm = () => {
    formCallBack(false);
    openForm = false;
  };
  return (
    <>
      <div
        className={`fixed left-0 w-full h-full flex items-center justify-center z-50 font-gilroy transition-all duration-500 ${openForm ? "top-0" : "top-[130%]"
          }`}
      >
        <div className="rounded-lg bg-white z-[999] p-9 w-full overflow-y-auto lg:w-[1020px]">
          <div className="flex flex-col gap-[22px] relative">
            <button
              onClick={closeForm}
              className="block lg:hidden self-end border-[2px] rounded-full bg-red-800 mt-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="lg:ml-[120px]">
              <div className="grid grid-cols-2 text-[14px] bg-[#EBEDF0] rounded w-full lg:w-48 p-[2px] font-gilroy font-bold">
                <button
                  onClick={showDiv1}
                  className={` py-1 ${isDiv1Visible
                    ? " text-[#0A0B0A] bg-[#FAFAFA] rounded"
                    : "text-[#5A5555]"
                    }`}
                >
                  Sign In
                </button>
                <button
                  onClick={showDiv2}
                  className={`py-1 ${isDiv2Visible
                    ? " text-[#0A0B0A] bg-[#FAFAFA] rounded"
                    : "text-[#5A5555]"
                    } `}
                >
                  {" "}
                  Sign up
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-center md:items-start md:gap-[30px]">
              {/* sign in form */}

              {isDiv1Visible && (
                <div className="border border-[#000] px-[45px] py-[31px] rounded-lg bg-[#87e17f33] w-full lg:w-[429px]">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-jakarta text-[#0A0B0A] font-bold text-[20px]  ">
                        Sign In
                      </h3>
                    </div>
                    <form onSubmit={singInFunc}>
                      <div className=" flex flex-col gap-3 w-full ">
                        <div className="flex flex-col gap-2">
                          <p className="text-[14px] font-semibold leading-3-[16px]">
                            Email
                          </p>
                          <input
                            className="border-[1px] py-[6px] pl-[10px] rounded pr-[40px] border-solid border-[#5A5555] text-xs font-normal focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="text"
                            onChange={onChangeSingMail}
                            value={getMail}
                            id="signInMailId"
                            placeholder="example@example.com"
                            pattern="^\S+$"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <p className="text-[14px] font-semibold leading-3-[16px]">
                            Password
                          </p>
                          <input
                            className="border-[1px] py-[6px] pl-[10px] rounded pr-[40px] border-solid border-[#5A5555] text-xs font-normal focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="password"
                            onChange={onChangeSingPass}
                            value={getPassword}
                            id="singInPass"
                            placeholder="Please enter your password"
                          />
                        </div>
                       
                      </div>
                      <div className="flex flex-col gap-[10px] pt-[14px]">
                        <div className="flex justify-between">
                          <div
                            onClick={() => setRemember(!getRemember)}
                            className="flex justify-center items-center gap-3 cursor-pointer mt-[14px]"
                          >
                            <div>
                              <span
                                className={` block rounded border-[1px] border-solid border-black p-[1px] ${getRemember ? "bg-[#2C2C2C]" : "bg-[#F5F5F5]"
                                  }`}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.3333 4L5.99996 11.3333L2.66663 8"
                                    stroke="#F5F5F5"
                                    stroke-width="1.6"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </span>
                            </div>
                            <p className="text-[12px]  font-bold leading-[14px] text-[#255646]">
                              Stay Signed In
                            </p>
                          </div>
                        </div>
                        <div className="flex">
                          <ButtonOne
                            name="Sign In"
                            wrapClassName={"group w-full "}
                            className={"w-full"}
                          />
                        </div>
                        <div>
                          <div
                            // to="/reset-password"
                            onClick={showDiv3}
                            className="text-[10px] font-normal text-[#726C6C]"
                          >
                            Forgot password?
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* sign up form */}
              {isDiv2Visible && (
                <div className="border-2 border-[#255646] rounded-lg py-5 px-[45px] bg-[#87e17f33]">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-jakarta text-[#0A0B0A] font-bold text-xl text-base-black ">
                        Create Account
                      </h3>
                      <p className="text-sm font-medium text-[#5A5555]">
                        Create account and get access to our Pro-Touch and many
                        more features.
                      </p>
                    </div>
                    <form onSubmit={singUpFunc}>
                      <div className="flex flex-col gap-3 w-full ">
                        <div className="flex flex-col gap-2">
                          <p className="text-[14px] font-semibold">Email</p>
                          <input
                            id="singUpMail"
                            onChange={onChangeSingUpMail}
                            value={getSignUpMail}
                            className="border-[1px] py-[6px] pl-[10px] rounded pr-[40px] border-solid border-[#5A5555] text-xs font-normal"
                            type="text"
                            placeholder="example@example.com"
                          />
                        </div>

                        {/* <div className="flex flex-col gap-2">
                                                <p>{`Password (6 characters minimum) `}</p>
                                                <input className="border-[1px] py-[6px] pl-[10px] pr-[40px] border-solid border-[#CCCBCB] text-xs font-normal"
                                                    type="text" placeholder="TheKow@1234" />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <p>Confirm Password</p>
                                                <input className="border-[1px] py-[6px] pl-[10px] pr-[40px] border-solid border-[#CCCBCB] text-xs font-normal"
                                                    type="text" placeholder="TheKow@1234" />
                                            </div> */}
                        <div className="flex items-center gap-3 pt-3">
                          <div
                            onClick={() =>
                              setSignUpAgreeTerms(!getSignUpAgreeTerms)
                            }
                            className="cursor-pointer"
                          >
                            <span
                              className={`block  rounded p-[1px] border-[1px] border-solid border-[#255646] ${getSignUpAgreeTerms
                                ? "bg-[#255646]"
                                : "bg-[#F5F5F5]"
                                }`}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.3333 4L5.99996 11.3333L2.66663 8"
                                  stroke="#F5F5F5"
                                  stroke-width="1.6"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </span>
                          </div>
                          <p className="text-xs font-medium text-[#255646] -mt-[2px]">
                            I agree to the Terms of Service, General Terms and
                            Conditions and Privacy Policy.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-[10px] pt-[16px]">
                        <div className="flex ">
                          <ButtonOne
                            type="submit"
                            name="Create Account"
                            wrapClassName={"group w-full "}
                            className={"w-full"}
                          />
                          {/* <div
                                                    id="singInButton"
                                                    //   onClick={SignInHandleOpen}
                                                    className="relative p-1 group w-full md:w-auto"
                                                >
                                                    <button
                                                        className="w-full absolute left-1 top-1 py-[14px] px-[24px] rounded bg-[#255646] border-[1px] border-solid border-black text-white text-sm font-medium transition-all duration-100 group-hover:top-0 group-hover:left-0"
                                                    >
                                                        Create Account
                                                    </button>
                                                    <button
                                                        className="w-full py-[14px] px-[24px] rounded bg-black border-[1px] border-solid border-black text-white text-sm font-medium"
                                                    >
                                                        Create Account
                                                    </button>
                                                </div> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {isDiv3Visible && (
                <div className="border border-[#000] px-[45px] py-[31px] rounded-lg bg-[#87e17f33] w-[429px]">
                  <div className=" flex-wrap h-full g-6">

                    <div>
                      <div className="flex flex-row items-center justify-center lg:justify-start">
                        <p className="font-jakarta text-[#0A0B0A] font-bold text-xl text-base-black ">
                          Reset Password
                        </p>
                      </div>


                      <form onSubmit={resetPassFunc}>
                        <div className="mb-6">
                          <p className="text-[14px] font-semibold leading-3-[16px] mt-3 mb-2">
                            Email
                          </p>
                          <input
                            onChange={onChangeLostPassword}
                            type="email"
                            id="lostPassId"
                            className="border-[1px] py-[6px] w-full pl-[10px] rounded pr-[40px] border-solid border-[#5A5555] text-xs font-normal"
                            placeholder="example@example.com"
                          />
                        </div>

                        <div className="text-center">
                          <ButtonOne
                            type="submit"

                            name="Reset Password"
                            wrapClassName={"group w-full "}
                            className={"w-full"}
                          >
                            RESET PASSWORD
                          </ButtonOne>

                          <div className="text-right pb-3">
                            <button
                              onClick={showDiv1}
                              className="text-[10px] font-normal text-[#726C6C]"
                            >
                              Back to Login
                            </button>
                          </div>

                        </div>
                      </form>
                    </div>

                  </div>
                </div>
              )}

              <div className="hidden lg:flex lg:flex-col items-start justify-center">
                <div>
                  <h1 className="text-[36px] font-extrabold leading-[43px]  text-[#009024] font-jakarta ">
                    Not Just A Background Removal Tool
                  </h1>
                </div>

                <div>
                  <h1 className="text-[#255646] text-[24px] font-bold leading-[28px] font-jakarta mt-[36px]">
                    You Can Also
                  </h1>
                </div>
                <div className="flex flex-col   gap-10 lg:gap-[27px] pt-[36px] pb-[20px] mt-[5px]  px-[36px] ml-[6px] border-l-[#B5B3B3] border-l border-dotted relative">
                  <div className="flex flex-col  lg:flex-row gap-[10px] ">
                    <div className="w-10 flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="38"
                        height="38"
                        viewBox="0 0 38 38"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_432_2383)">
                          <path
                            d="M6.72927 0.474976L31.2707 0.474976C34.9918 0.474976 38 3.48321 38 7.20424V30.7957C38 34.5167 34.9918 37.525 31.2707 37.525H6.72927C3.00823 37.525 0 34.5167 0 30.7957L0 7.20424C0 3.48321 3.00823 0.474976 6.72927 0.474976Z"
                            fill="#001E36"
                          />
                          <path
                            d="M13.6168 9.89575C13.1418 9.89575 12.6668 9.89575 12.1761 9.91178C11.685 9.92752 11.2258 9.92752 10.7983 9.94355C10.3708 9.95928 9.97505 9.95928 9.59505 9.97502C9.23078 9.99075 8.97755 9.99075 8.70828 9.99075C8.59755 9.99075 8.55005 10.054 8.55005 10.165V26.4575C8.55005 26.6 8.61328 26.6635 8.74005 26.6635H11.8118C11.9225 26.6475 12.0018 26.5525 11.9858 26.4418V21.3593C12.2865 21.3593 12.5083 21.3593 12.6668 21.375C12.825 21.3908 13.0783 21.3908 13.4583 21.3908C14.7568 21.3908 15.9443 21.2483 17.0208 20.8525C18.05 20.4725 18.9368 19.8075 19.57 18.9208C20.2034 18.0341 20.5201 16.9099 20.5201 15.5483C20.5201 14.8358 20.3936 14.155 20.1561 13.49C19.9044 12.8125 19.5102 12.197 19.0001 11.685C18.3979 11.1001 17.6731 10.6565 16.8783 10.3865C15.9915 10.054 14.9151 9.89575 13.6168 9.89575ZM13.9701 13.0144C14.5342 13.0251 15.0834 13.1237 15.5958 13.3315C16.055 13.5058 16.435 13.8225 16.7043 14.234C16.9568 14.6598 17.0832 15.1487 17.0686 15.6435C17.0686 16.34 16.9101 16.8785 16.5775 17.2743C16.229 17.67 15.7858 17.971 15.2793 18.1135C14.6933 18.3035 14.0758 18.3983 13.4583 18.3983H12.619C12.429 18.3983 12.2236 18.3825 12.0018 18.3668V13.0468C12.1125 13.0308 12.3343 13.015 12.6511 13.031C12.9518 13.015 13.3158 13.015 13.7276 13.015C13.8087 13.013 13.8895 13.0128 13.9701 13.0144ZM27.2493 13.8228C26.1251 13.8228 25.1908 13.9968 24.4468 14.3768C23.7661 14.6935 23.1801 15.2 22.7843 15.8333C22.4361 16.4193 22.2458 17.0683 22.2458 17.7493C22.2323 18.3094 22.3574 18.8642 22.6101 19.3643C22.9062 19.8968 23.3173 20.3565 23.8136 20.71C24.5101 21.1864 25.2659 21.5697 26.0618 21.85C26.8376 22.1508 27.3601 22.3883 27.6136 22.594C27.8668 22.8 27.9936 23.0057 27.9936 23.2275C27.9936 23.5125 27.8193 23.7818 27.5661 23.8925C27.2811 24.035 26.8536 24.1143 26.2518 24.1143C25.6186 24.1143 24.9851 24.035 24.3833 23.8768C23.6923 23.7225 23.0299 23.4607 22.42 23.101C22.3725 23.0693 22.3251 23.0535 22.2776 23.0853C22.2301 23.1168 22.2143 23.18 22.2143 23.2275V25.9825C22.1986 26.1093 22.2776 26.22 22.3886 26.2832C22.902 26.5231 23.4451 26.6935 24.0036 26.79C24.7161 26.9325 25.4283 26.9958 26.1565 26.9958C27.2965 26.9958 28.2468 26.8218 29.0226 26.4893C29.7351 26.2043 30.3526 25.7135 30.7958 25.08C31.2109 24.4572 31.4263 23.7226 31.4133 22.9743C31.4289 22.4089 31.3038 21.8486 31.0493 21.3435C30.7483 20.805 30.3208 20.3618 29.7983 20.0293C29.0339 19.5493 28.2155 19.1612 27.3601 18.8733C26.978 18.7151 26.6029 18.5408 26.2358 18.3508C26.0301 18.24 25.84 18.0975 25.6975 17.9233C25.6026 17.7965 25.5393 17.6543 25.5393 17.5118C25.5393 17.3693 25.5868 17.211 25.6658 17.0843C25.7768 16.926 25.9508 16.815 26.1565 16.7675C26.4576 16.6885 26.7901 16.6408 27.1065 16.6565C27.7083 16.6565 28.294 16.7358 28.88 16.8625C29.4186 16.9733 29.9251 17.1475 30.4001 17.401C30.4633 17.4325 30.5426 17.4325 30.6851 17.401C30.7098 17.3827 30.7299 17.3588 30.7436 17.3313C30.7574 17.3037 30.7645 17.2733 30.7643 17.2425V14.6618C30.7643 14.5983 30.7483 14.535 30.7326 14.4718C30.7008 14.4085 30.6376 14.345 30.5743 14.3293C30.1376 14.1508 29.68 14.0284 29.2126 13.965C28.5624 13.8704 27.9063 13.823 27.2493 13.8228Z"
                            fill="#31A8FF"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_432_2383">
                            <rect width="38" height="38" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="flex flex-col text-[#726C6C] text-xs font-medium text-center lg:text-left">
                      <h5>Your file, your path!</h5>
                      <p>Download in any format you want with just one click.</p>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-[10px] items-center ">
                    <div className="lg:w-[36px] flex items-center justify-center">
                      <span className="text-black font-bold text-[22px]">
                        120 Min
                      </span>
                    </div>
                    <div className="flex flex-col text-[#726C6C] text-xs font-medium text-center lg:text-left">
                      <h5>Not convinced with Ai?</h5>
                      <p>
                        Get Your Photos Professionally Edited in Under 120
                        Minutes!
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-[10px] items-center lg:items-center">
                    <div className="w-10 flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="38"
                        height="38"
                        viewBox="0 0 38 38"
                        fill="none"
                      >
                        <path
                          d="M23.8229 28.5L23.0154 25.8606M18.1862 28.5L20.4535 21.0695C20.5406 20.786 20.6879 20.5834 21.0045 20.5834C21.3212 20.5834 21.47 20.786 21.5555 21.0695L23.0185 25.8606H19M11.0834 28.5V25.3334M11.0834 25.3334V22.1667C11.0834 21.0077 11.1705 20.5834 12.2107 20.5834H13.9017C14.8359 20.5834 15.5927 21.6474 15.5927 22.9584C15.5927 24.2694 14.8359 25.3334 13.9017 25.3334M11.0834 25.3334H13.9017M13.9017 25.3334L15.029 28.5M33.25 20.5834L32.6753 27.1795C32.6278 27.7385 32.6025 28.0187 32.422 28.071C32.243 28.1232 32.0578 27.9031 31.6905 27.4645L30.2211 25.7165C30.0216 25.479 29.9219 25.3603 29.7889 25.3603C29.6559 25.3603 29.5561 25.479 29.3566 25.7165L27.8873 27.4661C27.52 27.9047 27.3363 28.1232 27.1558 28.071C26.9769 28.0187 26.9515 27.7385 26.9025 27.1811L26.323 20.5834"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M23.75 34.8334H16.9844C11.8228 34.8334 9.23875 34.8334 7.44642 33.5699C6.93634 33.2122 6.48042 32.7829 6.09267 32.2953C4.75 30.6074 4.75 28.1786 4.75 23.3178V19.2882C4.75 14.5968 4.75 12.2503 5.49258 10.3772C6.68642 7.3641 9.21025 4.9891 12.4117 3.86494C14.4004 3.16669 16.891 3.16669 21.8785 3.16669C24.7253 3.16669 26.1503 3.16669 27.2872 3.56569C29.1159 4.20852 30.5583 5.56544 31.2408 7.28652C31.6667 8.35685 31.6667 9.69794 31.6667 12.3785V15.8334"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.75 19C4.75 17.6004 5.30599 16.2581 6.29567 15.2684C7.28535 14.2788 8.62764 13.7228 10.0273 13.7228C11.0817 13.7228 12.3247 13.9064 13.3491 13.6325C13.7967 13.5121 14.2048 13.276 14.5324 12.9481C14.8601 12.6202 15.0957 12.2119 15.2158 11.7642C15.4897 10.7398 15.3061 9.49685 15.3061 8.44235C15.3065 7.04301 15.8627 5.70113 16.8523 4.7118C17.8419 3.72246 19.184 3.16669 20.5833 3.16669"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col text-[#726C6C] text-xs font-medium text-center lg:text-left">
                      <h5>Upload from anywhere, anytime!</h5>
                      <p>Want to upload RAW files? We don't mind! Choose from your gallery right after you click it.</p>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-[10px] items-center lg:items-start">
                    <div className="w-10 flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <path
                          d="M29.6 18C29.8 17.4 30 16.8 30 16C30 11.6 26.4 8 22 8C19 8 16.2 9.8 15 12.4C14.4 12.2 13.6 12 13 12C10.2 12 8 14.2 8 17C8 17.4 8 17.8 8.2 18C4.6 18.6 2 21.4 2 25C2 28.8 5.2 32 9 32H29C32.8 32 36 28.8 36 25C36 21.4 33.2 18.4 29.6 18ZM17.8145 27.285C17.3476 27.6345 16.6944 27.5862 16.284 27.1718L12.503 23.3541C11.9919 22.8381 11.9939 22.0061 12.5075 21.4925C13.0004 20.9996 13.7996 20.9996 14.2925 21.4925L17 24.2L23.9132 18.9248C24.6332 18.3755 25.6708 18.5743 26.1368 19.3508C26.5374 20.0186 26.3681 20.8812 25.7447 21.3479L17.8145 27.285Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col text-[#726C6C] justify-items-center text-xs font-medium text-center lg:text-left">
                      <h5>Focus on more important things.</h5>
                      <p>Leave your background removal to us and access your files whenever you want.</p>
                    </div>
                  </div>
                  {/* red circle svg 1 */}
                  <div className="absolute left-[-8px] top-[48px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                    >
                      <circle cx="7.5" cy="7.5" r="7.5" fill="#EA4335" />
                    </svg>
                  </div>
                  {/* red circle svg 2 */}
                  <div className="absolute left-[-8px] top-[128px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                    >
                      <circle cx="7.5" cy="7.5" r="7.5" fill="#EA4335" />
                    </svg>
                  </div>
                  {/* red circle svg 3 */}
                  <div className="absolute left-[-8px] bottom-[97px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                    >
                      <circle cx="7.5" cy="7.5" r="7.5" fill="#EA4335" />
                    </svg>
                  </div>
                  {/* red circle svg 4 */}
                  <div className="absolute left-[-8px] bottom-[32px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                    >
                      <circle cx="7.5" cy="7.5" r="7.5" fill="#EA4335" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={closeForm}
          className={`absolute top-0 left-0 z-10 w-full h-full bg-black transition-all duration-1000 ${openForm ? "opacity-50" : "opacity-0"
            }`}
        ></div>
      </div>

      {
        getUserInfo.status_code == 200 && getUserInfo?.results?.full_name.length == 0 &&
        <div className="fixed top-0 left-0 z-20 w-full h-full flex items-center justify-center">
          <div className="flex flex-col gap-5 z-30 bg-white p-10 rounded-lg">
            <h3 className="text-2xl font-semibold">Please enter your name</h3>
            <div className="flex flex-col gap-3">
              <input onChange={(e) => setFullName(e.target.value)} className="border p-2" type="text" placeholder="Please input your name" />
              <button onClick={updateUserDetailsFunc} className="bg-[#255646] text-white py-2 rounded">Save</button>
            </div>
          </div>
          <div className="absolute top-0 left-0 z-10 w-full h-full bg-black opacity-35"></div>
        </div>

      }

    </>
  );
}

export default SignInForm;
