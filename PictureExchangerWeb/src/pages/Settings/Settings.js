import React, { useContext, useEffect, useState } from "react";
import useFetching from "../../hooks/useFetching";
import SettingsApi from "../../api/settingsApi";
import classes from "./Settings.module.css";
import getDateTime from "../../utils/getDateTime";
import UserCell from "../../widgets/UserCell/UserCell";
import Policy from "../../utils/policy";
import Context from "../../context/context";
import Switch from "../../shared/Switch/Switch";
import Input from "../../shared/Input/Input";
import Modal from "../../shared/Modal/Modal";
import LoadButton from "../../shared/LoadButton/LoadButton";
import Loader from "../../shared/Loader/Loader";
import notificationStatus from "../../constants/notificationStatus";

/** Контейнер, на который можно нажать */
const ContainerClick = ({ name, src, children, onClick }) => {
  return (
    <div className={classes.containerClick} onClick={onClick}>
      <div className={classes.containerImage}>
        <img className={classes.containerImage} src={src} alt="" />
        <div>{name}</div>
      </div>
      <div>{children}</div>
    </div>
  );
};

/** Контейнер без нажатия */
const Container = ({ name, src, children }) => {
  return (
    <div className={classes.container}>
      <div className={classes.containerImage}>
        <img className={classes.containerImage} src={src} alt="" />
        <div>{name}</div>
      </div>
      <div>{children}</div>
    </div>
  );
};

/** Страница настроек */
const Settings = () => {
  // КОНСТАНТЫ
  const { addNotification } = useContext(Context);
  const { params, paramsChange } = useContext(Context);

  const [isOpenName, isOpenNameChange] = useState(false);
  const [isOpenEmail, isOpenEmailChange] = useState(false);
  const [isOpenPassword, isOpenPasswordChange] = useState(false);

  const [settings, settingsChange] = useState({});
  const [name, nameChange] = useState("");
  const [email, emailChange] = useState("");
  const [password, passwordChange] = useState("");
  const [newPassword, newPasswordChange] = useState("");

  // КОЛБЭКИ
  const getSettingsCallback = async () => {
    const response = await SettingsApi.get();
    const data = response.data;
    nameChange(data.name);
    emailChange(data.email);
    settingsChange(response.data);
  };

  const changeEmailHiddenCallback = async (value) => {
    await SettingsApi.changeParams({
      isEmailHidden: value,
      isRegistrationDateHidden: null,
    });
    settings.isEmailHidden = value;
    settingsChange({ ...settings });
  };

  const changeRegDateHiddenCallback = async (value) => {
    await SettingsApi.changeParams({
      isEmailHidden: null,
      isRegistrationDateHidden: value,
    });
    settings.isRegistrationDateHidden = value;
    settingsChange({ ...settings });
  };

  const changeEmailCallback = async () => {
    await SettingsApi.changeEmail(email);
    isOpenEmailChange(false);
    settings.email = email;
    settingsChange({ ...settings });
    params.email = email;
    paramsChange(params);
  };

  const changeNameCallback = async () => {
    await SettingsApi.changeName(name);
    isOpenNameChange(false);
    settings.name = name;
    settingsChange({ ...settings });
    params.name = name;
    paramsChange(params);
  };

  const changePasswordCallback = async () => {
    await SettingsApi.changePassword(password, newPassword);
    isOpenPasswordChange(false);
  };

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ
  const [fetchGetSettings, loadGetSettings, errorGetSettings] =
    useFetching(getSettingsCallback);
  const [
    fetchChangeEmailHidden,
    loadChangeEmailHidden,
    errorChangeEmailHidden,
  ] = useFetching(changeEmailHiddenCallback);
  const [
    fetchChangeRegDateHidden,
    loadChangeRegDateHidden,
    errorChangeRegDateHidden,
  ] = useFetching(changeRegDateHiddenCallback);
  const [fetchChangeEmail, loadChangeEmail, errorChangeEmail] =
    useFetching(changeEmailCallback);
  const [fetchChangeName, loadChangeName, errorChangeName] =
    useFetching(changeNameCallback);
  const [fetchChangePassword, loadChangePassword, errorChangePassword] =
    useFetching(changePasswordCallback);

  // ФУНКЦИИ
  const addNotif = (error, baseText) => {
    if (error === null) return;
    if (error?.response === undefined)
      addNotification({
        title: "Ошибка",
        text: baseText,
        status: notificationStatus.error,
      });
    else
      addNotification({
        title: "Ошибка",
        text: error?.response?.data,
        status: notificationStatus?.error,
      });
  };

  // ЭФФЕКТЫ
  useEffect(() => {
    fetchGetSettings();
  }, []);

  useEffect(() => {
    addNotif(
      errorGetSettings,
      "Сервер не отвечает. Не удалось получить данные аккаунта."
    );
  }, [errorGetSettings]);

  useEffect(() => {
    addNotif(
      errorChangeEmailHidden,
      "Сервер не отвечает. Не удалось изменить скрытие электронной почты."
    );
  }, [errorChangeEmailHidden]);

  useEffect(() => {
    addNotif(
      errorChangeRegDateHidden,
      "Сервер не отвечает. Не удалось изменить скрытие даты регистрации."
    );
  }, [errorChangeRegDateHidden]);

  useEffect(() => {
    addNotif(
      errorChangeEmail,
      "Сервер не отвечает. Не удалось изменить электронную почту."
    );
  }, [errorChangeEmail]);

  useEffect(() => {
    addNotif(errorChangeName, "Сервер не отвечает. Не удалось изменить имя.");
  }, [errorChangeName]);

  useEffect(() => {
    addNotif(
      errorChangePassword,
      "Сервер не отвечает. Не удалось изменить имя."
    );
  }, [errorChangePassword]);

  // При загрузке настроек
  if (loadGetSettings)
    return (
      <Loader
        className={classes.loader}
        color={"#4177b5"}
        width={"50px"}
        thickness={"4px"}
      />
    );

  if (errorGetSettings !== null) return <></>;

  return (
    <div>
      <div className={classes.body}>
        <div className={classes.logo}>Настройки</div>
        <UserCell
          name={settings.name}
          date={getDateTime(settings.registrationDate)}
          email={settings.email}
          role={Policy.isManager(settings.role) ? settings.role : null}
        />
      </div>
      <div className={classes.body}>
        <ContainerClick
          name={"Имя"}
          src="/images/profile.png"
          onClick={() => isOpenNameChange(true)}
        >
          {settings.name}
        </ContainerClick>
        <ContainerClick
          name={"Email"}
          src="/images/email.png"
          onClick={() => isOpenEmailChange(true)}
        >
          {settings.email}
        </ContainerClick>
        <ContainerClick
          name={"Пароль"}
          src="/images/email.png"
          onClick={() => isOpenPasswordChange(true)}
        ></ContainerClick>
      </div>
      <div className={classes.body}>
        <Container name={"Скрыт ли Email"} src="/images/hiddenEmail.png">
          <Switch
            value={settings.isEmailHidden}
            setValue={fetchChangeEmailHidden}
            load={loadChangeEmailHidden}
          />
        </Container>
        <Container
          name={"Скрыта ли дата регистрации"}
          src="/images/hiddenDate.png"
        >
          <Switch
            value={settings.isRegistrationDateHidden}
            setValue={fetchChangeRegDateHidden}
            load={loadChangeRegDateHidden}
          />
        </Container>

        <Modal active={isOpenName} setActive={isOpenNameChange}>
          <div className={classes.modal}>
            <div className={classes.modalLogo}>Редактирование имени</div>
            <Input
              value={name}
              setValue={nameChange}
              placeholder="Новое имя"
              className={classes.modalInput}
            />
            <LoadButton
              text="Изменить"
              onClick={fetchChangeName}
              load={loadChangeName}
            />
          </div>
        </Modal>

        <Modal active={isOpenEmail} setActive={isOpenEmailChange}>
          <div className={classes.modal}>
            <div className={classes.modalLogo}>
              Редактирование электронной почты
            </div>
            <Input
              value={email}
              setValue={emailChange}
              placeholder="Новый Email"
              className={classes.modalInput}
            />
            <LoadButton
              text="Изменить"
              onClick={fetchChangeEmail}
              load={loadChangeEmail}
            />
          </div>
        </Modal>

        <Modal active={isOpenPassword} setActive={isOpenPasswordChange}>
          <div className={classes.modal}>
            <div className={classes.modalLogo}>Редактирование пароля</div>
            <Input
              value={password}
              setValue={passwordChange}
              placeholder="Старый пароль"
              className={classes.modalInput}
              isPassword={true}
            />
            <Input
              value={newPassword}
              setValue={newPasswordChange}
              placeholder="Новый пароль"
              className={classes.modalInput}
              isPassword={true}
            />
            <LoadButton
              text="Изменить"
              onClick={fetchChangePassword}
              load={loadChangePassword}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Settings;
