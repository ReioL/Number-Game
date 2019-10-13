import React from "react"

export default function Numbers({ gameStarted, numbers, clickedNumbersIndexes, numberClicked }) {
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
            onClick={e => numberClicked(e, index)}
          >
            {number}
          </button>
        )
      })}
    </div>
  )
}
