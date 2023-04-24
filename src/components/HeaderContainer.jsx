import React, { useState } from "react";
import styled from "styled-components";
import "../fonts/fonts.css";

const HeaderUnstyled = ({
  className,
  winStreak,
  totalEligibleWordsCount,
  totalExcludedWordsCount,
  setMaxWordLength,
  maxWordLength,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className={className}>
      <div className="header-container">
        <div className="win-tally-container">
          <div className="win-tally">
            <div className="win-tally-label">Win Streak</div>
            <div className="win-tally-counter">{winStreak}</div>
          </div>
        </div>
        <div className="logo-container">
          <header>
            <h1>PEEPDLE</h1>
          </header>
        </div>
        <div className="hamburger-container">
          <div className="hamburger-menu" onClick={toggleMenu}>
            <div className={`hamburger-icon ${menuVisible ? "open" : ""}`}>
              <span className="bar bar1"></span>
              <span className="bar bar2"></span>
              <span className="bar bar3"></span>
            </div>
          </div>
        </div>
      </div>
      <div className={`menu-content ${menuVisible ? "visible" : ""}`}>
        <div className="number-container">
          <span className="number-label">Total eligible words:</span>
          <span className="number-value">{totalEligibleWordsCount}</span>
        </div>
        <div className="number-container">
          <span className="number-label">Total excluded words:</span>
          <span className="number-value">{totalExcludedWordsCount}</span>
        </div>
        <div className="number-container">
          <span className="number-label">Max Word Length:</span>
          <input
            type="range"
            min="4"
            max="15"
            value={maxWordLength}
            onChange={(e) => setMaxWordLength(parseInt(e.target.value))}
            className="slider"
          />
          <span className="number-value">{maxWordLength}</span>
        </div>
        <div className="footer">
          <a
            href="https://github.com/TehGinge/peepdle"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made by TehGinge - view on Github
          </a>
          <div className="credits">
            <p>Credit to:</p>
            <ul>
              <li>
                <a
                  href="https://peepshow.gifglobe.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Peep Show GifGlobe
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/tomaustin700/PeepQuote"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PeepQuote API
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HeaderContainer = styled(HeaderUnstyled)`
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  font-size: 20px;
  background-color: #3a3a3a;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .logo-container {
    display: flex;
    justify-content: center;
  }

  .hamburger-container {
    justify-content: flex-end;
  }

  .win-tally {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(49, 48, 48);
    border-radius: 5px;
    padding: 3.5px 3px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .win-tally-label {
    color: #ffffff;
    font-size: 12px;
  }

  .win-tally-counter {
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
  }

  .header-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }

  h1 {
    padding-right: 5px;
    padding-left: 5px;
    font-size: 40px;
    margin: 5px 0;
    font-family: "ITC Bauhaus Heavy";
  }

  .footer {
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
    background-color: #363636;
  }

  .footer a {
    color: #0099ff;
    text-decoration: none;
  }

  .footer a:hover {
    text-decoration: underline;
  }

  .credits {
    margin-top: 10px;
  }

  .credits ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .credits li {
    margin-bottom: 5px;
  }

  .hamburger-icon {
    transition: transform 0.3s ease;
    position: relative;
    width: 41px;
    height: 20px;
  }

  .hamburger-icon.open {
    transform: rotate(90deg);
  }

  .hamburger-menu {
    padding: 10px;
    background-color: rgb(49, 48, 48);
    border-radius: 5px;
    cursor: pointer;
    z-index: 100;
    user-select: none;
  }

  .menu-content {
    position: absolute;
    top: 105px;
    right: 10px;
    background-color: rgb(49, 48, 48);
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    width: 275px;
    z-index: 90;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .menu-content.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .menu-content p {
    margin: 0;
    padding: 5px;
    font-size: 14px;
    color: #ffffff;
    background-color: rgb(49, 48, 48);
    border-radius: 3px;
    line-height: 1.4;
  }

  .number-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  .number-label {
    font-size: 19px;
    color: #ffffff;
  }

  .number-value {
    background-color: rgb(78, 78, 78);
    border-radius: 10px;
    padding: 2px 6px;
    font-size: 25px;
    color: #ffffff;
  }
  .bar {
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: #fffbfb;
    transition: transform 0.3s ease, opacity 0.3s ease,
      background-color 0.3s ease;
  }

  .bar1 {
    top: 0;
  }

  .bar2 {
    top: 50%;
    transform: translateY(-50%);
  }

  .bar3 {
    bottom: 0;
  }

  .hamburger-icon.open .bar1 {
    transform: translateY(8px) rotate(45deg);
  }

  .hamburger-icon.open .bar2 {
    opacity: 0;
  }

  .hamburger-icon.open .bar3 {
    transform: translateY(-8px) rotate(-45deg);
  }

  @media (max-width: 520px) {
    h1 {
      font-size: 30px;
    }
  }
`;
