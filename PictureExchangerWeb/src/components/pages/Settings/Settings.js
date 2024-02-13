import React, { useEffect, useState } from "react";
import useFetching from "../../../hooks/useFetching";
import SettingsApi from "../../../api/settingsApi";
import LeftMenu from "../../layout/LeftMenu/LeftMenu";

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
  return (
    <LeftMenu>
      {settings && (
        <div>
          <div>{`Id: ${settings.id}`}</div>
          <div>{`Имя: ${settings.name}`}</div>
          <div>{`Email: ${settings.email}`}</div>
          <div>{`Роль: ${settings.role}`}</div>
          <div>{`Дата регистрации: ${settings.registrationDate}`}</div>
          <div>{`Забанен ли: ${
            settings.isBanned
              ? `Забанен (${settings.bannedDate})`
              : "Не забанен"
          }`}</div>
          <div>{`Скрыт ли Email: ${
            settings.isEmailHidden ? "Скрыт" : "Не скрыт"
          }`}</div>
          <div>{`Скрыта ли дата регистрации: ${
            settings.isRegistrationDateHidden ? "Скрыта" : "Не скрыта"
          }`}</div>
        </div>
      )}
    </LeftMenu>
  );
};

export default Settings;
