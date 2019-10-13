import React from "react"
import Numbers from "./Numbers"

export default function Game({ target, gameStarted, time, startGame, numbers, clickedNumbersIndexes, numberClicked }) {
  const displayTimerOrButton = gameStarted ? (
    <div className="timer">{time}</div>
  ) : (
    <button type="button" className="footer" onClick={startGame}>
      START!!!
    </button>
  )
  return (
    <div className="game">
      <div className="target">{target}</div>
      <Numbers
        gameStarted={gameStarted}
        numbers={numbers}
        clickedNumbersIndexes={clickedNumbersIndexes}
        numberClicked={numberClicked}
      />
      {displayTimerOrButton}
    </div>
  )
}
