import React, { useState, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Keyboard } from "./components/Keyboard";
import { CurrentWordDisplay } from "./main";
import quotes from "./peepdle-data-v3.json";
import excludedWords from "./excludedWords";
import styled from "styled-components";
import { HeaderContainer } from "./components/HeaderContainer";
import { Quote } from "./components/Quote";
import { WinMessage } from "./components/WinMessage";
import { Guesses } from "./components/Guesses";
import { Modal } from "./components/Modal";
import { Sidebar } from "./components/Sidebar";
import Explosion from "react-confetti-explosion";

const AppUnstyled = ({ className, maxGuesses }) => {
  const [currentWord, setCurrentWord] = useState("");
  const [currentGuesses, setCurrentGuesses] = useState([]);
  const [numGuesses, setNumGuesses] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [winStreak, setWinStreak] = useState(0);
  const [achievedStreak, setAchievedStreak] = useState(0);
  const [personalBest, setPersonalBest] = useState(0);
  const [currentQuote, setCurrentQuote] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(2);
  const [hintIndex, setHintIndex] = useState(0);
  const [minWordLength] = useState(4); // Set minimum word length
  const [maxWordLength, setMaxWordLength] = useState(8); // Set maximum word length
  const [gaveUp, setGaveUp] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [skips, setSkips] = useState(3);
  const [skipEnabled, setSkipEnabled] = useState(false);
  const [explode, setExplode] = useState(false);
  const [gridInput, setGridInput] = useState(
    Array.from({ length: maxGuesses }, () => Array(currentWord.length).fill(""))
  );
  

  useEffect(() => {
    if (isGameWon) {
      if (winStreak % 5 === 0) {
        // Check if the winStreak is a multiple of 5, so it grants a skip on every five wins
        setSkips((prevSkips) => (prevSkips < 5 ? prevSkips + 1 : prevSkips)); // Ensure skips don't exceed 5
      }
    }
  }, [isGameWon, winStreak]);

  useEffect(() => {
    if (isGameWon) {
      setExplode(true);
      // Reset the explosion state after it has been triggered
      setTimeout(() => setExplode(false), 3000);
    }
  }, [isGameWon]);

  const handleSkipPress = () => {
    if (!skipEnabled && skips > 0) {
      setSkips(skips - 1);
      handleNewGamePress();
    } else if (skipEnabled) {
      handleNewGamePress();
    }
  };

  useEffect(() => {
    setGridInput(
      Array.from({ length: maxGuesses }, () =>
        Array(currentWord.length).fill("")
      )
    );
  }, [currentWord]);

  useEffect(() => {
    const personalBestLocalStorageValue = localStorage.getItem("personalBest");
    setPersonalBest(parseInt(personalBestLocalStorageValue) || 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("personalBest", personalBest.toString());
  }, [personalBest]);

  useEffect(() => {
    const winStreakLocalStorageValue = localStorage.getItem("winStreak");
    setWinStreak(parseInt(winStreakLocalStorageValue) || 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("winStreak", winStreak.toString());
  }, [winStreak]);

  useEffect(() => {
    startNewGame();
  }, []);

  useLayoutEffect(() => {
    if (gameStarted && inputRefs[0][0].current) {
      inputRefs[0][0].current.focus();
    }
  }, [gameStarted, inputRefs]);

  const handleNewGamePress = () => {
    ResetKeyboardButtonStyles();
    startNewGame();
  };

  const processQuote = (quote) => {
    const cleanedQuote = quote.replace(/\[.*?\]/g, ""); // Remove content within square brackets
    const words = cleanedQuote
      .replace(/[^\w\s]/gi, "") // Remove punctuation
      .split(" ");
    return words;
  };

  const startNewGame = () => {
    const validQuotes = quotes.results.filter((quoteObj) => {
      const words = processQuote(quoteObj.quote);
      return quoteObj.quote && words.length > 1;
    });
  
    const randomQuote =
      validQuotes[Math.floor(Math.random() * validQuotes.length)];
    const words = processQuote(randomQuote.quote);
  
    const excludedWordSet = new Set(
      excludedWords.map((word) => word.toLowerCase())
    );
  
    const filteredWords = words.filter(
      (word) =>
        !excludedWordSet.has(word.toLowerCase()) &&
        word.length >= minWordLength &&
        word.length <= maxWordLength
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
    setCompleted(false);
    setGameStarted(true);
    setGaveUp(false);
    setIsGameWon(false);
    setHintIndex(0);
  };

  const makeGuess = (guess, rowIndex) => {
    if (
      guess.length === currentWord.length &&
      /^[a-zA-Z]+$/.test(guess) &&
      rowIndex === numGuesses
    ) {
      const lowercaseGuess = guess.toLowerCase();

      const newCurrentGuesses = [...currentGuesses, lowercaseGuess];
      setCurrentGuesses(newCurrentGuesses);

      SetKeyboardButtonStyles(lowercaseGuess, currentWord);

      if (!completed && guess.toLowerCase() === currentWord) {
        setCompleted(true);
        setShowModal(true);
        setWinStreak(winStreak + 1);
        setIsGameWon(true);
        return true; // Return true when the guess is correct
      } else {
        setNumGuesses(numGuesses + 1);

        if (numGuesses + 1 >= maxGuesses) {
          resetStreak();
          setShowModal(true);
          revealAnswer(); // Reveal the answer when there are no guesses remaining
        }
      }
    }

    return false; // Return false when the guess is not correct or the function conditions are not met
  };

  const inputRefs = Array.from({ length: maxGuesses }, () =>
    Array.from({ length: currentWord.length }, () => React.createRef())
  );

  const handleKeyboardClick = (letter, disable = true) => {
    if (gaveUp) {
      return;
    }

    const newGridInput = [...gridInput];
    const currentRow = newGridInput[numGuesses];
    const colIndex = currentRow.findIndex((value) => !value);
    if (colIndex === -1) {
      return;
    }

    newGridInput[numGuesses][colIndex] = letter.toUpperCase();
    setGridInput(newGridInput);

    if (numGuesses < gridInput.length - 1) {
      const nextColIndex = colIndex + 1;
      if (nextColIndex < currentWord.length) {
        inputRefs[numGuesses][nextColIndex].current.focus();
      } else {
        inputRefs[numGuesses + 1][0].current.focus();
      }
    }
  };

  const revealAnswer = () => {
    if (!completed) {
      setCompleted(true);
      setGaveUp(true);
      setShowModal(true);
      resetStreak();
      setSkips(3);
    }
  };

  const resetStreak = () => {
    if (winStreak > personalBest && !skipEnabled) {
      setPersonalBest(winStreak);
    }
    setAchievedStreak(winStreak);
    setWinStreak(0);
  };

  const useHint = () => {
    if (gaveUp || completed) return;
    if (hintsLeft > 0 && hintIndex < 2) {
      setHintIndex((prevHintIndex) => prevHintIndex + 1);
      setHintsLeft((prevHintsLeft) => prevHintsLeft - 1);
    }
  };

  useEffect(() => {
    if (completed && !gaveUp) {
      setHintIndex(0);
      if (winStreak % 2 === 0) {
        // Check if the winStreak is even, so it grants a hint on every two wins
        setHintsLeft((prevHintsLeft) => {
          const newHintsLeft = prevHintsLeft + 1;
          // Ensure hintsLeft never exceeds 10
          return newHintsLeft > 10 ? 10 : newHintsLeft;
        });
      }
    } else if (completed && gaveUp) {
      setHintIndex(0);
      setHintsLeft(2); // On give up, reset hints
    }
  }, [completed, gaveUp, winStreak]);

  const highlightCurrentWord = (quote, word) => {
    const quoteWords = quote.split(/(\s+)/);
    const wordLower = word.toLowerCase();

    const parts = quoteWords.map((quoteWord, index) => {
      const quoteWordLower = quoteWord.toLowerCase().replace(/[^a-zA-Z]/g, "");
      if (quoteWordLower === wordLower) {
        return {
          text: quoteWord.replace(/[a-zA-Z]/g, (char) => char.toUpperCase()),
          isHighlighted: true,
        };
      } else {
        return {
          text: quoteWord,
          isHighlighted: false,
        };
      }
    });

    return parts;
  };

  const handleBackspaceClick = () => {
    for (let row = numGuesses; row >= numGuesses; row--) {
      // Limit row to numGuesses
      for (let col = currentWord.length - 1; col >= 0; col--) {
        const currentLetter = gridInput[row][col];
        if (currentLetter) {
          setGridInput((prevGridInput) => {
            const newGridInput = [...prevGridInput];
            newGridInput[row][col] = "";
            return newGridInput;
          });

          if (row === numGuesses) {
            if (col > 0) {
              inputRefs[row][col - 1].current.focus();
            }
          }
          return;
        }
      }
    }
  };

  const handleEnterClick = () => {
    const inputValues = gridInput[numGuesses].filter(
      (value) => value && value.trim() !== ""
    );
    if (inputValues.length === currentWord.length) {
      const isCorrect = makeGuess(inputValues.join(""), numGuesses);
      if (isCorrect) {
        return;
      }
    }
    if (numGuesses + 1 < gridInput.length) {
      inputRefs[numGuesses + 1][0].current.focus();
    }
  };

  const countEligibleWords = () => {
    const excludedWordSet = new Set(
      excludedWords.map((word) => word.toLowerCase())
    );
    let eligibleWordsCount = 0;

    quotes.results.forEach((quoteObj) => {
      const words = processQuote(quoteObj.quote);
      const validWords = words.filter(
        (word) =>
          !excludedWordSet.has(word.toLowerCase()) &&
          word.length >= minWordLength &&
          word.length <= maxWordLength
      );
      eligibleWordsCount += validWords.length;
    });

    return eligibleWordsCount;
  };

  const totalEligibleWordsCount = useMemo(
    () => countEligibleWords(),
    [quotes, minWordLength, maxWordLength]
  );

  const countExcludedWords = () => {
    const excludedWordSet = new Set(
      excludedWords.map((word) => word.toLowerCase())
    );
    let excludedWordsCount = 0;

    quotes.results.forEach((quoteObj) => {
      const words = processQuote(quoteObj.quote);
      const excludedWordsInQuote = words.filter(
        (word) =>
          excludedWordSet.has(word.toLowerCase()) &&
          word.length >= minWordLength &&
          word.length <= maxWordLength
      );
      excludedWordsCount += excludedWordsInQuote.length;
    });

    return excludedWordsCount;
  };

  const totalExcludedWordsCount = useMemo(
    () => countExcludedWords(),
    [quotes, minWordLength, maxWordLength]
  );

  const handleShowQuote = () => {
    setShowModal(true);
  };

  const [menuVisible, setMenuVisible] = useState(false);
  const hamburgerRef = useRef();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const [showUnlimitedModal, setShowUnlimitedModal] = useState(false);

  return (
    <div className={className}>
      {explode && (
        <Explosion
          force={0.7}
          duration={3000}
          width={1700}
          particleCount={130}
          style={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        />
      )}
      <Sidebar
        menuVisible={menuVisible}
        totalEligibleWordsCount={totalEligibleWordsCount}
        totalExcludedWordsCount={totalExcludedWordsCount}
        maxWordLength={maxWordLength}
        setMaxWordLength={setMaxWordLength}
        toggleMenu={toggleMenu}
        personalBest={personalBest}
        hamburgerRef={hamburgerRef}
        setSkips={setSkips}
        skipEnabled={skipEnabled}
        setSkipEnabled={setSkipEnabled}
        winStreak={winStreak}
        resetStreak={resetStreak}
        showUnlimitedModal={showUnlimitedModal}
        setShowUnlimitedModal={setShowUnlimitedModal}
      />
      <HeaderContainer
        revealAnswer={revealAnswer}
        winStreak={winStreak}
        handleNewGamePress={handleNewGamePress}
        totalEligibleWordsCount={totalEligibleWordsCount}
        totalExcludedWordsCount={totalExcludedWordsCount}
        maxWordLength={maxWordLength}
        setMaxWordLength={setMaxWordLength}
        personalBest={personalBest}
        toggleMenu={toggleMenu}
        hamburgerRef={hamburgerRef}
        menuVisible={menuVisible}
      />
      <CurrentWordDisplay currentWord={currentWord} />
      <div className="centered-container">
        {currentQuote && currentQuote.quote && (
          <Quote
            currentWord={currentWord}
            currentGuesses={currentGuesses}
            currentQuote={currentQuote}
            gaveUp={gaveUp}
            hintIndex={hintIndex}
          />
        )}
        {/* This is why you need a context provider 😂 */}
        <Guesses
          gridInput={gridInput}
          setGridInput={setGridInput}
          maxGuesses={maxGuesses}
          makeGuess={makeGuess}
          currentWord={currentWord}
          numGuesses={numGuesses}
          completed={completed}
          inputRefs={inputRefs}
          handleKeyboardClick={handleKeyboardClick}
          handleBackspaceClick={handleBackspaceClick}
          handleEnterClick={handleEnterClick}
          currentGuesses={currentGuesses}
          gaveUp={gaveUp}
        />
        {gameStarted && completed && showModal && (
          <Modal
            onClose={() => setShowModal(false)}
            show={showModal}
            explode={explode}
          >
            <WinMessage
              gaveUp={gaveUp}
              currentQuote={currentQuote}
              highlightCurrentWord={highlightCurrentWord}
              currentWord={currentWord}
              completed={completed}
              numGuesses={numGuesses}
              gridInput={gridInput}
              hintIndex={hintIndex}
              handleNewGamePress={handleNewGamePress}
              winStreak={winStreak}
              achievedStreak={achievedStreak}
              isGameWon={isGameWon}
              personalBest={personalBest}
              skips={skips}
              hintsLeft={hintsLeft}
            />
          </Modal>
        )}
      </div>
      <Keyboard
        onClick={handleKeyboardClick}
        guessedLetters={currentGuesses}
        currentWord={currentWord}
        handleBackspaceClick={handleBackspaceClick}
        handleEnterClick={handleEnterClick}
        revealAnswer={revealAnswer}
        handleSkipPress={handleSkipPress}
        handleNewGamePress={handleNewGamePress}
        useHint={useHint}
        skipEnabled={skipEnabled}
        hintsLeft={hintsLeft}
        hintIndex={hintIndex}
        gameStarted={gameStarted}
        completed={completed}
        skips={skips}
        handleShowQuote={handleShowQuote}
      />
    </div>
  );
};

export const App = styled(AppUnstyled)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .centered-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 480px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
  }
`;

function ResetKeyboardButtonStyles() {
  GetKeyboardButtons().forEach((button) => {
    button.className = `keyboard-button`;
  });
}

function countOccurrences(word, letter) {
  return word.split("").filter((c) => c.toLowerCase() === letter.toLowerCase())
    .length;
}

function SetKeyboardButtonStyles(guessedWord, correctWord) {
  GetKeyboardButtons().forEach((button) => {
    const letter = button.innerText.toLowerCase();
    if (guessedWord.includes(letter)) {
      let buttonClass = "not-in-word";

      if (correctWord.includes(letter)) {
        const guessedLetterCount = countOccurrences(guessedWord, letter);
        const correctLetterCount = countOccurrences(correctWord, letter);

        const correctPositionsInGuessedWord = guessedWord
          .toLowerCase()
          .split("")
          .map(
            (c, i) => c === letter && correctWord[i].toLowerCase() === letter
          )
          .filter(Boolean).length;

        if (correctPositionsInGuessedWord >= correctLetterCount) {
          buttonClass = "correct-position";
        } else if (guessedLetterCount > correctLetterCount) {
          buttonClass = "in-word";
        } else {
          buttonClass =
            correctPositionsInGuessedWord >= guessedLetterCount
              ? "correct-position"
              : "in-word";
        }
      }

      button.className = `keyboard-button ${buttonClass}`;
    }
  });
}
function GetKeyboardButtons() {
  return Array.from(document.querySelectorAll(".keyboard-button")).filter(
    (button) =>
      !button.classList.contains("backspace") &&
      !button.classList.contains("enter")
  );
}
