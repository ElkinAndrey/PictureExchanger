import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter/AppRouter";
import { useEffect, useState } from "react";
import Context from "./context/context";
import authService from "./utils/AuthService";

const App = () => {
  // ПЕРЕМЕННЫЕ
  const [params, paramsChange] = useState(null);
  const value = {
    params: params,
    paramsChange: paramsChange,
  };

  /** Действия при запуске приложения */
  useEffect(() => {
    authService.setParamsChange(paramsChange);
    authService.login(localStorage.getItem("jwt"));
  }, []);

  return (
    <Context.Provider value={value}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;
