import React from "react";

const Modal = ({ children, className, closeModal }) => {
  return (
    <div className={`modal-container`}>
      <div className={`modal-background`} onClick={closeModal}>
        <div
          className={`modal-content ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const ModalHeader = ({ className, children }) => {
  return (
    <div className={`modal-header ${className} text-slate-200 bg-gray-950 p-4`}>
      {children}
    </div>
  );
};

export default Modal;
