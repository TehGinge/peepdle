import React from "react";
import { NewGameButton } from "./NewGameButton";
import { GiveUpButton } from "./GiveUpButton";
import styled from "styled-components";

const ButtonContainerUnstyled = ({ className, revealAnswer, winStreak, startNewGame }) => {
  return (
    <div className={className}>
      <div className="left-button">
        <GiveUpButton onClick={revealAnswer} />
      </div>
      <div className="win-tally">Win streak: {winStreak}</div>
      <div className="right-button">
        <NewGameButton onClick={startNewGame} />
      </div>
    </div>
  );
};

export const ButtonContainer = styled(ButtonContainerUnstyled)`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 15px;

  .left-button {
  display: flex;
  justify-content: flex-start;
  max-width: 90%;
}

.win-tally {
  margin: 5px 0;
}

.right-button {
  display: flex;
  justify-content: flex-end;
  max-width: 90%;
}
`
