import React from "react"

export default function Home({ startGame }) {
  const gameSelectionHandler = e => {
    const homeContentEl = document.querySelector(".homeContent")
    const gameContentEl = document.querySelector(".gameContent")
    const particles = document.querySelector(".particle")
    console.log(particles)
    particles.style = { "animation-play-state": "paused" }
    console.log(particles.style.animationPlayState)
    console.log(window.particles)

    homeContentEl.style.transform = "rotateX(180deg)"
    gameContentEl.style.transform = "rotateX(360deg)"
    console.log(e.target.name)
    window.particles.forEach(animation => animation.pause())
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
