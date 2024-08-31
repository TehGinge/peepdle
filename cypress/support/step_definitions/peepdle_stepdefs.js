import {
  Given,
  When,
  Then,
  DataTable,
} from "@badeball/cypress-cucumber-preprocessor";

// Selectors
const wordGridSelector = '*[class^="sc-irTswW"]';
const wordDisplaySelector = "#word-display";
const keyboardSelector = '[class="keyboard"]';
const buttonsContainerSelector = '*[class^="buttons-container"]';
const modalContentSelector = '[class="modal-content"]';
const winStreakSelector = '[class="win-tally-container"]';
const currentWordDisplaySelector = '[id="game-container"]';

// Step Definitions
Given("I am on the Peepdle homepage", () => {
  cy.clearLocalStorage();
  cy.clearCookies();
  console.log("Environment:", process.env.NODE_ENV);

  cy.visit("/");

  cy.get(wordGridSelector)
    .find(".grid-input-row:first .grid-input-cell")
    .then(($cells) => {
      wordLength = $cells.length; // Store the word length in the test state
      cy.log(`Word Length: ${wordLength}`);
    });
});

Given("I have guessed {int} words", (guessCount) => {
  if (guessCount === 0) {
    verifyGridCells();
  } else {
    for (let i = 0; i < guessCount; i++) {
      const letters = String.fromCharCode(65 + i).repeat(wordLength);
      cy.log(`Inputting letters: ${letters}`);
      // Type the letters into the word grid
      cy.get(wordGridSelector).type(letters);
      // Make a guess by clicking the enter button
      cy.get(keyboardSelector).find(".keyboard-button.enter").click();
    }
  }
});

Given("I have guessed a word 5 times", () => {
  for (let i = 0; i < 5; i++) {
    const letters = String.fromCharCode(65 + i).repeat(wordLength);
    cy.log(`Inputting letters: ${letters}`);
    cy.get(wordGridSelector).type(letters);
    cy.get(keyboardSelector).find(".keyboard-button.enter").click();
  }
});

When("I incorrectly guess the word", () => {
  cy.get(currentWordDisplaySelector).then(($element) => {
    const currentWord = $element.attr('data-current-word');
    cy.log(`Current Word: ${currentWord}`);

    // Ensure the current word is not empty
    if (!currentWord) {
      throw new Error('Current word is empty');
    }

    // Define the alphabet list
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase();

    // Filter out letters present in the currentWord from the alphabet list
    let remainingLetters = alphabet
      .split("")
      .filter((letter) => !currentWord.includes(letter));
    cy.log(`logRemaining Letters: ${remainingLetters}`);

    // Shuffle the remaining letters randomly
    remainingLetters.sort(() => Math.random() - 0.5);
    cy.log(`logShuffled Remaining Letters: ${remainingLetters.join("")}`);

    // Take the required number of letters for the incorrect guess
    const incorrectGuess = remainingLetters
      .slice(0, currentWord.length)
      .join("");
    cy.log(`logInputting letters for incorrect guess: ${incorrectGuess}`);

    // Type the incorrect guess into the word grid
    cy.get(wordGridSelector).type(incorrectGuess);

    // Make the guess by clicking the enter button
    cy.get(keyboardSelector).find(".keyboard-button.enter").click();
  });
});

When("I partially guess the word", () => {
  cy.get(currentWordDisplaySelector).then(($element) => {
    const currentWord = $element.attr('data-current-word');
    cy.log(`Current Word: ${currentWord}`);

    // Ensure the current word is not empty
    if (!currentWord) {
      throw new Error('Current word is empty');
    }

    // Find a letter in the currentWord that is not in the correct position
    let incorrectLetter;
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord.charAt(i) !== currentWord.charAt(0)) {
        // We ensure it's not the first letter
        incorrectLetter = currentWord.charAt(i);
        break;
      }
    }
    cy.log(`Incorrect letter for partial guess: ${incorrectLetter}`);

    // Define the alphabet list excluding the incorrect letter
    const remainingLetters = "abcdefghijklmnopqrstuvwxyz".replace(
      incorrectLetter,
      ""
    );
    cy.log(`logRemaining Letters: ${remainingLetters}`);

    // Shuffle the remaining letters randomly
    const shuffledLetters = remainingLetters
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    cy.log(`logShuffled Remaining Letters: ${shuffledLetters}`);

    // Construct the incorrect guess by adding the incorrect letter and some other random letters
    let incorrectGuess = '';
    for (let i = 0; i < currentWord.length; i++) {
      if (i === 0) {
        incorrectGuess += incorrectLetter;
      } else {
        let randomLetter;
        do {
          randomLetter = shuffledLetters.charAt(Math.floor(Math.random() * shuffledLetters.length));
        } while (randomLetter === currentWord.charAt(i));
        incorrectGuess += randomLetter;
      }
    }
    cy.log(`logInputting letters for partial guess: ${incorrectGuess}`);

    // Type the incorrect guess into the word grid
    cy.get(wordGridSelector).type(incorrectGuess);

    // Make the guess by clicking the enter button
    cy.get(keyboardSelector).find(".keyboard-button.enter").click();
  });
});


Given("I have made 1 correct guess", () => {
  cy.get(currentWordDisplaySelector).then(($element) => {
    const currentWord = $element.attr('data-current-word');
    cy.log(`Current Word: ${currentWord}`);

    // Ensure the current word is not empty
    if (!currentWord) {
      throw new Error('Current word is empty');
    }
    makeCorrectWordGuess(currentWord);
  });
  cy.get(winStreakSelector).should("include.text", "1");
});

When("I correctly guess the word", () => {
  cy.get(currentWordDisplaySelector).then(($element) => {
    const currentWord = $element.attr('data-current-word');
    cy.log(`Current Word: ${currentWord}`);

    // Ensure the current word is not empty
    if (!currentWord) {
      throw new Error('Current word is empty');
    }
    makeCorrectWordGuess(currentWord);
  });
});

function makeCorrectWordGuess(word) {
  const letters = word;
  cy.log(`Inputting letters: ${letters}`);
  cy.get(wordGridSelector).type(letters);
  cy.get(keyboardSelector).find(".keyboard-button.enter").click();
}

Given(`I have continued to the next word`, () => {
  cy.get(modalContentSelector).find(".next-word").click();
});

When(`I Give Up`, () => {
  cy.get(buttonsContainerSelector).find(".left-button").click();
});

Then("the title should contain {string}", (title) => {
  cy.title().should("contain", title);
});

Then(`a word grid is displayed`, () => {
  cy.get(wordGridSelector).should("exist");
});

Then(`a quote is displayed, with a word required to guess`, () => {
  cy.get(wordDisplaySelector).should("include.text", "_");
});

Then(`a keyboard is displayed`, () => {
  cy.get(keyboardSelector).should(
    "include.text",
    "QWERTYUIOPASDFGHJKL⌫ZXCVBNM↵"
  );
});

Then(`a {string} button is displayed`, (buttonText) => {
  cy.get(buttonsContainerSelector).should("contain", buttonText);
});

Then(`the word is revealed`, () => {
  cy.get(modalContentSelector)
    .find(".full-quote span[style*='color: red']")
    .should("exist");
});

Then(
  `the correctly guessed letters on the Word Grid should be highlighted in {string}`,
  (color) => {
    const className =
      color === "Green"
        ? "correct-position"
        : color === "Yellow"
        ? "in-word"
        : "not-in-word";
    const notExpectedClasses =
      color === "Green"
        ? ["in-word", "not-in-word"]
        : color === "Yellow"
        ? ["correct-position", "not-in-word"]
        : ["correct-position", "in-word"];

    cy.get(wordGridSelector)
      .find(".grid-input-cell")
      .should("have.class", className)
      .and("not.have.class", ...notExpectedClasses);
  }
);

Then(
  `the correctly guessed letters on the Keyboard should be highlighted in {string}`,
  (color) => {
    const className =
      color === "Green"
        ? "correct-position"
        : color === "Yellow"
        ? "in-word"
        : "not-in-word";
    const notExpectedClasses =
      color === "Green"
        ? ["in-word", "not-in-word"]
        : color === "Yellow"
        ? ["correct-position", "not-in-word"]
        : ["correct-position", "in-word"];

    cy.get(keyboardSelector)
      .find(".keyboard-button")
      .should("have.class", className)
      .and("not.have.class", ...notExpectedClasses);
  }
);

Then(`the Give Up screen is displayed`, () => {
  cy.get(modalContentSelector).should("exist");
});

Then(`the full quote is displayed in the Give Up screen`, () => {
  cy.get(modalContentSelector).find(".full-quote").should("exist");
});

const verifyWinStreakInHeader = (expectedValue) => {
  cy.get(winStreakSelector)
    .contains("Win Streak")
    .should("exist")
    .next(".win-tally-counter")
    .should("include.text", expectedValue);
};

const verifyWinStreakInGiveUpScreen = (expectedValue) => {
  cy.get(modalContentSelector)
    .contains("Win Streak")
    .should("exist")
    .next(".win-tally-counter")
    .should("exist")
    .should("include.text", expectedValue);
};

const verifyPersonalBestInGiveUpScreen = (expectedValue) => {
  cy.get(modalContentSelector)
    .contains("Personal Best")
    .should("exist")
    .next(".number-value")
    .should("include.text", expectedValue);
};

Then(`my current Win Streak is reset to 0 in the header`, () => {
  verifyWinStreakInHeader("");
});

Then(`my Win Streak is displayed in the Give Up screen`, () => {
  verifyWinStreakInGiveUpScreen("");
});

Then(`my Win Streak is kept at 1 in the Give Up screen`, () => {
  verifyWinStreakInGiveUpScreen("1");
});

Then(`my Personal Best is displayed in the Give Up screen`, () => {
  verifyPersonalBestInGiveUpScreen("");
});

Then(`my Personal Best has not been reset`, () => {
  verifyPersonalBestInGiveUpScreen("1");
});

Then(`I can select Next Word to continue the game`, () => {
  cy.get(modalContentSelector).find(".next-word").should("exist");
});

// Helper function to verify grid cells
function verifyGridCells() {
  cy.get(wordGridSelector)
    .find(".grid-input-row:first .grid-input-cell")
    .should(($cells) => {
      // Use .each to iterate over each cell of the first grid row
      $cells.each((index, cell) => {
        // Check that the cell has the expected class and does not have unwanted classes
        expect(cell).to.have.class("grid-input-cell");
        expect(cell).not.to.have.class("in-word");
        expect(cell).not.to.have.class("not-in-word");
        expect(cell).not.to.have.class("correct-position");
      });
    });
}
