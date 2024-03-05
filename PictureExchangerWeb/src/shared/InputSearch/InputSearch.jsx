import React from "react";
import classes from "./InputSearch.module.css";

/** Поле для ввода строки поиска */
const InputSearch = ({
  value,
  valueChange,
  update,
  reset,
  style,
  className,
}) => {
  return (
    <div style={style} className={className}>
      <div className={classes.body}>
        <img className={classes.image} src={"/images/search.png"} alt="" />
        <input
          className={classes.input}
          placeholder="Поиск"
          value={value}
          onChange={(e) => {
            valueChange(e.target.value);
          }}
        />
        <button className={classes.button} onClick={update}>
          Обновить
        </button>
        <button className={classes.button} onClick={reset}>
          Сбросить
        </button>
      </div>
    </div>
  );
};

export default InputSearch;
