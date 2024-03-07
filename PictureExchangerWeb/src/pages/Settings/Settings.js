import React, { useContext, useEffect, useState } from "react";
import useFetching from "../../hooks/useFetching";
import SettingsApi from "../../api/settingsApi";
import LeftMenu from "../../layout/LeftMenu/LeftMenu";
import classes from "./Settings.module.css";
import getDateTime from "../../utils/getDateTime";
import UserCell from "../../widgets/UserCell/UserCell";
import Policy from "../../utils/policy";
import Context from "../../context/context";
import Switch from "../../shared/Switch/Switch";
import Input from "../../shared/Input/Input";
import Modal from "../../shared/Modal/Modal";
import LoadButton from "../../shared/LoadButton/LoadButton";

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
  const { params, paramsChange } = useContext(Context);

  const [isOpenName, isOpenNameChange] = useState(false);
  const [isOpenEmail, isOpenEmailChange] = useState(false);
  const [isOpenPassword, isOpenPasswordChange] = useState(false);

  const [settings, settingsChange] = useState({});
  const [name, nameChange] = useState("");
  const [email, emailChange] = useState("");
  const [password, passwordChange] = useState("");
  const [newPassword, newPasswordChange] = useState("");

  const [fetchGetSettings, isLoadingGetSettings, errorGetSettings] =
    useFetching(async () => {
      const response = await SettingsApi.get();
      const data = response.data;
      nameChange(data.name);
      emailChange(data.email);
      settingsChange(response.data);
    });

  const [
    fetchChangeIsEmailHidden,
    isLoadingChangeIsEmailHidden,
    errorChangeIsEmailHidden,
  ] = useFetching(async (value) => {
    await SettingsApi.changeParams({
      isEmailHidden: value,
      isRegistrationDateHidden: null,
    });
    settings.isEmailHidden = value;
    settingsChange({ ...settings });
  });

  const [
    fetchChangeIsRegistrationDateHidden,
    isLoadingChangeIsRegistrationDateHidden,
    errorChangeIsRegistrationDateHidden,
  ] = useFetching(async (value) => {
    await SettingsApi.changeParams({
      isEmailHidden: null,
      isRegistrationDateHidden: value,
    });
    settings.isRegistrationDateHidden = value;
    settingsChange({ ...settings });
  });

  const [fetchChangeEmail, isLoadingChangeEmail, errorChangeEmail] =
    useFetching(async () => {
      await SettingsApi.changeEmail(email);
      isOpenEmailChange(false);
      settings.email = email;
      settingsChange({ ...settings });
      params.email = email;
      paramsChange(params);
    });

  const [fetchChangeName, isLoadingChangeName, errorChangeName] = useFetching(
    async () => {
      await SettingsApi.changeName(name);
      isOpenNameChange(false);
      settings.name = name;
      settingsChange({ ...settings });
      params.name = name;
      paramsChange(params);
    }
  );

  const [fetchChangePassword, isLoadingChangePassword, errorChangePassword] =
    useFetching(async () => {
      await SettingsApi.changePassword(password, newPassword);
      isOpenPasswordChange(false);
    });

  useEffect(() => {
    fetchGetSettings();
  }, []);

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
            setValue={fetchChangeIsEmailHidden}
            load={isLoadingChangeIsEmailHidden}
          />
        </Container>
        <Container
          name={"Скрыта ли дата регистрации"}
          src="/images/hiddenDate.png"
        >
          <Switch
            value={settings.isRegistrationDateHidden}
            setValue={fetchChangeIsRegistrationDateHidden}
            load={isLoadingChangeIsRegistrationDateHidden}
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
              load={isLoadingChangeName}
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
              load={isLoadingChangeEmail}
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
              load={isLoadingChangePassword}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Settings;
