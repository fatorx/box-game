import React, { useState } from "react";

//import Box from "./components/elements/Box";

import "./Box.css";
import "./App.css";
import Game from "./components/elements/Game";

const AppMulti = () => {
    console.log("AppStart render");

    const [autostart, setAutostart] = useState(false);

    const clickAutoStart = () => {
        setAutostart(!autostart);
    };

    const clickReload = () => {
        setAutostart(true);
    };

    return (
        <div className="box-app">
            <div className="box-buttons">
                <button onClick={clickAutoStart} id={"start"}>Auto</button>
                <button onClick={clickReload} id={"Reload"}>Reload</button>
            </div>

            <Game autostart={autostart} />
            ---
            <Game autostart={autostart} />
            ---
            <Game autostart={autostart} />
            ---
            <Game autostart={autostart} />
        </div>
    );
}

export default AppMulti;
