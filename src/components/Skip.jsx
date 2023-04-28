import React, { useRef, useEffect } from "react";
import styled from "styled-components";

export const Skip = ({ handleSkipPress, skips, skipEnabled, gameStarted, completed, className }) => {
    return (
      <SkipContainer>
        <SkipButton
          className={className}
          tabIndex={-1}
          onClick={handleSkipPress}
          disabled={!gameStarted || completed || (!skipEnabled && skips === 0)}
        >
          {!skipEnabled ? `Skip (${skips})` : "Next Word"}
        </SkipButton>
      </SkipContainer>
    );
  };  
  
  const SkipContainer = styled.div`
    // Add any necessary styles for the container
  `;
  
  const SkipButton = styled.button`
    // Add any necessary styles for the button
  `;
  