import React from "react";
import classes from "./LinkButton.module.css";
import { Link } from "react-router-dom";

const LinkButton = ({ text, to, ...props }) => {
  return (
    <div {...props}>
      <div className={classes.body}>
        <Link className={classes.button} to={to} draggable={false}>
          {text}
        </Link>
      </div>
    </div>
  );
};

export default LinkButton;
