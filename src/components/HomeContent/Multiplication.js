import React from "react"

export default function Multiplication({ gameSelectionHandler }) {
  return (
    <button type="button" className="multiplication" name="mult" onClick={gameSelectionHandler}>
      Multiplication
    </button>
  )
}
