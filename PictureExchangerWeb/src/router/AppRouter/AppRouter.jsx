import React, { useContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Context from "../../context/context";
import roles from "../../constants/roles";
import classes from "./AppRouter.module.css";
import Posts from "../../pages/Posts/Posts";
import User from "../../pages/User/User";
import Post from "../../pages/Post/Post";
import ChangePost from "../../pages/ChangePost/ChangePost";
import AddPost from "../../pages/AddPost/AddPost";
import Users from "../../pages/Users/Users";
import Settings from "../../pages/Settings/Settings";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";
import If from "../../shared/If/If";
import Header from "../../layout/Header/Header";
import Notifications from "../../layout/Notifications/Notifications";
import Center from "../../layout/Center/Center";
import LeftMenu from "../../layout/LeftMenu/LeftMenu";

const center = (children) => <Center>{children}</Center>;

const leftMenu = (children) => <LeftMenu>{children}</LeftMenu>;

/** Роутер */
const AppRouter = () => {
  const { params, notifications, notificationsChange } = useContext(Context);

  const Nav = () => <Navigate to="/" />;
  const RouteRegister = !params?.role ? center(<Register />) : <Nav />;
  const RouteLogin = !params?.role ? center(<Login />) : <Nav />;
  const RouteChangePost = params?.role ? leftMenu(<ChangePost />) : <Nav />;
  const RouteAddPost = params?.role ? leftMenu(<AddPost />) : <Nav />;
  const RouteSettings = params?.role ? leftMenu(<Settings />) : <Nav />;
  const RouteUsers =
    params?.role === roles.superManager ||
    params?.role === roles.admin ||
    params?.role === roles.superAdmin ? (
      leftMenu(<Users />)
    ) : (
      <Nav />
    );

  console.log(1);
  return (
    <div className={classes.main}>
      <Header />
      <If value={params !== null}>
        <Routes path="/">
          <Route path={"/"} element={leftMenu(<Posts />)}></Route>
          <Route path={"/*"} element={<Nav />}></Route>
          <Route path={"/users/:name"} element={leftMenu(<User />)}></Route>
          <Route path={"/:postId"} element={leftMenu(<Post />)}></Route>
          <Route path={"/register"} element={RouteRegister}></Route>
          <Route path={"/login"} element={RouteLogin}></Route>
          <Route path={"/:postId/change"} element={RouteChangePost}></Route>
          <Route path={"/add"} element={RouteAddPost}></Route>
          <Route path={"/settings"} element={RouteSettings}></Route>
          <Route path={"/users"} element={RouteUsers}></Route>
        </Routes>
      </If>
      <Notifications
        notifications={notifications}
        notificationsChange={notificationsChange}
      />
    </div>
  );
};

export default AppRouter;
