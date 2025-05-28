import { apiUrlContextManager, userContextManager } from "@/context/AppContexts";
import { useContext, useEffect, useState } from "react";

const ContactMessageInfo = () => {
  const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] =
    useContext(apiUrlContextManager);
  const [getUserInfo, setUserInfo, getToken, setToken] =
    useContext(userContextManager);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(getApiBasicUrl + "/api/2023-02/get-all-contact-messages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${getToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages(data.results.messageList);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-2 sm:p-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Contact Messages
        </h1>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error fetching data</p>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex flex-col  space-y-3">
                  {/* Row 1 - Name */}
                  <div className="flex text-xs sm:text-base">
                    <p className="w-1.5/5 sm:w-1/5 bg-gradient-to-r from-blue-200 to-blue-300 text-blue-900 px-4 py-1 rounded-md font-semibold">
                      Name:
                    </p>
                    <p className="w-3.5/5 sm:w-4/5 text-gray-800 ml-2 py-1 sm:ml-0 text-left px-4">
                      {message.name}
                    </p>
                  </div>

                  {/* Row 2 - Email */}
                  <div className="flex text-xs sm:text-base">
                    <p className="w-1.5/5 sm:w-1/5 bg-gradient-to-r from-purple-200 to-purple-300 text-purple-900 px-4 py-1 rounded-md font-semibold">
                      Email:
                    </p>
                    <p className="w-3.5/5 sm:w-4/5 text-gray-800 ml-3 py-1 sm:ml-0 text-left px-4">
                      {message.email}
                    </p>
                  </div>

                  {/* Row 3 - Subject */}
                  <div className="flex text-xs sm:text-base">
                    <p className="sm:w-1/5 w-1.5/5 bg-gradient-to-r from-indigo-200 to-indigo-300 text-indigo-900 px-4 py-1 rounded-md font-semibold">
                      Subject:
                    </p>
                    <p className="w-3.5/5 sm:w-4/5 text-gray-800 py-1 text-left px-4">
                      {message.subject}
                    </p>
                  </div>

                  {/* Row 4 - Message */}
                  <div className="flex text-xs sm:text-base">
                    <p className="w-1.5/5 sm:w-1/5 h-6 sm:h-full bg-gradient-to-r from-gray-200 to-gray-300 text-gray-900 px-4 py-1 rounded-md font-semibold">
                      Message:
                    </p>
                    <p className="w-3.5/5 sm:w-4/5  text-gray-800 text-left pl-2 py-1 sm:px-4 leading-relaxed">
                      {message.message}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 text-right mt-4">
                  {new Date(message.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessageInfo;
