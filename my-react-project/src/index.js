import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Keyboard } from './Keyboard';
import './app.css';
import { useEffect} from 'react';

const quotes = [
    { quote: "People like fast cars, females with big and they don't want the Euro, that's all there is to it.", character: "Daryl", season: 2, episode: "Jeremy Makes It" },
    { quote: "And our ambition should be to kill clients. I mean actually kill them.", character: "Johnson", season: 2, episode: "Local Zero" },
    { quote: "This children's play centre is your designated snake handover arena?", character: "Mark", season: 9, episode: "Kid Farm" }
];

const maxGuesses = 8;

const WordDisplay = ({ currentWord, currentGuesses }) => {
  const displayWord = currentWord
    .split("")
    .map((letter) =>
      currentGuesses.includes(letter) ? letter.toUpperCase() : "_"
    )
    .join(" ");

  return <div id="word-display">{displayWord}</div>;
};

const GuessesDisplay = ({ numGuesses }) => {
  return <div id="guesses">{maxGuesses - numGuesses} guesses remaining</div>;
};

const NewGameButton = ({ onClick }) => {
  return <button onClick={onClick}>New Game</button>;
};

// Only for debug use - remove later
const CurrentWordDisplay = ({ currentWord }) => {
    return <div id="current-word-display">Current Word: {currentWord}</div>;
  };

const App = ({ quote }) => {
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
          .filter((word) => word.length >= 5);
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
          const guessedWord = currentWord.split("").filter((letter) =>
            currentGuesses.includes(letter)
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

      const guessedWord = currentWord.split("").filter((letter) =>
      currentGuesses.includes(letter)
    );

    if (guessedWord.length === currentWord.length && !completed) {
      setCompleted(true);
      setDailyWins(dailyWins + 1);
    }
      
    return (
        <div className="app">
          <div className="centered-container">
            <div className="word-container">
              <CurrentWordDisplay currentWord={currentWord} />
              <WordDisplay currentWord={currentWord} currentGuesses={currentGuesses} />
            </div>
            <div className="guess-container">
              <GuessesDisplay numGuesses={numGuesses} />
              <input
                type="text"
                maxLength={1}
                onKeyUp={(e) => makeGuess(e.target.value)}
                className="hidden-input"
              />
            </div>
            <div className="keyboard-container">
              <Keyboard onClick={handleKeyboardClick} guessedLetters={currentGuesses} />
            </div>
            <div className="win-tally">Daily wins: {dailyWins}</div>
            {gameStarted && completed && (
              <div className="win-message-container">
                <div className="win-message">You won today's peepdle!</div>
                {currentQuote.quote && (
                  <div className="full-quote">
                    {currentQuote.quote.split(" ").map((word, index) => {
                      const isHighlighted = word.toLowerCase() === currentWord;
                      return (
                        <span key={index}>
                          <span className={isHighlighted ? "highlighted" : ""}>{word}</span>
                          {index !== currentQuote.quote.split(" ").length - 1 && " "}
                        </span>
                      );
                    })}
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

ReactDOM.render(<App />, document.getElementById("root"));
