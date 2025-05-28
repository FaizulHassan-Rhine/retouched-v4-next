
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
// import { apiUrlContextManager, userContextManager } from "../../App";
import { IoCloseCircleOutline } from "react-icons/io5";
import { apiUrlContextManager, userContextManager } from "@/context/AppContexts";
const Pricing = () => {
  const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
  const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] =
    useContext(apiUrlContextManager);
  const [priceDetails, setPriceDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


const toggleModal = () => {
  setIsModalOpen(!isModalOpen);
};

 



  const PriceDetailsFunc = () => {
   
    fetch(getApiBasicUrl + "/api/2024-04/subscription-plan-types-withpackages", {
        headers: {
            'Authorization': 'bearer ' + getToken,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(res => res.json())
        .then(data => {
        
          setPriceDetails(data);
        })
        .catch(error => console.error("Failed to fetch price details:", error))

       
}


// const SelectPointUpdate = (point) => {
  
//   setCustomPoints(point);
//   const selectPoint = {
//     "user_selected_point": point
//   }

//     fetch("https://shopifyapi.retouched.ai/api/2024-04/get-gettotalprice_byselectedpoint", {
//       method: "POST", // or 'PUT'
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "bearer " + getToken,
//       },
//       body: JSON.stringify(selectPoint),
//     })
//     .then(res => res.json())
//     .then(data => {
//       
//       data.status_code == 200 && setCustomPrice(data.results.total_price)
       
//     })
//     .catch(error => console.error("Failed to fetch", error))
//   }


// const SelectPriceUpdate = (price) => {
  

//   setCustomPrice(price);
//   const selectPrice = {
//     "user_selected_price": price
//   }

    
//     fetch("https://shopifyapi.retouched.ai/api/2024-04/get-gettotalpoint_byselectedprice", {
//       method: "POST", // or 'PUT'
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "bearer " + getToken,
//       },
//       body: JSON.stringify(selectPrice),
//     })
//     .then(res => res.json())
//     .then(data => {
//     
//         data.status_code == 200 && setCustomPoints(data.results.total_point); 
//     })
//     .catch(error => console.error("Failed to fetch", error))
//   }


useEffect(() => {
         
  PriceDetailsFunc();
  // SelectPointUpdate();
  // SelectPriceUpdate();
 
}, []);



  return (
    <div className=" bg-white pt-10 pb-16" id="price" >
      <div className="container mx-auto ">
        <div>
          <h1 style={{color: "#0F6C5F"}} className="text-3xl font-bold text-center ">
            Pricing
          </h1>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5  justify-items-center gap-10 lg:gap-10 xl:px-[40px] 2xl:px-[160px]">
            {/* -----------------------------------------1st--------------------------------------------------- */}
            {Object.keys(priceDetails).length > 0 && priceDetails.results && typeof priceDetails.results.subscription_plan_types !== 'undefined' &&
            priceDetails.results.subscription_plan_types != null && priceDetails.results.subscription_plan_types.map((data, index) => (
          <div key={index} className={`relative flex flex-col w-[230px] items-center bg-white p-2 rounded-lg shadow-[#a1bdb8] shadow-md py-10 ${index === 3 ? "lg:ml-[400px] xl:ml-0" : ""} ${index === 4 ? "lg:ml-[300px] xl:ml-0" : ""}`}>
            <div >
              <h2 className="font-bold text-2xl text-center mb-2 pb-4 border-b border-b-orange-200">
                {data.title}
              </h2>
              <p className="text-xs text-center h-10">
                {data.description}
              </p>
              <div className="flex flex-col items-center my-8">
               
                 
                  <p className="font-bold text-2xl">{data.packages[0] !== undefined  && data.packages[0] !== null && data.packages[0].point} <span style={{color: "#F9A431"}} className="text-xs font-semibold">Credits</span></p>
                    <p className="font-bold text-2xl"><span style={{color: "#F9A431"}} className="text-xs font-semibold">for just</span> ${data.packages[0] !== undefined  && data.packages[0] !== null && data.packages[0].price}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1 pb-10">
              {data.services.map((data2, index2) => (
              <div key={index2} className="flex items-center gap-2 text-xs">
                <IoMdCheckmarkCircleOutline style={{color: "#0F6C5F"}}  />
                <p className="text-[10px]">
                  {data2.name} - {data2.spend_point === "0" ? "Free" : data2.spend_point + " Credits"} 
                </p>
              </div>
              ))}

              <div className="flex justify-center mt-8 absolute bottom-[-20px] left-[33px]">
        
                <button style={{backgroundColor: "#F9A431"}} className=" px-12 py-2  text-white font-semibold shadow-gray-400 shadow-md border-gray-100 border-2 rounded-3xl">
                  Buy Now
          
                </button>
           
              </div>
            </div>
          </div>
        ))}
         
        </div>
      </div>

      {/* ---------------------------------price modal------------------------------ */}
      {/* <div className={`fixed inset-0 bg-black bg-opacity-30 z-50 ${!isModalOpen && 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen ">
                <div className="bg-white px-10 pt-10 rounded-lg relative">
                    <button onClick={toggleModal} className="absolute top-2 right-2 text-red-500 text-xl"><IoCloseCircleOutline /></button>
                    <div className="flex justify-center gap-4">
                    <div className="my-2">
                        <label>Points: </label>
                        <input
                            type="number"
                            value={customPoints}
                            onChange={(e) => SelectPointUpdate(e.target.value)}
                            className="border-2 w-20 rounded-md outline-none pl-2"
                        />
                    </div>
                    <div className="my-2">
                        <label>Price: </label>
                        <input
                            type="number"
                            value={customPrice}
                            onChange={(e) => SelectPriceUpdate(e.target.value)}
                            className="border-2 w-20 rounded-md outline-none pl-2"
                        />
                    </div>
                    </div>
                  <div className="flex justify-center pt-10 pb-3">
                  <button
                        onClick={() => {
                           
                            toggleModal();
                        }}
                        style={{backgroundColor: "#F9A431"}} className=" px-6 py-2  text-white font-semibold shadow-gray-400 text-md shadow-md border-gray-100 border-2 rounded-3xl"
                    >
                        Buy Now
                    </button>
                  </div>
                </div>
            </div>
        </div> */}

    </div>
  );
};

export default Pricing;
