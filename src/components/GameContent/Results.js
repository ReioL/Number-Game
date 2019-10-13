import React from "react"
import Result from "./Result"

export default function Results({ results }) {
  return (
    <div className="resultsContainer">
      <div className="resultsHeader">Here are results</div>
      <div className="results">
        {results.map(({ res, numbersClicked, correctNumbers, show }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Result key={index} res={res} numbersClicked={numbersClicked} correctNumbers={correctNumbers} show={show} />
        ))}
      </div>
    </div>
  )
}
