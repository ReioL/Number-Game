import React, { useState, useEffect, useRef } from "react"
import GoHome from "./GoHome"
import Game from "./Game"
import Results from "./Results"

/*custom hook for interval
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
*/

export default function GameContent({ operation }) {
  const [time, setTime] = useState(10)
  const [minNumber, setMinNumber] = useState(5)
  const [maxNumber, setMaxNumber] = useState(15)
  const [numberCount, setNumberCount] = useState(6)
  const [numbers, setNumbers] = useState(Array(numberCount).fill("?"))
  const [correctNumbers, setCorrectNumbers] = useState([])
  const [target, setTarget] = useState("?")
  const [clickedNumbers, setClickedNumbers] = useState([])
  const [clickedNumbersIndexes, setClickedNumbersIndex] = useState([])
  const [results, setResult] = useState([])
  const [gameStarted, setGameStarted] = useState(false)

  const numberClicked = (e, index) => {
    const numberValue = numbers[index]
    const numbersClicked = [...clickedNumbers, numberValue]
    const numbersClickedIndexes = [...clickedNumbersIndexes, index]
    setClickedNumbers(numbersClicked)
    setClickedNumbersIndex(numbersClickedIndexes)
    const clickedNumbersSum = numbersClicked.reduce((sum, nrIndex) => sum + nrIndex, 0)
    if (clickedNumbersSum === target && numbersClicked.length === 4) {
      console.log("won")
      setResult([...results, { res: 1, numbersClicked, correctNumbers }])
      resetGame()
    } else if (clickedNumbersSum > target || numbersClicked.length >= 4) {
      console.log("lost wrong numbers")
      setResult([...results, { res: 0, numbersClicked, correctNumbers }])
      resetGame()
    }
  }

  const shuffle = numbers => {
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = numbers[i]
      numbers[i] = numbers[j]
      numbers[j] = temp
    }
    return numbers
  }

  const getNumbers = () => {
    const gameNumbers = []
    const selectCorrectNumbers = []
    for (let i = 0; i < numberCount; i += 1) {
      //get numbers between min number and max number and min, max are included
      gameNumbers.push(Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber)
    }
    //get 4 numbers to be the correct result
    selectCorrectNumbers.push(...gameNumbers.slice(0, 4))
    setCorrectNumbers(selectCorrectNumbers)
    //sum first 4 numbers to get target
    setTarget(selectCorrectNumbers.reduce((sum, num) => sum + num))
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
    if (time <= 0) {
      console.log("lost time went to 0")
      setResult([...results, { res: 0, numbersClicked: clickedNumbers, correctNumbers }])
      console.log("results", results)
      resetGame()
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

  const resetGame = () => {
    //setNumbers(Array(numberCount).fill("?"))
    //setTarget("?")
    setGameStarted(false)
    setClickedNumbers([])
    setClickedNumbersIndex([])
    setTime(10)
  }

  const goHome = () => {
    const homeContentEl = document.querySelector(".homeContent")
    const gameContentEl = document.querySelector(".gameContent")
    console.log("go home")
    homeContentEl.style.transform = "rotateX(360deg)"
    gameContentEl.style.transform = "rotateX(180deg)"
    document.querySelectorAll(".particle").forEach(particle => {
      //particle.style.top = "0px"
      //particle.style.left = "0px"
      particle.style = ""
    })
    window.particles.forEach(particle => particle.play())
    resetGame()
  }

  console.log("game numbers", numbers)
  console.log("shuffled numbers", correctNumbers)
  console.log("target", target)

  return (
    <div className="gameContent">
      <GoHome goHome={goHome} />
      <Game
        numbers={numbers}
        target={target}
        gameStarted={gameStarted}
        time={time}
        startGame={startGame}
        clickedNumbersIndexes={clickedNumbersIndexes}
        numberClicked={numberClicked}
      />
      <Results results={results} />
    </div>
  )
}
/*<p key={index} onClick={e => showRes(e, index)}>
                  {show
                    ? `Selected ${numbersClicked.join("-")}
                    Correct ${correctNumbers.join("-")}`
                    : "Game " + ind + " " + winlost}
                </p>*/
