import React from "react";
import styled from "styled-components";
import { Hint } from "./HintButton";

const KeyboardButton = ({ letter, onClick, disabled, customClass }) => {
  return (
    <button
      className={`keyboard-button ${customClass ? customClass : ""}`}
      tabIndex={-1}
      onClick={onClick}
      disabled={disabled}
    >
      {letter}
    </button>
  );
};

const KeyboardRow = ({ letters, onClick, guessedLetters }) => {
  return (
    <div className="keyboard-row">
      {letters.map((item) => {
        if (typeof item === "string") {
          const letter = item;
          const isGuessed = guessedLetters.includes(letter);
          return (
            <KeyboardButton
              key={letter}
              letter={letter.toUpperCase()}
              onClick={() => onClick(letter)}
              disabled={isGuessed}
            />
          );
        } else {
          // Render custom button
          const { letter, onClick, customClass } = item;
          return (
            <KeyboardButton
              key={letter}
              letter={letter}
              onClick={onClick}
              disabled={false}
              customClass={customClass}
            />
          );
        }
      })}
    </div>
  );
};

const KeyboardUnstyled = ({
  className,
  onClick,
  guessedLetters,
  handleBackspaceClick,
  handleEnterClick,
  revealAnswer,
  handleNewGamePress,
  handleSkipPress,
  useHint,
  hintsLeft,
  gameStarted,
  completed,
  skips,
  handleShowQuote
}) => {
  const letters = "qwertyuiopasdfghjklzxcvbnm".split("");
  const rows = [
    letters.slice(0, 10),
    letters.slice(10, 19),
    [
      { letter: "⌫", onClick: handleBackspaceClick, customClass: "backspace" },
      ...letters.slice(19, 26),
      { letter: "↵", onClick: handleEnterClick, customClass: "enter" },
    ],
  ];

  return (
    <div className={className}>
      <div className="buttons-container">
        <button
          className="left-button button"
          tabIndex={-1}
          onClick={completed ? handleShowQuote : revealAnswer}
        >
          {completed ? "Show Quote" : "Give Up?"}
        </button>
        <Hint
          useHint={useHint}
          hintsLeft={hintsLeft}
          gameStarted={gameStarted}
          completed={completed}
        />
        <button
          className="right-button button"
          tabIndex={-1}
          onClick={completed ? handleNewGamePress : handleSkipPress}
		  disabled={skips === 0 && !completed}
        >
          {completed ? "Next Word" : `Skip (${skips})`}
        </button>
      </div>
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
    </div>
  );
};

export const Keyboard = styled(KeyboardUnstyled)`
  .keyboard-button {
    font-size: 1.25rem;
    width: 3rem;
    height: 4rem;
    background-color: #2b2b2b;
    border: 2px solid #d9d9d9;
    color: #ffffff;
    cursor: pointer;
    margin: 0.1rem;
    border-radius: 0.25rem;
    transition: background-color 0.1s ease-in-out, color 0.2s ease-in-out;
    user-select: none;
  }

  .keyboard-button:hover {
    background-color: #ffffff;
    color: #000000;
  }

  .keyboard-button:active {
    background-color: #ccc;
  }

  .correct-position.keyboard-button {
    background-color: green;
    color: white;
  }

  .in-word.keyboard-button {
    background-color: darkorange;
    color: white;
  }

  .not-in-word.keyboard-button {
    background-color: dimgray;
    color: white;
  }

  .keyboard-button.backspace {
    background-color: #2b2b2b;
    color: #fff9f9;
    border: 2px solid #d9d9d9;
    font-size: 1.5rem;
    width: 4.5rem;
    min-width: 4.5rem;
  }

  .keyboard-button.enter {
    background-color: #2b2b2b;
    color: #fff9f9;
    border: 2px solid #d9d9d9;
    font-size: 2rem;
    width: 4.5rem;
    min-width: 4.5rem;
  }

  .keyboard-row {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.1rem;
  }

  .keyboard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 8px;
  }

  .backspace,
  .enter {
    font-size: 0.8rem;
  }

  .buttons-container {
    display: flex;
    justify-content: space-between;
    min-height: 30px;
    align-items: baseline;
  }

  .left-button,
  .right-button {
    justify-content: flex-start;
    padding: 5px;
    min-width: 100px;
    background-color: #363636;
    border: 2px solid #d9d9d9;
    text-transform: uppercase;
    border-radius: 7px;
    color: #ffffff;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    user-select: none;
  }

  .right-button {
    justify-content: flex-end;
  }

  .left-button:hover,
  .right-button:hover {
    background-color: #fdfdfd;
    color: #000000;
  }

  @media (max-width: 520px) {
    .keyboard-button {
      font-size: 1rem;
      height: 3.5rem;
      width: 2.5rem;
      margin: 0.2rem;
    }
    .keyboard-button.backspace {
      width: 3.8rem;
      min-width: 3.8rem;
    }

    .keyboard-button.enter {
      width: 3.8rem;
      min-width: 3.8rem;
    }
  }

  @media (max-width: 480px) {
    .keyboard-button {
      font-size: 1rem;
      height: 3.5rem;
      width: 2.2rem;
      margin: 0.2rem;
    }
    .keyboard-button.backspace {
      width: 3.4rem;
      min-width: 3.4rem;
    }

    .keyboard-button.enter {
      width: 3.4rem;
      min-width: 3.4rem;
    }
  }

  @media (max-width: 420px) {
    .keyboard-button {
      font-size: 1rem;
      height: 3rem;
      width: 2rem;
      margin: 0.2rem;
    }

    .keyboard-button.backspace {
      width: 3.2rem;
      min-width: 3.2rem;
    }

    .keyboard-button.enter {
      width: 3.2rem;
      min-width: 3.2rem;
    }
  }

  @media (max-width: 390px) {
    .keyboard-button {
      font-size: 1rem;
      padding: 5px;
      height: 3rem;
      width: 1.8rem;
      margin: 0.2rem;
    }

    .keyboard-button.backspace {
      width: 3rem;
      min-width: 3rem;
    }

    .keyboard-button.enter {
      width: 3rem;
      min-width: 3rem;
    }
  }
`;
