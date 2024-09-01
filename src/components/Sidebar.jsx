import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { UnlimitedModal } from "./UnlimitedModal";
import githubLogo from "../assets/github-mark-white.png";

const SidebarUnstyled = ({
  className,
  menuVisible,
  totalEligibleWordsCount,
  totalExcludedWordsCount,
  setMaxWordLength,
  maxWordLength,
  toggleMenu,
  personalBest,
  hamburgerRef,
  skipEnabled,
  setSkipEnabled,
  winStreak,
  resetStreak,
  showUnlimitedModal,
  setShowUnlimitedModal,
  setSkips,
}) => {
  const wrapperRef = useRef();
  const [showInfo, setShowInfo] = useState(false);
  const handleMouseEnter = () => setShowInfo(true);
  const handleMouseLeave = () => setShowInfo(false);
  const handleToggleInfo = () => setShowInfo(!showInfo);
  const handleCloseInfo = () => setShowInfo(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuVisible &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target) // Check if the click is not on the hamburger icon
      ) {
        toggleMenu();
      }
      // Hide info text when clicking outside of it
      if (
        showInfo &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setShowInfo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleMenu, menuVisible, hamburgerRef, showInfo]);

  const handleToggleChange = (e) => {
    if (winStreak >= 1) {
      setShowUnlimitedModal(true);
    } else {
      setSkipEnabled(e.target.checked);
    }
  };

  const handleGiveUp = () => {
    resetStreak();
    setSkips(3);
    setSkipEnabled(!skipEnabled);
    setShowUnlimitedModal(false);
  };

  const handleCloseModal = () => {
    setShowUnlimitedModal(false);
  };

  return (
<div className={`${className} ${menuVisible ? "visible" : ""}`}>
  <div className="sidebar-wrapper" ref={wrapperRef}>
    <div className="number-container-wrapper">
      <div className="max-word-container">
        <span className="max-word-label">Max Word Length:</span>
        <input
          type="range"
          min="4"
          max="15"
          value={maxWordLength}
          onChange={(e) => setMaxWordLength(parseInt(e.target.value))}
          className="max-word-slider"
        />
        <span className="max-word-value">{maxWordLength}</span>
      </div>
      <div
        className="eligible-word-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="eligible-label">Word Count:</span>
        <span
          className="info-icon"
          onClick={handleToggleInfo}
        >
          ?
        </span>
        <span className="eligible-value">
          {`${totalEligibleWordsCount} / ${158518}`}
        </span>
        {showInfo && (
          <div className="info-text">
            <span
              className="close-button"
              onClick={handleCloseInfo}
            >
              &times;
            </span>
            (No. of eligible words) / (No. of words in Peep Show) <br /><br />
            Common words and names are excluded.
          </div>
        )}
      </div>
      <div className="personal-best-container">
        <span className="personal-best-label">Personal Best:</span>
        <span className="personal-best-value">{personalBest}</span>
      </div>
      <div className="toggle-container">
        {showUnlimitedModal && (
          <UnlimitedModal
            className={showUnlimitedModal ? "visible" : ""}
            handleGiveUp={handleGiveUp}
            handleCloseModal={handleCloseModal}
          />
        )}
        <span className="toggle-label">Unlimited Skips:</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={skipEnabled}
            onChange={handleToggleChange}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
    <div className="footer">
      <a
        className="github-link"
        href="https://github.com/TehGinge/peepdle"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>by TehGinge</span>
        <img
          className="github-logo"
          src={githubLogo}
          alt="GitHub"
          width="12"
          height="12"
        />
      </a>
      <div className="credits">
        <p>Credit to:</p>
        <ul>
          <li>
            <a
              className="github-link"
              href="https://github.com/tomaustin700/PeepQuote"
              target="_blank"
              rel="noopener noreferrer"
            >
              PeepQuote API
              <img
                className="github-logo"
                src={githubLogo}
                alt="GitHub"
                width="12"
                height="12"
              />
            </a>
          </li>
          <li>
            <a
              href="https://peepshow.gifglobe.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Peep Show GifGlobe
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
  );
};

export const Sidebar = styled(SidebarUnstyled)`
  position: fixed;
  top: 1;
  left: 0;
  width: 300px;
  height: 100%;
  background-color: rgb(36, 36, 36);
  z-index: 90;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  overflow: hidden;
  padding: 20px;

  &.visible {
    transform: translateX(0);
  }

  .eligible-word-container {
  position: relative;
  display: flex;
  align-items: center;
}

.eligible-value {
  margin-left: 5px;
}

.info-icon {
  cursor: pointer;
  margin-right: 5px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #007bff;
  transition: color 0.3s;
}

.info-icon:hover {
  color: #0056b3;
}

.info-text {
  font-size: 0.9rem;
  color: #666;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  width: 280px;
  z-index: 10;
  position: absolute;
  top: -80px;
  left: 0px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.close-button {
  position: absolute;
  top: 2px;
  right: 5px;
  cursor: pointer;
  font-weight: bold;
  color: #999;
}

  .sidebar-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 97%;
  }

  .footer {
    width: 100%;
    height: 120px;
    margin-top: auto;
    font-size: 14px;
    text-align: center;
    border-radius: 5px;
    background-color: rgb(49, 48, 48);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .img {
    padding: 100px;
  }

  .footer a {
    color: #0099ff;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer a:hover {
    color: #00ccff;
  }

  .github-link {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .github-logo {
    padding: 5px;
  }

  .credits .github-logo {
    padding: 5px;
  }

  .credits ul {
    padding-left: 0;
    list-style-type: none;
  }

  .credits li {
    margin-bottom: 10px;
  }

  .personal-best-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .eligible-value {
    background-color: rgb(78, 78, 78);
    border-radius: 10px;
    padding: 2px 4px;
    font-size: 18px;
    text-align: center;
    color: #ffffff;
  }

  .personal-best-value {
    background-color: rgb(78, 78, 78);
    border-radius: 10px;
    padding: 2px 6px;
    font-size: 18px;
    color: #ffffff;
  }

  .eligible-word-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .max-word-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    padding-bottom: 10px;
  }

  .max-word-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .max-word-value {
    background-color: rgb(78, 78, 78);
    border-radius: 10px;
    padding: 2px 6px;
    font-size: 22px;
    color: #ffffff;
  }

  .max-word-slider {
    width: 100%;
    margin-top: 5px;
    align-items: center;
  }

  .number-container-wrapper {
    display: flex;
    flex-direction: column-reverse;
    flex-grow: 1;
    width: 100%;
    height: calc(100% - 20px);
    font-size: 19px;
  }

  .number-label {
    color: #ffffff;
  }

  .number-value {
    background-color: rgb(78, 78, 78);
    border-radius: 10px;
    padding: 2px 6px;
    font-size: 22px;
    color: #ffffff;
  }

  .toggle-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.toggle-label {
  margin-right: 8px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px; 
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:checked + .slider:before {
  transform: translateX(20px);
}

.slider.round {
  border-radius: 26px;
}

.slider.round:before {
  border-radius: 50%;
}


  @media (max-width: 768px) {
    width: 65%;
    /* height: auto;
    padding: 15px;
    position: relative;
    transform: none; */

    &.visible {
      transform: none;
    }

    .number-container-wrapper {
      /* height: auto;
      flex-grow: 0; */
    }

    .number-container,
    .max-word-container {
      /* flex-basis: 50%;
      margin-bottom: 15px; */
    }
  }
`;

export default Sidebar;
