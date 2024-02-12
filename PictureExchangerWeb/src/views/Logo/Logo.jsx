import React from "react";
import classes from "./Logo.module.css";
import { Link } from "react-router-dom";

const Logo = (params) => {
  return (
    <div {...params}>
      <Link className={classes.body} to={"/"}>
        <img className={classes.image} src="/images/logo.png" alt="PE" />
        <div className={classes.text}>Picture Exchanger</div>
      </Link>
    </div>
  );
};

export default Logo;
