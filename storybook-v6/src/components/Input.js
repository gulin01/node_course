import React, { forwardRef } from "react";

const Input = forwardRef(({ type, onKeyDown, placeholder }, ref) => {
  return (
    <input
      type={type}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      ref={ref}
    />
  );
});

export default Input;
