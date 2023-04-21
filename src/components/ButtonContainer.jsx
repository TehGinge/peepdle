import React from "react";
import styled from "styled-components";

const ButtonContainerUnstyled = ({
  className,
  revealAnswer,
  winStreak,
  handleNewGamePress
}) => {
  return (
    <div className={className}>
      <button className="left-button button" tabIndex={-1} onClick={revealAnswer}>
        Give Up?
      </button>
      <div className="win-tally">Win Streak: {winStreak}</div>
      <button className="right-button button" tabIndex={-1} onClick={handleNewGamePress}>
        New Game
      </button>
    </div>
  );
};

export const ButtonContainer = styled(ButtonContainerUnstyled)`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 21px;
  background-color: #3a3a3a;
  border-radius: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .left-button,
  .right-button {
    display: flex;
    justify-content: flex-start;
    max-width: 90%;
    padding: 20px;
    background-color: #363636;
    border: 2px solid #d9d9d9;
    text-transform: uppercase;
    border-radius: 7px;
    color: #ffffff;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  .right-button {
    justify-content: flex-end;
  }

  .left-button:hover,
  .right-button:hover {
    background-color: #fdfdfd;
    color: #000000;
  }

  .win-tally {
    margin: 5px 0;
    color: #ffffff;
  }
`;
