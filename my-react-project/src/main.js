import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import { App } from './app';

export const quotes = [
    { quote: "People like fast cars, females with big boobies and they don't want the Euro, that's all there is to it.", character: "Daryl", season: 2, episode: "Jeremy Makes It" },
    { quote: "And our ambition should be to kill clients. I mean actually kill them.", character: "Johnson", season: 2, episode: "Local Zero" },
    { quote: "This children's play centre is your designated snake handover arena?", character: "Mark", season: 9, episode: "Kid Farm" }
];

const maxGuesses = 8;

export const WordDisplay = ({ currentWord, currentGuesses, quote }) => {
  const strippedQuote = quote.replace(/[^\w\s]/g, ''); // Strip out punctuation
  const words = strippedQuote.split(' ');

  const displayQuote = quote.split(' ').map((word, index) => {
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
        {isCurrentWord ? (
          <span className="current-word">{displayWord}</span>
        ) : (
          <span>{word}</span>
        )}
        {index !== quote.split(' ').length - 1 && ' '}
      </span>
    );
  });

  return <div id="word-display">{displayQuote}</div>;
};


export const GuessesDisplay = ({ numGuesses }) => {
  return <div id="guesses">{maxGuesses - numGuesses} guesses remaining</div>;
};

export const NewGameButton = ({ onClick }) => {
  return <button onClick={onClick}>New Game</button>;
};

// Only for debug use - remove later
export const CurrentWordDisplay = ({ currentWord }) => {
    return <div id="current-word-display">Current Word: {currentWord}</div>;
  };

ReactDOM.render(<App />, document.getElementById("root"));
