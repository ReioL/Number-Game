import React, { useState } from "react"
import Result from "./Result"
import useWindowSize from "../../helpers/useWindowSize"
import resultsPNG from "../../../Results.jpg"

export default function Results({ results }) {
  const [showResults, setShowResults] = useState(false)
  const size = useWindowSize()

  return (
    // eslint-disable-next-line no-nested-ternary
    <div className="resultsContainer" style={{ height: size.width > 600 ? "100%" : showResults ? "100%" : "40px" }}>
      {size.width > 600 ? (
        <>
          <div className="resultsHeader">Here are results</div>
          <div className="results">
            {results.map(({ res, numbersClicked, correctNumbers }, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Result key={index} res={res} numbersClicked={numbersClicked} correctNumbers={correctNumbers} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div
            className="resultsHeader"
            onClick={() => setShowResults(!showResults)}
            onKeyPress={() => setShowResults(!showResults)}
            role="button"
            tabIndex="0"
          >
            {showResults ? "Close results overlay" : "Show results overlay"}
            <img src={resultsPNG} alt="result" />
          </div>
          <div className={`results ${showResults ? "showResults" : ""}`}>
            {results.map(({ res, numbersClicked, correctNumbers }, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Result key={index} res={res} numbersClicked={numbersClicked} correctNumbers={correctNumbers} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
