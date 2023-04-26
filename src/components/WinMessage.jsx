import React from "react";
import styled from "styled-components";
import gameWonGif from "../assets/johnson-win.gif";
import gameOverGif from "../assets/mark-lose.gif";

const QuoteWrapper = styled.div`
  background-color: #383838;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
  text-align: center;
`;

const WinMessageUnstyled = ({
  className,
  gaveUp,
  currentQuote,
  highlightCurrentWord,
  currentWord,
  numGuesses,
  gridInput,
  handleNewGamePress,
}) => {
  const renderGif = (numGuesses, gridInput, gaveUp) => {
    if (gaveUp) {
      return <img src={gameOverGif} alt="Game over" />;
    } else numGuesses >= gridInput.length - 1;
    return <img src={gameWonGif} alt="Game won" />;
  };

  return (
    <div className={className}>
      {!gaveUp && <div className="win-message"></div>}
      {renderGif(numGuesses, gridInput, gaveUp)}
      {currentQuote && (currentQuote.quote || currentQuote.episode) && (
        <QuoteWrapper>
          {currentQuote.quote && (
            <div className="full-quote">
              <span>
                {`"`}
                {highlightCurrentWord(currentQuote.quote, currentWord).map(
                  (part, index) =>
                    part.toLowerCase() === currentWord.toLowerCase() ? (
                      <span
                        key={index}
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        {part}
                      </span>
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
          <button
            className="next-word"
            tabIndex={-1}
            onClick={handleNewGamePress}
          >
            Next Word
          </button>
        </QuoteWrapper>
      )}
    </div>
  );
};

export const WinMessage = styled(WinMessageUnstyled)`
  display: flex;
  flex-direction: column;

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

  .next-word {
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

  @media (max-width: 480px) {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
