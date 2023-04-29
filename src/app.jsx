import React, { useState, useMemo, useRef } from "react";
import { Keyboard } from "./components/Keyboard";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
// import { CurrentWordDisplay } from "./main";
import quotes from "./peepdle-data.json";
import excludedWords from "./excludedWords";
import styled from "styled-components";
import { HeaderContainer } from "./components/HeaderContainer";
import { Quote } from "./components/Quote";
import { WinMessage } from "./components/WinMessage";
import { Guesses } from "./components/Guesses";
import { Modal } from "./components/Modal";
import { Sidebar } from "./components/Sidebar";

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
  const [skips, setSkips] = useState(5);
  const [skipEnabled, setSkipEnabled] = useState(false);
  const [gridInput, setGridInput] = useState(
    Array.from({ length: maxGuesses }, () => Array(currentWord.length).fill(""))
  );

  useEffect(() => {
    if (isGameWon) {
      if (winStreak % 2 === 0) {
        // Check if the winStreak is even, so it grants a skip on every two wins
        setSkips((prevSkips) => prevSkips + 1);
      }
    }
  }, [isGameWon, winStreak]);

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
    const personalBestCookieValue = document.cookie.replace(
      /(?:(?:^|.*;\s*)personalBest\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    setPersonalBest(parseInt(personalBestCookieValue) || 0);
  }, []);

  useEffect(() => {
    document.cookie = `personalBest=${personalBest}`;
  }, [personalBest]);

  useEffect(() => {
    const winStreakCookieValue = document.cookie.replace(
      /(?:(?:^|.*;\s*)winStreak\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    setWinStreak(parseInt(winStreakCookieValue) || 0);
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
      return quoteObj.quote && words.length > 1; // Exclude quotes with only one word
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
      setSkips(5);
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
      setHintsLeft((prevHintsLeft) => prevHintsLeft + 1);
    }
  }, [completed, gaveUp]);

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
          <Modal onClose={() => setShowModal(false)} show={showModal}>
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

function SetKeyboardButtonStyles(guessedWord, correctWord) {
  GetKeyboardButtons().forEach((button) => {
    const letter = button.innerText.toLowerCase();
    const letterInCurrentWordIndex = correctWord.toLowerCase().indexOf(letter);
    if (guessedWord.includes(letter)) {
      let buttonClass = "not-in-word";
      if (correctWord.includes(letter)) {
        if (
          letterInCurrentWordIndex === guessedWord.toLowerCase().indexOf(letter)
        ) {
          buttonClass = "correct-position";
        } else {
          buttonClass = "in-word";
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
