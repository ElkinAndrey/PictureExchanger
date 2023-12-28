import axios from "axios";
import defaultURL from "./apiSettings";
import $api from "../http";

const URL = `${defaultURL}/settings`;

/** API для работы с постами */
class SettingsApi {
  /** Получить пользователя */
  static async get() {
    const response = await $api.get(`${URL}`);
    return response;
  }
}

export default SettingsApi;
