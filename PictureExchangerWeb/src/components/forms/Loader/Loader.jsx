import React from "react";
import classes from "./Loader.module.css";

const Loader = (params) => {
  return (
    <div {...params}>
      <div className={classes.customLoader}></div>
    </div>
  );
};

export default Loader;
