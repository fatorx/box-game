import React from "react";

import "../../Box.css";

const BoxModel = props => {

    const handlerClick = () => {
        props.fct(props.color);
    }

    return (
        <>
            <div className={`box box-${props.color} ${props.activate ? "current" : ""}`}
                 onClick={handlerClick}   />
        </>
    );
}

export default BoxModel;
