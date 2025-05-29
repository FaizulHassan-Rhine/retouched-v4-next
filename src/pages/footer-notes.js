import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { apiUrlContextManager, userContextManager } from "@/context/AppContexts";
import React, { useContext, useState } from "react";


const FooterNotes = () => {
  const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] =
    useContext(apiUrlContextManager);
  const [getUserInfo, setUserInfo, getToken, setToken] =
    useContext(userContextManager);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const characterLimit = 200;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "message" && value.length > characterLimit) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        getApiBasicUrl + "/api/2023-02/insert-contact-message",
        {
          method: "POST",
          headers: {
            Authorization: "bearer " + getToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      setSuccess("Your message has been sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto font-gilroy">
        <div className="mb-[40px] mt-[40px] px-2 md:px-0">
          <div>
            <h1 className="text-[36px] font-bold  text-[#000] font-jakarta ">
              Footer Notes
            </h1>
            <div className="flex flex-col md:flex-row md:justify-between items-center gap-[66px]">
              <div className="w-full md:w-[767px] ">
                <h1 className="text-[32px] font-bold  text-[#000] font-jakarta mt-[20px] mb-[5px]">
                  FAQ
                </h1>
                <div className="leading-[39px] pb-5">
                  <h1 className="text-[20px] font-semibold  text-[#000]">
                    1. How does AI background removal work?
                  </h1>
                  <p className="text-[20px] font-normal  text-[#000]">
                    Our AI detects the subject in your image and removes the
                    background with precision, ensuring a clean and polished
                    result in seconds.
                  </p>
                </div>
                <div className="leading-[39px] pb-5">
                  <h1 className="text-[20px] font-semibold  text-[#000]">
                    2. Can I customize AI-generated backgrounds?
                  </h1>
                  <p className="text-[20px] font-normal  text-[#000]">
                    Yes! You can tweak the style, theme, and elements of
                    AI-generated backgrounds to suit your creative needs.
                  </p>
                </div>
                <div className="leading-[39px] pb-5">
                  <h1 className="text-[20px] font-semibold  text-[#000]">
                    3. How do I request manual retouching?
                  </h1>
                  <p className="text-[20px] font-normal  text-[#000]">
                    Simply upload your image and select the “Manual Retouching”
                    option. Our team of professional retouchers will ensure your
                    photos look flawless.
                  </p>
                </div>
                <div className="leading-[39px] pb-5">
                  <h1 className="text-[20px] font-semibold  text-[#000]">
                    4. What formats can I download my images in?
                  </h1>
                  <p className="text-[20px] font-normal  text-[#000]">
                    You can download images in multiple formats, including PNG,
                    JPG, TIFF, and PSD, optimized for web, print, or social
                    media.
                  </p>
                </div>
              </div>
              <div className="bg-[#255646] w-full md:w-[511px] px-[47px] pt-[40px] pb-[50px] rounded-md">
                <div className="leading-[40px] mb-[30px]">
                  <h1 className="text-[32px] font-bold text-white">
                    Contact Us
                  </h1>
                  <h1 className="text-[20px] font-semibold text-white">
                    Need assistance? We’re here to help!
                  </h1>
                  {/* <h1 className="text-[20px] font-semibold text-white">
                    Email:{" "}
                    <span className="underline font-normal">
                      care@retouched.ai
                    </span>
                  </h1> */}
                </div>
                <form onSubmit={handleSubmit}>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2"
                  />

                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white mt-3 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2"
                  />

                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-white mt-3 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter the subject"
                    required
                    className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2"
                  />

                  <div className="flex flex-col w-full max-w-md mx-auto mt-5">
                    <label
                      htmlFor="message"
                      className="mb-2 text-sm font-medium text-white"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 bg-white rounded-md focus:outline-none"
                      rows="4"
                      placeholder="Type your message here (max 200 characters)"
                      required
                    />
                    <div className="mt-1 mb-[8px] font-semibold text-[12px] text-[#CACACA] text-end">
                      {formData.message.length}/{characterLimit} characters
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                  {success && (
                    <p className="text-green-500 text-sm mt-2">{success}</p>
                  )}

                  <button
                    type="submit"
                    className="text-[14px] font-medium flex w-full justify-center items-center px-[40px] py-[14px] bg-[#87E17F] text-[#000] mt-4"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                </form>
              </div>
            </div>
            <div className="mt-5 md:my-1  2xl:my-5">
              <h1 className="outline-slate-300  outline-1 outline-dashed w-full "></h1>
            </div>
            <div className="w-full md:w-[1108px]">
              <h1 className="text-[#000] text-[32px] font-bold leading-[79px]">
                Privacy Policy
              </h1>
              <h1 className="text-[#000] text-[20px] font-semibold leading-[39px]">
                Your privacy is important to us.
              </h1>
              <p className="text-[#000] text-[20px] font-normal leading-[39px] pb-4">
                <span className="font-semibold">Data Collection:</span> We only
                collect data necessary to provide and improve our services, such
                as uploaded images, account information, and usage statistics.
              </p>
              <p className="text-[#000] text-[20px] font-normal leading-[39px]">
                <span className="font-semibold">Data Security:</span> We
                implement industry-standard encryption and security measures to
                protect your data. Third-Party Sharing: We do not share your
                data with third parties unless required by law.
              </p>
            </div>
            <div className="mt-5 md:my-1  2xl:my-5">
              <h1 className="outline-slate-300  outline-1 outline-dashed w-full "></h1>
            </div>
            <div className="w-full">
              <h1 className="text-[#000] text-[32px] font-bold leading-[79px]">
                Terms of Use
              </h1>
              <h1 className="text-[#000] text-[20px] font-semibold leading-[39px]">
                By using Retouched.ai, you agree to the following:
              </h1>
              <p className="text-[#000] text-[20px] font-normal leading-[39px]">
                <span className="font-semibold">Account Usage:</span> You are
                responsible for maintaining the confidentiality of your account
                information.
              </p>
              <p className="text-[#000] text-[20px] font-normal leading-[39px]">
                <span className="font-semibold">Prohibited Content:</span> Do
                not upload copyrighted, obscene, or illegal content.
              </p>
              <p className="text-[#000] text-[20px] font-normal leading-[39px]">
                <span className="font-semibold">Liability:</span> Retouched.ai
                is not responsible for any damages resulting from the use of our
                services.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FooterNotes;
