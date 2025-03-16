import { getCookies } from "@/helper/cookie";
import axios, { AxiosError, AxiosResponse } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getCookies("token");
    if (!token && config.url !== "/auth/token/") {
      window.location.href = "/login";
      return Promise.reject("No token found");
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
export default apiClient;
