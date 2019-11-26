import React, { useState } from "react"
import GoHome from "./GoHome"
import Game from "./Game"
import Results from "./Results"
import { flipToHome } from "../../helpers/flipContainer"

export default function GameContent({ setPaused, operation, particleAnimations }) {
  const [results, setResult] = useState([])
  const [gameStarted, setGameStarted] = useState(false)

  const goHome = () => {
    flipToHome(particleAnimations)
    setGameStarted(false)
    setPaused(false)
  }

  return (
    <div className="gameContent">
      <GoHome goHome={goHome} />
      <Game
        operation={operation}
        results={results}
        setResult={setResult}
        gameStarted={gameStarted}
        setGameStarted={setGameStarted}
      />
      <Results results={results} />
    </div>
  )
}
