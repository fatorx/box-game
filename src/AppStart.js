import React, { useState } from "react";

//import Box from "./components/elements/Box";

import "./Box.css";
import "./App.css";
import Game from "./components/elements/Game";

export default function AppStart() {
    console.log("AppStart render");

    const [autostart, setAutostart] = useState(false);

    return (
        <div className="box-app">
            <Game autostart={autostart} />
        </div>
    );


}
