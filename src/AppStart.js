import React from "react";

import "./Box.css";
import "./App.css";
import Game from "./components/elements/GameControls";

export default function AppStart() {
    console.log("AppStart render");

    return (
        <div className="box-app">

            <Game />

        </div>
    );
}

