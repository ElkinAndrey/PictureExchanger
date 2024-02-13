import React from "react";
import classes from "./BigLoader.module.css";

const BigLoader = (params) => {
  return (
    <div {...params}>
      <div className={classes.customLoader}></div>
    </div>
  );
};

export default BigLoader;
