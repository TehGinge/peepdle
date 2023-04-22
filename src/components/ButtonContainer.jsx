import React from "react";
import styled from "styled-components";
import "../fonts/fonts.css";

const ButtonContainerUnstyled = ({
  className,
  revealAnswer,
  winStreak,
  handleNewGamePress,
}) => {
  return (
    <div className={className}>
      {/* <img src={logo} alt="Logo" className="logo" /> */}
      <button
        className="left-button button"
        tabIndex={-1}
        onClick={revealAnswer}
      >
        Give Up?
      </button>
      <div className="header-container">
        <header>
          <h1>PEEPDLE</h1>
        </header>
        <div className="win-tally">Win Streak: {winStreak}</div>
      </div>
      <button
        className="right-button button"
        tabIndex={-1}
        onClick={handleNewGamePress}
      >
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
  font-size: 20px;
  background-color: #3a3a3a;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .left-button,
  .right-button {
    display: flex;
    justify-content: flex-start;
    max-width: 50%;
    padding: 15px;
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
    font-size: 16px;
    line-height: 1.2;
  }

  .header-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    padding-top: 5px;
    padding-right: 5px;
    padding-left: 5px;
    font-size: 45px;
    margin: 5px 0;
    font-family: "ITC Bauhaus Heavy";
  }

  @media (max-width: 520px) {
    h1 {
      font-size: 30px;
    }
  }
`;
