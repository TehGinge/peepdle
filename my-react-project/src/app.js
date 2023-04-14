import React, { useState } from 'react';
import { Keyboard } from './keyboard';
import { useEffect } from 'react';
import { quotes, CurrentWordDisplay, WordDisplay, GuessesDisplay, NewGameButton } from './main';

export const App = ({ quote }) => {
  const [currentWord, setCurrentWord] = useState("");
  const [currentGuesses, setCurrentGuesses] = useState([]);
  const [numGuesses, setNumGuesses] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [dailyWins, setDailyWins] = useState(0);
  const [currentQuote, setCurrentQuote] = useState({});
  const [failed, setFailed] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const cookieValue = document.cookie.replace(
      /(?:(?:^|.*;\s*)dailyWins\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    setDailyWins(parseInt(cookieValue) || 0);
  }, []);

  useEffect(() => {
    document.cookie = `dailyWins=${dailyWins}`;
  }, [dailyWins]);

  const startNewGame = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const words = randomQuote.quote
      .replace(/[^\w\s]/gi, "") // Remove punctuation
      .split(" ")
      .filter((word) => word.length >= 4);
    const selectedWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(selectedWord.toLowerCase());
    setCurrentGuesses([]);
    setCurrentQuote(randomQuote);
    setNumGuesses(0);
    setFailed(false);
    setCompleted(false);
    setGameStarted(true);
  };

  const makeGuess = (guess) => {
    if (guess.length === 1 && /^[a-zA-Z]$/.test(guess)) {
      const lowercaseGuess = guess.toLowerCase();
      if (!currentGuesses.includes(lowercaseGuess)) {
        setCurrentGuesses([...currentGuesses, lowercaseGuess]);
        if (!currentWord.includes(lowercaseGuess)) {
          setNumGuesses(numGuesses + 1);
        }
      }
      const buttons = document.querySelectorAll(".keyboard-button");
      buttons.forEach((button) => {
        if (button.innerText === lowercaseGuess) {
          button.disabled = true;
        }
      });
      const guessedWord = currentWord.split("").filter((letter) => currentGuesses.includes(letter)
      );
      if (guessedWord.length === currentWord.length) {
        setCompleted(true);
        setDailyWins(dailyWins + 1);
      }
    }
  };

  const handleKeyboardClick = (letter) => {
    makeGuess(letter);
  };

  const guessedWord = currentWord.split("").filter((letter) => currentGuesses.includes(letter)
  );

  if (guessedWord.length === currentWord.length && !completed) {
    setCompleted(true);
    setDailyWins(dailyWins + 1);
  }

  return (
    <div className="app">
      <div className="centered-container">
      {currentQuote && currentQuote.quote && (
  <div className="word-container">
    <WordDisplay currentWord={currentWord} currentGuesses={currentGuesses} quote={currentQuote.quote} />
  </div>
)}
        <div className="guess-container">
          <GuessesDisplay numGuesses={numGuesses} />
          <input
            type="text"
            maxLength={1}
            onKeyUp={(e) => makeGuess(e.target.value)}
            className="hidden-input" />
        </div>
        <div className="keyboard-container">
          <Keyboard onClick={handleKeyboardClick} guessedLetters={currentGuesses} />
        </div>
        <div className="win-tally">Daily wins: {dailyWins}</div>
        {gameStarted && completed && (
          <div className="win-message-container">
            <div className="win-message">You won today's peepdle!</div>
            {currentQuote && currentQuote.quote && (
              <div className="full-quote">
              </div>
            )}
          </div>
        )}
        <div className="new-game-container">
          <NewGameButton onClick={startNewGame} />
        </div>
      </div>
    </div>
  );

};
