import React, { useRef } from "react";
import "./app.css";

const GridInput = ({
  gridInput,
  setGridInput,
  makeGuess,
  currentWord,
  numGuesses,
}) => {
  const handleInputChange = (rowIndex, colIndex, value) => {
    const newGridInput = [...gridInput];
    newGridInput[rowIndex][colIndex] = value;
    setGridInput(newGridInput);

    if (value.length === 1 && /^[a-zA-Z]$/.test(value)) {
      makeGuess(value, rowIndex);
      const nextColIndex = colIndex + 1;
      if (nextColIndex < currentWord.length) {
        inputRefs[rowIndex][nextColIndex].current.focus();
      }
    }
  };

  const handleKeyPress = (event, rowIndex) => {
    if (event.key === "Enter") {
      const inputValues = gridInput[rowIndex].filter((value) => value && value.trim() !== "");
      if (inputValues.length === currentWord.length) {
        makeGuess(inputValues.join(""), rowIndex);
        if (rowIndex + 1 < gridInput.length) {
          inputRefs[rowIndex + 1][0].current.focus();
        }
      }
    }
  };

  const handleKeyDown = (rowIndex, colIndex, event) => {
    if (event.key === "Backspace" && gridInput[rowIndex][colIndex] === "") {
      const prevColIndex = colIndex - 1;
      if (prevColIndex >= 0) {
        inputRefs[rowIndex][prevColIndex].current.focus();
      }
    }
  };

  const inputRefs = Array.from({ length: gridInput.length }, () =>
    Array.from({ length: currentWord.length }, () => React.createRef())
  );

  return (
    <div className="grid-input-container">
      {gridInput.map((row, rowIndex) => (
        <div className="grid-input-row" key={`row-${rowIndex}`}>
          {row.map((cell, colIndex) => (
            <input
              type="text"
              maxLength={1}
              value={cell}
              key={`cell-${rowIndex}-${colIndex}`}
              onChange={(e) =>
                handleInputChange(rowIndex, colIndex, e.target.value)
              }
              onKeyDown={(e) => handleKeyDown(rowIndex, colIndex, e)}
              onKeyPress={(e) => handleKeyPress(e, rowIndex)}
              className="grid-input-cell"
              ref={inputRefs[rowIndex][colIndex]}
              disabled={rowIndex !== numGuesses}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridInput;
