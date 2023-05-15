import React from "react";
import styled from "styled-components";

const HintContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 20px;
  padding-top: 5px;
`;

const HintButton = styled.button`
  display: flex;
  justify-content: flex-start;
  max-width: 100%;
  padding: 5px;
  background-color: #54b165;
  border: 2px solid #d9d9d9;
  text-transform: uppercase;
  border-radius: 7px;
  color: #ffffff;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  user-select: none;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #4caf50;
    color: #ffffff;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const Hint = ({ useHint, hintsLeft, gameStarted, completed, hintIndex }) => {
  return (
    <HintContainer>
      <HintButton
        tabIndex={-1}
        onClick={useHint}
        disabled={hintsLeft === 0 || !gameStarted || completed || hintIndex >= 2}
      >
        Use Hint ({hintsLeft})
      </HintButton>
    </HintContainer>
  );
};
