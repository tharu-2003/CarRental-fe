import axios, {  AxiosError } from "axios";
import { refreshTokens } from './user'
import.meta.env




const api = axios.create({
  baseURL:` ${import.meta.env.VITE_BASE_URL}/api/v1`
});


const PUBLIC_ENDPOINT = ["/user/login", "/user/register", "/user/refresh", "/user/cars", "/user/forget-password"];

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  const isPublic = PUBLIC_ENDPOINT.some((url) => config.url?.includes(url));
  
  if (!isPublic && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {

    const originalRequest: any = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
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
