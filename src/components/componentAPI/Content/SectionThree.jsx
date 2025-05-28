import HeaderFive from "../microComponent/HeaderFive";
import HeaderOne from "../microComponent/HeaderOne";


const SectionThree = () => {
    return (
        <div className=" flex flex-col ">
            <HeaderOne className={"flex justify-start items-center gap-2 text-[16px] lg:text-[24px]"}><span className="hidden lg:block">2. </span><span className="block lg:hidden"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path d="M5.83916 8.7175C2.09916 8.98333 2.10833 14.4008 5.83916 14.6667H14.6942C15.7667 14.6758 16.8025 14.2725 17.6 13.5483C20.2217 11.2567 18.8192 6.67331 15.3633 6.23331C14.1258 -1.22836 3.31834 1.60416 5.87584 8.7175" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M11 14.6667V17.4167" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M10.9998 21.0834C12.0124 21.0834 12.8332 20.2625 12.8332 19.25C12.8332 18.2375 12.0124 17.4167 10.9998 17.4167C9.98732 17.4167 9.1665 18.2375 9.1665 19.25C9.1665 20.2625 9.98732 21.0834 10.9998 21.0834Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M16.5002 19.25H12.8335" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M9.16667 19.25H5.5" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
</svg></span> API Endpoints Overview</HeaderOne>
            <HeaderFive className="ml-2 mb-2 mt-2">2.1 Authentication and User Account Management</HeaderFive>
            <ul className="list-disc pl-8 font-anek-latin text-[14px] lg:text-base ">
                <li>System Sign-Up (POST): Registers a new user account.</li>
                <li>Set Password (POST): Allows the user to set or reset their password.</li>
                <li>System Sign-In (POST): Authenticates the user and provides a session token.</li>
                <li>Reset Password Request (POST): Initiates a password reset process.</li>
                <li>Reset Password (POST): Completes the password reset process.</li>
            </ul>
            <HeaderFive className="ml-2 mb-2 mt-7">2.2 Image Processing</HeaderFive>
            <ul className="list-disc pl-8 font-anek-latin text-[14px] lg:text-base">
                <li>Upload Image (POST): Submits one or multiple images for processing. Each image in the
                bulk can have add-on services like background removal, retouching, or color correction, etc.</li>
                <li>Send Processed Images via FTP/SFTP (POST): Sends the processed images back to the
                user through FTP or SFTP</li>
                
            </ul>
        </div>
    );
};

export default SectionThree;