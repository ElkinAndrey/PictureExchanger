import axios from "axios";
import AuthApi from "../api/authApi";

const $api = axios.create({
  withCredentials: true, // Разрешение на принятие куки
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("jwt") ?? ""}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response.status);
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      try {
        originalRequest._isRetry = true;
        const response = await AuthApi.refresh();
        if (response) localStorage.setItem("jwt", response.data);
        return $api.request(originalRequest);
      } catch (e) {}
    }
    throw error;
  }
);

export default $api;
