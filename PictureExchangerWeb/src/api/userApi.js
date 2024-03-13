import axios from "axios";
import defaultURL from "./apiSettings";
import $api from "../http";

const URL = `${defaultURL}/users`;

/** API для работы с постами */
class UserApi {
  /** Получить пользователей */
  static async get(params) {
    const response = await $api.post(`${URL}`, params);
    return response;
  }

  /** Получить количество пользователей */
  static async getCount(params) {
    const response = await $api.post(`${URL}/count`, params);
    return response;
  }

  /** Получить пользователя по имени */
  static async getByName(name) {
    const response = await $api.get(`${URL}/${name}`);
    return response;
  }

  /** Получить посты пользователя по имени */
  static async getPostsByName(name, params) {
    const response = await $api.post(`${URL}/${name}/posts`, params);
    return response;
  }

  /** Получить количество постов у пользователя по имени */
  static async getPostsCountByName(name, params) {
    const response = await $api.post(`${URL}/${name}/posts/count`, params);
    return response;
  }

  /** Забанить */
  static async banned(name) {
    await $api.put(`${URL}/${name}/banned`);
  }

  /** Разбанить */
  static async unbanned(name) {
    await $api.put(`${URL}/${name}/unbanned`);
  }
}

export default UserApi;
