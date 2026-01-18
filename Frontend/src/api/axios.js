import axios from "axios";

/**
 * Base URL
 * VITE_API_URL = http://127.0.0.1:8000 (dev)
 * VITE_API_URL = https://api.yourdomain.com (prod)
 */
const BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 sec timeout (prod safe)
  withCredentials: true, // cookies / refresh token support
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//  REQUEST INTERCEPTOR

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

//  RESPONSE INTERCEPTOR

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Network error
    if (!error.response) {
      console.error("Network error or server not reachable");
      return Promise.reject(error);
    }

    const { status } = error.response;

    // 401 – token expired (future: refresh token logic)
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 👉 future: refresh token API call
        // await axiosInstance.post("/auth/refresh");

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Global error logging
    console.error("API Error:", {
      status,
      url: originalRequest.url,
      message: error.response.data,
    });

    return Promise.reject(error);
  },
);

export default axiosInstance;
