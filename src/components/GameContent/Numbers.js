import React, { useState } from "react"

export default function Numbers({ gameStarted, numbers, clickedNumbersIndexes, numberClick }) {
  const [clickedButtons, setClickedButtons] = useState([])

  const addIndex = index => {
    numberClick(index)
    setClickedButtons([...clickedButtons, index])
  }
  return (
    <div className="numbers">
      {numbers.map((number, index) => {
        return (
          <button
            type="button"
            className="option"
            disabled={!gameStarted || clickedNumbersIndexes.includes(index)}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            onClick={() => addIndex(index)}
          >
            {number}
          </button>
        )
      })}
    </div>
  )
}
