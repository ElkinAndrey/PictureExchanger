import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter/AppRouter";
import { useEffect, useState } from "react";
import Context from "./context/context";
import useFetching from "./hooks/useFetching";
import AuthApi from "./api/authApi";
import login from "./utils/login";

function App() {
  // ПЕРЕМЕННЫЕ
  const [params, paramsChange] = useState({
    id: null,
    name: null,
    email: null,
    password: null,
  });

  const [fetchRefresh, isLoadingRefresh, errorRefresh] = useFetching(
    async (p) => {
      const response = await AuthApi.refresh(p);
      login(response.data, params, paramsChange);
    }
  );

  /** Действия при запуске приложения */
  useEffect(() => {
    fetchRefresh();
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
