import { useState } from "react";
import Confetti from "react-confetti";
import Die from "./Die";
import "./App.css";

function App() {
  const [tenzies, setTenzies] = useState(false);
  // test array
  const [dice, setDice] = useState([
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 6 },
    { value: 3 },
    { value: 1 },
    { value: 2 },
    { value: 5 },
    { value: 6 },
    { value: 1 }
  ]);

  const diceElements = dice.map((die) => <Die value={die.value} />);

  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button>{tenzies ? "Reset Game" : "Roll"}</button>
    </main>
  );
}

export default App;
