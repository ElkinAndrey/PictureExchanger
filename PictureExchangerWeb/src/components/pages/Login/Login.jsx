import React, { useContext, useState } from "react";
import InputString from "../../../views/InputString/InputString";
import Context from "../../../context/context";
import useFetching from "../../../hooks/useFetching";
import AuthApi from "../../../api/authApi";
import login from "../../../utils/login";

const Login = () => {
  // КОНСТАНТЫ
  const baseParams = {
    nameOrEmail: "",
    password: "",
  };
  const { params, paramsChange } = useContext(Context);

  // ПЕРЕМЕННЫЕ
  const [loginParams, loginParamsChange] = useState({ ...baseParams });

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ

  /** Зарегистрироваться */
  const [fetchLogin, isLoadingLogin, errorLogin] = useFetching(async (p) => {
    const response = await AuthApi.login(p);
    login(response.data, params, paramsChange);
  });

  // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

  /** Изменить имя */
  const paramsNameOrEmailChange = (value) => {
    loginParams.nameOrEmail = value;
    loginParamsChange({ ...loginParams });
  };

  /** Изменить пароль */
  const paramsPasswordChange = (value) => {
    loginParams.password = value;
    loginParamsChange({ ...loginParams });
  };

  /** Зарегистрироваться */
  const log = () => {
    fetchLogin(loginParams);
  };

  return (
    <div>
      <h1>Войти</h1>
      <InputString
        value={loginParams.nameOrEmail}
        valueChange={paramsNameOrEmailChange}
        text="Имя или Email"
      />
      <InputString
        value={loginParams.password}
        valueChange={paramsPasswordChange}
        text="Пароль"
      />
      <button onClick={log}>Войти</button>
    </div>
  );
};

export default Login;
