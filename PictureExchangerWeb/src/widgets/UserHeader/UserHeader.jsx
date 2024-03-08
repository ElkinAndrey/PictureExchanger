import React, { useContext, useEffect } from "react";
import classes from "./UserHeader.module.css";
import getOnlyDate from "../../utils/getOnlyDate";
import If from "../../shared/If/If";
import LoadButton from "../../shared/LoadButton/LoadButton";
import Policy from "../../utils/policy";
import DropDownMenu from "../../shared/DropDownMenu/DropDownMenu";
import Context from "../../context/context";
import UserApi from "../../api/userApi";
import useFetching from "../../hooks/useFetching";
import RoleApi from "../../api/roleApi";
import roles from "../../constants/roles";
import notificationStatus from "../../constants/notificationStatus";

const UserHeader = ({ user }) => {
  // КОНСТАНТЫ
  const { params } = useContext(Context);
  const { addNotification } = useContext(Context);

  // КОЛБЭКИ
  const bannedUserCallback = async (name) => {
    await UserApi.banned(name);
    user.isBanned = true;
  };

  const unbannedUserCallback = async (name) => {
    await UserApi.unbanned(name);
    user.isBanned = false;
  };

  const giveUserCallback = async () => {
    await RoleApi.giveUser(user.name);
    user.role = roles.user;
  };

  const giveManagerCallback = async () => {
    await RoleApi.giveManager(user.name);
    user.role = roles.manager;
  };

  const giveSuperManagerCallback = async () => {
    await RoleApi.giveSuperManager(user.name);
    user.role = roles.superManager;
  };

  const giveAdminCallback = async () => {
    await RoleApi.giveAdmin(user.name);
    user.role = roles.admin;
  };

  const [fetchBannedUser, isLoadingBannedUser, errorBannedUser] =
    useFetching(bannedUserCallback);
  const [fetchUnbannedUser, isLoadingUnbannedUser, errorUnbannedUser] =
    useFetching(unbannedUserCallback);
  const [fetchGiveUser, isLoadingGiveUser, errorGiveUser] =
    useFetching(giveUserCallback);
  const [fetchGiveManager, isLoadingGiveManager, errorGiveManager] =
    useFetching(giveManagerCallback);
  const [fetchGiveSuperManag, isLoadingGiveSuperManag, errorGiveSuperManag] =
    useFetching(giveSuperManagerCallback);
  const [fetchGiveAdmin, isLoadingGiveAdmin, errorGiveAdmin] =
    useFetching(giveAdminCallback);

  const bannedUser = () => {
    fetchBannedUser(user.name);
  };

  const unbannedUser = () => {
    fetchUnbannedUser(user.name);
  };

  useEffect(() => {
    if (errorBannedUser !== null)
      addNotification({
        title: "Ошибка",
        text: "Сервер не отвечает. Не удалось забанить прользователя.",
        status: notificationStatus.error,
      });
  }, [errorBannedUser]);

  useEffect(() => {
    if (errorUnbannedUser !== null)
      addNotification({
        title: "Ошибка",
        text: "Сервер не отвечает. Не удалось разбанить прользователя.",
        status: notificationStatus.error,
      });
  }, [errorUnbannedUser]);

  useEffect(() => {
    if (errorGiveUser !== null)
      addNotification({
        title: "Ошибка",
        text: "Сервер не отвечает. Не удалось выдать роль пользователя.",
        status: notificationStatus.error,
      });
  }, [errorGiveUser]);

  useEffect(() => {
    if (errorGiveManager !== null)
      addNotification({
        title: "Ошибка",
        text: "Сервер не отвечает. Не удалось выдать роль менеджера.",
        status: notificationStatus.error,
      });
  }, [errorGiveManager]);

  useEffect(() => {
    if (errorGiveSuperManag !== null)
      addNotification({
        title: "Ошибка",
        text: "Сервер не отвечает. Не удалось выдать роль суперменеджера.",
        status: notificationStatus.error,
      });
  }, [errorGiveSuperManag]);

  useEffect(() => {
    if (errorGiveAdmin !== null)
      addNotification({
        title: "Ошибка",
        text: "Сервер не отвечает. Не удалось выдать роль администратора.",
        status: notificationStatus.error,
      });
  }, [errorGiveAdmin]);

  return (
    <div className={classes.header}>
      <div className={classes.userBody}>
        <img src="/images/profile.png" alt="" className={classes.userImages} />
        <div>
          <div className={classes.name}>{user.name}</div>
          <div className={classes.userInfo}>
            {user.email !== null ? `Email: ${user.email}` : ``}
          </div>
          <div className={classes.userInfo}>
            {user.registrationDate !== null
              ? `Дата регистрации: ${getOnlyDate(user.registrationDate)}`
              : ``}
          </div>
        </div>
      </div>
      <div>
        <div className={classes.headerButtons}>
          <If value={user.isBanned}>
            <img
              className={classes.isBanned}
              src="/images/banned.png"
              alt=""
              title="Пользователь забанен"
            />
          </If>
          <If value={Policy.isAdmin(params?.role)}>
            <LoadButton
              text={user.isBanned ? "Разбанить" : "Забанить"}
              onClick={user.isBanned ? unbannedUser : bannedUser}
              load={isLoadingBannedUser || isLoadingUnbannedUser}
              width={"120px"}
              className={classes.banButton}
            />
          </If>
          <If
            value={
              Policy.isSuperManager(params?.role) &&
              Policy.firstRoleBigger(params?.role, user.role)
            }
          >
            <DropDownMenu text={"Роль"} className={classes.roles}>
              <div>
                <div>{`Роль ${user.role}`}</div>
                <LoadButton
                  className={classes.roleButton}
                  text={"Пользователь"}
                  onClick={fetchGiveUser}
                  disabled={user.role === roles.user}
                  load={isLoadingGiveUser}
                  width="100%"
                />
                <LoadButton
                  className={classes.roleButton}
                  text={"Менеджер"}
                  onClick={fetchGiveManager}
                  disabled={user.role === roles.manager}
                  load={isLoadingGiveManager}
                  width="100%"
                />
                <If value={Policy.isAdmin(params?.role)}>
                  <LoadButton
                    className={classes.roleButton}
                    text={"Суперменеджер"}
                    onClick={fetchGiveSuperManag}
                    disabled={user.role === roles.superManager}
                    load={isLoadingGiveSuperManag}
                    width="100%"
                  />
                </If>
                <If value={Policy.isSuperAdmin(params?.role)}>
                  <LoadButton
                    className={classes.roleButton}
                    text={"Администратор"}
                    onClick={fetchGiveAdmin}
                    disabled={user.role === roles.admin}
                    load={isLoadingGiveAdmin}
                    width="100%"
                  />
                </If>
              </div>
            </DropDownMenu>
          </If>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
