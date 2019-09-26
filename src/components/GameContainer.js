import React, { useState } from "react"
import Home from "./Home"
import Game from "./Game"
export default function GameContainer() {
  const [gameOption, setGameOption] = useState("")

  const startGame = option => {
    setGameOption(option)
  }
  return (
    <div className="container">
      <Home startGame={startGame} />
      <Game operation={gameOption} />
    </div>
  )
}
