import { useState } from "react";
import HeaderFive from "../microComponent/HeaderFive";
import ParagraphOne from "../microComponent/ParagraphOne";


const SectionFourPartTwo = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      const textToCopy = `POST /api /2023-02/set - password\nRequest :\n{\n  "verified_token": "VerifiedToken",\n  "password": "ExamplePassword",\n  "confirm_password": "ExamplePassword"\n}\nResponse:\n{\n  "message": "SUCCESS : User information updated successfully .",\n  "status": "success",\n  "status_code": 200\n}`;
  
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

      <HeaderFive className="ml-2 mb-2 ">3.2 Set Password</HeaderFive>
      <ParagraphOne className="mb-[28px]">
        <span className="font-semibold ml-2 ">Listing 2:</span> Set Password Request and Response
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
            <span>"verified_token"</span>: "<span>VerifiedToken</span>"
          </span>
          <br />
          &nbsp;&nbsp;
          <span className="text-[#A01ED4]">
            <span>"password"</span>: "<span>ExamplePassword</span>"
          </span>
          <br />
          &nbsp;&nbsp;
          <span className="text-[#A01ED4]">
            <span>"confirm_password"</span>: "<span>ExamplePassword</span>"
          </span>
          <br />
          {"}"}
          <br />
          Response:
          <br />
          {"{"}
          <br />
          &nbsp;&nbsp;<span className="text-[#A01ED4]">"message"</span>:{" "}
          <span className="text-[#A01ED4]">"SUCCESS : User information updated successfully."</span>,
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

export default SectionFourPartTwo;