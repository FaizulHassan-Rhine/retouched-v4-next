import React, { useContext, useEffect, useState } from "react";
import localforage from "localforage";
import { apiUrlContextManager, userContextManager } from "@/context/AppContexts";
import Navbar from "@/components/Navbar/Navbar";


const ProfileInfo = () => {
    const [getuserDetails, setUserDetails] = useState({})
    const [activeLink, setActiveLink] = useState("Profile");
    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);

    const [isEditing, setIsEditing] = useState(false);
    const [fullName, setFullName] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [previousPassword, setPreviousPassword] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    // const [passerror, setPassError] = useState("");

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // Perform save logic or API request to update the full name
        setIsEditing(false);
    };

    const handleEditedClick = () => {
        setEditMode(true);
    };

    const handleSavedClick = () => {

        if (previousPassword.trim() === '') {
            setError();
            return;
        }

        if (!password || !confirmPassword) {
            setError();
            return;
        }


        if (password !== confirmPassword) {
            setError();
            return;
        }
        setEditMode(false);
        setPassword("");
        setConfirmPassword("");
        setError("");
    };

    const handleCancelClick = () => {
        setEditMode(false);
        setPassword("");
        setConfirmPassword("");
        setError("");
    };


    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    };

    const [isDiv1Visible, setIsDiv1Visible] = useState(false);
    const [isDiv2Visible, setIsDiv2Visible] = useState(false);
    const [isDiv3Visible, setIsDiv3Visible] = useState(true);

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


    const [getProfileImage, setProfileImage] = useState("");
    const [showUploadLogo, setShowUploadLogo] = useState(false);

    const handleImageUpload = (event) => {
        debugger; 
        const file = event.target.files[0];

        if (file.type == "image/jpeg" ||
            file.type == "image/png" ||
            file.type == "image/webp") {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setProfileImage(reader.result);
                    userProfilePictureUpdate(file)
                }
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        }

    };

    function handleLinkClick(link) {
        setActiveLink(link);
    }
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
                console.log("userInfo", data)
                userInfoDetail.results.full_name = data.results.full_name;
                // setUserInfo({}); 
                setUserInfo(getUserInfo => ({
                    ...getUserInfo,
                    ...userInfoDetail
                }))
                localforage.setItem("userInfo", userInfoDetail);
            })

        handleSaveClick();

    }
    const userProfilePictureUpdate = async (profileFile) => {
        let userInfoDetail = getUserInfo;

        let data = new FormData();
        data.append("File", profileFile);

        try {
            const response = await fetch(`${getApiBasicUrl}/api/2023-02/user-profile-picture-update`,
                {
                    method: "POST",
                    headers: {
                        'Authorization': 'bearer ' + getToken
                    },
                    body: data
                }
            );
            const result = await response.json();
            console.log("image result : ", result);
            if (result.status_code == 200) {
                userInfoDetail.results.profile_path = result.results.user_profile[0].profile_path;
                // setUserInfo({}); 
                setUserInfo(getUserInfo => ({
                    ...getUserInfo,
                    ...userInfoDetail
                }))
                localforage.setItem("userInfo", userInfoDetail);
            }
        } catch (error) {
            // console.log(error)
        }

    }
    const userPasswordUpdate = () => {

        const UserPassword = {
            "previousPassword": previousPassword,
            "password": password,
            "confirm_password": confirmPassword
        }


        if (previousPassword.length > 0 && password.length > 0 && confirmPassword.length > 0) {
            fetch(getApiBasicUrl + "/api/2023-02/reset-password", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'bearer ' + getToken
                },
                body: JSON.stringify(UserPassword),

            })
                .then((res) => res.json())
                .then((data) => {
                    setError(data.message)
                    data.status_code == 205 && setTimeout(() => {
                        handleCancelClick()
                    }, 2000);
                })

        } else {
            setError("Fill-out Input fields")
        }

        // handleSavedClick();

    }

    useEffect(() => {
        fetch(getApiBasicUrl + '/api/2023-02/user-info', {
            headers: {
                'Authorization': 'bearer ' + getToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.status_code == 200) {
                    setUserDetails(data)
                    setFullName(data.results.user_info[0].full_name)
                    setProfileImage(data.results.user_info[0].profile_path)
                }

            })
    }, [getToken])
    return (
        <>
            <Navbar />
            <div className="h-[600px] w-full container mx-auto ">
                <div>
                    <h2 className="text-4xl mt-6 font-bold "></h2>
                    {/* <h2 className="text-xl font-semibold mt-4 text-green-500 ">{typeof getuserDetails.results !== 'undefined' && getuserDetails.results.user_info[0].full_name}</h2> */}
                </div>


                <div className=" w-[400px] bg-white sm:w-[600px] md:w-[800px]  border-2 shadow-2xl rounded-lg  h-[350px] md:h-[300px] mt-16 absolute left-[50%]"
                    style={{ transform: 'translateX(-50%)' }}>
                    <div className="flex justify-evenly">
                        {/* <button onClick={() => { showDiv1(); handleLinkClick("myPlan") }} className={`text-xs md:text-base px-2 py-1  font-semibold ${activeLink === "myPlan" ? "border-b-4 border-green-500" : ""
                        }`}>My Plan</button>
                    <button onClick={() => { showDiv2(); handleLinkClick("Payment") }} className={`text-xs md:text-base px-2 py-1 font-semibold ${activeLink === "Payment" ? "border-b-4 border-green-500" : ""
                        }`}>Payment & Billing</button> */}
                        <button
                            // onClick={() => { showDiv3(); handleLinkClick("Profile") }}
                            className={`text-xs md:text-base px-2 py-1 font-semibold ${activeLink === "Profile" ? "border-b-4 border-green-500" : ""
                                }`}>Account Settings</button>

                    </div>

                    {/* Div 1 */}
                    {isDiv1Visible &&
                        <div className="w-full h-full bg-blue-100  rounded-lg">

                        </div>}

                    {/* Div 2 */}
                    {isDiv2Visible &&
                        <div className="w-full h-full bg-green-100 rounded-lg">

                        </div>}

                    {/* Div 3 */}
                    {isDiv3Visible &&
                        <div className="w-full h-full  rounded-lg flex flex-col md:flex-row justify-evenly items-center">
                            {/* <div className="h-16 w-16 sm:h-24 sm:w-24 md:h-40 md:w-40 border-8 border-stone-100 shadow-xl  rounded-full">
                            <img className="h-full w-full rounded-full" src={profile} />
                        </div> */}
                            <div
                                className="h-16 w-16 sm:h-24 sm:w-24 md:h-40 md:w-40 border-8 border-stone-100 shadow-xl rounded-full relative"
                                onMouseEnter={() => setShowUploadLogo(true)}
                                onMouseLeave={() => setShowUploadLogo(false)}
                            >
                                {showUploadLogo && (
                                    <label
                                        htmlFor="file-upload"
                                        className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-full cursor-pointer"
                                    >
                                        <span className="text-white font-semibold text-center">
                                            Upload

                                        </span>
                                    </label>
                                )}
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/jpeg, image/png, image/webp"
                                    style={{ display: 'none' }}
                                    onChange={handleImageUpload}
                                />

                                <img
                                    className="h-full w-full bg-gray-500 rounded-full"
                                    src={getUserInfo.results.profile_path}
                                // alt="Updated Image"
                                />


                            </div>
                            <div className="sm:h-16 sm:w-[400px] md:h-40 md:w-[490px] flex flex-col  justify-center gap-4 ">
                                {/* <div className="flex justify-between gap-2 text-xs sm:text-base border-b border-stone-100 ">
                                <h2 className="font-semibold">Name</h2>
                                <h2>{typeof getuserDetails.results !== 'undefined' && getuserDetails.results.user_info[0].full_name} <i className="fa-solid text-xs fa-pen-to-square"></i></h2>
                            </div> */}
                                <div className="flex justify-between gap-2 text-xs md:text-base sm:text-xs border-b border-stone-100">
                                    <h2 className="font-semibold">Name</h2>
                                    {isEditing ? (
                                        <div >
                                            <input
                                                className="h-5 md:h-7 w-36 md:w-44 text-xs md:text-base border p-1 border-blue-200 focus:outline-blue-200 rounded-md "
                                                type="text"
                                                value={fullName}
                                                onChange={handleFullNameChange}
                                            />
                                            <button className="bg-green-500 text-xs px-2 py-1 ml-1 mb-1 text-white rounded-md" onClick={updateUserDetailsFunc}>Update</button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <h2>{fullName}</h2>
                                            <i className="fa-solid mt-1 hover:cursor-pointer text-xs fa-pen-to-square" onClick={handleEditClick}></i>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-between gap-2 md:text-base text-xs sm:text-xs border-b border-stone-100">
                                    <h2 className="font-semibold">Contact Information</h2>
                                    <h2>{typeof getuserDetails.results !== 'undefined' && typeof getuserDetails.results.user_info !== "undefined" && getuserDetails.results.user_info[0].email} </h2>
                                </div>

                                <div className="flex justify-between text-xs sm:text-xs md:text-base border-b border-stone-100">
                                    <h2 className="font-semibold"> Password</h2>
                                    {editMode ? (
                                        <>
                                            <div className="flex flex-col gap-3">
                                                <input
                                                    type="password"
                                                    className="h-5 md:h-7 w-24 md:w-36  border-blue-200 border text-xs p-1 focus:outline-blue-200 rounded-md"
                                                    placeholder="Previous Password"
                                                    value={previousPassword}
                                                    onChange={(e) => setPreviousPassword(e.target.value)}
                                                />
                                                <input
                                                    type="password"
                                                    className="h-5 md:h-7 w-24 md:w-36  border-blue-200 border text-xs p-1 focus:outline-blue-200 rounded-md"
                                                    placeholder="New Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <input
                                                    type="password"
                                                    className="h-5 md:h-7 w-24 md:w-36  border-blue-200 border text-xs p-1 focus:outline-blue-200 rounded-md"
                                                    placeholder="Confirm Password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <button className="bg-green-500 text-xs h-7 px-2 py-1 text-white rounded-md ml-2" onClick={userPasswordUpdate}>Save</button>
                                                <button className="bg-red-500 text-xs h-7 px-2 py-1 text-white rounded-md ml-2" onClick={handleCancelClick}>Cancel</button>
                                            </div>
                                            {error && (
                                                <div className="modal ">
                                                    <div className="modal-content bg-yellow-200 p-1 w-32 md:w-52 rounded-md text-xs  absolute right-1 top-2">
                                                        <p>{error}</p>

                                                    </div>
                                                </div>
                                            )}
                                        </>

                                    ) : (
                                        <>
                                            <h2>********   <i
                                                className="fa-solid ml-3 hover:cursor-pointer text-xs fa-pen-to-square"
                                                onClick={handleEditedClick}
                                            ></i></h2>

                                        </>
                                    )}
                                </div>
                                {/* <div className="flex justify-between text-xs sm:text-xs md:text-base border-b border-stone-100">
                                <h2 className="font-semibold">ID Password</h2>
                                <h2>******** <i className="fa-solid mt-1 hover:cursor-pointer text-xs fa-pen-to-square"></i></h2>
                            </div> */}
                                {/* <div className="flex justify-between text-xs sm:text-base border-b border-stone-100">
                                <h2 className="font-semibold">Notification Settings</h2>
                                <h2 className=" flex gap-2"><i className="h-7 cursor-pointer w-7 text-green-500 pt-1 border rounded-full border-stone-200 fa-regular fa-bell"></i><i className="fa-regular cursor-pointer h-7 w-7 pt-1 text-red-500 border rounded-full border-stone-200 fa-bell-slash"></i></h2>
                            </div> */}

                            </div>

                        </div>}


                </div>


            </div>
        </>
    )
}

export default ProfileInfo;