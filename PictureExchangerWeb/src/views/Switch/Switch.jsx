import React from "react";
import classes from "./Switch.module.css";

const Switch = ({ value, setValue }) => {
  const click = () => {
    setValue(!value);
  };

  return (
    <button
      className={[
        classes.body,
        value ? classes.bodyTrue : classes.bodyFalse,
      ].join(" ")}
      onClick={click}
    >
      <div
        className={[
          classes.lever,
          value ? classes.leverTrue : classes.leverFalse,
        ].join(" ")}
      ></div>
    </button>
  );
};

export default Switch;
