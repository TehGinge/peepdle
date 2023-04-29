import React from "react";
import styled from "styled-components";

export const Skip = ({ handleSkipPress, skips, skipEnabled, gameStarted, completed, className, handleNewGamePress }) => {
    const buttonText = completed ? "Next Word" : !skipEnabled ? `Skip (${skips})` : "Next Word";
    const handleClick = completed ? handleNewGamePress : handleSkipPress;
    
    return (
        <SkipContainer>
          <SkipButton
            className={className}
            tabIndex={-1}
            onClick={handleClick}
            disabled={!gameStarted || (!skipEnabled && skips === 0 && !completed)}
          >
            {buttonText}
          </SkipButton>
        </SkipContainer>
      );
    }; 
  
  const SkipContainer = styled.div`
  `;
  
  const SkipButton = styled.button`
  `;
  