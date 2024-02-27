import React from "react";
import Policy from "../../../utils/policy";
import Logo from "../../../views/Logo/Logo";
import classes from "./Header.module.css";
import ProfileMenu from "../../../views/ProfileMenu/ProfileMenu";
import AuthMenu from "../../../views/AuthMenu/AuthMenu";
import If from "../../../views/If/If";

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
