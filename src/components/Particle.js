import React, { useRef, useEffect, useLayoutEffect, useState } from "react"

function useWindowSize() {
  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)
  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize
}

export default function Particle({ paused, addParticleAnimation }) {
  const inputEl = useRef()
  const size = useWindowSize()

  const randomHeight = () => {
    const value = Math.ceil(Math.random() * window.innerHeight)
    return value < 50 ? 50 : value
  }
  const randomWidth = () => {
    const value = Math.ceil(Math.random() * window.innerWidth)
    return value < 50 ? 50 : value
  }
  useLayoutEffect(() => {
    if (!paused) {
      const particleAnimation = inputEl.current.animate(
        [
          {
            transform: `translate3D(calc(${randomWidth()}px - 50px), calc(${randomHeight()}px - 50px), 0)`
          },
          {
            transform: `translate3D(calc(${randomWidth()}px - 50px), calc(${randomHeight()}px - 50px), 0)`
          },
          {
            transform: `translate3D(calc(${randomWidth()}px - 50px), calc(${randomHeight()}px - 50px), 0)`
          },
          {
            transform: `translate3D(calc(${randomWidth()}px - 50px), calc(${randomHeight()}px - 50px), 0)`
          },
          {
            transform: `translate3D(calc(${randomWidth()}px - 50px), calc(${randomHeight()}px - 50px), 0)`
          }
        ],
        {
          duration: 10000,
          iterations: Infinity,
          direction: "alternate"
        }
      )

      addParticleAnimation(prevAnimations => [...prevAnimations, particleAnimation])
    }
  }, [size])
  return (
    <div className="particle" ref={inputEl}>
      {Math.ceil(Math.random() * 99)}
    </div>
  )
}
