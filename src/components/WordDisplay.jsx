import React from "react";


export const WordDisplay = ({ currentWord, currentGuesses, quote, gaveUp }) => {
  const wordsArray = quote.split(" ");
  const displayQuote = wordsArray.map((word, index) => {
    const strippedWord = word.replace(/[^\w\s']/g, ""); // Keep apostrophes in the word
    const isCurrentWord = strippedWord.toLowerCase().replace(/'/g, "") === currentWord.toLowerCase(); // Compare words without apostrophes

    const displayWord = isCurrentWord
      ? strippedWord
        .split("")
        .map((letter, letterIndex) => !gaveUp && currentGuesses[letterIndex] === letter.toLowerCase()
          ? letter.toUpperCase()
          : letter === "'" ? "'" : "_ " // Keep apostrophes in the word
        )
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
