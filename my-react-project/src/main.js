import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./app.css";
import { App } from "./app";
import quotes from './peepdle-data.json';

const maxGuesses = 5;

export const WordDisplay = ({ currentWord, currentGuesses, quote }) => {
  const wordsArray = quote.split(' ');
  const displayQuote = wordsArray.map((word, index) => {
    const strippedWord = word.replace(/[^\w\s]/g, ''); // Strip out punctuation
    const isCurrentWord = strippedWord.toLowerCase() === currentWord.toLowerCase();
    const displayWord = strippedWord
      .split('')
      .map((letter) =>
        currentGuesses.includes(letter.toLowerCase()) ? letter.toUpperCase() : '_'
      )
      .join('');

		return (
			<span key={index}>
				{isCurrentWord ? <span className="current-word">{displayWord}</span> : <span>{word}</span>}
				{index !== quote.split(" ").length - 1 && " "}
			</span>
		);
	});

	return <div id="word-display">{displayQuote}</div>;
};

export const GuessesDisplay = ({ numGuesses }) => {
	const guessesRemaining = maxGuesses - numGuesses;

	if (guessesRemaining <= 0) {
		return <div id="guesses">Sorry, you have no guesses left!</div>;
	}

	return <div id="guesses">{guessesRemaining} guesses remaining</div>;
};

export const NewGameButton = ({ onClick }) => {
	return <button onClick={onClick}>New Game</button>;
};

// Only for debug use - remove later
export const CurrentWordDisplay = ({ currentWord }) => {
	return <div id="current-word-display">Current Word: {currentWord}</div>;
};

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(<App />);
