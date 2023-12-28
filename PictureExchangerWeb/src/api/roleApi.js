import defaultURL from "./apiSettings";
import $api from "../http";

const URL = `${defaultURL}/users`;

/** API для работы с ролями */
class RoleApi {
  /** Выдать роль пользователя */
  static async giveUser(name) {
    const response = await $api.put(`${URL}/${name}/role/user`);
    return response;
  }

  /** Выдать роль менедрежа */
  static async giveManager(name) {
    const response = await $api.put(`${URL}/${name}/role/manager`);
    return response;
  }

  /** Выдать роль суперменедрежа */
  static async giveSuperManager(name) {
    const response = await $api.put(`${URL}/${name}/role/supermanager`);
    return response;
  }

  /** Выдать роль администратора */
  static async giveAdmin(name) {
    const response = await $api.put(`${URL}/${name}/role/admin`);
    return response;
  }
}

export default RoleApi;
