import React, { useState } from "react";
import { Keyboard } from "./components/keyboard";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
// import { CurrentWordDisplay } from "./main";
import quotes from "./peepdle-data.json";
import excludedWords from "./excludedWords";
import styled from "styled-components";
import { ButtonContainer } from "./components/ButtonContainer";
import { Quote } from "./components/Quote";
import { WinMessage } from "./components/WinMessage";
import { Guesses } from "./components/Guesses";

const AppUnstyled = ({ className, maxGuesses }) => {
	const [currentWord, setCurrentWord] = useState("");
	const [currentGuesses, setCurrentGuesses] = useState([]);
	const [numGuesses, setNumGuesses] = useState(0);
	const [completed, setCompleted] = useState(false);
	const [winStreak, setWinStreak] = useState(0);
	const [currentQuote, setCurrentQuote] = useState({});
	const [failed, setFailed] = useState(false);
	const [gameStarted, setGameStarted] = useState(false);
	const [gaveUp, setGaveUp] = useState(false);
	const [gridInput, setGridInput] = useState(Array.from({ length: maxGuesses }, () => Array(currentWord.length).fill("")));

	useEffect(() => {
		setGridInput(Array.from({ length: maxGuesses }, () => Array(currentWord.length).fill("")));
	}, [currentWord]);

	useEffect(() => {
		const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)winStreak\s*\=\s*([^;]*).*$)|^.*$/, "$1");
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

		const randomQuote = validQuotes[Math.floor(Math.random() * validQuotes.length)];
		const words = randomQuote.quote
			.replace(/[^\w\s]/gi, "") // Remove punctuation
			.split(" ")
			.filter((word) => word.length >= 6); // Set minimum word length

		const excludedWordSet = new Set(excludedWords.map((word) => word.toLowerCase()));

		const filteredWords = words.filter(
			(word) => !excludedWordSet.has(word.toLowerCase())
			// && word.length <= 7 // Set maximum word length
		);

		if (filteredWords.length === 0) {
			startNewGame();
			return;
		}

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
					revealAnswer(); // Add this line - Reveal the answer when there are no guesses remaining
				}
			}
		}

		return false; // Return false when the guess is not correct or the function conditions are not met
	};

	const inputRefs = Array.from({ length: maxGuesses }, () => Array.from({ length: currentWord.length }, () => React.createRef()));

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
		resetStreak();
	};

	const resetStreak = () => {
		setWinStreak(0);
	};

	const highlightCurrentWord = (quote, word) => {
		const quoteLower = quote.toLowerCase();
		const wordLower = word.toLowerCase();
		const parts = [];
		let lastIndex = 0;

		while (lastIndex < quote.length) {
			const wordIndex = quoteLower.indexOf(wordLower, lastIndex);
			if (wordIndex === -1) break;

			const beforeWord = quote.slice(lastIndex, wordIndex);
			const matchedWord = quote.slice(wordIndex, wordIndex + word.length);

			parts.push(beforeWord);
			parts.push(matchedWord);
			lastIndex = wordIndex + word.length;
		}

		if (lastIndex < quote.length) {
			parts.push(quote.slice(lastIndex));
		}

		return parts;
	};

	const guessedWord = currentWord.split("").filter((letter) => currentGuesses.includes(currentWord));

	return (
		<div className={className}>
			<div className="centered-container">
				{currentQuote && currentQuote.quote && <Quote currentWord={currentWord} currentGuesses={currentGuesses} currentQuote={currentQuote} gaveUp={gaveUp} />}

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
					currentGuesses={currentGuesses}
				/>
				{gameStarted && completed && <WinMessage gaveUp={gaveUp} currentQuote={currentQuote} highlightCurrentWord={highlightCurrentWord} currentWord={currentWord} />}
			</div>
			<Keyboard onClick={handleKeyboardClick} guessedLetters={currentGuesses} currentWord={currentWord} />

			<ButtonContainer revealAnswer={revealAnswer} winStreak={winStreak} startNewGame={startNewGame} />
		</div>
	);
};

export const App = styled(AppUnstyled)`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;

	.centered-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-width: 600px;
	}

	.highlighted {
		background-color: yellow;
	}

	.correct-position {
		background-color: green;
		color: white;
	}

	.in-word {
		background-color: orange;
		color: white;
	}
`;
