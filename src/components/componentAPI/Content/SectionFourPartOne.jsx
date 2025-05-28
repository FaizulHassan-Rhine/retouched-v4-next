import { useState } from "react";
import HeaderFive from "../microComponent/HeaderFive";
import HeaderOne from "../microComponent/HeaderOne";
import ParagraphOne from "../microComponent/ParagraphOne";

const SectionFourPartOne = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `POST /api/2023-02/system-sign-up\nRequest:\n{\n  "email": "user@example.com"\n}\nResponse:\n{\n  "message": "Sign-up Successful.",\n  "status": "success",\n  "status_code": 200\n}`;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  return (
    <div className=" flex flex-col ">
      <HeaderOne className={"flex justify-start items-center gap-2 text-[16px] lg:text-[24px]"}><span className="hidden lg:block">3. </span><span className="block lg:hidden"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path d="M7.79183 17.3891H7.3335C3.66683 17.3891 1.8335 16.4725 1.8335 11.8891V7.30581C1.8335 3.63914 3.66683 1.80581 7.3335 1.80581H14.6668C18.3335 1.80581 20.1668 3.63914 20.1668 7.30581V11.8891C20.1668 15.5558 18.3335 17.3891 14.6668 17.3891H14.2085C13.9243 17.3891 13.6493 17.5267 13.4752 17.7558L12.1002 19.5892C11.4952 20.3958 10.5052 20.3958 9.90015 19.5892L8.52515 17.7558C8.37849 17.5542 8.0485 17.3891 7.79183 17.3891Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M7.33333 7.97501L5.5 9.80835L7.33333 11.6417" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M14.6665 7.97501L16.4998 9.80835L14.6665 11.6417" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M11.9168 7.67249L10.0835 11.9442" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
</svg></span> Detailed Endpoint Descriptions</HeaderOne>
      <HeaderFive className="ml-2 mb-2 mt-2">3.1 Sign-Up</HeaderFive>
      <ParagraphOne className="mb-[28px]">
        <span className="font-semibold ml-2 ">Listing 1:</span> System Sign-Up
        Request and Response
      </ParagraphOne>

      {/* Code Snippet */}
      <div className="bg-[#F2F2EA] p-4 shadow-md font-anek-latin w-full mx-auto relative ">
        <pre className="text-sm text-gray-800 overflow-x-auto overflow-y-hidden">
          POST /api/<span className="text-[#0000FF]">2023-02</span>
          /system-sign-up
          <br />
          Request:
          <br />
          {"{"}
          <br />
          &nbsp;&nbsp;
          <span className="text-[#A01ED4]">
            <span>"email"</span>: "<span>user@example.com</span>"
          </span>
          <br />
          {"}"}
          <br />
          Response:
          <br />
          {"{"}
          <br />
          &nbsp;&nbsp;<span className="text-[#A01ED4]">"message"</span>:{" "}
          <span className="text-[#A01ED4]">"Sign-up Successful."</span>,
          <br />
          &nbsp;&nbsp;<span className="text-[#A01ED4]">"status"</span>:{" "}
          <span className="text-[#A01ED4]">"success"</span>,
          <br />
          &nbsp;&nbsp;<span className="text-[#A01ED4]">
            "status_code"
          </span>": <span className="text-[#0000FF]">200</span>
          <br />
          {"}"}
        </pre>

        <div className="absolute flex gap-2 items-end right-3 bottom-3">
          <div className="relative flex items-center">
            <svg
              onClick={handleCopy}
              className="h-6 w-6 text-black cursor-pointer hover:text-green-600 transition-colors duration-300"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                ></path>
                <path
                  d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                ></path>
              </g>
            </svg>

            {/* <img
              src="/img/API-Docx/copy-icon.svg"
              onClick={handleCopy}
              className="h-6 w-6 text-blue-500 cursor-pointer hover:text-blue-600"
              alt="Copy icon"
            /> */}
            {copied && (
              <span className="absolute -top-8 right-0 bg-black text-white text-xs rounded px-2 py-1">
                Copied!
              </span>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default SectionFourPartOne;
