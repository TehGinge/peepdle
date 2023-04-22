import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { App } from "./app";
import { createGlobalStyle } from "styled-components";
import './fonts/fonts.css';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  
  body {
    background: rgb(49, 48, 48);
    font-size: 22px;
    color: white;
    margin: 0;
    height: 100%;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  #root {
    height: 100%;
  }

  @media (max-width: 480px) {
    body {
      background: rgb(49, 48, 48);
      font-size: 20px;
      color: white;
    }
  }
`;

export const maxGuesses = 5;

// Only for debug use - remove later
export const CurrentWordDisplay = ({ currentWord }) => {
	return <div id="current-word-display">Current Word: {currentWord}</div>;
};

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(
	<>
		<App maxGuesses={maxGuesses} />
		<GlobalStyle />
	</>
);
