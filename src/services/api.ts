import axios, {  AxiosError } from "axios";
import { refreshTokens } from './user'

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1"
});

const PUBLIC_ENDPOINT = ["/user/login", "/user/register", "/user/cars"];

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  const isPublic = PUBLIC_ENDPOINT.some((url) => config.url?.includes(url));
  
  if (!isPublic && token) {
    console.log("bbbbbbbbbbbbbbbbbbbbbb")
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    console.log("cccccccccccccccccccc")

    const originalRequest: any = error.config;

    if (
      error.response?.status === 401 &&
      !PUBLIC_ENDPOINT.some((url) => originalRequest.url?.includes(url)) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const data = await refreshTokens(refreshToken);
        // const {data} = await axios.post("/api/v1/user/refresh", { token: refreshToken })
        localStorage.setItem("accessToken", data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return axios(originalRequest);
      } catch (refreshErr) {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        window.location.href = "/";

        console.error(refreshErr);
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
