import React, { useState } from "react";
import { Keyboard } from "./keyboard";
import { useEffect } from "react";
import {
  CurrentWordDisplay,
  WordDisplay,
  GuessesDisplay,
  NewGameButton,
  GiveUpButton,
} from "./main";
import quotes from "./peepdle-data.json";
import excludedWords from "./excludedWords";
import GridInput from "./gridInput";

export const App = ({ maxGuesses }) => {
  const [currentWord, setCurrentWord] = useState("");
  const [currentGuesses, setCurrentGuesses] = useState([]);
  const [numGuesses, setNumGuesses] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [dailyWinStreak, setDailyWinStreak] = useState(0);
  const [currentQuote, setCurrentQuote] = useState({});
  const [failed, setFailed] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);
  const [gridInput, setGridInput] = useState(
    Array.from({ length: maxGuesses }, () => Array(currentWord.length).fill(""))
  );

  useEffect(() => {
    setGridInput(
      Array.from({ length: maxGuesses }, () =>
        Array(currentWord.length).fill("")
      )
    );
  }, [currentWord]);

  useEffect(() => {
    const cookieValue = document.cookie.replace(
      /(?:(?:^|.*;\s*)dailyWinStreak\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    setDailyWinStreak(parseInt(cookieValue) || 0);
  }, []);

  useEffect(() => {
    document.cookie = `dailyWinStreak=${dailyWinStreak}`;
  }, [dailyWinStreak]);

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

    const excludedWordSet = new Set(
      excludedWords.map((word) => word.toLowerCase())
    );
    const filteredWords = words.filter(
      (word) => !excludedWordSet.has(word.toLowerCase())
    );

    const selectedWord =
      filteredWords[Math.floor(Math.random() * filteredWords.length)];
    setCurrentWord(selectedWord.toLowerCase());
    setCurrentGuesses([]);
    setCurrentQuote(randomQuote);
    setNumGuesses(0);
    setFailed(false);
    setCompleted(false);
    setGameStarted(true);
  };

  const makeGuess = (guess, rowIndex) => {
    if (
      guess.length === currentWord.length &&
      /^[a-zA-Z]+$/.test(guess) &&
      rowIndex === numGuesses
    ) {
      const lowercaseGuess = guess.toLowerCase();

      setCurrentGuesses([...currentGuesses, lowercaseGuess]);

      const buttons = document.querySelectorAll(".keyboard-button");
      buttons.forEach((button) => {
        if (currentGuesses.includes(button.innerText.toLowerCase())) {
          button.disabled = true;
        }
      });

      if (guess.toLowerCase() === currentWord) {
        setCompleted(true);
        setDailyWinStreak(dailyWinStreak + 1);
      } else {
        setNumGuesses(numGuesses + 1);

        if (numGuesses + 1 >= maxGuesses) {
          resetStreak();
        }
      }
    }
  };

  const handleKeyboardClick = (letter) => {
    makeGuess(letter);
  };

  const revealAnswer = () => {
    setCompleted(true);
    setGaveUp(true);
    setCurrentGuesses(currentWord.split(""));
    resetStreak();
  };

  const resetStreak = () => {
    setDailyWinStreak(0);
  };

  const guessedWord = currentWord
    .split("")
    .filter((letter) => currentGuesses.includes(currentWord));

  return (
    <div className="app">
      <div className="centered-container">
        {currentQuote && currentQuote.quote && (
          <div className="word-container">
            <WordDisplay
              currentWord={currentWord}
              currentGuesses={currentGuesses}
              quote={currentQuote.quote}
              gaveUp={gaveUp}
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
            isGameWon={completed}
          />
        </div>
        <div className="keyboard-container">
          <Keyboard
            onClick={handleKeyboardClick}
            guessedLetters={currentGuesses}
          />
        </div>
        <div className="win-tally">Daily win streak: {dailyWinStreak}</div>
        {gameStarted && completed && (
          <div className="win-message-container">
            {!gaveUp && (
              <div className="win-message">You won today's peepdle!</div>
            )}
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
        <div className="give-up-container">
          <GiveUpButton onClick={revealAnswer} />
        </div>
      </div>
    </div>
  );
};
