import React from "react";

const KeyboardButton = ({ letter, onClick, disabled }) => {
  return (
    <button
      className="keyboard-button"
      onClick={() => onClick(letter)}
      disabled={disabled}
    >
      {letter}
    </button>
  );
};
const KeyboardRow = ({ letters, onClick, guessedLetters }) => {
  return (
    <div className="keyboard-row">
      {letters.map((letter) => (
        <KeyboardButton
          key={letter}
          letter={letter}
          onClick={onClick}
          disabled={guessedLetters.includes(letter)}
        />
      ))}
    </div>
  );
};
export const Keyboard = ({ onClick, guessedLetters }) => {
  const letters = "qwertyuiopasdfghjklzxcvbnm".split("");
  const rows = [
    letters.slice(0, 10),
    letters.slice(10, 19),
    letters.slice(19, 26),
  ];
  return (
    <div className="keyboard">
      {rows.map((row, index) => (
        <KeyboardRow
          key={index}
          letters={row}
          onClick={onClick}
          guessedLetters={guessedLetters}
        />
      ))}
    </div>
  );
};
