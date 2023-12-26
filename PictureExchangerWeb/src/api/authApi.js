import axios from "axios";
import defaultURL from "./apiSettings";

const URL = `${defaultURL}/auth`;

/** API для работы с постами */
class AuthApi {
  /** Зарегистрироваться */
  static async register(params) {
    const response = await axios.post(`${URL}/register`, params, {
      withCredentials: true,
    });
    return response;
  }

  /** Войти */
  static async login(params) {
    const response = await axios.post(`${URL}/login`, params, {
      withCredentials: true,
    });
    return response;
  }

  /** Выйти */
  static async logout() {
    await axios.post(`${URL}/logout`, "", {
      withCredentials: true,
    });
  }

  /** Обновить токен */
  static async refresh() {
    const response = await axios.post(`${URL}/refresh`, "", {
      withCredentials: true,
    });
    return response;
  }
}

export default AuthApi;
