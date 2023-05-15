import styled from "styled-components";
import React, { useRef, useEffect } from "react";

const GridInputUnstyled = ({ className, gridInput, currentWord, numGuesses, isGameWon, inputRefs, handleKeyboardClick, handleBackspaceClick, handleEnterClick }) => {
	const rootRef = useRef(null);

	useEffect(() => {
		const handleDesktopKeyDown = (event) => {
			console.log("Key pressed:", event.key);
			const key = event.key.toUpperCase();
			const isLetter = /^[A-Z]$/.test(key);
			if (isLetter) {
				handleKeyboardClick(key, false);
			} else if (event.key === "Backspace") {
				if (handleBackspaceClick) {
					handleBackspaceClick();
				}
			} else if (event.key === "Enter") {
				if (handleEnterClick) {
					handleEnterClick();
				}
			}
		};

		if (rootRef.current) {
			window.addEventListener("keydown", handleDesktopKeyDown);
		}

		return () => {
			if (window) {
				window.removeEventListener("keydown", handleDesktopKeyDown);
			}
		};
	}, [handleKeyboardClick, handleBackspaceClick, handleEnterClick, rootRef]);

  // Initialize the counts for each letter in the current word
  const correctLetterCounts = {};
  currentWord.split('').forEach((letter) => {
    correctLetterCounts[letter.toLowerCase()] = (correctLetterCounts[letter.toLowerCase()] || 0) + 1;
  });

  return (
    <div className={className} tabIndex={-1} ref={rootRef}>
      {gridInput.map((row, rowIndex) => (
        <div className="grid-input-row" key={`row-${rowIndex}`}>
          {row.map((cell, colIndex) => {
            const currentLetter = gridInput[rowIndex][colIndex];
            let gridCellStyle = "";
  
            if (rowIndex < numGuesses) {
              let guessedLetterCounts = {};
  
              // Count the occurrences of each letter in the guessed word
              gridInput[rowIndex].join('').split('').forEach((letter) => {
                guessedLetterCounts[letter.toLowerCase()] = (guessedLetterCounts[letter.toLowerCase()] || 0) + 1;
              });
  
              if (currentLetter.toLowerCase() === currentWord[colIndex].toLowerCase()) {
                gridCellStyle = "correct-position";
              } else if (
                currentWord.toLowerCase().includes(currentLetter.toLowerCase()) &&
                guessedLetterCounts[currentLetter.toLowerCase()] <= correctLetterCounts[currentLetter.toLowerCase()]
              ) {
                gridCellStyle = "in-word";
                correctLetterCounts[currentLetter.toLowerCase()]--;
              } else {
                gridCellStyle = "not-in-word";
              }
            } else if (isGameWon) {
              if (currentLetter.toLowerCase() === currentWord[colIndex].toLowerCase()) {
                gridCellStyle = "correct-position";
              }
            }
  
            return (
              <div key={`${rowIndex} | ${colIndex}`} className={`grid-input-cell ${gridCellStyle}`} ref={inputRefs[rowIndex][colIndex]} disabled={rowIndex !== numGuesses} data-columns={colIndex}>
                {cell}
              </div>
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
	grid-gap: 1px; // gap between rows
	justify-content: center;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

	.grid-input-row {
		display: grid;
		grid-template-columns: repeat(${(props) => props.currentWord.length}, 1fr);
		grid-gap: 1px; // gap between columns
	}

	.grid-input-cell {
		background-color: #000000;
		color: white;
		font-size: 30px;
		width: 60px;
		height: 60px;
		border: 2px solid #464545;
		outline: none;
		display: grid;
		align-items: center;
		user-select: none;
		border-radius: 0.25rem;
	}

	.correct-position {
		background-color: green;
		color: white;
	}

	.in-word {
		background-color: darkorange;
		color: white;
	}

	.not-in-word {
		background-color: dimgray;
		color: white;
	}

	@media (max-width: 520px) {
		.grid-input-cell {
			font-size: 30px;
			width: 45px;
			height: 45px;
		}
	}

	@media (max-width: 480px) {
		.grid-input-row {
			grid-template-columns: repeat(${(props) => props.currentWord.length}, minmax(10vw, 1fr));
		}

		.grid-input-cell {
			font-size: 25px;
			width: 45px;
			height: 45px;
		}
	}
`;

export default GridInput;
