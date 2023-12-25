import React from "react";

const InputString = ({ value, valueChange, text = "" }) => {
  return (
    <div>
      <label>{text}</label>
      <input
        value={value}
        onChange={(e) => {
          valueChange(e.target.value);
        }}
      />
    </div>
  );
};

export default InputString;
