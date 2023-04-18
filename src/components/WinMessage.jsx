import React from "react";
import styled from "styled-components";
import gameWonGif from '../johnson-win.gif';
import gameOverGif from '../mark-lose.gif';

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
      {!gaveUp && (
        <div className="win-message"></div>
      )}
      {renderGif(numGuesses, gridInput, isGameWon, gaveUp)}
      {currentQuote && currentQuote.quote && (
        <div className="full-quote">
          <span>
            {`"`}
            {highlightCurrentWord(currentQuote.quote, currentWord).map(
              (part, index) =>
                part.toLowerCase() === currentWord.toLowerCase() ? (
                  <strong key={index}>{part}</strong>
                ) : (
                  <span key={index}>{part}</span>
                )
            )}
            {`" - ${currentQuote.person}`}
          </span>
        </div>
      )}
      {currentQuote && currentQuote.episode && (
        <div className="episode"> {currentQuote.episode}</div>
      )}
    </div>
  );
};

export const WinMessage = styled(WinMessageUnstyled)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 50px;

  .win-message {
    margin: 1px 0;
  }

  .full-quote {
    margin-top: 10px;
    text-align: center;
  }

  .episode {
    margin: 5px 0;
  }
  
  img {
    max-width: 100%;
    max-height: 200px;
    object-fit: contain;
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
