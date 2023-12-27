import axios from "axios";
import defaultURL from "./apiSettings";
import $api from "../http";

const URL = `${defaultURL}/users`;

/** API для работы с постами */
class UserApi {
  /** Получить пользователя по имени */
  static async getByName(name) {
    const response = await axios.get(`${URL}/${name}`);
    return response;
  }

  /** Получить посты пользователя по имени */
  static async getPostsByName(name, params) {
    const response = await axios.post(`${URL}/${name}/posts`, params);
    return response;
  }

  /** Получить количество постов у пользователя по имени */
  static async getPostsCountByName(name, params) {
    const response = await axios.post(`${URL}/${name}/posts/count`, params);
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
