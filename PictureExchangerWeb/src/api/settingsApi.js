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

  /** Изменить пароль */
  static async changePassword(password, newPassword) {
    await $api.put(`${URL}/change/password`, {
      password: password,
      newPassword: newPassword,
    });
  }

  /** Изменить имя */
  static async changeName(name) {
    await $api.put(`${URL}/change/name`, { name: name });
  }

  /** Изменить Email */
  static async changeEmail(email) {
    await $api.put(`${URL}/change/email`, { email: email });
  }

  /** Изменить параметры аккаунта */
  static async changeParams(params) {
    await $api.put(`${URL}/change`, params);
  }
}

export default SettingsApi;
