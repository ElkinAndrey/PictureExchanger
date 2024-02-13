import React from "react";
import classes from "./Center.module.css";

const Center = ({ children, style }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.second}>
        <div style={style} className={classes.third}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Center;
