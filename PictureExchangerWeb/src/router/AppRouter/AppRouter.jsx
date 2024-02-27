import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../routes";
import Header from "../../components/layout/Header/Header";
import Context from "../../context/context";
import roles from "../../constants/roles";
import LeftMenu from "../../components/layout/LeftMenu/LeftMenu";
import classes from "./AppRouter.module.css";

const AppRouter = () => {
  const { params } = useContext(Context);
  const [route, routeChange] = useState(routes.superAdmin);

  useEffect(() => {
    if (!params.role) routeChange(routes.notRegister);
    else if (params.role === roles.superAdmin) routeChange(routes.superAdmin);
    else if (params.role === roles.admin) routeChange(routes.admin);
    else if (params.role === roles.superManager)
      routeChange(routes.superManager);
    else if (params.role === roles.manager) routeChange(routes.manager);
    else routeChange(routes.user);
  }, [params]);

  return (
    <div className={classes.main}>
      <Header />
      <Routes path="/">
        {route.map((r, index) => (
          <Route
            key={index}
            exact={r.exact}
            path={r.path}
            element={r.element}
          ></Route>
        ))}
      </Routes>
    </div>
  );
};

export default AppRouter;
