import React from "react"

export default function Home({ startGame }) {
  const gameSelectionHandler = e => {
    const homeContentEl = document.querySelector(".homeContent")
    const gameContentEl = document.querySelector(".gameContent")
    const particles = document.querySelector(".particle")

    homeContentEl.style.transform = "rotateX(180deg)"
    gameContentEl.style.transform = "rotateX(360deg)"
    window.particles.forEach(particle => {
      particle.cancel()
    })
    startGame(e.target.name)
  }

  return (
    <div className="homeContent flip">
      <h3 className="info">
        Select addition or multiplication option to play the game
      </h3>
      <div className="gameOptions">
        <button className="addition" name="add" onClick={gameSelectionHandler}>
          Addition
        </button>
        <button
          className="multiplication"
          name="mult"
          onClick={gameSelectionHandler}
        >
          Multiplication
        </button>
      </div>
    </div>
  )
}
