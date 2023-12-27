import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter/AppRouter";
import { useEffect, useState } from "react";
import Context from "./context/context";
import login from "./utils/login";
import isAuth from "./utils/isAuth";

function App() {
  // ПЕРЕМЕННЫЕ
  const [params, paramsChange] = useState({
    id: null,
    name: null,
    email: null,
    password: null,
  });

  /** Действия при запуске приложения */
  useEffect(() => {
    if (isAuth()) login(localStorage.getItem("jwt"), params, paramsChange);
  }, []);

  return (
    <Context.Provider
      value={{
        params: params,
        paramsChange: paramsChange,
      }}
    >
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
