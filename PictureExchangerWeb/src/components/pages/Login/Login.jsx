import React, { useContext, useState } from "react";
import InputString from "../../../views/InputString/InputString";
import Context from "../../../context/context";
import useFetching from "../../../hooks/useFetching";
import AuthApi from "../../../api/authApi";
import login from "../../../utils/login";

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
    fetchLogin({
      nameOrEmail: nameOrEmail,
      password: password,
    });
  };

  return (
    <div>
      <h1>Войти</h1>
      <InputString
        value={nameOrEmail}
        valueChange={nameOrEmailChange}
        text="Имя или Email"
      />
      <InputString
        value={password}
        valueChange={passwordChange}
        text="Пароль"
      />
      <button onClick={log}>Войти</button>
    </div>
  );
};

export default Login;
