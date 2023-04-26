import React from "react";
import { WordDisplay } from "./WordDisplay";
import styled from "styled-components";
import { HintText } from "./HintText";

const QuoteUnstyled = ({
  className,
  currentWord,
  currentGuesses,
  currentQuote,
  gaveUp,
  hintIndex,
}) => {
  return (
    <div className={className}>
      <div className="quote-container">
        <WordDisplay
          currentWord={currentWord}
          currentGuesses={currentGuesses}
          quote={currentQuote.quote}
          gaveUp={gaveUp}
        />
		<HintText hintIndex={hintIndex} currentQuote={currentQuote} />
      </div>
    </div>
  );
};

export const Quote = styled(QuoteUnstyled)`
  margin-bottom: 10px;
  text-align: center;
  max-height: 200vh;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .quote-container {
    max-height: 270px;
    overflow: auto;
    margin-bottom: 5px;
  }
`;
