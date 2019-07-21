import React, { useState, useEffect, useRef } from "react"

function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default function Game({ operation }) {
  const [time, setTime] = useState(10)
  const [minNumber, setMinNumber] = useState(5)
  const [maxNumber, setMaxNumber] = useState(15)
  const [numberCount, setNumberCount] = useState(6)
  const [numbers, setNumbers] = useState(Array(numberCount).fill("?"))
  const [correctNumbers, setCorrectNumbers] = useState([])
  const [target, setTarget] = useState("?")
  const [clickedNumbers, setClickedNumbers] = useState([])
  const [result, setResult] = useState(null)
  const [gameStarted, setGameStarted] = useState(false)

  const numberClicked = (e, index) => {
    const numbersClicked = [...clickedNumbers, index]
    setClickedNumbers(numbersClicked)
    let clickedNumbersSum = numbersClicked.reduce(
      (sum, nrIndex) => sum + numbers[nrIndex],
      0
    )
    if (clickedNumbersSum === target && numbersClicked.length === 4) {
      console.log("won")
      setResult("WON")
      setGameStarted(!gameStarted)
      setClickedNumbers([])
    } else if (clickedNumbersSum > target || numbersClicked.length >= 4) {
      console.log("lost")
      setResult("LOST")
      setGameStarted(!gameStarted)
      setClickedNumbers([])
    }
  }

  const shuffle = numbers => {
    for (let i = numbers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = numbers[i]
      numbers[i] = numbers[j]
      numbers[j] = temp
    }
    return numbers
  }

  const getNumbers = () => {
    let gameNumbers = []
    let correctNumbers = []
    for (var i = 0; i < numberCount; i++) {
      //get numbers between min number and max number and min, max are included
      gameNumbers.push(
        Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber
      )
    }
    //get 4 numbers to be the correct result
    correctNumbers.push(...gameNumbers.slice(0, 4))
    setCorrectNumbers(correctNumbers)
    //sum first 4 numbers to get target
    setTarget(correctNumbers.reduce((sum, num) => sum + num))
    //shuffle numbers for display
    setNumbers(shuffle(gameNumbers))
  }

  /* useInterval(() => {
    // Your custom logic here
    if (gameStarted) setTime(time + 1)
  }, 1000) */

  useEffect(() => {
    let interval = null
    if (gameStarted) {
      interval = setInterval(() => {
        setTime(time => time + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  })

  useEffect(() => {
    if (gameStarted) getNumbers()
  }, [gameStarted])

  const startGame = () => {
    setGameStarted(!gameStarted)
  }
  console.log("game numbers", numbers)
  console.log("shuffled numbers", correctNumbers)
  console.log("target", target)

  return (
    <div className="gameContent">
      <div className="game">
        <div className="target">{target}</div>
        <div className="numbers">
          {numbers.map((number, index) => {
            return (
              <button
                className="option"
                disabled={!gameStarted || clickedNumbers.includes(index)}
                key={index}
                onClick={e => numberClicked(e, index)}
              >
                {number}
              </button>
            )
          })}
        </div>
        {gameStarted ? (
          <div className="timer">{time}</div>
        ) : (
          <button className="footer" onClick={startGame}>
            START!!!
          </button>
        )}
      </div>
      <div className="results">
        <div className="resultsHeader">Here are results</div>
        <div className="result">first result - {result}</div>
      </div>
    </div>
  )
}
