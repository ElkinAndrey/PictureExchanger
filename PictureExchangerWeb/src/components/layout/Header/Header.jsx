import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div style={{ background: "#bbbbbb", padding: "10px" }}>
      <Link to={"/"}>На главную</Link>
      <Link to={"/add"}>Добавить пост</Link>
    </div>
  );
};

export default Header;
