import React from "react"
import Addition from "./Addition"
import Multiplication from "./Multiplication"

export default function GameOptions({ startGame }) {
  const flipGameContainer = () => {
    const homeContentEl = document.querySelector(".homeContent")
    const gameContentEl = document.querySelector(".gameContent")

    homeContentEl.style.transform = "rotateX(180deg)"
    gameContentEl.style.transform = "rotateX(360deg)"
  }

  const gameSelectionHandler = e => {
    flipGameContainer()
    window.particles.forEach(particle => {
      particle.pause()
    })
    startGame(e.target.name)
  }

  return (
    <div className="gameOptions">
      <Addition gameSelectionHandler={gameSelectionHandler} />
      <Multiplication gameSelectionHandler={gameSelectionHandler} />
    </div>
  )
}
