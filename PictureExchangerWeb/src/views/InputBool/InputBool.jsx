import React from "react";

const InputBool = ({ value, valueChange, text }) => {
  return (
    <div>
      <label>{text}</label>
      <input
        type="checkbox"
        checked={value}
        onChange={() => {
          valueChange(!value);
        }}
      />
    </div>
  );
};

export default InputBool;
