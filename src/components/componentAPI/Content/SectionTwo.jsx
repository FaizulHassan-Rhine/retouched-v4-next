
import HeaderOne from "../microComponent/HeaderOne";
import ParagraphOne from "../microComponent/ParagraphOne";

const SectionTwo = () => {
  return (
    <div className=" flex flex-col ">
      <HeaderOne className={"flex justify-start items-center gap-2 text-[16px] lg:text-[24px] pb-1"}><span className="hidden lg:block">1. </span><span><svg className="block lg:hidden" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path d="M18.3332 7.56248V16.5C18.3332 19.25 16.6923 20.1666 14.6665 20.1666H7.33317C5.30734 20.1666 3.6665 19.25 3.6665 16.5V7.56248C3.6665 4.58331 5.30734 3.89581 7.33317 3.89581C7.33317 4.46415 7.56231 4.97748 7.93815 5.35331C8.31398 5.72914 8.82734 5.95831 9.39567 5.95831H12.604C13.7407 5.95831 14.6665 5.03248 14.6665 3.89581C16.6923 3.89581 18.3332 4.58331 18.3332 7.56248Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M14.6668 3.89581C14.6668 5.03248 13.741 5.95831 12.6043 5.95831H9.396C8.82766 5.95831 8.3143 5.72914 7.93847 5.35331C7.56264 4.97748 7.3335 4.46415 7.3335 3.89581C7.3335 2.75915 8.25933 1.83331 9.396 1.83331H12.6043C13.1727 1.83331 13.686 2.06248 14.0619 2.43832C14.4377 2.81415 14.6668 3.32748 14.6668 3.89581Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M7.3335 11.9167H11.0002" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M7.3335 15.5833H14.6668" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg></span> Retouched.ai API Resources</HeaderOne>
      <ParagraphOne>
        Welcome to the Retouched.AI API documentation. Through this set of APIs,
        users can easily integrate professional image editing services into
        their applications. Users can sign up, verify their accounts, reset
        passwords, and submit images for services such as background removal,
        color correction, and retouching etc. Additionally, users can include
        notes and file attachments for relevant information.
      </ParagraphOne>
    </div>
  );
};

export default SectionTwo;
