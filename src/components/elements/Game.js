import React, {useState, useEffect, useCallback, useMemo } from "react";

import BoxModel from "./BoxModel";

import "../../Box.css";
import "../../App.css";
import Random from "../math/Random";

const Game = ({ autostart }) => {
    console.log("Game render");

    const gameObject = {
        isStart: false,
        isStop: false,
        isFinish: false,
        isUserInteract: false,
        currentColor: '',
        statusDesc: '',
        colorsUser: [],
        randomItems: [],
        score: 0,
        index: 0,
        indexClick:0,
        clicksSuccess:0
    };

    const [gameControl, setGameControl] = useState(gameObject);
    const [display, setDisplay]     = useState('');
    const items = useMemo(() => ["green", "blue", "red", "yellow"], []);

    const ITERATIONS = 4;

    const Result = useCallback(() => {
        setGameControl(game => (
            {...game,
                currentColor: '',
                index: 0,
                isStart: false,
                isUserInteract: false
            })
        );
        //setTimeout(() => resetGame(), 3000);
    }, []);

    const changeColor = useCallback(() => {
        let items = gameControl.randomItems;
        setGameControl(game => (
            {...game,
                currentColor: items[gameControl.index],
                index: gameControl.index + 1
            })
        );
        setTimeout(() => {
            setGameControl(game => (
                {...game,
                    currentColor: '',
                })
            );
        }, 400);
        setDisplay(items[gameControl.index]);
    }, [gameControl.index, gameControl.randomItems]);

    const resetGame = () => {
        setGameControl(gameObject);
        setDisplay('');
        console.clear();
    }

    const clickStartGame = (status) => {
        if (gameControl.isStart !== status) {
            setGameControl(game => ( {...game, isStart: status}) );
        }
    };

    const clickBox = (item) => {
        let indexClick   = gameControl.indexClick;
        let clickSuccess = gameControl.clicksSuccess;
        let items = gameControl.randomItems;

        if (items[indexClick] === item) {
            clickSuccess += 1;
        }

        setGameControl(game => (
            {...game,
                clicksSuccess: clickSuccess,
                indexClick: indexClick + 1
            })
        );
    };

    useEffect(() => {
        if (gameControl.isStart) {
            let listRand = [];
            let num = 0;
            for (let i = 0; i < ITERATIONS; ++i) {
                num = Random(num);
                listRand.push(items[num]);
            }

            setGameControl(game => (
                {...game,
                    randomItems: listRand,
                    isUserInteract: true
                })
            );
        }
    }, [gameControl.isStart, items]);

    useEffect(() => {
        if (!gameControl.isUserInteract) {
            return () => {};
        }

        console.log('-----------------------');
        console.log('useEffect User Interact');
        const timer =
            gameControl.index <= ITERATIONS
                ? setInterval(() => {
                    changeColor()
                }, 800)
                : Result();

        return () => {
            clearInterval(timer);
        };

    }, [gameControl.isUserInteract, gameControl.index, changeColor, Result])

    useEffect(() => {
        console.log('check result');

        let condItems  = (gameControl.randomItems.length > 0);
        if (condItems) {

            let condFinish = condItems &&
                             (gameControl.randomItems.length === gameControl.indexClick);

            let condWinner = (gameControl.indexClick === gameControl.clicksSuccess);

            if (condFinish && condWinner) {
                setGameControl(game => (
                    {...game,
                        statusDesc: 'Você venceu!'
                    })
                );
            } else if (condFinish) {
                setGameControl(game => (
                    {...game,
                        statusDesc: 'Você perdeu!'
                    })
                );
            }
        }

    }, [gameControl.indexClick, gameControl.clicksSuccess, gameControl.randomItems.length]);

    useEffect(() => {
        console.clear();

        if (autostart) {
            setGameControl(game => ( {...game, isStart: true}) );
        }

    }, [autostart]);

    return (
        <>

            <div className="box-buttons">
                <button onClick={() => clickStartGame(true)} id={"start"}>Start</button>
                <button onClick={() => resetGame()} id={"stop"}>Stop</button>
            </div>


            <div className="block-controls">
                {items && items.map((v, i) =>
                    <BoxModel
                        fct={clickBox}
                        color={v}
                        activate={gameControl.currentColor === v}
                        key={i} />
                )}
            </div>

            <h3>Infos</h3>
            <div className="info-controls">
                <ul>
                    <li>Seq: {gameControl.randomItems.toString()}</li>
                    <li>Status: {gameControl.statusDesc}</li>
                    <li>Counter: {gameControl.index}</li>
                    <li>Display: {display}</li>
                    <li>Click OK: {gameControl.clicksSuccess}</li>
                </ul>
            </div>

        </>
    );
}

export default Game;
