import React, { useEffect } from "react"
import Particle from "./Particle"
import rearrangeParticles from "../helpers/arrangeParticles"

export default function Particles({ paused, addParticleAnimation, count }) {
  const particleArray = Array(count).fill()

  return (
    <div className="particleContainer">
      {particleArray.map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Particle paused={paused} key={index} addParticleAnimation={addParticleAnimation} />
      ))}
    </div>
  )
}
