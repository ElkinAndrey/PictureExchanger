import { Link } from "react-router-dom";
import Context from "../../context/context";
import Policy from "../../utils/policy";
import classes from "./ProfileMenu.module.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import useFetching from "../../hooks/useFetching";
import AuthApi from "../../api/authApi";
import authService from "../../utils/AuthService";
import If from "../../shared/If/If";
import Loader from "../../shared/Loader/Loader";
import serverNotRespondingError from "../../constants/serverNotRespondingError";
import notificationStatus from "../../constants/notificationStatus";
import getRoleName from "../../utils/getRoleName";

/** Выпадающее меню с параметрами аккаунта */
const ProfileMenu = () => {
  // КОНСТАНТЫ
  const rootEl = useRef(null);
  const { addNotification } = useContext(Context); // Параметры из URL
  const { params } = useContext(Context);

  // ПЕРЕМЕННЫЕ
  const [isOpen, isOpenChange] = useState(false);

  // КОЛБЭКИ
  const logoutCallback = async () => {
    await AuthApi.logout();
    authService.logout();
  };

  const [fetchLogout, isLoadingLogout, errorLogout] =
    useFetching(logoutCallback);

  //ФУНКЦИИ
  const open = () => isOpenChange(!isOpen);
  const close = () => isOpenChange(false);
  const exit = () => {
    if (isLoadingLogout) return;
    fetchLogout();
  };

  // ЭФФЕКТЫ
  useEffect(() => {
    const onClick = (e) => rootEl.current?.contains(e.target) || close();
    document.addEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (errorLogout === null) return;
    if (errorLogout?.response === undefined) {
      addNotification(serverNotRespondingError);
      return;
    }
    addNotification({
      title: "Ошибка",
      text: errorLogout?.response,
      status: notificationStatus.error,
    });
  }, [errorLogout]);

  return (
    <div className={classes.body} ref={rootEl}>
      <img
        className={classes.image}
        src="/images/profile.png"
        alt=""
        onClick={open}
      />
      <div className={isOpen ? classes.menuOpen : classes.menuClose}>
        <div className={classes.profileData}>
          <div className={classes.name}>
            <label>{`${params?.name ?? "Нет имени"} `}</label>
            <label>
              {Policy.isManager(params?.role) &&
                `(${getRoleName(params?.role)})`}
            </label>
          </div>
          <div className={classes.email}>
            {params?.email ?? "Нет электронной почты"}
          </div>
        </div>
        <div className={classes.buttons}>
          <Link className={classes.button} to={"/settings"} onClick={close}>
            <img
              className={classes.buttonImage}
              src="/images/settings.png"
              alt=""
            />
            <div>Настройки</div>
          </Link>
          <button className={classes.button} onClick={exit}>
            <img
              className={classes.buttonImage}
              src="/images/exit.png"
              alt=""
            />
            <div>Выйти</div>
            <If value={isLoadingLogout}>
              <Loader
                className={classes.loader}
                color={"#000000"}
                width={"17px"}
              />
            </If>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
