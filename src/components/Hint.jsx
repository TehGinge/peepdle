import React from "react";
import styled from "styled-components";

const HintContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 20px;
	padding-top: 5px;
`;

const HintButton = styled.button`
	display: flex;
	justify-content: flex-start;
	max-width: 100%;
	padding: 5px;
	background-color: #459247;
	border: 2px solid #d9d9d9;
	text-transform: uppercase;
	border-radius: 7px;
	color: #ffffff;
	font-weight: 600;
	text-align: center;
	cursor: pointer;
	transition: background-color 0.2s ease-in-out;

	&:hover {
		background-color: #4caf50;
		color: #ffffff;
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
`;

const HintText = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 5px;
`;

export const Hint = ({ hintIndex, currentQuote, useHint, hintsLeft, gameStarted, completed }) => {
	return (
		<HintContainer>
			<HintButton tabIndex={-1} onClick={useHint} disabled={hintsLeft === 0 || !gameStarted || completed}>
				Use Hint ({hintsLeft})
			</HintButton>
			<HintText>
				{hintIndex >= 1 && currentQuote && currentQuote.episode && <div>Hint 1 - Episode: {currentQuote.episode}</div>}
				{hintIndex === 2 && currentQuote && currentQuote.person && <div>Hint 2 - Character: {currentQuote.person}</div>}
			</HintText>
		</HintContainer>
	);
};
