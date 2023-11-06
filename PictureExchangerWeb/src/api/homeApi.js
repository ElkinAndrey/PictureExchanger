import axios from "axios";
import defaultURL from "./apiSettings";

const URL = `${defaultURL}/home`;

class HomeApi {
  static async get() {
    const response = await axios.get(`${URL}`);
    return response;
  }
}
export default HomeApi;
