import { Link } from "react-router-dom";
import Context from "../../context/context";
import Policy from "../../utils/policy";
import classes from "./ProfileMenu.module.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import logout from "../../utils/logout";
import useFetching from "../../hooks/useFetching";
import AuthApi from "../../api/authApi";
import Loader from "../../components/forms/Loader/Loader";
import If from "../If/If";

const ProfileMenu = () => {
  const rootEl = useRef(null);
  const [isOpen, isOpenChange] = useState(false);
  const { params, paramsChange } = useContext(Context);

  const [fetchLogout, isLoadingLogout, errorLogout] = useFetching(async () => {
    await AuthApi.logout();
    logout(params, paramsChange, () => {});
  });

  const open = () => {
    isOpenChange(!isOpen);
  };

  const close = () => {
    isOpenChange(false);
  };

  useEffect(() => {
    const onClick = (e) => rootEl.current?.contains(e.target) || close();
    document.addEventListener("click", onClick);
  }, []);

  const exit = () => {
    if (isLoadingLogout) return;
    fetchLogout();
  };

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
            <label>{`${params.name ?? "Нет имени"} `}</label>
            <label>{Policy.isManager(params.role) && `(${params.role})`}</label>
          </div>
          <div className={classes.email}>
            {params.email ?? "Нет электронной почты"}
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
              <Loader className={classes.loader} color="#000000" />
            </If>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
