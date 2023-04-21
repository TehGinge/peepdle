import React from "react";
import styled from "styled-components";

const KeyboardButton = ({ letter, onClick, disabled, customClass }) => {
	return (
		<button className={`keyboard-button ${customClass ? customClass : ""}`} tabIndex={-1} onClick={onClick} disabled={disabled}>
			{letter}
		</button>
	);
};

const KeyboardRow = ({ letters, onClick, guessedLetters }) => {
	return (
		<div className="keyboard-row">
			{letters.map((item) => {
				if (typeof item === "string") {
					const letter = item;
					const isGuessed = guessedLetters.includes(letter);
					return <KeyboardButton key={letter} letter={letter.toUpperCase()} onClick={() => onClick(letter)} disabled={isGuessed} />;
				} else {
					// Render custom button
					const { letter, onClick, customClass } = item;
					return <KeyboardButton key={letter} letter={letter} onClick={onClick} disabled={false} customClass={customClass} />;
				}
			})}
		</div>
	);
};

const KeyboardUnstyled = ({ className, onClick, guessedLetters, handleBackspaceClick, handleEnterClick }) => {
	const letters = "qwertyuiopasdfghjklzxcvbnm".split("");
	const rows = [
		letters.slice(0, 10),
		letters.slice(10, 19),
		[{ letter: "⌫", onClick: handleBackspaceClick, customClass: "backspace" }, ...letters.slice(19, 26), { letter: "↵", onClick: handleEnterClick, customClass: "enter" }],
	];
	return (
		<div className={className}>
			<div className="keyboard">
				{rows.map((row, index) => (
					<KeyboardRow key={index} letters={row} onClick={onClick} guessedLetters={guessedLetters} />
				))}
			</div>
		</div>
	);
};

export const Keyboard = styled(KeyboardUnstyled)`
	.keyboard-button {
		font-size: 1.25rem;
		width: 3rem;
		height: 4rem;
		background-color: #2b2b2b;
		border: 2px solid #d9d9d9;
		color: #ffffff;
		cursor: pointer;
		margin: 0.1rem;
		border-radius: 0.25rem;
		transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
	}

	.keyboard-button:hover {
		background-color: #ffffff;
		color: #000000;
	}

	.keyboard-button:active {
		background-color: #ccc;
	}

	.correct-position.keyboard-button {
		background-color: green;
		color: white;
	}

	.in-word.keyboard-button {
		background-color: darkorange;
		color: white;
	}

	.not-in-word.keyboard-button {
		background-color: dimgray;
		color: white;
	}

	.keyboard-button.backspace {
		background-color: #2b2b2b;
		color: #fff9f9;
		border: 2px solid #d9d9d9;
		font-size: 1.5rem;
		width: 4.5rem;
		min-width: 4.5rem;
	}

	.keyboard-button.enter {
		background-color: #2b2b2b;
		color: #fff9f9;
		border: 2px solid #d9d9d9;
		font-size: 2rem;
		width: 4.5rem;
		min-width: 4.5rem;
	}

	.keyboard-row {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 0.1rem;
	}

	.keyboard {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-bottom: 8px;
	}

	.backspace,
	.enter {
		font-size: 0.8rem;
	}

	@media (max-width: 480px) {
		.keyboard-button {
			font-size: 1rem;
			height: 3rem;
			width: 2rem;
			margin: 0.15rem;
		}
		.keyboard-button.backspace {
			width: 3rem;
			min-width: 3rem;
		}

		.keyboard-button.enter {
			width: 3rem;
			min-width: 3rem;
		}
	}
`;
