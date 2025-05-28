

const ParagraphOne = ({children, className}) => {
    return (
        <p className={`anek-latin-font text-[14px] lg:text-base  ${className}`}>{children}</p>
    );
};

export default ParagraphOne;