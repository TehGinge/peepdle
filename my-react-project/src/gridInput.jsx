import React from "react";
import "./app.css";

const GridInput = ({ gridInput, setGridInput, makeGuess, makeWordGuess ,currentWord }) => {
  const handleInputChange = (rowIndex, colIndex, value) => {
    const newGridInput = [...gridInput];
    newGridInput[rowIndex][colIndex] = value;
    setGridInput(newGridInput);

    if (value.length === 1 && /^[a-zA-Z]$/.test(value)) {
      makeGuess(value);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && currentWord) {
      const inputValues = gridInput
        .flat()
        .filter((value) => value && value.trim() !== "");
      if (inputValues.length === currentWord.length) {
        makeWordGuess(inputValues.join(""));
      }
    }
  };
  
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
              onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
              onKeyPress={handleKeyPress}
              className="grid-input-cell"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridInput;
