import React, { useContext, useEffect, useState } from 'react';
import LogoWithChar from '../LogoWithChar/LogoWithChar';
import { userContextManager } from '@/context/AppContexts';

const UserImage = () => {
  const context = useContext(userContextManager);

  if (!context) {
    console.error("userContextManager is not available.");
    return null; // or a fallback UI
  }

  const [getUserInfo, setUserInfo, getToken, setToken] = context;
  const [getImageValid, setImageValid] = useState(false);

  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  useEffect(() => {
    const path = getUserInfo?.results?.profile_path;
    setImageValid(path ? isImage(path) : false);
  }, [getUserInfo?.results?.profile_path]);

  return getImageValid ? (
    <img className="h-8 w-8 rounded-full" src={getUserInfo.results.profile_path} alt="" />
  ) : (
    <LogoWithChar name={getUserInfo?.results?.full_name || "DF"} />
  );
};

export default UserImage;
