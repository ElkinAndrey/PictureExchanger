import axios from "axios";
import defaultURL from "./apiSettings";

const URL = `${defaultURL}/posts`;

/** API для работы с постами */
class PostApi {
  /** Получить посты */
  static async get(params) {
    const response = await axios.post(`${URL}`, params);
    return response;
  }

  /** Получить количество постов */
  static async count(params) {
    const response = await axios.post(`${URL}/count`, params);
    return response;
  }

  /** Получить пост по id */
  static async getById(id) {
    const response = await axios.get(`${URL}/${id}`);
    return response;
  }
}

export default PostApi;
