import React from "react";
import styled from "styled-components";

const KeyboardButton = ({ letter, onClick, disabled }) => {
  return (
    <button className="keyboard-button" onClick={() => onClick(letter)} disabled={disabled}>
      {letter}
    </button>
  );
};

const KeyboardRow = ({ letters, onClick, guessedLetters }) => {
  return (
    <div className="keyboard-row">
      {letters.map((letter) => (
        <KeyboardButton key={letter} letter={letter} onClick={onClick} disabled={guessedLetters.includes(letter)} />
      ))}
    </div>
  );
};

const KeyboardUnstyled = ({ className, onClick, guessedLetters, handleBackspaceClick, handleEnterClick }) => {
  const letters = "qwertyuiopasdfghjklzxcvbnm".split("");
  const rows = [letters.slice(0, 10), letters.slice(10, 19), letters.slice(19, 26)];
  return (
    <div className={className}>
      <div className="keyboard">
        {rows.map((row, index) => (
          <KeyboardRow key={index} letters={row} onClick={onClick} guessedLetters={guessedLetters} />
        ))}
        <div className="keyboard-row">
          <KeyboardButton letter="⌫" onClick={handleBackspaceClick} disabled={false} />
          <KeyboardButton letter="↵" onClick={handleEnterClick} disabled={false} />
        </div>
      </div>
    </div>
  );
};

export const Keyboard = styled(KeyboardUnstyled)`
  .keyboard-button.disabled {
    background-color: #ccc;
    color: #999;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    .keyboard-row {
      margin-bottom: 5px;
    }
  }

  .keyboard-row {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .keyboard {
    justify-content: center;
    align-items: center;
    transform: scale(1.5);
  }
`;