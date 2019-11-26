import React, { useState, useEffect } from "react"
import HomeContent from "./HomeContent"
import GameContent from "./GameContent"
import arrangeParticles from "../helpers/arrangeParticles"

export default function GameContainer({ setPaused, particleAnimations }) {
  const [gameOption, setGameOption] = useState("")

  const startGame = option => {
    setGameOption(option)
    arrangeParticles()
    setPaused(true)
  }

  return (
    <div className="container">
      <HomeContent startGame={startGame} particleAnimations={particleAnimations} />
      <GameContent setPaused={setPaused} operation={gameOption} particleAnimations={particleAnimations} />
    </div>
  )
}
