import React from "react";
import "../App.css";
const Spinner = () => {
  return (
    <div className="d-flex justify-content-center bg-black spinner">
      <div
        className="spinner-border"
        style={{ width: "4rem", height: "4rem", marginTop: "16rem" }}
        role="status"
      >
        <span>Loading...</span>
      </div>
      <p className="spinner-text">잠시 기다려 주세요..</p>
    </div>
  );
};

export default Spinner;
