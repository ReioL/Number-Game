import React from "react"
import Header from "./components/Header"
import GameContainer from "./components/GameContainer"

export default function App() {
  return (
    <>
      <div className="app">
        <Header />
        <GameContainer />
      </div>
      <div className="particleContainer" />
    </>
  )
}
