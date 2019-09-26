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
  const [clickedNumbersIndexes, setClickedNumbersIndex] = useState([])
  const [results, setResult] = useState([])
  const [gameStarted, setGameStarted] = useState(false)

  const numberClicked = (e, index) => {
    const numberValue = numbers[index]
    const numbersClicked = [...clickedNumbers, numberValue]
    const numbersClickedIndexes = [...clickedNumbersIndexes, index]
    setClickedNumbers(numbersClicked)
    setClickedNumbersIndex(numbersClickedIndexes)
    let clickedNumbersSum = numbersClicked.reduce(
      (sum, nrIndex) => sum + nrIndex,
      0
    )
    if (clickedNumbersSum === target && numbersClicked.length === 4) {
      console.log("won")
      setResult([
        ...results,
        { res: 1, numbersClicked, correctNumbers, show: 0 }
      ])
      setGameStarted(!gameStarted)
      setClickedNumbers([])
      setClickedNumbersIndex([])
      setTime(10)
    } else if (clickedNumbersSum > target || numbersClicked.length >= 4) {
      console.log("lost wrong numbers")
      setResult([
        ...results,
        { res: 0, numbersClicked, correctNumbers, show: 0 }
      ])
      setGameStarted(!gameStarted)
      setClickedNumbers([])
      setClickedNumbersIndex([])
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
    if (time <= 0) {
      console.log("lost time went to 0")
      setResult([
        ...results,
        { res: 0, numbersClicked: clickedNumbers, correctNumbers, show: 0 }
      ])
      console.log("results", results)
      setGameStarted(!gameStarted)
      setClickedNumbers([])
      setClickedNumbersIndex([])
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
    document.querySelectorAll(".particle").forEach(particle => {
      //particle.style.top = "0px"
      //particle.style.left = "0px"
      particle.style = ""
    })
    window.particles.forEach(particle => particle.play())
    setNumbers(Array(numberCount).fill("?"))
    setTarget("?")
    setGameStarted(false)
    setClickedNumbers([])
    setClickedNumbersIndex([])
    setTime(10)
  }

  const showRes = (e, ind) => {
    console.log(ind)
    const newResults = results.map((res, i) => {
      console.log(res)
      if (i === ind) return { ...res, show: !res.show }
      return res
    })
    setResult(newResults)
  }

  console.log("game numbers", numbers)
  console.log("shuffled numbers", correctNumbers)
  console.log("target", target)

  return (
    <div className="gameContent">
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
                disabled={!gameStarted || clickedNumbersIndexes.includes(index)}
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
          {results.map(
            ({ res, numbersClicked, correctNumbers, show }, index) => {
              const winlost = res === 1 ? "won" : "lost"
              const ind = index + 1
              const showResult = (
                <div
                  key={index}
                  onClick={e => showRes(e, index)}
                  className={res ? "lost" : "won"}
                  style={{ margin: "2px" }}
                >
                  {show ? (
                    <>
                      <p>You selected {numbersClicked.join("-")}</p>
                      <p>Correct are {correctNumbers.join("-")}</p>
                    </>
                  ) : (
                    <p>
                      Game {ind} {winlost}
                    </p>
                  )}
                </div>
              )

              return showResult
            }
          )}
        </div>
      </div>
    </div>
  )
}
/*<p key={index} onClick={e => showRes(e, index)}>
                  {show
                    ? `Selected ${numbersClicked.join("-")}
                    Correct ${correctNumbers.join("-")}`
                    : "Game " + ind + " " + winlost}
                </p>*/
