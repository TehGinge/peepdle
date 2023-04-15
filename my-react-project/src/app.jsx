import React, { useState } from "react";
import { Keyboard } from "./keyboard";
import { useEffect } from "react";
import {
  CurrentWordDisplay,
  WordDisplay,
  GuessesDisplay,
  NewGameButton,
} from "./main";
import quotes from "./peepdle-data.json";
import excludedWords from "./excludedWords";
import GridInput from "./gridInput";

export const App = ({ maxGuesses }) => {
  const [currentWord, setCurrentWord] = useState("");
  const [currentGuesses, setCurrentGuesses] = useState([]);
  const [numGuesses, setNumGuesses] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [dailyWins, setDailyWins] = useState(0);
  const [currentQuote, setCurrentQuote] = useState({});
  const [failed, setFailed] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gridInput, setGridInput] = useState(
	Array.from({ length: maxGuesses }, () => Array(currentWord.length).fill(""))
  );
  
  useEffect(() => {
	setGridInput(
	  Array.from({ length: maxGuesses }, () => Array(currentWord.length).fill(""))
	);
  }, [currentWord]);  

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

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    // Log invalid quotes
    quotes.results.forEach((quoteObj, index) => {
      if (!quoteObj.quote) {
        console.log(`Invalid quote at index ${index}:`, quoteObj);
      }
    });

    const validQuotes = quotes.results.filter((quoteObj) => quoteObj.quote);

    const randomQuote =
    validQuotes[Math.floor(Math.random() * validQuotes.length)];
  const words = randomQuote.quote
    .replace(/[^\w\s]/gi, "") // Remove punctuation
    .split(" ")
    .filter((word) => word.length >= 4); // Set minimum word length
  
  const excludedWordSet = new Set(excludedWords);
  const filteredWords = words.filter((word) => !excludedWordSet.has(word.toLowerCase()));
  
  const selectedWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
  setCurrentWord(selectedWord.toLowerCase());
  setCurrentGuesses([]);
  setCurrentQuote(randomQuote);
  setNumGuesses(0);
  setFailed(false);
  setCompleted(false);
  setGameStarted(true);
  };

  const makeGuess = (guess, rowIndex) => {
    if (guess.length === currentWord.length && /^[a-zA-Z]+$/.test(guess) && rowIndex === numGuesses) {
      const lowercaseGuess = guess.toLowerCase().split("");
      const newGuesses = [...currentGuesses, ...lowercaseGuess];
      setCurrentGuesses(newGuesses);
  
      const buttons = document.querySelectorAll(".keyboard-button");
      buttons.forEach((button) => {
        if (newGuesses.includes(button.innerText.toLowerCase())) {
          button.disabled = true;
        }
      });
  
      const guessedWord = currentWord
        .split("")
        .filter((letter) => newGuesses.includes(letter));
      if (guessedWord.length === currentWord.length) {
        setCompleted(true);
        setDailyWins(dailyWins + 1);
      } else {
        setNumGuesses(numGuesses + 1);
      }
    }
  };

  const handleKeyboardClick = (letter) => {
    makeGuess(letter);
  };

  const guessedWord = currentWord
    .split("")
    .filter((letter) => currentGuesses.includes(letter));

  if (guessedWord.length === currentWord.length && !completed) {
    setCompleted(true);
    setDailyWins(dailyWins + 1);
  }

  return (
    <div className="app">
      <div className="centered-container">
        {currentQuote && currentQuote.quote && (
          <div className="word-container">
            <WordDisplay
              currentWord={currentWord}
              currentGuesses={currentGuesses}
              quote={currentQuote.quote}
            />
          </div>
        )}
        <div className="guess-container">
          <GuessesDisplay numGuesses={numGuesses} />
          <GridInput
            gridInput={gridInput}
            setGridInput={setGridInput}
            maxGuesses={maxGuesses}
            makeGuess={makeGuess}
			currentWord={currentWord}
      numGuesses={numGuesses}
          />
        </div>
        <div className="keyboard-container">
          <Keyboard
            onClick={handleKeyboardClick}
            guessedLetters={currentGuesses}
          />
        </div>
        <div className="win-tally">Daily wins: {dailyWins}</div>
        {gameStarted && completed && (
          <div className="win-message-container">
            <div className="win-message">You won today's peepdle!</div>
            {currentQuote && currentQuote.quote && (
              <div className="full-quote">
                {`"${currentQuote.quote}" - ${currentQuote.person}`}
              </div>
            )}
            {currentQuote && currentQuote.episode && (
              <div className="episode">Episode: {currentQuote.episode}</div>
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
