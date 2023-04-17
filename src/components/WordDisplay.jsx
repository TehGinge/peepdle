import React from "react";


export const WordDisplay = ({ currentWord, currentGuesses, quote, gaveUp }) => {
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

  return <div id="word-display">{displayQuote}</div>;
};