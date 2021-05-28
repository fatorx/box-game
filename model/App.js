import React, { useState, useEffect } from "react";

import Box from "./components/elements/Box";
import Random from "./components/math/Random";
import useTimer from 'easytimer-react-hook';

import "./App.css";

export default function App() {
  const START_MSG = 'Vamos jogar?';

  const [boxGreen, setBoxGreen]   = useState("box box-green");
  const [boxBlue, setBoxBlue]     = useState("box box-blue");
  const [boxRed, setBoxRed]       = useState("box box-red");
  const [boxYellow, setBoxYellow] = useState("box box-yellow");

  const [itemsRand, setItemsRand] = useState([]);
  const [list, setList] = useState([]);
  const [sequences, setSequences] = useState(0);
  const [index, setIndex] = useState(0);
  const [statusGame, setStatusGame] = useState(0);
  const [sequencesSuccess, setSequencesSuccess] = useState(0);
  const [messageStatus, setMessageStatus] = useState(START_MSG);
  const [indexClick, setIndexClick] = useState(0);
  const [clicksSuccess, setClicksSuccess] = useState(0);
  const [currentBlink, setCurrentBlink] = useState("");
  const [display, setDisplay] = useState(0);
  const [timerResolver, setTimerResolver] = useState([]);

  const [timer, isTargetAchieved] = useTimer({
    precision: 'secondTenths'
  });

  const timerInterval = 1500;
  const iterations    = 2;
  const numSequences  = 2;

  let items = ["green", "blue", "red", "yellow"];

  let interval = null;

  const setBlink = (item) => {
    switch (item) {
      case "green":
        setBoxGreen("box box-green blink");
        break;
      case "red":
        setBoxRed("box box-red blink");
        break;
      case "blue":
        setBoxBlue("box box-blue blink");
        break;
      case "yellow":
        setBoxYellow("box box-yellow blink");
        break;
      default:
        setBoxYellow("box box-yellow blink");
    }
  };

  const removeBlink = (item) => {
    switch (item) {
      case "green":
        setBoxGreen("box box-green");
        break;
      case "red":
        setBoxRed("box box-red");
        break;
      case "blue":
        setBoxBlue("box box-blue");
        break;
      case "yellow":
        setBoxYellow("box box-yellow");
        break;
      default:
        setBoxYellow("box box-yellow");
    }
  };

  const removeAllBlink = () => {
    setBoxGreen("box box-green");
    setBoxRed("box box-red");
    setBoxBlue("box box-blue");
    setBoxYellow("box box-yellow");
    //setMessageStatus('Vamos jogar?');
    clearInterval(interval);

    timer.stop();
  };

  const stopCycle = () => {
    removeAllBlink();

    setMessageStatus(START_MSG);
    setItemsRand([]);
  }

  useEffect(() =>{
    if (sequences === numSequences) {
      console.log("End Sequence");
      console.log(sequencesSuccess +"==="+ numSequences);
      if (sequencesSuccess === numSequences) {
        setMessageStatus('Você venceu.');
      } else {
        setMessageStatus('Você perdeu. Tente novamente.');
      }

      setStatusGame(0); // @todo add constant
      //closeGame();
    }
  }, [sequences, sequencesSuccess]);

  useEffect(() => {
    if (index === 0 ) {
      return () => {};
    }

    console.log("useEffect index cond 1 " + index + " === " + list.length);
    if (index === list.length) {
      removeAllBlink();
      clearInterval(interval);
      setIndex(0);

      setSequences(sequences + 1);
      setMessageStatus('Agora é com você.');

      timer.start();

      return () => {};
    } else if (index > 0) {
      setCurrentBlink(list[index]);
      setBlink(list[index]);
    }
  }, [index]);

  const closeGame = () => {
    setItemsRand([]);
    setIndexClick(0);
    setClicksSuccess(0);
    setSequences( 0);
    setIndex(0);

    removeAllBlink();
    clearInterval(interval);

    return () => {};
  };

  useEffect(() => {
    if (list.length > 0) {
      setCurrentBlink(list[index]);
      setBlink(list[index]);

      console.log('changeBlink');
      console.log(list[index] + "==" + index);

      interval = setInterval(() => {

        console.log('Interval');
        console.log(currentBlink + "===" + index);
        /*
        removeBlink(currentBlink);
        */
        setIndex(index + 1);
      }, timerInterval);

    }
  }, [list])

  const startRandom = () => {
    clearInterval(interval);

    let listRand = []; // checar sequências
    let previousItems = itemsRand;
    let num = 0;
    for (let i = 0; i < iterations; ++i) {
      num = Random(num);
      listRand.push(items[num]);
    }

    listRand = ['red', 'yellow'];
    previousItems = previousItems.concat(listRand);

    setItemsRand(previousItems);
    setClicksSuccess(0);
    setIndexClick(0);

    setDisplay(previousItems.toString())
    setList(previousItems);
    //changeBlink();
  };

  const startGame = () => {
    setMessageStatus(START_MSG);
    setSequencesSuccess(0);
    startRandom();
  };

  useEffect(() => {
    if (sequencesSuccess > 0 && sequences <= numSequences) {

      setIndexClick(0);
      setClicksSuccess(0);
      console.log('Continue game');
      startRandom();
    }
  }, [sequencesSuccess]);


  const checkResult = (clicksSuccess, numItemsRand) => {
    console.log('checkResult');
    console.log(sequences + "==" + numSequences);
    console.log(clicksSuccess + " === " + numItemsRand);
    if (clicksSuccess === numItemsRand) {
      setSequencesSuccess(sequencesSuccess + 1);
    } else {
      // @todo Parar jogo e mostrar erro
    }

    timer.stop();
  };

  useEffect(() => {
    if (indexClick > 0) {
      let checkIndexClick = indexClick;
      let numItemsRand = itemsRand.length;

      if (numItemsRand === checkIndexClick) {
        checkResult(clicksSuccess, numItemsRand);
      }
    }
  }, [indexClick]);

  const clickBox = (item) => {
    if (itemsRand[indexClick] === item) {
      setClicksSuccess(clicksSuccess + 1);
    }
    setIndexClick(indexClick + 1);
  };

  return (
      <div className="box-app">
        <div className={"message-game"}>{messageStatus}</div>
        <div>{timer.getTimeValues().toString(['seconds', 'secondTenths'])}</div>

          <div className="box-items" onClick={() => clickBox('green')}>

            <Box style={boxGreen} fct={clickBox}  color={"green"} />

            <Box style={boxBlue} fct={clickBox} color={"blue"} />

            <Box style={boxRed} fct={clickBox} color={"red"} />

            <Box style={boxYellow} fct={clickBox} color={"yellow"} />

          </div>

          <div className="box-buttons">
            <button onClick={startGame}>Começar</button>
            <button onClick={stopCycle}>Para tudo</button>
          </div>

          <div className="info-controls">
            <ul>
              <li>Sequência: {sequences}</li>
              <li>Cliques: {clicksSuccess}</li>
              <li>Seq: {display}</li>
            </ul>
          </div>
      </div>
  );
}
