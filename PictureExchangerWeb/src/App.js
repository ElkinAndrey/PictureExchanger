import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter/AppRouter";
import { useEffect, useState } from "react";
import Context from "./context/context";
import authService from "./utils/AuthService";

const App = () => {
  // ПЕРЕМЕННЫЕ
  const [params, paramsChange] = useState(null);
  const [notifications, notificationsChange] = useState([]);

  /** Добавить новое уведомление */
  const addNotification = (notification) => {
    const newNotification = {
      id: (~~(Math.random() * 1e8)).toString(16),
      ...notification,
    };
    const len = 5; // Максимальное количество уведомлений
    let newNotifications = [...notifications, newNotification];
    if (newNotifications.length > len)
      newNotifications = newNotifications.slice(
        newNotifications.length - len,
        newNotifications.length
      );
    notificationsChange(newNotifications);
  };

  const value = {
    params: params,
    paramsChange: paramsChange,
    notifications: notifications,
    notificationsChange: notificationsChange,
    addNotification: addNotification,
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
