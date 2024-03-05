import React from "react";
import Policy from "../../utils/policy";
import Logo from "../../widgets/Logo/Logo";
import classes from "./Header.module.css";
import ProfileMenu from "../../widgets/ProfileMenu/ProfileMenu";
import AuthMenu from "../../widgets/AuthMenu/AuthMenu";
import If from "../../shared/If/If";

/** Шапка страницы */
const Header = () => {
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
