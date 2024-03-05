import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "../../components/layout/Header/Header";
import Context from "../../context/context";
import roles from "../../constants/roles";
import classes from "./AppRouter.module.css";
import Posts from "../../components/pages/Posts/Posts";
import User from "../../components/pages/User/User";
import Post from "../../components/pages/Post/Post";
import ChangePost from "../../components/pages/ChangePost/ChangePost";
import AddPost from "../../components/pages/AddPost/AddPost";
import Users from "../../components/pages/Users/Users";
import Settings from "../../components/pages/Settings/Settings";
import Register from "../../components/pages/Register/Register";
import Login from "../../components/pages/Login/Login";
import If from "../../views/If/If";

const AppRouter = () => {
  const { params } = useContext(Context);

  const Nav = () => <Navigate to="/" />;
  const RouteRegister = () => (!params?.role ? <Register /> : <Nav />);
  const RouteLogin = () => (!params?.role ? <Login /> : <Nav />);
  const RouteChangePost = () => (params?.role ? <ChangePost /> : <Nav />);
  const RouteAddPost = () => (params?.role ? <AddPost /> : <Nav />);
  const RouteSettings = () => (params?.role ? <Settings /> : <Nav />);
  const RouteUsers = () => {
    const condition =
      params?.role === roles.superManager ||
      params?.role === roles.admin ||
      params?.role === roles.superAdmin;
    return condition ? <Users /> : <Nav />;
  };

  return (
    <div className={classes.main}>
      <Header />
      <If value={params !== null}>
        <Routes path="/">
          <Route path={"/"} element={<Posts />}></Route>
          <Route path={"/*"} element={<Nav />}></Route>
          <Route path={"/users/:name"} element={<User />}></Route>
          <Route path={"/:postId"} element={<Post />}></Route>
          <Route path={"/register"} element={<RouteRegister />}></Route>
          <Route path={"/login"} element={<RouteLogin />}></Route>
          <Route path={"/:postId/change"} element={<RouteChangePost />}></Route>
          <Route path={"/add"} element={<RouteAddPost />}></Route>
          <Route path={"/settings"} element={<RouteSettings />}></Route>
          <Route path={"/users"} element={<RouteUsers />}></Route>
        </Routes>
      </If>
    </div>
  );
};

export default AppRouter;
