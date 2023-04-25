import React from "react";
import styled from "styled-components";
import gameWonGif from "../assets/johnson-win.gif";
import gameOverGif from "../assets/mark-lose.gif";

const QuoteWrapper = styled.div`
  background-color: #383838;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
  align-items: center;
  width: 95%;
`;

const WinMessageUnstyled = ({
  className,
  gaveUp,
  currentQuote,
  highlightCurrentWord,
  currentWord,
  isGameWon,
  numGuesses,
  gridInput,
}) => {
  const renderGif = (numGuesses, gridInput, isGameWon, gaveUp) => {
    if (gaveUp) {
      return <img src={gameOverGif} alt="Game over" />;
    } else if (numGuesses >= gridInput.length - 1 || isGameWon) {
      return <img src={gameWonGif} alt="Game won" />;
    }
    return null;
  };

  return (
    <div className={className}>
      {!gaveUp && <div className="win-message"></div>}
      {renderGif(numGuesses, gridInput, isGameWon, gaveUp)}
      {currentQuote && (currentQuote.quote || currentQuote.episode) && (
        <QuoteWrapper>
          {currentQuote.quote && (
            <div className="full-quote">
              <span>
                {`"`}
                {highlightCurrentWord(currentQuote.quote, currentWord).map(
                  (part, index) =>
                    part.toLowerCase() === currentWord.toLowerCase() ? (
                      <span key={index} style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{part}</span>
                    ) : (
                      <span key={index}>{part}</span>
                    )
                )}
                {`" - ${currentQuote.person}`}
              </span>
            </div>
          )}
          {currentQuote.episode && (
            <div className="episode"> {currentQuote.episode}</div>
          )}
        </QuoteWrapper>
      )}
    </div>
  );
};

export const WinMessage = styled(WinMessageUnstyled)`
  display: flex;
  flex-direction: column;
  align-items: center;

  .win-message {
    margin: 1px 0;
  }

  .full-quote {
    text-align: center;
  }

  .episode {
    margin: 5px 0;
    text-align: center;
  }

  img {
    max-width: 100%;
    max-height: 200px;
    object-fit: contain;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
