import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../../context/context";
import useFetching from "../../../hooks/useFetching";
import AuthApi from "../../../api/authApi";
import logout from "../../../utils/logout";
import isAuth from "../../../utils/isAuth";

const Header = () => {
  const { params, paramsChange } = useContext(Context);

  const [fetchLogout, isLoadingLogout, errorLogout] = useFetching(async () => {
    await AuthApi.logout();
  });

  /** Выйти */
  const lgt = () => logout(params, paramsChange, fetchLogout);

  return (
    <div style={{ background: "#bbbbbb", padding: "10px" }}>
      <Link to={"/"}>На главную</Link>
      <Link to={"/add"}>Добавить пост</Link>
      {!isAuth() && <Link to={"/register"}>Регистрация</Link>}
      {!isAuth() && <Link to={"/login"}>Вход</Link>}
      {isAuth() && <button onClick={lgt}>Выйти</button>}
      {params.name && <label>{`Имя: ${params.name};`}</label>}
      {params.email && <label>{`Email: ${params.email};`}</label>}
      {params.role && <label>{`Роль: ${params.role};`}</label>}
    </div>
  );
};

export default Header;
