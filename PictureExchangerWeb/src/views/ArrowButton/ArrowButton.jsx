import React from "react";
import classes from "./ArrowButton.module.css";

const ArrowButton = ({ className, style, onClick, left = false }) => {
  return (
    <div className={className} style={style}>
      <button
        className={classes.button}
        onClick={onClick}
        style={left ? { padding: "10px 2px 10px 7px" } : {}}
      >
        <div
          className={classes.arrow}
          style={left ? { transform: "rotate(45deg)" } : {}}
        ></div>
      </button>
    </div>
  );
};

export default ArrowButton;
