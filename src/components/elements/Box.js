import React, { useEffect, useState } from "react";
import "../../styles.css";

export default function Box(props) {
    const [boxStyle, setBoxStyle] = useState("box");
    const [boxAction, setBoxAction] = useState("green");

    useEffect(() => {
        setBoxStyle("box " + props.color);
        setBoxAction(props.action);
    }, [props]);

    return (
        <>
            <div className={boxStyle} onClick={boxAction}></div>
        </>
    );
}
