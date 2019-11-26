import React from "react"
import Info from "./Info"
import GameOptions from "./GameOptions"

export default function HomeContent({ startGame, particleAnimations }) {
  return (
    <div className="homeContent flip">
      <Info />
      <GameOptions startGame={startGame} particleAnimations={particleAnimations} />
    </div>
  )
}
