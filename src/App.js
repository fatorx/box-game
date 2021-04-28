import React, { useEffect, useState } from "react";

import Box from "./components/elements/Box";
import Random from "./components/math/Random";
import useTimer from 'easytimer-react-hook';

import "./index.css";

export default function App() {
  const [boxGreen, setBoxGreen]   = useState("box box-green");
  const [boxBlue, setBoxBlue]     = useState("box box-blue");
  const [boxRed, setBoxRed]       = useState("box box-red");
  const [boxYellow, setBoxYellow] = useState("box box-yellow");

  const [itemsRand, setItemsRand] = useState([]);
  const [messageStatus, setMessageStatus] = useState('Vamos jogar?');
  const [indexClick, setIndexClick] = useState(0);
  const [clicksSuccess, setClicksSuccess] = useState(0);

  /* The hook returns an EasyTimer instance and a flag to see if the target has been achieved */
  const [timer, isTargetAchieved] = useTimer({
    /* Hook configuration */
  });

  let timerInterval = 700;
  let iterations = 3;

  let sequences = 0;

  let items = ["green", "blue", "red", "yellow"];
  let list  = [];
  let index = 0;

  let currentBlink = "";
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
    setMessageStatus('Vamos jogar?');
    clearInterval(interval);
    timer.stop();
  };

  const changeBlink = () => {
    currentBlink = list[index];
    setBlink(currentBlink);

    interval = setInterval(() => {
      removeBlink(currentBlink);
      ++index;
      if (index === list.length) {
        removeAllBlink();
        clearInterval(interval);
        index = 0;

        setMessageStatus('Agora é com você.');
        timer.start({
          /* EasyTimer start configuration */
          precision: 'secondTenths'
        });

        return () => {};
      }

      currentBlink = list[index];
      setBlink(currentBlink);
    }, timerInterval);
  };

  const startRandom = () => {

    clearInterval(interval);
    index = 0;
    let listRand = []; // checar sequências
    let num = 0;
    for (let i = 0; i < iterations; ++i) {
      num = Random(num);
      listRand.push(items[num]);
    }

    //listRand = ['blue', 'blue', 'red', 'red'];
    setItemsRand(listRand);
    setClicksSuccess(0);
    setIndexClick(0);

    list = listRand;
    console.log(list);

    changeBlink();
  };

  const checkResult = (clicksSuccess, numItemsRand) => {
    if (clicksSuccess === numItemsRand) {
      let timerValue = timer.getTotalTimeValues().toString();
      console.log(timer);
      setMessageStatus('Ganhou mano. Tempo - ' + timerValue);
    } else {
      setMessageStatus('Perdeu rapá.');
    }

    setItemsRand([]);
    setClicksSuccess(0);
    setIndexClick(0);
    timer.stop();
  };

  const clickBox = (item) => {

    let numItemsRand = itemsRand.length - 1;

    if (itemsRand[indexClick] === item) {
      setClicksSuccess(clicksSuccess + 1);
    }

    if (numItemsRand === indexClick) {
      checkResult(clicksSuccess, numItemsRand);
    }

    setIndexClick(indexClick + 1);
  };

  return (
      <div className="box-app">
        <div className={"message-game"}>{messageStatus}</div>
        <div>{timer.getTimeValues().toString(['seconds', 'secondTenths'])}</div>

          <div className="box-items" onClick={() => clickBox('green')}>

            <Box style={boxGreen} fct={clickBox} color={"green"} />

            <Box style={boxBlue} fct={clickBox} color={"blue"} />

            <Box style={boxRed} fct={clickBox} color={"red"} />

            <Box style={boxYellow} fct={clickBox} color={"yellow"} />

          </div>

          <div className="box-buttons">
            <button onClick={startRandom}>Começar</button>
            <button onClick={removeAllBlink}>Para tudo</button>
          </div>

      </div>
  );
}
