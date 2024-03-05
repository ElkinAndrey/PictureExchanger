import React from "react";
import classes from "./InputSearch.module.css";
import LoadButton from "../LoadButton/LoadButton";

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
        <LoadButton
          text={"Обновить"}
          onClick={update}
          className={classes.button}
        />
        <LoadButton
          text={"Сбросить"}
          onClick={reset}
          className={classes.button}
        />
      </div>
    </div>
  );
};

export default InputSearch;
