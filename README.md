# Peepdle

Peepdle is an interactive word-guessing game based on Wordle, where players attempt to guess a word from a quote in the British sitcom 'Peep Show'

## How the game works

- You guess a random 4-8 character word from a random Peep Show quote by entering letters into the grid (the max word length is configurable up to 15)
- You have 5 guesses
- If you guess the word correctly, your win streak is increased by 1
- If you run out of guesses or give up, your win streak is reset
- You can use Hints to help you guess the word. There is only 2 Hints available per quote: the episode and character.
- You can use Skips to move on to the next quote if you are stuck. You start with 5, and gain 1 every 2 words guessed correctly.

Your glans isn't red raw after a long game of Peepdle is it?

It is available to play via Github Pages - https://peepdle.dev

## Installation and Setup

1. Clone the repository
```
git clone https://github.com/TehGinge/peepdle.git
```
2. Navigate to the project directory
```
cd peepdle
```
3. Install the required dependencies
```
npm install
```
4. Start the development server
```
npm start
```
5. Open your browser and go to http://localhost:9000

## Contributing
Feel free to open issues and submit pull requests to contribute to the project - all contributions are welcome!

## Credits: 
- PeepQuote API - https://github.com/tomaustin700/PeepQuote
- Peep Show GifGlobe - https://peepshow.gifglobe.com/
- ChatGPT
