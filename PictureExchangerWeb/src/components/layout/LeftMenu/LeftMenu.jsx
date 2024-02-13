import React, { useContext } from "react";
import Policy from "../../../utils/policy";
import { Link } from "react-router-dom";
import Context from "../../../context/context";
import classes from "./LeftMenu.module.css";
import If from "../../../views/If/If";

const LeftMenu = () => {
  const { params } = useContext(Context);

  return (
    <div className={classes.body}>
      <Link className={classes.button} to={"/"}>
        <img className={classes.image} src="/images/line.png" alt="" />
        <div>Главная</div>
      </Link>
      <If value={Policy.isAuth()}>
        <Link className={classes.button} to={`/users/${params.name}`}>
          <img className={classes.image} src="/images/myPage.png" alt="" />
          <div>Моя страница</div>
        </Link>
        <Link className={classes.button} to={"/add"}>
          <img className={classes.image} src="/images/add.png" alt="" />
          <div>Добавить пост</div>
        </Link>
      </If>
      <If value={Policy.isSuperManager(params.role)}>
        <Link className={classes.button} to={"/users"}>
          <img className={classes.image} src="/images/myPage.png" alt="" />
          <div>Пользователи</div>
        </Link>
      </If>
    </div>
  );
};

export default LeftMenu;
