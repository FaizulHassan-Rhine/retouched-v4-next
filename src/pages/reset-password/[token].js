import { apiUrlContextManager, userContextManager } from "@/context/AppContexts";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ResetPassword = () => {

  const [getPassword, setPassword] = useState("");
  const [getConfirmPass, setConfirmPass] = useState("");
  const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
  const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);

const router = useRouter();
  const { token } = router.query;

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


  const setPasswordFunc = async () => {

    if (getPassword.length > 0 && getConfirmPass.length > 0) {
      if (getPassword == getConfirmPass) {

        const passwordSet = {
          "verified_token": token,
          "password": getPassword,
          "confirm_password": getConfirmPass
        }
        try {

          const rawResponse = await fetch(getApiBasicUrl + '/api/2023-02/reset-password', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'bearer ' + getToken,
            },
            body: JSON.stringify(passwordSet)
          });

          const res = await rawResponse.json();
      
          res.status_code == 205 ? showToastMessage(res.message) : showToastMessageWarning(res.message)
          res.status_code == 205 && router.push('/')
        } catch (error) {
          showToastMessageWarning(error)
        }
      } else {
        showToastMessageWarning("The password does not match.")
      }
    } else {
      const passwordId = document.getElementById("passwordId");
      const repasswordId = document.getElementById("repasswordId")

      getPassword.length == 0 && showToastMessageError("Please enter your password.");
      getPassword.length == 0 && passwordId.classList.add("warnintField");

      getConfirmPass.length == 0 && showToastMessageError("Please enter your confirm password");
      getConfirmPass.length == 0 && repasswordId.classList.add("warnintField");
    }
  }

  const onChangePassword = (e) => {
    const passwordId = document.getElementById("passwordId");
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/\s/g, ''); // Remove spaces
    setPassword(sanitizedValue)
    sanitizedValue.length > 0 && passwordId.classList.contains("warnintField") && passwordId.classList.remove("warnintField");
  }
  const onChangeConfirmPassword = (e) => {
    const repasswordId = document.getElementById("repasswordId");
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/\s/g, ''); // Remove spaces
    setConfirmPass(sanitizedValue)
    sanitizedValue.length > 0 && repasswordId.classList.contains("warnintField") && repasswordId.classList.remove("warnintField");
  }
  return (
    <div className="container mx-auto">
      <div>
        <section>
          <div className="px-6 mt-20 mb-16 text-gray-800">
            <div className="flex xl:justify-center  justify-center items-center flex-wrap h-full g-6">
              <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="text-3xl mb-0 mr-4">Reset password</p>
                </div>

                <div className="flex items-center my-8 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"></div>

                <div className="mb-6">
                  <input
                    onChange={onChangePassword}
                    value={getPassword}
                    type="password"
                    className="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none"
                    id="passwordId"
                    placeholder="Password"
                  />
                </div>


                <div className="mb-6">
                  <input
                    onChange={onChangeConfirmPassword}
                    type="password"
                    value={getConfirmPass}
                    className={"form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none "}
                    id="repasswordId"
                    placeholder="Confirm Password"
                  />
                </div>

                <div className="text-center">
                  <button onClick={setPasswordFunc} className="inline-block px-7 w-full mb-5 py-3 text-black bg-white border-green-600 border  font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-500 hover:shadow-lg  hover:text-white focus:outline-none  transition duration-150 ease-in-out">
                    RESET PASSWORD
                  </button>
                  <ToastContainer />

                  {/* <div className="text-right">
                      <Link to="/log-in">
                        <a href="#!" className="text-green-700">
                          Back to Login
                        </a>
                      </Link>
                    </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResetPassword;
