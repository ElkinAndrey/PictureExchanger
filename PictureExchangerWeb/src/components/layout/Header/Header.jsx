import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../../context/context";
import useFetching from "../../../hooks/useFetching";
import AuthApi from "../../../api/authApi";
import logout from "../../../utils/logout";
import Policy from "../../../utils/policy";
import Logo from "../../../views/Logo/Logo";
import classes from "./Header.module.css";
import ProfileMenu from "../../../views/ProfileMenu/ProfileMenu";
import AuthMenu from "../../../views/AuthMenu/AuthMenu";
import If from "../../../views/If/If";

const Header = () => {
  const { params, paramsChange } = useContext(Context);

  const [fetchLogout, isLoadingLogout, errorLogout] = useFetching(async () => {
    await AuthApi.logout();
  });

  /** Выйти */
  const lgt = () => logout(params, paramsChange, fetchLogout);

  return (
    <div className={classes.body}>
      <div className={classes.subBody}>
        <Logo />
        <If value={Policy.isAuth()}>
          <ProfileMenu />
        </If>
        <If value={Policy.isNotAuth()}>
          <AuthMenu />
        </If>
      </div>
    </div>
  );
};

export default Header;
