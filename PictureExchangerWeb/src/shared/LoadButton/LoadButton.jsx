import React from "react";
import classes from "./LoadButton.module.css";
import If from "../../shared/If/If";
import Loader from "../Loader/Loader";

/** Кнопка с загрузкой */
const LoadButton = ({
  text,
  onClick,
  disabled,
  load = false,
  className,
  style,
  width = "auto",
}) => {
  const click = () => {
    if (!load) onClick();
  };

  return (
    <div className={className} style={style}>
      <button
        onClick={click}
        disabled={disabled}
        className={classes.button}
        style={{ width: width }}
      >
        <If value={load}>
          <Loader className={classes.loader} />
        </If>
        <div className={load ? classes.textHidden : classes.text}>{text}</div>
      </button>
    </div>
  );
};

export default LoadButton;
