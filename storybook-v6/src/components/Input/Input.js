import React from "react";
import "./Input.css";
// creating component
function Input({ size = "medium", ...rest }) {
  return <input className={`input ${size}`} {...rest} />;
}

export default Input;
