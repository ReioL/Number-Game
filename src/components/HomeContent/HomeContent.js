import React from "react"
import Info from "./Info"
import GameOptions from "./GameOptions"

export default function HomeContent({ startGame }) {
  return (
    <div className="homeContent flip">
      <Info />
      <GameOptions startGame={startGame} />
    </div>
  )
}
