import { useState, useEffect } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Die from "./Die";
import "./App.css";

function App() {
  const { width, height } = useWindowSize();
  const [tenzies, setTenzies] = useState(false);
  const [dice, setDice] = useState(allNewDice());

  useEffect(() => {
    const firstValue = dice[0].value;
    const allHeld = dice.every((die) => die.isHeld);
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function randomDieValue() {
    return Math.ceil(Math.random() * 6);
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        id: i + 1,
        value: randomDieValue(),
        isHeld: false
      });
    }
    return newDice;
  }

  function rollUnheldDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die, i) =>
          die.isHeld
            ? die
            : { id: i + 1, value: randomDieValue(), isHeld: false }
        )
      );
    } else {
      setDice(allNewDice());
      setTenzies(false);
    }
  }

  function holdDie(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((die) => (
    <Die key={die.id} {...die} hold={() => holdDie(die.id)} />
  ));

  return (
    <main>
      {tenzies && <Confetti width={width} height={height} />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollUnheldDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
