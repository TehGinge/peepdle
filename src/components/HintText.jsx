import React from "react";
import styled from "styled-components";

const HintTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
  width: 100%;
`;

export const HintText = ({ hintIndex, currentQuote }) => {
  return (
    <HintTextContainer>
      {hintIndex >= 1 && currentQuote && currentQuote.episode && (
        <div>Hint 1 - Episode: {currentQuote.episode}</div>
      )}
      {hintIndex === 2 && currentQuote && currentQuote.person && (
        <div>Hint 2 - Character: {currentQuote.person}</div>
      )}
    </HintTextContainer>
  );
};
