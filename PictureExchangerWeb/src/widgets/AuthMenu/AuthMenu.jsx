import React from "react";
import classes from "./AuthMenu.module.css";
import { Link } from "react-router-dom";
import LinkButton from "../../shared/LinkButton/LinkButton";

/** Меню сверху для авторизации */
const AuthMenu = () => {
  return (
    <div className={classes.body}>
      <LinkButton text={"Вход"} to={"/login"} className={classes.login} />
      <LinkButton text={"Регистрация"} to={"/register"} />
    </div>
  );
};

export default AuthMenu;
