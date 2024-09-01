import React from "react";
import styled from "styled-components";

export const WordDisplayUnstyled = ({ className, currentWord, currentGuesses, quote, gaveUp }) => {
  // Helper function to determine the type of text
  const getWordType = (word, context) => {
    if (context.internalMonologue || (word.startsWith("(") && word.endsWith(")"))) {
      return "internal-monologue";
    } else if (word.startsWith("[") && word.endsWith("]")) {
      return "stage-directions";
    } else {
      return "spoken-quote";
    }
  };

  const wordsArray = quote.split(" ");
  let context = { internalMonologue: false }; // Initial context
  const quoteType = getWordType(quote, context); // Determine the type of the entire quote

  const displayQuote = (
    <span style={{ color: quoteType === "internal-monologue" ? "red" : quoteType === "stage-directions" ? "blue" : "white" }}>
      {wordsArray.map((word, index) => {
        const wordType = getWordType(word, context);
        const strippedWord = word.replace(/[^\w\s']/g, ""); // Keep apostrophes in the word
        const isCurrentWord = strippedWord.toLowerCase().replace(/'/g, "") === currentWord.toLowerCase(); // Compare words without apostrophes

        // Update context based on the current word
        if (wordType === "internal-monologue" && word.endsWith(")")) {
          context.internalMonologue = false;
        } else if (wordType === "internal-monologue" && !word.startsWith("(")) {
          context.internalMonologue = true;
        }

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
              <span>{displayWord}</span>
            )}
            {index !== wordsArray.length - 1 && " "}
          </span>
        );
      })}
    </span>
  );

  return <div id="word-display" className={className}>{displayQuote}</div>;
};

export const WordDisplay = styled(WordDisplayUnstyled)`
  font-size: 1.3rem;
  margin: 1rem 0;
  text-align: center;

  .current-word {
    font-weight: bold;
    white-space: nowrap;
  }
`;
