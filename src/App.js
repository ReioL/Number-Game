import React, { useState } from "react"
import Home from "./components/Home"
import Game from "./components/Game"
export default function App() {
  const [gameOption, setGameOption] = useState("")

  const startGame = option => {
    setGameOption(option)
  }
  return (
    <>
      <div className="home">
        <h1 className="header">NUMBERGAME</h1>
        <div className="container">
          <Home startGame={startGame} />
          <div className="gameContent">
            <Game operation={gameOption} />
          </div>
        </div>
      </div>
      <div className="particleContainer"></div>
    </>
  )
}
