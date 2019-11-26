import React, { useState, useEffect } from "react"
import Header from "./components/Header"
import GameContainer from "./components/GameContainer"
import Particles from "./components/Particles"
import arrangeParticles from "./helpers/arrangeParticles"
import useWindowSize from "./helpers/useWindowSize"

export default function App() {
  const [particleAnimations, addParticleAnimation] = useState([])
  const [paused, setPaused] = useState(false)
  const size = useWindowSize()
  useEffect(() => {
    if (paused) arrangeParticles(paused)
  }, [size, paused])
  return (
    <>
      <div className="app">
        <Header />
        <GameContainer setPaused={setPaused} particleAnimations={particleAnimations} />
      </div>
      {/* <div className="particleContainer" /> */}
      <Particles paused={paused} addParticleAnimation={addParticleAnimation} count={20} />
    </>
  )
}
