import React from "react";
import styled from "styled-components";


export const WordDisplayUnstyled = ({ className, currentWord, currentGuesses, quote, gaveUp }) => {
  const wordsArray = quote.split(" ");
  const displayQuote = wordsArray.map((word, index) => {
    const strippedWord = word.replace(/[^\w\s']/g, ""); // Keep apostrophes in the word
    const isCurrentWord = strippedWord.toLowerCase().replace(/'/g, "") === currentWord.toLowerCase(); // Compare words without apostrophes

    const displayWord = isCurrentWord
      ? word
          .split("")
          .map((letter, letterIndex) => {
            if (!gaveUp && /^[a-zA-Z]$/.test(letter) && currentGuesses[letterIndex] === letter.toLowerCase()) {
              return letter.toUpperCase();
            } else if (letter === "'" || /[^\w\s]/.test(letter)) {
              return letter;
            } else {
              return "_ ";
            }
          })
          .join("")
      : word;

      return (
        <span key={index}>
          {isCurrentWord ? (
            <span className="current-word">{displayWord}</span>
          ) : (
            <span>{word}</span>
          )}
          {index !== quote.split(" ").length - 1 && " "}
        </span>
      );
    });
  
    return <div id="word-display" className={className}>{displayQuote}</div>;
  };
  
  export const WordDisplay = styled(WordDisplayUnstyled)`
  font-size: 1.3rem;
  color: #ffffff;
  margin: 1rem 0;
  text-align: center;

  .current-word {
    font-weight: bold;
    white-space: nowrap;
  }
`;