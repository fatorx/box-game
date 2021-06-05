import React, {useState, useEffect, useCallback, useMemo } from "react";

import BoxModel from "./BoxModel";
import GreenSpell from "./spells/Green";
import BlueSpell  from "./spells/Blue";
import RedSpell   from "./spells/Red";

const Game = () => {
    console.log("Game render");

    const gameObject = {
        isStart: false,
        isStop: false,
        isFinish: false,
        isGameInteract: false,
        isUserInteract: false,
        optionStatus:false,
        currentColor: '',
        statusDesc: '',
        colorsUser: [],
        randomItems: [],
        status: 0,
        score: 0,
        index: 0,
        indexClick:0,
        clicksSuccess:0,
        indexSpell:0,
        name:'',
        sequence:[]
    };

    // Deixar comandos livres para executar a qualquer momento
    const magics = [
        {
            name:'blue-magic',
            sequence:['blue','yellow', 'red','green']
        },
        {
            name:'red-magic',
            sequence:['red', 'green', 'blue', 'yellow']
        },
        {
            name:'green-magic',
            sequence:['green', 'yellow', 'red', 'blue']
        }
    ];

    const [gameControl, setGameControl] = useState(gameObject);
    const items = useMemo(() => ["green", "blue", "red", "yellow"], []);

    const TIME_INTERVAL = 500;

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
                index: gameControl.index + 1
            })
        );
        setTimeout(() => {
            setGameControl(game => (
                {...game,
                    currentColor: ''
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

    const startGame = (status) => {
        if (gameControl.isStart !== status) {
            resetGame();
            setGameControl(game => (
                {...game,
                    isStart: status,
                }) );
        }
    };

    const setMagicOption = (index) => {
        resetGame();
        setGameControl(game => (
            {...game,
                name: magics[index].name,
                sequence:magics[index].sequence,
                isStart: true
            }) );
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

    /**
     * Component for display select magic
     */
    const Cmd = ({option, view, command}) => {

        if (option === 1) {
            let element = '';

            switch (command) {
                case 'blue-magic' :
                    element = <BlueSpell view={view} command={command} />;
                    break;

                case 'red-magic' :
                    element = <RedSpell view={view} command={command} />;
                    break;

                case 'green-magic' :
                    element = <GreenSpell view={view} command={command} />;
                    break;

                default:
                    element = <RedSpell view={view} command={command} />;
                    break;
            }

            setTimeout(() => {
                setGameControl(
                    {...gameObject,
                        optionStatus:false
                    }
                );
            }, 4000);

            return element;
        }
        return (
           <div className="command" />
        );
    }

    /**
     * Effect for start game and set display items
     */
    useEffect(() => {
        if (gameControl.isStart) {
            setGameControl(game => (
                {...game,
                    randomItems: gameControl.sequence,
                    isGameInteract: true
                })
            );
        }
    }, [gameControl.isStart, gameControl.sequence, items]);

    /**
     * Effect for timer and change color
     */
    useEffect(() => {
        if (!gameControl.isGameInteract) {
            return () => {};
        }

        console.log('-----------------------');
        console.log('useEffect Game Interact');

        // In first interaction, execute setInterval with 500
        //let interval = (gameControl.index > 0 ? TIME_INTERVAL : 500);

        const timer = gameControl.index <= gameControl.randomItems.length
                ? setInterval(() => {
                    changeColor()
                }, TIME_INTERVAL)
                : startUserInteract();

        return () => {
            clearInterval(timer);
        };

    }, [gameControl.isGameInteract, gameControl.index,
             gameControl.randomItems.length,
             changeColor, startUserInteract])

    /**
     * Effect result game
     */
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
                        isUserInteract: false,
                        optionStatus:true,
                        status:1
                    })
                );
            } else if (condFinish || condWrongClick) {
                setGameControl(game => (
                    {...game,
                        statusDesc: 'Você perdeu!',
                        isUserInteract: false,
                        status:2
                    })
                );
            }
        }

    }, [gameControl.indexClick, gameControl.clicksSuccess, gameControl.randomItems.length]);

    /**
     * Effect start component
     */
    /*
    useEffect(() => {
        console.clear();
    }, [command]);
    */

    return (
        <>
            <div className="box-model box-board">

                <Cmd option={gameControl.status} view={gameControl.optionStatus} command={gameControl.name} />

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

            {/*
            {gameControl.statusDesc}
            <div className="box-buttons-controls">
                <button onClick={() => startGame(true)} id={"start"}>Start</button>
                <button onClick={() => resetGame()} id={"stop"}>Stop</button>
            </div>
            */}

            <div className="select-magic">
                <button onClick={() => setMagicOption(0)} id={"magic-blue"}>Magic Blue</button>
                <button onClick={() => setMagicOption(1)} id={"magic-red"}>Magic Red</button>
                <button onClick={() => setMagicOption(2)} id={"magic-green"}>Magic Green</button>
            </div>

        </>
    );
}

export default Game;
