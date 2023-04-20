import React from "react";
import { maxGuesses } from "../main";


export const GuessesDisplay = ({
  numGuesses
}) => {
  const guessesRemaining = maxGuesses - numGuesses;

  // if (guessesRemaining <= 0) {
  //   return <div id="guesses">Sorry, you have no guesses left!</div>;
  // }

  // return (
  //   <div>
  //     <div id="guesses">{guessesRemaining} guesses remaining</div>
  //   </div>
  // );
};