import React from "react";
import styled from "styled-components";
import gameWonGif from "../assets/johnson-win.gif";
import gameOverGif from "../assets/mark-lose.gif";

const QuoteWrapper = styled.div`
  background-color: #383838;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  padding: 10px;
  margin-top: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
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
  winStreak,
  achievedStreak,
  isGameWon,
  personalBest,
  hintsLeft,
  skips
}) => {
  const wasSkipAdded = isGameWon && !gaveUp && winStreak % 5 === 0 && skips < 5;
  const wasHintAdded = isGameWon && !gaveUp && winStreak % 2 === 0 && hintsLeft < 10;

  const renderGif = (numGuesses, gridInput, gaveUp) => {
    if (gaveUp) {
      return <img src={gameOverGif} alt="Game over" />;
    } else numGuesses >= gridInput.length - 1;
    return <img src={gameWonGif} alt="Game won" />;
  };

  return (
    <div className={className}>
      <div className="personal-best">
        <span className="number-label">Personal Best:</span>
        <span className="number-value">{personalBest}</span>
      </div>
      <div></div>
      {!gaveUp && <div className="win-message"></div>}
      {renderGif(numGuesses, gridInput, gaveUp)}
      {currentQuote && (currentQuote.quote || currentQuote.episode) && (
        <QuoteWrapper isGameWon={isGameWon} gaveUp={gaveUp}>
          {currentQuote.quote && (
            <div className="full-quote">
              <span>
                {`"`}
                {highlightCurrentWord(currentQuote.quote, currentWord).map(
                  (part, index) =>
                    part.isHighlighted ? (
                      <span
                        key={index}
                        style={{
                          fontWeight: "bold",
                          color: isGameWon
                            ? "lawngreen"
                            : gaveUp
                            ? "red"
                            : "inherit",
                          display: "inline-flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "0 1px",
                          borderRadius: "3px",
                          margin: "0 1px",
                        }}
                      >
                        {part.text}
                      </span>
                    ) : (
                      <span key={index}>{part.text}</span>
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
      <div className="win-tally">
        <div className="win-tally-label">Win Streak</div>
        <div className="win-tally-counter">
          {gaveUp ? achievedStreak : winStreak}
        </div>
        {wasSkipAdded && (
          <p>
            <span>+1</span> Skip
          </p>
        )}
        {wasHintAdded && (
          <p>
            <span>+1</span> Hint
          </p>
        )}
        <button
          className="next-word"
          tabIndex={-1}
          onClick={handleNewGamePress}
        >
          Next Word
        </button>
      </div>
    </div>
  );
};

export const WinMessage = styled(WinMessageUnstyled)`
  display: flex;
  flex-direction: column;
  text-align: center;

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

  .personal-best {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    font-size: 14px;
    color: #ffffff;
  }

  .number-label {
    font-weight: bold;
    margin-right: 5px;
  }

  .number-value {
    font-weight: bold;
    color: lawngreen;
  }

  img {
    max-width: 100%;
    object-fit: contain;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
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

  .win-tally {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(49, 48, 48);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .win-tally span {
    color: lawngreen;
    font-size: 16px;
    font-weight: bold;
  }

  .win-tally p {
    margin: 4px 0;
    font-size: 16px;
    font-weight: bold;
  }

  .win-tally-label {
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
  }

  .win-tally-counter {
    color: lawngreen;
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 5px;
  }

`;
