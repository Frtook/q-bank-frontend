import { getCookies } from "@/helper/cookie";
import axios, { AxiosResponse } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getCookies("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (!error.config.validateStatus()) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default apiClient;
