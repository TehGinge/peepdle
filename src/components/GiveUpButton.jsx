import React from "react";


export const GiveUpButton = ({ onClick }) => {
  return (
    <button className="give-up-button" onClick={onClick}>
      Give Up?
    </button>
  );
};
