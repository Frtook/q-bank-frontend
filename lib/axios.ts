import { getCookies } from "@/lib/cookie";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getCookies("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default apiClient;
