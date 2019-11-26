import React from "react"
import Addition from "./Addition"
import Multiplication from "./Multiplication"
import { flipToGame } from "../../helpers/flipContainer"

export default function GameOptions({ startGame, particleAnimations }) {
  const gameSelectionHandler = e => {
    flipToGame(particleAnimations)
    startGame(e.target.name)
  }

  return (
    <div className="gameOptions">
      <Addition gameSelectionHandler={gameSelectionHandler} />
      <Multiplication gameSelectionHandler={gameSelectionHandler} />
    </div>
  )
}
