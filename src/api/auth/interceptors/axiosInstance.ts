import axios, { AxiosInstance } from "axios";
import { store } from "../../../state/store";
import { logout, setAccessToken, setRefreshToken } from "../../../state/reducers/authSlice";
import { AuthResponse } from "../../../types/Auth";

const BASE_URL = "https://api.escuelajs.co/api/v1";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-type": "application/json" },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newTokens = await refreshTokens();
        store.dispatch(setAccessToken(newTokens.access_token));
        store.dispatch(setRefreshToken(newTokens.refresh_token));

        originalRequest.headers.Authorization = `Bearer ${newTokens.access_token}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        console.error("Failed to refresh token:", error);
        store.dispatch(logout());
        localStorage.clear();
      }
    }
    return Promise.reject(error);
  }
);

const refreshTokens = async (): Promise<AuthResponse> => {
  const state = store.getState();
  const refreshToken = state.auth.refreshToken;
  if (!refreshToken) {
    throw new Error("Refresh token not found");
  }
  const response = await axiosInstance.post<AuthResponse>("/auth/refresh-token", {
    refreshToken,
  });
  return response.data;
};

export default axiosInstance;
