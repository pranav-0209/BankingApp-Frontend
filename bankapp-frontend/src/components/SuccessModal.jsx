import React from "react";
import "./SuccessModal.css";

const SuccessModal = ({ message, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close" onClick={onClose}>
          &times;
        </button>
        <div className="page-body">
         
          <div style={{ textAlign: "center" }}>
            <div className="checkmark-circle">
              <div className="background"></div>
              <div className="checkmark draw"></div>
            </div>
          </div>
           <div className="head">
            <h3 style={{ marginTop: "20px" }}>Success!</h3>
            <h4>{message}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;