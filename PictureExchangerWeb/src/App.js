import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter/AppRouter";
import { useEffect, useState } from "react";
import Context from "./context/context";
import login from "./utils/login";
import Policy from "./utils/policy";

function App() {
  // ПЕРЕМЕННЫЕ
  const [params, paramsChange] = useState(null);

  /** Действия при запуске приложения */
  useEffect(() => {
    if (Policy.isAuth()) login(localStorage.getItem("jwt"), paramsChange);
    else
      paramsChange({
        id: "",
        name: "",
        email: "",
        role: "",
      });
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
