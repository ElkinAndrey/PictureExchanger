import React, { useState } from "react";
import useFetching from "../../../hooks/useFetching";
import AuthApi from "../../../api/authApi";
import Center from "../../layout/Center/Center";
import classes from "./Register.module.css";
import Input from "../../forms/Input/Input";
import Loader from "../../forms/Loader/Loader";
import { Link } from "react-router-dom";
import If from "../../../views/If/If";
import authService from "../../../utils/AuthService";

const Register = () => {
  // ПЕРЕМЕННЫЕ
  const [name, nameChange] = useState("");
  const [email, emailChange] = useState("");
  const [password, passwordChange] = useState("");

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ

  /** Зарегистрироваться */
  const [fetchRegister, isLoadingRegister, errorRegister] = useFetching(
    async (p) => {
      const response = await AuthApi.register(p);
      authService.login(response.data);
    }
  );

  // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

  /** Зарегистрироваться */
  const register = () => {
    fetchRegister({
      name: name,
      email: email,
      password: password,
    });
  };

  return (
    <Center>
      <div className={classes.body}>
        <div className={classes.logo}>Регистрация</div>
        <Input
          className={classes.inputName}
          value={name}
          setValue={nameChange}
          placeholder="Имя"
        />
        <Input
          className={classes.inputEmail}
          value={email}
          setValue={emailChange}
          placeholder="Email"
        />
        <Input
          className={classes.inputPassword}
          value={password}
          setValue={passwordChange}
          placeholder="Пароль"
          isPassword={true}
        />
        <If value={!!errorRegister}>
          <div className={classes.error}>{errorRegister?.response?.data}</div>
        </If>

        <div className={classes.buttons}>
          <button className={classes.button} onClick={register}>
            {isLoadingRegister ? <Loader /> : <div>Зарегистрироваться</div>}
          </button>
          <Link className={classes.button} to="/" draggable="false">
            На главную
          </Link>
        </div>
      </div>
    </Center>
  );
};

export default Register;
