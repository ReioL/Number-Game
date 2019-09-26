import React from "react"
import Info from "./Info"
import GameOptions from "./GameOptions"

export default function Home({ startGame }) {
  return (
    <div className="homeContent flip">
      <Info></Info>
      <GameOptions startGame={startGame}></GameOptions>
    </div>
  )
}
