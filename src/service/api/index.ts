import axios from "axios";
import Cookies from "js-cookie";
export const api = axios.create({
  baseURL: process.env.DB_HOST || "http://localhost:3001",
  timeout: 7000,
});

api.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("auth_token");
    if (token && config.url !== "/auth/login") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
