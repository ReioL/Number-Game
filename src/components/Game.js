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
  const [results, setResult] = useState([])
  const [gameStarted, setGameStarted] = useState(false)

  const numberClicked = (e, index) => {
    const numberValue = numbers[index]
    const numbersClicked = [...clickedNumbers, numberValue]
    setClickedNumbers(numbersClicked)
    let clickedNumbersSum = numbersClicked.reduce(
      (sum, nrIndex) => sum + nrIndex,
      0
    )
    if (clickedNumbersSum === target && numbersClicked.length === 4) {
      console.log("won")
      setResult([...results, numbersClicked])
      setGameStarted(!gameStarted)
      setClickedNumbers([])
      setTime(10)
    } else if (clickedNumbersSum > target || numbersClicked.length >= 4) {
      console.log("lost wrong numbers")
      setResult([...results, numbersClicked])
      setGameStarted(!gameStarted)
      setClickedNumbers([])
      setTime(10)
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
  /*
  useInterval(() => {
    // Your custom logic here
    if (gameStarted) setTime(time + 1)
  }, 1000)
*/
  useEffect(() => {
    if (time === 0) {
      console.log("lost time went to 0")
      setResult([...results, clickedNumbers])
      setGameStarted(!gameStarted)
      setClickedNumbers([])
      setTime(10)
    }
  }, [time])

  useEffect(() => {
    let interval = null
    if (gameStarted) {
      getNumbers()
      interval = setInterval(() => setTime(t => t - 1), 1000)
    }
    return () => clearInterval(interval)
  }, [gameStarted])

  const startGame = () => {
    setGameStarted(!gameStarted)
  }

  const goHome = () => {
    const homeContentEl = document.querySelector(".homeContent")
    const gameContentEl = document.querySelector(".gameContent")
    console.log("go home")
    homeContentEl.style.transform = "rotateX(360deg)"
    gameContentEl.style.transform = "rotateX(180deg)"
    window.particles.forEach(animation => animation.play())
    setGameStarted(false)
  }

  console.log("game numbers", numbers)
  console.log("shuffled numbers", correctNumbers)
  console.log("target", target)

  return (
    <>
      <button className="goHome" onClick={goHome}>
        Go Home
      </button>
      <div className="game">
        <div className="target">{target}</div>
        <div className="numbers">
          {numbers.map((number, index) => {
            return (
              <button
                className="option"
                disabled={
                  !gameStarted || clickedNumbers.includes(numbers[index])
                }
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
        <div className="result">
          {results.map((res, index) => {
            console.log(res)
            return <p key={index}>{res}</p>
          })}
        </div>
      </div>
    </>
  )
}
