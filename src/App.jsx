import { useState } from "react";
import Confetti from "react-confetti";
import Die from "./Die";
import "./App.css";

function App() {
  const [tenzies, setTenzies] = useState(false);

  const [dice, setDice] = useState(allNewDice());

  function randomDieValue() {
    return Math.ceil(Math.random() * 6);
  }

  function allNewDice() {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      const newDie = {
        id: i + 1,
        value: randomDieValue(),
        held: false
      };
      newArray.push(newDie);
    }
    return newArray;
  }

  function rollUnheldDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die, i) =>
          die.held ? die : { id: i + 1, value: randomDieValue(), held: false }
        )
      );
    } else {
      setDice(allNewDice());
      setTenzies(false);
    }
  }

  function holdDie(id) {
    setDice((prevDice) =>
      prevDice.map((die) => (die.id === id ? { ...die, held: !die.held } : die))
    );
  }

  const diceElements = dice.map((die) => (
    <Die key={die.id} {...die} hold={() => holdDie(die.id)} />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollUnheldDice}>
        {tenzies ? "Reset Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
