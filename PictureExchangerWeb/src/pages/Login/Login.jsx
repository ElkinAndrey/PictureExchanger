import React, { useContext, useEffect, useState } from "react";
import useFetching from "../../hooks/useFetching";
import AuthApi from "../../api/authApi";
import classes from "./Login.module.css";
import Center from "../../layout/Center/Center";
import authService from "../../utils/AuthService";
import If from "../../shared/If/If";
import Input from "../../shared/Input/Input";
import LoadButton from "../../shared/LoadButton/LoadButton";
import LinkButton from "../../shared/LinkButton/LinkButton";
import Context from "../../context/context";
import serverNotRespondingError from "../../constants/serverNotRespondingError";

/** Страница с входом в аккаунт */
const Login = () => {
  // КОНСТАНТЫ
  const { addNotification } = useContext(Context);

  // ПЕРЕМЕННЫЕ
  const [nameOrEmail, nameOrEmailChange] = useState("");
  const [password, passwordChange] = useState("");

  const loginCallback = async () => {
    const params = {
      nameOrEmail: nameOrEmail,
      password: password,
    };
    const response = await AuthApi.login(params);
    authService.login(response.data);
  };

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ
  const [fetchLogin, isLoadingLogin, errorLogin] = useFetching(loginCallback);

  // ЭФФЕКТЫ
  useEffect(() => {
    if (errorLogin !== null && errorLogin?.response === undefined)
      addNotification(serverNotRespondingError);
  }, [errorLogin]);

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
          <LoadButton
            text={"Войти"}
            onClick={fetchLogin}
            load={isLoadingLogin}
          />
          <LinkButton to={"/"} text={"На главную"} />
        </div>
      </div>
    </Center>
  );
};

export default Login;
