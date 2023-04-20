import React from "react";
import { GuessesDisplay } from "./GuessesDisplay";
import GridInput from "./GridInput";
import styled from "styled-components";

const GuessesUnstyled = ({
  className,
  gridInput,
  setGridInput,
  maxGuesses,
  makeGuess,
  currentWord,
  numGuesses,
  completed,
  inputRefs,
  handleKeyboardClick,
  currentGuesses,
  handleBackspaceClick,
  handleEnterClick,
  hintsLeft,
  useHint,
  gameStarted,
}) => {
  return (
    <div className={className}>
      <GridInput
        gridInput={gridInput}
        setGridInput={setGridInput}
        maxGuesses={maxGuesses}
        makeGuess={makeGuess}
        currentWord={currentWord}
        numGuesses={numGuesses}
        isGameWon={completed}
        inputRefs={inputRefs}
        handleKeyboardClick={handleKeyboardClick}
        currentGuesses={currentGuesses}
        handleBackspaceClick={handleBackspaceClick}
        handleEnterClick={handleEnterClick}
      />
      <GuessesDisplay
        numGuesses={numGuesses}
      />
    </div>
  );
};

export const Guesses = styled(GuessesUnstyled)`
  margin-top: 10px;
  text-align: center;
`;
