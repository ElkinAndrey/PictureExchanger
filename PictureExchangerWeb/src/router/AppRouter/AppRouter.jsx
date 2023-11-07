import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../routes";
import Header from "../../components/layout/Header/Header";

const AppRouter = () => {
  return (
    <div>
      <Header />
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
    </div>
  );
};

export default AppRouter;
