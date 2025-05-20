import { getCookies } from "@/lib/helperServer";
import axios from "axios";
import { getLocate } from "./helperClient";
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

apiClient.interceptors.request.use(
  async function (config) {
    const token = await getCookies("accessToken");

    config.headers["Accept-Language"] = getLocate();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default apiClient;
