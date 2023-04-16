import React, { useRef } from "react";
import styled from "styled-components";

const GridInputUnstyled = ({ className, gridInput, setGridInput, makeGuess, currentWord, numGuesses, isGameWon, handleKeyboardClick, inputRefs, currentGuesses, gaveUp }) => {
	const handleInputChange = (rowIndex, colIndex, value) => {	  
		value = value.toUpperCase();
		const newGridInput = [...gridInput];
		newGridInput[rowIndex][colIndex] = value;
		setGridInput(newGridInput);
	  
		if (value.length === 1 && /^[a-zA-Z]$/.test(value)) {
		  const isCorrect = makeGuess(value, rowIndex);
		  if (!isCorrect) {
			const nextColIndex = colIndex + 1;
			if (nextColIndex < currentWord.length) {
			  inputRefs[rowIndex][nextColIndex].current.focus();
			} else if (rowIndex + 1 < gridInput.length && rowIndex === numGuesses - 1) {
			  inputRefs[rowIndex + 1][0].current.focus();
			}
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
		<div className={className}>
			{gridInput.map((row, rowIndex) => (
				<div className="grid-input-row" key={`row-${rowIndex}`}>
					{row.map((cell, colIndex) => {
						const currentLetter = gridInput[rowIndex][colIndex];
						let gridCellStyle = "";

						if (rowIndex < numGuesses) {
							if (currentLetter.toLowerCase() === currentWord[colIndex].toLowerCase()) {
								gridCellStyle = "correct-position";
							} else if (currentWord.toLowerCase().includes(currentLetter.toLowerCase())) {
								gridCellStyle = "in-word";
							}
						} else if (isGameWon) {
							if (currentLetter.toLowerCase() === currentWord[colIndex].toLowerCase()) {
								gridCellStyle = "correct-position";
							}
						}

						return (
							<input
								type="text"
								maxLength={1}
								value={cell}
								key={`cell-${rowIndex}-${colIndex}`}
								onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
								onKeyDown={(e) => handleKeyDown(rowIndex, colIndex, e)}
								onKeyPress={(e) => handleKeyPress(e, rowIndex)}
								onInput={handleInputRestriction}
								className={`grid-input-cell ${gridCellStyle}`}
								ref={inputRefs[rowIndex][colIndex]}
								disabled={rowIndex !== numGuesses || gaveUp}
								data-columns={colIndex}
								gaveUp={gaveUp}
							/>
						);
					})}
				</div>
			))}
		</div>
	);
};

const GridInput = styled(GridInputUnstyled)`
  display: grid;
  align-items: center;
  grid-gap: 8px;

  .grid-input-row {
    display: grid;
    grid-template-columns: repeat(${(props) => props.currentWord.length}, 1fr);
	grid-gap: 10px;
  }

  .grid-input-cell {
    text-align: center;
    background-color: #999;
    color: white;
    font-size: 30px;
    width: 90%;
    height: 90%;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    display: grid;
    align-items: center;

    .grid-input-row {
      grid-template-columns: repeat(${(props) => props.currentWord.length}, minmax(10vw, 1fr));
    }

    .grid-input-cell {
      width: 10vw;
      font-size: 20px;
    }

    /* reduce cell size for 8 or more columns */
    @media (max-width: 480px) and (min-width: 400px) and (max-height: 500px) {
      .grid-input-cell {
        width: calc((90vw - 40px) / 8);
        height: calc((90vw - 40px) / 8);
      }
    }

    /* reduce cell size for 9 or more columns */
    @media (max-width: 480px) and (max-width: 320px) and (min-height: 568px) {
      .grid-input-cell {
        width: calc((90vw - 40px) / 9);
        height: calc((90vw - 40px) / 9);
      }
    }
  }
`;

export default GridInput;
