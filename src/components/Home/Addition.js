import React from "react"

export default function Addition({ gameSelectionHandler }) {
  return (
    <button className="addition" name="add" onClick={gameSelectionHandler}>
      Addition
    </button>
  )
}
