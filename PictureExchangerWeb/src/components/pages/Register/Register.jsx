import React, { useContext, useState } from "react";
import InputString from "../../../views/InputString/InputString";
import useFetching from "../../../hooks/useFetching";
import AuthApi from "../../../api/authApi";
import login from "../../../utils/login";
import Context from "../../../context/context";

const Register = () => {
  // КОНСТАНТЫ
  const baseParams = {
    name: "",
    email: "",
    password: "",
  };
  const { params, paramsChange } = useContext(Context);

  // ПЕРЕМЕННЫЕ
  const [registerParams, registerParamsChange] = useState({ ...baseParams });

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ

  /** Зарегистрироваться */
  const [fetchRegister, isLoadingRegister, errorRegister] = useFetching(
    async (p) => {
      const response = await AuthApi.register(p);
      login(response.data, params, paramsChange);
    }
  );

  // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

  /** Изменить имя */
  const paramsNameChange = (value) => {
    registerParams.name = value;
    registerParamsChange({ ...registerParams });
  };

  /** Изменить Email */
  const paramsEmailChange = (value) => {
    registerParams.email = value;
    registerParamsChange({ ...registerParams });
  };

  /** Изменить пароль */
  const paramsPasswordChange = (value) => {
    registerParams.password = value;
    registerParamsChange({ ...registerParams });
  };

  /** Зарегистрироваться */
  const register = () => {
    fetchRegister(registerParams);
  };

  return (
    <div>
      <h1>Зарегистрироваться</h1>
      <InputString
        value={registerParams.name}
        valueChange={paramsNameChange}
        text="Имя"
      />
      <InputString
        value={registerParams.email}
        valueChange={paramsEmailChange}
        text="Email"
      />
      <InputString
        value={registerParams.password}
        valueChange={paramsPasswordChange}
        text="Пароль"
      />
      <button onClick={register}>Зарегистрироваться</button>
    </div>
  );
};

export default Register;
