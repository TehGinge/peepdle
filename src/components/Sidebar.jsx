import React, { useRef, useEffect } from "react";
import styled from "styled-components";

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
}) => {
  const wrapperRef = useRef();

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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleMenu, menuVisible, hamburgerRef]);

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
          <div className="number-container">
            <span className="number-label">Total eligible words:</span>
            <span className="number-value">
              {((totalEligibleWordsCount / 158518) * 100).toFixed(2)}%
            </span>
          </div>
          {/* <div className="number-container">
            <span className="number-label">Total excluded words:</span>
            <span className="number-value">{totalExcludedWordsCount}</span>
          </div> */}
          <div className="number-container">
            <span className="number-label">Personal Best:</span>
            <span className="number-value">{personalBest}</span>
          </div>
          <div className="toggle-container">
            <span className="toggle-label">Unlimited Mode:</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={skipEnabled}
                onChange={(e) => setSkipEnabled(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
          </div>
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

  .sidebar-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 97%;
  }

  .footer {
    width: 100%;
    margin-top: auto;
    font-size: 18px;
    text-align: center;
    border-radius: 5px;
    background-color: rgb(49, 48, 48);
  }

  .footer a {
    color: #0099ff;
    text-decoration: none;
  }

  .footer a:hover {
    text-decoration: underline;
  }

  .credits ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .credits li {
    margin-bottom: 5px;
  }

  .number-container {
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
    font-size: 25px;
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
    height: calc(100% - 20px); // Subtract the footer's margin-top
  }

  .number-label {
    color: #ffffff;
  }

  .number-value {
    background-color: rgb(78, 78, 78);
    border-radius: 10px;
    padding: 2px 6px;
    font-size: 25px;
    color: #ffffff;
  }

  .toggle-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }
  .toggle-label {
    margin-right: 10px;
  }

  .switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
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
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
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