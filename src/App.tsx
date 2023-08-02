import "./App.css"
import Dice from "./components/dice";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
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
  const [tenzies, setTenzies] = useState(false)
  const [dice, setDice] = useState(allnewDice())
  const diceELements = dice.map(die => {
    return <Dice key={die.id} {...die} handleClick={() => holdDice(die.id)} />
  })

  useEffect(() => {
    const expectedVal = dice[0].value
    const allExpectedResult = dice.every(die => die.isHeld && die.value === expectedVal)
    if (allExpectedResult) {
      setTenzies(true);
      console.log('You won')
    }
  }, [dice])
  // Performance optimisations
  // useEffect(() => {
  //   const expectedVal = dice[0].value
  //   for (const die of dice) {
  //     if (!die.isHeld || die.value !== expectedVal) {
  //       return
  //     }
  //   }
  //   setTenzies(true);
  //   console.log('You won')
  // }, dice)
  function regenerateDice() {
    if (tenzies) {
      setDice(allnewDice)
      setTenzies(false)
      return
    }
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
          {tenzies &&
            <Confetti />}
          <h4>Tenzies</h4>
          <p>
            Roll until all dice are the same.
            Click each die to freeze it at its current value between rolls.
          </p>
          <div className="dices">
            {diceELements}
          </div>
          <button className="roll-btn" onClick={regenerateDice}>{tenzies ? "New Game" : "Roll"}</button>
        </div>

      </div>
    </main>
  );
}

export default App;
