import { useState } from "react";


const ReworkConfirmModal = ({ reworkModalCallBack }) => {
    const [isReworkConfirmModalOpen, setIsReworkConfirmModalOpen] = useState(false);

    const closeReworkModal = () => {
        document.querySelector("body").style.overflow = "visible";
        reworkModalCallBack(false);
      };
    return (
      
     
           <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center p-4 z-50">
           <div className="bg-white p-4 rounded-lg flex justify-center items-center gap-5 border-4 border-r-orange-300">
             <div className="w-[320px] h-[150px]">
              <div className="pt-5">
               <h1 className="font-semibold text-center text-xl">Rework on Process!</h1>
               <p className="text-sm text-center">Great! Your images are being processed for rework by our experts! Please check your order list.</p>
               
              </div>
              <div className="flex justify-center">
              <button onClick={() => closeReworkModal(false)} className="px-6 py-1 mt-4 bg-[#F9A431] text-white font-semibold  shadow-lg  rounded-3xl">Okay</button>
              </div>
             </div>
             </div>
         </div>
     
 
        
    );
};

export default ReworkConfirmModal;