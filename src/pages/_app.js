// pages/_app.js
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, createContext } from "react";
import { ToastContainer } from "react-toastify";
import Scroll from "@/components/Scroll/Scroll";
import InitialDataLoad from "@/components/InitialDataLoad/InitialDataLoad";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "@/components/Layout/Layout";
import {
  OrderContextManager,
  userContextManager,
  apiUrlContextManager,
  FileContextManager,
  menuContextManager,
} from "@/context/AppContexts";

// Contexts

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  // Context states
  const [fileInfo, setFileInfo] = useState([]);
  const [getImageUrl, setImageUrl] = useState("");
  const [getAfterBeforeImg, setAfterBeforeImg] = useState([]);
  const [getServiceTypeId, setServiceTypeId] = useState("");
  const [getUserInfo, setUserInfo] = useState({});
  const [getToken, setToken] = useState("p_k_hKqzczG8QEAdqdy0h5OMOO0ngQ4nawou");
  const [getOrderMasterId, setOrderMasterId] = useState("00b93d49-c32b-46d5-a3cd-8b6c4d04b41f");
  const [getSubscriptionPlanId, setSubscriptionPlanId] = useState("");
  const [getCostDetails, setCostDetails] = useState({});
  const [getOrderDetailInfo, setOrderDetailInfo] = useState([]);
  const [getModelBaseUrl, setModelBaseUrl] = useState("");
  const [getApiBasicUrl, setApiBasicUrl] = useState("https://api1.retouched.ai");
  const [getLimitImg, setLimitImg] = useState(0);
  const [getLimitUploadImg, setLimitUploadImg] = useState(0);
  const [getMenuId, setMenuId] = useState("");
  const [getMenuActive, setMenuActive] = useState(true);
  const [getMenu, setMenu] = useState([]);
  const [getProccessImgIndex, setProccessImgIndex] = useState(0);
  const [getTotalImage, setTotalImage] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <FileContextManager.Provider value={[
        fileInfo, setFileInfo,
        getAfterBeforeImg, setAfterBeforeImg,
        getProccessImgIndex, setProccessImgIndex,
        getTotalImage, setTotalImage,
        getImageUrl, setImageUrl
      ]}>
        <OrderContextManager.Provider value={[
          getServiceTypeId, setServiceTypeId,
          getSubscriptionPlanId, setSubscriptionPlanId,
          getOrderMasterId, setOrderMasterId,
          getCostDetails, setCostDetails,
          getOrderDetailInfo, setOrderDetailInfo,
          getLimitImg, setLimitImg,
          getLimitUploadImg, setLimitUploadImg
        ]}>
          <userContextManager.Provider value={[
            getUserInfo, setUserInfo,
            getToken, setToken
          ]}>
            <apiUrlContextManager.Provider value={[
              getModelBaseUrl, setModelBaseUrl,
              getApiBasicUrl, setApiBasicUrl
            ]}>
              <menuContextManager.Provider value={[
                getMenuId, setMenuId,
                getMenu, setMenu,
                getMenuActive, setMenuActive
              ]}>
                <div className="font-gilroy">
                  <Scroll />
                  <InitialDataLoad />
                  {/* <Layout> */}
                  <Component {...pageProps} />
                  {/* </Layout> */}
                  <ToastContainer />
                </div>
              </menuContextManager.Provider>
            </apiUrlContextManager.Provider>
          </userContextManager.Provider>
        </OrderContextManager.Provider>
      </FileContextManager.Provider>
    </QueryClientProvider>
  );
}
