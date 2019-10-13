import React from "react"

export default function GoHome({ goHome }) {
  return (
    <button type="button" className="goHome" onClick={goHome}>
      Go Home
    </button>
  )
}
