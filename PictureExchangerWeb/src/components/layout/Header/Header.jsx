import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../../context/context";
import useFetching from "../../../hooks/useFetching";
import AuthApi from "../../../api/authApi";
import logout from "../../../utils/logout";

const Header = () => {
  const { params, paramsChange } = useContext(Context);

  const [fetchLogout, isLoadingLogout, errorLogout] = useFetching(async () => {
    await AuthApi.logout();
  });

  return (
    <div style={{ background: "#bbbbbb", padding: "10px" }}>
      <Link to={"/"}>На главную</Link>
      <Link to={"/add"}>Добавить пост</Link>
      <Link to={"/register"}>Регистрация</Link>
      <Link to={"/login"}>Вход</Link>
      <button onClick={() => logout(params, paramsChange, fetchLogout)}>
        Выйти
      </button>
      {params.email && <label>{`Email: ${params.email}`}</label>}
    </div>
  );
};

export default Header;
