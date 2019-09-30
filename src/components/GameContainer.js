import React, { useState } from "react"
import HomeContent from "./HomeContent"
import GameContent from "./GameContent"

export default function GameContainer() {
  const [gameOption, setGameOption] = useState("")

  const startGame = option => {
    setGameOption(option)
  }
  return (
    <div className="container">
      <HomeContent startGame={startGame} />
      <GameContent operation={gameOption} />
    </div>
  )
}
