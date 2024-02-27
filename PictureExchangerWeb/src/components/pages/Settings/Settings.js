import React, { useEffect, useState } from "react";
import useFetching from "../../../hooks/useFetching";
import SettingsApi from "../../../api/settingsApi";
import LeftMenu from "../../layout/LeftMenu/LeftMenu";
import classes from "./Settings.module.css";
import getDateTime from "../../../utils/getDateTime";
import UserCell from "../../../views/UserCell/UserCell";
import Switch from "../../../views/Switch/Switch";

const Settings = () => {
  const [settings, settingsChange] = useState();

  const [fetchGetSettings, isLoadingGetSettings, errorGetSettings] =
    useFetching(async () => {
      const response = await SettingsApi.get();
      settingsChange(response.data);
    });

  useEffect(() => {
    fetchGetSettings();
  }, []);

  const Container = ({ name, text, src }) => {
    return (
      <button className={classes.container}>
        <div className={classes.containerImage}>
          <img className={classes.containerImage} src={src} alt="" />
          <div>{name}</div>
        </div>
        <div>{text}</div>
      </button>
    );
  };

  return (
    <LeftMenu>
      <div className={classes.body}>
        <div className={classes.logo}>Настройки</div>
        <UserCell
          name={settings?.name}
          date={getDateTime(settings?.registrationDate)}
          email={settings?.email}
        />
      </div>
      <div className={classes.body}>
        <Container
          name={"Имя"}
          text={settings?.name}
          src="/images/profile.png"
        />
        <Container
          name={"Email"}
          text={settings?.email}
          src="/images/email.png"
        />
        <Container name={"Роль"} text={settings?.role} src="/images/role.png" />
      </div>
      <div className={classes.body}>
        <Container
          name={"Скрыт ли Email"}
          text={<Switch value={settings?.isEmailHidden} setValue={() => {}} />}
          src="/images/hiddenEmail.png"
        />
        <Container
          name={"Скрыта ли дата регистрации"}
          text={
            <Switch
              value={settings?.isRegistrationDateHidden}
              setValue={() => {}}
            />
          }
          src="/images/hiddenDate.png"
        />
      </div>
    </LeftMenu>
  );
};

export default Settings;
