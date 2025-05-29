import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
// import "./Navbar.css";
import SignInForm from "../SignInForm/SignInForm";
import localforage from "localforage";


import UserImage from "./UserImage";
import {
  apiUrlContextManager,
  menuContextManager,
  userContextManager,
} from "@/context/AppContexts";

import { useRouter } from "next/router";
import Link from "next/link";
import SignInSignUpBtn from "../SignInSignUpBtn/SignInSignUpBtn";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

 


const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
const [getMenuId, setMenuId, getMenu, setMenu] = useContext(menuContextManager);
const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);
  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const router = useRouter();

  const [activeLink, setActiveLink] = useState("");

  function handleLinkClick(link) {
    setActiveLink(link);
  }

  const navMenu = () => {
    fetch(getApiBasicUrl + "/api/2023-02/menu", {
      headers: {
        Authorization: "bearer " + getToken,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
      })
      .catch((error) => console.error("Failed to fetch order details:", error));
  };

  const refresh = () => {
    window.location.reload(true);
  };
  const signOutFunc = () => {
    localforage.removeItem("userInfo");
    setUserInfo({});
   router.push("/");

    refresh();
  };


  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }


  useEffect(() => {
    navMenu();
    console.log("getMenu", getMenu);
  }, [getUserInfo]);

  return (
    <div className="w-full bg-white top-0 z-[999] border-b-[2px] border-solid border-black">
      <div className='container mx-auto px-3 lg:px-0'>
        <nav className="w-full bg-white">
          <div className="font-gilroy justify-between py-5 flex flex-col lg:flex-row items-center">
            <div className="flex w-full lg:w-auto">
              <div className="w-full lg:w-auto flex items-center justify-between lg:block">
                <Link href="/">
                  <img className="h-8 lg:h-9 w-36 lg:w-40" src="/images/newlogoBlack.png" />
                </Link>
                <div className="lg:hidden">
                  <button
                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                    onClick={() => setNavbar(!navbar)}
                  >
                    {navbar ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-black"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`flex justify-center items-center pb-3 mt-8 lg:block lg:pb-0 lg:mt-0 ${navbar ? "block" : "hidden"
                }`}
            >
              <div className=" flex flex-col lg:flex-row justify-center items-center gap-5">
                <div >
                  <ul className="items-center justify-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
                    {getUserInfo.status_code === 200 &&
                      Object.keys(getMenu).length > 0 &&
                      getMenu.results &&
                      typeof getMenu.results.menu_list !== "undefined" &&
                      getMenu.results &&
                      getMenu.results.menu_list &&
                      getMenu.results.menu_list.length > 0 &&
                      getMenu.results.menu_list.map((menu, index) => (

                     
                        <li
                          key={index}
                          className="text-[#5A5555] text-[15px] text-center font-bold hover:text-orange-400"
                        >
                           {
                            menu.name === "API" ? (
                              <Link
                                href={`${menu.url}`}
                                target="_blank"
                                onClick={() => handleLinkClick(menu.name)}
                                className={` ${activeLink === menu.name ? "text-orange-400" : ""
                                  }`}
                              >
                                {menu.name}
                              </Link>
                            ) : (
                              <Link
                              href={`${menu.url}`}
                              onClick={() => handleLinkClick(menu.name)}
                              className={` ${activeLink === menu.name ? "text-orange-400" : ""
                                }`}
                            >
                              {menu.name}
                            </Link>
                            )
                          }
                        </li>

                      ))}
                  </ul>
                </div>

                <div>
                  <ul className="items-center justify-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
                    {getToken === "p_k_hKqzczG8QEAdqdy0h5OMOO0ngQ4nawou" &&
                      Object.keys(getMenu).length > 0 &&
                      getMenu.results &&
                      typeof getMenu.results.menu_list !== "undefined" &&
                      getMenu.results &&
                      getMenu.results.menu_list &&
                      getMenu.results.menu_list.length > 0 &&
                      getMenu.results.menu_list.map((menu, index) => (
                        <li
                          key={index}
                          className="text-[#5A5555] text-[15px] text-center font-bold hover:text-orange-400"
                        >
                          {
                            menu.name === "API" ? (
                              <Link
                                href={`${menu.url}`}
                                target="_blank"
                                onClick={() => handleLinkClick(menu.name)}
                                className={` ${activeLink === menu.name ? "text-orange-400" : ""
                                  }`}
                              >
                                {menu.name}
                              </Link>
                            ) : (
                              <Link
                              href={`${menu.url}`}
                              onClick={() => handleLinkClick(menu.name)}
                              className={` ${activeLink === menu.name ? "text-orange-400" : ""
                                }`}
                            >
                              {menu.name}
                            </Link>
                            )
                          }
                        </li>
                      ))}

                   


                  </ul>
                </div>

                {getUserInfo.status_code == 200 ? (
                  <Menu as="div" className="relative mt-4  space-x-2 lg:hidden">
                    <div className="flex justify-center">
                      <Menu.Button className="flex rounded-full bg-slate-400 border-2 border-gray-500 text-sm focus:outline-none">
                        <UserImage />
                       
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile/settings"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-center text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? "bg-gray-100 w-full" : "",
                                "w-full block px-4 text-center py-2 text-sm text-gray-700"
                              )}
                              onClick={signOutFunc}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="mt-3 space-y-2 lg:hidden ">
                   <SignInSignUpBtn/>
                  </div>
                )}
              </div>
            </div>
            {getUserInfo.status_code == 200 ? (
              <Menu
                as="div"
                id="dropdown24"
                className="relative ml-3 hidden space-x-2 lg:inline-block"
              >
                <div className="flex gap-[10px] justify-center items-center">
                  <span className="text-[#5A5555] text-[15px] font-bold capitalize">{getUserInfo.status_code == 200 && getUserInfo?.results?.full_name}</span>
                  <div>

                    <Menu.Button className="flex rounded-full border-[3px] border-[#255646] text-sm focus:outline-none">
                      <UserImage />
                     
                    </Menu.Button>
                  </div>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/profile/settings"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-center text-sm text-gray-700"
                          )}
                        >
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active ? "bg-gray-100 w-full" : "",
                            "w-full block px-4 py-2 text-center text-sm text-gray-700"
                          )}
                          onClick={signOutFunc}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="hidden lg:flex">
                <SignInSignUpBtn />
              </div>
            )}
          </div>
        </nav>
        
      </div>
    </div>
  );
};




export default Navbar;
