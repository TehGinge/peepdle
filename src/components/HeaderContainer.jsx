import React, { useState, useRef } from "react";
import styled from "styled-components";
import "../fonts/fonts.css";

const HeaderUnstyled = ({
  className,
  winStreak,
  menuVisible,
  toggleMenu,
  hamburgerRef,
}) => {
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
          <div
            className="hamburger-menu"
            onClick={toggleMenu}
            ref={hamburgerRef}
          >
            <div className={`hamburger-icon ${menuVisible ? "open" : ""}`}>
              <span className="bar bar1"></span>
              <span className="bar bar2"></span>
              <span className="bar bar3"></span>
            </div>
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2000;

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
    width: 56px;
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
    flex-wrap: wrap;
  }

  h1 {
    padding-right: 5px;
    padding-left: 5px;
    font-size: 40px;
    margin: 5px 0;
    font-family: "ITC Bauhaus Heavy";
  }

  .hamburger-icon {
    transition: transform 0.3s ease;
    position: relative;
    width: 42px;
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
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px;
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
