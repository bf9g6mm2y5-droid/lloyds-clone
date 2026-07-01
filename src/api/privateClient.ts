import { useAuth } from "@/store";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { refreshAuth } from "./refresh";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const privateClient = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeoutErrorMessage: "Request timed out",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

privateClient.interceptors.request.use(
  async (config) => {
    const token = useAuth.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

createAuthRefreshInterceptor(privateClient, refreshAuth, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
});

privateClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject({ code: "SERVER_ERROR" });
    } else if (error.request) {
      return Promise.reject({ code: "NETWORK_ERROR" });
    } else {
      return Promise.reject({ code: "UNKNOWN_ERROR" });
    }
  },
);

export default privateClient;
