import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ModalUnstyled = ({ className, children, onClose, show }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  return (
    <div
      className={`${className}${visible ? " visible" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setVisible(false);
          onClose();
        }
      }}
    >
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export const Modal = styled(ModalUnstyled)`
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

  &.visible {
    opacity: 1 !important;
    visibility: visible !important;
  }

  .modal-content {
    background-color: #292929;
    padding: 15px;
    border-radius: 10px;
    position: relative;
    max-width: 30%;
    min-width: 350px;
    max-height: 90%;
    overflow: auto;
    transform: translateY(-50px);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  &.visible > .modal-content {
    transform: translateY(0) !important;
    opacity: 1 !important;
  }

`;
