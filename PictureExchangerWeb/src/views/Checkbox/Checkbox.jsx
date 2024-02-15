import React from "react";
import classes from "./Checkbox.module.css";

const Checkbox = ({ value, setValue, text, className, style }) => {
  const changeValue = () => {
    setValue(!value);
  };

  return (
    <div className={className} style={style}>
      <div className={classes.body}>
        <input
          type="checkbox"
          checked={value}
          onChange={changeValue}
          className={classes.checkbox}
        />
        <div onClick={changeValue} className={classes.text}>
          {text}
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
