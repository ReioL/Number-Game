/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react"

export default function Result({ res, numbersClicked, correctNumbers }) {
  const [show, toggleShow] = useState(false)

  return (
    <div onClick={() => toggleShow(!show)} className={res ? "won" : "lost"}>
      {show ? (
        <>
          <p>You selected {numbersClicked.join("-")}</p>
          <p>Correct were {correctNumbers.join("-")}</p>
        </>
      ) : (
        <p>Game {res ? "won" : "lost"}</p>
      )}
    </div>
  )
}
