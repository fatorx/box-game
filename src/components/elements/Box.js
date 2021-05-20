import React, { useEffect, useState } from "react";

import "../../Box.css";

const Box = props => {

    const [boxStyle, setBoxStyle] = useState("box");

    useEffect(() => {
        setBoxStyle(props.style);
    }, []);

    const handlerClick = () => {
        props.fct(props.color);
    }

    return (
        <>
            <div className={boxStyle} onClick={handlerClick}   />
        </>
    );
}

export default Box;
