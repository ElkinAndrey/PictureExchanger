import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../routes";

const AppRouter = () => {
  return (
    <Routes path="/">
      {routes.map((route, index) => (
        <Route
          key={index}
          exact={route.exact}
          path={route.path}
          element={route.element}
        ></Route>
      ))}
    </Routes>
  );
};

export default AppRouter;
