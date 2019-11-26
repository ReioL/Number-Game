import React, { useState, useEffect } from "react"
import Numbers from "./Numbers"
import shuffleNumbers from "../../helpers/shuffleNumbers"

export default function Game({ operation, results, setResult, gameStarted, setGameStarted }) {
  const [time, setTime] = useState(10)
  const [minNumber, setMinNumber] = useState(5)
  const [maxNumber, setMaxNumber] = useState(15)
  const [numberCount, setNumberCount] = useState(6)
  const [numbers, setNumbers] = useState(Array(numberCount).fill("?"))
  const [correctNumbers, setCorrectNumbers] = useState([])
  const [target, setTarget] = useState("?")
  const [clickedNumbers, setClickedNumbers] = useState([])
  const [clickedNumbersIndexes, setClickedNumbersIndex] = useState([])
  const [lastResult, setLastResult] = useState("")

  const checkResult = (targetVal, numClicked) => {
    const numbersSum = numClicked.reduce(
      (sum, nr) => (operation === "add" ? sum + nr : sum * nr),
      operation === "add" ? 0 : 1
    )
    if (numbersSum === targetVal && numClicked.length === 4) {
      console.log("won")
      setResult([...results, { res: 1, numbersClicked: numClicked, correctNumbers }])
      setGameStarted(false)
      setLastResult("won")
    } else if (numbersSum > targetVal || numClicked.length >= 4) {
      console.log("lost - wrong numbers")
      setResult([...results, { res: 0, numbersClicked: numClicked, correctNumbers }])
      setGameStarted(false)
      setLastResult("lost")
    }
  }

  const numberClick = index => {
    const numberValue = numbers[index]
    const numbersClicked = [...clickedNumbers, numberValue]
    const numbersClickedIndexes = [...clickedNumbersIndexes, index]
    setClickedNumbers(numbersClicked)
    setClickedNumbersIndex(numbersClickedIndexes)
    checkResult(target, numbersClicked)
  }

  const setGameState = () => {
    const gameNumbers = []
    const selectCorrectNumbers = []
    const maxNumber = operation === "add" ? 15 : 5
    const minNumber = operation === "add" ? 5 : 2
    for (let i = 0; i < numberCount; i += 1) {
      //get numbers between min number and max number and min, max are included
      gameNumbers.push(Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber))
    }
    //get 4 numbers to be the correct result
    selectCorrectNumbers.push(...gameNumbers.slice(0, 4))
    setCorrectNumbers(selectCorrectNumbers)
    //sum first 4 numbers to get target
    setTarget(selectCorrectNumbers.reduce((sum, num) => (operation === "add" ? sum + num : sum * num)))
    //shuffle numbers for display
    setNumbers(shuffleNumbers(gameNumbers))
  }
  useEffect(() => {
    if (time <= 0) {
      console.log("lost - time went to 0")
      setResult([...results, { res: 0, numbersClicked: clickedNumbers, correctNumbers }])
      setGameStarted(false)
      setLastResult("lost")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time])

  /*   useInterval(() => {
    if (gameStarted) setTime(t => t - 1)
  }, 1000) */
  useEffect(() => {
    let interval = null
    if (gameStarted) {
      interval = setInterval(() => setTime(t => t - 1), 1000)
    }
    return () => clearInterval(interval)
  }, [gameStarted])

  const startGame = () => {
    setGameState()
    setTime(10)
    setClickedNumbers([])
    setClickedNumbersIndex([])
    setGameStarted(true)
    setLastResult("")
  }

  const displayTimerOrButton = gameStarted ? (
    <div className="timer">{time}</div>
  ) : (
    <button type="button" className="footer" onClick={startGame}>
      START!!!
    </button>
  )
  return (
    <div className="game">
      <div
        className="target"
        // eslint-disable-next-line no-nested-ternary
        style={lastResult === "lost" ? { background: "red" } : lastResult === "won" ? { background: "green" } : {}}
      >
        {target}
      </div>
      <Numbers
        gameStarted={gameStarted}
        numbers={numbers}
        clickedNumbersIndexes={clickedNumbersIndexes}
        numberClick={numberClick}
      />
      {displayTimerOrButton}
    </div>
  )
}
