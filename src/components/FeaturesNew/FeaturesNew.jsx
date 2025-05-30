import React from "react";

const FeaturesNew = () => {
  return (
    <div className="bg-[#255646] h-full font-gilroy">
      <div className="container mx-auto pt-[66px] pb-[60px] md:pb-[100px]">
        <div className=" pb-16 md:pb-[88px]">
          <h1 className="font-jakarta pb-3 md:pb-0 text-center md:text-left text-[24px] md:text-[36px] font-bold text-white leading-[120%]">
            Features
          </h1>
          <h1 className="text-[#B1BBC8] text-[16px] px-4 sm:px-0 md:text-[19px] text-center md:text-left font-semibold leading-[120%] lg:leading-[360%]">
            Discover powerful tools designed to simplify your workflow and
            elevate your creativity.
          </h1>
        </div>
        <div className="flex flex-col gap-20 sm:gap-0">
          <div className="flex flex-col   md:flex-row  md:justify-between items-center">
            <div className="w-full md:w-[426px] px-4 md:px-0 flex flex-col justify-center md:justify-end items-center md:items-start gap-[13px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                
                viewBox="0 0 63 67"
                fill="none"
                className="w-[46px] md:w-[63px] h-[49px] md:h-[67px]"
              >
                <rect
                  x="2"
                  y="11"
                  width="59"
                  height="44"
                  rx="12"
                  stroke="white"
                  strokeWidth="4"
                />
                <path
                  d="M31.5 2L31.5 65"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-[#87E17F] flex gap-2 md:flex-col text-center md:text-left text-[19px] md:text-[48px] font-bold leading-[112%]">
                <h1>Remove </h1>
                <h1>Background</h1>
              </div>
              <p className="text-[#FFF] text-[16px] font-normal text-center md:text-left leading-[150%]">
              Remove Background with just one click. Your image should stand out on its own but with that little help from Retouched.ai.{" "}
                <span className="font-bold">Remove Backgrounds</span> to make
                your products, portraits, or designs stand out.
              </p>
            </div>
            <div>
              <img
                src="/images/v-4/f-1.webp"
                alt="feature"
                className="w-full md:w-[600px] 2xl:w-[730px] px-6 md:px-0"
              />
            </div>
          </div>
          <div className="flex flex-col-reverse  gap-10 md:flex-row  md:justify-between items-center 2xl:pt-[80px]">
            <div>
              <img
                src="/images/v-4/f-2.webp"
                alt="feature"
                className="w-full md:w-[600px] 2xl:w-[730px] px-6 md:px-0"
              />
            </div>
            <div className="w-full md:w-[426px] px-6 md:px-0 flex flex-col justify-center md:justify-end items-center md:items-start gap-[13px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[46px] md:w-[63px] h-[49px] md:h-[67px]"
                viewBox="0 0 62 62"
                fill="none"
              >
                <path
                  d="M33.2442 5.60878C33.2442 4.38982 32.2068 3.35132 30.9867 3.35132C29.7677 3.35132 28.7292 4.38982 28.7292 5.60989V13.6012C28.7292 14.8468 29.7677 15.8853 30.9878 15.8853C32.2057 15.8853 33.2442 14.8468 33.2442 13.6012V5.60878ZM41.5998 17.1829C40.744 18.0387 40.744 19.4912 41.5998 20.3736C42.4822 21.2306 43.9613 21.2306 44.8182 20.3736L50.4746 14.7161C50.8982 14.2881 51.1358 13.7102 51.1358 13.108C51.1358 12.5058 50.8982 11.9279 50.4746 11.4999C49.6177 10.643 48.1651 10.643 47.2827 11.4999L41.5998 17.1829ZM17.1563 20.3736C18.0132 21.2306 19.4658 21.2306 20.3227 20.3736C21.204 19.4912 21.204 18.0376 20.3227 17.1817L14.7172 11.5254C13.8614 10.6695 12.4077 10.643 11.5254 11.4999C10.6695 12.3557 10.6695 13.8094 11.5254 14.6918L17.1563 20.3736ZM51.9804 56.2096C53.0709 57.3245 54.9386 57.3245 55.9771 56.2096C56.4954 55.6735 56.7851 54.957 56.7851 54.2112C56.7851 53.4655 56.4954 52.749 55.9771 52.2129L31.3244 27.4571C30.235 26.3677 28.3406 26.3677 27.3276 27.4571C26.2382 28.5997 26.2647 30.3911 27.3276 31.4805L51.9804 56.2096ZM5.60878 28.7304C4.38982 28.7304 3.35132 29.7677 3.35132 30.9867C3.35132 32.2068 4.38982 33.2453 5.60989 33.2453H13.6278C14.8734 33.2453 15.9107 32.2068 15.9107 30.9867C15.9107 29.7677 14.8734 28.7292 13.6278 28.7292L5.60878 28.7304ZM56.3646 33.2442C57.5847 33.2442 58.6487 32.2068 58.6487 30.9867C58.6487 29.7677 57.5847 28.7292 56.3646 28.7292H48.3722C47.1266 28.7292 46.0892 29.7677 46.0892 30.9878C46.0892 32.2057 47.1266 33.2442 48.3722 33.2442H56.3646ZM36.9033 38.3824L29.2751 30.7542C28.8079 30.287 28.7038 29.7932 29.119 29.326C29.5862 28.9108 30.0789 29.0149 30.5715 29.5076L38.1754 37.1358L36.9033 38.3824ZM11.4999 47.2573C10.643 48.1131 10.6175 49.5922 11.4733 50.4481C12.3302 51.305 13.8094 51.3305 14.6918 50.4746L20.3216 44.8171C20.531 44.6102 20.6972 44.3637 20.8107 44.092C20.9241 43.8204 20.9825 43.5289 20.9825 43.2345C20.9825 42.9401 20.9241 42.6486 20.8107 42.3769C20.6972 42.1052 20.531 41.8588 20.3216 41.6518C19.4912 40.7694 18.0132 40.7694 17.1563 41.6518L11.4999 47.2573ZM33.2442 48.3976C33.2442 47.1532 32.2068 46.1147 30.9867 46.1147C29.7677 46.1147 28.7292 47.1532 28.7292 48.3987V56.3912C28.7292 57.6102 29.7677 58.6487 30.9878 58.6487C32.2057 58.6487 33.2442 57.6102 33.2442 56.3901V48.3976Z"
                  fill="white"
                />
              </svg>
              <div className="text-[#87E17F] flex gap-2 md:flex-col text-center md:text-left text-[19px] md:text-[48px] font-bold leading-[112%]">
                <h1>Professional</h1>
                <h1>Touch-up</h1>
              </div>
              <p className="text-[#FFF] text-[16px] font-normal text-center md:text-left leading-[150%]">
              Ai is precise but human touch of Professional Touch-up can make it perfect! Get your one stop solution for knocking off backgrounds with{" "}
                <span className="font-bold">Retouched.ai</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-10 md:gap-10  md:flex-row  md:justify-between items-center md:pt-[140px] 2xl:pt-[220px]">
            <div className="w-full md:w-[426px] px-6 md:px-0 flex flex-col justify-center md:justify-end items-center md:items-start gap-[13px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
               className="w-[46px] md:w-[63px] h-[49px] md:h-[67px]"
                viewBox="0 0 62 62"
                fill="none"
              >
                <path
                  d="M53.6119 11.2168C54.0619 11.7326 54.2888 12.4059 54.2428 13.0889C54.1968 13.7718 53.8816 14.4086 53.3665 14.8593L12.0332 51.026C11.7796 51.2605 11.4817 51.4418 11.1569 51.5591C10.8322 51.6765 10.4872 51.7275 10.1423 51.7092C9.79749 51.691 9.45982 51.6037 9.14927 51.4527C8.83872 51.3017 8.5616 51.09 8.3343 50.83C8.10699 50.5701 7.9341 50.2672 7.82586 49.9393C7.71762 49.6113 7.67623 49.265 7.70412 48.9209C7.73201 48.5767 7.82863 48.2416 7.98826 47.9353C8.14788 47.6291 8.36728 47.358 8.63348 47.1381L49.9668 10.9714C50.4826 10.5214 51.1559 10.2945 51.8388 10.3405C52.5218 10.3865 53.1612 10.7017 53.6119 11.2168ZM53.6119 27.6856C54.0619 28.2014 54.2888 28.8747 54.2428 29.5576C54.1968 30.2406 53.8816 30.8773 53.3665 31.3281L30.8553 51.0286C30.5999 51.252 30.3029 51.4229 29.9814 51.5315C29.6599 51.6401 29.3202 51.6844 28.9816 51.6617C28.643 51.639 28.3122 51.5499 28.008 51.3994C27.7039 51.2489 27.4323 51.0399 27.2089 50.7845C26.9855 50.529 26.8147 50.232 26.706 49.9105C26.5974 49.5891 26.5531 49.2493 26.5758 48.9107C26.5985 48.5721 26.6876 48.2413 26.8381 47.9371C26.9887 47.633 27.1976 47.3615 27.4531 47.1381L49.9642 27.4402C50.2198 27.2165 50.5168 27.0455 50.8385 26.9368C51.1602 26.8281 51.5002 26.7839 51.8389 26.8067C52.1777 26.8295 52.5087 26.9188 52.8129 27.0696C53.1171 27.2204 53.3886 27.4298 53.6119 27.6856ZM49.9642 42.6172C50.4579 42.179 51.1007 41.9463 51.7606 41.9671C52.4204 41.9879 53.0473 42.2605 53.5124 42.7289C53.9776 43.1974 54.2458 43.8262 54.2619 44.4862C54.278 45.1461 54.0408 45.7872 53.599 46.2778L53.3665 46.5077L48.1998 51.0286C47.7054 51.462 47.0642 51.6905 46.4071 51.6676C45.75 51.6447 45.1264 51.3721 44.6633 50.9054C44.2001 50.4387 43.9324 49.8129 43.9147 49.1556C43.8969 48.4984 44.1304 47.8591 44.5677 47.368L44.8001 47.1381L49.9642 42.6172ZM34.7923 11.2168C35.2426 11.7323 35.47 12.4054 35.4245 13.0883C35.3789 13.7713 35.0642 14.4082 34.5495 14.8593L12.0383 34.5598C11.7829 34.7832 11.4859 34.9541 11.1644 35.0627C10.8429 35.1714 10.5032 35.2156 10.1646 35.193C9.82597 35.1703 9.49516 35.0811 9.19101 34.9306C8.88686 34.7801 8.61534 34.5712 8.39194 34.3157C8.16855 34.0602 7.99765 33.7633 7.88902 33.4418C7.78039 33.1203 7.73615 32.7806 7.75881 32.442C7.78148 32.1034 7.87062 31.7725 8.02114 31.4684C8.17166 31.1642 8.38061 30.8927 8.63607 30.6693L31.1472 10.9714C31.663 10.5214 32.3363 10.2945 33.0193 10.3405C33.7022 10.3865 34.339 10.7017 34.7897 11.2168H34.7923ZM14.9058 10.9714C15.4003 10.538 16.0414 10.3095 16.6985 10.3324C17.3556 10.3553 17.9793 10.6278 18.4424 11.0946C18.9055 11.5613 19.1732 12.1871 19.191 12.8443C19.2087 13.5016 18.9752 14.1409 18.538 14.632L18.3081 14.8619L12.0383 20.3515C11.5463 20.8013 10.8993 21.0435 10.2328 21.0274C9.56635 21.0113 8.9319 20.7381 8.46215 20.265C7.99241 19.7919 7.72374 19.1556 7.71234 18.489C7.70094 17.8224 7.94769 17.1772 8.40098 16.6883L8.63348 16.4584L14.9058 10.9714Z"
                  fill="white"
                />
              </svg>
              <div className="text-[#87E17F] flex gap-2 md:flex-col text-center md:text-left text-[19px] md:text-[48px] font-bold leading-[112%]">
                <h1>Preset</h1>
                <h1>Backgrounds</h1>
              </div>
              <p className="text-[#FFF] text-[16px] font-normal text-center md:text-left leading-[150%]">
              Don't just get rid of the backgrounds, replace it with the range of presets to choose from. This way, you can save up more time to focus on more exciting things!{" "}
              </p>
            </div>
            <div>
              <img
                src="/images/v-4/f-3.webp"
                alt="feature"
                className="w-full md:w-[600px] 2xl:w-[730px] px-6 md:px-0"
              />
            </div>
          </div>
          <div className="flex flex-col-reverse gap-10 md:gap-10  md:flex-row  md:justify-between items-center pt-10 md:pt-[140px] 2xl:pt-[220px]">
            <div>
              <img
                src="/images/v-4/f-4.webp"
                alt="feature"
                className="w-full md:w-[600px] 2xl:w-[730px] px-6 md:px-0"
              />
            </div>
            <div className="w-full md:w-[426px] px-6 md:px-0 flex flex-col justify-center md:justify-end items-center md:items-start gap-[13px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
               className="w-[46px] md:w-[63px] h-[49px] md:h-[67px]"
                viewBox="0 0 62 62"
                fill="none"
              >
                <path
                  d="M36.8125 11.625H50.375V25.1875M49.1362 12.8602L13.5601 48.4399M25.1875 50.375H11.625V36.8125"
                  stroke="white"
                  strokeWidth="3.875"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-[#87E17F] text-[24px] text-center md:text-left md:text-[48px] font-bold leading-[112%]">
                <h1>Smart Resizing</h1>
              </div>
              <p className="text-[#FFF] text-[16px] font-normal text-center md:text-left leading-[150%]">
              Maintaining size specification shouldn't limit you. Adjust your images specifically for your needs. From Facebook to Shopify, to Amazon, resize your images with our Smart Resizing tool!
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-10  md:gap-10 md:flex-row  md:justify-between items-center pt-10 md:pt-[140px] 2xl:pt-[220px]">
            <div className="w-full md:w-[426px] px-6 md:px-0 flex flex-col justify-center md:justify-end items-center md:items-start gap-[13px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
               className="w-[46px] md:w-[63px] h-[49px] md:h-[67px]"
                viewBox="0 0 62 62"
                fill="none"
              >
                <path
                  d="M2.5509 29.8175C4.25187 29.5095 5.97713 29.3554 7.70576 29.3569C14.7029 29.3569 21.111 31.8502 26.102 35.9998"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22.4795 47.0714H6.97947C5.80494 47.0714 4.67852 46.6048 3.848 45.7743C3.01748 44.9437 2.5509 43.8173 2.5509 42.6428V7.21422C2.5509 6.03969 3.01748 4.91326 3.848 4.08274C4.67852 3.25222 5.80494 2.78564 6.97947 2.78564H42.408C43.5826 2.78564 44.709 3.25222 45.5395 4.08274C46.37 4.91326 46.8366 6.03969 46.8366 7.21422V22.7142"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M28.0152 24.9284C29.4834 24.9284 30.8914 24.3451 31.9295 23.307C32.9677 22.2688 33.5509 20.8608 33.5509 19.3926C33.5509 17.9245 32.9677 16.5165 31.9295 15.4783C30.8914 14.4402 29.4834 13.8569 28.0152 13.8569C26.547 13.8569 25.139 14.4402 24.1009 15.4783C23.0627 16.5165 22.4795 17.9245 22.4795 19.3926C22.4795 20.8608 23.0627 22.2688 24.1009 23.307C25.139 24.3451 26.547 24.9284 28.0152 24.9284ZM32.5058 46.7789C30.9513 46.5088 30.9513 44.2768 32.5058 44.0067C35.2571 43.5254 37.8032 42.2369 39.8204 40.3049C41.8375 38.3729 43.2346 35.8847 43.8341 33.1566L43.9271 32.7271C44.2636 31.1904 46.4513 31.1815 46.8012 32.7138L46.9163 33.2142C47.5349 35.9317 48.9435 38.4055 50.9647 40.3243C52.986 42.2432 55.5297 43.5213 58.2756 43.9978C59.8389 44.2724 59.8389 46.5132 58.2756 46.7878C55.5297 47.2643 52.986 48.5424 50.9647 50.4612C48.9435 52.3801 47.5349 54.8539 46.9163 57.5714L46.8012 58.0718C46.4513 59.6041 44.2636 59.5952 43.9271 58.0585L43.8341 57.6289C43.2346 54.9009 41.8375 52.4127 39.8204 50.4807C37.8032 48.5487 35.2571 47.2602 32.5058 46.7789Z"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-[#87E17F] flex gap-2 md:flex-col text-center md:text-left text-[19px] md:text-[48px] font-bold leading-[112%]">
                <h1>AI Background </h1>
                <h1>Generation</h1>
              </div>
              <p className="text-[#FFF] text-[16px] font-normal text-center md:text-left leading-[150%]">
              With <span className="font-bold">AI-generated Backgrounds</span> the possibilities are limitless. From realistic to abstract, input your prompts for the most suitable backgrounds.{" "}
              </p>
            </div>
            <div>
              <img
                src="/images/v-4/f-5.webp"
                alt="feature"
                className="w-full md:w-[600px] 2xl:w-[730px] px-6 md:px-0"
              />
            </div>
          </div>
          <div className="flex flex-col-reverse gap-10 md:gap-10 md:flex-row  md:justify-between items-center pt-10 md:pt-[140px] 2xl:pt-[220px]">
            <div>
              <img
                src="/images/v-4/f-6.webp"
                alt="feature"
                className="w-full md:w-[600px] 2xl:w-[730px] px-6 md:px-0"
              />
            </div>
            <div className="w-full md:w-[426px] px-6 md:px-0 flex flex-col justify-center md:justify-end items-center md:items-start gap-[13px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
               className="w-[46px] md:w-[63px] h-[49px] md:h-[67px]"
                viewBox="0 0 62 62"
                fill="none"
              >
                <path
                  d="M45.5312 42.6248H44.5625V38.7498H45.5312C47.8436 38.8423 50.098 38.0125 51.7985 36.4428C53.499 34.8731 54.5063 32.6922 54.5988 30.3798C54.6912 28.0675 53.8614 25.8131 52.2917 24.1126C50.722 22.4121 48.5411 21.4048 46.2288 21.3123H44.5625L44.3688 19.7236C43.9389 16.4617 42.338 13.4673 39.8642 11.2981C37.3905 9.129 34.2126 7.93303 30.9225 7.93303C27.6324 7.93303 24.4545 9.129 21.9808 11.2981C19.507 13.4673 17.9061 16.4617 17.4763 19.7236L17.4375 21.3123H15.7713C13.4589 21.4048 11.278 22.4121 9.70831 24.1126C8.13863 25.8131 7.30876 28.0675 7.40125 30.3798C7.49374 32.6922 8.50103 34.8731 10.2015 36.4428C11.902 38.0125 14.1564 38.8423 16.4688 38.7498H17.4375V42.6248H16.4688C13.3618 42.6052 10.3718 41.4376 8.07353 39.3468C5.77531 37.2559 4.33112 34.3892 4.01863 31.298C3.70614 28.2067 4.5474 25.109 6.38068 22.6005C8.21395 20.092 10.9098 18.3497 13.95 17.7086C14.7864 13.8075 16.9354 10.3112 20.0382 7.80306C23.1411 5.29496 27.0102 3.92676 31 3.92676C34.9898 3.92676 38.8589 5.29496 41.9618 7.80306C45.0646 10.3112 47.2136 13.8075 48.05 17.7086C51.0902 18.3497 53.786 20.092 55.6193 22.6005C57.4526 25.109 58.2939 28.2067 57.9814 31.298C57.6689 34.3892 56.2247 37.2559 53.9265 39.3468C51.6282 41.4376 48.6382 42.6052 45.5312 42.6248Z"
                  fill="white"
                />
                <path
                  d="M32.9375 50.7044V27.125H29.0625V50.7044L24.0444 45.7056L21.3125 48.4375L31 58.125L40.6875 48.4375L37.9556 45.7056L32.9375 50.7044Z"
                  fill="white"
                />
              </svg>
              <div className="text-[#87E17F] flex gap-2 md:flex-col text-center md:text-left text-[19px] md:text-[48px] font-bold leading-[112%]">
                <h1>Download In</h1>
                <h1>Multiple Formats</h1>
              </div>
              <p className="text-[#FFF] text-[16px] font-normal text-center md:text-left leading-[150%]">
                From <span className="font-bold">JPG</span> to , <span className="font-bold">PNG</span> to <span className="font-bold">PSD</span> we ensure your visuals are optimized
                for web, print, or social media, making them easy to use across
                all your marketing channels.
               
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesNew;
