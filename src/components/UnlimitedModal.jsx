import React from "react";
import styled from "styled-components";

const UnlimitedModalUnstyled = ({
  className,
  handleGiveUp,
  handleCloseModal,
}) => {
  return (
    <div className={className}>
      <div className="unlimited-modal-content">
      <div className="text-content">
        <h2>Reset Streak?</h2>
        <p>
          Reset streak and change mode?
        </p>
        </div>
        <div className="unlimited-modal-buttons">
          <button className="cancel" onClick={handleCloseModal}>
            Cancel
          </button>
          <button className="give-up" onClick={handleGiveUp}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export const UnlimitedModal = styled(UnlimitedModalUnstyled)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.1s ease, visibility 0.1s ease;
  padding: 5px;

  &.visible {
    opacity: 1 !important;
    visibility: visible !important;
  }

  .text-content {
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    background-color: #363636;
    padding: 1px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  &.visible > .unlimited-modal-content > .text-content {
    opacity: 1;
    transform: translateY(0);
  }

  .unlimited-modal-content {
    background-color: #292929;
    font-size: 18px;
    padding: 10px;
    border-radius: 10px;
    position: relative;
    width: 85%;
    max-width: 300px;
    max-height: 90%;
    overflow: auto;
    transform: translateY(-50px);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
    text-align: center;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    transform: translateY(-50px) scale(0.8);
  }

  &.visible > .unlimited-modal-content {
    transform: translateY(0) !important;
    opacity: 1 !important;
  }

  .unlimited-modal-content h2 {
    font-size: 20px;
  }

  .unlimited-modal-buttons {
    display: flex;
    justify-content: flex-end;
    padding-top: 10px;
  }

  .give-up,
  .cancel {
    justify-content: flex-start;
    padding: 5px;
    min-width: 75px;
    background-color: #363636;
    border: 2px solid #d9d9d9;
    text-transform: uppercase;
    border-radius: 7px;
    color: #ffffff;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    user-select: none;
  }

  .cancel {
    justify-content: flex-end;
  }

  .give-up {
    color: #f8241d;
  }

  .give-up:hover {
    background-color: #fdfdfd;
  }
  
  .cancel:hover {
    background-color: #fdfdfd;
    color: #000000;
  }
`;
