import React, { useState } from "react";
import classes from "./Input.module.css";
import If from "../../shared/If/If";

/** Поле для ввода */
const Input = ({
  value,
  setValue,
  placeholder = "",
  className,
  style,
  isPassword = false,
  error = false,
}) => {
  const [isFocus, isFocusChange] = useState(false);
  const [show, showChange] = useState(!isPassword);

  return (
    <div className={className} style={style}>
      <div className={classes.body}>
        <div
          className={
            isFocus || value !== ""
              ? classes.placeholderFocus
              : classes.placeholder
          }
        >
          {placeholder}
        </div>
        <input
          className={classes.input}
          value={value}
          style={error ? { outline: "10px solid black" } : {}}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => isFocusChange(true)}
          onBlur={() => isFocusChange(false)}
          type={show ? "text" : "password"}
        />
      </div>
      <If value={isPassword}>
        <div className={classes.checkboxBody}>
          <input
            checked={show}
            onChange={() => showChange(!show)}
            type="checkbox"
            className={classes.checkbox}
          />
          <div
            className={classes.checkboxName}
            onClick={() => showChange(!show)}
          >
            Показать пароль
          </div>
        </div>
      </If>
    </div>
  );
};

export default Input;
