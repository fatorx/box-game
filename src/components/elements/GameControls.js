import React, {useState, useEffect, useCallback } from "react";

import gameObject from "../objects/GameObject";
import magics from "../objects/Magics";

import BoxModel from "./BoxModel";
import Command from "./Command";
import useHotkeys from "@reecelucas/react-use-hotkeys";

const Game = () => {
    console.log("Game render");

    const [gameControl, setGameControl] = useState(gameObject);
    const [timerCmd, setTimerCmd] = useState(null);

    const TIME_INTERVAL = 500;
    const LIMIT_ITEMS = 4;
    let timeoutCommand = null;

    const setColor = useCallback((color) => {
        setGameControl(game => (
            {...game,
                currentColor: color,
            })
        );
        setTimeout(() => {
            setGameControl(game => (
                {...game,
                    currentColor: '',
                })
            );
        }, TIME_INTERVAL);

    }, []);

    const clickBox = (item) => {

        let indexClick   = gameControl.indexClick;
        let clickItemsAdd = gameControl.clickItems;
        let numClicks = clickItemsAdd.length + 1;

        setColor(item);
        clickItemsAdd.push(item);

        console.log("numClicks: " + numClicks + " - " + clickItemsAdd.toString());

        if (numClicks === LIMIT_ITEMS) { // correct answer, continue
            let statusCheck = false;
            console.log("numClicks: " + numClicks + "=" + LIMIT_ITEMS);

            magics.map(v => {
                if (v.sequence.toString() === clickItemsAdd.toString()) {
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

                    statusCheck = true;
                }
                return v;
            });

            if (!statusCheck) {
                console.log('!statusCheck');
                setGameControl(game => (
                    {...game,
                        name:'',
                        optionStatus:false,
                        status: 0,
                        clickItems: [],
                        indexClick: 0
                    })
                );
            }

            return true;
        } else {
            setGameControl(game => (
                {...game,
                    clickItems: clickItemsAdd,
                    indexClick: indexClick + 1
                })
            );
        }

        setTimerCmd(setTimeout(() => {
            console.log('setGameControl');
            setGameControl(game => (
                {...game,
                    currentColor: '',
                    clickItems: [],
                    indexClick: 0
                })
            );
        }, 3000) );

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
                        fct={clickBox}
                        color={"green"}
                        activate={gameControl.currentColor === "green"}
                        key={1} />

                    <BoxModel
                        fct={clickBox}
                        color={"red"}
                        activate={gameControl.currentColor === "red"}
                        key={2} />

                </div>

                <div className="box-model-control right">

                    <BoxModel
                        fct={clickBox}
                        color={"blue"}
                        activate={gameControl.currentColor === "blue"}
                        key={3} />

                    <BoxModel
                        fct={clickBox}
                        color={"yellow"}
                        activate={gameControl.currentColor === "yellow"}
                        key={4} />

                </div>

            </div>

        </>
    );
}

export default Game;
