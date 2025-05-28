import { useState } from 'react';

const CodeSnippet = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `POST /api/2023-02/system-sign-up\nRequest:\n{\n  "email": "user@example.com"\n}\nResponse:\n{\n  "message": "Sign-up Successful.",\n  "status": "success",\n  "status_code": 200\n}`;
    
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="bg-[#F2F2EA] p-4 shadow-md max-w-lg mx-auto relative">
      <pre className="text-sm text-gray-800 whitespace-pre-wrap">
        POST /api/<span className="text-[#0000FF]">2023-02</span>/system-sign-up
        <br />
        Request:
        <br />
        {'{'}
        <br />
        &nbsp;&nbsp;<span className="text-[#A01ED4]"><span>"email"</span>: "<span>user@example.com</span>"</span>
        <br />
        {'}'}
        <br />
        Response:
        <br />
        {'{'}
        <br />
        &nbsp;&nbsp;<span className="text-[#A01ED4]">"message"</span>: <span className="text-[#A01ED4]">"Sign-up Successful."</span>,
        <br />
        &nbsp;&nbsp;<span className="text-[#A01ED4]">"status"</span>: <span className="text-[#A01ED4]">"success"</span>,
        <br />
        &nbsp;&nbsp;<span className="text-[#A01ED4]">"status_code"</span>": <span className="text-[#0000FF]">200</span>
        <br />
        {'}'}
      </pre>
      
      <div className="flex justify-end mt-4">
        <div className="relative flex items-center">
          <img
            src="/img/API-Docx/copy-icon.svg"
            onClick={handleCopy}
            className="h-6 w-6 text-blue-500 cursor-pointer hover:text-blue-600"
            alt="Copy icon"
          />
          {copied && (
            <span className="absolute -top-8 right-0 bg-black text-white text-xs rounded px-2 py-1">
              Copied!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeSnippet;
