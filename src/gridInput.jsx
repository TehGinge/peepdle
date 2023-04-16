import React, { useRef } from "react";
import "./app.css";

const GridInput = ({
  gridInput,
  setGridInput,
  makeGuess,
  currentWord,
  numGuesses,
  isGameWon,
  handleKeyboardClick,
  inputRefs,
  currentGuesses,
}) => {
  const handleInputChange = (rowIndex, colIndex, value) => {
    if (!currentGuesses.includes(value.toLowerCase())) {
      handleKeyboardClick(value, false);
    }
    value = value.toUpperCase();
    const newGridInput = [...gridInput];
    newGridInput[rowIndex][colIndex] = value;
    setGridInput(newGridInput);
  
    if (value.length === 1 && /^[a-zA-Z]$/.test(value)) {
      makeGuess(value, rowIndex);
      const nextColIndex = colIndex + 1;
      if (nextColIndex < currentWord.length) {
        inputRefs[rowIndex][nextColIndex].current.focus();
      } else if (rowIndex + 1 < gridInput.length && rowIndex === numGuesses - 1) {
        inputRefs[rowIndex + 1][0].current.focus();
      }
      handleKeyboardClick(value);
    }
  };
  
  const handleKeyPress = (event, rowIndex) => {
    if (event.key === "Enter") {
      const inputValues = gridInput[rowIndex].filter(
        (value) => value && value.trim() !== ""
      );
      if (inputValues.length === currentWord.length) {
        makeGuess(inputValues.join(""), rowIndex);
        if (rowIndex + 1 < gridInput.length) {
          inputRefs[rowIndex + 1][0].current.focus();
        }
      }
    }
  };

  // Restrict input to just letters
  const handleInputRestriction = (event) => {
    const value = event.target.value;
    if (!/^[a-zA-Z]$/.test(value)) {
      event.target.value = "";
    }
  };

  // Allow backspace to work with the gridbox
  const handleKeyDown = (rowIndex, colIndex, event) => {
    if (event.key === "Backspace" && gridInput[rowIndex][colIndex] === "") {
      const prevColIndex = colIndex - 1;
      if (prevColIndex >= 0) {
        inputRefs[rowIndex][prevColIndex].current.focus();
      }
    }
  };

  return (
    <div className="grid-input-container">
      {gridInput.map((row, rowIndex) => (
        <div className="grid-input-row" key={`row-${rowIndex}`}>
          {row.map((cell, colIndex) => {
            const currentLetter = gridInput[rowIndex][colIndex];
            let gridCellStyle = "";
  
            if (rowIndex < numGuesses) {
              if (
                currentLetter.toLowerCase() ===
                currentWord[colIndex].toLowerCase()
              ) {
                gridCellStyle = "correct-position";
              } else if (
                currentWord.toLowerCase().includes(currentLetter.toLowerCase())
              ) {
                gridCellStyle = "in-word";
              }
            } else if (isGameWon) {
              if (
                currentLetter.toLowerCase() ===
                currentWord[colIndex].toLowerCase()
              ) {
                gridCellStyle = "correct-position";
              }
            }
  
            return (
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
                onInput={handleInputRestriction}
                className={`grid-input-cell ${gridCellStyle}`}
                ref={inputRefs[rowIndex][colIndex]}
                disabled={rowIndex !== numGuesses}
                data-columns={colIndex}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GridInput;
