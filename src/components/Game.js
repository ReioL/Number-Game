import React, { useState, useEffect } from "react"

export default function Game({ operation }) {
  const [time, setTime] = useState(10)
  const [minNumber, setMinNumber] = useState(5)
  const [maxNumber, setMaxNumber] = useState(15)
  const [numberCount, setNumberCount] = useState(6)

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
    let target = 0
    for (var i = 0; i < numberCount; i++) {
      //get numbers between min number and max number and min, max are included
      gameNumbers.push(
        Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber
      )
    }
    console.log("game numbers", gameNumbers)
    //get 4 numbers to be the correct result
    correctNumbers.push(...gameNumbers.slice(0, 4))
    target = correctNumbers.reduce((sum, num) => sum + num)
    let shuffledNumbers = shuffle(gameNumbers)
    console.log("shuffled numbers", shuffledNumbers)
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTime(time - 1)
    }, 1000)
    return () => clearInterval(interval)
  })

  console.log(getNumbers())
  return (
    <div className="gameContent">
      <div className="game">
        <div className="target">Target</div>
        <div className="numbers">
          <div className="option">option1</div>
          <div className="option">option2</div>
          <div className="option">option3</div>
          <div className="option">option4</div>
          <div className="option">option5</div>
          <div className="option">option6</div>
        </div>
        <div className="footer">Again or countdown {time}</div>
      </div>
      <div className="results">
        <div className="resultsHeader">Here are results</div>
        <div className="result">first result</div>
      </div>
    </div>
  )
}
