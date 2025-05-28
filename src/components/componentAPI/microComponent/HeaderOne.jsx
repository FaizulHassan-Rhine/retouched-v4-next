
const HeaderOne = ({children, className}) => {
    return (
        <h1 className={`ibm-plex-font text-[16px] lg:text-2xl font-bold  ${className}`}>{children}</h1>
    );
};

export default HeaderOne;