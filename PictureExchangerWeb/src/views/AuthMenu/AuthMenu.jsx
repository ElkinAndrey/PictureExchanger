import React from "react";
import classes from "./AuthMenu.module.css";
import { Link } from "react-router-dom";

const AuthMenu = () => {
  return (
    <div>
      <Link className={classes.login} to={"/login"}>
        Вход
      </Link>
      <Link className={classes.register} to={"/register"}>
        Регистрация
      </Link>
    </div>
  );
};

export default AuthMenu;
