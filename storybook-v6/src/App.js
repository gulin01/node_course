import "./App.css";
import React, { useEffect, useRef } from "react";
import Input from "./components/Input";
import FRParentInput from "./FRParentInput";
function App() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  const firstKeyDown = (e) => {
    if (e.key === "Enter") {
      lastNameRef.current.focus();
    }
  };
  const lastKeyDown = (e) => {
    if (e.key === "Enter") {
      submitRef.current.focus();
    }
  };
  const submitKeyDown = () => {
    alert("form submitted");
  };
  return (
    <div className="App">
      {/* <FRParentInput /> */}
      <header className="App-header">
        <Input
          type="text"
          placeholder="Enter first name"
          ref={firstNameRef}
          onKeyDown={firstKeyDown}
        />
        <Input
          type="text"
          placeholder="Enter last name"
          ref={lastNameRef}
          onKeyDown={lastKeyDown}
        />
        <button ref={submitRef} onKeyDown={submitKeyDown}>
          Submit
        </button>
      </header>
    </div>
  );
}

export default App;
