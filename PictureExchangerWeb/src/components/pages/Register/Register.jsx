import React, { useContext, useState } from "react";
import InputString from "../../../views/InputString/InputString";
import useFetching from "../../../hooks/useFetching";
import AuthApi from "../../../api/authApi";
import login from "../../../utils/login";
import Context from "../../../context/context";

const Register = () => {
  // КОНСТАНТЫ
  const { params, paramsChange } = useContext(Context);

  // ПЕРЕМЕННЫЕ
  const [name, nameChange] = useState("");
  const [email, emailChange] = useState("");
  const [password, passwordChange] = useState("");

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ

  /** Зарегистрироваться */
  const [fetchRegister, isLoadingRegister, errorRegister] = useFetching(
    async (p) => {
      const response = await AuthApi.register(p);
      login(response.data, params, paramsChange);
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
    <div>
      <h1>Зарегистрироваться</h1>
      <InputString value={name} valueChange={nameChange} text="Имя" />
      <InputString value={email} valueChange={emailChange} text="Email" />
      <InputString
        value={password}
        valueChange={passwordChange}
        text="Пароль"
      />
      <button onClick={register}>Зарегистрироваться</button>
    </div>
  );
};

export default Register;
