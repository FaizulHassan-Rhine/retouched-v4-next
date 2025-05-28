import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiUrlContextManager, userContextManager } from "../../App";
import ButtonOne from "../ButtonOne/ButtonOne";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const SetPassword = () => {
  const [getPassword, setPassword] = useState("");
  const [getConfirmPass, setConfirmPass] = useState("");
  const [getUserInfo, setUserInfo, getToken, setToken] =
    useContext(userContextManager);
  const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] =
    useContext(apiUrlContextManager);

  let { token } = useParams();
  const navigate = useNavigate();

  const showToastMessage = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showToastMessageWarning = (msg) => {
    toast.warning(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showToastMessageError = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const setPasswordFunc = async () => {
    if (getPassword.length > 0 && getConfirmPass.length > 0) {
      if (getPassword == getConfirmPass) {
        const passwordSet = {
          verified_token: token,
          password: getPassword,
          confirm_password: getConfirmPass,
        };
        try {
          const rawResponse = await fetch(
            getApiBasicUrl + "/api/2023-02/set-password",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "bearer " + getToken,
              },
              body: JSON.stringify(passwordSet),
            }
          );

          const res = await rawResponse.json();

          if (res.status_code == 200) {
            setUserInfo(res);
            setToken(res.results.token);
            showToastMessage(res.message);
            navigate("/");
          } else {
            showToastMessageWarning(res.message);
          }
        } catch (error) {
          showToastMessageWarning(error);
        }
      } else {
        showToastMessageWarning("Password is not match");
      }
    } else {
      const passwordId = document.getElementById("passwordId");
      const repasswordId = document.getElementById("repasswordId");

      getPassword.length == 0 &&
        showToastMessageError("Please enter your password.");
      getPassword.length == 0 && passwordId.classList.add("warnintField");

      getConfirmPass.length == 0 &&
        showToastMessageError("Please enter your confirm password");
      getConfirmPass.length == 0 && repasswordId.classList.add("warnintField");
    }
  };

  const onChangePassword = (e) => {
    const passwordId = document.getElementById("passwordId");
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/\s/g, ""); // Remove spaces
    setPassword(sanitizedValue);
    sanitizedValue.length > 0 &&
      passwordId.classList.contains("warnintField") &&
      passwordId.classList.remove("warnintField");
  };
  const onChangeConfirmPassword = (e) => {
    const repasswordId = document.getElementById("repasswordId");
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/\s/g, ""); // Remove spaces
    setConfirmPass(sanitizedValue);
    sanitizedValue.length > 0 &&
      repasswordId.classList.contains("warnintField") &&
      repasswordId.classList.remove("warnintField");
  };
  /*
    {
      "results": {
          "token": null,
          "return_url": "http://retouched.ai/api/2023-02/system-sign-in"
      },
      "message": "User Info Updated Successfully",
      "status": "success",
      "status_code": 205
  } 
*/
  return (
    <div>
      <Navbar/>
      <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-center items-start h-full mx-4 md:mx-0 my-5 md:my-0 md:py-10 2xl:py-40 md:gap-28">
        <div className="border border-[#000] px-[45px] py-[31px] rounded-lg bg-[#87e17f33] w-full md:w-[429px]">
          <div className="flex flex-col gap-2 mb-5">
            <h3 className="font-jakarta text-[#0A0B0A] font-bold text-[20px]  ">
            Verify Account
            </h3>
            <h1 className="text-[14px] leading-4 text-[#5A5555] font-medium">Please create your password</h1>
          </div>

          <form onSubmit={setPasswordFunc}>
            <div className=" flex flex-col gap-3 w-full ">
              <div className="flex flex-col gap-2">
                <p className="text-[14px] font-semibold leading-3-[16px]">
                Password (6 characters minimum)
                </p>
                <input
                  className="border-[1px] py-[6px] pl-[10px] rounded pr-[40px] border-solid border-[#5A5555] text-xs font-normal focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  onChange={onChangePassword}
                  value={getPassword}
                  type="password"
                  id="passwordId"
                  placeholder="TheKow@1234"
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-[14px] font-semibold leading-3-[16px]">
                  Confirm Password
                </p>
                <input
                  className="border-[1px] py-[6px] pl-[10px] rounded pr-[40px] border-solid border-[#5A5555] text-xs font-normal focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  onChange={onChangeConfirmPassword}
                  value={getConfirmPass}
                  type="password"
                  id="repasswordId"
                  placeholder="TheKow@1234"
                />
              </div>
            </div>
            <div className="flex flex-col gap-[10px] pt-[20px] ">
              <div className="flex">
                <ButtonOne
                  name="Verify Account"
                  wrapClassName={"group w-full "}
                  className={"w-full"}
                />
                <ToastContainer />
              </div>
            </div>
          </form>
          
        </div>
        <div className="hidden md:flex md:flex-col items-start justify-center">
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
    <Footer/>
    </div>
  );
};

export default SetPassword;
