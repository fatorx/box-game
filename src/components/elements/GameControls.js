import React, {useState, useEffect, useCallback } from "react";

import gameObject from "../objects/GameObject";
import magics from "../objects/Magics";

import BoxModel from "./BoxModel";
import Command from "./Command";
import useHotkeys from "@reecelucas/react-use-hotkeys";

const Game = () => {
    console.log("Game render");

    const [gameControl, setGameControl] = useState(gameObject);

    const TIME_INTERVAL = 500;
    const LIMIT_ITEMS = 4;

    let commands = [];
    let controlInterval = null;

    const clickBoxCmd = (item) => {
        commands.push(item);
        let numCommands = commands.length;

        clearInterval(controlInterval);
        controlInterval = setInterval(() => {
            console.log('Clear commands');
            commands = [];
        }, 700);

        console.log(commands.toString());

        if (numCommands === LIMIT_ITEMS) {
            clearInterval(controlInterval);

            magics.map(v => {
                if (v.sequence.toString() === commands.toString()) {
                    console.log(v.name)
                    setGameControl(game => (
                        {...game,
                            name:v.name,
                            optionStatus:true,
                            status: 1,
                            clickItems: [],
                            indexClick: 0
                        })
                    );
                }

                return v;
            });

            commands = [];
        }
    };

    const callbackStatus = () => {
        console.log("callbackStatus");
        setTimeout(() => {
            setGameControl(
                {...gameObject,
                    optionStatus:false,
                    clickItems: [],
                    indexClick: 0
                }
            );
        }, 4000);
    };

    useHotkeys('a s d f', () => {
        console.log('Some action');
        setGameControl(game => (
            {...game,
                name:'blue-magic',
                optionStatus:true,
                status: 1,
                clickItems: [],
                indexClick: 0
            })
        );
    });


    return (
        <>
            <div className="box-model box-board">

                <Command option={gameControl.status}
                         view={gameControl.optionStatus}
                         command={gameControl.name}
                         callbackStatus={callbackStatus} />

                <div className="box-model-control left">

                    <BoxModel
                        fct={clickBoxCmd}
                        color={"green"}
                        activate={gameControl.currentColor === "green"}
                        key={1} />

                    <BoxModel
                        fct={clickBoxCmd}
                        color={"red"}
                        activate={gameControl.currentColor === "red"}
                        key={2} />

                </div>

                <div className="box-model-control right">

                    <BoxModel
                        fct={clickBoxCmd}
                        color={"blue"}
                        activate={gameControl.currentColor === "blue"}
                        key={3} />

                    <BoxModel
                        fct={clickBoxCmd}
                        color={"yellow"}
                        activate={gameControl.currentColor === "yellow"}
                        key={4} />

                </div>

            </div>

        </>
    );
}

export default Game;
