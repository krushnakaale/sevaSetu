import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= REQUEST INTERCEPTOR ================= */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

/* ================= RESPONSE INTERCEPTOR ================= */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Handle 401 - Unauthorized (token expired or invalid)
    if (error.response?.status === 401) {
      const hadToken = localStorage.getItem("access_token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      if (hadToken && !onLoginOrRegister && !originalRequest._retry) {
        window.location.href = "/login";
      }
    }
    if (error.response?.status === 403) {
      console.error("Access denied:", error.response?.data?.message);
    }

    // Handle 403 - Forbidden
    if (error.response?.status === 403) {
      console.error("Access denied:", error.response?.data?.message);
    }

    return Promise.reject(error);
  },
);

/* ================= AUTH: GET CURRENT USER ================= */
export const getCurrentUser = async () => {
  try {
    // ✅ Check if token exists before making request
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.log("No token found, user not logged in");
      return null;
    }

    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (err) {
    console.error(
      "Failed to fetch current user:",
      err.response?.data || err.message,
    );
    return null;
  }
};

/* ================= AUTH: LOGIN ================= */
export const login = async (email, password) => {
  try {
    const res = await axiosInstance.post("/auth/login", { email, password });

    if (res.data.success && res.data.token) {
      localStorage.setItem("access_token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return { success: true, data: res.data };
    }

    return { success: false, message: "Login failed" };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Login failed",
    };
  }
};

/* ================= AUTH: REGISTER ================= */
export const register = async (userData) => {
  try {
    const res = await axiosInstance.post("/auth/register", userData);

    if (res.data.success && res.data.token) {
      localStorage.setItem("access_token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return { success: true, data: res.data };
    }

    return { success: false, message: "Registration failed" };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Registration failed",
    };
  }
};

/* ================= AUTH: LOGOUT ================= */
export const logout = async () => {
  try {
    await axiosInstance.get("/auth/logout");
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    // Always clear local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
};

/* ================= HELPER: CHECK IF LOGGED IN ================= */
export const isAuthenticated = () => {
  const token = localStorage.getItem("access_token");
  const user = localStorage.getItem("user");
  return !!(token && user);
};

/* ================= HELPER: GET USER ROLE ================= */
export const getUserRole = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    const user = JSON.parse(userStr);
    return user.role;
  } catch {
    return null;
  }
};

/* ================= HELPER: GET USER DATA ================= */
export const getUserData = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export default axiosInstance;
