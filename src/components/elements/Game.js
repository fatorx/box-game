import React, {useState, useEffect, useCallback, useMemo } from "react";

import BoxModel from "./BoxModel";

import Random from "../math/Random";

const Game = ({ autostart }) => {
    console.log("Game render");

    const gameObject = {
        isStart: false,
        isStop: false,
        isFinish: false,
        isGameInteract: false,
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
    const items = useMemo(() => ["green", "blue", "red", "yellow"], []);

    const ITERATIONS = 4;
    const TIME_INTERVAL = 600;

    const startUserInteract = useCallback(() => {
        setGameControl(game => (
            {...game,
                currentColor: '',
                isStart: false,
                isGameInteract: false,
                isUserInteract: true,
            })
        );
        //setTimeout(() => resetGame(), 3000);
    }, []);

    const changeColor = useCallback(() => {
        let items = gameControl.randomItems;
        setGameControl(game => (
            {...game,
                currentColor: items[gameControl.index],
                index: gameControl.index + 1,
                statusDesc:  items[gameControl.index]
            })
        );
        setTimeout(() => {
            setGameControl(game => (
                {...game,
                    currentColor: '',
                    statusDesc: ''

                })
            );
        }, TIME_INTERVAL / 2);

    }, [gameControl.index, gameControl.randomItems]);

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
        }, TIME_INTERVAL / 2);

    }, []);

    const resetGame = () => {
        setGameControl(gameObject);
        console.clear();
    }

    const clickStartGame = (status) => {
        if (gameControl.isStart !== status) {
            resetGame();
            setGameControl(game => (
                {...game,
                    isStart: status,
                }) );
        }
    };

    const clickBox = (item) => {
        if (!gameControl.isUserInteract) {
            return () => {};
        }

        let indexClick   = gameControl.indexClick;
        let clickSuccess = gameControl.clicksSuccess;
        let items = gameControl.randomItems;

        setColor(item);

        if (items[indexClick] === item) { // correct answer, continue
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
                    isGameInteract: true
                })
            );
        }
    }, [gameControl.isStart, items]);

    useEffect(() => {
        if (!gameControl.isGameInteract) {
            return () => {};
        }

        console.log('-----------------------');
        console.log('useEffect User Interact');

        // In first interaction, execute setInterval with 500
        //let interval = (gameControl.index > 0 ? TIME_INTERVAL : 500);

        const timer = gameControl.index <= ITERATIONS
                ? setInterval(() => {
                    changeColor()
                }, TIME_INTERVAL)
                : startUserInteract();

        return () => {
            clearInterval(timer);
        };

    }, [gameControl.isGameInteract, gameControl.index, changeColor, startUserInteract])

    useEffect(() => {

        let condItems  = (gameControl.randomItems.length > 0);
        if (condItems) {

            let condFinish = condItems &&
                             (gameControl.randomItems.length === gameControl.indexClick);

            let condWinner = (gameControl.indexClick === gameControl.clicksSuccess);

            let condWrongClick = (gameControl.indexClick > gameControl.clicksSuccess);

            if (condFinish && condWinner) {
                setGameControl(game => (
                    {...game,
                        statusDesc: 'Você venceu!',
                        isUserInteract: false
                    })
                );
            } else if (condFinish || condWrongClick) {
                setGameControl(game => (
                    {...game,
                        statusDesc: 'Você perdeu!',
                        isUserInteract: false
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

            <div className="board">

            </div>

            <div className="info-controls">
                <ul>
                    <li>Seq: {gameControl.randomItems.toString()}</li>
                    <li>GameInteract: {gameControl.isGameInteract ? 'TRUE' : 'FALSE'}</li>
                    <li>UserInteract: {gameControl.isUserInteract ? 'TRUE' : 'FALSE'}</li>
                    <li>Status: {gameControl.statusDesc}</li>
                    <li>Clicks: {gameControl.indexClick}</li>
                    <li>Click OK: {gameControl.clicksSuccess}</li>
                </ul>
            </div>

        </>
    );
}

export default Game;
