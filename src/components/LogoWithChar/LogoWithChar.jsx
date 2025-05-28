import React, { useEffect, useState } from 'react';

const LogoWithChar = ({ name="DF", w="40",h="40" }) => {
    const [getChar, setChar] = useState("");

    const getCharFunc = () => {
        if(name !== "DF"){
            const strArr = name.toUpperCase().split(" ");
            const char = strArr.map((d, i) => i < 2 && d[0]);
            setChar(char);
        }else{
            setChar("DF");
        }

    }
    useEffect(() => {
        getCharFunc();
    }, [])
    return (
        <div className="flex items-center justify-center bg-slate-900 rounded-full text-xs font-bold text-white"
        style={{width: `${w}px`, height: `${h}px`}}
        >
            <span>{getChar}</span>
        </div>
    );
};

export default LogoWithChar;