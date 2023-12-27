import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../../context/context";
import useFetching from "../../../hooks/useFetching";
import AuthApi from "../../../api/authApi";
import logout from "../../../utils/logout";
import Policy from "../../../utils/policy";

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
      {Policy.isAuth() && <Link to={"/add"}>Добавить пост</Link>}
      {Policy.isNotAuth() && <Link to={"/register"}>Регистрация</Link>}
      {Policy.isNotAuth() && <Link to={"/login"}>Вход</Link>}
      {Policy.isAuth() && <button onClick={lgt}>Выйти</button>}
      {params.name && <label>{`Имя: ${params.name};`}</label>}
      {params.email && <label>{`Email: ${params.email};`}</label>}
      {params.role && <label>{`Роль: ${params.role};`}</label>}
    </div>
  );
};

export default Header;
