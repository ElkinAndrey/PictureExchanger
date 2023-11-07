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

  /** Добавить новый пост */
  static async add(params) {
    let formData = new FormData();

    const append = (name, value) => formData.append(name, value);

    append("name", params.name);
    append("isPrivate", params.isPrivate);
    params.tags.forEach((t) => append("tags", t));
    params.files.forEach((f) => append("files", f));

    await axios.post(`${URL}/add`, formData);
  }
}

export default PostApi;
