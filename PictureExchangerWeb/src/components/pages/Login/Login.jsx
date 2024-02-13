import React, { useContext, useState } from "react";
import Context from "../../../context/context";
import useFetching from "../../../hooks/useFetching";
import AuthApi from "../../../api/authApi";
import login from "../../../utils/login";
import Input from "../../forms/Input/Input";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import Center from "../../layout/Center/Center";
import If from "../../../views/If/If";
import Loader from "../../forms/Loader/Loader";

const Login = () => {
  // КОНСТАНТЫ
  const { params, paramsChange } = useContext(Context);

  // ПЕРЕМЕННЫЕ
  const [nameOrEmail, nameOrEmailChange] = useState("");
  const [password, passwordChange] = useState("");

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ

  /** Зарегистрироваться */
  const [fetchLogin, isLoadingLogin, errorLogin] = useFetching(async (p) => {
    const response = await AuthApi.login(p);
    login(response.data, params, paramsChange);
  });

  // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

  /** Зарегистрироваться */
  const log = () => {
    if (isLoadingLogin) return;
    fetchLogin({
      nameOrEmail: nameOrEmail,
      password: password,
    });
  };

  return (
    <Center>
      <div className={classes.body}>
        <div className={classes.logo}>Войти</div>

        <Input
          className={classes.inputNameOrEmail}
          value={nameOrEmail}
          setValue={nameOrEmailChange}
          placeholder="Имя или Email"
        />
        <Input
          className={classes.inputPassword}
          value={password}
          setValue={passwordChange}
          placeholder="Пароль"
          isPassword={true}
        />
        <If value={!!errorLogin}>
          <div className={classes.error}>{errorLogin?.response?.data}</div>
        </If>

        <div className={classes.buttons}>
          <button className={classes.button} onClick={log}>
            {isLoadingLogin ? <Loader /> : <div>Войти</div>}
          </button>
          <Link className={classes.button} to="/" draggable="false">
            На главную
          </Link>
        </div>
      </div>
    </Center>
  );
};

export default Login;
