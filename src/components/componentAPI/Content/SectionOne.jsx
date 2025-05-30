
import HeaderOne from '../microComponent/HeaderOne';
import ParagraphOne from '../microComponent/ParagraphOne';
import HeaderFive from '../microComponent/HeaderFive';
import Link from 'next/link';



const SectionOne = () => {
    return (
        <div className="flex flex-col ">
                <div className="flex flex-col gap-[28px]">
                  <div className='flex flex-col gap-[6px]'>
                    <HeaderOne className="">Retouched.ai</HeaderOne>
                    <ParagraphOne className={"leading-7 "}>
                      Retouched.ai is an API-driven platform offering
                      professional image editing services designed to integrate
                      easily into various applications. Its primary
                      functionalities include background removal, color
                      correction, and image retouching. Users can submit images
                      for processing, which allows them to streamline editing
                      workflows, especially valuable for industries like
                      e-commerce and digital marketing where high-quality images
                      are crucial.
                    </ParagraphOne>
                  </div>
                  <div>
                    <HeaderFive className={"leading-7"}>
                      How and Why It’s Used:
                    </HeaderFive>
                    <ul className="list-disc pl-7">
                      <li className="font-anek-latin text-[14px] lg:text-base font-normal">
                        {" "}
                        <span className="font-bold"> Purpose:</span>{" "}
                        Retouched.ai enables companies to automate and enhance
                        their image processing tasks without requiring manual
                        editing. This automation is particularly useful for
                        businesses needing to manage large volumes of images, as
                        it allows for efficient, consistent, and high-quality
                        outputs.
                      </li>
                      <li className="font-anek-latin text-[14px] lg:text-base font-normal">
                        {" "}
                        <span className="font-bold"> Usage Process:</span>{" "}
                        Through Retouched.ai’s API endpoints, users can:
                        <ul className="list-disc pl-10">
                          <li className="">
                            Authenticate their accounts to securely access
                            services.
                          </li>
                          <li className="">
                            Upload images with options for specific processing
                            requests, like background removal or additional
                            color adjustments.
                          </li>
                          <li className="">
                            Retrieve processed images via FTP/SFTP, ensuring
                            safe and seamless file delivery.
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ParagraphOne className={"leading-7"}>
                      This setup supports a range of applications in client
                      systems, where users can also add notes or attachments to
                      images, allowing customization and precision in image
                      editing requirements.
                    </ParagraphOne>
                  </div>
                  <div>
                    <Link href="/"
                      className="flex items-center justify-between lg:justify-center gap-2 font-anek-latin text-base leading-7 px-3 py-2 bg-[#00AC74] w-full lg:w-[180px] rounded-lg hover:bg-[#00D690]"
                    >
                      <p>Try Retouched.Ai</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M14.4299 5.93005L20.4999 12.0001L14.4299 18.0701"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3.5 12H20.33"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
    );
};

export default SectionOne;