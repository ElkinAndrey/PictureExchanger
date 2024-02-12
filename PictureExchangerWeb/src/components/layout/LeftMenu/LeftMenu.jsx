import React, { useContext } from "react";
import Policy from "../../../utils/policy";
import { Link } from "react-router-dom";
import Context from "../../../context/context";

const LeftMenu = () => {
  const { params } = useContext(Context);
  return (
    <div>
      <div>Меню</div>
      <div>
        <Link to={"/"}>Главная</Link>
      </div>
      <div>{Policy.isAuth() && <Link to={"/add"}>Добавить пост</Link>}</div>
      <div>
        {Policy.isSuperManager(params.role) && (
          <Link to={"/users"}>Список пользователей</Link>
        )}
      </div>
    </div>
  );
};

export default LeftMenu;
