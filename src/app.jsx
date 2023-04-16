import React, { useState } from "react";
import { Keyboard } from "./keyboard";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
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
import "./app.css";

export const App = ({ maxGuesses }) => {
  const [currentWord, setCurrentWord] = useState("");
  const [currentGuesses, setCurrentGuesses] = useState([]);
  const [numGuesses, setNumGuesses] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [winStreak, setWinStreak] = useState(0);
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
      /(?:(?:^|.*;\s*)winStreak\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    setWinStreak(parseInt(cookieValue) || 0);
  }, []);

  useEffect(() => {
    document.cookie = `winStreak=${winStreak}`;
  }, [winStreak]);

  useEffect(() => {
    startNewGame();
  }, []);

  useLayoutEffect(() => {
    if (gameStarted && inputRefs[0][0].current) {
      inputRefs[0][0].current.focus();
    }
  }, [gameStarted, inputRefs]);

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
      (word) => !excludedWordSet.has(word.toLowerCase()) && word.length <= 7 // Set maximum word length
    );    

    if (filteredWords.length === 0) {
      startNewGame();
      return;
    }

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
        setWinStreak(winStreak + 1);
        return true; // Return true when the guess is correct
      } else {
        setNumGuesses(numGuesses + 1);

        if (numGuesses + 1 >= maxGuesses) {
          resetStreak();
        }
      }
    }

    return false; // Return false when the guess is not correct or the function conditions are not met
  };

  const inputRefs = Array.from({ length: maxGuesses }, () =>
    Array.from({ length: currentWord.length }, () => React.createRef())
  );

  const handleKeyboardClick = (letter, disable = true) => {
    makeGuess(letter, numGuesses);
    if (numGuesses < gridInput.length - 1) {
      inputRefs[numGuesses + 1][0].current.focus();
    }
  
    if (disable) {
      const buttons = document.querySelectorAll(".keyboard-button");
      buttons.forEach((button) => {
        if (currentGuesses.includes(button.innerText.toLowerCase())) {
          button.disabled = true;
        }
      });
    }
  };

  const revealAnswer = () => {
    setCompleted(true);
    setGaveUp(true);
    setCurrentGuesses(currentWord.split(""));
    resetStreak();
  };

  const resetStreak = () => {
    setWinStreak(0);
  };

  const guessedWord = currentWord
    .split("")
    .filter((letter) => currentGuesses.includes(currentWord));

  return (
    <div className="app">
      <div className="centered-container">
        {currentQuote && currentQuote.quote && (
          <div className="word-container">
            <div className="quote-container">
              <WordDisplay
                currentWord={currentWord}
                currentGuesses={currentGuesses}
                quote={currentQuote.quote}
                gaveUp={gaveUp}
              />
            </div>
          </div>
        )}
        <div className="guess-container">
          <GridInput
            gridInput={gridInput}
            setGridInput={setGridInput}
            maxGuesses={maxGuesses}
            makeGuess={makeGuess}
            currentWord={currentWord}
            numGuesses={numGuesses}
            isGameWon={completed}
            inputRefs={inputRefs}
            handleKeyboardClick={handleKeyboardClick}
            currentGuesses={currentGuesses}
          />
          <GuessesDisplay numGuesses={numGuesses} />
        </div>
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
              <div className="episode"> {currentQuote.episode}</div>
            )}
          </div>
        )}
      </div>
      <div className="keyboard-container">
        <Keyboard
          onClick={handleKeyboardClick}
          guessedLetters={currentGuesses}
          currentWord={currentWord}
        />
      </div>
      <div className="button-container">
        <div className="left-button">
          <GiveUpButton onClick={revealAnswer} />
        </div>
        <div className="win-tally">Win streak: {winStreak}</div>
        <div className="right-button">
          <NewGameButton onClick={startNewGame} />
        </div>
      </div>
    </div>
  );
};
