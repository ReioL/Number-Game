import React, { useState } from "react"
import Home from "./components/Home"
import Game from "./components/Game"
export default function App() {
  const [gameOption, setGameOption] = useState("")

  const startGame = option => {
    setGameOption(option)
  }

  return (
    <div className="home">
      <h1 className="header">NUMBERGAME</h1>
      {!gameOption ? (
        <Home startGame={startGame} />
      ) : (
        <>
          <button onClick={() => setGameOption("")}>Go Home</button>
          <Game operation={gameOption} />
        </>
      )}
    </div>
  )
}
