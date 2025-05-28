
import { year } from '../../ComonFunc/ComonFunc';
import HeaderOne from '../microComponent/HeaderOne';
import ParagraphOne from '../microComponent/ParagraphOne';

const SectionFive = () => {
    return (
        <div className=" flex flex-col ">
      <HeaderOne className={"flex justify-start items-center gap-2 text-[16px] lg:text-[24px]"}><span className="hidden lg:block">4. </span><span className='block lg:hidden'><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path d="M13.6585 1.83337H8.34184C7.7185 1.83337 6.83849 2.20005 6.39849 2.64005L2.64017 6.39838C2.20017 6.83838 1.8335 7.71838 1.8335 8.34171V13.6584C1.8335 14.2817 2.20017 15.1617 2.64017 15.6017L6.39849 19.36C6.83849 19.8 7.7185 20.1667 8.34184 20.1667H13.6585C14.2818 20.1667 15.1618 19.8 15.6018 19.36L19.3602 15.6017C19.8002 15.1617 20.1668 14.2817 20.1668 13.6584V8.34171C20.1668 7.71838 19.8002 6.83838 19.3602 6.39838L15.6018 2.64005C15.1618 2.20005 14.2818 1.83337 13.6585 1.83337Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M7.7915 14.2083L14.2082 7.79163" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M14.2082 14.2083L7.7915 7.79163" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg></span> Conclusion</HeaderOne>
      <ParagraphOne className="mb-[28px]">
      This documentation provides a foundational understanding for integrating with the Retouched.AI
      services. For further assistance, please email our technical support team at <span className='text-[#009665] font-bold'>info@thekowcompany.com</span>
      </ParagraphOne>
      <p className='text-[#9F9F9F] text-[12px] leading-6 font-anek-latin'>© {year()} The Kow Company Ltd. All rights reserved.</p>

    </div>
    );
};

export default SectionFive;