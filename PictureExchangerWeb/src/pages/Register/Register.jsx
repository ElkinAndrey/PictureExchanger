import React, { useContext, useEffect, useState } from "react";
import useFetching from "../../hooks/useFetching";
import AuthApi from "../../api/authApi";
import Center from "../../layout/Center/Center";
import classes from "./Register.module.css";
import authService from "../../utils/AuthService";
import If from "../../shared/If/If";
import Input from "../../shared/Input/Input";
import LoadButton from "../../shared/LoadButton/LoadButton";
import LinkButton from "../../shared/LinkButton/LinkButton";
import Context from "../../context/context";
import serverNotRespondingError from "../../constants/serverNotRespondingError";
import notificationStatus from "../../constants/notificationStatus";

/** Страница регистрации */
const Register = () => {
  // КОНСТАНТЫ
  const { addNotification } = useContext(Context);

  // ПЕРЕМЕННЫЕ
  const [name, nameChange] = useState("");
  const [email, emailChange] = useState("");
  const [password, passwordChange] = useState("");

  // ФУНКЦИИ ОТПРАВКИ И ПОЛУЧЕНИЯ ДАННЫХ
  const registerCallback = async () => {
    const params = {
      name: name,
      email: email,
      password: password,
    };
    const response = await AuthApi.register(params);
    authService.login(response.data);
  };

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ
  const [fetchReg, loadReg, errorReg] = useFetching(registerCallback);

  useEffect(() => {
    if (errorReg !== null && errorReg?.response === undefined)
      addNotification(serverNotRespondingError);
  }, [errorReg]);

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
        <If value={!!errorReg}>
          <div className={classes.error}>{errorReg?.response?.data}</div>
        </If>
        <div className={classes.buttons}>
          <LoadButton
            text={"Зарегистрироваться"}
            onClick={fetchReg}
            load={loadReg}
          />
          <LinkButton to={"/"} text={"На главную"} />
        </div>
      </div>
    </Center>
  );
};

export default Register;
