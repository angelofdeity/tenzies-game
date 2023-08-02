import "./App.css"
import Dice from "./components/dice";
import { useState } from "react";
import {nanoid} from "nanoid"
const App = () => {
  function allnewDice() {
    const arr = []
    for (let i = 0; i < 10; i++) {
      const rand_num = Math.floor(Math.random() * 6) + 1
      arr.push({
        value: rand_num,
        isHeld: false,
        id: nanoid()
      })
    }
    return arr
  }
  function holdDice(id: string) {
    setDice(prevDice =>
      prevDice.map(die =>
        id === die.id ? { ...die, isHeld: !die.isHeld } : die
    )
  )
  }

  const [dice, setDice] = useState(allnewDice())
  const diceELements = dice.map(die => {
    return <Dice key={die.id} {...die} handleClick={() => holdDice(die.id)} />
  })
  function regenerateDice() {
    setDice(prevDice =>
      prevDice.map(die => {
        return die.isHeld ? die :
          {
          ...die,
          value: Math.ceil(Math.random() * 6)
        }
      })
      )
  }
  return (
    <main>
      <div className="tenzies">
        <div className="tenzies--main">
          <h4>Tenzies</h4>
          <p>
            Roll until all dice are the same.
            Click each die to freeze it at its current value between rolls.
          </p>
          <div className="dices">
            {diceELements}
          </div>
          <button className="roll-btn" onClick={regenerateDice}>Roll</button>
        </div>

      </div>
    </main>
  );
}

export default App;
