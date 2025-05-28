import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiUrlContextManager, userContextManager } from "../../App";
import localforage from "localforage";
import LoginWithSocial from "./LoginWithSocial";

const SignIn = () => {
  const [getPassword, setPassword] = useState("");
  const [getMail, setMail] = useState("");
  const [getRemember, setRemember] = useState(false)
  const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
  const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);

  const location = useLocation();
  const navigation = useNavigate()
  const { prevPath } = location.state ? location.state : '/';

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

  const singInFunc = async () => {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (getMail.match(validRegex)) {

      const signInData = {
        email: getMail,
        password: getPassword,
      };
      try {
        fetch(getApiBasicUrl + "/api/2023-02/system-sign-in",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': 'bearer ' + getToken
            },
            body: JSON.stringify(signInData),
          }
        ).then(res => res.json())
          .then(data => {
            if (data.status_code == 200) {
         
        
              setUserInfo(data);
              setToken(data.results.token)
              showToastMessage(data.message)
              localforage.setItem("userInfo", data);
              const rememberInfo = {
                'mail': getMail,
                'pass': getPassword
              }

              if (getRemember) {
                localforage.setItem('remember', rememberInfo)
              } else {
                localforage.removeItem('remember')
              }
              prevPath ? navigation(prevPath) : navigation('/')
            } else {
              showToastMessageWarning(data.message)
            }
          })

      } catch (error) {
        showToastMessageError(error);
      }
    } else {
      showToastMessageError("email format is not valide");
    }
  };

  const rememberFunc = () => {
    localforage.getItem("remember").then(data => {
      if (data !== null && Object.keys(data).length > 0) {
        setMail(data.mail)
        setPassword(data.pass)
        setRemember(true)
      }
    })
  }


  useEffect(() => {
    rememberFunc()
  }, [])

  return (

    <div className="container mx-auto pb-16">
      <div>
        {/*getUserInfo.status_code == 200 && <Navigate to={prevPath} replace={true} />*/}
        <section>
          <div className="px-6 mt-20 text-gray-800">
            <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
              <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">

                <div className="flex flex-row items-center justify-center  lg:justify-start">
                  <p className="text-3xl mb-0 mr-4">Log in to Retouched.ai</p>
                </div>

                <div className="flex items-center my-8 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"></div>

                <div className="mb-6">
                  <input
                    onChange={(e) => setMail(e.target.value)}
                    value={getMail}
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Email address"
                  />
                </div>
                <div className="mb-6">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={getPassword}
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Password"
                  />
                </div>
                <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    <input
                      onChange={() => setRemember(!getRemember)}
                      checked={getRemember}
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-orange-400 checked:border-orange-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck2"
                    />
                    <label
                      className="form-check-label inline-block text-gray-800"
                      htmlFor="exampleCheck2"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link to="/resetpasswordform" className="text-red-600">
                    Lost password?
                  </Link>
                </div>

                <div className="text-center">
                  <button
                    onClick={singInFunc}

                    className="w-full mb-5 py-3 bg-green-700 text-white font-medium text-sm rounded shadow-md "
                  >
                    LOGIN WITH EMAIL
                  </button>
                  <LoginWithSocial />


                  <p className="text-sm font-semibold mt-2 pt-1  mb-0">
                    New to Retouched.ai?
                    <Link to="/sign-up">
                      <a href="#" className="text-green-600">
                        Create an account
                      </a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignIn;
